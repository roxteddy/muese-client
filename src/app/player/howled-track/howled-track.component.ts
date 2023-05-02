import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Howl as HowlObject } from 'howler';
import { DragData } from '../track/track.component';
import { Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

declare var Howl: any;

declare function drawAudio(blob: Promise<ArrayBuffer>, canvas: HTMLCanvasElement): void;

@Component({
  selector: 'app-howled-track',
  templateUrl: './howled-track.component.html',
  styleUrls: ['./howled-track.component.scss']
})
export class HowledTrackComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    @ViewChild('canvas') canvasElementRef?: ElementRef;
    @ViewChild('canvasProgress') canvasProgress?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() newTime: number | undefined;
    @Input() playSubject?: Subject<void>;
    @Input() pauseSubject?: Subject<void>;
    @Input() title?: string;
    @Input() url?: string;

    @Output() dragStatus: EventEmitter<DragData | null> = new EventEmitter<DragData | null>();
    @Output() loaded: EventEmitter<void> = new EventEmitter<void>();
    @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() ended: EventEmitter<void> = new EventEmitter<void>();
    @Output() solo: EventEmitter<HowledTrackComponent> = new EventEmitter<HowledTrackComponent>();

    currentTime: number = 0
    loading: boolean = false;
    intervalId?: number;
    muted: boolean = false;
    progressWidth: number = 0;
    volumeStatus: {
        rect?: DOMRect,
        volume: number
    } = {
        volume : 1
    };

    private audio?: HowlObject;

    constructor(private readonly httpClient: HttpClient) {}

    ngOnInit() {
        this.playSubject?.subscribe(() => this.audio?.play());
        this.pauseSubject?.subscribe(() => this.audio?.pause());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['newTime']?.currentValue !== undefined) {
            this.setCurrentTime(changes['newTime'].currentValue);
        }
        if (changes['url']) {
            if (this.audio) {
                this.audio.unload();
            }
            this.loading = true;
            this.httpClient.get(changes['url'].currentValue, {
                observe: 'events',
                reportProgress: true,
                responseType: 'blob'
            }).subscribe({
                next : (event: HttpEvent<Blob>) => {
                    if (event.type == HttpEventType.DownloadProgress) {
                        if (event.total) {
                            this.setProgress(event.loaded / event.total);
                        }
                    }
                    if (event.type == HttpEventType.Response) {
                        let blob = event.body;
                        if (blob) {
                            const url = (window.URL || window.webkitURL ).createObjectURL(blob);
                            drawAudio(blob.arrayBuffer(), this.canvasElementRef?.nativeElement);
                            this.audio = new Howl({src: url, format: 'mp3'});
                            this.audio?.on('load', () => {
                                this.loaded.emit();
                                this.loading = false;
                            });
                            this.audio?.on('volume', () => {
                                if (this.audio) {
                                    this.volumeStatus.volume = this.audio.volume();
                                }
                            });
                            this.audio?.on('end', () => this.ended.emit());
                        } else {
                            // TODO: error case
                            this.loaded.emit();
                            this.loading = false;
                        }
                    }
                }, error: (e) => {
                    // TODO: error case
                    this.loaded.emit();
                    this.loading = false;
                }
            });

            if (!changes['url'].firstChange) {
                this.currentTime = 0;
                this.muted = false;
                this.progressWidth = 0;
                if (this.canvasElementRef) {
                    let canvas = this.canvasElementRef.nativeElement as HTMLCanvasElement;
                    let context = canvas.getContext('2d');
                    if (context) {
                        context.canvas.width = context.canvas.width;
                    }
                }
            }
        }
    }

    ngAfterViewInit() {
        this.intervalId = setInterval(() => this.updateCounter(), 25);
        if (this.url && this.canvasElementRef) {
        }
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public mute(muted?: boolean) {
        if (typeof muted === 'undefined') {
            this.muted = !this.muted;
        } else {
            this.muted = muted;
        }
        this.audio?.mute(this.muted);
    }

    public onCanvasMouseDown(e: MouseEvent, container: HTMLDivElement) {
        let rect = container.getBoundingClientRect();
        this.dragStatus.emit({
            rect,
            offsetWidth: container.offsetWidth,
            newWidth: e.clientX - rect.left,
            origin: this
        });
    }

    public onVolumeMouseDown(e: MouseEvent, container: HTMLDivElement) {
        const rect = container.getBoundingClientRect();
        let volume = (e.clientX - rect.left) / container.offsetWidth;
        if (volume < 0) {
            volume = 0;
        } else if (volume > 1) {
            volume = 1;
        }
        this.volumeStatus = {
            rect,
            volume
        }
    }
    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.dragData?.origin == this) {
            e.preventDefault();
            let newWidth = e.clientX - this.dragData.rect.left;
            if (newWidth > this.dragData.offsetWidth) {
                newWidth = this.dragData.offsetWidth;
            }
            this.dragStatus.emit({
                ...this.dragData,
                newWidth: newWidth
            });
        }

        if (this.volumeStatus.rect) {
            e.preventDefault();
            let volume = (e.clientX - this.volumeStatus.rect.left) / this.volumeStatus.rect.width;
            if (volume < 0) {
                volume = 0;
            } else if (volume > 1) {
                volume = 1;
            }
            this.audio?.volume(volume);
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.dragData?.origin == this && this.audio) {
            const time = this.dragData.newWidth / this.dragData.offsetWidth * this.audio.duration();
            this.timeChange.emit(time);
            this.dragStatus.emit(null);
        }

        if (this.volumeStatus.rect) {
            this.volumeStatus.rect = undefined;
        }
    }

    public onSolo() {
        this.solo.emit(this);
    }

    private setCurrentTime(time: number) {
        if (this.audio) {
            this.audio.seek(time);
            this.setProgress(time / this.audio.duration())
        }
    }
    private setProgress(value: number) {
        this.progressWidth = value * 100;
    }
    private updateCounter() {
        if (this.audio) {
            this.currentTime = this.audio.seek();
            if (!this.dragData) {
                this.setProgress(this.currentTime / this.audio.duration());
            }
        }
    }
}

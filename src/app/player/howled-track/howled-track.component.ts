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
import { Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DragData } from '../../app.module';

declare var Howl: any;

declare function linearPath(audioBuffer: AudioBuffer, options: {}): any;

@Component({
  selector: 'app-howled-track',
  templateUrl: './howled-track.component.html',
  styleUrls: ['./howled-track.component.scss']
})
export class HowledTrackComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    @ViewChild('path') pathRef?: ElementRef;
    @ViewChild('path2') path2Ref?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() newTime: number | undefined;
    @Input() playSubject?: Subject<number>;
    @Input() pauseSubject?: Subject<void>;
    @Input() speedSubject?: Subject<number>;
    @Input() title?: string;
    @Input() url?: string;

    @Output() dragStatus: EventEmitter<DragData | null> = new EventEmitter<DragData | null>();
    @Output() loaded: EventEmitter<void> = new EventEmitter<void>();
    @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() timeProgress: EventEmitter<number> = new EventEmitter<number>();
    @Output() ended: EventEmitter<void> = new EventEmitter<void>();
    @Output() solo: EventEmitter<HowledTrackComponent> = new EventEmitter<HowledTrackComponent>();

    currentTime: number = 0
    loading: boolean = false;
    intervalId?: number;
    muted: boolean = false;
    progressWidth: number = 0;
    volume: number = 0.75;

    private audio?: HowlObject;
    private audioNode?: MediaStreamAudioDestinationNode;
    constructor(private readonly httpClient: HttpClient) {}

    ngOnInit() {
        this.playSubject?.subscribe((time) => {
            this.audio?.seek(time);
            this.audio?.play();
        });
        this.pauseSubject?.subscribe(() => this.audio?.pause());
        this.speedSubject?.subscribe((speed) => this.audio?.rate(speed));
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
                            this.audio = new Howl({src: url, format: 'mp3'});
                            this.audio?.volume(this.volume);
                            this.audio?.on('load', () => {
                                this.loaded.emit();
                                this.loading = false;

                                if (blob) {
                                    blob.arrayBuffer()
                                        .then(arrayBuffer => new AudioContext().decodeAudioData(arrayBuffer))
                                        .then(audioBuffer => {
                                            const newPath = linearPath(audioBuffer,
                                                {samples:150, type: 'mirror', minshow: 0.8, maxshow: 1, normalize: true, width: 377, height: 32, paths: [
                                                    {d:'V', sy: 0, x:50, ey:100 }
                                                ]});
                                            this.pathRef?.nativeElement?.setAttribute('d', newPath);
                                            this.path2Ref?.nativeElement?.setAttribute('d', newPath);
                                        });
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
                this.pathRef?.nativeElement?.setAttribute('d', '');
                this.path2Ref?.nativeElement?.setAttribute('d', '');
            }
        }
    }

    ngAfterViewInit() {
        this.intervalId = setInterval(() => this.updateCounter(), 25);
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
            newWidth: e.clientX - rect.left,
            origin: this
        });
    }

    public onVolumeProgress(volume: number) {
        this.volume = volume;
        this.audio?.volume(volume);
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.dragData?.origin == this) {
            e.preventDefault();
            let newWidth = e.clientX - this.dragData.rect.left;
            if (newWidth < 0) {
                newWidth = 0;
            } else if (newWidth > this.dragData.rect.width) {
                newWidth = this.dragData.rect.width;
            }
            this.dragStatus.emit({
                ...this.dragData,
                newWidth: newWidth
            });
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.dragData?.origin == this && this.audio) {
            const time = this.dragData.newWidth / this.dragData.rect.width * this.audio.duration();
            this.timeChange.emit(time);
            this.dragStatus.emit(null);
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
            this.timeProgress.emit(this.currentTime);
            if (!this.dragData) {
                this.setProgress(this.currentTime / this.audio.duration());
            }
        }
    }
}

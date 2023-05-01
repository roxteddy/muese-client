import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, HostListener,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import { Howl as HowlObject } from 'howler';
import { DragData } from '../track/track.component';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

    currentTime: number = 0;
    intervalId?: number;
    muted: boolean = false;
    progressWidth: number = 0;

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
            this.httpClient.get(changes['url'].currentValue, {responseType: 'blob'}).subscribe((blob: Blob) => {
                const url = (window.URL || window.webkitURL ).createObjectURL(blob);
                this.audio = new Howl({src: url, format: 'mp3'});
                drawAudio(blob.arrayBuffer(), this.canvasElementRef?.nativeElement);
                this.audio?.on('load', () => this.loaded.emit());
            }, (e) => {
                this.loaded.emit();
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
            // drawAudio(this.url, this.canvasElementRef.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public mute() {
        this.muted = !this.muted;
        this.audio?.mute(this.muted);
    }

    public onCanvasMouseDown(e: MouseEvent, canvas: HTMLDivElement) {
        let rect = canvas.getBoundingClientRect();
        this.dragStatus.emit({
            rect,
            offsetWidth: canvas.offsetWidth,
            newWidth: e.clientX - rect.left,
            origin: this
        });
    }

    @HostListener('document:mousemove', ['$event'])
    public onCanvasMouseMove(e: MouseEvent) {
        if (this.dragData?.origin == this) {
            let newWidth = e.clientX - this.dragData.rect.left;
            if (newWidth > this.dragData.offsetWidth) {
                newWidth = this.dragData.offsetWidth;
            }
            this.dragStatus.emit({
                ...this.dragData,
                newWidth: newWidth
            });
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public onCanvasMouseUp(e: MouseEvent) {
        if (this.dragData?.origin == this && this.audio) {
            const time = this.dragData.newWidth / this.dragData.offsetWidth * this.audio.duration();
            this.timeChange.emit(time);
            this.dragStatus.emit(null);
        }
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

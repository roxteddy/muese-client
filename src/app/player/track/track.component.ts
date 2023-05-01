import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter,
    HostListener,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import { HowledTrackComponent } from '../howled-track/howled-track.component';

declare function drawAudio(url: string, canvas: HTMLCanvasElement): void;

export interface DragData {
    rect: DOMRect
    offsetWidth: number
    newWidth: number
    origin: TrackComponent | HowledTrackComponent
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements AfterViewInit, OnChanges, OnDestroy {
    @ViewChild('audioTrack') audioTrack?: ElementRef;
    @ViewChild('canvas') canvasElementRef?: ElementRef;
    @ViewChild('canvasProgress') canvasProgress?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() newTime: number | undefined;
    @Input() title?: string;
    @Input() url?: string;

    @Output() dragStatus: EventEmitter<DragData | null> = new EventEmitter<DragData | null>();
    @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() ended: EventEmitter<void> = new EventEmitter<void>();

    currentTime: number = 0;
    intervalId?: number;
    muted: boolean = false;
    progressWidth: number = 0;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['newTime']?.currentValue !== undefined) {
            this.setCurrentTime(changes['newTime'].currentValue);
        }
        if (changes['url'] && !changes['url'].firstChange) {
            this.currentTime = 0;
            this.muted = false;
            this.progressWidth = 0;
            if (this.canvasElementRef) {
                let canvas = this.canvasElementRef.nativeElement as HTMLCanvasElement;
                let context = canvas.getContext('2d');
                if (context) {
                    context.canvas.width = context.canvas.width;
                }
                drawAudio(changes['url'].currentValue, this.canvasElementRef.nativeElement);
            }
        }
    }

    ngAfterViewInit() {
        this.intervalId = setInterval(() => this.updateCounter(), 25);
        if (this.url && this.canvasElementRef) {
            drawAudio(this.url, this.canvasElementRef.nativeElement);
        }

    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public mute() {
        this.muted = !this.muted;
    }

    // public onCanvasClick(e: MouseEvent, canvas: HTMLDivElement) {
    //     let ratio = e.offsetX / canvas.offsetWidth;
    //     if (this.audioTrack) {
    //         this.timeChange.emit(this.audioTrack.nativeElement.duration * ratio);
    //     }
    // }

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
        if (this.dragData?.origin == this) {
            const time = this.dragData.newWidth / this.dragData.offsetWidth * this.audioTrack?.nativeElement.duration;
            this.timeChange.emit(time);
            this.dragStatus.emit(null);
        }
    }

    private setCurrentTime(time: number) {
        if (this.audioTrack) {
            this.audioTrack.nativeElement.currentTime = time;
        }
    }
    private setProgress(value: number) {
        this.progressWidth = value * 100;
    }
    private updateCounter() {
        if (this.audioTrack) {
            this.currentTime = this.audioTrack.nativeElement.currentTime;
            if (!this.dragData) {
                this.setProgress(this.currentTime / this.audioTrack.nativeElement.duration);
            }
        }
    }
}

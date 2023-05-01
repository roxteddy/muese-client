import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements AfterViewInit, OnDestroy {
    @ViewChild('audioTrack') audioTrack?: ElementRef;
    @ViewChild('canvasProgress') canvasProgress?: ElementRef;

    @Input() title?: string;
    @Input() url?: string;

    currentTime: number = 0;
    intervalId?: number;
    muted: boolean = false;
    dragData?: {rect: DOMRect, offsetWidth: number, newWidth?: number};
    progressWidth: number = 0;

    ngAfterViewInit() {
        this.intervalId = setInterval(() => this.updateCounter(), 25);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public mute() {
        if (this.audioTrack) {
            this.audioTrack.nativeElement.muted = !this.audioTrack.nativeElement.muted;
        }
        this.muted = !this.muted;
    }

    public onCanvasClick(e: MouseEvent, canvas: HTMLDivElement) {
        let ratio = e.offsetX / canvas.offsetWidth;
        if (this.audioTrack) {
            this.setCurrentTime(this.audioTrack.nativeElement.duration * ratio)
        }
        e.stopPropagation();
    }

    public onCanvasMouseDown(e: MouseEvent, canvas: HTMLDivElement) {
        let rect = canvas.getBoundingClientRect();
        this.dragData = {
            rect,
            offsetWidth: canvas.offsetWidth,
            newWidth: e.clientX - rect.left
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onCanvasMouseMove(e: MouseEvent) {
        if (this.dragData) {
            this.dragData.newWidth = e.clientX - this.dragData.rect.left;
            if (this.dragData.newWidth > this.dragData.offsetWidth) {
                this.dragData.newWidth = this.dragData.offsetWidth;
            }
            this.setProgress(this.dragData.newWidth / this.dragData.offsetWidth);
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public onCanvasMouseUp(e: MouseEvent) {
        if (this.dragData?.newWidth) {
            const time = this.dragData.newWidth / this.dragData.offsetWidth * this.audioTrack?.nativeElement.duration;
            this.setCurrentTime(time);
            this.dragData = undefined;
        }
    }

    // public onTimeUpdate() {
    //     if (!this.dragData && this.audioTrack) {
    //         this.setProgress(this.audioTrack.nativeElement.currentTime / this.audioTrack.nativeElement.duration);
    //     }
    // }

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

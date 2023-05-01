import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { SERVER_URL, Song } from '../app.component';
import { DragData } from './track/track.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
    @Input() song?: Song;

    dragData: DragData | null = null;
    newTime?: number;
    paused: boolean = true;

    tracksElements: HTMLAudioElement[] = [];

    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.tracksElements = this.elementRef.nativeElement.querySelectorAll('.track');
        document.addEventListener('keypress', this.handleKeyPress);
    }

    ngOnDestroy() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    public getDrumsUrl(): string {
        return `${SERVER_URL}/music/${this.song?.filename}/drums.wav`;
    }

    public getPianoUrl(): string {
        return `${SERVER_URL}/music/${this.song?.filename}/piano.wav`;
    }

    public getBassUrl(): string {
        return `${SERVER_URL}/music/${this.song?.filename}/bass.wav`;
    }

    public getVocalsUrl(): string {
        return `${SERVER_URL}/music/${this.song?.filename}/vocals.wav`;
    }

    public getOtherUrl(): string {
        return `${SERVER_URL}/music/${this.song?.filename}/other.wav`;
    }

    public onDragEvent(dragData: DragData | null) {
        this.dragData = dragData;
    }

    public onTimeChange(time: number) {
        this.newTime = time;
    }

    public playPause(): void {
        this.paused ? this.play() : this.pause();
    }

    // Private

    private handleKeyPress(e: KeyboardEvent): void {
        if (e.code == 'Space') {
            console.log('COUCOU');
        }
    }

    private play(): void {
        this.paused = false;
        for (let track of this.tracksElements) {
            track.play();
        }
    }

    private pause(): void {
        this.paused = true;
        for (let track of this.tracksElements) {
            track.pause();
        }
    }

    private setCurrentTime(time: number) {
        for (let track of this.tracksElements) {
            track.currentTime = time;
        }
    }
}

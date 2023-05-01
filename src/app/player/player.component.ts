import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges, ViewChildren
} from '@angular/core';
import { SERVER_URL, Song } from '../app.component';
import { DragData } from './track/track.component';
import { Subject } from 'rxjs';
import { HowledTrackComponent } from './howled-track/howled-track.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnChanges {
    @ViewChildren(HowledTrackComponent) trackComponents?: HowledTrackComponent[];

    @Input() song?: Song;

    dragData: DragData | null = null;
    newTime?: number;
    paused: boolean = true;
    playSubject: Subject<void> = new Subject<void>();
    pauseSubject: Subject<void> = new Subject<void>();
    tracksReady = 0;

    tracksElements: HTMLAudioElement[] = [];

    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.tracksElements = this.elementRef.nativeElement.querySelectorAll('.track');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['song']) {
            this.paused = true;
            this.tracksReady = 0;
        }
    }

    public getDrumsUrl(): string {
        return `${SERVER_URL}/music/output/${this.song?.filename}/drums.mp3`;
    }

    public getPianoUrl(): string {
        return `${SERVER_URL}/music/output/${this.song?.filename}/piano.mp3`;
    }

    public getBassUrl(): string {
        return `${SERVER_URL}/music/output/${this.song?.filename}/bass.mp3`;
    }

    public getVocalsUrl(): string {
        return `${SERVER_URL}/music/output/${this.song?.filename}/vocals.mp3`;
    }

    public getOtherUrl(): string {
        return `${SERVER_URL}/music/output/${this.song?.filename}/other.mp3`;
    }

    public getPlayButtonText(): string {
        if (this.tracksReady < 5) {
            return 'LOADING';
        }
        return this.paused ? 'PLAY' : 'PAUSE';
    }

    public onDragEvent(dragData: DragData | null) {
        this.dragData = dragData;
    }

    public onSolo(track: HowledTrackComponent) {
        if (this.trackComponents) {
            for (let trackComponent of this.trackComponents) {
                trackComponent.mute(track != trackComponent);
            }
        }
    }

    public onSongEnd() {
        this.paused = true;
    }

    public onTimeChange(time: number) {
        this.newTime = time;
    }

    public onTrackLoaded() {
        this.tracksReady += 1;
    }

    public playPause(): void {
        this.paused ? this.play() : this.pause();
    }

    // Private
    @HostListener('document:keypress', ['$event'])
    private handleKeyPress(e: KeyboardEvent): void {
        if (e.code == 'Space') {
            this.playPause();
        }
    }

    private play(): void {
        this.paused = false;
        this.playSubject.next();
    }

    private pause(): void {
        this.paused = true;
        this.pauseSubject.next();
    }
}

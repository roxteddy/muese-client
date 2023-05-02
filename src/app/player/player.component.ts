import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges, ViewChildren
} from '@angular/core';
import { SERVER_URL, Song } from '../app.component';
import { Subject } from 'rxjs';
import { HowledTrackComponent } from './howled-track/howled-track.component';
import { DragData } from '../app.module';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

declare var Howler: HowlerGlobal;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnChanges {
    @ViewChildren(HowledTrackComponent) trackComponents?: HowledTrackComponent[];
    tracksElements: HTMLAudioElement[] = [];

    @Input() song?: Song;

    dragData: DragData | null = null;
    newTime?: number;
    paused: boolean = true;
    playSubject: Subject<void> = new Subject<void>();
    pauseSubject: Subject<void> = new Subject<void>();
    speedSubject: Subject<number> = new Subject<number>();
    tracksReady = 0;
    volumeStatus: {
        rect?: DOMRect,
        volume: number
    } = {volume: 0.75};
    speedStatus: {
        rect?: DOMRect,
        speed: number
    }  = {speed: 1};

    constructor(private readonly elementRef: ElementRef,
                private readonly matDialog: MatDialog) {
        this.setVolume(this.volumeStatus.volume);
    }

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

    public onSpeedChange(speed: number) {
        this.speedSubject.next(speed);
    }

    public onTimeChange(time: number) {
        this.newTime = time;
    }

    public onTrackLoaded() {
        this.tracksReady += 1;
    }

    public onSpeedMouseDown(e: MouseEvent, container: HTMLDivElement) {
        const rect = container.getBoundingClientRect();
        const speed = ((e.clientX - rect.left) / container.offsetWidth) * 4;
        this.speedStatus.rect = rect;
        this.setSpeed(speed);
    }

    public onVolumeMouseDown(e: MouseEvent, container: HTMLDivElement) {
        const rect = container.getBoundingClientRect();
        const volume = (e.clientX - rect.left) / container.offsetWidth;
        this.volumeStatus.rect = rect;
        this.setVolume(volume);
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.speedStatus.rect) {
            e.preventDefault();
            const speed = ((e.clientX - this.speedStatus.rect.left) / this.speedStatus.rect.width) * 4;
            this.setSpeed(speed);
        }
        if (this.volumeStatus.rect) {
            e.preventDefault();
            const volume = (e.clientX - this.volumeStatus.rect.left) / this.volumeStatus.rect.width;
            this.setVolume(volume);
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.speedStatus.rect) {
            this.speedStatus.rect = undefined;
        }
        if (this.volumeStatus.rect) {
            this.volumeStatus.rect = undefined;
        }
    }

    public playPause(): void {
        if (this.tracksReady == 5 && !this.matDialog.openDialogs.length)
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

    private setSpeed(speed: number) {
        if (speed < 0.5) {
            speed = 0.5;
        } else if (speed > 4) {
            speed = 4;
        }
        this.speedStatus.speed = speed;
        this.speedSubject.next(speed);
    }

    private setVolume(volume: number) {
        if (volume < 0) {
            volume = 0;
        } else if (volume > 1) {
            volume = 1;
        }
        this.volumeStatus.volume = volume;
        Howler.volume(volume);
    }
}

import {
    Component,
    ElementRef, EventEmitter,
    HostListener,
    Input,
    OnChanges, Output,
    SimpleChanges, ViewChildren
} from '@angular/core';
import { SERVER_URL, Song } from '../app.component';
import { Subject } from 'rxjs';
import { HowledTrackComponent } from './howled-track/howled-track.component';
import { DragData } from '../app.module';
import { MatDialog } from '@angular/material/dialog';
import { ProgressStatus } from '../../app-ui/progress-bar/progress-bar.component';

declare var Howler: HowlerGlobal;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {
    @ViewChildren(HowledTrackComponent) trackComponents?: HowledTrackComponent[];

    @Input() song?: Song;

    @Output() next: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() prev: EventEmitter<void> = new EventEmitter<void>();

    autoplay: boolean = false;
    bpm: number = -1;
    dragData: DragData | null = null;
    duration: number = 0;
    loopActivated: boolean = false;
    paused: boolean = true;
    playSubject: Subject<number> = new Subject<number>();
    pauseSubject: Subject<void> = new Subject<void>();
    seekSubject: Subject<number> = new Subject<number>();
    speedSubject: Subject<number> = new Subject<number>();
    tracksReady = 0;
    speedStatus: {
        rect?: DOMRect,
        speed: number
    }  = {speed: 1};
    shuffleActivated: boolean = false;
    timeProgress: number = 0;
    volume: number = 0.75;

    constructor(private readonly elementRef: ElementRef,
                private readonly matDialog: MatDialog) {
        this.setVolume(this.volume);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['song']) {
            this.paused = true;
            this.tracksReady = 0;
        }
    }

    public getBPMValue(bpm: number): string {
        switch (bpm) {
            case -2:
                return '??';
            case -1:
                return "--";
            default:
                return Math.round(bpm * this.speedStatus.speed).toString();
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

    public onDragEvent(dragData: DragData | null) {
        this.dragData = dragData;
    }

    public onNext() {
        this.autoplay = !this.paused;
        this.paused = true;
        this.next.emit(this.shuffleActivated);
    }

    public onPrev() {
        if (this.timeProgress > 1) {
            this.seekSubject.next(0);
        } else {
            this.prev.emit();
        }
    }

    public onProgress(progressStatus: ProgressStatus) {
        if (progressStatus.rect) {
            this.dragData = {
                rect: progressStatus.rect,
                progress: progressStatus.progress,
                origin: null
            }
        } else {
            this.dragData = null;
            this.seekSubject.next(this.duration * progressStatus.progress);
        }
    }


    public onSolo(track: HowledTrackComponent) {
        if (this.trackComponents) {
            for (let trackComponent of this.trackComponents) {
                trackComponent.mute(track != trackComponent);
            }
        }
    }

    public onSongEnd() {
        if (this.loopActivated) {
            this.pauseSubject.next();
            this.play(0);

        } else {
            this.paused = true;
            this.next.emit(this.shuffleActivated);
        }
    }

    public onButtonClick(type: string, direction: -1 | 1): void {
        switch (type) {
            case 'bpm':
                return this.onBPMChange(direction);
        }
    }

    private onBPMChange(direction: -1 | 1): void {
        let bpmMin = this.bpm * 0.5;
        let bpmMax = this.bpm * 4;
        let granularity = 3.5 / (bpmMax - bpmMin);
        let speed = this.speedStatus.speed += granularity * direction;
        this.setSpeed(speed);
    }

    public onSpeedChange(speed: number) {
        this.speedSubject.next(speed);
    }

    public onTimeChange(time: number) {
        this.seekSubject.next(time);
    }

    public onTrackLoaded(duration?: number) {
        this.tracksReady += 1;
        if (typeof duration !== 'undefined') {
            this.duration = duration;
        }
        if (this.tracksReady == 5 && this.autoplay) {
            this.autoplay = false;
            this.play(0);
        }
    }

    public onSpeedMouseDown(e: MouseEvent, container: HTMLDivElement) {
        const rect = container.getBoundingClientRect();
        const speed = ((e.clientX - rect.left) / container.offsetWidth) * 4;
        this.speedStatus.rect = rect;
        this.setSpeed(speed);
    }

    public onVolumeProgress(volumeStatus: ProgressStatus) {
        this.setVolume(volumeStatus.progress);
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.speedStatus.rect) {
            e.preventDefault();
            const speed = ((e.clientX - this.speedStatus.rect.left) / this.speedStatus.rect.width) * 4;
            this.setSpeed(speed);
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.speedStatus.rect) {
            e.preventDefault();
            this.speedStatus.rect = undefined;
        }
    }

    public playPause(): void {
        if (this.tracksReady == 5 && !this.matDialog.openDialogs.length)
        this.paused ? this.play(this.timeProgress) : this.pause();
    }

    // Private
    @HostListener('document:keypress', ['$event'])
    private handleKeyPress(e: KeyboardEvent): void {
        if (e.code == 'Space') {
            this.playPause();
        }
    }

    private setSpeed(speed: number) {
        this.speedStatus.speed = Math.min(Math.max(speed, 0.5), 4);
        this.speedSubject.next(this.speedStatus.speed);
    }

    private play(time: number): void {
        this.paused = false;
        this.playSubject.next(time);
    }

    private pause(): void {
        this.paused = true;
        this.pauseSubject.next();
    }

    private setVolume(volume: number) {
        this.volume = volume;
        Howler.volume(volume);
    }
}

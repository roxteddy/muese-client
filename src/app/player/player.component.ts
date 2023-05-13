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
    dragData: DragData | null = null;
    duration: number = 0;
    loopActivated: boolean = false;
    paused: boolean = true;
    playSubject: Subject<number> = new Subject<number>();
    pauseSubject: Subject<void> = new Subject<void>();
    seekSubject: Subject<number> = new Subject<number>();
    speedSubject: Subject<number> = new Subject<number>();
    tracksReady = 0;
    shuffleActivated: boolean = false;
    speed: number = 1;
    timeProgress: number = 0;
    volume: number = 0.75;
    tone: number = 0;
    pitch: number = 1;

    firstLoad: boolean = true;
    vocoder?: AudioWorkletNode;

    constructor(private readonly elementRef: ElementRef,
                private readonly matDialog: MatDialog) {
        this.setVolume(this.volume);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['song']) {
            this.duration = 0;
            this.paused = true;
            this.tracksReady = 0;
            this.speed = 1;
            this.timeProgress = 0;
            this.tone = 0;
            this.pitch = 1;
        }
    }

    public getBPMValue(song?: Song): string {
        const bpm = song ? song.bpm : -1;
        switch (bpm) {
            case -2:
                return '??';
            case -1:
                // return "--";
                return this.speed.toFixed(1) + 'x';
            default:
                return Math.round(bpm * this.speed).toString();
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
            case 'BPM':
                return this.onBPMChange(direction);
            case 'Key':
                return this.onPitchChange(direction);
        }
    }

    private onBPMChange(direction: -1 | 1): void {
        let granularity: number;
        if (this.song && this.song.bpm >= 0) {
            let bpmMin = this.song?.bpm * 0.5;
            let bpmMax = this.song?.bpm * 4;
            granularity = 3.5 / (bpmMax - bpmMin);
        } else {
            granularity = 0.1;
        }
        let speed = this.speed += granularity * direction;
        this.setSpeed(speed);
    }

    private onPitchChange(direction: -1 | 1): void {
        this.tone += direction;
        this.pitch = Math.pow(2, this.tone / 12);
        this.setPitch(this.pitch);
    }

    public onTimeChange(time: number) {
        this.seekSubject.next(time);
    }

    public onTrackLoaded(duration?: number) {
        if (this.firstLoad) {
            this.firstLoad = false;
            Howler.ctx.audioWorklet?.addModule('assets/scripts/phase-vocoder.min.js').then(() => {
                let inputNode = Howler.masterGain;
                inputNode.disconnect();
                let phaseVocoderNode = new AudioWorkletNode(Howler.ctx, 'phase-vocoder-processor');
                console.log('connecting vocoder');
                inputNode.connect(phaseVocoderNode);
                phaseVocoderNode.connect(Howler.ctx.destination);
                this.vocoder = phaseVocoderNode;
            });
        }
        this.tracksReady += 1;
        if (typeof duration !== 'undefined') {
            this.duration = duration;
        }
        if (this.tracksReady == 5 && this.autoplay) {
            this.autoplay = false;
            this.play(0);
        }
    }

    public onVolumeProgress(volumeStatus: ProgressStatus) {
        this.setVolume(volumeStatus.progress);
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

    private setPitch(pitch: number) {
        if (this.vocoder) {
            (this.vocoder.parameters as any).get('pitchFactor').value = pitch / this.speed;
        }
    }

    private setSpeed(speed: number) {
        this.speed = Math.min(Math.max(speed, 0.5), 4);
        this.speedSubject.next(this.speed);
        this.setPitch(this.pitch / this.speed);
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

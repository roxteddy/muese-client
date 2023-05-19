import {
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    HostListener,
    Input,
    OnChanges, Output,
    SimpleChanges, ViewChildren
} from '@angular/core';
import { SERVER_URL, Track } from '../app.component';
import { StemPlayerComponent } from './stem-player/stem-player.component';
import { DragData } from '../app.module';
import { MatDialog } from '@angular/material/dialog';
import { ProgressStatus } from '../../app-ui/progress-bar/progress-bar.component';
import { AudioPlayerService } from '../audio-player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {
    @ViewChildren(StemPlayerComponent) trackComponents?: StemPlayerComponent[];

    @Input() track?: Track;

    @Output() next: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() prev: EventEmitter<void> = new EventEmitter<void>();

    autoplay = false;
    dragData: DragData | null = null;
    duration = 0;
    loopActivated = false;
    paused = true;
    progress = 0;
    tracksReady = 0;
    shuffleActivated: boolean = false;
    speed: number = 1;
    volume: number = 0.75;
    pitch: number = 0;

    firstLoad: boolean = true;

    constructor(private readonly audioPlayer: AudioPlayerService,
                private readonly changeDetectorRef: ChangeDetectorRef,
                private readonly elementRef: ElementRef,
                private readonly matDialog: MatDialog) {
        this.setVolume(this.volume);
        this.audioPlayer.duration.subscribe(duration => this.duration = duration);
        this.audioPlayer.progress.subscribe((progress) => {
            this.progress = progress;
            this.changeDetectorRef.detectChanges();
        });
        this.audioPlayer.end.subscribe(() => {
            //TODO should be handled directly
            if (this.loopActivated) {
                this.play(0);

            } else {
                this.paused = true;
                this.next.emit(this.shuffleActivated);
            }
        });
        this.audioPlayer.isInitialized().then(() => {
            this.audioPlayer.create("Drums");
            this.audioPlayer.create("Piano");
            this.audioPlayer.create("Bass");
            this.audioPlayer.create("Vocals");
            this.audioPlayer.create("Other");
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['track']) {
            this.duration = 0;
            this.paused = true;
            this.progress = 0;
            this.tracksReady = 0;
            this.speed = 1;
            this.pitch = 0;
            this.audioPlayer.finish();
        }
    }

    public getBPMValue(track?: Track): string {
        const bpm = track ? track.bpm : -1;
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
        return `${SERVER_URL}/music/output/${this.track?.filename}/drums.mp3`;
    }

    public getPianoUrl(): string {
        return `${SERVER_URL}/music/output/${this.track?.filename}/piano.mp3`;
    }

    public getBassUrl(): string {
        return `${SERVER_URL}/music/output/${this.track?.filename}/bass.mp3`;
    }

    public getVocalsUrl(): string {
        return `${SERVER_URL}/music/output/${this.track?.filename}/vocals.mp3`;
    }

    public getOtherUrl(): string {
        return `${SERVER_URL}/music/output/${this.track?.filename}/other.mp3`;
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
        if (this.duration / this.progress > 1) {
            this.seek(0);
        } else {
            this.prev.emit();
        }
    }

    public onProgressBarChange(progressStatus: ProgressStatus) {
        if (progressStatus.rect) {
            this.dragData = {
                rect: progressStatus.rect,
                progress: progressStatus.progress,
                origin: null
            }
        } else {
            this.dragData = null;
            this.seek(progressStatus.progress);
        }
    }


    public onSolo(track: StemPlayerComponent) {
        if (this.trackComponents) {
            for (let trackComponent of this.trackComponents) {
                trackComponent.mute(track != trackComponent);
            }
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
        if (this.track && this.track.bpm >= 0) {
            let bpmMin = this.track?.bpm * 0.5;
            let bpmMax = this.track?.bpm * 4;
            granularity = 3.5 / (bpmMax - bpmMin);
        } else {
            granularity = 0.1;
        }
        let speed = this.speed += granularity * direction;
        this.setSpeed(speed);
    }

    private onPitchChange(direction: -1 | 1): void {
        this.pitch += direction;
        this.setPitch(this.pitch * 100);
    }

    public onProgressChange(progress: number) {
        this.seek(progress);
    }

    public onTrackLoaded() {
        if (this.firstLoad) {
            this.firstLoad = false;
        }
        this.tracksReady += 1;
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
            //TODO we could used a timed play if sync issues
            this.paused ? this.play() : this.pause();
    }

    // Private
    @HostListener('document:keypress', ['$event'])
    private handleKeyPress(e: KeyboardEvent): void {
        if (e.code == 'Space') {
            this.playPause();
        }
    }

    private seek(progress: number) {
        this.audioPlayer.seek(progress);
    }

    private setPitch(pitch: number) {
        this.audioPlayer.setPitch(pitch);
    }

    private setSpeed(speed: number) {
        this.audioPlayer.setSpeed(speed);
    }

    private play(progress?: number): void {
        this.paused = false;
        this.audioPlayer.play(progress);
    }

    private pause(): void {
        this.paused = true;
        this.audioPlayer.pause();
    }

    private setVolume(volume: number) {
        this.volume = volume;
        this.audioPlayer.setVolume(volume);
    }
}

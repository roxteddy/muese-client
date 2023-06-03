import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { DragData } from '../../app.module';
import { ProgressStatus } from '../../../app-ui/progress-bar/progress-bar.component';
import { AudioPlayerService } from '../../audio-player.service';
import { PlayerComponent } from '../player.component';
import { Stem } from '../../../model/stem';
import { SERVER_URL } from '../../app.component';

declare function linearPath(audioBuffer: AudioBuffer, options: {}): any;

@Component({
  selector: 'app-stem-player',
  templateUrl: './stem-player.component.html',
  styleUrls: ['./stem-player.component.scss']
})
export class StemPlayerComponent implements OnChanges, OnDestroy {
    @ViewChild('path') pathRef?: ElementRef;
    @ViewChild('path2') path2Ref?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() iconName = '';
    @Input() progress = 0;
    @Input() soloMode: StemPlayerComponent[] = [];
    @Input() stem: Stem | undefined;
    @Input() title = '';
    @Input() trackFilename: string = '';

    @Output() dragStatus = new EventEmitter<DragData | null>();
    @Output() loaded = new EventEmitter<void>();
    @Output() progressChange = new EventEmitter<number>();
    @Output() clickSolo = new EventEmitter<StemPlayerComponent>();

    balance = 0;
    currentTime: number = 0
    loading = false;
    loadingSubscription?: Subscription;
    muted = false;
    solo = false;
    volume = PlayerComponent.DEFAULT_VOLUME;

    constructor(private audioPlayer: AudioPlayerService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['stem']) {
            this.loading = true;
            this.currentTime = 0;
            this.muted = false;
            this.progress = 0;
            this.pathRef?.nativeElement?.setAttribute('d', '');
            this.path2Ref?.nativeElement?.setAttribute('d', '');
            this.loadingSubscription?.unsubscribe();

            this.loadTrack(changes['stem'].currentValue);
        }
        if (changes['soloMode']) {
            this.solo = this.soloMode.includes(this);
            this.mute(this.muted);
        }
    }

    ngOnDestroy() {
        this.loadingSubscription?.unsubscribe();
    }

    public onBalanceChange(balance: number) {
        this.balance = balance;
        this.audioPlayer.setBalance(this.title, balance);
    }

    public onMute(muted?: boolean) {
        if (typeof muted === 'undefined') {
            this.muted = !this.muted;
        } else {
            this.muted = muted;
        }
        if (this.muted && this.solo) {
            this.clickSolo.emit(this);
        } else {
            this.mute(this.muted);
        }
    }

    public onCanvasTap(e: unknown, container: HTMLDivElement) {
        let hammerEvent = e as HammerInput;
        let clientX;
        if (hammerEvent.srcEvent instanceof TouchEvent) {
            clientX = hammerEvent.srcEvent.touches[0]?.clientX;
        } else {
            clientX = hammerEvent.srcEvent.clientX;
        }
        const rect = container.getBoundingClientRect();
        this.progressChange.emit((clientX - rect.left) / rect.width);
    }

    public onCanvasMouseDown(e: unknown, container: HTMLDivElement) {
        let hammerEvent = e as HammerInput;
        hammerEvent.preventDefault();
        let clientX;
        if (hammerEvent.srcEvent instanceof TouchEvent) {
            clientX = hammerEvent.srcEvent.touches[0]?.clientX;
        } else {
            clientX = hammerEvent.srcEvent.clientX;
        }
        let rect = container.getBoundingClientRect();
        this.dragStatus.emit({
            rect,
            progress: (clientX - rect.left) / rect.width,
            origin: this
        });

    }

    public onVolumeProgress(volumeStatus: ProgressStatus) {
        this.setVolume(volumeStatus.progress);
    }

    @HostListener('panmove', ['$event'])
    public documentMouseMove(e: HammerInput) {
        if (this.dragData?.origin == this) {
            e.preventDefault();
            let clientX;
            if (e.srcEvent instanceof TouchEvent) {
                clientX = e.srcEvent.touches[0]?.clientX;
            } else {
                clientX = e.srcEvent.clientX;
            }
            let progress = (clientX - this.dragData.rect.left) / this.dragData.rect.width;
            if (progress < 0) {
                progress = 0;
            } else if (progress > 1) {
                progress = 1;
            }
            this.dragStatus.emit({
                ...this.dragData,
                progress
            });
        }
    }

    @HostListener('panend', ['$event'])
    public windowMouseUp(e: HammerInput) {
        if (this.dragData?.origin == this) {
            e.preventDefault();
            this.progressChange.emit(this.dragData.progress);
            this.dragStatus.emit(null);
        }
    }

    public onSolo() {
        this.clickSolo.emit(this);
    }

    private analyzeTrack(arrayBuffer: ArrayBuffer, currentStem: Stem) {
        this.audioPlayer.getContext()?.decodeAudioData(arrayBuffer).then(
            (audioBuffer) => {
                if (currentStem !== this.stem)
                    return;

                const left = audioBuffer.getChannelData(0);
                const right = audioBuffer.getChannelData(1);
                for (let i = 0; i < audioBuffer.length; i++)
                    left[i] = (left[i] + right[i]) / 2;
                audioBuffer.copyToChannel(left, 0);

                // WaveForm
                const newPath = linearPath(audioBuffer, {
                    normalize: true,
                    samples: 150,
                    type: 'mirror',
                    width: 377,
                    height: 32,
                    paths: [{d:'V', sx: 1, sy: 0, x:50, ey:100 }]
                });
                this.pathRef?.nativeElement?.setAttribute('d', newPath);
                this.path2Ref?.nativeElement?.setAttribute('d', newPath);
        });
    }

    private loadTrack(currentStem: Stem) {
        this.audioPlayer.isInitialized().then(() => {
            if (currentStem === this.stem && this.stem) {
                const url = `${SERVER_URL}/music/output/${this.trackFilename}/${this.stem.filename}`
                this.setVolume(PlayerComponent.DEFAULT_VOLUME);
                this.loadingSubscription = this.audioPlayer.loadFromUrl(this.title, url).subscribe({
                    next: (v) => {
                        if (v.type === HttpEventType.DownloadProgress && typeof v.progress !== 'undefined') {
                            this.progress = v.progress;
                        } else if (v.type === HttpEventType.Response && typeof  v.arrayBuffer !== 'undefined') {
                            this.loadingSubscription?.unsubscribe();
                            this.loading = false;
                            this.loaded.emit();
                            this.progress = 0;

                            this.analyzeTrack(v.arrayBuffer, currentStem);
                        }
                    },error: (e) => {
                        this.loading = false;
                        this.loaded.emit();
                        this.loadingSubscription?.unsubscribe();
                    }});
            }
        });
    }

    private mute(muted: boolean) {
        this.audioPlayer.mute(this.title, !this.solo && (muted || this.soloMode.length != 0));
    }

    private setVolume(volume: number) {
        this.volume = volume;
        this.audioPlayer.setVolume(volume, this.title);
    }
}

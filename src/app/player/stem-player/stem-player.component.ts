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
    @Input() progress = 0;
    @Input() title = '';
    @Input() url: string = '';

    @Output() dragStatus = new EventEmitter<DragData | null>();
    @Output() loaded = new EventEmitter<void>();
    @Output() progressChange = new EventEmitter<number>();
    @Output() solo = new EventEmitter<StemPlayerComponent>();

    currentTime: number = 0
    loading: boolean = false;
    loadingSubscription?: Subscription;
    muted: boolean = false;
    volume: number = PlayerComponent.DEFAULT_STEM_VOLUME;

    constructor(private audioPlayer: AudioPlayerService) {
        console.log(this.volume);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['url']) {
            this.loading = true;
            this.currentTime = 0;
            this.muted = false;
            this.progress = 0;
            this.pathRef?.nativeElement?.setAttribute('d', '');
            this.path2Ref?.nativeElement?.setAttribute('d', '');
            this.loadingSubscription?.unsubscribe();

            this.loadTrack(changes['url'].currentValue);
        }
    }

    ngOnDestroy() {
        this.loadingSubscription?.unsubscribe();
    }

    public mute(muted?: boolean) {
        if (typeof muted === 'undefined') {
            this.muted = !this.muted;
        } else {
            this.muted = muted;
        }
        this.audioPlayer.mute(this.title, this.muted);
    }

    public onCanvasMouseDown(e: MouseEvent, container: HTMLDivElement) {
        if (e.button === 0) {
            let rect = container.getBoundingClientRect();
            this.dragStatus.emit({
                rect,
                progress: (e.clientX - rect.left) / rect.width,
                origin: this
            });
        }
    }

    public onVolumeProgress(volumeStatus: ProgressStatus) {
        this.setVolume(volumeStatus.progress);
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.dragData?.origin == this) {
            e.preventDefault();
            let progress = (e.clientX - this.dragData.rect.left) / this.dragData.rect.width;
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

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.dragData?.origin == this) {
            this.progressChange.emit(this.dragData.progress);
            this.dragStatus.emit(null);
        }
    }

    public onSolo() {
        this.solo.emit(this);
    }

    private analyzeTrack(arrayBuffer: ArrayBuffer, currentUrl: string) {
        this.audioPlayer.getContext()?.decodeAudioData(arrayBuffer).then(
            (audioBuffer) => {
                if (currentUrl !== this.url)
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

    private loadTrack(currentUrl: string) {
        this.audioPlayer.isInitialized().then(() => {
            if (currentUrl === this.url) {
                this.setVolume(PlayerComponent.DEFAULT_STEM_VOLUME);
                this.loadingSubscription = this.audioPlayer.loadFromUrl(this.title, this.url).subscribe({
                    next: (v) => {
                        if (v.type === HttpEventType.DownloadProgress && typeof v.progress !== 'undefined') {
                            this.progress = v.progress;
                        } else if (v.type === HttpEventType.Response && typeof  v.arrayBuffer !== 'undefined') {
                            this.loadingSubscription?.unsubscribe();
                            this.loading = false;
                            this.loaded.emit();
                            this.progress = 0;

                            this.analyzeTrack(v.arrayBuffer, currentUrl);
                        }
                    },error: (e) => {
                        this.loading = false;
                        this.loaded.emit();
                        this.loadingSubscription?.unsubscribe();
                    }});
            }
        });
    }

    private setVolume(volume: number) {
        this.volume = volume;
        this.audioPlayer.setVolume(volume, this.title);
    }
}

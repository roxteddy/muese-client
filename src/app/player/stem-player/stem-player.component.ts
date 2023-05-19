import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Howl as HowlObject } from 'howler';
import { Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DragData } from '../../app.module';
import { ProgressStatus } from '../../../app-ui/progress-bar/progress-bar.component';
import { guess } from 'web-audio-beat-detector';
import { AudioPlayerService } from '../../audio-player.service';

declare function linearPath(audioBuffer: AudioBuffer, options: {}): any;

@Component({
  selector: 'app-stem-player',
  templateUrl: './stem-player.component.html',
  styleUrls: ['./stem-player.component.scss']
})
export class StemPlayerComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    @ViewChild('path') pathRef?: ElementRef;
    @ViewChild('path2') path2Ref?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() progress = 0;
    @Input() title = '';
    @Input() url: string = '';

    // @Output() bpm: EventEmitter<number> = new EventEmitter<number>();
    @Output() dragStatus = new EventEmitter<DragData | null>();
    @Output() loaded = new EventEmitter<void>();
    @Output() progressChange = new EventEmitter<number>();
    @Output() solo = new EventEmitter<StemPlayerComponent>();

    currentTime: number = 0
    loading: boolean = false;
    intervalId?: number;
    muted: boolean = false;
    volume: number = 0.75;

    constructor(private audioPlayer: AudioPlayerService,
                private readonly httpClient: HttpClient) {}

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['url']) {
            // if (this.audio) {
            //     this.audio.unload();
            // }
            this.loading = true;


                //TODO : setVolume?
            this.audioPlayer.isInitialized()
                // .then(() => this.audioPlayer.load(this.title, this.url))
                // .then((duration) => {
                //     this.loading = false;
                //     this.loaded.next();
                //     console.log(this.title + 'has loaded');
                // });
                .then(() => {
                    this.httpClient.get(changes['url'].currentValue, {
                        observe: 'events',
                        reportProgress: true,
                        responseType: 'blob'
                    }).subscribe({
                        next : (event: HttpEvent<Blob>) => {
                            if (event.type == HttpEventType.DownloadProgress) {
                                if (event.total) {
                                    this.progress = event.loaded / event.total;
                                }
                            }
                            if (event.type == HttpEventType.Response) {
                                let blob = event.body;
                                if (blob) {
                                    blob.arrayBuffer().then((arrayBuffer) => {
                                       //const wasmPointer = this.audioPlayer.decodeToWasm(arrayBuffer);
                                        this.audioPlayer.load(this.title, arrayBuffer).then(() => {
                                            this.progress = 0;
                                            this.loading = false;
                                            this.loaded.emit();
                                            this.audioPlayer.getContext()?.decodeAudioData(arrayBuffer).then(
                                                (audioBuffer) => {
                                                    // BPM Detection
                                                    // if (this.bpm.observed) {
                                                    //     guess(audioBuffer).then((
                                                    //         {bpm, offset}) => this.bpm.emit(bpm),
                                                    //         () => this.bpm.emit(-2));
                                                    // }

                                                    // WaveForm
                                                    const newPath = linearPath(audioBuffer,
                                                        {samples:150, type: 'mirror', minshow: 0.8, maxshow: 1, normalize: true, width: 377, height: 32, paths: [
                                                                {d:'V', sy: 0, x:50, ey:100 }
                                                            ]});
                                                    this.pathRef?.nativeElement?.setAttribute('d', newPath);
                                                    this.path2Ref?.nativeElement?.setAttribute('d', newPath);
                                                });
                                        });
                                    });
                                } else {
                                    // TODO: error case
                                    this.loaded.emit();
                                    this.loading = false;
                                }
                            }
                        }, error: (e) => {
                            // TODO: error case
                            this.loaded.emit();
                            this.loading = false;
                        }
                    });
                });


            if (!changes['url'].firstChange) {
                this.currentTime = 0;
                this.muted = false;
                this.progress = 0;
                this.pathRef?.nativeElement?.setAttribute('d', '');
                this.path2Ref?.nativeElement?.setAttribute('d', '');
            }
        }
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public mute(muted?: boolean) {
        if (typeof muted === 'undefined') {
            this.muted = !this.muted;
        } else {
            this.muted = muted;
        }
        this.audioPlayer.mute(this.title);
    }

    public onCanvasMouseDown(e: MouseEvent, container: HTMLDivElement) {
        let rect = container.getBoundingClientRect();
        this.dragStatus.emit({
            rect,
            progress: (e.clientX - rect.left) / rect.width,
            origin: this
        });
    }

    public onVolumeProgress(volumeStatus: ProgressStatus) {
        this.audioPlayer.setVolume(volumeStatus.progress, this.title);
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
}

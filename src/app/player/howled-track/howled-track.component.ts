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

declare var Howl: any;

declare function linearPath(audioBuffer: AudioBuffer, options: {}): any;

@Component({
  selector: 'app-howled-track',
  templateUrl: './howled-track.component.html',
  styleUrls: ['./howled-track.component.scss']
})
export class HowledTrackComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    @ViewChild('path') pathRef?: ElementRef;
    @ViewChild('path2') path2Ref?: ElementRef;

    @Input() dragData: DragData | null = null;
    @Input() newTime: number | undefined;
    @Input() playSubject?: Subject<number>;
    @Input() pauseSubject?: Subject<void>;
    @Input() seekSubject?: Subject<number>;
    @Input() speedSubject?: Subject<number>;
    @Input() toneSubject?: Subject<number>;
    @Input() title?: string;
    @Input() url?: string;

    // @Output() bpm: EventEmitter<number> = new EventEmitter<number>();
    @Output() dragStatus: EventEmitter<DragData | null> = new EventEmitter<DragData | null>();
    @Output() loaded: EventEmitter<number> = new EventEmitter<number>();
    @Output() timeChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() timeProgress: EventEmitter<number> = new EventEmitter<number>();
    @Output() ended: EventEmitter<void> = new EventEmitter<void>();
    @Output() solo: EventEmitter<HowledTrackComponent> = new EventEmitter<HowledTrackComponent>();

    leftNode?: GainNode;
    rightNode?: GainNode;
    currentTime: number = 0
    loading: boolean = false;
    intervalId?: number;
    muted: boolean = false;
    progressWidth: number = 0;
    volume: number = 0.75;

    private audio?: HowlObject;
    constructor(private readonly httpClient: HttpClient) {}

    ngOnInit() {
        this.playSubject?.subscribe((time) => {
            this.audio?.seek(time);
            this.audio?.play();
        });
        this.pauseSubject?.subscribe(() => this.audio?.pause());
        this.seekSubject?.subscribe((time) => this.setCurrentTime(time));
        this.speedSubject?.subscribe((speed) => {
            this.audio?.rate(speed);
        });

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['url']) {
            if (this.audio) {
                this.audio.unload();
            }
            this.loading = true;
            this.httpClient.get(changes['url'].currentValue, {
                observe: 'events',
                reportProgress: true,
                responseType: 'blob'
            }).subscribe({
                next : (event: HttpEvent<Blob>) => {
                    if (event.type == HttpEventType.DownloadProgress) {
                        if (event.total) {
                            this.setProgress(event.loaded / event.total);
                        }
                    }
                    if (event.type == HttpEventType.Response) {
                        let blob = event.body;
                        if (blob) {
                            const url = (window.URL || window.webkitURL ).createObjectURL(blob);
                            this.audio = new Howl({src: url, format: 'mp3'});

                            // let inputNode: GainNode = (this.audio as any)._sounds[0]?._node;
                            // inputNode.disconnect();

                            //TODO make it available from outside
                            Howler.ctx.audioWorklet?.addModule('assets/scripts/phase-vocoder.min.js').then(() => {
                                let inputNode: GainNode = (this.audio as any)._sounds[0]?._node;
                            });

                            // let splitter = Howler.ctx.createChannelSplitter();
                            // inputNode.connect(splitter);

                            // this.leftNode = Howler.ctx.createGain();
                            // this.rightNode = Howler.ctx.createGain();
                            // splitter.connect(this.leftNode, 0, 0);
                            // splitter.connect(this.rightNode, 1, 0);
                            // let merger = Howler.ctx.createChannelMerger();
                            // this.leftNode.connect(merger, 0, 0);
                            // this.rightNode.connect(merger, 0, 1);
                            // merger.connect(Howler.masterGain);
                            this.audio?.volume(this.volume);
                            this.audio?.on('load', () => {
                                this.loading = false;

                                if (blob) {
                                    blob.arrayBuffer()

                                        .then(arrayBuffer => new AudioContext().decodeAudioData(arrayBuffer))
                                        .then(audioBuffer => {
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
                                            this.loaded.emit(this.audio?.duration());
                                        });
                                }
                            });
                            this.audio?.on('end', () => this.ended.emit());
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

            if (!changes['url'].firstChange) {
                this.currentTime = 0;
                this.muted = false;
                this.progressWidth = 0;
                this.pathRef?.nativeElement?.setAttribute('d', '');
                this.path2Ref?.nativeElement?.setAttribute('d', '');
            }
        }
    }

    ngAfterViewInit() {
        this.intervalId = setInterval(() => this.updateCounter(), 25);
    }

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
        this.audio?.mute(this.muted);
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
        this.volume = volumeStatus.progress;
        this.audio?.volume(this.volume);
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
        if (this.dragData?.origin == this && this.audio) {
            const time = this.dragData.progress * this.audio.duration();
            this.timeChange.emit(time);
            this.dragStatus.emit(null);
        }
    }

    public onSolo() {
        this.solo.emit(this);
    }

    private setCurrentTime(time: number) {
        if (this.audio) {
            this.audio.seek(time);
            this.setProgress(time / this.audio.duration())
        }
    }
    private setProgress(value: number) {
        this.progressWidth = value * 100;
    }
    private updateCounter() {
        if (this.audio) {
            this.currentTime = this.audio.seek();
            this.timeProgress.emit(this.currentTime);
            if (!this.dragData) {
                this.setProgress(this.currentTime / this.audio.duration());
            }
        }
    }
}

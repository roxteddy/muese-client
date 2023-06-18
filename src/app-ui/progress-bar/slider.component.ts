import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

export interface ProgressStatus {
    rect: DOMRect | null,
    progress: number
};

@Component({
    selector: 'app-ui-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnChanges {
    @Input() ariaLabel: string = 'Undefined slider';
    @Input() dragged = false;
    @Input() duration: number = -1;
    @Input() emitSeekOnWheel = false;
    @Input() emitSeekOnDrag = false;
    @Input() faded = false;
    @Input() hasButton = false;
    @Input() scrollGranularity = 0.05;
    @Input() seek?: number;

    @Output() progress: EventEmitter<ProgressStatus> = new EventEmitter<ProgressStatus>();

    progressStatus: ProgressStatus = {
        rect: null,
        progress : 0
    };
    wheeling = -1;

    constructor(private readonly cdr: ChangeDetectorRef,
                private readonly elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['seek']) {
            const progress = changes['seek'].currentValue;
            if (typeof progress !== 'undefined') {
                this.progressStatus = {
                    ...this.progressStatus,
                    progress
                }
            }
        }
    }

    public getAriaValueText(time: number, progressStatus: ProgressStatus) {
        let ariaValueText;
        if (time === -1) {
            ariaValueText = progressStatus.progress * 100 + ' percent';
        } else {
            const currentTime = Math.round(this.duration * this.progressStatus.progress);
            let minutes = Math.floor(currentTime / 60);
            let seconds = currentTime % 60;
            ariaValueText = `${minutes} minutes`;
            if (seconds) {
                ariaValueText += ` and ${seconds} seconds`;
            }
            minutes = Math.floor(time / 60);
            seconds = time % 60;
            ariaValueText += ` on ${minutes} minutes`;
            if (seconds) {
                ariaValueText += ` and ${seconds} seconds`;
            }
        }
        return ariaValueText;
    }

    @HostListener('keydown', ['$event'])
    private handleKeyPress(e: KeyboardEvent): void {
        console.log(e);
        if (e.code == 'ArrowLeft') {
            e.preventDefault();
            const progress = this.progressStatus.progress - 0.01;
            this.progressStatus = {
                ...this.progressStatus,
                progress: progress < 0 ? 0 : progress
            }
            this.progress.emit(this.progressStatus);
        } else if (e.code == 'ArrowRight') {
            e.preventDefault();
            const progress = this.progressStatus.progress + 0.01;
            this.progressStatus = {
                ...this.progressStatus,
                progress: progress > 1 ? 1 : progress
            }
            this.progress.emit(this.progressStatus);
        }
    }

    @HostListener('tap', ['$event'])
    onTap(e: HammerInput) {
        this.progressStatus = {
            ...this.progressStatus,
            progress: this.calcProgress(e.srcEvent, this.elementRef.nativeElement.getBoundingClientRect())
        }
        this.progress.emit(this.progressStatus);
    }

    @HostListener('panstart', ['$event'])
    public onMouseDown(e: HammerInput) {
        e.preventDefault();
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        this.progressStatus = {
            rect,
            progress: this.calcProgress(e.srcEvent, rect)
        }
        if (this.emitSeekOnDrag) {
            this.progress.emit(this.progressStatus);
        }
        document.body.style.cursor = 'ew-resize';
    }

    @HostListener('wheel', ['$event'])
    public onWheel(e: WheelEvent) {
        e.preventDefault();
        if (this.wheeling > -1) {
            clearTimeout(this.wheeling);
            this.wheeling = -1;
        }
        let progress = this.progressStatus.progress - e.deltaY * 0.01 * this.scrollGranularity;
        if (progress < 0) {
            progress = 0;
        } else if (progress > 1) {
            progress = 1;
        }
        this.progressStatus = {
            ...this.progressStatus,
            progress
        }

        if (!this.emitSeekOnWheel) {
            this.wheeling = setTimeout(() => {
                this.progressStatus = {
                    ...this.progressStatus,
                    rect: null
                }
                this.progress.emit(this.progressStatus);
                this.wheeling = -1;
            }, 150);
            this.progressStatus.rect = (e.target as HTMLDivElement).getBoundingClientRect();
        }

        this.progress.emit(this.progressStatus);
    }

    @HostListener('panmove', ['$event'])
    public documentMouseMove(e: HammerInput) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus = {
                ...this.progressStatus,
                progress: this.calcProgress(e.srcEvent, this.progressStatus.rect)
            }
            if (this.emitSeekOnDrag) {
                this.progress.emit(this.progressStatus);
            };
        }
    }

    @HostListener('panend', ['$event'])
    public windowMouseUp(e: TouchEvent) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus = {
                ...this.progressStatus,
                rect: null
            }
            this.progress.emit(this.progressStatus);
            document.body.style.cursor = 'unset';
        }
    }

    private calcProgress(e: TouchEvent | MouseEvent | PointerEvent, rect: DOMRect) {
        let clientX;
        if (e instanceof TouchEvent) {
            clientX = e.touches[0]?.clientX;
        } else {
            clientX = e.clientX;
        }

        let progress = (clientX - rect.left) / rect.width;
        if (progress < 0) {
            progress = 0;
        } else if (progress > 1) {
            progress = 1;
        }
        return progress;
    }
}

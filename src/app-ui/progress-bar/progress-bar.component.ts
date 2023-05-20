import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export interface ProgressStatus {
    rect: DOMRect | null,
    progress: number
};

@Component({
    selector: 'app-ui-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
    @Input() dragged: boolean = false;
    @Input() faded: boolean = false;
    @Input() hasButton: boolean = false;
    //TODO test if ok or need a subject
    @Input() seek?: number;
    @Input() emitSeekOnDrag: boolean = false;

    @Output() progress: EventEmitter<ProgressStatus> = new EventEmitter<ProgressStatus>();

    progressStatus: ProgressStatus = {
        rect: null,
        progress : 0
    };

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

    public onMouseDown(e: MouseEvent, container: HTMLDivElement) {
        if (e.button === 0) {
            const rect = container.getBoundingClientRect();
            this.progressStatus = {
                rect,
                progress: this.calcProgress(e, rect)
            }
            if (this.emitSeekOnDrag) {
                this.progress.emit(this.progressStatus);
            }
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus = {
                ...this.progressStatus,
                progress: this.calcProgress(e, this.progressStatus.rect)
            }
            if (this.emitSeekOnDrag) {
                this.progress.emit(this.progressStatus);
            };
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus = {
                ...this.progressStatus,
                rect: null
            }

            this.progress.emit(this.progressStatus);
        }
    }

    private calcProgress(e: MouseEvent, rect: DOMRect) {
        let progress = (e.clientX - rect.left) / rect.width;
        if (progress < 0) {
            progress = 0;
        } else if (progress > 1) {
            progress = 1;
        }
        return progress;
    }
}

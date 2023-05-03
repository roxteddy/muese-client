import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-ui-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
    @Input() faded: boolean = false;
    @Input() hasButton: boolean = false;
    //TODO test if ok or need a subject
    @Input() seek?: number;
    @Input() seekOnDrag: boolean = false;

    @Output() progress: EventEmitter<number> = new EventEmitter<number>();

    progressStatus: {
        rect: DOMRect | null,
        progress: number
    } = {
        rect: null,
        progress : 0
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['seek']) {
            const progress = changes['seek'].currentValue;
            if (typeof progress !== 'undefined') {
                this.progressStatus.progress = progress;
                this.progress.emit(progress);
            }
        }
    }

    public onMouseDown(e: MouseEvent, container: HTMLDivElement) {
        const rect = container.getBoundingClientRect();
        this.progressStatus.rect = rect;
        this.progressStatus.progress = this.calcProgress(e, rect);
    }

    @HostListener('document:mousemove', ['$event'])
    public documentMouseMove(e: MouseEvent) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus.progress = this.calcProgress(e, this.progressStatus.rect);
            if (this.seekOnDrag) {
                this.progress.emit(this.progressStatus.progress);
            };
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public windowMouseUp(e: MouseEvent) {
        if (this.progressStatus.rect) {
            e.preventDefault();
            this.progressStatus.rect = null;

            if (this.seekOnDrag) {
                this.progress.emit(this.progressStatus.progress);
            }
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

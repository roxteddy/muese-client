import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'app-ui-balance-button',
    templateUrl: './balance-button.component.html',
    standalone: true,
    styleUrls: ['./balance-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceButtonComponent {
    @Input() balance = 0;

    @Output() balanceChange = new EventEmitter<number>();

    lastPosition = -1;

    constructor(private readonly elementRef: ElementRef) {
    }
    @HostListener('mousedown', ['$event'])
    onMouseDown(e: MouseEvent) {
        if (e.button === 0) {
            this.lastPosition = e.clientX;
            document.body.style.cursor = 'ew-resize';
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (this.lastPosition !== -1) {
            e.preventDefault();
            this.setBalance(this.calcBalance(e));
            this.lastPosition = e.clientX;
        }
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e: MouseEvent) {
        if (this.lastPosition !== -1) {
            e.preventDefault();
            this.lastPosition = -1;
            document.body.style.cursor = 'unset';
        }
    }

    @HostListener('dblclick', ['$event'])
    onDoubleClick(e: MouseEvent) {
        if (e.button === 0) {
            this.setBalance(0);
        }
    }

    private setBalance(balance: number) {
        this.balance = balance;
        this.balanceChange.emit(balance);
    }

    private calcBalance(e: MouseEvent) {
        const rect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
        const movement = e.clientX - (this.lastPosition || 0);


        let balance = this.balance + (movement / rect.width);
        if (balance < -1) {
            balance = -1;
        } else if (balance > 1) {
            balance = 1;
        }
        return balance;
    }
}

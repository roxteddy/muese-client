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

    isDragged = false;

    @HostListener('panstart', ['$event'])
    onPanStart(e: HammerInput) {
        e.preventDefault();
        this.isDragged = true;
        document.body.style.cursor = 'ew-resize';
    }

    @HostListener('panmove', ['$event'])
    onPanMove(e: HammerInput) {
        if (this.isDragged) {
            e.preventDefault();
            this.setBalance(this.calcBalance(e));
        }
    }

    @HostListener('panend', ['$event'])
    onPanEnd(e: HammerInput) {
        if (this.isDragged) {
            e.preventDefault();
            this.isDragged = false;
            document.body.style.cursor = 'unset';
        }
    }

    @HostListener('tap', ['$event'])
    onDoubleClick(e: HammerInput) {
        if ((e as any).tapCount === 2) {
            this.setBalance(0);
        }
    }

    private setBalance(balance: number) {
        this.balance = balance;
        this.balanceChange.emit(balance);
    }

    private calcBalance(e: HammerInput) {
        let balance = e.deltaX / 100;
        if (balance < -1) {
            balance = -1;
        } else if (balance > 1) {
            balance = 1;
        }
        return balance;
    }
}

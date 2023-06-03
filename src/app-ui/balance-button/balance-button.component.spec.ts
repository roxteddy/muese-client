import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceButtonComponent } from './balance-button.component';

describe('BalanceButtonComponent', () => {
  let component: BalanceButtonComponent;
  let fixture: ComponentFixture<BalanceButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceButtonComponent]
    });
    fixture = TestBed.createComponent(BalanceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

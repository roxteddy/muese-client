import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowledTrackComponent } from './howled-track.component';

describe('HowledTrackComponent', () => {
  let component: HowledTrackComponent;
  let fixture: ComponentFixture<HowledTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowledTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowledTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

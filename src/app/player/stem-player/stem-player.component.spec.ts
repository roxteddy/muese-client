import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StemPlayerComponent } from './stem-player.component';

describe('HowledTrackComponent', () => {
  let component: StemPlayerComponent;
  let fixture: ComponentFixture<StemPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StemPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StemPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

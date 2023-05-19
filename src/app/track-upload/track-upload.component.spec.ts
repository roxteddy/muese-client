import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackUploadComponent } from './track-upload.component';

describe('SongUploadComponent', () => {
  let component: TrackUploadComponent;
  let fixture: ComponentFixture<TrackUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

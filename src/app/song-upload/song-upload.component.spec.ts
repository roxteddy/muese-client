import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongUploadComponent } from './song-upload.component';

describe('SongUploadComponent', () => {
  let component: SongUploadComponent;
  let fixture: ComponentFixture<SongUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AppUiModule } from '../app-ui/app-ui.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AudioPlayerService } from './audio-player.service';
import { StemPlayerComponent } from './player/stem-player/stem-player.component';
import { TrackUploadComponent } from './track-upload/track-upload.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

export interface DragData {
    rect: DOMRect
    progress: number
    origin: StemPlayerComponent | null
}

@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        TrackUploadComponent,
        StemPlayerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        NgScrollbarModule,
        FormsModule,
        AppUiModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [AudioPlayerService],
    bootstrap: [AppComponent]
})
export class AppModule { }

export const musicalChordNames = [
    "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", /// major
    "Am", "A#m", "Bm", "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m" /// minor
];

let camelotChordNames = [
    "11B", "6B", "1B", "8B", "3B", "10B", "5B", "12B", "7B", "2B", "9B", "4B", /// major
    "8A", "3A", "10A", "5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A" /// minor
];

let openkeyChordNames = [
    "4d", "11d", "6d", "1d", "8d", "3d", "10d", "5d", "12d", "7d", "2d", "9d", /// major
    "1m", "8m", "3m", "10m", "5m", "12m", "7m", "2m", "9m", "4m", "11m", "6m" /// minor
];

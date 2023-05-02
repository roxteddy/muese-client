import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './player/player.component';
import { SongUploadComponent } from './song-upload/song-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HowledTrackComponent } from './player/howled-track/howled-track.component';

export interface DragData {
    rect: DOMRect
    offsetWidth: number
    newWidth: number
    origin: HowledTrackComponent
}

@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        SongUploadComponent,
        HowledTrackComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

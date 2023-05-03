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
import { AppUiModule } from '../app-ui/app-ui.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface DragData {
    rect: DOMRect
    progress: number
    origin: HowledTrackComponent | null
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
        AppUiModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

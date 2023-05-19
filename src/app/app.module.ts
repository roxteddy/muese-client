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

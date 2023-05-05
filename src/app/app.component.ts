import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SongUploadComponent } from './song-upload/song-upload.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface Song {
    id: number
    title: string
    artist: string
    filename: string
    processed: boolean
}

export const SERVER_URL = 'http://roxteddy.noip.me:3000';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    songs: Song[] = [];
    selectedSong?: Song;

    constructor(private readonly dialog: MatDialog,
                private readonly domSanitizer: DomSanitizer,
                private readonly matIconRegistry: MatIconRegistry,
                private readonly http: HttpClient) {
        this.matIconRegistry.addSvgIcon(
            `m`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/m.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `s`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/s.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `drums`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/drums.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `piano`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/piano.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `bass`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/bass.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `vocals`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/vocals.svg`)
        );
        this.matIconRegistry.addSvgIcon(
            `other`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/other.svg`)
        );
    }

    ngOnInit(): void {
        this.getSongs();
    }

    public refresh(): void {
        this.getSongs();
    }

    public loadSong(song: Song): void {
        this.selectedSong = song;
    }

    public onNext(shuffle: boolean): void {
        let currentIndex = this.selectedSong ? (this.songs.indexOf(this.selectedSong)) : 0;
        let index = currentIndex;

        if (shuffle) {
            while (index === currentIndex) {
                index = Math.floor(Math.random() * this.songs.length);
            }
        } else {
            index = (currentIndex + 1) % this.songs.length;
        }
        this.selectedSong = this.songs[index];
    }

    public onPrev(): void {
        let index = this.selectedSong ? (this.songs.indexOf(this.selectedSong) - 1) % this.songs.length : 0;
        this.selectedSong = this.songs[index];
    }

    public addSong(): void {
        this.dialog.open(SongUploadComponent);
    }

    private getSongs(): void {
        this.loading = true;
        this.http.get<Song[]>(`${SERVER_URL}/song`)
            .pipe(delay(1000))
            .subscribe((songs) => {
            this.songs = songs;
            this.loading = false;

            if (!this.selectedSong && songs.length) {
                this.selectedSong = songs[Math.floor(Math.random()*songs.length)];
            }
        });
    }
}

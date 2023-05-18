import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SongUploadComponent } from './song-upload/song-upload.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioPlayerService } from './audio-player.service';

export enum SongStatus {
    IDLE,
    QUEUED,
    PROCESSING,
    READY,
    ERROR,
}
export interface Song {
    id: number
    title: string
    artist: string
    filename: string
    duration: number
    bpm: number
    status: SongStatus
}

export const SERVER_URL = 'https://roxteddy.noip.me:3000';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    songs: Song[] = [];
    selectedSong?: Song;

    constructor(private readonly audioPlayerService: AudioPlayerService,
                private readonly dialog: MatDialog,
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
        //this.getSongs();
        // this.audioPlayerService.isInitialized()
        //     .then(() => this.audioPlayerService.create())
        //     .then(() => this.audioPlayerService.load('/assets/pop.mp3'))
        //     .then(() => this.audioPlayerService.play());
        this.audioPlayerService.progress.subscribe(time => console.log(time));

        this.audioPlayerService.isInitialized()
            .then(() => this.audioPlayerService.create('drums'))
            .then(() => this.audioPlayerService.load('drums', '/assets/drums.mp3'))
            .then(() => this.audioPlayerService.create('piano'))
            .then(() => this.audioPlayerService.load('piano', '/assets/piano.mp3'))
            .then(() => this.audioPlayerService.create('bass'))
            .then(() => this.audioPlayerService.load('bass', '/assets/bass.mp3'))
            .then(() => this.audioPlayerService.create('vocals'))
            .then(() => this.audioPlayerService.load('vocals', '/assets/vocals.mp3'))
            .then(() => this.audioPlayerService.create('other'))
            .then(() => this.audioPlayerService.load('other', '/assets/other.mp3'))
            .then(() => this.audioPlayerService.play());
    }

    public refresh(): void {
        //this.getSongs();
    }

    public loadSong(song: Song): void {
        this.selectedSong = song;
    }

    public onNext(shuffle: boolean): void {
        let availableSongs = this.getAvailableSongs();
        if (availableSongs.length) {
            let currentIndex = this.selectedSong ? (availableSongs.indexOf(this.selectedSong)) : -1;
            let index = currentIndex;

            if (shuffle) {
                while (index === currentIndex) {
                    index = Math.floor(Math.random() * availableSongs.length);
                }
            } else {
                index = (currentIndex + 1) % availableSongs.length;
            }
            this.selectedSong = availableSongs[index];
        }
    }

    public onPrev(): void {
        let availableSongs = this.getAvailableSongs();
        if (availableSongs.length) {
            let index = this.selectedSong
                ? (availableSongs.indexOf(this.selectedSong) - 1) % availableSongs.length
                : 0;
            this.selectedSong = availableSongs[index];
        }
    }

    public addSong(): void {
        this.dialog.open(SongUploadComponent);
    }

    private getAvailableSongs() : Song[] {
        return this.songs.filter(song => song.status === SongStatus.READY);
    }

    private getSongs(): void {
        this.loading = true;
        this.http.get<Song[]>(`${SERVER_URL}/song`)
            .pipe(delay(1000))
            .subscribe((songs) => {
            this.songs = songs;
            this.loading = false;

            if (this.selectedSong) {
                this.selectedSong = this.songs.find(song => song.id === this.selectedSong?.id);
            } else {
                let availableSongs = this.getAvailableSongs();
                if (availableSongs.length) {
                    this.selectedSong = availableSongs[Math.floor(Math.random()*availableSongs.length)];
                }
            }
        });
    }

    protected readonly SongStatus = SongStatus;
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TrackUploadComponent } from './track-upload/track-upload.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioPlayerService } from './audio-player.service';
import { Track, TrackStatus } from '../model/track';

export const SERVER_URL = 'https://roxteddy.noip.me:3000';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loading: boolean = false;
    tracks: Track[] = [];
    selectedTrack?: Track;

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
        this.getTracks();
    }

    public refresh(): void {
        this.getTracks();
    }

    public loadTrack(track: Track): void {
        this.selectedTrack = track;
    }

    public onNext(shuffle: boolean): void {
        let availableTracks = this.getAvailableTracks();
        if (availableTracks.length) {
            let currentIndex = this.selectedTrack ? (availableTracks.indexOf(this.selectedTrack)) : -1;
            let index = currentIndex;

            if (shuffle) {
                while (index === currentIndex) {
                    index = Math.floor(Math.random() * availableTracks.length);
                }
            } else {
                index = (currentIndex + 1) % availableTracks.length;
            }
            this.selectedTrack = availableTracks[index];
        }
    }

    public onPrev(): void {
        let availableTracks = this.getAvailableTracks();
        if (availableTracks.length) {
            let index = this.selectedTrack
                ? (availableTracks.indexOf(this.selectedTrack) - 1) % availableTracks.length
                : 0;
            this.selectedTrack = availableTracks[index];
        }
    }

    public addTrack(): void {
        this.dialog.open(TrackUploadComponent);
    }

    private getAvailableTracks() : Track[] {
        return this.tracks.filter(track => track.status === TrackStatus.READY);
    }

    private getTracks(): void {
        this.loading = true;
        this.http.get<Track[]>(`${SERVER_URL}/track`)
            .pipe(delay(1000))
            .subscribe((tracks) => {
            this.tracks = tracks;
            this.loading = false;

            if (this.selectedTrack) {
                this.selectedTrack = this.tracks.find(track => track.filename === this.selectedTrack?.filename);
            } else {
                let availableTracks = this.getAvailableTracks();
                if (availableTracks.length) {
                    this.selectedTrack = availableTracks[Math.floor(Math.random()*availableTracks.length)];
                }
            }
        });
    }

    protected readonly TrackStatus = TrackStatus;
}

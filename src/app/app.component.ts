import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, timeout } from 'rxjs';

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
    SERVER_URL = SERVER_URL;
    constructor(private readonly http: HttpClient) {}

    ngOnInit(): void {
        this.getSongs();
    }

    public refresh(): void {
        this.getSongs();
    }

    public loadSong(song: Song): void {
        this.selectedSong = song;
    }

    public addSong(): void {

    }

    private getSongs(): void {
        this.loading = true;
        this.http.get<Song[]>(`${SERVER_URL}/song`)
            .pipe(delay(1000))
            .subscribe((songs) => {
            this.songs = songs;
            this.loading = false;
        });
    }
}

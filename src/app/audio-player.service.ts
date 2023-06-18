import { Injectable, RendererFactory2 } from '@angular/core';
// @ts-ignored
import { SuperpoweredWebAudio } from '../assets/scripts/Superpowered.js';
import {
    filter,
    first,
    firstValueFrom,
    map,
    mergeMap,
    Observable,
    of,
    ReplaySubject,
    Subject,
    Subscription,
    switchMap, takeUntil
} from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
    public duration = new Subject<number>();
    public progress = new Subject<number>();
    public end = new Subject<void>();

    private initSubject = new ReplaySubject<void>();
    private loadingSubject = new Subject<string>();
    private messageSubject = new Subject<any>();
    private playerProcessor?: SuperpoweredWebAudio.AudioWorkletProcessor;
    // @ts-ignored
    private superpowered?: Superpowered;
    private webaudioManager: SuperpoweredWebAudio;

    constructor(private readonly httpClient: HttpClient,
                private readonly rendererFactory: RendererFactory2) {
        const renderer = this.rendererFactory.createRenderer(null, null);
        const unlisten = renderer.listen('document', "click", () => {
            unlisten();
            this.loadSuperPowered().then(() => this.initSubject.next());
        });
        this.messageSubject.subscribe((message) => {
            switch (message.type) {
                case 'duration':
                    this.duration.next(message.duration);
                    break;
                case 'end':
                    this.end.next();
                    break;
                case'progress':
                    this.progress.next(message.progress);
                    break;
            }
        });
    }

    /*
    ** Service methods
    */
    getContext(): AudioContext {
        return this.webaudioManager?.audioContext;
    }

    isInitialized(): Promise<void> {
        return firstValueFrom(this.initSubject);
    }

    /*
    ** Player Commands
    */
    create(name = 'pop'): Promise<void> {
        const type = 'create';
        this.playerProcessor?.sendMessageToAudioScope({
            type,
            name
        });
        return new Promise((resolve, reject) => {
            this.messageSubject
                .pipe(first(value => value.type === type && value.name === name))
                .subscribe((msg) => !msg.error ? resolve() : reject());
        });
    }

    finish() {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'finish'
        });
    }

    loadFromUrl(name: string, url: string): Observable<{
        type: HttpEventType,
        progress?: number,
        arrayBuffer?: ArrayBuffer }> {
        this.loadingSubject.next(name);
        return this.httpClient.get(url, {
            observe: 'events',
            reportProgress: true,
            responseType: 'blob'
        }).pipe(
            takeUntil(this.loadingSubject.pipe(filter((n) => n === name))),
            switchMap(async (event: HttpEvent<Blob>) => {
            if (event.type == HttpEventType.DownloadProgress) {
                return {
                    type: event.type,
                    progress: event.total ? (event.loaded / event.total) : 0
                }
            } else if (event.type == HttpEventType.Response) {
                let blob = event.body;
                if (blob) {
                    const arrayBuffer = await blob.arrayBuffer();
                    await this.load(name, arrayBuffer);
                    this.progress.next(0);
                    return {
                        type: HttpEventType.Response,
                        arrayBuffer
                    }
                } else {
                    throw new Error('File is empty');
                }
            } else {
                return {
                    type: event.type
                }
            }
        }));
    }

    load(name: string, arrayBuffer: ArrayBuffer): Promise<any> {
        const type = 'load';
        return new Promise((resolve, reject) => {
            this.playerProcessor?.sendMessageToAudioScope({
                name,
                type,
                arrayBuffer
            });
            this.messageSubject
                .pipe(first(msg => msg.type === type && msg.name === name))
                .subscribe((msg) => msg.success ? resolve(msg.analysis) : reject());
        });
    }

    mute(name: string, muted: boolean) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'mute',
            name,
            muted
        });
    }

    pause() {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'pause'
        });
    }

    play(progress: number | null = null) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'play',
            progress: progress
        });
    }

    seek(progress: number) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'seek',
            progress
        });
    }

    setBalance(name: string, balance: number) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'setBalance',
            name,
            balance
        });
    }

    /*
    ** setPitch
    ** pitch: cents of half-tone (1 Octave = 1200) {-2400:2400} - use multiple of 100 for better performance
    */
    setPitch(pitch: number) {
        if (pitch > 2400)
            pitch = 2400
        if (pitch < -2400)
            pitch = 2400

        this.playerProcessor?.sendMessageToAudioScope({
           type: 'setPitch',
           pitch
        });
    }

    setSpeed(speed: number) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'setSpeed',
            speed: speed > 0.00001 ? speed : 0.00001
        })
    }

    setVolume(volume: number, name?: string) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'setVolume',
            name,
            volume
        })
    }

    /*
    ** Private
    */

    private async loadSuperPowered() {
        // @ts-ignored
        this.superpowered = await SuperpoweredGlue.Instantiate(
            'ExampleLicenseKey-WillExpire-OnNextUpdate',
            'assets/scripts/Superpowered.js'
        );
        console.log(`Running Superpowered v${this.superpowered.Version()}`);
        console.log(this.superpowered);
        this.webaudioManager = new SuperpoweredWebAudio(44100, this.superpowered);
        console.log(this.webaudioManager);
        this.playerProcessor = await this.webaudioManager.createAudioNodeAsync(
                'assets/scripts/my-player.js',
                'MyPlayer',
                (msg: any) => this.messageSubject.next(msg));
        this.playerProcessor.connect(this.webaudioManager.audioContext.destination);
    }
}

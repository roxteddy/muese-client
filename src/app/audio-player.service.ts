import {
    EventEmitter,
    HostBinding,
    HostListener,
    Injectable,
    Output,
    Renderer2,
    RendererFactory2
} from '@angular/core';
// @ts-ignored
import { SuperpoweredWebAudio } from '../assets/scripts/Superpowered.js';
import { filter, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

    public duration = new Subject<number>();
    public progress = new Subject<number>();
    public end = new Subject<void>();

    private isInit = false;
    private initSubject = new Subject<void>();
    private messageSubject = new Subject<any>();

    private playerProcessor?: SuperpoweredWebAudio.AudioWorkletProcessor;
    private renderer: Renderer2;
    // @ts-ignored
    private superpowered?: Superpowered;
    private webaudioManager: SuperpoweredWebAudio;

    constructor(private readonly rendererFactory: RendererFactory2) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        let listener = this.renderer.listen('document', "click", event =>{
            listener();
            this.loadSuperPowered().then(() => {
                this.isInit = true;
                this.initSubject.next();
            });
        });
        this.messageSubject.pipe(filter((message) => message.type === 'progress')).subscribe(
            (message) => this.progress.next(message.progress));
        this.messageSubject.pipe(filter(message => message.type === 'end')).subscribe(
            () => this.end.next()
        );
        this.messageSubject.pipe(filter((message) => message.type === 'duration')).subscribe(
            (message) => this.duration.next(message.duration)
        );
    }

    isInitialized(): Promise<void> {
        return new Promise(resolve => {
            if (this.isInit) {
                resolve();
            } else {
                this.initSubject.subscribe(() => resolve());
            }
        });
    }

    create(name = 'pop'): Promise<void> {
        const type = 'create';
        return new Promise((resolve, reject) => {
            this.playerProcessor?.sendMessageToAudioScope({
                type,
                name
            });
            const sub = this.messageSubject.pipe(filter(value => value.type === type && value.name === name)).subscribe(
                (msg) => {
                    sub.unsubscribe();
                    !msg.error ? resolve() : reject();
                }
            )
        });

    }

    decodeToWasm(arrayBuffer: ArrayBuffer) {
        const audiofileInWASMHeap = this.superpowered?.arrayBufferToWASM(arrayBuffer);
        return this.superpowered?.Decoder.decodeToAudioInMemory(
            audiofileInWASMHeap,
            arrayBuffer.byteLength
        );
    }

    finish() {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'finish'
        });
    }

    getContext(): AudioContext {
        return this.webaudioManager?.audioContext;
    }

    //returns duration in ms
    load(name: string, arrayBuffer: ArrayBuffer): Promise<void> {
        const type = 'load';
        return new Promise((resolve, reject) => {
            this.playerProcessor?.sendMessageToAudioScope({
                name,
                type,
                arrayBuffer
            });
            const sub = this.messageSubject
                .pipe(filter(msg => msg.type === type && msg.name === name))
                .subscribe(
                (msg) => {
                    sub.unsubscribe();
                    msg.success ? resolve() : reject();
                }
            )
        });
    }

    mute(name: string) {
        this.playerProcessor?.sendMessageToAudioScope({
            type: 'mute',
            name
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

    // Set pitch by cents of half-tone (1 Octave = 1200) {-2400:2400}
    // Multiple of 100 for better performance
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
                'https://muese.servehttp.com:4200/assets/scripts/my-player.js',
                'MyPlayer',
                (msg: any) => {
                    //console.log(msg);
                    this.messageSubject.next(msg);
                }
            );
        this.playerProcessor.connect(this.webaudioManager.audioContext.destination);
    }
}

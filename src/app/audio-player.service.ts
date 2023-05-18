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

    public progress = new Subject<number>();

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
            this.loadSuperPowered().then(() => this.initSubject.next());
        });
        this.messageSubject.pipe(filter((value) => value.type === 'progress')).subscribe(
            (value) => this.progress.next(value.time)
        );
    }

    isInitialized(): Promise<void> {
        return new Promise(resolve => this.initSubject.subscribe(() => resolve()));
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

    load(name: string, url: string): Promise<void> {
        const type = 'load';
        return new Promise((resolve, reject) => {
            this.playerProcessor?.sendMessageToAudioScope({
                name,
                type,
                url
            });
            const sub = this.messageSubject.pipe(filter(value => value.type === type && value.url === url)).subscribe(
                (msg) => {
                    sub.unsubscribe();
                    msg.success ? resolve() : reject();
                }
            )
        });
    }

    play(name?: string) {
        this.playerProcessor?.sendMessageToAudioScope({
                type: 'play',
                name
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

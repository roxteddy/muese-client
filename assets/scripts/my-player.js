import './Superpowered.js'

class Stem {
    balance = 0;
    buffer;
    muted = false;
    name;
    player;
    volume = 1;

    constructor(config = {}) {
        Object.assign(this, config);
    }
}

class MyPlayer extends  SuperpoweredWebAudio.AudioWorkletProcessor {

    PROGRESS_UPDATE_INTERVAL = 50;

    duration = 0;
    lastProgress = -1;
    stems = [];
    volume = 1;

    //mixer & buffers
    mixer;
    mixer1;
    mixer2;
    mixerBuffer1;
    mixerBuffer2;


    onReady() {
        this.mixer = new this.Superpowered.StereoMixer();
        this.mixer1 = new this.Superpowered.StereoMixer();
        this.mixer2 = new this.Superpowered.StereoMixer();
    }

    // Runs before the node is destroyed.
    // Clean up memory and objects here (such as free allocated linear memory or destruct Superpowered objects).
    onDestruct() {
        for (let stem of this.stems) {
            stem.player?.destruct();
            stem.buffer?.free();
        }
        this.mixer?.destruct();
        this.mixerBuffer1?.free();
        this.mixerBuffer2?.free();
    }

    /* COMMANDS */

    // Creates new player instance
    create(name = 'pop') {
        if (!name) {
            this.sendMessageToMainScope({ type: 'create', name, error: "Name is needed" });
            return;
        }
        let stem = this.stems.find((s) => s.name === name);
        if (stem?.player) {
            stem.player.destruct();
        }
        if (!stem) {
            if (this.stems.length > 7) {
                this.sendMessageToMainScope({ type: 'create', name, error: "Too much stems" });
            }

            stem = new Stem({name});
            this.stems.push(stem);
        }
        stem.player = new this.Superpowered.AdvancedAudioPlayer(
            this.samplerate,
            2, // cached point count
            2, // internal buffer size seconds
            0, // negative seconds
            0.501, // minimum time stretching playback rate
            2, // maximum time stretching playback rate
            false); // enable stems
        stem.player.loopOnEOF = false;
        this.volume = 1;
        this.sendMessageToMainScope({ type: 'create', name });
    }

    destroy(name) {
        let stem = this.stems.find((s) => s.name === name);
        if (stem) {
            if (stem.player) {
                stem.player.destruct();
            }
            delete this.stems[this.stems.indexOf(stem)];
            this.sendMessageToMainScope({ type: 'destroy', name });
        } else {
            this.sendMessageToMainScope({ type: 'destroy', name, error: 'Player not found' });
        }
    }

    finish() {
        //todo: unload tracks ?
        this.pause();
        this.duration = 0;
        this.seek(0);
        this.setPitch(0);
        this.setSpeed(1);
    }

    load(name, arrayBuffer) {
        let stem = this.stems.find((s) => s.name === name);
        if (stem) {
            let audiofileInWASMHeap = this.Superpowered.arrayBufferToWASM(arrayBuffer);
            let decodedAudio = this.Superpowered.Decoder.decodeToAudioInMemory(audiofileInWASMHeap, arrayBuffer.byteLength);
            stem.player?.openMemory(
                decodedAudio,
                false,
                false
            );

            this.sendMessageToMainScope({
                type: 'load',
                name,
                success: true,
                //analysis: this.analyze(decodedAudio)
            });
        } else {
            this.sendMessageToMainScope({
                type: 'load',
                success: false,
                error: 'Stem player not found'
            });
        }
        this.lastProgress = -1;
    }

    mute(name, muted) {
        const stem = this.stems.find((stem => stem.name === name));
        if (stem) {
            stem.muted = muted;
        }
    }

    pause() {
        for (let stem of this.stems) {
            stem.player?.pause(0, 0);
        }
    }

    play(progress) {
        if (progress !== null) {
            this.seek(progress);
        }
        for (let stem of this.stems) {
            stem.player?.play();
        }
    }

    seek(progress) {
        for (let stem of this.stems) {
            stem.player?.seek(progress);
        }
        this.lastProgress = -1;
    }

    setBalance(name, balance) {
        const stem = this.stems.find((stem => stem.name === name));
        if (stem) {
            stem.balance = balance;
        }
    }

    // Set pitch by cents of half-tone (1 Octave = 1200) {-2400:2400}
    setPitch(pitch) {
        for (let stem of this.stems) {
            if (stem.player) {
                stem.player.pitchShiftCents = pitch;
            }
        }
    }

    // The playback rate. Must be positive and above 0.00001. Default: 1.
    setSpeed(speed) {
        for (let stem of this.stems) {
            if (stem.player) {
                stem.player.playbackRate = speed;
            }
        }
    }

    setVolume(name, volume) {
        if (name) {
            const stem = this.stems.find((stem => stem.name === name));
            if (stem)
                stem.volume = volume;
        } else {
            this.volume = volume;
        }
    }

    /* COMMUNICATION */

    // SuperpoweredTrackLoader calls this when its finished loading and decoding audio.
    onMessageFromMainScope(message) {
        console.log(message);

        switch (message.type) {
            case 'create':
                this.create(message.name);
                break;
            case 'destroy':
                this.create(message.name);
                break;
            case 'finish':
                this.finish();
                break;
            case 'load':
                this.load(message.name, message.arrayBuffer);
                break;
            case 'mute':
                this.mute(message.name, message.muted);
                break;
            case 'pause':
                this.pause();
                break;
            case 'play':
                this.play(message.progress);
                break;
            case 'seek':
                this.seek(message.progress);
                break;
            case 'setBalance':
                this.setBalance(message.name, message.balance);
                break;
            case 'setPitch':
                this.setPitch(message.pitch);
                break;
            case 'setSpeed':
                this.setSpeed(message.speed);
                break;
            case 'setVolume':
                this.setVolume(message.name, message.volume);
                break;
        }
    }

    /* PROCESS */

    processAudio(inputBuffer, outputBuffer, buffersize, parameters) {
        let progressHandled = false;

        this.allocateBuffers(buffersize);

        // Check for end
        if (this.stems[0]?.player?.eofRecently()) {
            this.sendMessageToMainScope({
                type: 'end'
            })
        }

        for (let stem of this.stems) {
            let result = 0;
            if (stem?.player) {
                if (!this.duration) {
                    this.sendMessageToMainScope({
                        type: 'duration',
                        duration: stem.player.getDurationMs()
                    });
                }
                // Handle progress
                if (!progressHandled) {
                    const newProgress = stem.player.getDisplayPositionMs();
                    if (this.lastProgress < 0 || !this.PROGRESS_UPDATE_INTERVAL || Math.abs(newProgress - this.lastProgress) >= this.PROGRESS_UPDATE_INTERVAL) {
                        this.sendMessageToMainScope({
                            type: 'progress',
                            progress: stem.player.getDisplayPositionPercent(),
                            time: Math.floor(newProgress) / 1000
                        });
                        this.lastProgress = newProgress;
                    }
                    progressHandled = true;
                }

                // Ensure the samplerate is in sync on every audio processing callback.
                if (stem.player) {
                    stem.player.outputSamplerate = this.samplerate;
                    result = stem.player.processStereo(stem.buffer.pointer, false, buffersize, stem.muted ? 0 : stem.volume * this.volume);
                }
            }
            if (!result) {
                this.Superpowered.memorySet(stem.buffer.pointer, 0, buffersize * 8); // 8 bytes for each frame (1 channel is 4 bytes, two channels)
            }
        }

        /* Mixing
        ** We could actually write directly all stem process in the same buffer using 'mix' parameter
        ** but we may need mixer for individual balances
         */

        if (this.stems.length > 0) {
            for (let i = 0; i < 4; i++) {
                const stem = this.stems[i];
                if (stem) {
                    const balance = stem.balance;
                    this.mixer1.inputGain[i * 2] = balance <= 0 ? 1 : 1 - balance;
                    this.mixer1.inputGain[i * 2 + 1] = balance >= 0 ? 1 : 1 + balance;
                }
            }
            this.mixer1.process(
                this.stems[0].buffer?.pointer || 0,
                this.stems[1]?.buffer?.pointer || 0,
                this.stems[2]?.buffer?.pointer || 0,
                this.stems[3]?.buffer?.pointer || 0,
                this.mixerBuffer1.pointer,
                buffersize
            );

            if (this.stems.length > 4) {
                for (let i = 0; i < 4; i++) {
                    const stem = this.stems[i + 4];
                    if (stem) {
                        const balance = stem.balance;
                        this.mixer2.inputGain[i * 2] = balance <= 0 ? 1 : 1 - balance;
                        this.mixer2.inputGain[i * 2 + 1] = balance >= 0 ? 1 : 1 + balance;
                    }
                }
                this.mixer2.process(
                    this.stems[4]?.buffer?.pointer || 0,
                    this.stems[5]?.buffer?.pointer || 0,
                    this.stems[6]?.buffer?.pointer || 0,
                    this.stems[7]?.buffer?.pointer || 0,
                    this.mixerBuffer2.pointer,
                    buffersize
                );
            }

            this.mixer.process(
                this.mixerBuffer1?.pointer || 0,
                this.mixerBuffer2?.pointer || 0,
                0,
                0,
                outputBuffer.pointer,
                buffersize
            );
        } else {
            this.Superpowered.memorySet(outputBuffer.pointer, 0, buffersize * 8);
        }
    }

    /* HELPERS */

    allocateBuffers(bufferSize) {
        const bufferLength = bufferSize * 8;

        for (let stem of this.stems) {
            if (stem.buffer && stem.buffer.length !== bufferLength) {
                stem.buffer.free();
                stem.buffer = null;
            }
            if (!stem.buffer) {
                stem.buffer = new this.Superpowered.Int32Buffer(bufferLength);
            }
        }

        if (this.mixerBuffer1 && this.mixerBuffer1.length !== bufferLength) {
            this.mixerBuffer1.free();
            this.mixerBuffer1 = null;
        }
        if (!this.mixerBuffer1) {
            this.mixerBuffer1 = new this.Superpowered.Int32Buffer(bufferLength);
        }

        if (this.mixerBuffer2 && this.mixerBuffer2.length !== bufferLength) {
            this.mixerBuffer2.free();
            this.mixerBuffer2 = null;
        }
        if (!this.mixerBuffer2) {
            this.mixerBuffer2 = new this.Superpowered.Int32Buffer(bufferLength);
        }
    }

    analyze(pointerToAudioInMemory) {
        const decoder = new this.Superpowered.Decoder();
        const openErrorCode = decoder.openMemory(
            pointerToAudioInMemory, // Pointer to information in Superpowered AudioInMemory format on the WebAssembly Linear Memory.
            false    // If true, it opens the file for fast metadata reading only, not for decoding audio.
        );
        if (openErrorCode === this.Superpowered.Decoder.OpenSuccess) {
            let analyzer = new this.Superpowered.Analyzer(
                decoder.getSamplerate(), // The sample rate of the audio input.
                decoder.getDurationSeconds()     // The length in seconds of the audio input. The analyzer will not be able to process more audio than this. You can change this value in the process() method.
            );

            const intBuffer = new this.Superpowered.Int16Buffer(
                decoder.getFramesPerChunk() * 2 * 4 + 16384
            )

            const floatBuffer = new this.Superpowered.Float32Buffer(
                decoder.getFramesPerChunk() * 2 * 4 + 16384
            );

            let framesDecoded = 1;
            while (framesDecoded) {
                framesDecoded = decoder.decodeAudio(intBuffer.pointer, decoder.getFramesPerChunk());
                if (framesDecoded) {
                    this.Superpowered.ShortIntToFloat(intBuffer.pointer, floatBuffer.pointer, framesDecoded, 2);
                    analyzer.process(floatBuffer.pointer, framesDecoded);
                }
            }
            // analyzer.process(pointerToAudioInMemory, decoder.getDurationFrames());
            analyzer.makeResults(100, 200, 0, 0, true, false, false, false, true);
            return {
                bpm: analyzer.bpm,
                keyIndex: analyzer.keyIndex
            }
        }

        // return {
        //     pointer,
        // }
    }
}

// The following code registers the processor script for the browser, note the label and reference.
if (typeof AudioWorkletProcessor !== 'undefined') registerProcessor('MyPlayer', MyPlayer);
export default MyPlayer;

import './Superpowered.js'

class Stem {
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

    //reset it on track change
    duration = 0;
    lastProgress = -1;
    stems = [];
    volume = 1;

    //mixer & buffers
    mixer;
    mixerBuffer1;
    mixerBuffer2;


    onReady() {
        this.mixer = new this.Superpowered.StereoMixer();
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
                success: true
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

    mute(name) {
        const stem = this.stems.find((stem => stem.name === name));
        if (stem) {
            stem.muted = !stem.muted;
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
                this.mute(message.name);
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

        for (let stem of this.stems) {
            let result = 0;
            if (stem?.player) {
                // Check for end
                if (stem.player?.eofRecently()) {
                    this.sendMessageToMainScope({
                        type: 'end'
                    })
                }
                if (!this.duration) {
                    this.sendMessageToMainScope({
                        type: 'duration',
                        duration: stem.player.getDurationMs()
                    });
                }
                // Handle progress
                if (!progressHandled) {
                    const newProgress = stem.player.getDisplayPositionMs();
                    if (this.lastProgress < 0 || Math.abs(newProgress - this.lastProgress) >= 50) {
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

        if (this.mixer && this.stems.length > 0) {
            this.mixer.process(
                this.stems[0].buffer?.pointer || 0,
                this.stems[1]?.buffer?.pointer || 0,
                this.stems[2]?.buffer?.pointer || 0,
                this.stems[3]?.buffer?.pointer || 0,
                this.mixerBuffer1.pointer,
                buffersize
            );

            if (this.stems.length > 3) {
                this.mixer.process(
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
}

// The following code registers the processor script for the browser, note the label and reference.
if (typeof AudioWorkletProcessor !== 'undefined') registerProcessor('MyPlayer', MyPlayer);
export default MyPlayer;

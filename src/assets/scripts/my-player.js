import './Superpowered.js'

class Stem {
    buffer;
    name;
    url;
    player;

    constructor(config = {}) {
        Object.assign(this, config);
    }
}

class MyPlayer extends  SuperpoweredWebAudio.AudioWorkletProcessor {

    lastProgress = -1;
    stems = [];

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
            stem.player?.desctruct();
            stem.buffer?.free();
        }
        this.mixer?.destruct();
        this.mixerBuffer1?.free();
        this.mixerBuffer2?.free();
    }

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
        stem.player.loopOnEOF = true;
        this.playerGain = 1;
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

    // Called from within this class.
    load(name, url) {
        // Notice that we pass in a reference to 'this',
        // which is used to call the onMessageFromMainScope callback within this call instance when loaded.
        // The fetching and decoding of the audio takes place on dedicated workers, spawned from the main thread. This prevents any blocking.
        let stem = this.stems.find((s) => s.name === name);
        if (stem) {
            stem.url = url;
            this.Superpowered.downloadAndDecode(url, this);
        } else {
            this.sendMessageToMainScope({
                type: 'load',
                success: false,
                error: 'Stem player not found'
            });
        }
    }

    play(name) {
        if (!name) {
            for (let stem of this.stems) {
                stem.player.play();
            }
        } else {
            let stem = this.stems.find((s) => s.name == name);
            if (stem && stem.player) {
                stem.player.play();
            }
        }
    }

    // SuperpoweredTrackLoader calls this when its finished loading and decoding audio.
    onMessageFromMainScope(message) {
        console.log(message);
        if (message.SuperpoweredLoaded) {
            const buffer = message.SuperpoweredLoaded.buffer; // ArrayBuffer with the downloaded and decoded audio in AudioInMemory format.
            this.sendMessageToMainScope({
                type: 'load',
                url: message.SuperpoweredLoaded.url,
                success: !buffer?.length
            });

            // Once we have the pointer to the buffer, we pass the decoded audio into the AAP instance.
            let stem = this.stems.find((s) => s.url === message.SuperpoweredLoaded.url);
            // todo: free() previous data ?
            if (stem && stem.player)
                stem.player.openMemory(this.Superpowered.arrayBufferToWASM(buffer), false, false);
        }

        switch (message.type) {
            case 'create':
                this.create(message.name);
                break;
            case 'destroy':
                this.create(message.name);
                break;
            case 'load':
                this.load(message.name, message.url);
                break;
            case 'play':
                this.play(message.name);
                break;
        }
    }

    processAudio(inputBuffer, outputBuffer, buffersize, parameters) {
        let progressHandled = false;

        this.allocateBuffers(buffersize);

        for (let stem of this.stems) {
            let result = 0;
            if (stem?.player) {
                // Handle progress
                if (!progressHandled) {
                    const newProgress = stem.player.getDisplayPositionMs();
                    if (stem.player.isPlaying()
                        && (this.lastProgress < 0 || Math.abs(newProgress - this.lastProgress) >= 50)) {
                        this.sendMessageToMainScope({
                            type: 'progress',
                            time: Math.floor(newProgress) / 1000
                        })
                    }
                    progressHandled = true;
                }

                // Ensure the samplerate is in sync on every audio processing callback.
                stem.player.outputSamplerate = this.samplerate;
                result = stem.player.processStereo(stem.buffer.pointer, false, buffersize, this.playerGain);
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

import './Superpowered.js'

class Stem {
    name;
    url;
    player;
    mixer;

    constructor(config = {}) {
        Object.assign(this, config);
    }
}

class MyPlayer extends  SuperpoweredWebAudio.AudioWorkletProcessor {

    lastProgress = -1;
    stems = [];

    onReady() {
        this.mixer = new this.Superpowered.StereoMixer();
    }

    // Runs before the node is destroyed.
    // Clean up memory and objects here (such as free allocated linear memory or destruct Superpowered objects).
    onDestruct() {
        for (let stem of this.stems) {
            stem.player?.desctruct();
        }
    }

    // Creates new player instance
    create(name = 'pop') {
        if (!name) {
            this.sendMessageToMainScope({ type: 'create', name, error: "Name is needed" });
            return;
        }
        var stem = this.stems.find((s) => s.name === name);
        if (stem && stem.player) {
            stem.player.destruct();
        }
        if (!stem) {
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
        var stem = this.stems.find((s) => s.name === name);
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
        var stem = this.stems.find((s) => s.name === name);
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
            var stem = this.stems.find((s) => s.name == name);
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
            var stem = this.stems.find((s) => s.url === message.SuperpoweredLoaded.url);
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
        var progressHandled = false;

        var player = this.stems[0].player;
        var process;
        var buffers = [];
        for (let i = 0; i < this.stems.length; i++) {
            buffers[i] = new this.Superpowered.Int32Buffer(buffersize * 8);
            var stem = this.stems[i];
            let result = 0;
            if (stem?.player) {
                // Handle progress
                if (!progressHandled) {
                    const newProgress = player.getDisplayPositionMs();
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
                result = stem.player.processStereo(buffers[i].pointer, false, buffersize, this.playerGain);
            }
            if (!result) {
                this.Superpowered.memorySet(buffers[i].pointer, 0, buffersize * 8); // 8 bytes for each frame (1 channel is 4 bytes, two channels)
            }
        }

        if (this.mixer) {
            this.mixer.process(
                buffers[0]?.pointer || 0,
                buffers[1]?.pointer || 0,
                buffers[2]?.pointer || 0,
                buffers[3]?.pointer || 0,
                outputBuffer.pointer,
                buffersize
            );
        } else {
            this.Superpowered.memorySet(outputBuffer.pointer, 0, buffersize * 8);
        }

        for (let buffer of buffers) {
            buffer.free();
        }

        // if (player) {
        //     const newProgress = player.getDisplayPositionMs();
        //     if (player.isPlaying() && (this.lastProgress < 0 || Math.abs(newProgress - this.lastProgress) >= 50)) {
        //         this.sendMessageToMainScope({
        //             type: 'progress',
        //             time: Math.floor(newProgress) / 1000
        //         });
        //         this.lastProgress = newProgress;
        //     }
        //     player.outputSamplerate = this.samplerate;
        //     process = player.processStereo(outputBuffer.pointer, false, buffersize, this.playerGain);
        // }
        //     // Render into the output buffer.
        // if (!player || !process) {
        //     // If no player output, set output to 0s.
        //     this.Superpowered.memorySet(outputBuffer.pointer, 0, buffersize * 8); // 8 bytes for each frame (1 channel is 4 bytes, two channels)
        // }
    }
}

// The following code registers the processor script for the browser, note the label and reference.
if (typeof AudioWorkletProcessor !== 'undefined') registerProcessor('MyPlayer', MyPlayer);
export default MyPlayer;

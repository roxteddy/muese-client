const getAudioData = (url) => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .catch(error => {
            console.error(error);
        });
};

const linearPath = (audioBuffer, options) => {
    const {
        channel = 0,
        samples = audioBuffer.length,
        height = 100,
        width = 800,
        top = 0,
        left = 0,
        type = 'steps',
        paths = [{d:'Q', sx: 0, sy:0, x: 50, y: 100, ex:100, ey:0}],
        animation = false,
        animationframes = 10,
        normalize = true,
    } = options;

    const framesData = getFramesData(audioBuffer, channel, animation, animationframes);
    const filteredData = getFilterData(framesData, samples);
    const normalizeData = (normalize ? getNormalizeData(filteredData) : filteredData);

    let path = ``;


    const fixHeight = (type != 'bars' ?  (height+top*2) / 2 : height+top);
    const fixWidth = width / samples;
    const pathslength = paths.length;
    const fixpathslength =  (type == 'mirror' ? pathslength*2 : pathslength);

    const normalizeDataLength = normalizeData.length;

    for(let f = 0; f < normalizeDataLength; f++) {
        if(f>0) {
            const pathlength = path.length;
            const lastvalue = path.charAt(pathlength - 1);
            if(lastvalue == ";" || pathlength === 0) {
                path+=' M 0 0 ;';
            } else {
                path += ';';
            }
        }

        let last_pos_x = -9999;
        let last_pos_y = -9999;

        for (let i = 0; i < samples; i++) {

            const positive =  (type != 'bars' ? (i % 2 ? 1: -1) : 1);
            let mirror = 1;
            for(let j = 0; j < fixpathslength; j++) {
                let k = j;
                if(j >= pathslength) {
                    k = j - pathslength;
                    mirror = -1;
                }
                paths[k].minshow = paths[k].minshow ?? 0;
                paths[k].maxshow = paths[k].maxshow ?? 1;
                paths[k].normalize = paths[k].normalize ?? false;
                const normalizeDataValue = (paths[k].normalize ? 1 : normalizeData[f][i]);
                if(paths[k].minshow <= normalizeData[f][i] && paths[k].maxshow >= normalizeData[f][i]) {
                    switch (paths[k].d) {
                        // LineTo Commands
                        case 'L': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `L ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        case 'H': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = pos_y;

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `H ${end_pos_x} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        case 'V': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            const end_pos_x = pos_x;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `V ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Cubic Bézier Curve Commands
                        case 'C': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight  - (fixHeight*paths[k].sy/100)*positive;

                            const center_pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const center_pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height : height*2) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight - (fixHeight*paths[k].ey/100)*positive;

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Quadratic Bézier Curve Commands
                        case 'Q': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            const center_pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const center_pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height : height*2) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Elliptical Arc Curve Commands
                        case 'A': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }
                            const rx = paths[k].rx * fixWidth/100;
                            const ry = paths[k].ry * fixWidth/100;
                            let sweep = paths[k].sweep;
                            if(positive == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            if(mirror == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            path += `A ${rx} ${ry} ${paths[k].angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // ClosePath Commands
                        case 'Z':
                            path += 'Z ';
                            break;

                        default:
                            break;
                    }
                }
            }
        }
    }
    return path;
}

const polarPath = (audioBuffer, options) => {
    const {
        channel = 0,
        samples = audioBuffer.length,
        distance = 50,
        length = 100,
        top = 0,
        left = 0,
        type = 'steps',
        startdeg = 0,
        enddeg = 360,
        invertdeg = false,
        invertpath = false,
        paths = [{d:'Q', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0}],
        animation = false,
        animationframes = 10,
        normalize = true,
    } = options;

    const framesData = getFramesData(audioBuffer, channel, animation, animationframes);
    const filteredData = getFilterData(framesData, samples);
    const normalizeData = (normalize ? getNormalizeData(filteredData) : filteredData);

    let path = ``;
    const fixenddeg = (enddeg < startdeg ? enddeg+360 : enddeg);
    const deg = (!invertdeg ? (fixenddeg-startdeg) / samples : (startdeg-fixenddeg) / samples );
    const fixOrientation = (!invertdeg ? 90+startdeg : 90+startdeg+180 );
    const invert = (!invertpath ? 1 : -1);
    const pathslength = paths.length;
    const fixpathslength =  (type == 'mirror' ? pathslength*2 : pathslength);
    const pi180 = Math.PI / 180;

    const normalizeDataLength = normalizeData.length;

    for(let f = 0; f < normalizeDataLength; f++) {
        if(f>0) {
            const pathlength = path.length;
            const lastvalue = path.charAt(pathlength - 1);
            if(lastvalue == ";" || pathlength === 0) {
                path+=' M 0 0 ;';
            } else {
                path += ';';
            }
        }

        let last_pos_x = -9999;
        let last_pos_y = -9999;

        for (let i = 0; i < samples; i++) {
            const positive =  (type != 'bars' ? (i % 2 ? 1: -1) : 1);
            let mirror = 1;
            for(let j = 0; j < fixpathslength; j++) {
                let k = j;
                if(j >= pathslength) {
                    k = j - pathslength;
                    mirror = -1;
                }
                paths[k].minshow = paths[k].minshow ?? 0;
                paths[k].maxshow = paths[k].maxshow ?? 1;
                paths[k].normalize = paths[k].normalize ?? false;
                const normalizeDataValue = (paths[k].normalize ? 1 : normalizeData[f][i]);
                if(paths[k].minshow <= normalizeData[f][i] && paths[k].maxshow >= normalizeData[f][i]) {
                    switch (paths[k].d) {
                        // LineTo Commands
                        case 'L': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `L ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }


                        // Cubic Bézier Curve Commands
                        case 'C': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angle =  ((deg*(i+paths[k].deg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const center_pos_x = left + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angle);
                            const center_pos_y = top + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angle);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Quadratic Bézier Curve Commands
                        case 'Q': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angle =  ((deg*(i+paths[k].deg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const center_pos_x = left + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angle);
                            const center_pos_y = top + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angle);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);


                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Elliptical Arc Curve Commands
                        case 'A': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            const angle = deg * i * paths[k].angle / 100;
                            const rx = paths[k].rx * deg/100;
                            const ry = paths[k].ry * deg/100;

                            let sweep = paths[k].sweep;
                            if(positive == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            if(mirror == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            path += `A ${rx} ${ry} ${angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `;

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // ClosePath Commands
                        case 'Z':
                            path += 'Z ';
                            break;

                        default:
                            break;
                    }
                }
            }
        }
    }
    return path;
}

const getFramesData = (audioBuffer, channel, animation, animationframes) => {
    const rawData = audioBuffer.getChannelData(channel);

    const framesData = [];
    if(animation) {
        const frames = audioBuffer.sampleRate / animationframes;
        for (let index = 0; index < rawData.length; index += frames) {
            const partraw = rawData.slice(index, index+frames);
            framesData.push(partraw);
        }
    } else {
        framesData.push(rawData);
    }

    return framesData;
}

const getFilterData = (framesData, samples) => {
    const filteredData = [];
    const framesDataLength = framesData.length;
    for(let f = 0; f < framesDataLength; f++) {
        const blockSize = Math.floor(framesData[f].length / samples); // the number of samples in each subdivision
        const filteredDataBlock = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(framesData[f][blockStart + j]); // find the sum of all the samples in the block
            }
            filteredDataBlock.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        filteredData.push(filteredDataBlock);
    }
    return filteredData;
}

const getNormalizeData = (filteredData) => {
    const multipliers = [];
    const filteredDataLength = filteredData.length
    for(let i = 0; i < filteredDataLength; i++) {
        const multiplier = Math.max(...filteredData[i]);
        multipliers.push(multiplier);
    }
    const maxMultiplier = Math.pow(Math.max(...multipliers), -1);

    const normalizeData = [];
    for(let i = 0; i < filteredDataLength; i++) {
        const normalizeDataBlock = filteredData[i].map(n => n * maxMultiplier);
        normalizeData.push(normalizeDataBlock);
    }
    return normalizeData;
}

;/* eslint-disable */

class SuperpoweredGlue {

    static wasmbin = "data:@file/octet-stream;base64,\

    niceSize(bytes) {
        if (bytes == 0) return '0 byte'; else if (bytes == 1) return '1 byte';
        const postfix = [ ' bytes', ' kb', ' mb', ' gb', ' tb' ], n = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, n), 2) + postfix[n];
    }
    
    createFloatArray(length) {
        return this.createViewFromType(9, this.malloc(length * 4), length);
    }
    
    static SuperpoweredGlueSourceURL = null;
    
    static async Instantiate(licenseKey, url) {
        if (url !== undefined) SuperpoweredGlue.SuperpoweredGlueSourceURL = url;
        const obj = new SuperpoweredGlue();
        await fetch(SuperpoweredGlue.wasmbin).then(response => response.arrayBuffer() ).then(bytes => obj.loadFromArrayBuffer(bytes) );
        obj.Initialize(licenseKey);
        return obj;
    }
    
    constructor() {
        this.id = Math.floor(Math.random() * Date.now());
        this.linearMemory = null;
        this.__lastObject__ = null;
        this.__classUnderConstruction__ = null;
        this.__functions__ = {};
        this.__classes__ = {};
        this.__exportsToWasm__ = {};
        this.__views__ = new Set();
        this.trackLoaderReceivers = [];
    
        const glue = this;
        this.Uint8Buffer = class { constructor(length) { return glue.createViewFromType(1, glue.malloc(length), length); } }
        this.Int8Buffer = class { constructor(length) { return glue.createViewFromType(2, glue.malloc(length), length); } }
        this.Uint16Buffer = class { constructor(length) { return glue.createViewFromType(3, glue.malloc(length * 2), length); } }
        this.Int16Buffer = class { constructor(length) { return glue.createViewFromType(4, glue.malloc(length * 2), length); } }
        this.Uint32Buffer = class { constructor(length) { return glue.createViewFromType(5, glue.malloc(length * 4), length); } }
        this.Int32Buffer = class { constructor(length) { return glue.createViewFromType(6, glue.malloc(length * 4), length); } }
        this.BigUint64Buffer = class { constructor(length) { return glue.createViewFromType(7, glue.malloc(length * 8), length); } }
        this.BigInt64Buffer = class { constructor(length) { return glue.createViewFromType(8, glue.malloc(length * 8), length); } }
        this.Float32Buffer = class { constructor(length) { return glue.createViewFromType(9, glue.malloc(length * 4), length); } }
        this.Float64Buffer = class { constructor(length) { return glue.createViewFromType(10, glue.malloc(length * 8), length); } }
    
        this.__exportsToWasm__.consolelog = this.consolelog.bind(this);
        this.__exportsToWasm__.emscripten_notify_memory_growth = this.onMemoryGrowth.bind(this);
    
        this.__exportsToWasm__.__createClass__ = this.createClass.bind(this);
        this.__exportsToWasm__.__createStaticProperty__ = this.createStaticProperty.bind(this);
        this.__exportsToWasm__.__createStaticMethod__ = this.createStaticMethod.bind(this);
        this.__exportsToWasm__.__createConstructor__ = this.createConstructor.bind(this);
        this.__exportsToWasm__.__createDestructor__ = this.createDestructor.bind(this);
        this.__exportsToWasm__.__createProperty__ = this.createProperty.bind(this);
        this.__exportsToWasm__.__createMethod__ = this.createMethod.bind(this);
        this.__exportsToWasm__.__createFunction__ = this.createFunction.bind(this);
        this.__exportsToWasm__.__createClassConstant__ = this.createClassConstant.bind(this);
        this.__exportsToWasm__.__createConstant__ = this.createConstant.bind(this);
        this.__exportsToWasm__.__runjs__ = function(pointer) {
            return eval(this.toString(pointer));
        }.bind(this);
    
        this.__exportsToWasm__.abs = function(value) { return Math.abs(value); }
        this.__exportsToWasm__.round = function(value) { return Math.round(value); }
        this.__exportsToWasm__.roundf = function(value) { return Math.fround(value); }
    
        this.wasi = {
            proc_exit: function() { console.log('abort'); },
        };
    }
    
    updateBuffer(buffer, arraybuffer) {
        buffer.__arraybuffer__ = arraybuffer;
        switch (buffer.__type__) {
            case 1: buffer.array = new Uint8Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) : buffer.length); break;
            case 2: buffer.array = new Int8Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) : buffer.length); break;
            case 3: buffer.array = new Uint16Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 2 : buffer.length); break;
            case 4: buffer.array = new Int16Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 2 : buffer.length); break;
            case 5: buffer.array = new Uint32Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length); break;
            case 6: buffer.array = new Int32Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length); break;
            case 7: buffer.array = new BigUint64Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length); break;
            case 8: buffer.array = new BigInt64Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length); break;
            case 9: buffer.array = new Float32Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 4 : buffer.length); break;
            case 10: buffer.array = new Float64Array(buffer.__arraybuffer__, buffer.pointer, (buffer.length < 0) ? (buffer.__arraybuffer__.byteLength - buffer.pointer) / 8 : buffer.length); break;
        }
    }
    
    createViewFromType(type, pointer, length) {
        const buffer = {
            pointer: pointer,
            length: length,
            __arraybuffer__: this.linearMemory,
            __type__: type,
            __glue__: this,
            free() {
                this.__glue__.free(this.pointer);
                Object.getOwnPropertyNames(this).forEach((property) => delete this[property] );
                Object.setPrototypeOf(this, null);
            }
        };
        this.updateBuffer(buffer, this.linearMemory);
        this.__views__.add(buffer);
        return buffer;
    }
    
    returnPointerToView(r, type) {
        if ((type > 0) && (typeof r !== 'undefined')) {
            const length = this.__functions__.__lastarraylength__();
            r = this.createViewFromType(type, r, length > 0 ? length : -1);
        }
        return r;
    }
    
    invokeMethod() {
        if ((arguments.length == 2) && (typeof arguments[1] == 'object')) {
            const obj = arguments[1]; let n = 1;
            for (const m in obj) arguments[n++] = obj[m];
            arguments.length = n;
        }
        const strings = [];
        for (let index = arguments.length - 1; index > 0; index--) {
            if (arguments[index].array != undefined) arguments[index] = arguments[index].array.byteOffset;
            else if (arguments[index].__pointer__ != undefined) arguments[index] = arguments[index].__pointer__;
            else if (typeof arguments[index] == 'string') {
                arguments[index] = this.__glue__.toWASMString(arguments[index]);
                strings.push(arguments[index]);
            }
        }
        const info = arguments[0];
        arguments[0] = this.__pointer__;
        let r = info.function.apply(this, arguments);
        for (const string of strings) this.__glue__.free(string);
        r = this.__glue__.returnPointerToView(r, info.returnPointerType);
        return r;
    }
    
    invokeFunction() {
        if ((arguments.length == 1) && (typeof arguments[0] == 'object')) {
            const obj = arguments[0]; let n = 0;
            for (const m in obj) arguments[n++] = obj[m];
            arguments.length = n;
        }
        const strings = [];
        for (let index = arguments.length - 1; index >= 0; index--) {
            if (arguments[index].array != undefined) arguments[index] = arguments[index].array.byteOffset;
            else if (arguments[index].__pointer__ != undefined) arguments[index] = arguments[index].__pointer__;
            else if (typeof arguments[index] == 'string') {
                arguments[index] = this.glue.toWASMString(arguments[index]);
                strings.push(arguments[index]);
            }
        }
        let r = this.apply(this, arguments);
        for (const string of strings) this.glue.free(string);
        r = this.glue.returnPointerToView(r, this.returnPointerType);
        return r;
    }
    
    invokeExportedFunction() {
        let r = this.apply(this, arguments);
        if (r.array !== undefined) r = r.array.byteOffset;
        return r;
    }
    
    createClass(classnamePointer, classnameLen, sizeofClass) {
        const glue = this, classname = glue.toString(classnamePointer, classnameLen);
        const WASM = class {
            constructor() {
                const meta = Object.getPrototypeOf(this).constructor.__meta__;
                if (!meta.hasConstructor) throw meta.name + ' has no constructor';
    
                this.__class__ = meta.name;
                this.__prev__ = glue.__lastObject__;
                if (glue.__lastObject__ != null) glue.__lastObject__.__next__ = this;
                this.__next__ = null;
                this.__glue__ = glue;
                glue.__lastObject__ = this;
    
                const args = [].slice.call(arguments);
                args.unshift(glue.malloc(meta.size));
                this.__pointer__ = glue[meta.name + '::' + meta.name].apply(null, args);
    
                for (const property of meta.properties) glue.createPropertyFromDescriptor(this, property);
                for (const method of meta.methods) this[method.name] = glue.invokeMethod.bind(this, { function: glue[method.wasmFunction], returnPointerType: method.returnPointerType });
            }
            destruct() {
                const meta = Object.getPrototypeOf(this).constructor.__meta__;
                if (meta.hasDestructor) glue[meta.name + '::~' + meta.name](this.__pointer__);
                glue.free(this.__pointer__);
                if (this.__prev__ != null) this.__prev__.__next__ = this.__next__;
                if (this.__next__ != null) this.__next__.__prev__ = this.__prev__;
                Object.getOwnPropertyNames(this).forEach((property) => delete this[property] );
                Object.setPrototypeOf(this, null);
            }
        }
        glue.__classUnderConstruction__ = glue.__classes__[classname] = glue[classname] = WASM;
        glue.__classUnderConstruction__.__meta__ = {
            name: classname,
            size: sizeofClass,
            hasConstructor: false,
            hasDestructor: false,
            properties: [],
            methods: [],
            staticProperties: []
        }
        delete glue.__functionsWithNamespace__[classname];
    }
    
    createConstructor() {
        this.__classUnderConstruction__.__meta__.hasConstructor = true;
    }
    
    createDestructor() {
        this.__classUnderConstruction__.__meta__.hasDestructor = this.__classUnderConstruction__.__meta__.hasConstructor;
    }
    
    createClassConstant(nameptr, namelen, value) {
        this.__classUnderConstruction__[this.toString(nameptr, namelen)] = value;
    }
    
    createConstant(nameptr, namelen, value) {
        this[this.toString(nameptr, namelen)] = value;
    }
    
    createPropertyFromDescriptor(object, descriptor) {
        const buffer = this.createViewFromType(descriptor.viewType, object.__pointer__ + descriptor.offset, descriptor.viewLength);
        if (descriptor.viewLength > 1) Object.defineProperty(object, descriptor.name, {
            get: function() { return buffer.array; },
            set: function(value) { buffer.array[index] = value; },
            configurable: true,
            enumerable: true
        }); else Object.defineProperty(object, descriptor.name, {
            get: function() { return buffer.array[0]; },
            set: function(value) { buffer.array[0] = value; },
            configurable: true,
            enumerable: true
        });
    }
    
    createProperty(propertynamePointer, propertynameLen, offset, viewType, viewLength) {
        this.__classUnderConstruction__.__meta__.properties.push({
            name: this.toString(propertynamePointer, propertynameLen),
            offset: offset,
            viewType: viewType, 
            viewLength: viewLength 
        });
    }
    
    createStaticPropertyFromDescriptor(wasmClass, descriptor) {
        const buffer = this.createViewFromType(descriptor.viewType, descriptor.pointer, descriptor.viewLength);
        if (descriptor.viewLength > 1) Object.defineProperty(wasmClass, descriptor.name, {
            get: function() { return buffer.array; },
            set: function(value) { buffer.array[index] = value; },
            configurable: true,
            enumerable: true
        }); else Object.defineProperty(wasmClass, descriptor.name, {
            get: function() { return buffer.array[0]; },
            set: function(value) { buffer.array[0] = value; },
            configurable: true,
            enumerable: true
        });
    }
    
    createStaticProperty(propertynamePointer, propertynameLen, pointer, viewType, viewLength) {
        const descriptor = { 
            name: this.toString(propertynamePointer, propertynameLen), 
            pointer: pointer,
            viewType: viewType,
            viewLength: viewLength
        };
        this.__classUnderConstruction__.__meta__.staticProperties.push(descriptor);
        this.createStaticPropertyFromDescriptor(this.__classUnderConstruction__, descriptor);
    }
    
    createMethod(methodnamePointer, methodnameLen, returnPointerType) {
        const methodname = this.toString(methodnamePointer, methodnameLen);
        this.__classUnderConstruction__.__meta__.methods.push({ 
            name: methodname,
            wasmFunction: this.__classUnderConstruction__.__meta__.name + '::' + methodname,
            returnPointerType: returnPointerType
        });
    }
    
    createStaticMethod(methodnamePointer, methodnameLen, returnPointerType) {
        const methodname = this.toString(methodnamePointer, methodnameLen), wasmMethodname = this.__classUnderConstruction__.__meta__.name + '::' + methodname;
        this[wasmMethodname].returnPointerType = returnPointerType;
        this[wasmMethodname].glue = this;
        this.__classUnderConstruction__[methodname] = this.invokeFunction.bind(this[wasmMethodname]);
    }
    
    createFunction(methodnamePointer, methodnameLen, returnPointerType) {
        const methodname = this.toString(methodnamePointer, methodnameLen);
        if (!this[methodname]) { // maybe this function is in a namespace
            for (const namespace in this.__functionsWithNamespace__) {
                if (this.__functionsWithNamespace__[namespace][methodname]) {
                    this[methodname] = this.__functionsWithNamespace__[namespace][methodname];
                    delete this.__functionsWithNamespace__[namespace][methodname];
                    break;
                }
            }
            if (!this[methodname]) return;
        }
        this[methodname].returnPointerType = returnPointerType;
        this[methodname].glue = this;
        this[methodname] = this.invokeFunction.bind(this[methodname]);
    }
    
    exportToWasm(functionName, f) {
        this.__exportsToWasm__[functionName] = this.invokeExportedFunction.bind(f);
    }
    
    onMemoryGrowth(n) {
        this.linearMemory = this.wasmInstance.exports.memory.buffer;
        if (this.__memorygrowview__.buffer.byteLength < 1) this.updateMemoryViews();
        this.logMemory();
    }
    
    consolelog(pointer, strlen) {
        console.log(this.toString(pointer, strlen));
    }
    
    async loadFromArrayBuffer(wasmCode, afterWASMLoaded = null) {
        this.wasmCode = wasmCode;
        await WebAssembly.instantiate(wasmCode, {
            wasi_snapshot_preview1: this.wasi,
            env: this.__exportsToWasm__
        }).then(_module => {
            this.wasmInstance = _module.instance;
            this.wasmInstance.exports._initialize();
    
            this.__functions__ = this.wasmInstance.exports;
            this.linearMemory = this.wasmInstance.exports.memory.buffer;
            this.__memorygrowpointer__ = this.__functions__.__malloc__(16);
            this.__memorygrowview__ = new Uint8Array(this.linearMemory, this.__memorygrowpointer__, 16);
            this.__functionsWithNamespace__ = {};
    
            const outputBuffer = this.__functions__.__malloc__(1024), stringview = new Uint8Array(this.linearMemory, this.__functions__.__malloc__(1024), 1024);
            for (const f in this.__functions__) if (f != '__demangle__') {
                const length = this.__functions__.__demangle__(this.toWASMString(f, stringview), outputBuffer);
                if (length > 0) {
                    let name = this.toString(outputBuffer, length);
                    const par = name.indexOf('(');
                    if (par > 0) name = name.substring(0, par);
    
                    let namespace = name.lastIndexOf('::');
                    if (namespace > 0) {
                        namespace = name.lastIndexOf('::', namespace - 1);
                        if (namespace > 0) name = name.substr(namespace + 2);
                    }
    
                    // class members have namespaces removed from this point, but functions not
                    const split = name.split('::', 2);
                    if (split.length == 2) {
                        if (!this.__functionsWithNamespace__[split[0]]) this.__functionsWithNamespace__[split[0]] = {}
                        this.__functionsWithNamespace__[split[0]][split[1]] = this.__functions__[f];
                    }
    
                    this[name] = this.__functions__[f];
                } else this[f] = this.__functions__[f];
            }
            this.free(outputBuffer);
            this.free(stringview.byteOffset);
    
            this.__functions__.__initialize__();
            delete this.__functionsWithNamespace__;
            this.logMemory();
            this.__classUnderConstruction__ = null;
    
            if (afterWASMLoaded != null) afterWASMLoaded.afterWASMLoaded();
        });
    }
    
    toString(pointer, strlen = 0) {
        let view = null;
        if (strlen < 1) {
            const viewLength = Math.min(16384, this.linearMemory.byteLength - pointer);
            view = new Uint8Array(this.linearMemory, pointer, viewLength);
            for (strlen = 0; strlen < viewLength; strlen++) if (view[strlen] == 0) break;
        } else view = new Uint8Array(this.linearMemory, pointer, strlen);
    
        let str = '', i = 0, bytesNeeded, codePoint;
        while (i < strlen) {
            const octet = view[i];
            bytesNeeded = codePoint = 0;
    
            if (octet <= 0x7f) {
                bytesNeeded = 0;
                codePoint = octet & 0xff;
            } else if (octet <= 0xdf) {
                bytesNeeded = 1;
                codePoint = octet & 0x1f;
            } else if (octet <= 0xef) {
                bytesNeeded = 2;
                codePoint = octet & 0x0f;
            } else if (octet <= 0xf4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
    
            if (strlen - i - bytesNeeded > 0) {
                for (let k = 0; k < bytesNeeded; k++) codePoint = (codePoint << 6) | (view[i + k + 1] & 0x3f);
            } else {
                codePoint = 0xfffd;
                bytesNeeded = strlen - i;
            }
    
            str += String.fromCodePoint(codePoint);
            i += bytesNeeded + 1;
        }
        return str;
    }
    
    toWASMString(str, view = null) {
        const length = str.length, maxBytes = length * 4 + 1;
        let i = 0, c, bits, destination = 0;
        if (view == null) view = new Uint8Array(this.linearMemory, this.malloc(maxBytes), maxBytes);
        while (i < length) {
            const codePoint = str.codePointAt(i);
            c = bits = 0;
    
            if (codePoint <= 0x0000007f) {
                c = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007ff) {
                c = 6;
                bits = 0xc0;
            } else if (codePoint <= 0x0000ffff) {
                c = 12;
                bits = 0xe0;
            } else if (codePoint <= 0x001fffff) {
                c = 18;
                bits = 0xf0;
            }
    
            view[destination++] = bits | (codePoint >> c);
            c -= 6;
            while (c >= 0) {
                view[destination++] = 0x80 | ((codePoint >> c) & 0x3f);
                c -= 6;
            }
            i += (codePoint >= 0x10000) ? 2 : 1;
        }
    
        view[destination] = 0;
        return view.byteOffset;
    }
    
    logMemory() {
        console.log('WASM memory ' + this.id + ': ' + this.niceSize(this.__functions__.__stacksize__()) + ' stack, ' + this.niceSize(this.linearMemory.byteLength - this.__functions__.__heapbase__()) + ' heap, ' + this.niceSize(this.linearMemory.byteLength) + ' total.');
    }
    
    malloc(bytes) {
        const pointer = this.__functions__.__malloc__(bytes);
        if (this.__memorygrowview__.buffer.byteLength < 1) this.updateMemoryViews();
        return pointer;
    }
    
    updateMemoryViews() {
        for (const buffer of this.__views__) this.updateBuffer(buffer, this.linearMemory);
        this.__memorygrowview__ = new Uint8Array(this.linearMemory, this.__memorygrowpointer__, 16);
    }
    
    free(pointer) {
        this.__functions__.__free__(pointer);
    }
    
    setInt64(pointer, index, value) {
        this.__functions__.__setint64__(pointer, index, value);
    }
    
    bufferToWASM(buffer, input, index) {
        let inBufferL = null, inBufferR = null;
        if (index === undefined) index = 0;
        if (typeof input.getChannelData === 'function') {
            inBufferL = input.getChannelData(0);
            inBufferR = input.getChannelData(1);
        } else {
            inBufferL = input[index][0];
            inBufferR = input[index][1];
        }
        const arr = (buffer.constructor === Array) ? buffer[index].array : buffer.array, to = arr.length;
        for (let n = 0, i = 0; n < to; n++, i++) {
            arr[n++] = inBufferL[i];
            arr[n] = inBufferR[i];
        }
    }
    
    bufferToJS(buffer, output, index) {
        let outBufferL = null, outBufferR = null;
        if (index === undefined) index = 0;
        if (typeof output.getChannelData === 'function') {
            outBufferL = output.getChannelData(0);
            outBufferR = output.getChannelData(1);
        } else {
            outBufferL = output[index][0];
            outBufferR = output[index][1];
        }
        const arr = (buffer.constructor === Array) ? buffer[index].array : buffer.array, to = arr.length;
        for (let n = 0, i = 0; n < to; n++, i++) {
            outBufferL[i] = arr[n++];
            outBufferR[i] = arr[n];
        }
    }
    
    arrayBufferToWASM(arrayBuffer, offset = 0) {
        const pointer = this.malloc(arrayBuffer.byteLength + offset);
        new Uint8Array(this.linearMemory).set(new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength), pointer + offset);
        return pointer;
    }
    
    copyWASMToArrayBuffer(pointer, lengthBytes) {
        const arrayBuffer = new ArrayBuffer(lengthBytes);
        new Uint8Array(arrayBuffer, 0, lengthBytes).set(new Uint8Array(this.linearMemory, pointer, lengthBytes));
        return arrayBuffer;
    }
    
    moveWASMToArrayBuffer(pointer, lengthBytes) {
        const arrayBuffer = this.copyWASMToArrayBuffer(pointer, lengthBytes);
        this.free(pointer);
        return arrayBuffer;
    }
    
    static async loaderWorkerMain(url) {
        SuperpoweredGlue.__uint_max__sp__ = 255;
        const Superpowered = await SuperpoweredGlue.Instantiate('');
    
        await fetch(url).then(response =>
            response.arrayBuffer()
        ).then(audiofileArrayBuffer => {
            // Copy the ArrayBuffer to WebAssembly Linear Memory.
            const audiofileInWASMHeap = Superpowered.arrayBufferToWASM(audiofileArrayBuffer);
    
            // Decode the entire file.
            const decodedAudio = Superpowered.Decoder.decodeToAudioInMemory(audiofileInWASMHeap, audiofileArrayBuffer.byteLength);
    
            // Copy the pcm audio from the WebAssembly heap into a regular ArrayBuffer that can be transfered.
            const arrayBuffer = Superpowered.moveWASMToArrayBuffer(decodedAudio, Superpowered.AudioInMemory.getSize(decodedAudio) * 4);
    
            // Transfer the ArrayBuffer.
            if (typeof self.transfer !== 'undefined') self.transfer(url, arrayBuffer);
            else postMessage({ '__transfer__': arrayBuffer, }, [ arrayBuffer ]);
        });
    }
    
    static loaderWorkerOnmessage(message) {
        if (typeof message.data.load === 'string') SuperpoweredGlue.loaderWorkerMain(message.data.load);
    }
    
    registerTrackLoader(receiver) {
        if (typeof receiver.terminate !== 'undefined') receiver.addEventListener('message', this.handleTrackLoaderMessage); // Worker
        return this.trackLoaderReceivers.push((typeof receiver.port !== 'undefined') ? receiver.port : receiver) - 1;
    }
    
    handleTrackLoaderMessage(message) {
        if (typeof message.data.SuperpoweredLoad !== 'string') return false;
        this.loadTrackInWorker(message.data.SuperpoweredLoad, message.data.trackLoaderID);
        return true;
    }
    
    async loadTrackInWorker(url, trackLoaderID) {
        let source = null;
        if (SuperpoweredGlue.SuperpoweredGlueSourceURL != null) {
            const response = await fetch(SuperpoweredGlue.SuperpoweredGlueSourceURL);
            source = await response.text();
        }
        if (source == null) source = SuperpoweredGlue.toString();
    
        const trackLoaderWorker = new Worker(URL.createObjectURL(new Blob([ source + "\r\n\r\nonmessage = SuperpoweredGlue.loaderWorkerOnmessage;" ], { type: 'application/javascript' })));
        trackLoaderWorker.__url__ = url;
        trackLoaderWorker.trackLoaderID = trackLoaderID;
    
        trackLoaderWorker.ontransfer = function(message) { 
            this.transferLoadedTrack(message.transfer, trackLoaderWorker);
        }.bind(this);
    
        trackLoaderWorker.onmessage = function(message) { 
            this.transferLoadedTrack(message.data.__transfer__, trackLoaderWorker);
        }.bind(this);
    
        if ((typeof window !== 'undefined') && (typeof window.location !== 'undefined') && (typeof window.location.origin !== 'undefined')) url = new URL(url, window.location.origin).toString();
        trackLoaderWorker.postMessage({ load: url });
    }
    
    transferLoadedTrack(arrayBuffer, trackLoaderWorker) {
        const receiver = this.trackLoaderReceivers[trackLoaderWorker.trackLoaderID]; 
        if (receiver == null) return;
        if (typeof receiver.postMessage === 'function') receiver.postMessage({ SuperpoweredLoaded: { buffer: arrayBuffer, url: trackLoaderWorker.__url__ }}, [ arrayBuffer ]);
        else receiver({ SuperpoweredLoaded: { buffer: arrayBuffer, url: trackLoaderWorker.__url__ }});
        trackLoaderWorker.terminate();
    }
    
    downloadAndDecode(url, obj) {
        if (obj.trackLoaderID === undefined) return;
        if ((typeof obj.onMessageFromMainScope === 'function') && (typeof obj.sendMessageToMainScope === 'function')) obj.sendMessageToMainScope({ SuperpoweredLoad: url, trackLoaderID: obj.trackLoaderID });
        else this.loadTrackInWorker(url, obj.trackLoaderID);
    }
}

class SuperpoweredWebAudio {
    static AudioWorkletHasBrokenModuleImplementation = false;

    constructor(minimumSamplerate, superpowered) {
        //SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = (navigator.userAgent.indexOf('AppleWebKit') > -1) || (navigator.userAgent.indexOf('Firefox') > -1);
        //SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = (navigator.userAgent.indexOf('Firefox') > -1);
        //if (SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && (navigator.userAgent.indexOf('Chrome') > -1)) SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation = false;
        this.Superpowered = superpowered;
        this.audioContext = null;
        const AudioContext = window.AudioContext || window.webkitAudioContext || false;
        let c = new AudioContext();
        if (c.sampleRate < minimumSamplerate) {
            c.close();
            c = new AudioContext({ sampleRate: minimumSamplerate });
        }
        this.audioContext = c;
    }

    getUserMediaForAudio(constraints, onPermissionGranted, onPermissionDenied) {
        let finalConstraints = {};

        if (navigator.mediaDevices) {
            const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
            for (const constraint in supportedConstraints) if (supportedConstraints.hasOwnProperty(constraint) && (constraints[constraint] !== undefined)) finalConstraints[constraint] = constraints[constraint];
        }

        finalConstraints.audio = true;
        finalConstraints.video = false;

        navigator.fastAndTransparentAudio = constraints.hasOwnProperty('fastAndTransparentAudio') && (constraints.fastAndTransparentAudio === true);
        if (navigator.fastAndTransparentAudio) {
            finalConstraints.echoCancellation = false;
            finalConstraints.disableLocalEcho = false;
            finalConstraints.autoGainControl = false;
            finalConstraints.audio = { mandatory: { googAutoGainControl: false, googAutoGainControl2: false, googEchoCancellation: false, googNoiseSuppression: false, googHighpassFilter: false, googEchoCancellation2: false, googNoiseSuppression2: false, googDAEchoCancellation: false, googNoiseReduction: false } };
        };

        navigator.getUserMediaMethod = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMediaMethod) navigator.getUserMediaMethod(finalConstraints, onPermissionGranted, onPermissionDenied);
        else {
            let userMedia = null;
            try {
                userMedia = navigator.mediaDevices.getUserMedia;
            } catch(error) {
                if ((location.protocol.toLowerCase() != 'https') && (location.hostname.toLowerCase() != 'localhost')) onPermissionDenied("Web Audio requires a secure context (HTTPS or localhost).");
                else onPermissionDenied(error);
                userMedia = null;
            }

            if (userMedia != null) {
                if (userMedia) navigator.mediaDevices.getUserMedia(finalConstraints).then(onPermissionGranted).catch(onPermissionDenied);
                else onPermissionDenied("Can't access getUserMedia.");
            }
        }
    }

    async getUserMediaForAudioAsync(constraints) {
        return new Promise((resolve, reject) => {
            this.getUserMediaForAudio(constraints, function(stream) {
                if (navigator.fastAndTransparentAudio) {
                    const audioTracks = stream.getAudioTracks();
                    for (const audioTrack of audioTracks) audioTrack.applyConstraints({ autoGainControl: false, echoCancellation: false, noiseSuppression: false });
                }
                resolve(stream);
            }, reject);
        });
    }

    async createAudioNodeAsync(url, className, onMessageFromAudioScope, numInputs, numOutputs) {
        if (numInputs === undefined) numInputs = 1;
        if (numOutputs === undefined) numOutputs = 1;
        return new Promise((resolve, reject) => this.createAudioNode(url, className, resolve, onMessageFromAudioScope, numInputs, numOutputs) );
    }

    createAudioNode(url, className, callback, onMessageFromAudioScope, numInputs, numOutputs) {
        if (!SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && (typeof AudioWorkletNode === 'function')) {
            if (numInputs === undefined) numInputs = 1;
            if (numOutputs === undefined) numOutputs = 1;

            this.audioContext.audioWorklet.addModule(url).then(() => {
                const node = new AudioWorkletNode(this.audioContext, className, {
                    processorOptions: {
                        wasmCode: this.Superpowered.wasmCode,
                        samplerate: this.audioContext.sampleRate,
                        maxChannels: this.Superpowered.__maxChannels__,
                        numberOfInputs: numInputs,
                        numberOfOutputs: numOutputs,
                        trackLoaderID: this.Superpowered.trackLoaderReceivers.length
                    },
                    numberOfInputs: numInputs,
                    numberOfOutputs: numOutputs,
                    outputChannelCount: Array(numOutputs).fill(2)
                });
                node.trackLoaderID = this.Superpowered.registerTrackLoader(node);
                node.Superpowered = this.Superpowered;
                node.onReadyCallback = callback;
                node.onMessageFromAudioScope = onMessageFromAudioScope;
                node.destruct = function() {
                    node.Superpowered.trackLoaderReceivers[node.trackLoaderID] = null;
                    node.port.postMessage('___superpowered___destruct___');
                }
                node.sendMessageToAudioScope = function(message, transfer = []) { node.port.postMessage(message, transfer); }
                node.port.onmessage = function(event) {
                    if (node.Superpowered.handleTrackLoaderMessage(event)) return;
                    if (event.data == '___superpowered___onready___') {
                        node.state = 1;
                        node.onReadyCallback(node);
                    } else node.onMessageFromAudioScope(event.data);
                }.bind(node);
            });
        } else {
            import(/* webpackIgnore: true */ url).then((processorModule) => {
                const node = this.audioContext.createScriptProcessor(1024, 2, 2);
                node.trackLoaderID = this.Superpowered.registerTrackLoader(node);
                node.samplerate = this.audioContext.sampleRate;
                node.inputBuffer = this.Superpowered.createFloatArray(1024 * 2);
                node.outputBuffer = this.Superpowered.createFloatArray(1024 * 2);
                node.processor = new processorModule.default(this.Superpowered, onMessageFromAudioScope, node.samplerate);
                node.sendMessageToAudioScope = function(message, transfer = 0) { node.processor.onMessageFromMainScope(message); }
                node.destruct = function() {
                    node.processor.Superpowered.trackLoaderReceivers[node.trackLoaderID] = null;
                    node.processor.state = -1;
                    node.processor.onDestruct();
                }
                node.onaudioprocess = function(e) {
                    node.processor.Superpowered.bufferToWASM(node.inputBuffer, e.inputBuffer);
                    if (node.processor.state > 0) node.processor.processAudio(node.inputBuffer, node.outputBuffer, node.inputBuffer.array.length / 2);
                    node.processor.Superpowered.bufferToJS(node.outputBuffer, e.outputBuffer);
                };
                node.processor.state = 1;
                callback(node);
            });
        }
    }
}

if (!SuperpoweredWebAudio.AudioWorkletHasBrokenModuleImplementation && (typeof AudioWorkletProcessor === 'function')) {
    class SuperpoweredAudioWorkletProcessor extends AudioWorkletProcessor {
        constructor(options) {
            super();
            SuperpoweredGlue.__uint_max__sp__ = options.processorOptions.maxChannels;
            this.trackLoaderID = options.processorOptions.trackLoaderID;
            this.state = 0;
            this.port.onmessage = (event) => {
                if (event.data == '___superpowered___destruct___') {
                    this.state = -1;
                    this.onDestruct();
                } else this.onMessageFromMainScope(event.data);
            };
            this.samplerate = options.processorOptions.samplerate;
            this.Superpowered = new SuperpoweredGlue();
            this.Superpowered.loadFromArrayBuffer(options.processorOptions.wasmCode, this);
            this.numberOfInputs = options.processorOptions.numberOfInputs;
            this.numberOfOutputs = options.processorOptions.numberOfOutputs;
        }
        afterWASMLoaded() {
            this.Superpowered.Initialize();

            this.inputBuffers = [];
            for (let n = this.numberOfInputs; n > 0; n--) this.inputBuffers.push(this.Superpowered.createFloatArray(128 * 2));

            this.outputBuffers = [];
            for (let n = this.numberOfOutputs; n > 0; n--) this.outputBuffers.push(this.Superpowered.createFloatArray(128 * 2));

            this.onReady();
            this.port.postMessage('___superpowered___onready___');
            this.state = 1;
        }
        onReady() {}
        onDestruct() {}
        onMessageFromMainScope(message) {}
        sendMessageToMainScope(message) { this.port.postMessage(message); }
        processAudio(buffer, parameters) {}
        process(inputs, outputs, parameters) {
            if (this.state < 0) return false;
            if (this.state == 1) {
                for (let n = this.numberOfInputs - 1; n >= 0; n--) {
                    if (inputs[n].length > 1) this.Superpowered.bufferToWASM(this.inputBuffers, inputs, n);
                    else this.Superpowered.memorySet(this.inputBuffers[n].pointer, 0, 128 * 8);
                }
                this.processAudio(
                    (this.numberOfInputs == 1) ? this.inputBuffers[0] : this.inputBuffers, 
                    (this.numberOfOutputs == 1) ? this.outputBuffers[0] : this.outputBuffers,
                    128,
                    parameters
                );
                for (let n = this.numberOfOutputs - 1; n >= 0; n--) {
                    if (outputs[n].length > 1) this.Superpowered.bufferToJS(this.outputBuffers, outputs, n);
                }
            }
            return true;
        }
    }
    SuperpoweredWebAudio.AudioWorkletProcessor = SuperpoweredAudioWorkletProcessor;
} else {
    class SuperpoweredAudioWorkletProcessor {
        constructor(sp, oma, sr) {
            this.Superpowered = sp;
            this.samplerate = sr;
            this.onMessageFromAudioScope = oma;
            this.state = 0;
            this.onReady();
        }
        onMessageFromAudioScope = null;
        onReady() {}
        onDestruct() {}
        onMessageFromMainScope(message) {}
        sendMessageToMainScope(message) { if (!this.Superpowered.handleTrackLoaderMessage({ data: message })) this.onMessageFromAudioScope(message); }
        postMessage(message, transfer = []) { this.onMessageFromMainScope(message); }
        processAudio(buffer, parameters) {}
    }
    SuperpoweredWebAudio.AudioWorkletProcessor = SuperpoweredAudioWorkletProcessor;
}

if (typeof exports === 'object' && typeof module === 'object') module.exports = { SuperpoweredGlue, SuperpoweredWebAudio };
else if (typeof exports === 'object') {
    exports['SuperpoweredGlue'] = SuperpoweredGlue;
    exports['SuperpoweredWebAudio'] = SuperpoweredWebAudio;
}
if (typeof globalThis !== 'undefined') { 
    globalThis.SuperpoweredGlue = SuperpoweredGlue;
    globalThis.SuperpoweredWebAudio = SuperpoweredWebAudio;
}


;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof define === 'function' && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');

;
//# sourceMappingURL=scripts.js.map
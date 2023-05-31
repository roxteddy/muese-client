export type Stem = {
    id: number
    filename: string
    name: string
    sourceName: string
    sourceType: StemSourceType
    type: StemType
}

export enum StemType {
    DRUMS,
    PIANO,
    BASS,
    VOCALS,
    OTHER,
}

export enum StemSourceType {
    NATIVE,
    IA,
    USER,
}

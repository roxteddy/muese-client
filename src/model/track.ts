import { Stem } from './stem';

export type Track = {
    albums?: string[]
    artists: string[]
    bpm: number
    duration: number
    filename: string
    key: number
    title: string
    status: TrackStatus
    stems: Stem[]
}

export enum TrackStatus {
    IDLE,
    QUEUED,
    PROCESSING,
    READY,
    ERROR,
}

import { Stem } from './stem';

export type Track = {
    id: number
    title: string
    artists: string[]
    filename: string
    duration: number
    bpm: number
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

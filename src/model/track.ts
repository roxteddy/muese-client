import { Stem } from './stem';

export type Track = {
    albums?: Album[];
    artists: string[];
    bpm: number;
    duration: number;
    filename: string;
    key: number;
    title: string;
    status: TrackStatus;
    stems: Stem[];
}

export enum TrackStatus {
    IDLE,
    QUEUED,
    PROCESSING,
    READY,
    ERROR,
}

export interface Album {
    uuid: string;
    cover?: string;
    name: string;
    releaseDate?: Date;
    artists?: string[];
    tracks?: Track;
}

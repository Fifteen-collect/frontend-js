import {Method} from "./Method";

export interface AppState {
    matrix?: number[][],
    buffer?: {
        x: number,
        y: number,
    },
    settings?: {
        size: number,
        availableSizes: number[]
    },
    moves: number,
    run: boolean,
    timerInterval?: number | undefined,
    time: number | 0;
    relativeSize?: number,
    solved: boolean,
    method: Method,
}

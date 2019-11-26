import {Method} from "./Method";
import Bar from "../components/Bar";

export interface AppState {
    matrix?: Bar[][],
    buffer?: {
        x: number,
        y: number,
    },
    settings?: {
        size: number,
        method: Method,
        availableSizes: number[],
        availableMethods: Method[],
        menuCollapsed: boolean,
    },
    moves: number,
    run: boolean,
    timerInterval?: number | undefined,
    time: number | 0;
    relativeSize?: number,
    solved: boolean,
}

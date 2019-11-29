import {Method} from "./Method";
import Bar from "../Components/Bar";
import {Theme} from "./Theme";

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
        modalToggle: boolean,
        availableThemes: Theme[],
    },
    moves: number,
    run: boolean,
    startTime: number | 0;
    relativeSize?: number,
    solved: boolean,
    theme: Theme,
}

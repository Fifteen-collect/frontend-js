import {Method} from "Types/Method";
import Bar from "Components/Bar";
import {Theme} from "Types/Theme";

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
        pinSizesToTop: boolean,
    },
    moves: number,
    run: boolean,
    startTime: number | 0;
    relativeSize?: number,
    solved: boolean,
    theme: Theme,
}

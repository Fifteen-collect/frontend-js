import {Method} from "../Method";
import {Color} from "../Color";

export type Theme = {
    [method in Method]: {
        [size: number]: {
            [row: number]: {
                [col: number]: Color,
            },
        }
    }
}

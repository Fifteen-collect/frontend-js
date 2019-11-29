import {Method} from "Types/Method";
import {Color} from "Types/Color";

export type Theme = {
    [method in Method]: {
        [size: number]: {
            [row: number]: {
                [col: number]: Color,
            },
        }
    }
}

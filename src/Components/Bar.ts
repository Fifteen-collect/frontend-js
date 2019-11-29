import {Color} from "Types/Color";

export default class Bar {
    private color: Color;
    private readonly value: number;
    private readonly x: number;
    private readonly y: number;

    constructor(color: Color, value: number, x: number, y: number) {
        this.color = color;
        this.value = value;
        this.x = x;
        this.y = y;
    }

    get Color(): Color {
        return this.color;
    }

    set Color(value: Color) {
        this.color = value;
    }

    get Value(): number {
        return this.value;
    }

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }
}

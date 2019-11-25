import * as React from "react";
import { ReactNode } from "react";
export interface AppState {
    matrix?: number[][];
    buffer?: {
        x: number;
        y: number;
    };
    settings?: {
        size: number;
    };
    moves: number;
}
export default class App extends React.Component<{}, AppState> {
    readonly state: AppState;
    constructor(props: {});
    render(): ReactNode;
    static createDefaultMatrix(size: number): number[][];
    isBlockCanMove(y: number, x: number): boolean;
    isBlockCanMoveUp(y: number, x: number): boolean;
    isBlockCanMoveDown(y: number, x: number): boolean;
    isBlockCanMoveLeft(y: number, x: number): boolean;
    isBlockCanMoveRight(y: number, x: number): boolean;
    isBlockOnUpEdge(y: number): boolean;
    isBlockOnDownEdge(y: number): boolean;
    isBlockOnLeftEdge(x: number): boolean;
    isBlockOnRightEdge(x: number): boolean;
    isBlockEmpty(y: number, x: number): boolean;
}

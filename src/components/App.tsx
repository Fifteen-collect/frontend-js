import * as React from "react";
import {ReactNode} from "react";
import Block from "./Block";

export interface AppState {
    matrix?: number[][],
    buffer?: {
        x: number,
        y: number,
    },
    settings?: {
        size: number
    },
    moves: number,
}

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: 4
        },
        moves: 0,
    };

    constructor(props: {}) {
        super(props);

        this.state.matrix = App.createDefaultMatrix(this.state.settings.size);
        this.state.buffer = {
            x: 0,
            y: 0
        };
    }

    render(): ReactNode {
        return <div className={"container-fluid"} style={{height: "100vh"}}>
            <div className={"text-center"} style={{height: "10vh"}}>
                Moves: {this.state.moves}
            </div>
            <div className={"row d-flex justify-content-center"}>
                {this.state.matrix.map((row: number[], currentRow: number) => {
                    return row.map((block: number, currentColumn: number) => {
                        return <Block
                            key={`${currentRow}-${currentColumn}`}
                            value={block}
                            size={100 / this.state.settings.size}
                            onClickHandler={(): void => {
                                let {matrix, moves} = this.state;
                                let current = matrix[currentRow][currentColumn];
                                let buffer = this.state.buffer;

                                if (this.isBlockCanMove(currentRow, currentColumn)) {
                                    const {x, y} = buffer;

                                    matrix[y][x] = current;
                                    matrix[currentRow][currentColumn] = 0;
                                    buffer = {x: currentColumn, y: currentRow};
                                    moves++;
                                }

                                this.setState({
                                    matrix: matrix,
                                    buffer: buffer,
                                    moves: moves,
                                });
                            }}
                        />
                    })
                })}
            </div>
        </div>
    }

    static createDefaultMatrix(size: number): number[][] {
        let matrix: number[][] = [];

        for (let i = 0, count = 0; i < size; i++) {
            matrix.push([]);

            for (let j = 0; j < size; j++) {
                matrix[i][j] = count++;
            }
        }

        return matrix;
    }

    isBlockCanMove(y: number, x: number): boolean {
        return this.isBlockCanMoveUp(y, x)
            || this.isBlockCanMoveDown(y, x)
            || this.isBlockCanMoveLeft(y, x)
            || this.isBlockCanMoveRight(y, x);
    }

    isBlockCanMoveUp(y: number, x: number): boolean {
        return !this.isBlockOnUpEdge(y) && this.isBlockEmpty(y - 1, x);
    }

    isBlockCanMoveDown(y: number, x: number): boolean {
        return !this.isBlockOnDownEdge(y) && this.isBlockEmpty(y + 1, x);
    }

    isBlockCanMoveLeft(y: number, x: number): boolean {
        return !this.isBlockOnLeftEdge(x) && this.isBlockEmpty(y, x - 1);
    }

    isBlockCanMoveRight(y: number, x: number): boolean {
        return !this.isBlockOnRightEdge(x) && this.isBlockEmpty(y, x + 1);
    }

    isBlockOnUpEdge(y: number): boolean {
        return y === 0;
    }

    isBlockOnDownEdge(y: number): boolean {
        return y === this.state.settings.size - 1;
    }

    isBlockOnLeftEdge(x: number): boolean {
        return x === 0;
    }

    isBlockOnRightEdge(x: number): boolean {
        return x === this.state.settings.size - 1;
    }

    isBlockEmpty(y: number, x: number): boolean {
        return this.state.matrix[y][x] === 0;
    }
}

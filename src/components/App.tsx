import * as React from "react";
import {ReactNode} from "react";
import Block from "./Block";
import {State as AppState} from "./App/State";

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: 3,
        },
        moves: 0,
        run: false,
        time: 0,
    };
    private readonly windowSize: number;
    private readonly relativeSize: number;

    constructor(props: {}) {
        super(props);

        this.windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
        this.relativeSize = this.windowSize / this.state.settings.size;
        this.state.matrix = App.createDefaultMatrix(this.state.settings.size);
        this.state.buffer = {
            x: 0,
            y: 0
        };
    }

    render(): ReactNode {
        return <div className={"container-fluid row d-flex justify-content-center"}
                    style={{
                        height: "100vh",
                        margin: "0"
                    }}
        >
            <div className={"container-fluid"} style={{height: "10vh", width: "100vw"}}>
                <div className="row p-2 d-flex align-items-center">
                    <button className={"btn btn-primary btn-sm col-4"} onClick={() => {
                        const matrix = App.createDefaultMatrix(this.state.settings.size);


                        clearInterval(this.state.timerInterval);
                        this.setState({
                            matrix: matrix,
                            moves: 0,
                            buffer: {
                                x: 0,
                                y: 0,
                            },
                            run: false,
                            timerInterval: undefined,
                            time: 0,
                        });
                    }}>
                        Reset
                    </button>
                    <div className={"text-center col-4"}>
                        <b>{this.state.time.toFixed(2)}</b>
                    </div>
                    <div className={"text-center col-4"}>
                        <b>Moves: {this.state.moves}</b>
                    </div>
                </div>
            </div>
            <div className={"row d-flex justify-content-center"}
                 style={{
                     width: `${this.windowSize}px`,
                     height: `${this.windowSize}px`,
                 }}
            >
                {this.state.matrix.map((row: number[], currentRow: number) => {
                    return row.map((block: number, currentColumn: number) => {
                        return <Block
                            key={`${currentRow}-${currentColumn}`}
                            value={block}
                            size={this.relativeSize}
                            onClickHandler={(): void => {
                                let {matrix, moves, run, timerInterval, time} = this.state;
                                let current = matrix[currentRow][currentColumn];
                                let buffer = this.state.buffer;

                                if (this.isBlockCanMove(currentRow, currentColumn)) {
                                    const {x, y} = buffer;

                                    if (!run) {
                                        timerInterval = setInterval((): void => {
                                            if (this.isMatrixSolved()) {
                                                clearInterval(timerInterval);
                                                timerInterval = undefined;
                                                run = false;

                                                this.setState({
                                                    timerInterval: timerInterval,
                                                    run: false,
                                                })
                                            } else {
                                                time += 0.01;

                                                this.setState({
                                                    time: time,
                                                })
                                            }
                                        }, 10);
                                    }

                                    matrix[y][x] = current;
                                    matrix[currentRow][currentColumn] = 0;
                                    buffer = {x: currentColumn, y: currentRow};
                                    moves++;
                                    run = true;
                                }

                                this.setState({
                                    matrix: matrix,
                                    buffer: buffer,
                                    moves: moves,
                                    timerInterval: timerInterval,
                                    run: run,
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

    isMatrixSolved(): boolean {
        for (let row = 0, counterValue = 0; row < this.state.matrix.length; row++) {
            for (let col = 0; col < this.state.matrix[row].length; col++) {
                ++counterValue;

                if (this.state.matrix[row][col] === 0) {
                    continue;
                }
                if (this.state.matrix[row][col] !== counterValue) {
                    return false;
                }
            }
        }

        return true;
    }
}

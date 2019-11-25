import * as React from "react";
import {ReactNode} from "react";
import Block from "./Block";
import {State as AppState} from "./App/State";
import randomInt from "random-int";

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: 3,
        },
        moves: 0,
        run: false,
        time: 0,
        buffer: {
            x: 0,
            y: 0,
        }
    };
    private readonly windowSize: number;
    private readonly relativeSize: number;

    constructor(props: {}) {
        super(props);

        let {matrix, buffer} = this.randomizeMatrix(
            App.createDefaultMatrix(this.state.settings.size),
            this.state.buffer
        );

        this.state.buffer = buffer;
        this.state.matrix = matrix;
        this.windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
        this.relativeSize = this.windowSize / this.state.settings.size;
    }

    render(): ReactNode {
        return <div className={"container-fluid row d-flex justify-content-center main"}>
            <div className={"container-fluid inner-content"}>
                <div className="row p-2 d-flex align-items-center">
                    <button className={"btn btn-primary btn-sm col-4"} onClick={() => {
                        let {matrix, buffer} = this.randomizeMatrix(
                            App.createDefaultMatrix(this.state.settings.size),
                            {x: 0, y: 0}
                        );

                        clearInterval(this.state.timerInterval);
                        this.setState({
                            matrix: matrix,
                            buffer: buffer,
                            moves: 0,
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
                            clickHandler={() => {
                                this.blockEventHandler(currentRow, currentColumn);
                            }}
                            touchHandler={() => {
                                this.blockEventHandler(currentRow, currentColumn);
                            }}
                        />
                    })
                })}
            </div>
        </div>
    }

    blockEventHandler(rowIndex: number, blockIndex: number): void {
        let {matrix, moves, run, timerInterval, time} = this.state;
        let current = matrix[rowIndex][blockIndex];
        let buffer = this.state.buffer;

        if (this.isBlockCanMove(matrix, rowIndex, blockIndex)) {
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
            matrix[rowIndex][blockIndex] = 0;
            buffer = {x: blockIndex, y: rowIndex};
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

    isBlockCanMove(matrix: number[][], y: number, x: number): boolean {
        return this.isBlockCanMoveUp(matrix, y, x)
            || this.isBlockCanMoveDown(matrix, y, x)
            || this.isBlockCanMoveLeft(matrix, y, x)
            || this.isBlockCanMoveRight(matrix, y, x);
    }

    isBlockCanMoveUp(matrix: number[][], y: number, x: number): boolean {
        return !this.isBlockOnUpEdge(y) && this.isBlockEmpty(matrix, y - 1, x);
    }

    isBlockCanMoveDown(matrix: number[][], y: number, x: number): boolean {
        return !this.isBlockOnDownEdge(y) && this.isBlockEmpty(matrix, y + 1, x);
    }

    isBlockCanMoveLeft(matrix: number[][], y: number, x: number): boolean {
        return !this.isBlockOnLeftEdge(x) && this.isBlockEmpty(matrix, y, x - 1);
    }

    isBlockCanMoveRight(matrix: number[][], y: number, x: number): boolean {
        return !this.isBlockOnRightEdge(x) && this.isBlockEmpty(matrix, y, x + 1);
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

    isBlockEmpty(matrix: number[][], y: number, x: number): boolean {
        return matrix[y][x] === 0;
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

    randomizeMatrix(matrix: number[][], buffer: { x: number, y: number }) {
        for (let move = 0; move < 10000; move++) {
            let rndX = randomInt(2);
            let rndY = randomInt(2);

            if (this.isBlockCanMove(matrix, rndY, rndX)) {
                matrix[buffer.y][buffer.x] = matrix[rndY][rndX];
                matrix[rndY][rndX] = 0;
                buffer.y = rndY;
                buffer.x = rndX;
            }
        }

        return {
            matrix: matrix,
            buffer: buffer,
        };
    }
}

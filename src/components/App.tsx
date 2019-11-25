import * as React from "react";
import {ReactNode} from "react";
import Block from "./Block";
import {State as AppState} from "./App/State";
import randomInt from "random-int";
import {Header} from "./Header";
import {Container} from "./Container";

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: 3,
            availableSizes: [2, 3, 4, 5, 6, 7]
        },
        moves: 0,
        run: false,
        time: 0,
        buffer: {
            x: 0,
            y: 0,
        },
    };
    private readonly windowSize: number;

    constructor(props: {}) {
        super(props);

        this.state.buffer = {
            x: this.state.settings.size - 1,
            y: this.state.settings.size - 1,
        };
        this.state.matrix = App.createDefaultMatrix(this.state.settings.size);
        this.windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
        this.state.relativeSize = this.windowSize / this.state.settings.size;
    }

    render(): ReactNode {
        return <div className={"container-fluid row main"}>
            <Header
                time={this.state.time}
                moves={this.state.moves}
                resetHandler={() => {
                    return this.handleReset(this.state.settings.size);
                }}
            />
            <div className="container-fluid m-2">
                {this.state.settings.availableSizes.map((size: number) => {
                    return <button
                        type={"button"}
                        key={size}
                        className={"btn btn-dark btn-sm col-2"}
                        onClickCapture={() => {
                            this.handleReset(size);
                        }}
                    >
                        {size}
                    </button>
                })}
            </div>
            <Container
                size={this.windowSize}
            >
                {this.state.matrix.map((row: number[], currentRow: number) => {
                    return row.map((block: number, currentColumn: number) => {
                        return <Block
                            key={`${currentRow}-${currentColumn}`}
                            value={block}
                            size={this.state.relativeSize}
                            clickHandler={() => {
                                this.blockEventHandler(currentRow, currentColumn);
                            }}
                            touchHandler={() => {
                                this.blockEventHandler(currentRow, currentColumn);
                            }}
                        />
                    })
                })}
            </Container>
        </div>
    }

    handleReset(size: number): void {
        const {matrix, buffer} = this.randomizeMatrix(
            App.createDefaultMatrix(size),
            {x: size - 1, y: size - 1}
        );

        clearInterval(this.state.timerInterval);
        this.setState({
            matrix: matrix,
            buffer: buffer,
            moves: 0,
            run: false,
            timerInterval: undefined,
            time: 0,
            settings: {
                size: size,
                availableSizes: this.state.settings.availableSizes
            },
            relativeSize: this.windowSize / size,
        });
    }

    blockEventHandler(rowIndex: number, blockIndex: number): void {
        let {matrix, moves, run, timerInterval, time} = this.state;
        let current = matrix[rowIndex][blockIndex];
        let buffer = this.state.buffer;

        if (App.isBlockCanMove(matrix, rowIndex, blockIndex)) {
            const {x, y} = buffer;

            if (!run) {
                timerInterval = setInterval((): void => {
                    if (this.isMatrixSolved()) {
                        clearInterval(timerInterval);
                        timerInterval = undefined;
                        run = false;

                        this.setState({
                            timerInterval: timerInterval,
                            run: run,
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

        for (let i = 0, count = 1; i < size; i++) {
            matrix.push([]);

            for (let j = 0; j < size; j++) {
                if (i + 1 === size && j + 1 === size) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = count++;
                }
            }
        }

        return matrix;
    }

    static isBlockCanMove(matrix: number[][], y: number, x: number): boolean {
        return App.isBlockCanMoveUp(matrix, y, x)
            || App.isBlockCanMoveDown(matrix, y, x)
            || App.isBlockCanMoveLeft(matrix, y, x)
            || App.isBlockCanMoveRight(matrix, y, x);
    }

    static isBlockCanMoveUp(matrix: number[][], y: number, x: number): boolean {
        return !App.isBlockOnUpEdge(y) && App.isBlockEmpty(matrix, y - 1, x);
    }

    static isBlockCanMoveDown(matrix: number[][], y: number, x: number): boolean {
        return !App.isBlockOnDownEdge(y, matrix.length) && App.isBlockEmpty(matrix, y + 1, x);
    }

    static isBlockCanMoveLeft(matrix: number[][], y: number, x: number): boolean {
        return !App.isBlockOnLeftEdge(x) && App.isBlockEmpty(matrix, y, x - 1);
    }

    static isBlockCanMoveRight(matrix: number[][], y: number, x: number): boolean {
        return !App.isBlockOnRightEdge(x, matrix.length) && App.isBlockEmpty(matrix, y, x + 1);
    }

    static isBlockOnUpEdge(y: number): boolean {
        return y === 0;
    }

    static isBlockOnDownEdge(y: number, size: number): boolean {
        return y === size - 1;
    }

    static isBlockOnLeftEdge(x: number): boolean {
        return x === 0;
    }

    static isBlockOnRightEdge(x: number, size: number): boolean {
        return x === size - 1;
    }

    static isBlockEmpty(matrix: number[][], y: number, x: number): boolean {
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
            let rndX = randomInt(matrix.length - 1);
            let rndY = randomInt(matrix.length - 1);

            if (App.isBlockCanMove(matrix, rndY, rndX)) {
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

import * as React from "react";
import {ReactNode} from "react";
import Block from "./Block";
import {AppState} from "../types/AppState";
import randomInt from "random-int";
import {Header} from "./Header";
import {Container} from "./Container";
import {Settings} from "./Settings";
import {Method} from "../types/Method";
import {Color} from "../types/Color";
import Bar from "./Bar";
import {scheme} from '../types/ColorScheme';

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: 3,
            method: Method.DEFAULT,
            availableSizes: [2, 3, 4, 5, 6, 7],
            availableMethods: [
                Method.DEFAULT,
                Method.LAYERED,
                Method.FRIDGE,
            ]
        },
        moves: 0,
        run: false,
        time: 0,
        buffer: {
            x: 0,
            y: 0,
        },
        solved: false,
    };
    private readonly windowSize: number;

    constructor(props: {}) {
        super(props);

        const {matrix, buffer} = this.randomizeMatrix(
            App.createDefaultMatrix(this.state.settings.size, this.state.settings.method),
            {
                x: this.state.settings.size - 1,
                y: this.state.settings.size - 1,
            }
        );
        this.state.buffer = buffer;
        this.state.matrix = matrix;
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
            <Settings
                methods={this.state.settings.availableMethods}
                sizes={this.state.settings.availableSizes}
                resetHandler={this.handleReset.bind(this)}
                changeMethodHandler={(method: Method) => {
                    let {settings, matrix} = this.state;

                    matrix.forEach((row: Bar[]) => {
                        row.forEach((block: Bar) => {
                            block.Color = scheme[method][this.state.settings.size][block.X][block.Y];
                        })
                    });
                    settings.method = method;
                    this.setState({
                        matrix: matrix,
                        settings: settings,
                    })
                }}
            />
            <Container
                size={this.windowSize}
            >
                {this.state.matrix.map((row: Bar[], currentRow: number) => {
                    return row.map((block: Bar, currentColumn: number) => {
                        return <Block
                            key={`${currentRow}-${currentColumn}`}
                            value={block.Value}
                            size={this.state.relativeSize}
                            color={!this.state.solved
                                ? this.state.matrix[currentRow][currentColumn].Color
                                : (block.Value !== 0 ? Color.SUCCESS : block.Color)}
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
            App.createDefaultMatrix(size, this.state.settings.method),
            {x: size - 1, y: size - 1}
        );
        const {settings} = this.state;

        settings.size = size;
        clearInterval(this.state.timerInterval);

        this.setState({
            matrix: matrix,
            buffer: buffer,
            moves: 0,
            run: false,
            timerInterval: undefined,
            time: 0,
            solved: false,
            settings: settings,
            relativeSize: this.windowSize / size,
        });
    }

    blockEventHandler(rowIndex: number, blockIndex: number): void {
        let {matrix, moves, run, timerInterval, time} = this.state;
        let current = matrix[rowIndex][blockIndex];
        let buffer = this.state.buffer;

        if (App.isBlockCanMove(matrix, rowIndex, blockIndex)) {
            const {x, y} = buffer;

            if (!run && !this.state.solved) {
                timerInterval = setInterval((): void => {
                    if (this.isMatrixSolved()) {
                        clearInterval(timerInterval);
                        timerInterval = undefined;
                        run = false;

                        this.setState({
                            timerInterval: timerInterval,
                            run: run,
                            solved: true,
                        })
                    } else {
                        time += 10;

                        this.setState({
                            time: time,
                        })
                    }
                }, 10);
            }

            if (this.state.solved) {
                return;
            }
            let temp = matrix[y][x];
            matrix[y][x] = current;
            matrix[rowIndex][blockIndex] = temp;
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

    static createDefaultMatrix(size: number, method: Method): Bar[][] {
        let matrix: Bar[][] = [];

        for (let i = 0, count = 1; i < size; i++) {
            matrix.push([]);

            for (let j = 0; j < size; j++) {
                if (i + 1 === size && j + 1 === size) {
                    matrix[i][j] = new Bar(Color.LIGHT, 0, size - 1, size - 1);
                } else {
                    matrix[i][j] = new Bar(scheme[method][size][i][j], count++, i, j);
                }
            }
        }

        return matrix;
    }

    static isBlockCanMove(matrix: Bar[][], y: number, x: number): boolean {
        return App.isBlockCanMoveUp(matrix, y, x)
            || App.isBlockCanMoveDown(matrix, y, x)
            || App.isBlockCanMoveLeft(matrix, y, x)
            || App.isBlockCanMoveRight(matrix, y, x);
    }

    static isBlockCanMoveUp(matrix: Bar[][], y: number, x: number): boolean {
        return !App.isBlockOnUpEdge(y) && App.isBlockEmpty(matrix, y - 1, x);
    }

    static isBlockCanMoveDown(matrix: Bar[][], y: number, x: number): boolean {
        return !App.isBlockOnDownEdge(y, matrix.length) && App.isBlockEmpty(matrix, y + 1, x);
    }

    static isBlockCanMoveLeft(matrix: Bar[][], y: number, x: number): boolean {
        return !App.isBlockOnLeftEdge(x) && App.isBlockEmpty(matrix, y, x - 1);
    }

    static isBlockCanMoveRight(matrix: Bar[][], y: number, x: number): boolean {
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

    static isBlockEmpty(matrix: Bar[][], y: number, x: number): boolean {
        return matrix[y][x].Value === 0;
    }

    isMatrixSolved(): boolean {
        for (let row = 0, counterValue = 0; row < this.state.matrix.length; row++) {
            for (let col = 0; col < this.state.matrix[row].length; col++) {
                ++counterValue;

                if (this.state.matrix[row][col].Value === 0) {
                    continue;
                }
                if (this.state.matrix[row][col].Value !== counterValue) {
                    return false;
                }
            }
        }

        return true;
    }

    randomizeMatrix(matrix: Bar[][], buffer: { x: number, y: number }) {
        for (let move = 0; move < 50000; move++) {
            let rndX = randomInt(matrix.length - 1);
            let rndY = randomInt(matrix.length - 1);

            if (App.isBlockCanMove(matrix, rndY, rndX)) {
                let temp = matrix[buffer.y][buffer.x];
                matrix[buffer.y][buffer.x] = matrix[rndY][rndX];
                matrix[rndY][rndX] = temp;
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

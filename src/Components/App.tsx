import * as React from "react";
import {AppState} from "../Types/AppState";
import randomInt from "random-int";
import {Header} from "./Header";
import {Settings} from "./Settings";
import {Method} from "../Types/Method";
import {Color} from "../Types/Color";
import Bar from "./Bar";
import {scheme as BlockColorScheme} from '../Types/Block/ColorScheme';
import {Size} from '../Types/Block/Size';
import StatCountsService from "./Service/StatCountsService";
import {Theme} from "../Types/Theme";
import {Context as ThemeContext} from "../Types/Theme/Context";
import {GameContext} from "../Types/GameContext";
import {ThemeStorage} from "./Service/ThemeStorage";
import {Container} from "./Container";
import {Timer} from "./Header/Timer";
import {scheme as ThemeColorScheme} from "../Types/Theme/ColorScheme";

export default class App extends React.Component<{}, AppState> {
    public readonly state: AppState = {
        matrix: [],
        settings: {
            size: Size.X4,
            method: Method.DEFAULT,
            availableSizes: [Size.X2, Size.X3, Size.X4, Size.X5, Size.X6, Size.X7],
            availableMethods: [
                Method.DEFAULT,
                Method.LAYERED,
                Method.FRIDGE,
            ],
            availableThemes: [Theme.LIGHT, Theme.DARK],
            modalToggle: false,
        },
        moves: 0,
        run: false,
        startTime: 0,
        buffer: {
            x: 0,
            y: 0,
        },
        solved: false,
        theme: Theme.LIGHT,
    };
    private readonly windowSize: number;

    constructor(props: {}) {
        super(props);

        const theme = ThemeStorage.get();
        const {matrix, buffer} = this.randomizeMatrix(
            App.createDefaultMatrix(this.state.settings.size, this.state.settings.method, theme),
            {
                x: this.state.settings.size - 1,
                y: this.state.settings.size - 1,
            }
        );

        this.state.theme = theme;
        this.state.buffer = buffer;
        this.state.matrix = matrix;
        this.windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
        this.state.relativeSize = this.windowSize / this.state.settings.size;
    }

    render(): React.ReactElement {
        return <ThemeContext.Provider value={ThemeColorScheme[this.state.theme]}>
            <GameContext.Provider value={{run: this.state.run, solved: this.state.solved}}>
                <div className="main h-100" style={{
                    backgroundColor: ThemeColorScheme[this.state.theme].main.background
                }}>
                    <Header
                        sizes={this.state.settings.availableSizes}
                        resetHandler={() => {
                            return this.handleReset(this.state.settings.size);
                        }}
                        openSettingsHandler={() => {
                            const {settings} = this.state;
                            settings.modalToggle = !settings.modalToggle;

                            this.setState({
                                settings: settings,
                            })
                        }}
                    />
                    <Settings
                        currentTheme={this.state.theme}
                        toggle={this.state.settings.modalToggle}
                        methods={this.state.settings.availableMethods}
                        sizes={this.state.settings.availableSizes}
                        themes={this.state.settings.availableThemes}
                        resetHandler={this.handleReset.bind(this)}
                        toggleHandler={() => {
                            const {settings} = this.state;
                            settings.modalToggle = !settings.modalToggle;
                            this.setState({settings: settings});
                        }}
                        changeTheme={(theme: Theme): void => {
                            this.setState({theme: theme});
                            ThemeStorage.set(theme);
                        }}
                        changeMethodHandler={(method: Method): void => {
                            let {settings, matrix} = this.state;

                            matrix.forEach((row: Bar[]): void => {
                                row.forEach((block: Bar): void => {
                                    block.Color = BlockColorScheme[this.state.theme][method][this.state.settings.size][block.X][block.Y];
                                })
                            });
                            settings.method = method;
                            this.setState({
                                matrix: matrix,
                                settings: settings,
                            })
                        }}
                    />
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-around">
                            <Timer moves={this.state.moves} startTime={this.state.startTime}/>
                        </div>
                    </div>
                    <Container
                        matrix={this.state.matrix}
                        style={{height: `${this.windowSize}`}}
                        size={this.state.settings.size}
                        relativeSize={this.state.relativeSize}
                        clickHandler={this.blockEventHandler.bind(this)}
                        touchHandler={this.blockEventHandler.bind(this)}
                    />
                </div>
            </GameContext.Provider>
        </ThemeContext.Provider>
    }

    handleReset(size: number): void {
        const {matrix, buffer} = this.randomizeMatrix(
            App.createDefaultMatrix(size, this.state.settings.method, this.state.theme),
            {x: size - 1, y: size - 1}
        );
        const {settings} = this.state;

        settings.size = size;

        this.setState({
            matrix: matrix,
            buffer: buffer,
            moves: 0,
            run: false,
            startTime: 0,
            solved: false,
            settings: settings,
            relativeSize: this.windowSize / size,
        });
    }

    blockEventHandler(rowIndex: number, blockIndex: number): void {
        let {matrix, moves, run} = this.state;
        let buffer = this.state.buffer;

        if (App.isBlockCanMove(matrix, rowIndex, blockIndex)) {
            const {x, y} = buffer;

            if (this.state.solved) {
                return;
            }

            if (rowIndex === y) {
                if (blockIndex > x) {
                    for (let elementX = x + 1; elementX <= blockIndex; elementX++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
                        matrix[rowIndex][elementX] = temp;
                        buffer.x++;
                        moves++;
                    }
                } else if (blockIndex < x) {
                    for (let elementX = x - 1; elementX >= blockIndex; elementX--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
                        matrix[rowIndex][elementX] = temp;
                        buffer.x--;
                        moves++;
                    }
                }
            } else if (blockIndex === x) {
                if (rowIndex > y) {
                    for (let elementY = y + 1; elementY <= rowIndex; elementY++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y++;
                        moves++;
                    }
                } else if (rowIndex < y) {
                    for (let elementY = y - 1; elementY >= rowIndex; elementY--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y--;
                        moves++;
                    }
                }
            }

            if (!run && !this.state.solved) {
                this.setState({
                    startTime: Date.now(),
                });
            }

            if (this.isMatrixSolved()) {
                this.setState({
                    run: false,
                    solved: true,
                    moves: moves,
                });
                StatCountsService.increment(this.state.settings.size);

                return;
            }

            run = true;
        }

        this.setState({
            matrix: matrix,
            buffer: buffer,
            moves: moves,
            run: run,
        });
    }

    static createDefaultMatrix(size: number, method: Method, theme: Theme): Bar[][] {
        let matrix: Bar[][] = [];

        for (let i = 0, count = 1; i < size; i++) {
            matrix.push([]);

            for (let j = 0; j < size; j++) {
                matrix[i][j] = new Bar(BlockColorScheme[theme][method][size][i][j], count, i, j);

                if (count === (size * size) - 1) {
                    count = 0;
                } else {
                    count++
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
        for (let yTarget = y; yTarget > 0; yTarget--) {
            if (App.isBlockEmpty(matrix, yTarget - 1, x)) {
                return !App.isBlockOnUpEdge(y)
            }
        }

        return false;
    }

    static isBlockCanMoveDown(matrix: Bar[][], y: number, x: number): boolean {
        for (let yTarget = y; yTarget < matrix.length - 1; yTarget++) {
            if (App.isBlockEmpty(matrix, yTarget + 1, x)) {
                return !App.isBlockOnDownEdge(y, matrix.length)
            }
        }

        return false;
    }

    static isBlockCanMoveLeft(matrix: Bar[][], y: number, x: number): boolean {
        for (let xTarget = x; xTarget > 0; xTarget--) {
            if (App.isBlockEmpty(matrix, y, xTarget - 1)) {
                return !App.isBlockOnLeftEdge(x)
            }
        }

        return false;
    }

    static isBlockCanMoveRight(matrix: Bar[][], y: number, x: number): boolean {
        for (let xTarget = x; xTarget < matrix.length - 1; xTarget++) {
            if (App.isBlockEmpty(matrix, y, xTarget + 1)) {
                return !App.isBlockOnRightEdge(x, matrix.length)
            }
        }

        return false;
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
                if (rndY === buffer.y) {
                    if (rndX > buffer.x) {
                        for (let elementX = buffer.x + 1; elementX <= rndX; elementX++) {
                            let temp = matrix[buffer.y][buffer.x];
                            matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
                            matrix[rndY][elementX] = temp;
                            buffer.x++;
                        }
                    } else if (rndX < buffer.x) {
                        for (let elementX = buffer.x - 1; elementX >= rndX; elementX--) {
                            let temp = matrix[buffer.y][buffer.x];
                            matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
                            matrix[rndY][elementX] = temp;
                            buffer.x--;
                        }
                    }
                } else if (rndX === buffer.x) {
                    if (rndY > buffer.y) {
                        for (let elementY = buffer.y + 1; elementY <= rndY; elementY++) {
                            let temp = matrix[buffer.y][buffer.x];
                            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                            matrix[elementY][buffer.x] = temp;
                            buffer.y++;
                        }
                    } else if (rndY < buffer.y) {
                        for (let elementY = buffer.y - 1; elementY >= rndY; elementY--) {
                            let temp = matrix[buffer.y][buffer.x];
                            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                            matrix[elementY][buffer.x] = temp;
                            buffer.y--;
                        }
                    }
                }
            }
        }

        return {
            matrix: matrix,
            buffer: buffer,
        };
    }
}

import * as React from "react";

import Bar from "./Bar";
import {Container} from "./Container";
import Header from "./Header";
import Settings from "./Settings";
import * as Service from "./Service";
import {Timer} from "./Header/Timer";
import Sizes from "./Settings/Sizes";

import * as Helper from "Helpers";
import isBlockCanMove from "Helpers/isBlockCanMove";

import {Method} from "Types/Method";
import {scheme as BlockColorScheme} from 'Types/Block/ColorScheme';
import {Size} from 'Types/Block/Size';
import {Theme} from "Types/Theme";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {scheme as ThemeColorScheme} from "Types/Theme/ColorScheme";
import isMatrixSolved from "Helpers/isMatrixSolved";

export default function App() {
    const availableSizes: Size[] = (Object.values(Size) as Size[]).filter(s => typeof s === 'number');
    const availableMethods: Method[] = Object.values(Method);
    const availableThemes: Theme[] = Object.values(Theme);
    const windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;

    const [matrix, setMatrix] = React.useState([]) as [Bar[][], React.Dispatch<React.SetStateAction<Bar[][]>>];
    const [size, setSize] = React.useState(Size.X4);
    const [method, setMethod] = React.useState(Method.DEFAULT);
    const [collapseModal, modalToggle] = React.useState(true);
    const [pinnedSizesToTop, pinSizeToTopToggle] = React.useState(false);
    const [moves, setMoves] = React.useState(0);
    const [run, setRun] = React.useState(false);
    const [startTime, setStartTime] = React.useState(0);
    const [buffer, setBuffer] = React.useState({x: 0, y: 0});
    const [solved, setSolved] = React.useState(false);
    const [theme, setTheme] = React.useState(Service.ThemeStorage.getThemeFromStorage());
    const [relativeSize, setRelativeSize] = React.useState(windowSize / size);

    React.useEffect(() => {
        const {matrix, buffer} = Helper.randomizeMatrix(
            Helper.createDefaultMatrix(size, method, theme),
            {
                x: size - 1,
                y: size - 1,
            }
        );

        setMatrix(matrix);
        setBuffer(buffer);
    }, []);

    const handleReset = (size: number, additionalTheme?: Theme) => {
        const {matrix, buffer} = Helper.randomizeMatrix(
            Helper.createDefaultMatrix(size, method, additionalTheme || theme),
            {x: size - 1, y: size - 1}
        );

        setMatrix(matrix);
        setBuffer(buffer);
        setMoves(0);
        setRun(false);
        setStartTime(0);
        setSolved(false);
        setSize(size);
        setRelativeSize(windowSize / size);
    };

    const blockEventHandler = (rowIndex: number, blockIndex: number) => {
        if (isBlockCanMove(matrix, rowIndex, blockIndex)) {
            const {x, y} = buffer;

            if (solved) {
                return;
            }

            if (rowIndex === y) {
                if (blockIndex > x) {
                    for (let elementX = x + 1; elementX <= blockIndex; elementX++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
                        matrix[rowIndex][elementX] = temp;
                        buffer.x++;
                        setMoves(moves + 1);
                    }
                } else if (blockIndex < x) {
                    for (let elementX = x - 1; elementX >= blockIndex; elementX--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
                        matrix[rowIndex][elementX] = temp;
                        buffer.x--;
                        setMoves(moves + 1);
                    }
                }
            } else if (blockIndex === x) {
                if (rowIndex > y) {
                    for (let elementY = y + 1; elementY <= rowIndex; elementY++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y++;
                        setMoves(moves + 1);
                    }
                } else if (rowIndex < y) {
                    for (let elementY = y - 1; elementY >= rowIndex; elementY--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y--;
                        setMoves(moves + 1);
                    }
                }
            }

            !run && !solved && setStartTime(Date.now());

            if (isMatrixSolved(matrix)) {
                setRun(false);
                setSolved(true);
                setMoves(moves);
                Service.StatCountsStorage.incrementStat(size, Service.StatCountsStorage.SOLVED_COUNTS_KEY);

                return;
            }

            setRun(true);
        }
    };

    return <ThemeContext.Provider value={ThemeColorScheme[theme]}>
        <GameContext.Provider value={{run: run, solved: solved, size: size}}>
            <div className="main h-100" style={{backgroundColor: ThemeColorScheme[theme].main.background}}>
                <Header
                    sizes={availableSizes}
                    resetHandler={() => handleReset(size)}
                    openSettingsHandler={() => modalToggle(!collapseModal)}
                />
                <Settings
                    currentThemeType={theme}
                    toggle={collapseModal}
                    methods={availableMethods}
                    sizes={availableSizes}
                    themes={availableThemes}
                    resetHandler={size => handleReset(size)}
                    toggleHandler={() => modalToggle(!collapseModal)}
                    changeTheme={theme => {
                        setTheme(theme);
                        handleReset(size, theme);
                        Service.ThemeStorage.saveThemeToStorage(theme);
                    }}
                    changeMethodHandler={method => {
                        matrix.forEach(row => {
                            row.forEach(block => {
                                block.Color = BlockColorScheme[theme][method][size][block.X][block.Y]
                            });
                        });
                        setMethod(method);
                        setMatrix(matrix);
                    }}
                    pinSizes={pinnedSizesToTop}
                    pinSizeToTop={() => pinSizeToTopToggle(!pinnedSizesToTop)}
                />
                {pinnedSizesToTop
                    ? <div className="container-fluid">
                        <Sizes
                            sizes={availableSizes}
                            size={size}
                            changeSize={size => {
                                setSize(size);
                                handleReset(size);
                            }}
                        />
                    </div>
                    : <></>}
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-around">
                        <Timer moves={moves} startTime={startTime} run={run}/>
                    </div>
                </div>
                <Container
                    matrix={matrix}
                    style={{height: windowSize.toString(10)}}
                    size={size}
                    relativeSize={relativeSize}
                    touchHandler={(rowIndex, columnIndex) =>  blockEventHandler(rowIndex, columnIndex)}
                    clickHandler={(rowIndex, columnIndex) => blockEventHandler(rowIndex, columnIndex)}
                />
            </div>
        </GameContext.Provider>
    </ThemeContext.Provider>
}

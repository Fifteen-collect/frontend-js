import * as React from "react";
import Bar from "./Bar";
import Container from "./Container";
import Header from "./Header";
import Settings from "./Settings";
import * as Service from "./Service";
import Timer from "Components/Timer";
import Sizes from "./Settings/Sizes";
import * as Helper from "Helpers";
import isMatrixSolved from "Helpers/isMatrixSolved";
import isBlockCanMove from "Helpers/isBlockCanMove";
import {Method} from "Types/Method";
import {scheme as BlockColorScheme} from 'Types/Block/ColorScheme';
import {Size} from 'Types/Block/Size';
import {Theme} from "Types/Theme";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {scheme as ThemeColorScheme} from "Types/Theme/IColorScheme";

export default () => {
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
  const [clicks, setClicks] = React.useState(0);
  const [run, setRun] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [buffer, setBuffer] = React.useState({x: 0, y: 0});
  const [solved, setSolved] = React.useState(false);
  const [theme, setTheme] = React.useState(Service.ThemeStorage.getThemeFromStorage());
  const [relativeSize, setRelativeSize] = React.useState(windowSize / size);

  React.useEffect(() => {
    const {matrix: randomMatrix, buffer: randomBuffer} = Helper.randomizeMatrix(
      Helper.createDefaultMatrix(size, method, theme),
      {
        x: size - 1,
        y: size - 1,
      }
    );

    setMatrix(randomMatrix);
    setBuffer(randomBuffer);
  }, []);

  const handleReset = (nextSize: number, additionalTheme?: Theme) => {
    const {matrix: randomMatrix, buffer: randomBuffer} = Helper.randomizeMatrix(
      Helper.createDefaultMatrix(size, method, additionalTheme || theme),
      {x: size - 1, y: size - 1}
    );

    setMatrix(randomMatrix);
    setBuffer(randomBuffer);
    setMoves(0);
    setRun(false);
    setStartTime(0);
    setSolved(false);
    setClicks(0);
    setRelativeSize(windowSize / nextSize);
    setSize(nextSize);
  };

  const blockEventHandler = (rowIndex: number, blockIndex: number) => {
    if (isBlockCanMove(matrix, rowIndex, blockIndex)) {
      const {x, y} = buffer;

      if (solved) {
        return;
      }

      let movedBlocks = moves;

      if (rowIndex === y) {
        if (blockIndex > x) {
          for (let elementX = x + 1; elementX <= blockIndex; elementX++) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
            matrix[rowIndex][elementX] = temp;
            buffer.x++;
            movedBlocks++;
            setClicks(clicks + 1);
          }
        } else if (blockIndex < x) {
          for (let elementX = x - 1; elementX >= blockIndex; elementX--) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[rowIndex][elementX];
            matrix[rowIndex][elementX] = temp;
            buffer.x--;
            movedBlocks++;
            setClicks(clicks + 1);
          }
        }
      } else if (blockIndex === x) {
        if (rowIndex > y) {
          for (let elementY = y + 1; elementY <= rowIndex; elementY++) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
            matrix[elementY][buffer.x] = temp;
            buffer.y++;
            movedBlocks++;
            setClicks(clicks + 1);
          }
        } else if (rowIndex < y) {
          for (let elementY = y - 1; elementY >= rowIndex; elementY--) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
            matrix[elementY][buffer.x] = temp;
            buffer.y--;
            movedBlocks++;
            setClicks(clicks + 1);
          }
        }
      }

      if (!run && !solved) {
        setStartTime(Date.now())
      }

      setMoves(movedBlocks);

      if (isMatrixSolved(matrix)) {
        setRun(false);
        setSolved(true);
        Service.StatCountsStorage.incrementStat(size, Service.StatCountsStorage.SOLVED_COUNTS_KEY);

        return;
      }

      setRun(true);
    }
  };

  return <ThemeContext.Provider value={ThemeColorScheme[theme]}>
    <GameContext.Provider value={{run, solved, size}}>
      <div className="main h-100" style={{backgroundColor: ThemeColorScheme[theme].main.background}}>
        <Header
          sizes={availableSizes}
          resetHandler={() => handleReset(size)}
          openSettingsHandler={() => modalToggle(!collapseModal)}
        />
        <Settings
          currentSize={size}
          currentThemeType={theme}
          toggle={collapseModal}
          methods={availableMethods}
          sizes={availableSizes}
          themes={availableThemes}
          resetHandler={handledSize => handleReset(handledSize)}
          toggleHandler={() => modalToggle(!collapseModal)}
          changeTheme={handledTheme => {
            setTheme(handledTheme);
            handleReset(size, handledTheme);
            Service.ThemeStorage.saveThemeToStorage(handledTheme);
          }}
          changeMethodHandler={handledMethod => {
            matrix.forEach(row => {
              row.forEach(block => {
                block.Color = BlockColorScheme[theme][handledMethod][size][block.X][block.Y]
              });
            });
            setMethod(handledMethod);
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
              changeSize={handledSize => {
                setSize(handledSize);
                handleReset(handledSize);
              }}
            />
          </div>
          : <></>}
        <div className="container">
          <div className="row d-flex align-items-center justify-content-around">
            <Timer moves={moves} clicks={clicks} startTime={startTime}/>
          </div>
        </div>
        <Container
          matrix={matrix}
          buffer={buffer}
          style={{height: windowSize.toString(10)}}
          relativeSize={relativeSize}
          moveHandler={(rowIndex: number, columnIndex: number) => blockEventHandler(rowIndex, columnIndex)}
        />
      </div>
    </GameContext.Provider>
  </ThemeContext.Provider>
}

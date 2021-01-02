import * as React from "react";
import * as Component from "Components";
import * as Storage from "Storage";
import * as Helpers from "Helpers";
import * as Types from "Types";
import {Route, Switch} from "react-router-dom";
import * as ApplicationNavbar from "Components/Navbar";

export default () => {
  const availableSizes = (Object.values(Types.Block.Size) as Types.Block.Size[]).filter(s => typeof s === 'number');
  const availableMethods: Types.Method[] = Object.values(Types.Method);
  const availableThemes: Types.Theme[] = Object.values(Types.Theme);
  const windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
  const [matrix, setMatrix] = React.useState([] as Component.Bar[][]);
  const [size, setSize] = React.useState(Types.Block.Size.X4);
  const [method, setMethod] = React.useState(Types.Method.DEFAULT);
  const [pinnedSizesToTop, pinSizeToTopToggle] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [clicks, setClicks] = React.useState(0);
  const [run, setRun] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [buffer, setBuffer] = React.useState({x: 0, y: 0});
  const [solved, setSolved] = React.useState(false);
  const [theme, setTheme] = React.useState(Storage.Themes.getThemeFromStorage());
  const [relativeSize, setRelativeSize] = React.useState(windowSize / size);

  React.useEffect(() => {
    const {matrix: randomMatrix, buffer: randomBuffer} = Helpers.matrixHelper.randomizeMatrix(
      Helpers.matrixHelper.createDefaultMatrix(size, method, theme),
      {
        x: size - 1,
        y: size - 1,
      }
    );

    setMatrix(randomMatrix);
    setBuffer(randomBuffer);
  }, []);

  const handleReset = (nextSize: number, additionalTheme?: Types.Theme) => {
    const {matrix: randomizedMatrix, buffer: randomizedBuffer} = Helpers.matrixHelper.randomizeMatrix(
      Helpers.matrixHelper.createDefaultMatrix(nextSize, method, additionalTheme || theme),
      {x: nextSize - 1, y: nextSize - 1}
    );

    setMatrix(randomizedMatrix);
    setBuffer(randomizedBuffer);
    setMoves(0);
    setRun(false);
    setStartTime(0);
    setSolved(false);
    setClicks(0);
    setRelativeSize(windowSize / nextSize);
    setSize(nextSize);
  };

  const blockEventHandler = (rowIndex: number, blockIndex: number) => {
    if (Helpers.matrixHelper.isBlockCanMove(matrix, rowIndex, blockIndex)) {
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

      if (Helpers.matrixHelper.isMatrixSolved(matrix)) {
        setRun(false);
        setSolved(true);
        Storage.StatCounts.incrementStat(size, Storage.StatCounts.SOLVED_COUNTS_KEY);

        return;
      }

      setRun(true);
    }
  };

  return <Types.AppTheme.Context.Provider value={Types.AppTheme.AppScheme[theme]}>
    <Types.GameContext.Provider value={{run, solved, size}}>
      <div className="main h-100 d-flex flex-column justify-content-between"
           style={{backgroundColor: Types.AppTheme.AppScheme[theme].main.background}}>
        <ApplicationNavbar.Top resetHandler={() => handleReset(size)}/>
        <Switch>
          <Route path={"/settings"}>
            <Component.SettingsScreen
              currentSize={size}
              currentThemeType={theme}
              methods={availableMethods}
              sizes={availableSizes}
              themes={availableThemes}
              resetHandler={handledSize => handleReset(handledSize)}
              changeTheme={handledTheme => {
                setTheme(handledTheme);
                handleReset(size, handledTheme);
                Storage.Themes.saveThemeToStorage(handledTheme);
              }}
              changeMethodHandler={handledMethod => {
                matrix.forEach(row => {
                  row.forEach(block => {
                    block.Color = Types.ColorScheme[theme][handledMethod][size][block.X][block.Y]
                  });
                });
                setMethod(handledMethod);
                setMatrix(matrix);
              }}
              pinSizes={pinnedSizesToTop}
              pinSizeToTop={() => pinSizeToTopToggle(!pinnedSizesToTop)}
            />
          </Route>
          <Route path={"/statistic"}>
            <Component.Stats sizes={availableSizes}/>
          </Route>
          <Route path={"/"}>
            <div className="d-flex justify-content-between mb-auto mt-auto flex-column">
              <div className="container">
                <div className="row d-flex align-items-center justify-content-around">
                  <Component.Game.Timer moves={moves} clicks={clicks} startTime={startTime}/>
                </div>
              </div>
              <Component.Game.Container
                moveHandler={blockEventHandler}
                buffer={buffer}
                matrix={matrix}
                relativeSize={relativeSize}
                style={{height: windowSize.toString(10)}}
              />
            </div>
          </Route>
        </Switch>
        <ApplicationNavbar.Bottom/>
      </div>
    </Types.GameContext.Provider>
  </Types.AppTheme.Context.Provider>
}

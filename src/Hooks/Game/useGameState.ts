import React, {useState} from "react";
import * as Types from "Types";
import {Method, Theme} from "Types";
import Block from "Components/Game/Block";
import {Size} from "Types/Block";
import * as Storage from "Storage";
import * as Helpers from "Helpers";

export interface IGame {
  run: boolean,
  setRun: React.Dispatch<boolean>,
  solved: boolean,
  setSolved: React.Dispatch<boolean>,
  size: Size,
  setSize: React.Dispatch<Size>,
  matrix: Block[][],
  setMatrix: React.Dispatch<Block[][]>,
  theme: Theme,
  setTheme: React.Dispatch<Theme>,
  buffer: { x: number, y: number },
  setBuffer: React.Dispatch<{ x: number, y: number }>,
  method: Method,
  setMethod: React.Dispatch<Method>,
  moves: number,
  setMoves: React.Dispatch<number>,
  clicks: number,
  setClicks: React.Dispatch<number>,
  startTime: number,
  setStartTime: React.Dispatch<number>,
  reset: (nextSize: number, additionalTheme?: Types.Theme) => void,
  moveBlock: (rowIndex: number, blockIndex: number) => void
}

export default (): IGame => {
  const [run, setRun] = useState(false);
  const [solved, setSolved] = useState(false);
  const [size, setSize] = useState(Size.X4);
  const [theme, setTheme] = useState(Storage.Themes.getThemeFromStorage());
  const [method, setMethod] = useState(Method.DEFAULT);
  const [moves, setMoves] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [matrix, setMatrix] = useState([] as Block[][]);
  const [buffer, setBuffer] = useState({x: 0, y: 0});
  const [startTime, setStartTime] = useState(0);
  const reset = (nextSize: number, additionalTheme?: Types.Theme): void => {
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
    setSize(nextSize);
  };

  const moveBlock = (rowIndex: number, blockIndex: number): void => {
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

  return {
    buffer,
    matrix,
    run,
    setRun,
    solved,
    setSolved,
    size,
    setSize,
    setMatrix,
    setBuffer,
    setMethod,
    setTheme,
    theme,
    method,
    moves,
    setMoves,
    clicks,
    setClicks,
    startTime,
    setStartTime,
    reset,
    moveBlock,
  }
}

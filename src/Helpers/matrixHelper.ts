import Bar from "Components/Bar";
import * as Types from "Types";
import randomInt from "Helpers/randomInt";

const createDefaultMatrix = (size: number, method: Types.Method, theme: Types.Theme): Bar[][] => {
  const matrix: Bar[][] = [];

  for (let i = 0, count = 1; i < size; i++) {
    matrix.push([]);

    for (let j = 0; j < size; j++) {
      matrix[i][j] = new Bar(Types.ColorScheme[theme][method][size][i][j], count, i, j);

      count = (count === (size * size) - 1)
        ? 0
        : count + 1;
    }
  }

  return matrix;
}

const isBlockCanMove = (
  matrix: Bar[][],
  y: number,
  x: number
): boolean => isBlockCanMoveUp(matrix, y, x)
  || isBlockCanMoveDown(matrix, y, x)
  || isBlockCanMoveLeft(matrix, y, x)
  || isBlockCanMoveRight(matrix, y, x);

const isBlockCanMoveDown = (matrix: Bar[][], y: number, x: number): boolean => {
  for (let yTarget = y; yTarget < matrix.length - 1; yTarget++) {
    if (isBlockEmpty(matrix, yTarget + 1, x)) {
      return !isBlockOnDownEdge(y, matrix.length);
    }
  }

  return false;
}

const isBlockCanMoveLeft = (matrix: Bar[][], y: number, x: number): boolean => {
  for (let xTarget = x; xTarget > 0; xTarget--) {
    if (isBlockEmpty(matrix, y, xTarget - 1)) {
      return !isBlockOnLeftEdge(x);
    }
  }

  return false;
}

const isBlockCanMoveRight = (matrix: Bar[][], y: number, x: number): boolean => {
  for (let xTarget = x; xTarget < matrix.length - 1; xTarget++) {
    if (isBlockEmpty(matrix, y, xTarget + 1)) {
      return !isBlockOnRightEdge(x, matrix.length);
    }
  }

  return false;
}

const isBlockCanMoveUp = (matrix: Bar[][], y: number, x: number): boolean => {
  for (let yTarget = y; yTarget > 0; yTarget--) {
    if (isBlockEmpty(matrix, yTarget - 1, x)) {
      return !isBlockOnUpEdge(y);
    }
  }

  return false;
}

const isBlockEmpty = (matrix: Bar[][], y: number, x: number): boolean => matrix[y][x].Value === 0;

const isBlockOnDownEdge = (y: number, size: number): boolean => y === size - 1;

const isBlockOnLeftEdge = (x: number): boolean => x === 0;

const isBlockOnRightEdge = (x: number, size: number): boolean => x === size - 1;

const isBlockOnUpEdge = (y: number): boolean => y === 0;

const isMatrixSolved = (matrix: Bar[][]): boolean => {
  let counterValue = 0;

  for (const row of matrix) {
    for (const col of row) {
      ++counterValue;

      if (col.Value === 0) {
        continue;
      }

      if (col.Value !== counterValue) {
        return false;
      }
    }
  }

  return true;
}


interface IBuffer {
  x: number,
  y: number
}

const randomizeMatrix = (
  matrix: Bar[][],
  buffer: IBuffer,
  moves: number = 50000
): { buffer: IBuffer, matrix: Bar[][] } => {
  for (let move = 0; move < moves; move++) {
    const rndX = randomInt(matrix.length - 1);
    const rndY = randomInt(matrix.length - 1);

    if (isBlockCanMove(matrix, rndY, rndX)) {
      if (rndY === buffer.y) {
        if (rndX > buffer.x) {
          for (let elementX = buffer.x + 1; elementX <= rndX; elementX++) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
            matrix[rndY][elementX] = temp;
            buffer.x++;
          }
        } else if (rndX < buffer.x) {
          for (let elementX = buffer.x - 1; elementX >= rndX; elementX--) {
            const temp = matrix[buffer.y][buffer.x];
            matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
            matrix[rndY][elementX] = temp;
            buffer.x--;
          }
        }
      } else if (rndX === buffer.x) {
        if (rndY > buffer.y) {
          for (let elementY = buffer.y + 1; elementY <= rndY; elementY++) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
            matrix[elementY][buffer.x] = temp;
            buffer.y++;
          }
        } else if (rndY < buffer.y) {
          for (let elementY = buffer.y - 1; elementY >= rndY; elementY--) {
            const temp = matrix[buffer.y][buffer.x];

            matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
            matrix[elementY][buffer.x] = temp;
            buffer.y--;
          }
        }
      }
    }
  }

  return isMatrixSolved(matrix)
    ? randomizeMatrix(matrix, buffer, moves)
    : {
      buffer,
      matrix,
    };
}

export {
  createDefaultMatrix,
  isBlockCanMove,
  isBlockCanMoveDown,
  isBlockCanMoveLeft,
  isBlockCanMoveRight,
  isBlockCanMoveUp,
  isBlockEmpty,
  isBlockOnDownEdge,
  isBlockOnLeftEdge,
  isBlockOnRightEdge,
  isBlockOnUpEdge,
  randomizeMatrix,
  isMatrixSolved,
  IBuffer
}

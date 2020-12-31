import Bar from "Components/Bar";
import isBlockCanMoveUp from "Helpers/isBlockCanMoveUp";
import isBlockCanMoveDown from "Helpers/isBlockCanMoveDown";
import isBlockCanMoveLeft from "Helpers/isBlockCanMoveLeft";
import isBlockCanMoveRight from "Helpers/isBlockCanMoveRight";

export default (
  matrix: Bar[][],
  y: number,
  x: number
) => isBlockCanMoveUp(matrix, y, x)
  || isBlockCanMoveDown(matrix, y, x)
  || isBlockCanMoveLeft(matrix, y, x)
  || isBlockCanMoveRight(matrix, y, x);

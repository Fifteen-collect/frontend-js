import Bar from "Components/Bar";
import isBlockEmpty from "Helpers/isBlockEmpty";
import isBlockOnRightEdge from "Helpers/isBlockOnRightEdge";

export default (matrix: Bar[][], y: number, x: number) => {
  for (let xTarget = x; xTarget < matrix.length - 1; xTarget++) {
    if (isBlockEmpty(matrix, y, xTarget + 1)) {
      return !isBlockOnRightEdge(x, matrix.length);
    }
  }

  return false;
}

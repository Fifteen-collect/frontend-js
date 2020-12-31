import Bar from "Components/Bar";
import isBlockEmpty from "Helpers/isBlockEmpty";
import isBlockOnDownEdge from "Helpers/isBlockOnDownEdge";

export default (matrix: Bar[][], y: number, x: number) => {
  for (let yTarget = y; yTarget < matrix.length - 1; yTarget++) {
    if (isBlockEmpty(matrix, yTarget + 1, x)) {
      return !isBlockOnDownEdge(y, matrix.length);
    }
  }

  return false;
}

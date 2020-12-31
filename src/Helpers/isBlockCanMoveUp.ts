import Bar from "Components/Bar";
import isBlockEmpty from "Helpers/isBlockEmpty";
import isBlockOnUpEdge from "Helpers/isBlockOnUpEdge";

export default (matrix: Bar[][], y: number, x: number) => {
  for (let yTarget = y; yTarget > 0; yTarget--) {
    if (isBlockEmpty(matrix, yTarget - 1, x)) {
      return !isBlockOnUpEdge(y);
    }
  }

  return false;
}

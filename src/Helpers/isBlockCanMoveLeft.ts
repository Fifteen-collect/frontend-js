import Bar from "Components/Bar";
import isBlockEmpty from "Helpers/isBlockEmpty";
import isBlockOnLeftEdge from "Helpers/isBlockOnLeftEdge";

export default (matrix: Bar[][], y: number, x: number) => {
    for (let xTarget = x; xTarget > 0; xTarget--) {
        if (isBlockEmpty(matrix, y, xTarget - 1)) {
            return !isBlockOnLeftEdge(x);
        }
    }

    return false;
}

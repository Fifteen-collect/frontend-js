import Bar from "Components/Bar";

export default (matrix: Bar[][]) => {
    for (let row = 0, counterValue = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            ++counterValue;

            if (matrix[row][col].Value === 0) {
                continue;
            }
            if (matrix[row][col].Value !== counterValue) {
                return false;
            }
        }
    }

    return true;
};

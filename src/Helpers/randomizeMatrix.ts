import Bar from "Components/Bar";
import randomInt from "Helpers/randomInt";
import isBlockCanMove from "Helpers/isBlockCanMove";
import isMatrixSolved from "Helpers/isMatrixSolved";

export interface Buffer {
    x: number,
    y: number
}

export default function randomizeMatrix(
    matrix: Bar[][],
    buffer: Buffer
): { matrix: Bar[][], buffer: Buffer } {
    for (let move = 0; move < 50000; move++) {
        let rndX = randomInt(matrix.length - 1);
        let rndY = randomInt(matrix.length - 1);

        if (isBlockCanMove(matrix, rndY, rndX)) {
            if (rndY === buffer.y) {
                if (rndX > buffer.x) {
                    for (let elementX = buffer.x + 1; elementX <= rndX; elementX++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
                        matrix[rndY][elementX] = temp;
                        buffer.x++;
                    }
                } else if (rndX < buffer.x) {
                    for (let elementX = buffer.x - 1; elementX >= rndX; elementX--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[rndY][elementX];
                        matrix[rndY][elementX] = temp;
                        buffer.x--;
                    }
                }
            } else if (rndX === buffer.x) {
                if (rndY > buffer.y) {
                    for (let elementY = buffer.y + 1; elementY <= rndY; elementY++) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y++;
                    }
                } else if (rndY < buffer.y) {
                    for (let elementY = buffer.y - 1; elementY >= rndY; elementY--) {
                        let temp = matrix[buffer.y][buffer.x];
                        matrix[buffer.y][buffer.x] = matrix[elementY][buffer.x];
                        matrix[elementY][buffer.x] = temp;
                        buffer.y--;
                    }
                }
            }
        }
    }

    return isMatrixSolved(matrix)
        ? randomizeMatrix(matrix, buffer)
        : {
            matrix: matrix,
            buffer: buffer,
        };
}

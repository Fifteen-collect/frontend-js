import {Method} from "Types/Method";
import {Theme} from "Types/Theme";
import Bar from "Components/Bar";
import {scheme as BlockColorScheme} from "Types/Block/ColorScheme";

export default function createDefaultMatrix(size: number, method: Method, theme: Theme): Bar[][] {
  const matrix: Bar[][] = [];

  for (let i = 0, count = 1; i < size; i++) {
    matrix.push([]);

    for (let j = 0; j < size; j++) {
      matrix[i][j] = new Bar(BlockColorScheme[theme][method][size][i][j], count, i, j);

      count = (count === (size * size) - 1)
        ? 0
        : count + 1;
    }
  }

  return matrix;
}

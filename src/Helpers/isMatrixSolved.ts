import Bar from "Components/Bar";

export default (matrix: Bar[][]) => {
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

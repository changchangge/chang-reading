/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const arr = new Array(m + 1)
    .fill(undefined)
    .map((e) => new Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        arr[i + 1][j + 1] = 0;
      } else {
        arr[i + 1][j + 1] = arr[i][j + 1] + arr[i + 1][j];
        if (i === 0 && j === 0) {
          arr[i + 1][j + 1] = 1;
        }
      }
    }
  }
  return arr[m][n];
};

uniquePathsWithObstacles(obstacleGrid);

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const maxNumber = Number.MAX_SAFE_INTEGER;
  if (triangle.length === 1) {
    return triangle[0][0];
  }
  const a = new Array(triangle.length)
    .fill(undefined)
    .map((item) => new Array());
  a[0][0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      a[i][j] =
        Math.min(
          a[i - 1][j] === undefined ? maxNumber : a[i - 1][j],
          a[i - 1][j - 1] === undefined ? maxNumber : a[i - 1][j - 1]
        ) + triangle[i][j];
    }
  }
  return Math.min(...a[a.length - 1]);
};

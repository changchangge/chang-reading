var secondHighest = function (s) {
  const resultSet = new Set(
    s
      .split('')
      .filter((e) => !Number.isNaN(Number(e)))
      .sort((a, b) => Number(a) - Number(b))
  );
  const arr = [...resultSet];
  return arr.length === 0 || arr.length === 1 ? -1 : arr[arr.length - 2];
};

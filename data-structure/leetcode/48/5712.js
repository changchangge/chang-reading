var getMaximumConsecutive = function (coins) {
  if (coins.length === 0) {
    return 0;
  }
  const arr = coins.sort((a, b) => a - b);
  if (arr[0] !== 1) {
    return 1;
  }
  let lst = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= lst + 1) {
      lst = lst + coins[i];
    }
  }
  return lst + 1;
};

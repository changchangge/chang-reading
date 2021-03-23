function test(nums) {
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
}

var maxScore = function (nums) {
  const n = nums.length;
  const cnt = [0];
  for (let i = 1; i < 1 << n; i++) {
    cnt[i] = cnt[i >> 1] + (i & 1);
  }
  console.log(cnt)
};

maxScore([1,2,3])

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var subsets = function (nums) {
//   const ans = [];
//   const n = nums.length;
//   for (let mask = 0; mask < 1 << n; ++mask) {
//     const t = [];
//     for (let i = 0; i < n; ++i) {
//       if (mask & (1 << i)) {
//         t.push(nums[i]);
//       }
//     }
//     ans.push(t);
//   }
//   return ans;
// };

var subsets = function (nums) {
  const result = [];
  const n = nums.length;
  for (let i = 0; i < 1 << n; i++) {
    const t = [];
    for (let k = 0; k < n; k++) {
      if (i & (1 << k)) {
        t.push(nums[k]);
      }
    }
    result.push(t);
  }
  return result;
};

console.log(subsets([1, 2, 3]));

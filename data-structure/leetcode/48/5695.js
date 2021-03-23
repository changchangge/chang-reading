// class Solution {
//   int cnt[50005], f[50005];
//   int gcd(int x, int y){
//       return y == 0 ? x: gcd(y, x % y);
//   }
// public:
//   int maxScore(vector<int>& nums) {
//       int n = nums.size();
//       cnt[0] = 0;
//       for (int i = 1; i < (1 << n); ++i) cnt[i] = cnt[i >> 1] + (i & 1);
//       f[0] = 0;
//       for (int i = 1; i < (1 << n); ++i){
//           if (cnt[i] & 1) continue;
//           int cur = cnt[i];
//           for (int j = 0; j < n; ++j){
//               if ((1 << j) & i){
//                   for (int k = j + 1; k < n; ++k){
//                       if ((1 << k) & i){
//                           int tg = i - (1 << j) - (1 << k);
//                           f[i] = max(f[i], (cur >> 1) * gcd(nums[j], nums[k]) + f[tg]);
//                       }
//                   }
//               }
//           }
//       }
//       return f[(1 << n) - 1];
//   }
// };

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

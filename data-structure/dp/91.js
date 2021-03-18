/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const passwards = {
    "1": 'A',
    "2": 'B',
    "3": 'C',
    "4": 'D',
    "5": 'E',
    "6": 'F',
    "7": 'G',
    "8": 'H',
    "9": 'I',
    "10": 'J',
    "11": 'K',
    "12": 'L',
    "13": 'M',
    "14": 'N',
    "15": 'O',
    "16": 'P',
    "17": 'Q',
    "18": 'R',
    "19": 'S',
    "20": 'T',
    "21": 'U',
    "22": 'V',
    "23": 'W',
    "24": 'X',
    "25": 'Y',
    "26": 'Z',
  };
  if (!s || s[0] === '0') {
    return 0;
  }
  const dp = [1];
  for (let i = 1; i < s.length; i++) {
      if (s[i] === '0') {
        if (!passwards[s[i - 1] + s[i]]) {
          return 0;
        } else {
          s[i-1]==='0'?dp[i] = dp[i-1]:dp[i] = dp[i - 2] || 1;
        }
      } else {
        if (!passwards[s[i - 1] + s[i]]) {
          dp[i] = dp[i - 1];
        } else {
          dp[i] = (dp[i - 2] || 1) + dp[i - 1];
        }
      }
    }
  return dp[s.length - 1];
};


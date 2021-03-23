/**
 * @param {number} timeToLive
 */
 var AuthenticationManager = function (timeToLive) {
  this.timeToLive = timeToLive;
  this.tokenObj = {};
};

/**
 * @param {string} tokenId
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function (tokenId, currentTime) {
  this.tokenObj[tokenId] = currentTime + this.timeToLive;
};

/**
 * @param {string} tokenId
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function (tokenId, currentTime) {
  if (this.tokenObj[tokenId] === undefined) {
    return;
  }
  if (this.tokenObj[tokenId] <= currentTime) {
    return;
  }
  this.tokenObj[tokenId] = currentTime + this.timeToLive;
};

/**
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function (currentTime) {
  return Object.values(this.tokenObj).filter((e) => e > currentTime).length;
};

/**
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */
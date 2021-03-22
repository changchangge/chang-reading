/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 *
 *
 * @param {number[]} arr
 * @return {TreeNode} result[0]
 */

function createNormalTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  const result = [new TreeNode(arr[0])];
  let temp;
  for (let i = 1; i < arr.length; i++) {
    if(arr[i] === null){
      continue;
    }
    temp = new TreeNode(arr[i]);
    if (i % 2 === 0) {
      result[i / 2 - 1].right = temp;
    } else {
      result[(i - 1) / 2].left = temp;
    }
    result.push(temp);
  }
  return result[0];
}

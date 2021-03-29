/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const result = [];
  function find(Node) {
    if (Node === null) {
      return;
    }
    find(Node.left);
    result.push(Node.val);
    find(Node.right);
  }
  find(root);
  return result.every((ele, index, arr) => {
    if (arr.length === index + 1) {
      return true;
    } else {
      return arr[index + 1] > ele;
    }
  });
};

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
 * @return {number[]}
 */

var inorderTraversal = function (root) {
  const result = [];
  function findNode(Node) {
    if (!Node) {
      return;
    }
    findNode(Node.left);
    result.push(Node.val);
    findNode(Node.right);
  }
  findNode(root, result);
  return result;
};
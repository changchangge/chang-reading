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
var postorderTraversal = function (root) {
  const result=[];
  function findNode(Node){
    if(Node === null){
      return;
    }
    findNode(Node.left);
    findNode(Node.right);
    result.push(Node.val);
  }
  findNode(root);
  return result;
};

var postorderTraversal = function (root) {
  if (root === null) {
    return [];
  }
  const result = [];
  const stack = [root];
  while (stack.length !== 0) {
    const Node = stack.pop();
    result.push(Node.val);
    if (Node.left !== null) {
      stack.push(Node.left);
    }
    if (Node.right !== null) {
      stack.push(Node.right);
    }
  }
  return result.reverse();
};

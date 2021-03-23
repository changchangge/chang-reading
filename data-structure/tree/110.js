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

// 自底向上
var isBalanced = function (root) {
  const height = (root) => {
    if (root === null) {
      return 0;
    }
    const leftHeight = height(root.left);
    if (leftHeight === -1) {
      return -1;
    }
    const rightHeight = height(root.right);
    if (rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    } else {
      return Math.max(leftHeight, rightHeight) + 1;
    }
  };
  return height(root) >= 0;
};

// 自顶向下
var isBalanced = function (root) {
  const height = (root) => {
    if (root === null) {
      return 0;
    }
    return Math.max(height(root.left), height(root.right)) + 1;
  };
  const tree = (root) => {
    if (root === null) {
      return true;
    }
    return (
      Math.abs(height(root.left) - height(root.right)) <= 1 &&
      tree(root.left) &&
      tree(root.right)
    );
  };
  return tree(root);
};

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
var isSymmetric = function (root) {
  if (root === null) {
    return true;
  }
  if (root.left === null || root.right === null) {
    return root.left === root.right;
  }
  const isSame = (p, q) => {
    if (p === null || q === null) {
      return p === q;
    }
    if (p.val === q.val) {
      return isSame(p.left, q.right) && isSame(p.right, q.left);
    } else {
      return false;
    }
  };
  return isSame(root.left, root.right);
};

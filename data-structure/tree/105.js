/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

 function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var buildTree = function (preorder, inorder) {
  let pre_idx = 0;
  const idx_map = new Map();
  inorder.forEach((val, idx) => {
    idx_map.set(val, idx);
  });

  const helper = (int_left, int_right) => {
    if (int_left > int_right) {
      return null;
    }
    // 选择pre-idx 位置的元素作为当前子树根结点
    const root_val = preorder[pre_idx];
    const root = new TreeNode(root_val);
    const index = idx_map.get(root_val);

    pre_idx++;
    root.left = helper(int_left, index - 1);
    root.right = helper(index + 1, int_right);

    return root;
  };

  return helper(pre_idx, preorder.length - 1);
};

// 根据一棵树的前序遍历与中序遍历构造二叉树。

// 注意:
// 你可以假设树中没有重复的元素。

// 例如，给出

// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

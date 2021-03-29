/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  const recursionTreeFn = (root, inorder, postorder) => {
    const postorderEle = postorder.pop();
    if (postorderEle === undefined) {
      return null;
    }
    const inorderIndex = inorder.findIndex((item) => item === postorderEle);
    const inorderLeft = inorder.slice(0, inorderIndex);
    const inorderRight = inorder.slice(inorderIndex + 1);
    const postorderLeft = postorder.filter((item) =>
      inorderLeft.includes(item)
    );
    const postorderRight = postorder.filter((item) =>
      inorderRight.includes(item)
    );

    const newNode = root || new TreeNode(postorderEle);

    if (inorderLeft.length === 1 && inorderRight.length === 1) {
      newNode.left = new TreeNode(inorderLeft[0]);
      newNode.right = new TreeNode(inorderRight[0]);
      return newNode;
    }
    if (inorderLeft.length === 1 && inorderRight.length !== 1) {
      newNode.left = new TreeNode(inorderLeft[0]);
      newNode.right = recursionTreeFn(newNode.right, inorderRight, postorderRight);
      return newNode;
    }
    if (inorderLeft.length !== 1 && inorderRight.length === 1) {
      newNode.right = new TreeNode(inorderRight[0]);
      newNode.left = recursionTreeFn(newNode.left, inorderLeft, postorderLeft);
      return newNode;
    }
    if (inorderLeft.length !== 1 && inorderRight.length !== 1) {
      newNode.right = recursionTreeFn(
        newNode.right,
        inorderRight,
        postorderRight
      );
      newNode.left = recursionTreeFn(newNode.left, inorderLeft, postorderLeft);
      return newNode;
    }
    return newNode;
  };

  return recursionTreeFn(undefined, inorder, postorder);
};

// var buildTree = function(inorder, postorder) {
//   let post_idx = postorder.length - 1;
//   const idx_map = new Map();
//   inorder.forEach((val, idx) => {
//       idx_map.set(val, idx);
//   });
//   const helper = (in_left, in_right) => {
//       // 如果这里没有节点构造二叉树了，就结束
//       if (in_left > in_right) {
//           return null;
//       }
//       // 选择 post_idx 位置的元素作为当前子树根节点
//       const root_val = postorder[post_idx];
//       const root = new TreeNode(root_val);
//       // 根据 root 所在位置分成左右两棵子树
//       const index = idx_map.get(root_val);

//       // 下标减一
//       post_idx--;
//       // 构造右子树
//       root.right = helper(index + 1, in_right);
//       // 构造左子树
//       root.left = helper(in_left, index - 1);
//       return root;
//   }

//   return helper(0, inorder.length - 1);
// };
// 内部迭代器

const each = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback.bind(arr[i], i, arr[i]);
  }
};

// 外部迭代器
const Iterator = (obj) => {
  let current = 0;
  const next = () => current++;
  const isDone = () => current >= obj.length;
  const getCurrItem = () => obj[current];
  return {
    next,
    isDone,
    getCurrItem,
  };
};

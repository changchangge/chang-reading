const synchronousFile = (id) => console.log('开始同步文件，id为：' + id);

const proxySynchronousFile = () => {
  let cache = [],
    timer;
  return (id) => {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      synchronousFile(cache.join(','));
      clearTimeout(timer);
      timer = null;
      cache = null;
    }, 2000);
  };
};

const checkbox = document.getElementsByTagName('input');

for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].onclick = () => {
    if (this.checked === true) {
      proxySynchronousFile(this.id);
    }
  };
}

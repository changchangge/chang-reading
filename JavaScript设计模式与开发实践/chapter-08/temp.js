const Event = (() => {
  const global = this,
    _default = 'default';
  const Event = (() => {
      let namespaceCache = {},
      _create,
      find;
    const _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      each = (arr, fn) => {
        let ret;
        for (let i = 0; i < arr.length; i++) {
          ret = fn.call(arr[i], i, arr[i]);
        }
        return ret;
      };

    const _listen = (key, fn, cache) => {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };

    const _remove = (key, cache, fn) => {
      if (cache[key]) {
        if (fn) {
          for (let i = 0; i < cache[key].length; i++) {
            if (fn === cache[key][i]) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };

    // const _trigger = 

  })();
  return Event;
})();

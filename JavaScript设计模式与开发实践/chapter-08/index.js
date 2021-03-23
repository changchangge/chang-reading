const event = {
  clientList: [],
  listen: (key, fn) => {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: () => {
    const key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  },
  remove: (key, fn) => {
    const fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      delete this.clientList[key];
    } else {
      for (let i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1);
        }
      }
    }
  },
};

// const installEvent = (obj) => {
//   for (let i in event) {
//     obj[i] = event[i];
//   }
// }



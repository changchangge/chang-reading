// 策略模式+业务表单校验结果
const strategies = {
  isNonEmpty: (value, errorMsg) => {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: (value, length, errorMsg) => {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: (value, errorMsg) => {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errorMsg;
    }
  },
};

var validataFunc = function () {
  var validator = new Validator();
  validator.add(registerForm.userName, [
    { strategy: 'isNonEmpty', errorMsg: '用户名不能为空' },
    { strategy: 'minLength:6', errorMsg: '用户名长度不能小于 10 位' },
  ]);
  validator.add(registerForm.password, [
    { strategy: 'minLength:6', errorMsg: '密码长度不能小于 6 位' },
  ]);
  validator.add(registerForm.phoneNumber, [
    { strategy: 'isMobile', errorMsg: '手机号码格式不正确' },
  ]);
  var errorMsg = validator.start();
  return errorMsg;
};

class Validator {
  constructor() {
    this.cache = [];
  }
  add(dom, rules) {
    const self = this;
    for(let i = 0;i<rules.length;i++){
      const strategyAry = rule[i].strategy.split(':');
      const errorMsg = rules[i].errorMsg;
      self.cache.push(
        () => {
          const strategy = strategyAry.shift();
          strategyAry.unshift(dom.value);
          strategyAry.push(errorMsg);
          return strategies[ strategy ].apply( dom, strategyAry );
        }
      )
    }
  }
  start() {
    for (let i = 0; i < this.cache.length; i++) {
      const msg = this.cache[i]();
      if (msg) {
        return msg;
      }
    }
  }
}

const registerForm = document.getElementById('registerForm');

registerForm.onsubmit = () => {
  const errorMsg = validataFunc();
  return errorMsg ? { errorMsg, status: false } : { status: true };
};

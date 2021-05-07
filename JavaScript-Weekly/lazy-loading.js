// when you need to calculate some properties

function testFunction(num) {
  let result = num;
  let i = 10000;
  while (i >= 0) {
    result += i;
    i--;
  }
  return result;
}

// bad example
class MyClass {
  constructor() {
    this.data = testFunction(0);
  }
}

// lazy-loading class
class MyClass {
  constructor() {
    Object.defineProperty(this, 'data', {
      get() {
        const actualData = testFunction(0);
        Object.defineProperty(this, 'data', {
          value: actualData,
          writable: false,
          configurable: false,
        });
        return actualData;
      },
      configurable: true,
      enumerable: true,
    });
  }
}

// lazy-loading object

const myObject = {
  get data() {
    const actualData = testFunction(0);

    Object.defineProperty(this, 'data', {
      value: actualData,
      writable: false,
      configurable: false,
      enumerable: false,
    });

    return actualData;
  },
};


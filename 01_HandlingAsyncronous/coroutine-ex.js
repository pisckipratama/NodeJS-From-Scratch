const co = require('co');
const Promise = require('bluebird');

const isNumber = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isNaN(a) || isNaN(b)) {
      let err = 'One of input is not a number';
      reject(err);
    } else {
      resolve(true)
    }
  }, 500);
})

const divide = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (b === 0) {
      let err = 'Divide by zero';
      return reject(err);
    }

    const result = Number(a) / Number(b);
    resolve(result)
  }, 1500);
})

const multiply = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = Number(a) * Number(b);
    resolve(result)
  }, 1000);
})

const add = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = Number(a) + Number(b);
    resolve(result)
  }, 500);
})

const a = 6;
const b = 3;

// implementation using Promise.coroutine
const coroutine = Promise.coroutine(function* run(a, b) {
  yield isNumber(a, b);
  const divideResult = yield divide(a, b)
  const multiplyResult = yield multiply(divideResult, 7);
  const addResult = yield add(multiplyResult, 1);

  return `Using coroutine > Final result is ${addResult}`;
})

coroutine(a, b)
  .then((result) => {
    console.log(result)
  }).catch((err) => {
    console.error(err);
  });

// implementation using co
co(function* run() {
    const a = 6;
    const b = 3;

    yield isNumber(a, b);
    const divideResult = yield divide(a, b);
    const multiplyResult = yield multiply(divideResult, 7);
    const addResult = yield add(multiplyResult, 1);

    return addResult;
  })
  .then(result => console.log(`Using co > Final result is ${result}`))
  .catch(err => console.error(err));
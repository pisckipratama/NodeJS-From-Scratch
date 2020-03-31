const isNumber = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let err;
    if (isNaN(a) || isNaN(b)) {
      err = 'One of input is not a number';
      reject(err);
    } else {
      resolve(true)
    }
  }, 500);
});

const divide = (a, b) => new Promise((resolve, reject) => {
  let err;
  setTimeout(() => {
    if (b === 0) {
      err = 'Divide by zero';
      return reject(err);
    }

    const result = Number(a) / Number(b);
    resolve(result);
  }, 1500);
});

const multiply = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = Number(a) * Number(b);
    resolve(result)
  }, 1000);
})

const add = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = Number(a) + Number(b);
    resolve(result);
  }, 500);
});

// promise started here..
isNumber(6, 3)
  .then(() => {
    return divide(6, 3)
      .then(result => {
        return multiply(result, 7);
      })
      .then(result => add(result, 1))
      .then(result => console.log(`Final result is ${result}`))
  }).catch((err) => {
    console.error(err);
  });
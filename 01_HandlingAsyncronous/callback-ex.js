function asyncDivision(dividend, divisor, cb) {
  setTimeout(() => {
    let err;

    if (isNaN(dividend) || isNaN(divisor)) {
      err = 'One of dividend or divisor is not a number'
      cb(err, null);
    }

    if (divisor === 0) {
      err = 'Divide by zero'
      cb(err, null)
    }

    const quotient = Number(dividend) / Number(divisor);
    cb(null, quotient);
  }, 2000);
}

asyncDivision(0, 's', (err, result) => {
  if (err) throw new Error(err);

  console.log(result);
})

console.log('This should run before the asyncDivision returns its result.')

console.log(isNaN('s'));
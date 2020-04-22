const encode = BigInt;
const decode = n => n;

// Any sufficiently complicated function that loops contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion
export const log2 = (n) => {
  let result = 0n;

  while (true) {
    // degenerate condition
    if (n === 1n) break;

    // termination conditions
    if (n % 2n === 1n) return;
    if (n < 1n) return;

    //divide and conquer
    ++result;
    n = n / 2n;
  }

  return result;
}

export const pow = (base, exponent) => {
  if (exponent < 0n) return;

  let result = 1n;

  while (exponent-- > 0n) result = result * base;

  return result;
}

export const arithmetic = {
  encode,
  decode,
  divide:(a, b) => a / b,
  multiply: (a, b) => a * b,
  log2,
  pow
};

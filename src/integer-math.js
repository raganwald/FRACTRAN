export const encode = n => BigInt(n);
export const decode = n => n;

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

export const multiply = (a, b) => a * b;
export const divide = (a, b) => (a % b === 0n) ? a / b : undefined;
export const prev = n => n - 1n;

export default {
  encode,
  decode,
  divide,
  multiply,
  log2,
  pow,
  prev
};

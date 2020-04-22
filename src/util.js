export const argument = () => {
  if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
    return parseInt(process.argv[2], 10);
  }
};

// Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion
export const exponentOfTwo = (n) => {
  const [ZERO, ONE, TWO] = typeof n === 'bigint' ? [0n, 1n, 2n] : [0, 1, 2];

  let result = ZERO;

  while (true) {
    // degenerate condition
    if (n === ONE) break;

    // termination conditions
    if (n % TWO === ONE) return;
    if (n < ONE) return;

    //divide and conquer
    ++result;
    n = n / TWO;
  }

  return result;
}

export const pow = (base, exponent) => {
  const [ZERO, ONE] = typeof base === 'bigint' ? [0n, 1n] : [0, 1];

  if (exponent < ZERO) return;

  let result = ONE;

  while (exponent-- > ZERO) result = result * base;

  return result;
}

export const cases = transformers => (n) => {
  for (const transformer of transformers) {
    const nextN = transformer(n);

    if (nextN !== undefined) return nextN;
  }
};
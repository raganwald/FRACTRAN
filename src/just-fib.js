// Any sufficiently complicated function that loops, contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of
// half of Linear Recursion
const log2 = (n) => {
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

const angloFormat = n =>
  [...`${n}`].reduceRight(
    (acc, d, up, o) => {
      const down = o.length - up;
      return (down > 1 && down % 3 === 1) ? [d, ','].concat(acc) : [d].concat(acc);
    },
    []
  ).join('');

const pow = (base, exponent) => {
  if (exponent < 0n) return;

  let result = 1n;

  while (exponent-- > 0n) result = result * base;

  return result;
}

const fib = (x) => {
  const program = (
    '17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23, 74/341,' +
    ' 31/37, 41/31, 129/287, 41/43, 13/41, 1/13, 1/3'
  ).split(', ').map(f => f.split('/').map(n => BigInt(n)));

  let n = 78n * pow(5n, BigInt(x) - 1n);

  program_start: while (true) {
    for (const [numerator, denominator] of program) {
      if (n % denominator === 0n) {
        n = (n * numerator) / denominator;
        continue program_start;
      }
    }
    break;
  }

  return log2(n);
};

console.log(fib(7).toString());

// BIG-INT PRIMES

import parse from './parse';
import { interpret } from './big-int-interpreter';
import {
  mapWith,
  filterWith,
  take,
} from './generators';

const syntax = `
2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1
`;

const primeSequence = interpret(syntax);

const BIG_ZERO = BigInt(0);
const BIG_ONE = BigInt(1);
const BIG_TWO = BigInt(2);

// Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion
const exponentOfTwo = n => {
  let result = BIG_ZERO;

  while (true) {
    // degenerate condition
    if (n === BIG_ONE) break;

    // termination conditions
    if (n % BIG_TWO === BIG_ONE) return;
    if (n < BIG_ONE) return;

    //divide and conquer
    ++result;
    n = n / BIG_TWO;
  }

  return result;
}

const exponentsOfTwo = mapWith(exponentOfTwo, primeSequence);
const compactExponentsOfTwo = filterWith(n => n !== undefined, exponentsOfTwo);
const somePrimes = take(20, compactExponentsOfTwo);

for (const prime of somePrimes) console.log(prime);
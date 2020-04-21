// BIG-INT PRIMES

import { interpret } from './big-int-interpreter';
import {
  mapWith,
  compact,
  take,
} from './generators';
import {
  digitsOf,
  argument,
} from './util';

const syntax = `
  2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19,
       1/17, 11/13, 13/11, 15/14, 15/2, 55/1
`;

const primeSequence = interpret(syntax);

// Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion
const exponentOfTwo = n => {
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

let exponentsOfTwo = compact(mapWith(exponentOfTwo, primeSequence));

const numberOfPrimes = argument();
if (numberOfPrimes !== undefined) exponentsOfTwo = take(numberOfPrimes, exponentsOfTwo);

for (const prime of exponentsOfTwo) console.log(digitsOf(prime));

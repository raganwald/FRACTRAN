// NAIVE PRIMES
//
// Uses JavaScript's native integer arithmetic. Silently breaks when trying to use numbers larger
// than Number.Max_SAFE_INTEGER, or when the number of iterations exceeds Number.Max_SAFE_INTEGER,
// so we include this as a termination condition.
//
// Experiments reveal that we can obtain at most foru primes before encountering this condition
// using built-in integers, so we only take four. Later, we'll play a little Brubek and Take Five.

import { interpret } from './naive-interpreter';
import {
  mapWith,
  compact,
  take,
} from './generators';
import {
  argument,
} from './util';
import {
  exponentOfTwo,
} from './integer-math';

const syntax = `
2 |> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1
`;

const primeSequence = interpret(syntax);

let exponentsOfTwo = compact(mapWith(exponentOfTwo, primeSequence));

const numberOfPrimes = argument();
if (numberOfPrimes !== undefined) exponentsOfTwo = take(numberOfPrimes, exponentsOfTwo);

for (const prime of exponentsOfTwo) console.log(prime);
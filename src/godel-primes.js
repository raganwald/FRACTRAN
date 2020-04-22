// GÖDEL PRIMES

import { interpret } from './godel-interpreter';
import {
  mapWith,
  compact,
  take,
} from './generators';
import { argument } from './util';
import { log2 } from './godel-math';

const syntax = `
  425 |> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19,
       1/17, 11/13, 13/11, 15/14, 15/2, 55/1
`;

const primeSequence = interpret(syntax);

let exponentsOfTwo = compact(mapWith(log2, primeSequence));

const numberOfPrimes = argument();
if (numberOfPrimes !== undefined) exponentsOfTwo = take(numberOfPrimes, exponentsOfTwo);

for (const prime of exponentsOfTwo) console.log(prime.toString());

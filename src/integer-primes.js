// BIG-INT PRIMES

import interpret from './interpreter';
import arithmetic, { log2 } from './integer-math';
import {
  mapWith,
  compact,
  take,
} from './generators';
import {
  argument,
} from './util';

const syntax = `
  2 |> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23,
       77/19,  1/17, 11/13, 13/11, 15/14, 15/2,  55/1
`;

const primeSequence = interpret({ syntax, arithmetic });

let primes = compact(mapWith(log2, primeSequence));

const numberOfPrimes = argument();
if (numberOfPrimes !== undefined) primes = take(numberOfPrimes, primes);

for (const prime of primes) console.log(prime.toString());

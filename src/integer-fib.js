// COMPUTE A SINGLE FIBONACCI NUMBER
//
// https://oeis.org/wiki/List_of_FRACTRAN_programs_to_compute_core_sequences#Fibonacci_numbers

import interpret from './interpreter';
import {
  compact,
  last,
} from './generators';
import {
  argument,
} from './util';
import arithmetic, {
  encode,
  log2,
  pow,
  prev,
  multiply,
} from './integer-math';

const syntax = `
  17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23,
  74/341, 31/37, 41/31, 129/287, 41/43, 13/41, 1/13, 1/3
`;

const n = encode(argument() || (console.log('no value of n supplied, defaulting to 14'), 14));

const seed = multiply(encode(78), pow(5n, prev(n)));

const fibonacciNumber = log2(last(compact(interpret({ syntax, seed, arithmetic }))));

console.log(`fib(${n.toString()}) = ${fibonacciNumber.toString()}`);

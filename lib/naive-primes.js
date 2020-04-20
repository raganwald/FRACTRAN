"use strict";

var _parse = _interopRequireDefault(require("./parse"));

var _naive = require("./naive");

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NAIVE PRIMES
//
// Uses JavaScript's native integer arithmetic. Silently breaks when trying to use numbers larger
// than Number.Max_SAFE_INTEGER, or when the number of iterations exceeds Number.Max_SAFE_INTEGER,
// so we include this as a termination condition.
//
// Experiments reveal that we can obtain at most foru primes before encountering this condition
// using built-in integers, so we only take four. Later, we'll play a little Brubek and Take Five.
const syntax = "\n2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1\n";
const primeSequence = (0, _naive.interpret)(syntax); // Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion

const exponentOfTwo = n => {
  let result = 0;

  while (true) {
    // termination conditions
    if (!Number.isInteger(n)) return;
    if (n < 1) return; // degenerate condition

    if (n === 1) break; //divide and conquer

    ++result;
    n = n / 2;
  }

  return result;
};

const exponentsOfTwo = (0, _generators.mapWith)(exponentOfTwo, primeSequence);
const compactExponentsOfTwo = (0, _generators.filterWith)(n => n !== undefined, exponentsOfTwo);
const somePrimes = (0, _generators.take)(4, compactExponentsOfTwo);

for (const prime of somePrimes) console.log(prime);
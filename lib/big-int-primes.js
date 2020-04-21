"use strict";

var _bigIntInterpreter = require("./big-int-interpreter");

var _generators = require("./generators");

var _util = require("./util");

// BIG-INT PRIMES
const syntax = "\n  2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19,\n       1/17, 11/13, 13/11, 15/14, 15/2, 55/1\n";
const primeSequence = (0, _bigIntInterpreter.interpret)(syntax); // Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion

const exponentOfTwo = n => {
  let result = 0n;

  while (true) {
    // degenerate condition
    if (n === 1n) break; // termination conditions

    if (n % 2n === 1n) return;
    if (n < 1n) return; //divide and conquer

    ++result;
    n = n / 2n;
  }

  return result;
};

let exponentsOfTwo = (0, _generators.compact)((0, _generators.mapWith)(exponentOfTwo, primeSequence));
const numberOfPrimes = (0, _util.argument)();
if (numberOfPrimes !== undefined) exponentsOfTwo = (0, _generators.take)(numberOfPrimes, exponentsOfTwo);

for (const prime of exponentsOfTwo) console.log((0, _util.digitsOf)(prime));
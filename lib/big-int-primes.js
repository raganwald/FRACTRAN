"use strict";

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.split");

var _parse = _interopRequireDefault(require("./parse"));

var _bigIntInterpreter = require("./big-int-interpreter");

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BIG-INT PRIMES
const syntax = "\n2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1\n";
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

const exponentsOfTwo = (0, _generators.mapWith)(exponentOfTwo, primeSequence);
const compactExponentsOfTwo = (0, _generators.filterWith)(n => n !== undefined, exponentsOfTwo);
const somePrimes = (0, _generators.take)(20, compactExponentsOfTwo);

const digitsOf = n => n.toString().split().filter(c => /\d/.exec(c)).join();

for (const prime of somePrimes) console.log(digitsOf(prime));
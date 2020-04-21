"use strict";

var _naiveInterpreter = require("./naive-interpreter");

var _generators = require("./generators");

var _util = require("./util");

// NAIVE PRIMES
//
// Uses JavaScript's native integer arithmetic. Silently breaks when trying to use numbers larger
// than Number.Max_SAFE_INTEGER, or when the number of iterations exceeds Number.Max_SAFE_INTEGER,
// so we include this as a termination condition.
//
// Experiments reveal that we can obtain at most foru primes before encountering this condition
// using built-in integers, so we only take four. Later, we'll play a little Brubek and Take Five.
const syntax = "\n2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1\n";
const primeSequence = (0, _naiveInterpreter.interpret)(syntax);
let exponentsOfTwo = (0, _generators.compact)((0, _generators.mapWith)(_util.exponentOfTwo, primeSequence));
const numberOfPrimes = (0, _util.argument)();
if (numberOfPrimes !== undefined) exponentsOfTwo = (0, _generators.take)(numberOfPrimes, exponentsOfTwo);

for (const prime of exponentsOfTwo) console.log(prime);
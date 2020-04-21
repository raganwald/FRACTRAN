"use strict";

require("core-js/modules/es6.regexp.to-string");

var _bigIntInterpreter = require("./big-int-interpreter");

var _generators = require("./generators");

var _util = require("./util");

// COMPUTE A SINGLE FIBONACCI NUMBER
//
// https://oeis.org/wiki/List_of_FRACTRAN_programs_to_compute_core_sequences#Fibonacci_numbers
const syntax = "\n  17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23,\n  74/341, 31/37, 41/31, 129/287, 41/43, 13/41, 1/13, 1/3\n";
const n = BigInt((0, _util.argument)() || (console.log('no value of n supplied, defaulting to 14'), 14));
const seed = 78n * (0, _util.pow)(5n, n - 1n);
const fibonacciNumber = (0, _util.exponentOfTwo)((0, _generators.last)((0, _generators.compact)((0, _bigIntInterpreter.interpret)(syntax, seed))));
console.log("fib(".concat(n.toString(), ") = ").concat(fibonacciNumber.toString()));
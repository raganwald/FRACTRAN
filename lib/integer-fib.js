"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.to-string");

var _interpreter = _interopRequireDefault(require("./interpreter"));

var _generators = require("./generators");

var _util = require("./util");

var _integerMath = _interopRequireWildcard(require("./integer-math"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// COMPUTE A SINGLE FIBONACCI NUMBER
//
// https://oeis.org/wiki/List_of_FRACTRAN_programs_to_compute_core_sequences#Fibonacci_numbers
const syntax = "\n  17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23,\n  74/341, 31/37, 41/31, 129/287, 41/43, 13/41, 1/13, 1/3\n";
const n = (0, _integerMath.encode)((0, _util.argument)() || (console.log('no value of n supplied, defaulting to 14'), 14));
const seed = (0, _integerMath.multiply)((0, _integerMath.encode)(78), (0, _integerMath.pow)(5n, (0, _integerMath.prev)(n)));
const fibonacciNumber = (0, _integerMath.log2)((0, _generators.last)((0, _generators.compact)((0, _interpreter.default)({
  syntax,
  seed,
  arithmetic: _integerMath.default
}))));
console.log("fib(".concat(n.toString(), ") = ").concat(fibonacciNumber.toString()));
"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.to-string");

var _interpreter = _interopRequireDefault(require("./interpreter"));

var _integerMath = _interopRequireWildcard(require("./integer-math"));

var _generators = require("./generators");

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BIG-INT PRIMES
const syntax = "\n  2 |> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23,\n       77/19,  1/17, 11/13, 13/11, 15/14, 15/2,  55/1\n";
const primeSequence = (0, _interpreter.default)({
  syntax,
  arithmetic: _integerMath.default
});
let primes = (0, _generators.compact)((0, _generators.mapWith)(_integerMath.log2, primeSequence));
const numberOfPrimes = (0, _util.argument)();
if (numberOfPrimes !== undefined) primes = (0, _generators.take)(numberOfPrimes, primes);

for (const prime of primes) console.log(prime.toString());
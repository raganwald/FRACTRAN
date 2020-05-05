"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.prev = exports.divide = exports.multiply = exports.pow = exports.log2 = exports.decode = exports.encode = void 0;

const encode = n => BigInt(n);

exports.encode = encode;

const decode = n => n; // Any sufficiently complicated function that loops, contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of
// half of Linear Recursion


exports.decode = decode;

const log2 = n => {
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

exports.log2 = log2;

const pow = (base, exponent) => {
  if (exponent < 0n) return;
  let result = 1n;

  while (exponent-- > 0n) result = result * base;

  return result;
};

exports.pow = pow;

const multiply = (a, b) => a * b;

exports.multiply = multiply;

const divide = (a, b) => a % b === 0n ? a / b : undefined;

exports.divide = divide;

const prev = n => n - 1n;

exports.prev = prev;
var _default = {
  encode,
  decode,
  divide,
  multiply,
  log2,
  pow,
  prev
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpret = exports.evaluate = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NAIVE INTERPRETER
//
// Uses JavaScript's native integer arithmetic. Silently breaks when trying to use numbers larger
// than Number.Max_SAFE_INTEGER, so we include this as a termination condition.
const transformerOf = (_ref) => {
  let {
    numerator,
    denominator
  } = _ref;
  return n => {
    const nPrime = n * numerator;
    if (nPrime % denominator === 0) return nPrime / denominator;
  };
};

const cases = transformers => n => transformers.map(transformer => transformer(n)).find(n => n !== undefined);

const terminateWhen = n => {
  if (n === undefined) return true;

  if (n > Number.Max_SAFE_INTEGER) {
    console.error("".concat(n, " exceeds JavaScript's maximum safe integer ").concat(Number.Max_SAFE_INTEGER, ". Further computation is unreliable.'"));
    return true;
  }

  return false;
};

const evaluate = (_ref2) => {
  let {
    seed,
    terms
  } = _ref2;
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, seed, terminateWhen);
};

exports.evaluate = evaluate;

const interpret = string => evaluate((0, _parse.default)(string));

exports.interpret = interpret;
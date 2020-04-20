"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpret = exports.evaluate = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const evaluate = (_ref2) => {
  let {
    seed,
    terms
  } = _ref2;
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, seed, n => n !== undefined && n < Number.Max_SAFE_INTEGER);
};

exports.evaluate = evaluate;

const interpret = string => evaluate((0, _parse.default)(string));

exports.interpret = interpret;
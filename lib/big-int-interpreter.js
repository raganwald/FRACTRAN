"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpret = exports.evaluate = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BIG-INT INTERPRETER
const BIG_ZERO = BigInt(0);

const transformerOf = (_ref) => {
  let {
    numerator,
    denominator
  } = _ref;
  const bigIntNumerator = BigInt(numerator);
  const bigIntDenominator = BigInt(denominator);
  return n => {
    const nPrime = n * bigIntNumerator;

    if (nPrime % bigIntDenominator === BIG_ZERO) {
      return nPrime / bigIntDenominator;
    }
  };
};

const cases = transformers => n => transformers.map(transformer => transformer(n)).find(n => n !== undefined);

const evaluate = (_ref2) => {
  let {
    seed,
    terms
  } = _ref2;
  const bigIntSeed = BigInt(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, bigIntSeed);
};

exports.evaluate = evaluate;

const interpret = string => evaluate((0, _parse.default)(string));

exports.interpret = interpret;
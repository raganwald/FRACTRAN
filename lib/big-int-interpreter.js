"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpret = exports.evaluate = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _util = require("./util");

var _generators = require("./generators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BIG-INT INTERPRETER
const transformerOf = (_ref) => {
  let {
    numerator,
    denominator
  } = _ref;
  const bigIntNumerator = BigInt(numerator);
  const bigIntDenominator = BigInt(denominator);
  return n => {
    const nPrime = n * bigIntNumerator;

    if (nPrime % bigIntDenominator === 0n) {
      return nPrime / bigIntDenominator;
    }
  };
};

const evaluate = (_ref2) => {
  let {
    seed,
    terms
  } = _ref2;
  const bigIntSeed = BigInt(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = (0, _util.cases)(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, bigIntSeed);
};

exports.evaluate = evaluate;

const interpret = function interpret(syntax) {
  let _seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  const {
    seed = _seed,
    terms
  } = (0, _parse.default)(syntax);
  return evaluate({
    seed,
    terms
  });
};

exports.interpret = interpret;
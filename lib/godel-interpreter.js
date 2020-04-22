"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpret = exports.evaluate = void 0;

var _parse = _interopRequireDefault(require("./parse"));

var _generators = require("./generators");

var _util = require("./util");

var _godel = require("./godel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GÖDEL-NUMBER INTERPRETER
const transformerOf = (_ref) => {
  let {
    numerator,
    denominator
  } = _ref;
  const gNumerator = (0, _godel.godel)(numerator);
  const gDenominator = (0, _godel.godel)(denominator);
  return n => {
    const newNumerator = (0, _godel.multiply)(n, gNumerator);
    const result = (0, _godel.divide)(newNumerator, gDenominator);
    return result;
  };
};

const evaluate = (_ref2) => {
  let {
    seed,
    terms
  } = _ref2;
  const gSeed = (0, _godel.godel)(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = (0, _util.cases)(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, gSeed);
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
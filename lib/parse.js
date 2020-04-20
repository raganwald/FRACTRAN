"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

const seedAndProgramOf = string => string.trim().split(/\s*->\s*/);

const seedOf = string => parseInt(string, 10);

const fractionsOf = string => string.trim().split(/(?:\s|[,:;])+/);

const termPairOf = term => term.split('/').map(str => parseInt(str, 10));

const termsOf = (_ref) => {
  let [numerator, denominator] = _ref;
  return {
    numerator,
    denominator
  };
};

var _default = syntax => {
  const [seedSyntax, programSyntax] = seedAndProgramOf(syntax);
  const seed = seedOf(seedSyntax);
  const fractions = fractionsOf(programSyntax);
  const termPairs = fractions.map(termPairOf);
  const terms = termPairs.map(termsOf);
  return {
    seed,
    terms
  };
};

exports.default = _default;
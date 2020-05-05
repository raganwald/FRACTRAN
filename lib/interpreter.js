"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

var _generators = require("./generators");

// GÖDEL-NUMBER INTERPRETER
const seedAndProgramOf = string => string.indexOf('|>') >= 0 ? string.trim().split(/\s*\|>\s*/) : [undefined, string.trim()];

const seedOf = string => /\d+/.exec(string) ? parseInt(string, 10) : undefined;

const fractionsOf = string => string.trim().split(/(?:\s|[,:;])+/);

const termPairOf = term => term.split('/').map(str => parseInt(str, 10));

const termsOf = (_ref) => {
  let [numerator, denominator] = _ref;
  return {
    numerator,
    denominator
  };
};

const parse = syntax => {
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

const angloFormat = n => [..."".concat(n)].reduceRight((acc, d, up, o) => {
  const down = o.length - up;
  return down > 1 && down % 3 === 1 ? [d, ','].concat(acc) : [d].concat(acc);
}, []).join('');

let step = 1;
let firstNumerator = undefined;
let firstDenominator = undefined;

const transformerOf = (_ref2) => {
  let {
    encode,
    multiply,
    divide
  } = _ref2;
  return (_ref3) => {
    let {
      numerator: _numerator,
      denominator: _denominator
    } = _ref3;
    const numerator = encode(_numerator);
    const denominator = encode(_denominator);
    return n => {
      const newNumerator = multiply(n, numerator);
      const result = divide(newNumerator, denominator);
      if (result !== undefined) console.log({
        n: angloFormat(n),
        result: angloFormat(result),
        numerator,
        denominator
      }); // if (step++ === 1) {
      //   firstNumerator = numerator;
      //   firstDenominator = denominator;
      // }
      //
      // const preamble =
      //  `The ${numerator === firstNumerator && denominator === firstDenominator ? 'first' : 'next'} fraction in the program is ${angloFormat(numerator)}/${angloFormat(denominator)}`;
      //
      // if (result === undefined) {
      //   console.log(`- ${preamble}. ${angloFormat(n)} leaves a remainder when divided by ${angloFormat(denominator)}, so we move on.`);
      // } else {
      //   console.log(`- ${preamble}. ${angloFormat(n)} multiplied by ${angloFormat(numerator)}/${angloFormat(denominator)} is ${angloFormat(result)}, so we replace ${angloFormat(n)} with ${angloFormat(result)} and begin again.`);
      // }

      return result;
    };
  };
};

const cases = transformers => n => {
  for (const transformer of transformers) {
    const nextN = transformer(n);
    if (nextN !== undefined) return console.log(angloFormat(nextN)), nextN;
  }

  console.log("None of the demoninators in the program divide evenly into ".concat(angloFormat(n), ", so the program halts."));
};

var _default = (_ref4) => {
  let {
    syntax,
    seed: defaultSeed = undefined,
    arithmetic
  } = _ref4;
  const {
    seed: _seed = defaultSeed,
    terms
  } = parse(syntax);
  const seed = arithmetic.encode(_seed);
  const fractionsTransformers = terms.map(transformerOf(arithmetic));
  const programTransformer = cases(fractionsTransformers);
  return (0, _generators.unfoldWith)(programTransformer, seed);
};

exports.default = _default;
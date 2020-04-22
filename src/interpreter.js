// GÖDEL-NUMBER INTERPRETER

import { unfoldWith } from './generators';

const seedAndProgramOf = string => string.indexOf('|>') >= 0 ? string.trim().split(/\s*\|>\s*/) : [undefined, string.trim()];
const seedOf = string => /\d+/.exec(string) ? parseInt(string, 10) : undefined;
const fractionsOf = string => string.trim().split(
  /(?:\s|[,:;])+/
);
const termPairOf = term => term.split('/').map(
  str => parseInt(str, 10)
);
const termsOf = ([numerator, denominator]) => ({ numerator, denominator });

const parse = syntax => {
  const [seedSyntax, programSyntax] = seedAndProgramOf(syntax);
  const seed = seedOf(seedSyntax);
  const fractions = fractionsOf(programSyntax);
  const termPairs = fractions.map(termPairOf);
  const terms = termPairs.map(termsOf);

  return { seed, terms };
};


const transformerOf = ({
    encode, multiply, divide
}) => ({
  numerator: _numerator,
  denominator: _denominator
}) => {
  const numerator = encode(_numerator);
  const denominator = encode(_denominator);

  return (n) => {
    const newNumerator = multiply(n, numerator);
    const result = divide(newNumerator, denominator);

    return result;
  };
};

const cases = transformers => (n) => {
  for (const transformer of transformers) {
    const nextN = transformer(n);

    if (nextN !== undefined) return nextN;
  }
};

export default ({
  syntax,
  seed: defaultSeed = undefined,
  arithmetic,
}) => {
  const { seed: _seed = defaultSeed, terms } = parse(syntax);

  const seed = arithmetic.encode(_seed);
  const fractionsTransformers = terms.map(transformerOf(arithmetic));
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, seed);
};

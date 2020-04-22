// GÖDEL-NUMBER INTERPRETER

import parse from './parse';
import { unfoldWith } from './generators';
import { cases } from './util';

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

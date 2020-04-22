// GÖDEL-NUMBER INTERPRETER

import parse from './parse';
import { unfoldWith } from './generators';
import { cases } from './util';
import {
  encode,
  multiply,
  divide,
} from './godel-math';

const transformerOf = ({ numerator, denominator }) => {
  const gNumerator = encode(numerator);
  const gDenominator = encode(denominator);

  return (n) => {
    const newNumerator = multiply(n, gNumerator);
    const result = divide(newNumerator, gDenominator);

    return result;
  };
};

export const interpret = (syntax, _seed = undefined) => {
  const { seed = _seed, terms } = parse(syntax);

  const gSeed = encode(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, gSeed);
};

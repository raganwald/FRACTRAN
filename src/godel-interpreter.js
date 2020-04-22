// GÖDEL-NUMBER INTERPRETER

import parse from './parse';
import { unfoldWith } from './generators';
import { cases } from './util';
import {
  godel,
  multiply,
  divide,
  asNumber,
} from './godel';

const transformerOf = ({ numerator, denominator }) => {
  const gNumerator = godel(numerator);
  const gDenominator = godel(denominator);

  return (n) => {
    const newNumerator = multiply(n, gNumerator);
    const result = divide(newNumerator, gDenominator);

    return result;
  };
};

export const evaluate = ({ seed, terms }) => {
  const gSeed = godel(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, gSeed);
};

export const interpret = (syntax, _seed = undefined) => {
  const { seed = _seed, terms } = parse(syntax);

  return evaluate({ seed, terms });
};

// BIG-INT INTERPRETER

import parse from './parse';
import { unfoldWith } from './generators';

const transformerOf = ({ numerator, denominator }) => {
  const bigIntNumerator = BigInt(numerator);
  const bigIntDenominator = BigInt(denominator);

  return (n) => {
    const nPrime = (n * bigIntNumerator);

    if (nPrime % bigIntDenominator === 0n) {
      return nPrime / bigIntDenominator;
    }
  }
};

const cases = transformers => n => transformers.map(
  transformer => transformer(n)
).find(n => n !== undefined);

export const evaluate = ({ seed, terms }) => {
  const bigIntSeed = BigInt(seed);
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, bigIntSeed);
};

export const interpret = (syntax, _seed = undefined) => {
  const { seed = _seed, terms } = parse(syntax);

  return evaluate({ seed, terms });
};

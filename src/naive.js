import parse from './parse';
import { unfoldWith } from './generators';

const transformerOf = ({ numerator, denominator }) => (n) => {
  const nPrime = (n * numerator);

  if (nPrime % denominator === 0) return nPrime / denominator;
};

const cases = transformers => n => transformers.map(
  transformer => transformer(n)
).find(n => n !== undefined);

export const evaluate = ({ seed, terms }) => {
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, seed, n => n !== undefined && n < Number.Max_SAFE_INTEGER);
};

export const interpret = string => evaluate(parse(string));
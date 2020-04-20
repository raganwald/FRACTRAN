// NAIVE INTERPRETER
//
// Uses JavaScript's native integer arithmetic. Silently breaks when trying to use numbers larger
// than Number.Max_SAFE_INTEGER, so we include this as a termination condition.

import parse from './parse';
import { unfoldWith } from './generators';

const transformerOf = ({ numerator, denominator }) => (n) => {
  const nPrime = (n * numerator);

  if (nPrime % denominator === 0) return nPrime / denominator;
};

const cases = transformers => n => transformers.map(
  transformer => transformer(n)
).find(n => n !== undefined);

const terminateWhen = (n) => {
  if (n === undefined) return true;
  if (n > Number.Max_SAFE_INTEGER) {
    console.error(`${n} exceeds JavaScript's maximum safe integer ${Number.Max_SAFE_INTEGER}. Further computation is unreliable.'`);
    return true;
  }

  return false;
};

export const evaluate = ({ seed, terms }) => {
  const fractionsTransformers = terms.map(transformerOf);
  const programTransformer = cases(fractionsTransformers);

  return unfoldWith(programTransformer, seed, terminateWhen);
};

export const interpret = string => evaluate(parse(string));
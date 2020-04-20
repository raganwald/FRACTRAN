"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.split");

// Installation:
//
// Prerequisites: A recent-ish installaction of node.
//
// Babel (if you prefer)
// https://babeljs.io/docs/en/usage
//
// npm install --save-dev @babel/core @babel/cli @babel/preset-env
// npm install --save @babel/polyfill
// And then to run a program:
//
// npx babel src --out-dir lib && node ./lib/playground.js
const syntax = "\n2\n17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1\n";

const terms = string => string.trim().split(/(?:\s|[,:;])+/);

const seedOf = (_ref) => {
  let [_] = _ref;
  return parseInt(_, 10);
};

const programOf = (_ref2) => {
  let [, ..._] = _ref2;
  return _;
};

const seed = seedOf(terms(syntax));
const fractionalSyntax = programOf(terms(syntax));
const programAsFractions = fractionalSyntax.map(string => string.split('/').map(_ => parseInt(_, 10)));

const fractionToNaiveTransformer = (_ref3) => {
  let [p, q] = _ref3;
  return n => {
    const nPrime = n * p;
    if (nPrime % q === 0) return nPrime / q;
  };
};

const fractionsAsTransformers = programAsFractions.map(fractionToNaiveTransformer);

const cases = transformers => n => transformers.map(transformer => transformer(n)).find(n => n !== undefined);

const programAsaTransformer = cases(fractionsAsTransformers);

function* unfoldWith(transformer, seed) {
  let terminable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : n => n !== undefined && n < Number.Max_SAFE_INTEGER;
  let state = seed;

  while (true) {
    state = transformer(state);
    yield state;
    if (terminable(state)) break;
  }
}

const primeSequence = unfoldWith(programAsaTransformer, 2);

function split(iterable) {
  const iterator = iterable[Symbol.iterator]();
  const {
    done,
    value: first
  } = iterator.next();

  if (done) {
    return {
      rest: []
    };
  } else {
    return {
      first,
      rest: iterator
    };
  }
}

;

function* join(first, rest) {
  yield first;
  yield* rest;
}

;

function* mapWith(fn, iterable) {
  const asSplit = split(iterable);

  if (asSplit.hasOwnProperty('first')) {
    const {
      first,
      rest
    } = asSplit;
    yield* join(fn(first), mapWith(fn, rest));
  }
}

const exponentOfTwo = n => {
  if (!Number.isInteger(n)) return;
  if (n < 1) return;
  if (n === 1) return 0;
  if (n === 2) return 1;
  const half = exponentOfTwo(n / 2);
  if (!!half) return 1 + half;
};

const exponentsOfTwo = mapWith(exponentOfTwo, primeSequence);

function* filterWith(fn, iterable) {
  const asSplit = split(iterable);

  if (asSplit.hasOwnProperty('first')) {
    const {
      first,
      rest
    } = asSplit;

    if (fn(first)) {
      yield first;
    }

    yield* filterWith(fn, rest);
  }
}

const compactExponentsOfTwo = filterWith(n => n !== undefined, exponentsOfTwo);

function* take(numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const {
      done,
      value
    } = iterator.next();
    if (done) return;else yield value;
  }
}

const fourPrimes = take(4, compactExponentsOfTwo);

for (const prime of fourPrimes) console.log(prime);
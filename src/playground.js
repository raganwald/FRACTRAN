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
import parse from './parse';
import { interpret } from './naive';
import {
  mapWith,
  filterWith,
  take,
} from './generators';

const syntax = `
2 -> 17/91, 78/85, 19/51, 23/38, 29/33, 77/29, 95/23, 77/19, 1/17, 11/13, 13/11, 15/14, 15/2, 55/1
`;

const primeSequence = interpret(syntax);

const exponentOfTwo = n => {
  if (!Number.isInteger(n)) return;
  if (n < 1) return;
  if (n === 1) return 0;
  if (n === 2) return 1;

  const half = exponentOfTwo(n / 2);

  if (!!half) return 1 + half;
}

const exponentsOfTwo = mapWith(exponentOfTwo, primeSequence);
const compactExponentsOfTwo = filterWith(n => n !== undefined, exponentsOfTwo);
const somePrimes = take(4, compactExponentsOfTwo);

for (const prime of somePrimes) console.log(prime);

"use strict";

require("core-js/modules/es6.regexp.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfoldWith = unfoldWith;
exports.split = split;
exports.join = join;
exports.mapWith = mapWith;
exports.filterWith = filterWith;
exports.take = take;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function* unfoldWith(transformer, seed) {
  let terminateWhen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : n => n === undefined;
  let state = seed;

  while (true) {
    state = transformer(state);
    yield state;
    if (terminateWhen(state)) break;
  }
}

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
  for (const value of iterable) {
    yield fn(value);
  }
}

function* filterWith(fn, iterable) {
  for (const value of iterable) {
    if (fn(value)) yield value;
  }
}

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
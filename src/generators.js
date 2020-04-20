export function * unfoldWith (transformer, seed, terminateWhen = n => n === undefined) {
  let state = seed;

  while (true) {
    state = transformer(state);
    yield state;

    if (terminateWhen(state)) break;
  }
}

export function split (iterable) {
  const iterator = iterable[Symbol.iterator]();
  const { done, value: first } = iterator.next();

  if (done) {
    return { rest: [] };
  } else {
    return { first, rest: iterator };
  }
};

export function * join (first, rest) {
  yield first;
  yield * rest;
};

export function * mapWith (fn, iterable) {
  const asSplit = split(iterable);

  if (asSplit.hasOwnProperty('first')) {
    const { first, rest } = asSplit;

    yield * join(fn(first), mapWith(fn, rest));
  }
}

export function * filterWith (fn, iterable) {
  const asSplit = split(iterable);

  if (asSplit.hasOwnProperty('first')) {
    const { first, rest } = asSplit;

    if (fn(first)) {
      yield first;
    }
    yield * filterWith(fn, rest);
  }
}

export function * take (numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const { done, value } = iterator.next();
    if (done) return;
    else yield value;
  }
}
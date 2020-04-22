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
  for (const value of iterable) {
    yield fn(value);
  }
}

export function * filterWith (fn, iterable) {
  for (const value of iterable) {
    if (fn(value)) yield value;
  }
}

export function compact (iterable) {
  return filterWith(value => value !== undefined, iterable);
}

export function * take (numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const { done, value } = iterator.next();
    if (done) return;
    else yield value;
  }
}

export function last (iterable) {
  let lastValue = undefined;

  for (const value of iterable) {
    lastValue = value;
  }

  return lastValue;
}

import {
  toFactors,  // returns a map from factors to exponentiations from a BigInt
  fromFactors // returns a BigInt from a map from factors to exponentiations
} from './prime-factorization.js';

export const parse = (program) => program.trim().split(/,?\s+/).map(
  rule => rule.split('/').map(
    chars => parseInt(chars, 10)
  )
);

export const interpret = (rules, state) => {
  run: while (true) {
    for (const [action, guard] of rules) {
      const factoredState = toFactors(state);

      // check guard clause
      const factoredGuard = toFactors(guard);
      if ([...factoredGuard.keys()].some(
        factor => factoredGuard.get(factor) > (factoredState.get(factor) || 0)
      )) continue;

      for (const [factor, guardValue] of factoredGuard.entries()) {
        const oldStateValue = factoredState.get(factor);

        factoredState.set(factor, oldStateValue - guardValue);
      }

      const actiondGuard = toFactors(action);
      for (const [factor, actionValue] of actiondGuard.entries()) {
        const oldStateValue = factoredState.get(factor) || 0;

        factoredState.set(factor, oldStateValue + actionValue);
      }

      state = fromFactors(factoredState);

      continue run;
    }
    break;
  }

  return state;
}

export const evaluate = (program, initialState) => interpret(parse(program), initialState);

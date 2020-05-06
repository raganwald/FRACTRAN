const maxTapeIndexOf = (parsed) => {
  let max = undefined;

  for (const rules of parsed.slice(1)) {
    for (const [actionClause, guardClause] of rules) {
      for (const [tapeIndex] of actionClause.concat(guardClause)) {
        if (max === undefined || tapeIndex > max) max = tapeIndex;
      }
    }
  }

  return max;
};

const maxStateNumberOf = (parsed) => {
  return parsed.length - 1;
}

const NOOP = [1, 0];
const isNOOP = ([,squares]) => squares === 0;
const isActionable = ([,squares]) => squares !== 0;

const SUCCESS = [1, 0];
const isSuccess = ([,squares]) => squares === 0;
const canFail = ([,squares]) => squares !== 0;

const ruleCanFail = ([, guardClause]) => guardClause.every(canFail);

const withClause = (clauses, clause) => clauses.filter(canFail).concat([clause]);

export default (parsed) => {
  const maxTapeIndex = maxTapeIndexOf(parsed);
  const maxStateNumber = maxStateNumberOf(parsed);

  const stateToTape = new Map();

  for (let stateNumber = 2; stateNumber <= maxStateNumber; ++stateNumber) {
    const offset = maxTapeIndex + (2 * stateNumber) - 3;

    stateToTape.set(stateNumber, { stateIndex: offset, statePrimeIndex: offset + 1 });
  }

  const state1 = parsed[1];

  // adjust all rules in state 1 to set an emulated state
  // rather than use an explicit nextState if they point to
  // another state
  for (const rule of state1) {
    const [actionClause, guardClause, nextState] = rule;
    if (nextState > 1) {
      rule[0] = withClause(actionClause, [stateToTape.get(nextState).stateIndex, 1]);
      rule[2] = 1;
    }
  }

  let stateIndex = 1;
  let aggregateRules = [];
  for (const rules of parsed.slice(2)) {
    ++stateIndex;

    if (rules.every(ruleCanFail)) {
      // if we cannot guarantee action,
      // add an explicit fall-through to halt
      // this will get guarded below
      rules.push([[NOOP], [SUCCESS], 0]);
    }

    const stateEmulationGuard = [stateToTape.get(stateIndex).stateIndex, 1];

    for (const rule of rules) {
      const [actionClause, guardClause, nextState] = rule;

      if (nextState === stateIndex) {
        // this rule remains in the same state. we cannot directly
        // emulate the sate, because we are already guarding for it,
        // so we set the state-prime
        rule[0] = withClause(actionClause, [stateToTape.get(nextState).statePrimeIndex, 1]);
      } else if (nextState > 1) {
        // set an emulated state rather than use an explicit nextState
        // if nextState
        rule[0] = withClause(actionClause, [stateToTape.get(nextState).stateIndex, 1]);
      }

      rule[1] = withClause(guardClause, stateEmulationGuard);
      rule[2] = 1;
    }

    aggregateRules = aggregateRules.concat(rules); // TODO: refactor to flatMap

  }

  for (const { stateIndex, statePrimeIndex } of stateToTape.values()) {
    const actionClauses = [[stateIndex, 1]];
    const guardClauses = [[statePrimeIndex, 1]];

    aggregateRules.push([actionClauses, guardClauses, 1]);
  }

  aggregateRules = aggregateRules.concat(state1);

  return [[]].concat([aggregateRules]);
}


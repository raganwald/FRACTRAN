const parse = (program) => {
  const parseProgram = program => program.split(/\s*;\s*/).map(s => s.trim());
const parseState = state => state.split(/\s*\|\s*/).map(s => s.trim());
  const parseRule = (rule, stateIndex) => {
    const [clauses, nextState] = rule.includes('→') ? rule.split(/\s*→\s*/).map(s => s.trim()) : [rule.trim(), stateIndex + 1]

    return [clauses, typeof nextState === 'string' ? parseInt(nextState, 10) : nextState];
  };
  const parseClauses = clauses => clauses.split(/\s*\/\s*/).map(s => s.trim());
  const parseClause = clause => {
    if (clause === '') return [];

    const strippedClause = clause.substring(1, clause.length - 1); // strip opening and closing ()
    const pairs = strippedClause.split(/\)\s*\(/).map(s => s.trim());

    return pairs.map(p => p.split(/\s*,\s*/).map(s => parseInt(s, 10)));
  };

  return [[]].concat(
    parseProgram(program).map(
      (state, stateIndex) => parseState(state).map(
        rule => {
          const [_clauses, nextState] = parseRule(rule, stateIndex);
          const clauses = parseClauses(_clauses).map(parseClause);

          return clauses.concat([nextState]);
        }
      )
    )
  );
}

const interpret = (parsed, input = []) => {
  const tapes = ['ANCHOR', ...input]; // fake 1-indexing

  let stateIndex = 1;

  run: while (stateIndex > 0 && stateIndex < parsed.length) {
    const rules = parsed[stateIndex];
    for (const [actionClauses, guardClauses, nextState] of rules) {
      if (guardClauses.some(
        ([tapeIndex, squares]) => tapes[tapeIndex] === undefined || tapes[tapeIndex] < squares
      )) continue;
      for (const [tapeIndex, squares] of guardClauses) {
        tapes[tapeIndex] = tapes[tapeIndex] - squares;
      }
      for (const [tapeIndex, squares] of actionClauses) {
        tapes[tapeIndex] = (tapes[tapeIndex] || 0) + squares;
      }
      stateIndex = nextState;
      continue run;
    }
    break;
  }

  const output = tapes.slice(1); // unfake 1-indexing

  return output;
}

const minsky = (program, ...tapes) => interpret(parse(program), tapes);

// console.log(JSON.stringify(
//   minsky(
//     '(1,1)/(2,1)|(1,1)/(3,1)',
//     0, 2, 3
//   )
// ));
//
// console.log(JSON.stringify(
//   minsky(
//     (
//       '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
//       '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
//       '(3,1)/(4,1)|(1,0)/(1,0)→1'         // copy 4 back to 3 3, then return to state 1
//     ),
//     0, 3, 13
//   ),
// ));

// ----------

const maxTapeIndexOf = (parsed) => {
  let max = undefined;

  for (const rules of parsed.slice(1)) {
    for (const [actionClause, guardClause] of rules) {
      for (const [tapeIndex] of actionClause.concat(guardClause)) {
        if (max === undefined || tapeIndex > max) max=tapeIndex
      }
    }
  }

  return max;
};

const maxStateNumberOf = (parsed) => {
  return parsed.length - 1;
}

const parseToMinsky1 = (program) => {
  const parsed = parse(program);
  const maxTapeIndex = maxTapeIndexOf(parsed);
  const maxStateNumber = maxStateNumberOf(parsed);

  const stateToTape = new Map();

  for (let stateNumber = 1; stateNumber <= maxStateNumber; ++stateNumber) {
    const offset = maxTapeIndex + (2 * stateNumber) - 1;

    stateToTape.set(stateNumber, { stateIndex: offset, statePrimeIndex: offset + 1 });
  }

  const state1 = parsed[1]; // first state

  for (const rule of state1) {
    const [actionClause, guardClause, nextState] = rule;
    if (nextState > 1) {
      actionClause.push([stateToTape.get(nextState).stateIndex, 1]);
      rule[2] = 1;
    }
  }

  let stateIndex = 1;
  let aggregateRules = [];
  for (const rules of parsed.slice(2)) {
    ++stateIndex;

    const additionalGuard = [stateToTape.get(stateIndex).stateIndex, 1];

    for (const rule of rules) {
      const [actionClause, guardClause, nextState] = rule;

      if (nextState === stateIndex) {
        actionClause.push([stateToTape.get(nextState).statePrimeIndex, 1]);
      } else if (nextState > 1) {
        actionClause.push([stateToTape.get(nextState).stateIndex, 1]);
      }
      guardClause.push(additionalGuard);
      rule[2] = 1;
    }

    rules.push([[[1,0]], [[1,0], additionalGuard], 0]);
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

const ppClauses = clauses => clauses.map(c => `(${c.join(',')})`).join('');

const pp = parsed => parsed.slice(1).map(
  (rules, i) => rules.map(
    ([actionClauses, guardClauses, nextState]) => (
        ppClauses(actionClauses) +
        '/' +
        ppClauses(guardClauses) +
        (nextState === i + 1 ? '' : `→${nextState}`)
    )
  ).join('|')
).join(";\r\n");

const minsky1 = (program, ...tapes) => interpret(parseToMinsky1(program), tapes);

console.log(pp(
  parseToMinsky1(
    (
      '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
      '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
      '(3,1)/(4,1)|(1,0)/(1,0)→1'         // copy 4 back to 3 3, then return to state 1
    ),
    0, 3, 13
  )
));

console.log(JSON.stringify(
  minsky1(
    (
      '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
      '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
      '(3,1)/(4,1)|(1,0)/(1,0)→1'         // copy 4 back to 3 3, then return to state 1
    ),
    0, 3, 13
  ),
));

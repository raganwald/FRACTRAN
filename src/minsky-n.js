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

  let minsky1 = parsed[1]; // first state

  let stateIndex = 1;
  for (const rules of parsed.slice(2)) {
    ++stateIndex;

    const additionalGuard = [stateToTape.get(stateIndex), 1];

    for (const rule of rules) {
      const [actionClause, guardClause, nextState] = rule;

      if (nextState === stateIndex) {
        actionClause.push([stateToTape.get(statePrimeIndex), 1]);
      } else if (nextState > 1) {
        actionClause.push([stateToTape.get(stateIndex), 1]);
      }
      guardClause.push(additionalGuard);
      rules[2] = 1;
    }
    rules.push([[[1,0]], [[1,0], additionalGuard], 0]);
    minsky1 = rules.concat(minsky1);
  }

  return minsky1;
}

const ppClauses = clauses => clauses.map(clause => `(${clause.join(',')})`).join('');

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

// TODO: prime states

const minsky1 = (program, ...tapes) => interpret(parseToMinsky1(program), tapes);

console.log(pp(
  parse(
    (
      '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
      '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
      '(3,1)/(4,1)|(1,0)/(1,0)→1'         // copy 4 back to 3 3, then return to state 1
    ),
    0, 3, 13
  )
));



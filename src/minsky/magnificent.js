export const parse = (program) => {
  const parseProgram = program => program.split(/\s*;\s*/).map(s => s.trim());
  const parseState = state => state.split(/(?:\s*,|\s)\s*/).map(s => s.trim());
  const parseRule = (rule, stateIndex) => {
    const [clauses, nextState] = rule.includes('→') ? rule.split(/\s*→\s*/).map(s => s.trim()) : [rule.trim(), stateIndex + 1]

    return [clauses, typeof nextState === 'string' ? parseInt(nextState, 10) : nextState];
  };
  const parseClauses = clauses => clauses.split('/').map(s => s.trim());
  const parseClause = clause => {
    if (clause === '') return [];

    const strippedClause = clause.substring(1, clause.length - 1); // strip opening and closing ()
    const pairs = strippedClause.split(/\)\s*\(/).map(s => s.trim());

    return pairs.map(p => p.split(/\s*\^\s*/).map(s => parseInt(s, 10)));
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

export const interpret = (parsed, input = []) => {
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

export const evaluate = (program, ...tapes) => interpret(parse(program), tapes);

const ppClauses = clauses => clauses.map(c => `(${c.join(',')})`).join('');

export const pp = (parsed) => parsed.slice(1).map(
  (rules, i) => rules.map(
    ([actionClauses, guardClauses, nextState]) => (
        ppClauses(actionClauses) +
        '/' +
        ppClauses(guardClauses) +
        (nextState === i + 1 ? '' : `→${nextState}`)
    )
  ).join('|')
).join(";\r\n");
const parse = (program) => {
  const parseProgram = program => program.split(/\s*;\s*/).map(s => s.trim());
const parseState = state => state.split(/\s*\|\s*/).map(s => s.trim());
  const parseRule = (rule, stateIndex) => {
    const [clauses, nextState] = rule.includes('→') ? rule.split(/\s*→\s*/).map(s => s.trim()) : [rule.trim(), stateIndex]

    return [clauses, typeof nextState === 'string' ? parseInt(nextState, 10) - 1 : nextState];
  };
  const parseClauses = clauses => clauses.split(/\s*\/\s*/).map(s => s.trim());
  const parseClause = clause => {
    if (clause === '') return [];

    const strippedClause = clause.substring(1, clause.length - 1); // strip opening and closing ()
    const pairs = strippedClause.split(/\)\s*\(/).map(s => s.trim());

    return pairs.map(p => p.split(/\s*,\s*/).map(s => parseInt(s, 10)));
  };

  return parseProgram(program).map(
    (state, stateIndex) => parseState(state).map(
      rule => {
        const [_clauses, nextState] = parseRule(rule, stateIndex);
        const clauses = parseClauses(_clauses).map(parseClause);

        return clauses.concat([nextState]);
      }
    )
  );
}

const interpret = (parsed, input = []) => {
  const tapes = ['ANCHOR', ...input]; // fake 1-indexing

  let stateIndex = 0;

  run: while (true) {
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

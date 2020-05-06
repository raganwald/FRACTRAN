const ppClauses = clauses => clauses.map(c => `(${c.join(',')})`).join('');

export default parsed => parsed.slice(1).map(
  (rules, i) => rules.map(
    ([actionClauses, guardClauses, nextState]) => (
        ppClauses(actionClauses) +
        '/' +
        ppClauses(guardClauses) +
        (nextState === i + 1 ? '' : `→${nextState}`)
    )
  ).join('|')
).join(";\r\n");
"use strict";

require("core-js/modules/es6.regexp.split");

const parse = program => {
  const parseProgram = program => program.split(/\s*;\s*/).map(s => s.trim());

  const parseState = state => state.split(/\s*\|\s*/).map(s => s.trim());

  const parseRule = (rule, stateIndex) => {
    const [clauses, nextState] = rule.includes('→') ? rule.split(/\s*→\s*/).map(s => s.trim()) : [rule.trim(), stateIndex + 1];
    return [clauses, typeof nextState === 'string' ? parseInt(nextState, 10) : nextState];
  };

  const parseClauses = clauses => clauses.split(/\s*\/\s*/).map(s => s.trim());

  const parseClause = clause => {
    if (clause === '') return [];
    const strippedClause = clause.substring(1, clause.length - 1); // strip opening and closing ()

    const pairs = strippedClause.split(/\)\s*\(/).map(s => s.trim());
    return pairs.map(p => p.split(/\s*,\s*/).map(s => parseInt(s, 10)));
  };

  return ['NULL-STATE'].concat(parseProgram(program).map((state, stateIndex) => parseState(state).map(rule => {
    const [_clauses, nextState] = parseRule(rule, stateIndex);
    const clauses = parseClauses(_clauses).map(parseClause);
    return clauses.concat([nextState]);
  })));
};

const interpret = function interpret(parsed) {
  let input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const tapes = ['ANCHOR', ...input]; // fake 1-indexing

  let stateIndex = 1;

  run: while (stateIndex < parsed.length) {
    const rules = parsed[stateIndex];

    for (const [actionClauses, guardClauses, nextState] of rules) {
      if (guardClauses.some((_ref) => {
        let [tapeIndex, squares] = _ref;
        return tapes[tapeIndex] === undefined || tapes[tapeIndex] < squares;
      })) continue;

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
};

const minsky = function minsky(program) {
  for (var _len = arguments.length, tapes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tapes[_key - 1] = arguments[_key];
  }

  return interpret(parse(program), tapes);
};

console.log(JSON.stringify(minsky('(1,1)/(2,1)|(1,1)/(3,1)', 0, 2, 3)));
console.log(JSON.stringify(minsky('(1,0)/(2,1)→2|(1,0)/(3,1);' + // decrement #2 by one and goto 2, then erase 3
'(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
'(3,1)/(4,1)|(1,0)/(1,0)→1' // copy 4 back to 3 3, then return to state 1
, 0, 3, 13)));
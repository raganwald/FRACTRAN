import pp from './pp';
import flatten from './flatten';
import { parse, interpret } from './interpreter';

const evaluateFlattened = (program, ...tapes) => interpret(flatten(parse(program)), tapes);

const marvellousMultiplicationMachine = (
  '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
  '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
  '(3,1)/(4,1)|(1,0)/(1,0)→1'        // copy 4 back to 3 3, then return to state 1
);

console.log(pp(
  flatten(parse(marvellousMultiplicationMachine))
));

console.log(JSON.stringify(
  evaluateFlattened(
    marvellousMultiplicationMachine, 0, 3, 13
  ),
));
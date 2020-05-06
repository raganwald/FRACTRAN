import { evaluate } from './interpreter';

console.log(JSON.stringify(
  evaluate(
    '(1,1)/(2,1)|(1,1)/(3,1)',
    0, 2, 3
  )
));

console.log(JSON.stringify(
  evaluate(
    (
      '(1,0)/(2,1)→2|(1,0)/(3,1);'      + // decrement #2 by one and goto 2, then erase 3
      '(1,1)(4,1)/(3,1)|(1,0)/(1,0)→3;' + // move 3 to 1 and 4, then goto 3
      '(3,1)/(4,1)|(1,0)/(1,0)→1'         // copy 4 back to 3 3, then return to state 1
    ),
    0, 3, 13
  ),
));
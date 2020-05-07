import { toMarvellous } from '../marvellous';
import { evaluate } from '../magnificent';

const evaluateMarvellous = (program, ...tapes) => evaluate(toMarvellous(program), ...tapes);

const magnificentMultiplicationMachine = (`
  (1^0)/(2^1)→2,    (1^0)/(3^1)   ;
  (1^1)(4^1)/(3^1), (1^0)/(1^0)→3 ;
  (3^1)/(4^1),      (1^0)/(1^0)→1
`);

const marvelousMultiplicationMachine = (`
  (1^1)(4^1)(6^1)/(3^1)(5^1) ,
  (7^1)/(5^1)                ,
  (3^1)(8^1)/(4^1)(7^1)      ,
  (1^0)/(7^1)                ,
  (5^1)/(6^1)                ,
  (7^1)/(8^1)                ,
  (5^1)/(2^1)                ,
  (1^0)/(3^1)
`);

console.log(
  toMarvellous(magnificentMultiplicationMachine)
);

console.log(JSON.stringify(
  evaluateMarvellous(
    magnificentMultiplicationMachine, 0, 3, 13
  ),
));

console.log(JSON.stringify(
  evaluate(
    marvelousMultiplicationMachine, 0, 3, 13
  ),
));
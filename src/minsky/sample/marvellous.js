import { flatten } from '../marvellous';
import { parse, interpret, evaluate, pp } from '../magnificent';

const evaluateFlattened = (program, ...tapes) => interpret(flatten(parse(program)), tapes);

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

console.log(pp(
  flatten(parse(magnificentMultiplicationMachine))
));

console.log(JSON.stringify(
  evaluateFlattened(
    magnificentMultiplicationMachine, 0, 3, 13
  ),
));

console.log(JSON.stringify(
  evaluate(
    marvelousMultiplicationMachine, 0, 3, 13
  ),
));
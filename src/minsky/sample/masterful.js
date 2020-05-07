import { evaluate } from '../masterful.js';

// masterful adding machine
// 3²5³ => 1,125
// 2⁵ => 32
console.log(
  evaluate(
    '2/3, 2/5',
    1125
  )
)
  //=> 32

// masterful multiplication machine
// 3³5¹³ => 32,958,984,375
// 2³⁹ => 549,755,813,888
console.log(
  evaluate(
    '182/55, 17/11, 95/119, 1/17, 11/13, 17/19, 11/3, 1/5',
    32958984375n
  )
)
  //=> 549755813888n

// the masterful fibonacci machine
// 78 * 5⁽⁷⁻¹⁾ => 1,218,750
// 2¹³ => 8,192
console.log(
  evaluate(
    `17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23,
     74/341, 31/37, 41/31, 129/287, 41/43, 13/41, 1/13, 1/3`,
    1218750
  )
)
  //=> 8192n
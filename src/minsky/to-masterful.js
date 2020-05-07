import { parse } from './magnificent';
import { toMarvellous } from './marvellous';
import { pp } from './masterful';
import { pow } from './prime-factorization';

const PRIMES = [
     2n,	   3n,    5n,    7n,	  11n,	  13n,	  17n,	  19n,	  23n,	  29n,
    31n,	  37n,   41n,   43n,	  47n,	  53n,	  59n,	  61n,	  67n,	  71n,
    73n,	  79n,   83n,   89n,	  97n,	 101n,	 103n,	 107n,	 109n,	 113n,
   127n,	 131n,  137n,	 139n,	 149n,	 151n,	 157n,	 163n,	 167n,	 173n,
   179n,	 181n,  191n,	 193n,	 197n,	 199n,	 211n,	 223n,	 227n,	 229n,
   233n,	 239n,  241n,	 251n,	 257n,	 263n,	 269n,	 271n,	 277n,	 281n,
   283n,	 293n,  307n,	 311n,	 313n,	 317n,	 331n,	 337n,	 347n,	 349n,
   353n,	 359n,  367n,	 373n,	 379n,	 383n,	 389n,	 397n,	 401n,	 409n,
   419n,	 421n,  431n,	 433n,	 439n,	 443n,	 449n,	 457n,	 461n,	 463n,
   467n,	 479n,  487n,	 491n,	 499n,	 503n,	 509n,	 521n,	 523n,	 541n,
   547n,	 557n,  563n,	 569n,	 571n,	 577n,	 587n,	 593n,	 599n,	 601n,
   607n,	 613n,  617n,	 619n,	 631n,	 641n,	 643n,	 647n,	 653n,	 659n,
   661n,	 673n,  677n,	 683n,	 691n,	 701n,	 709n,	 719n,	 727n,	 733n,
   739n,	 743n,  751n,	 757n,	 761n,	 769n,	 773n,	 787n,	 797n,	 809n,
   811n,	 821n,  823n,	 827n,	 829n,	 839n,	 853n,	 857n,	 859n,	 863n,
   877n,	 881n,  883n,	 887n,	 907n,	 911n,	 919n,	 929n,	 937n,	 941n,
   947n,	 953n,  967n,	 971n,	 977n,	 983n,	 991n,	 997n,	1009n,	1013n,
  1019n,	1021n, 1031n,	1033n,	1039n,	1049n,	1051n,	1061n,	1063n,	1069n,
  1087n,	1091n, 1093n,	1097n,	1103n,	1109n,	1117n,	1123n,	1129n,	1151n,
  1153n,	1163n, 1171n,	1181n,	1187n,	1193n,	1201n,	1213n,	1217n,	1223n,
];

// without a dynamic prime number generator, we are
// limited to transpiling minsky machines with at most
// 200 registers. but this is good enough to demonstrate ideas
const tapeToPrime = tape => PRIMES[tape - 1];
const exponentiate = ([tape, amount]) => pow(tapeToPrime(tape), BigInt(amount));
const multiply = (x, y) => x * y;
const godelizeClauses = clauses => clauses.map(exponentiate).reduce(multiply, 1n);

export const toMasterful = (magnificentProgram) => {
  const parsedMarvellous = parse(toMarvellous(magnificentProgram));
  const godelized = parsedMarvellous[1].map(
    ([actions, guards]) => [actions, guards].map(godelizeClauses)
  );

  return pp(godelized);
}

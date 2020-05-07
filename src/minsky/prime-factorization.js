// Converts BigInts to their prime factorizations,
// represented as a map from prime to exponent.
//
// Examples:
//   17 => Map { 17 => 1 }
//   39 => Map { 3 => 1, 13 => 1 }
//   44 => Map { 2 => 2, 11 => 1}
//
// Accepts BigInts or numbers, returns a factorization
// as ordinary numbers

// Relies on simple factoring code adapted from
// http://www.javascripter.net/math/primes/factorization.htm
export const toFactors = (n) => {
  n = BigInt(n);

  if (n <= 0n) return;

  const factorization = new Map();

  while (n > 1n) {
    const primeFactorBigInt = leastFactor(n)
    const primeFactor = unsafeToNumber(leastFactor(n));

    factorization.set(
      primeFactor,
      factorization.has(primeFactor) ? factorization.get(primeFactor) + 1 : 1
    );

    n = n / primeFactorBigInt;
  }

  return factorization;
}

const pow = (base, exponent) => {
  base = BigInt(base);
  exponent = BigInt(exponent);

  if (exponent < 0n) return;

  let result = 1n;

  while (exponent-- > 0n) result = result * base;

  return result;
}

// Converts prime factorization to BigInts
export const fromFactors = g => [...g.entries()].reduce((acc, [factor, exponent]) => acc * pow(factor, exponent), 1n);

// find the least factor in n by trial division
function leastFactor(composite) {

 // if (isNaN(n) || !isFinite(n)) return NaN;

 if (composite === 0n) return 0n;
 if (composite % 1n || composite*composite < 2n) return 1n;
 if (composite % 2n === 0n) return 2n;
 if (composite % 3n === 0n) return 3n;
 if (composite % 5n === 0n) return 5n;

 for (let i = 7n; (i * i) < composite; i += 30n) {
   if (composite % i         === 0n) return i;
   if (composite % (i +  4n) === 0n) return i + 4n;
   if (composite % (i +  6n) === 0n) return i + 6n;
   if (composite % (i + 10n) === 0n) return i + 10n;
   if (composite % (i + 12n) === 0n) return i + 12n;
   if (composite % (i + 16n) === 0n) return i + 16n;
   if (composite % (i + 22n) === 0n) return i + 22n;
   if (composite % (i + 24n) === 0n) return i + 24n;
 }

 // it is prime
 return composite;
}

function unsafeToNumber(big) {
  return parseInt(big.toString(), 10);
}
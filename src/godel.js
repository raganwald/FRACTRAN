// A "Gödel Number" is a representation of an integer, implemented
// as its prime factorization, mapping integer factors to integer exponents

// Relies on simple factoring code adapted from
// http://www.javascripter.net/math/primes/factorization.htm
export const godel = (n) => {
  if (n <= 0 || n > 9007199254740992) return;

  const factorization = new Map();

  while (n > 1) {
    const primeFactor = leastFactor(n);

    factorization.set(
      primeFactor,
      factorization.has(primeFactor) ? factorization.get(primeFactor) + 1 : 1
    );
    n = n / primeFactor;
  }

  return factorization;
}

export const asNumber = g => [...g.entries()].reduce((acc, [factor, exponent]) => acc * Math.pow(factor, exponent), 1);

// find the least factor in n by trial division
function leastFactor(n) {
 if (isNaN(n) || !isFinite(n)) return NaN;
 if (n==0) return 0;
 if (n%1 || n*n<2) return 1;
 if (n%2==0) return 2;
 if (n%3==0) return 3;
 if (n%5==0) return 5;
 var m = Math.sqrt(n);
 for (var i=7;i<=m;i+=30) {
   if (n%i==0)      return i;
   if (n%(i+4)==0)  return i+4;
   if (n%(i+6)==0)  return i+6;
   if (n%(i+10)==0) return i+10;
   if (n%(i+12)==0) return i+12;
   if (n%(i+16)==0) return i+16;
   if (n%(i+22)==0) return i+22;
   if (n%(i+24)==0) return i+24;
 }
 return n;
}

const factors = (a, b) => {
  const aFactors = [...a.keys()];
  const bFactors = [...b.keys()];
  const aFactorsSet = new Set(aFactors);
  const bFactorsSet = new Set(bFactors);

  const aNotB = aFactors.filter(aFactor => !bFactorsSet.has(aFactor));
  const aAndB = aFactors.filter(aFactor => bFactorsSet.has(aFactor));
  const bNotA = bFactors.filter(bFactor => !aFactorsSet.has(bFactor));

  return [aNotB, aAndB, bNotA];
}

export const divide = (a, b) => {
  const [aNotB, aAndB, bNotA] = factors(a, b);
  const divided = new Map();

  if (bNotA.length > 0) return; // b does not divide into a evenly, fast exit

  for (const factor of aAndB) {
    const aExponent = a.get(factor);
    const bExponent = b.get(factor);
    const dividedExponent = aExponent - bExponent;

    if (dividedExponent < 0) return;  // b does not divide into a evenly, e.g. 2 / 4
    if (dividedExponent > 0) divided.set(factor, dividedExponent);
  }

  for (const factor of aNotB) divided.set(factor, a.get(factor));

  return divided;
};

export const multiply = (a, b) => {
  const [aNotB, aAndB, bNotA] = factors(a, b);
  const multiplied = new Map();

  for (const factor of bNotA) multiplied.set(factor, b.get(factor));

  for (const factor of aAndB) {
    const aExponent = a.get(factor);
    const bExponent = b.get(factor);
    multiplied.set(factor, aExponent + bExponent);
  }

  for (const factor of aNotB) multiplied.set(factor, a.get(factor));

  return multiplied;
};

// Any sufficiently complicated function that loops imperatively contains an ad hoc,
// informally-specified, bug-ridden, slow implementation of half of Linear Recursion
export const exponentOfTwo = (n) => {
  const factorsOfN = [...n.entries()];

  if (factorsOfN.length !== 1) return;
  if (factorsOfN[0][0] !== 2) return;

  return factorsOfN[0][1];
}
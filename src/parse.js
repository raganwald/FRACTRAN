const seedAndProgramOf = string => string.trim().split(/\s*->\s*/);
const seedOf = string => parseInt(string, 10);
const fractionsOf = string => string.trim().split(
  /(?:\s|[,:;])+/
);
const termPairOf = term => term.split('/').map(
  str => parseInt(str, 10)
);
const termsOf = ([numerator, denominator]) => ({ numerator, denominator });

export default syntax => {
  const [seedSyntax, programSyntax] = seedAndProgramOf(syntax);
  const seed = seedOf(seedSyntax);
  const fractions = fractionsOf(programSyntax);
  const termPairs = fractions.map(termPairOf);
  const terms = termPairs.map(termsOf);

  return { seed, terms };
};

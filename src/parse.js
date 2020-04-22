const seedAndProgramOf = string => string.indexOf('|>') >= 0 ? string.trim().split(/\s*\|>\s*/) : [undefined, string.trim()];
const seedOf = string => /\d+/.exec(string) ? parseInt(string, 10) : undefined;
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

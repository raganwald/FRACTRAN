export const argument = () => {
  if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
    return parseInt(process.argv[2], 10);
  }
};

export const cases = transformers => (n) => {
  for (const transformer of transformers) {
    const nextN = transformer(n);

    if (nextN !== undefined) return nextN;
  }
};

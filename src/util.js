export const digitsOf = n => n.toString().split().filter(c => /\d/.exec(c)).join();

export const argument = () => {
  if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
    return parseInt(process.argv[2], 10);
  }
};

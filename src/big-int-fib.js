const programSyntax = `
  17/65, 133/34, 17/19, 23/17, 2233/69, 23/29, 31/23, 74/341, 31/37, 41/31,
  129/287, 41/43, 13/41, 1/13, 1/3
`;

let n;

if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
  n = BigInt(parseInt(process.argv[2], 10));
} else {
  n = 5n;
}
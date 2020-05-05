"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argument = void 0;

const argument = () => {
  if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
    return parseInt(process.argv[2], 10);
  }
};

exports.argument = argument;
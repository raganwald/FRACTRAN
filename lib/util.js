"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argument = exports.digitsOf = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.split");

const digitsOf = n => n.toString().split().filter(c => /\d/.exec(c)).join();

exports.digitsOf = digitsOf;

const argument = () => {
  if (process.argv && process.argv[2] && Number.isInteger(parseInt(process.argv[2], 10))) {
    return parseInt(process.argv[2], 10);
  }
};

exports.argument = argument;
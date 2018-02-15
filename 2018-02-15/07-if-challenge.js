'use strict';

// Given number, return string with limited precision
// at most maxDigits after the decimal point.
var getStringDigits = function (number, maxDigits) {
  var numberToFixed = number.toFixed(maxDigits);
  var numberToString = number.toString();

  if (/* TODO fixed string length is less than default string length */) {
    // TODO return fixed string
  }

  return numberToString;
};

var fraction = 1 / 4;

console.log(getStringDigits(fraction, 3));
console.log(getStringDigits(fraction, 2));
console.log(getStringDigits(fraction, 1));

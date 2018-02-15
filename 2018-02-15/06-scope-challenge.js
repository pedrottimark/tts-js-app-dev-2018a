'use strict';

// Compare toString and toFixed methods.
var getStringAndFixedPure = function (number, maxDigits) {
  numberToString = number.toString(); // TODO variable declaration
  numberToFixed = number.toFixed(maxDigits); // TODO variable declaration

  return [numberToString, numberToFixed];
};

var fraction = 1 / 4;

console.log(getStringAndFixedPure(fraction, 3));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 1));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 3));

console.log(typeof numberToString);
console.log(typeof numberToFixed);

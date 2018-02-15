'use strict';

// Given number of digits after the decimal point, return function
// which given number, returns string with limited precision.
var getFixerFunction = function (maxDigits) {
  return function (number) {
    var numberToFixed = number.toFixed(maxDigits);
    var numberToString = number.toString();

    return numberToFixed.length < numberToString.length
      ? numberToFixed
      : numberToString;
  };
};

var fraction = 1 / 4;

var fixer3 = getFixerFunction(3);
console.log(fixer3(fraction));

var fixer2 = getFixerFunction(2);
console.log(fixer2(fraction));

console.log(getFixerFunction(1)(fraction));

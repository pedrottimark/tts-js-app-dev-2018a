// Compare toString and toFixed methods.
var getStringAndFixedPure = function (number, maxDigits) {
  numberToString = number.toString();
  numberToFixed = number.toFixed(maxDigits);

  return [numberToString, numberToFixed];
};

var fraction = 1 / 4;

console.log(getStringAndFixedPure(fraction, 3));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 1));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 3));

console.log(numberToString);
console.log(numberToFixed);

var maxDigits;

// Compare toString and toFixed methods.
var getStringAndFixedImpure = function (number) {
  return [number.toString(), number.toFixed(maxDigits)];
};

var fraction = 1 / 4;

maxDigits = 3;
console.log(getStringAndFixedImpure(fraction));

maxDigits = 2;
console.log(getStringAndFixedImpure(fraction));

maxDigits = 1;
console.log(getStringAndFixedImpure(fraction));

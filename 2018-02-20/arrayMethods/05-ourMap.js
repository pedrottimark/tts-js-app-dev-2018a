function map(fn, array) {
  var result = [];

  for (var i = 0; i < array.length; i += 1) {
    result.push(fn(array[i]));
  }

  return result;
}

function add5(x) {
  return x + 5;
}

console.log(map(add5, [1, 2, 3]));

var mapAdd5 = map.bind(null, add5);

console.log(mapAdd5([1, 2, 3]));

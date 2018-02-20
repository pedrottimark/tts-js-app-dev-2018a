function reduce(fn, initialValue, array) {
    var acc = initialValue;

    for (var i = 0; i < array.length; i += 1) {
        acc = fn(acc, array[i])
    }

    return acc;
}

function sum(x, y) {
    return x + y
}


console.log(reduce(sum, 0, [1, 2, 3]))
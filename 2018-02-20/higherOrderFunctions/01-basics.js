function add(x, y) {
    return x + y;
}

// Higher Order function, returns a function that takes one argument and adds a to it
function getAdder(a) {
    return function (b) {
        return add(a, b)
    }
}

var add3 = getAdder(3);
var add5 = getAdder(5);

console.log(add3(2))
console.log(add5(2))
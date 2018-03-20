function createCounter() {
	let count = 0;

	return function () {
		count++;
		return count
	}
}

const counter = createCounter();

function hello(name = `Mystery Person ${counter()}`) {
	console.log(`Hello ${name}!`);
}

hello("Bobby");
// Hello Bobby!

hello();
hello();
hello();
hello();
hello();
// Hello Mystery Person!
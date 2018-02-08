var terms = [
  'array',
  'item',
  'index',
];

console.log('terms before push:                  ', terms);

terms.push('slice'); // add an item to the end of an array
console.log('terms after push:                   ', terms);

terms[terms.length] = 'push'; // also add an item to the end of an array
console.log('terms after assign to index length: ', terms);

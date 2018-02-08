var terms = [
  'array',
  'item',
  'index',
];

var term = 'item'; // replace string with other terms or non-terms

// Find the index of the term item in the terms array.
for (var i = 0; i !== terms.length; i += 1) {
  if (term === terms[i]) {
    break;
  }
}

console.log('index ', i);
console.log('length', terms.length);

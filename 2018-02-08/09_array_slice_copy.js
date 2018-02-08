var terms = [
  'array',
  'item',
  'index',
];

var termsCopied = terms.slice();
console.log(termsCopied === terms);

console.log(termsCopied[1] === terms[1]);

termsCopied[1] = 'element';
console.log(termsCopied[1] === terms[1]);

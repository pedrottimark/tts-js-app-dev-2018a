var glossary = [
  {
    term: 'array',
    definition: 'list-like object which consists of items at indexes',
  },
  {
    term: 'item',
    definition: 'also known as element: a value in an array',
  },
  {
    term: 'index',
    definition: 'the number “address” of an item in an array',
  },
];

console.log('original order:\n', glossary);

glossary.reverse();
console.log('\nreverse order:\n', glossary);

glossary.reverse();
console.log('\nreverse again:\n', glossary);

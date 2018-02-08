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

console.log('typeof glossary                ', typeof glossary);
console.log('typeof glossary[0]             ', typeof glossary[0]);
console.log('typeof glossary[0].term        ', typeof glossary[0].term);

console.log('Array.isArray(glossary)        ', Array.isArray(glossary));
console.log('Array.isArray(glossary[0])     ', Array.isArray(glossary[0]));
console.log('Array.isArray(glossary[0].term)', Array.isArray(glossary[0].term));

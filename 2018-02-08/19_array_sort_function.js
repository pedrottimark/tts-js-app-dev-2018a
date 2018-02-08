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

var glossaryCopied = glossary.concat(); // another idiom to copy

console.log('original order:\n', glossary);

glossary.sort(function (itemA, itemB) {
  return itemA.term.localeCompare(itemB.term);
});

console.log('\nascending order:\n', glossary);

glossary.reverse();
console.log('\ndescending order:\n', glossary);

console.log(glossaryCopied === glossary); // false why?
console.log(glossaryCopied[0] === glossary[2]); // true why?
console.log(glossaryCopied[1] === glossary[0]); // true
console.log(glossaryCopied[2] === glossary[1]); // true

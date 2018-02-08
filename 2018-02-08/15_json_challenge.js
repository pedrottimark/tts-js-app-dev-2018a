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

var stringified = JSON.stringify(glossary);
console.log(stringified);

var parsed = JSON.parse(stringified);
console.log(parsed);
console.log(parsed === glossary);

// Write conditional expression in console.log which answers question in comment:
console.log(/* TODO */); // is parsed an array?
console.log(/* TODO */); // is length of parsed equal to length of glossary?
console.log(/* TODO */); // is term of first item equal in parsed and glossary?
console.log(/* TODO */); // is definition of last item equal in parsed and glossary?

// var last = TODO; // index of last item in glossary
console.log(/* TODO */); // use last variable to rewrite preceding expression

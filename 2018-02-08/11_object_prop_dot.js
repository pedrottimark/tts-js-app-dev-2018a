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

for (var i = 0; i !== glossary.length; i += 1) {
  console.log(glossary[i].term + ': ' + glossary[i].definition);
}

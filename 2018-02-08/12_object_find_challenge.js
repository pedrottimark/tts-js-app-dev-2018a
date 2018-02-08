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

var term = process.argv[2] || 'item';
var item;

for (var i = 0; /* TODO test condition */; i += 1) {
  item = glossary[i];
  if (/* TODO conditional expression to match term in item */) {
    break;
  }
}

if (/* TODO conditional expression when term not found */) {
  // TODO relevant feedback if term not found
} else {
  console.log(item.term + ': ' + item.definition);
}

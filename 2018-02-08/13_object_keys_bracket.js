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

var item;
var keys;
var key;
var value;

for (var i = 0; i !== glossary.length; i += 1) {
  item = glossary[i];
  keys = Object.keys(item);
  for (var k = 0; k !== keys.length; k += 1) {
    key = keys[k]; // subscript notation for array
    value = item[key]; // subscript notation for object
    console.log(i, key, value);
  }
}

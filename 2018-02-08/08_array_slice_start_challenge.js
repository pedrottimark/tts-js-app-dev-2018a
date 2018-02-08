var terms = [
  'array',
  'item',
  'index',
];

var term = process.argv[2] || 'item';

var index = terms.indexOf(term);

if (index === -1) {
  console.log('terms do not include: ' + term);
  console.log('terms:', terms);
} else {
  // The term is a prerequisite of the terms which follow it.
  console.log(
    'terms which follow ' + term + ':',
    terms.slice(/* TODO */) // starting index for the rest of the items
  );
}

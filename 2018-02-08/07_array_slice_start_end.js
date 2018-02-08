var terms = [
  'array',
  'item',
  'index',
];

var term = process.argv[2] || 'item';

var index = terms.indexOf(term);

if (index === -1) {
  console.log('terms do not include: ' + term);
  console.log('terms:', terms); // why do you think it does this?
} else {
  // The prerequisite terms end at but do not include the term.
  console.log('prerequisite terms for ' + term + ':', terms.slice(0, index));
}

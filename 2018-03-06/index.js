(function () {
  var receivedString = [
    '{',
    '"visibilityFilter":"all",',
    '"todos":[',
    '{"completed":true,"text":"Render <strong>markup</strong> from data"},',
    '{"completed":false,"text":"Add <strong>interactive</strong> behavior to rendered markup"},',
    '{"completed":false,"text":"Call <code>querySelector</code> method to find an element"}',
    ']',
    '}',
  ].join('');

  var state = JSON.parse(receivedString);

  $('#root').append(renderApp(state, logic));
}());

# Lesson 2: Data Structures

To make a copy of JavaScript files to edit during in-class challenges:

```sh
cd 2018-02-08
mkdir copy
cp *.js copy
cd copy
```

## Array, part 1

An **array** is a list-like object which consists of items at indexes.

To make an array using **literal** notation, enclose it in brackets:

```js
var terms = [
  'array',
  'item',
  'index',
];
```

An **item**, also known as an element, is a value in an array.

The **index** or “address” of an item is a zero-based integer number.

### Analogy: array in JavaScript to list in HTML

The array data structure in JavaScript is like the `ol` or `ul` markup structure in HTML.

Both structures consist of items in order, even if order is not significant.

```html
<h2>terms</h2>

<ol>
  <li>array</li>
  <li>item</li>
  <li>index</li>
</ol>

<ul>
  <li>array</li>
  <li>item</li>
  <li>index</li>
</ul>
```

### 01_array_index_console

Refer to an item by its index using **bracket** notation:

```js
console.log(0, terms[0]); // first item
console.log(1, terms[1]); // second item
console.log(2, terms[2]); // third item
console.log(3, terms[3]); // what do you think happens here?
```

To apply what you learned in the first lesson, can anyone suggest what happens in the last line?

### 02_array_for_length_challenge

The `length` property gets or sets the current **number of items** in an array.

You usually refer to a property using **dot** notation: `terms.length`

First, will a volunteer please describe how the `for` loop works step-by-step:

```js
// initialize variable; test condition; increment variable
for (var i = 0; i < terms.length; i += 1) {
  console.log(i/*, terms[TODO] */); // replace TODO with the index of a term
}
```

Then in pairs, edit your copy of the JavaScript file as our first **challenge**.

* Someone take role of **navigator** to suggest what to do and why to do it.
* Someone else take role of **pilot** to edit the file, and then run it with `node` command.

### 03_array_while_challenge

Change roles for our second **challenge** to replace `for` statement with `while` statement:

```js
// TODO initialize variable
while (/* TODO test condition */) {
  console.log(i, terms[i]);
  // TODO increment variable
}
```

### 04_array_for_if_break

Will a volunteer please describe how the `for` loop works step-by-step:

```js
// Find the index of the term item in the terms array.
for (var i = 0; i !== terms.length; i += 1) {
  if (term === terms[i]) {
    break;
  }
}
```

Will another volunteer please suggest a theory about the value of `i` if the term is **not** in the array.

### 05_array_indexOf_if_else_challenge

A **method** is a function which is a property of an object.

An array is a specialized object which has many methods, see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

For example, the [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method returns either:

* the first index at which an item is found in the array
* `-1` if the item is not found in the array

The method is more clear and concise than the `for if break` loop in the preceding example code.

You usually refer to a method using **dot** notation: `var index = terms.indexOf(term);`

Change roles for our next **challenge** to give relevant feedback after trying to find an item:

```js
// replace comments with expressions for relevant feedback
if (index === -1) {
  console.log(/* TODO */);
} else {
  console.log(/* TODO */);
}
```

### 06_array_indexOf_ternary_challenge

Here is an idiom to make our example code interactive on the command line:

```js
// You can provide term as an argument on the command line.
var term = process.argv[2] || 'item'; // or let item be the default.
```

For example, to provide `index` as the term to find:

```sh
node 06_array_indexOf_ternary_challenge index
```

Change roles for our next **challenge** to replace `if` statement with ternary expression:

```js
// replace comments with expressions from preceding challenge
console.log(index === -1
  ? /* TODO */
  : /* TODO */
);
```

### 07_array_slice_start_end

The [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method returns a new array which contains items from a **start** index up to but **not including** an **end** index.

```js
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
```

Will one volunteer please pick a term from the array of terms.

Will another volunteer please say:

* what is the value of `index`
* which indexes does the sliced array contain
* what is the length of the sliced array

### 08_array_slice_start_challenge

The length of the array is default for **end** index in the `slice` method.

Change roles for our next **challenge** to slice the terms which follow a term (that is, the terms for which it is a prerequisite).

Will a volunteer please explain what happens if you slice the terms which follow the last term?

### 09_array_slice_copy

The start of the array is default for **start** index in the `slice` method.

Therefore `var termsCopied = terms.slice();` is an idiom to copy an array.

For arrays, the strict equality `===` operator tests their **identity**, not the equality of their items.

```js
console.log(termsCopied === terms); // false because different instances

console.log(termsCopied[1] === terms[1]); // true or false, why?

termsCopied[1] = 'element';
console.log(termsCopied[1] === terms[1]); // true or false, why?
```

Will a volunteer please explain whether the second and third test conditions are true or false, and why?

### 10_array_push

The [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method adds one or more items to the end of an array.

```js
var terms = [
  'array',
  'item',
  'index',
];

terms.push('property');
```

Unlike the `slice` method which returns a new array, the `push` method modifies or **mutates** the original array.

Here is an idiom that you might see to add an item to the end of an array:

```js
terms[terms.length] = 'method';
```

Will a volunteer please say what is length of `terms` array:

* before calling `push` method to add `'slice'` item
* after calling `push` method to add `'slice'` item
* after assigning `'push'` item

Here is an idiom to get the last item of an array: `terms[terms.length - 1]`

## Object

An object consists of properties. Each **property** has:

* **key**, also known as name, which is a string (or a number converted to a string)
* **value**, which is any type

To make an object using **literal** notation, enclose it in braces.

For example, here is an array of objects:

```js
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
```

You usually refer to a property by **dot** notation:

```js
var item = glossary[0];
var formatted = item.term + ': ' + item.definition;
```

You can use **bracket** notation if the key is the value of a variable:

```js
var key = 'definition';
var value = item[key];
```

Just as the value of an item in an array, the value of a property in an object that doesn’t exist isn’t an error, but `undefined`

### Analogy: array of objects in JavaScript to definition list in HTML

```html
<h2>glossary</h2>

<dl>
  <dt>array</dt>
  <dd>list-like object which consists of items at indexes</dd>
  <dt>item</dt>
  <dd>also known as element: a value in an array</dd>
  <dt>index</dt>
  <dd>the number “address” of an item in an array</dd>
</dl>
```

### Analogy: array of objects in JavaScript to table in HTML

```html
<h2>glossary</h2>

<table>
  <thead>
    <tr>
      <th scope="col">term</th>
      <th scope="col">definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>array</td>
      <td>list-like object which consists of items at indexes</td>
    </tr>
    <tr>
      <td>item</td>
      <td>also known as element: a value in an array</td>
    </tr>
    <tr>
      <td>index</td>
      <td>the number “address” of an item in an array</td>
    </tr>
  </tbody>
</table>
```

### 11_object_prop_dot

Will a volunteer please describe how the `for` loop works step-by-step:

```js
for (var i = 0; i !== glossary.length; i += 1) {
  var item = glossary[i];
  console.log(item.term + ': ' + item.definition);
}
```

You can make a **chain** of bracket and dot notation:

```js
for (var i = 0; i !== glossary.length; i += 1) {
  console.log(glossary[i].term + ': ' + glossary[i].definition);
}
```

### 12_object_find_challenge

Change roles for our next **challenge** to write conditions to find an item.

By the way, we cannot use the `indexOf` method in this case. In Lesson 5 we will learn about another array method which is more clear and concise than the `for if break` loop.

### 13_object_keys_bracket

The [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method returns an array of keys of the [own enumerable] properties of the object which is its argument.

Therefore, `Object.keys(object).length` is the number of properties.

Will a volunteer please share anything you remember from Lesson 1 about JavaScript conventions for lower case and upper case in names?

### 14_typeof_isArray

Because an array is a specialized object, the `typeof` operator doesn’t distinguish arrays from generic objects.

The [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) method returns whether the argument is an array.

### 15_json_challenge

The [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) object has methods to transfer data in JavaScript Object Notation:

* The [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method converts a JSON string to a JavaScript value. For example, convert data after receiving it as a string from a server.
* The [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method converts a JavaScript value to a JSON string. For example, convert data before sending it as a string to a server.

Change roles for our next **challenge** to write conditional expressions to answer questions about properties of objects.

## Array, part 2

### 16_array_concat_challenge

The [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method returns a new array which consists of the items from one or more arrays.

Merge is a synonym for `concat` which is short for concatenate.

Change roles for our next **challenge** to write expressions as described in comments.

### 17_array_reverse

The [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) method changes the order of items in the original array: for example, the first item becomes the last and the last item becomes the first.

Can anyone suggest what is the result of calling the `reverse` method two times?

```js
glossary.reverse();
glossary.reverse();
```

### 18_array_sort_challenge

The [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method changes the order of items in the original array: by default, ascending order according to Unicode code points.

Change roles for our next **challenge** to sort an array in ascending order, and then descending order.

### 19_array_sort_function

Because the default sort order converts items to strings, you can provide an application-specific function to compare objects. In the next three lessons, you will learn to write functions.

For now, you need to understand:

* Functions also have a **literal** notation: `function (/* arguments */) {/* body */}`
* The arguments are **input** to a function.
* The body does the **work** of a function.
* A `return` statement can provide **output** from a function.
* A function can call another function to delegate some of the work. For example, a string has a [localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) method which computes whether it precedes, or follows, or is the same as another string in sort order, according to the current locale.
* A function which you provide as an argument to another function to be called when needed is known as a **callback** function.

```js
glossary.sort(function (itemA, itemB) {
  return itemA.term.localeCompare(itemB.term);
});
```

### 20_array_join_challenge

The [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method returns a string which consists of the items (converted to strings) joined by a joiner string.

* The `slice` and `concat` methods of an array return a new **array**.
* The `join` method of an array returns a **string**.
* Remember the `indexOf` method of an array? Will a volunteer please say which type it returns?

Change roles for our next **challenge** to join items with different joiner strings.

### Homework

### Links to learning resources

**Scan** the following resources for at least 5 minutes each:

* [Grammar and types at Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
* [Array at Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JSON Introduction at w3schools.com](https://www.w3schools.com/js/js_json_intro.asp)

### Analogy: CSS style to object properties

Here are style properties in CSS:

```css
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
```

For which some developers use style objects in React:

```js
var style = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
  width: '100%',
}
```

You change hyphenated property names in CSS to camelCase property keys in JavaScript.

If a CSS value is not a number, enclose it in quote marks to make it a string.

**Write** a style definition in CSS, and then write the equivalent style object in JavaScript.

### Analogy: nodes in Document Object Model (DOM) to objects and arrays

The original purpose of JavaScript data structures was to interact with markup:

```html
<div id="root"><p>JavaScript Application Development</p><!--are you having fun yet?--></div>
```

Here is a simplified representation as objects and arrays:

```js
var node = {
  nodeType: 1, // element
  nodeName: 'DIV',
  attributes: [
    {
      name: 'id',
      value: 'root',
    },
  ],
  childNodes: [
    {
      nodeType: 1, // element
      nodeName: 'P',
      attributes: [],
      childNodes: [
        {
          nodeType: 3, // text
          data: 'JavaScript Application Development',
        },
      ],
    },
    {
      nodeType: 8, // comment
      data: 'are we having fun yet?',
    },
  ],
};
```

In a file on your computer:

1. **Type** a short snippet of HTML within a JavaScript comment: `/* your HTML */`
2. **Type** the equivalent JavaScript object: `var node = { /* properties */ };`
3. Run your file to output the stringified object: `console.log(JSON.stringify(node));`

### Brainstorming from visual wireframe to data wireframe

1. **Pick** a web page or mobile screen with a list of structured information that interests you.

2. **Draw** a wireframe diagram of the visual hierarchy of the page (for example, header, footer, sidebar, main).

3. **Make notes** on your wireframe diagram about data displayed in each area.

    * **Identify** primitive or primary types of data: boolean, number, string
    * **Identify** data structures: array or object

4. **Draw lines** between areas which might have data in common.

5. **Draw arrows** between areas where there is a cause-and-effect interactive relationship: when you do something here, it affects something there.

6. **Look for** any ways that the visual structure does not correspond to the data structure.

7. If you find ways that the visual structure does not correspond to the data structure, **use your imagination** about HTML and CSS (for example, absolute positioning) to decide if the markup structure might correspond more closely to the data structure.

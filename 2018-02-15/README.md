# Lesson 4: Functions, part 2

## Learn git, part 3

* When you commit your changes, notice the **code** like: `269cbcb`

* To display a **list** of commits, type `git log` and then if `:` appears at the end:

    * To see more history, press the space bar
    * To quit, type `q`

* To display a **concise list** of commits, type `git log --oneline`

* To go back to a **previous** commit, type `git checkout <commit>` if you know its code

* To return to the **current** commit, type `git checkout master` if you are on default `master` branch

## Review functions

Will three volunteers please each complete one statement about function **literal**:

* arguments receive …
* body does …
* `return` gives …

Will two more volunteers please each complete one statement about function **name**:

* You can assign a function expression to a …, and then use the … name to call the function
* A name is a required part of a function …

## Learning objectives

1. Rewrite statements as a function **expression** and function **call**.

2. Read code to identify the **scope** of a name.

3. Rewrite code to improve the scope of names in a function **body**.

4. Use **strict mode** to find errors sooner when you run code.

5. Trace a function call into a function body whose scope is a **closure** because that function was returned by a function.

## 01-toString-challenge

In JavaScript, a number has methods including [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) which returns the value as a string.

In different pairs than the last two lessons, edit your copied JavaScript file as our first **challenge**.

1. Pilot:

    * run the example code one time **before** you edit it
    * add `//` at beginning of the middle two `var` lines to make them **comments**
    * in `console.log` replace `numberToString` with function **call**: `getString(fraction)`

2. Navigator: tell your pilot what to type below the comments to define a function **expression**.

    * assign to variable whose name is `getString`
    * argument name is `number`
    * body computes and returns `number.toString();`

```js
var fraction = 1 / 4;

var number = fraction;
var numberToString = number.toString();

// Given a number, return it as a string.

console.log(numberToString);
```

## 02-toFixed-challenge

In JavaScript, a number has methods including [toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) which returns the value as a string in fixed-point notation with a specified number of digits after the decimal point.

Change roles for our second **challenge**.

1. Pilot:

    * run the example code one time **before** you edit it
    * add `//` at beginning of the middle two `var` lines to make them **comments**
    * in `console.log` replace `numberToFixed` with function **call**: `getFixed(fraction)`

2. Navigator: tell your pilot what to type below the comments to define a function **declaration**.

    * function name is `getFixed`
    * argument name is `number`
    * body computes and returns `number.toFixed(3);`

```js
var fraction = 1 / 4;

var number = fraction;
var numberToFixed = number.toFixed(3);

// Given a number, return it as a string with 3 digits after the decimal point.

console.log(numberToFixed);
```

## Scope

The **scope** of a name is the code that can refer to it.

For example, a function **body** can refer to the names whose scope includes it:

* arguments of that function
* variables declared inside the body of that function
* variables declared outside that function

But **not**:

* arguments of other functions
* variables declared in the body of other functions

Lexical scope means that you can **read** code to identify the scope of a name. To resolve a name, JavaScript starts in the immediate scope, and then outer scopes, in order.

In classic non-strict JavaScript in a Web browser:

* The scope of a variable is limited to the innermost **function body** in which it is declared; otherwise it is **global** to all script files.
* The scope of an **undeclared** variable is global to all script files.

Node.js has **module** scope which limits code that can refer to a variable to the file.

## 03-leak-from-outside-in

In JavaScript, a function can return **multiple values** as either an array or an object.

After we run the example together, will three volunteers each do one of the following:

* Identify the **scope** of: `maxDigits` variable, `number` argument, and `fraction` variable.
* Trace the effects of the code from the beginning to the **first** function call, into the function body, and back again.
* Explain why is `getStringAndFixedImpure` an **impure** function?

```js
var maxDigits;

// Compare toString and toFixed methods.
var getStringAndFixedImpure = function (number) {
  return [number.toString(), number.toFixed(maxDigits)];
};

var fraction = 1 / 4;

maxDigits = 3;
console.log(getStringAndFixedImpure(fraction));

maxDigits = 2;
console.log(getStringAndFixedImpure(fraction));

maxDigits = 1;
console.log(getStringAndFixedImpure(fraction));
```

## 04-leak-from-inside-out

After we run the example together, will three volunteers each do one of the following:

* Identify the **scope** of `number` and `maxDigits` arguments.
* Explain why is `getStringAndFixedPure` a **pure** function?
* Explain why do `numberToString` and `numberToFixed` have values outside the function **body**?

```js
// Compare toString and toFixed methods.
var getStringAndFixedPure = function (number, maxDigits) {
  numberToString = number.toString();
  numberToFixed = number.toFixed(maxDigits);

  return [numberToString, numberToFixed];
};

var fraction = 1 / 4;

console.log(getStringAndFixedPure(fraction, 3));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 1));
console.log(getStringAndFixedPure(fraction, 2));
console.log(getStringAndFixedPure(fraction, 3));

console.log(numberToString)
console.log(numberToFixed);
```

## 05-strict-challenge

Use [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) to find some errors sooner when you run code.

For example, strict mode throws `ReferenceError` for an undefined variable.

Change roles for our next **challenge** for pilot to add `'use strict';` on a new line at the beginning of the file, and then run it.

## ESLint

Strict mode is a **dynamic** code quality tool that throws errors **when** you run code.

[ESLint](http://eslint.org/) is a **static** code quality tool that reports errors **before** you run code.

* ES is short for ECMAScript.
* Lint is a geeky analogy from removing lint from screen in clothes dryer to removing mess from code.

Here are some [rules](http://eslint.org/rules/) to report problems related to [variables](https://eslint.org/docs/rules/#variables):

* [no-undef](https://eslint.org/docs/rules/no-undef) disallow undeclared variables
* [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars) disallow unused variables
* [no-use-before-define](https://eslint.org/docs/rules/no-use-before-define) disallow the use of variables before they are defined

## 06-scope-challenge

Change roles for our next **challenge** for pilot to add `var` at the beginning of two lines which have `TODO` comments in the file, and then run it.

The [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator returns a string indicating the type of the **unevaluated** operand.

After you have limited the scope of the variables to the function body:

* If you **refer to** the name outside the function body, strict mode throws `ReferenceError`
* If you need to **test whether** the name is defined, `typeof` operator returns `'undefined'`

```js
console.log(typeof numberToString);
console.log(typeof numberToFixed);
```

Remember this idiom is you write code that runs in different **environments**:

* production code runs in Web browser which defines `window` as a global object
* test of code runs in Node.js which does not define `window` as a global object

## 07-if-challenge

Change roles for our next **challenge** to complete `if` statement in function body:

```js
// Given number, return string with limited precision
// at most maxDigits after the decimal point.
var getStringDigits = function (number, maxDigits) {
  var numberToFixed = number.toFixed(maxDigits);
  var numberToString = number.toString();

  if (/* TODO fixed string length is less than default string length */) {
    // TODO return fixed string
  }

  return numberToString;
};
```

## 08-ternary-challenge

Change roles for our next **challenge** to write ternary expression in function body:

```js
// Given number, return string with limited precision
// at most maxDigits after the decimal point.
var getStringDigits = function (number, maxDigits) {
  var numberToFixed = number.toFixed(maxDigits);
  var numberToString = number.toString();

  return /* TODO fixed string length is less than default string length */
    ? /* fixed string */
    : /* default string */;
};
```

## 09-function-factory

In JavaScript:

* Just as an object literal is a value, so also a function literal is a **value**.
* Just as a function can return an object literal, so also a function can **return** a function literal.

```js
// Given number of digits after the decimal point, return function
// which given number, returns string with limited precision.
var getFixerFunction = function (maxDigits) {
  return function (number) {
    var numberToFixed = number.toFixed(maxDigits);
    var numberToString = number.toString();

    return numberToFixed.length < numberToString.length
      ? numberToFixed
      : numberToString;
  };
};
```

If you assign the returned function to a variable, you can use the variable name to **call** that function:

```js
var fraction = 1 / 4;

var fixer3 = getFixerFunction(3);
console.log(fixer3(fraction));

var fixer2 = getFixerFunction(2);
console.log(fixer2(fraction));
```

You can even **call** the returned function immediately:

```js
console.log(getFixerFunction(1)(fraction));
```

## Closure

Each time you call a function, JavaScript creates a new **closure** of names that its body can refer to:

* **arguments** of that function are “private” to each call
* variables declared **inside** the body of that function are “private” to each call
* variables declared **outside** the body of that function are “shared” by all calls

If a function returns a function, the closure applies to the body of the returned function whenever it is called.

You will apply closure to write **callback** functions which handle events in interactive applications.

In Lesson 5 next week, you will learn to write application-specific callback functions for generic array methods like `filter`, `map`, `reduce`, and `forEach`.

## Homework

* From this lesson: review the example code (especially in-class challenges)
* From this lesson: if we ran out of time for some files, run examples or complete challenges
* From previous lessons: because we ran out of time for some files, run examples or complete challenges

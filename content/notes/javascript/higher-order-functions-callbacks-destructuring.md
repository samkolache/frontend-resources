---
tags: JavaScript
description: Callbacks, higher-order functions, default/rest/spread and destructuring.
---

# Higher-Order Functions, Callbacks, Default/Rest/Spread, Destructuring

## Callbacks

- A callback is a function you pass into another function so it can be called later.

```js
function doTwice(action) {
  action();
  action();
}

doTwice(() => console.log("hi"));
// "hi"
// "hi"
```

## Higher-order functions

- A higher-order function is any function that takes a function or returns a function: a function that works with other functions.
- `doTwice` above is one, because it takes `action`.
- Built-in examples: `map`, `filter`, `reduce`, `forEach`, `setTimeout`, `addEventListener`.

```js
// takes a function
[1, 2, 3].map((n) => n * 2); // [2, 4, 6]

// returns a function
function multiplier(factor) {
  return (n) => n * factor;
}

const double = multiplier(2);
double(5); // 10
```

## Default parameters

- A default value is used when the argument is missing or `undefined`.
- `null` does not trigger the default.

```js
function greet(name = "friend") {
  return `hi ${name}`;
}

greet(); // "hi friend"
greet(undefined); // "hi friend"
greet(null); // "hi null"
```

## Rest operator

- `...args` collects any number of extra arguments into an array.
- It must be the last parameter.

```js
function sum(first, ...rest) {
  return rest.reduce((total, n) => total + n, first);
}

sum(1, 2, 3, 4); // 10 (first = 1, rest = [2, 3, 4])
```

## Spread operator

- `...arr` unpacks an array into separate items.
- Same `...` syntax as rest, opposite job: rest gathers items into an array, spread spreads them out.
- Also works on objects, to copy or merge them. The copy is shallow.

```js
const nums = [1, 2, 3];

Math.max(...nums); // 3
const more = [...nums, 4]; // [1, 2, 3, 4]

const user = { name: "Sam", age: 24 };
const older = { ...user, age: 25 }; // { name: "Sam", age: 25 }
```

## Destructuring

- Destructuring is a shortcut for pulling values out of an object or array into their own variables.

### From an object

- The variable names must match the property names.

```js
const sam = { name: "Sam", age: 24 };

const { name, age } = sam;
console.log(name); // "Sam"
```

### From an array

- You choose the names, because arrays have no property names to match. Values are picked by position.

```js
const fruits = ["Apple", "Banana"];

const [first, second] = fruits;
console.log(first); // "Apple"
```

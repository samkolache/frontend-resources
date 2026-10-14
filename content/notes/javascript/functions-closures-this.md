---
tags: JavaScript
description: Function types, closures, how this is set, and call, apply and bind.
---

# Functions, Closures, This

## Functions

A function is a saved set of instructions you can run whenever you want. You can write one in three ways.

### Function declaration

- Fully hoisted: you can call it before the line where you wrote it.

```js
greet("sam"); // "hi sam"

function greet(name) {
  return `hi ${name}`;
}
```

### Function expression

- A function stored in a variable.
- Follows the hoisting rules of the variable holding it.

```js
const greet = function (name) {
  return `hi ${name}`;
};

greet("sam"); // "hi sam"
```

### Arrow function

- Shorter syntax for a function expression.
- Also follows the rules of the variable holding it, so calling it before a `let` or `const` declaration throws a `ReferenceError`.
- With `var` the variable is `undefined` at that point, so calling it throws a `TypeError` instead.

```js
greet("sam"); // ReferenceError: Cannot access 'greet' before initialization

const greet = (name) => `hi ${name}`;

greet("sam"); // "hi sam"
```

## Closures

- A closure is a function that remembers the variables from the place where it was created, even after that outer function has finished running.
- Normally when a function is done, its local variables are thrown away. When an inner function still uses them, it keeps them alive.

### Top interview question: why does this count up?

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

- `makeCounter` runs once, creates `count` and returns the inner function. `counter` is that inner function.
- `makeCounter` has finished, but the inner function still uses `count`, so `count` is kept alive.
- Every call to `counter()` reads and updates that same `count`, not a fresh one. `let count = 0` does not run again, because only the inner function is being called.
- `count` is private: nothing outside can read or change it except through `counter`.
- Calling `makeCounter()` again creates a new, separate `count`, so two counters do not affect each other.

```js
const a = makeCounter();
const b = makeCounter();
a(); // 1
a(); // 2
b(); // 1
```

## `this`

- `this` means "the object that is running me right now".
- It is decided at the moment of the call, not where the function is written.
- Look at what is in front of the dot when the function is called. That object is `this`.

```js
const sam = {
  name: "sam",
  sayName() {
    return this.name;
  },
};

sam.sayName(); // "sam", sam is in front of the dot
```

### Losing `this`

- Copying a method out of its object does not bring the object with it.
- When the copy is called there is nothing in front of the dot, so there is nothing to tell the function what `this` is.
- `this` is then `undefined` in strict mode (modules, classes), or the global object (`window`) in non-strict code.

```js
const fn = sam.sayName; // copy the function out of sam (no parentheses, so it doesn't run)
fn(); // TypeError: Cannot read properties of undefined (reading 'name')
```

- The same thing happens when a method is passed as a callback: `setTimeout(sam.sayName, 0)`.

### Arrow functions

- An arrow function has no `this` of its own. It uses the `this` of the code around it, based on where it is written.
- This is the exception to "decided at the moment of the call", and `call`, `apply` and `bind` cannot change it.

## `call`, `apply`, `bind`

All three let you choose what `this` is, instead of leaving it to whatever is in front of the dot.

| Method | Runs the function now? | Extra arguments |
| --- | --- | --- |
| `call` | Yes | One by one |
| `apply` | Yes | As one array |
| `bind` | No, returns a new function | One by one, stored for later |

### Function borrowing

- Using a method from one object on another, which keeps code DRY.
- The examples below borrow `sam.introduce` for `alex`, who has no `introduce` method.

```js
const sam = {
  name: "sam",
  introduce(city, job) {
    return `${this.name}, ${job} in ${city}`;
  },
};

const alex = { name: "alex" };
```

### `call`

- Invokes the function immediately and sets `this` to the first argument.
- Additional arguments are passed one by one.
- Syntax: `fn.call(thisArg, arg1, arg2)`

```js
sam.introduce.call(alex, "London", "designer"); // "alex, designer in London"
```

### `apply`

- Invokes the function immediately and sets `this` to the first argument.
- Additional arguments must be passed as an array.
- Syntax: `fn.apply(thisArg, [arg1, arg2])`

```js
sam.introduce.apply(alex, ["London", "designer"]); // "alex, designer in London"
```

### `bind`

- Does not run the function. It returns a new function with `this` permanently set.
- The first argument is the `this` value; additional arguments are stored and passed first when the new function is called.
- Syntax: `const bound = fn.bind(thisArg, arg1)`

```js
const introduceAlex = sam.introduce.bind(alex, "London");
introduceAlex("designer"); // "alex, designer in London"
```

- `bind` is the fix for losing `this`:

```js
const fn = sam.introduce.bind(sam);
fn("Leeds", "engineer"); // "sam, engineer in Leeds"
```

### Remembering which is which

- `call`: arguments separated by **c**ommas.
- `apply`: arguments in an **a**rray.
- `bind`: **b**ound now, called later.

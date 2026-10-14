---
tags: JavaScript
description: var, let and const: scope, hoisting and the temporal dead zone.
---

# Variables (Scope, Hoisting, Temporal Dead Zone)

There are three ways to declare variables in JavaScript: `var`, `let` and `const`.

- `var`: only respects function scope; it ignores block scope. It can be redeclared in the same scope. Reading it before its declaration line gives `undefined`.
- `let`: respects block scope. You can't redeclare it in the same scope. Accessing it before its declaration line throws a `ReferenceError`.
- `const`: same rules as `let`, but it must be given a value when declared and can't be reassigned. An object or array held in a `const` can still be mutated.

```js
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defined
```

## Scope

The area of code where a variable can be seen.

- Global scope: the variable is accessible anywhere.
- Function scope: variables declared inside a function stay in it.
- Block scope: anything inside `{}`, for `let` and `const`.
- Lexical scope: an inner function can see variables from the functions around it, based on where it is written, not where it is called. Foundation of closures.

## Hoisting

Declarations are moved to the top of their scope before any code runs. Nothing is physically moved; the engine registers the declarations before it executes the scope.

- Function declarations are fully hoisted: you can call them before the line where you wrote them.
- `var` is hoisted but empty: it will be `undefined`.
- `let` and `const` are hoisted too but are locked in the Temporal Dead Zone: you will get a `ReferenceError`.
- Function expressions and arrow functions follow the rule of the variable they are assigned to.

```js
greet(); // "hi"
console.log(x); // undefined
console.log(y); // ReferenceError: Cannot access 'y' before initialization

function greet() {
  console.log("hi");
}
var x = 1;
let y = 2;
```

## Temporal Dead Zone

The time between entering a scope and the line where a `let` or `const` is declared. Accessing the variable during that time throws a `ReferenceError`.

## Why does `var` in a loop print 3 3 3?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2
```

- `var` ignores block scope, so there is only one `i` for the whole loop, and all three callbacks share it.
- The callbacks run after the loop has finished, even with a delay of `0`. By then that one `i` is `3`, so each prints `3`.
- `let` is block scoped, and a `for` loop creates a new `i` for every iteration. Each callback closes over its own `i`, so they print `0 1 2`.
- A closure captures the variable, not a copy of its value. `let` works here because there are three separate variables, not because the value is snapshotted.

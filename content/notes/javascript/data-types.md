---
tags: JavaScript
description: undefined vs null, primitives vs objects, equality and type coercion.
---

# Data Types

## `undefined` and `null`

- `undefined`: a variable with no value yet.
- `null`: intentionally empty.
- Using the `typeof` operator on `null` gives `"object"`, a bug that never got fixed.

```js
let a;
console.log(a); // undefined

let b = null;
console.log(typeof b); // "object"
console.log(typeof a); // "undefined"
```

## Primitives vs objects

- Primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`. Everything else is an object, including arrays and functions.
- Primitives get copied while objects get shared.
- When you declare an object, the variable points to that object in memory. Assigning it to another variable copies the pointer, not the object, so both variables see a change made through either one.
- Reassigning a variable only points that variable somewhere else; the other is unaffected.

```js
let x = 1;
let y = x;
y = 2;
console.log(x); // 1, the value was copied

let a = { name: "sam" };
let b = a;
b.name = "alex";
console.log(a.name); // "alex", a and b point to the same object

b = 33;
console.log(a); // { name: "alex" }, only b was repointed
```

## `==` vs `===`

- `===` is strict: compares value and type, no conversion.
- `==` is loose: converts types first, then compares. This can give weird results.

```js
1 === "1"; // false
1 == "1"; // true

0 == ""; // true
0 == "0"; // true
"" == "0"; // false
null == undefined; // true
null === undefined; // false
```

## Type coercion

- With `+`, if either side is a string, the string wins and the other side is converted to a string.
- It is evaluated left to right, so numbers before the first string are still added.
- The other arithmetic operators (`-`, `*`, `/`) convert strings to numbers instead.

```js
"10" + 5; // "105"
1 + 2 + "3"; // "33"
"10" - 5; // 5
```

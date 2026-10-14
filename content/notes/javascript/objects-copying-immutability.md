---
tags: JavaScript
description: Object.keys, values and entries, shallow vs deep copies, and freezing objects.
---

# Object Methods, Copying and Immutability

## Turning an object into an array

- Objects don't have `map`, `filter` and the other array methods.
- To use them, turn the object into an array first with one of these static methods:

```js
const user = { name: "Sam", age: 20, city: "Austin" };

Object.keys(user); // ["name", "age", "city"]
Object.values(user); // ["Sam", 20, "Austin"]
Object.entries(user); // [["name", "Sam"], ["age", 20], ["city", "Austin"]]
```

- `Object.entries` gives an array of `[key, value]` pairs.
- `Object.fromEntries` turns pairs back into an object:

```js
const strings = Object.fromEntries(
  Object.entries(user).map(([key, value]) => [key, String(value)])
);
// { name: "Sam", age: "20", city: "Austin" }
```

## Shallow and deep copies

### Shallow copy

- Spread (`{ ...obj }`) only copies the top level.
- If the object holds another object, the copy gets the same reference (the "arrow" pointing at that inner object), not a new object.
- Changing the inner object through the copy changes the original too.

```js
const user = { name: "Sam", address: { city: "Austin" } };
const copy = { ...user };

copy.name = "Alex";
user.name; // "Sam", top level was copied

copy.address.city = "Dallas";
user.address.city; // "Dallas", inner object is shared
```

### Deep copy

- Copies everything, all the way down, so nothing is shared.
- Use `structuredClone()`.

```js
const deep = structuredClone(user);

deep.address.city = "Houston";
user.address.city; // "Dallas", unchanged
```

- `structuredClone` throws on functions and DOM nodes.

## Immutability

- Immutable means the value can't be changed after it is created.
- `const` does not make an object immutable. It only stops the variable being pointed at a different value.
- `Object.freeze` stops properties being added, removed or changed, but it is shallow too.

```js
const user = { name: "Sam" };
user.name = "Alex"; // allowed, const doesn't stop this

const frozen = Object.freeze({ name: "Sam", address: { city: "Austin" } });
frozen.name = "Alex"; // ignored (TypeError in strict mode)
frozen.address.city = "Dallas"; // allowed, inner object isn't frozen
```

- In React, state is treated as immutable: make a new object with spread instead of changing the old one, so React can see it changed.

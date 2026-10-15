---
tags: JavaScript
description: Set for unique values, Map for key-value pairs with any type of key.
---

# Set and Map

## Set

- A collection of unique values that refuses duplicates.

```js
const tags = new Set(["js", "css"]);

tags.add("html"); // Set { "js", "css", "html" }
tags.add("js"); // already there, ignored

tags.has("css"); // true
tags.delete("css"); // true (it was removed)
tags.size; // 2
```

- `.add(value)` adds a value.
- `.has(value)` checks if a value exists and returns a boolean.
- `.delete(value)` removes a value and returns `true` if it was there.
- `.size` is the number of items. It is a property, not a method, so there are no `()`.

### Removing duplicates from an array

```js
const nums = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(nums)];
// [1, 2, 3]
```

### Set vs array lookups

- `.has` is fast: it jumps straight to the value, so it takes about the same time however big the Set is (O(1)).
- The array method `.includes` has to scan item by item until it finds a match, so it gets slower as the array grows (O(n)).
- For a small array the difference doesn't matter. It matters when you check many values against a big list.

```js
const bannedIds = new Set([4, 8, 15, 16, 23, 42]);

bannedIds.has(15); // true, no scan
[4, 8, 15, 16, 23, 42].includes(15); // true, scans 4 then 8 then 15
```

## Map

- A collection of key-value pairs, like an object, but a key can be any type: a number, an object, even a function.

```js
const ages = new Map([
  ["Sam", 24],
  ["Alex", 30],
]);

ages.set("Jo", 19); // adds or updates a key
ages.get("Sam"); // 24
ages.get("Nobody"); // undefined
ages.has("Alex"); // true
ages.delete("Alex"); // true (it was removed)
ages.size; // 2
```

- `.set(key, value)` adds a pair, or updates the value if the key already exists.
- `.get(key)` returns the value, or `undefined` if the key isn't there.
- `.has(key)` checks if a key exists and returns a boolean.
- `.delete(key)` removes a pair and returns `true` if it was there.
- `.size` is the number of pairs.

### Map vs object

- Object keys are always strings (or symbols); `obj[1]` and `obj["1"]` are the same key. Map keeps the key's type.
- A Map can use an object as a key, e.g. to store data about a DOM element.
- Map has `.size`; an object needs `Object.keys(obj).length`.
- Map keeps insertion order and is built for frequent adding and removing.

```js
const button = document.querySelector("button");
const clicks = new Map();

clicks.set(button, 0); // object as a key
clicks.get(button); // 0
```

### Looping

- Sets and Maps both work with `for...of` and `forEach`, in insertion order.

```js
for (const [name, age] of ages) {
  console.log(name, age);
}
// "Sam" 24
// "Jo" 19
```

---
tags: JavaScript
description: forEach, map, filter, find, some, every, reduce and sort.
---

# Array Methods

- These array methods all take a callback, which runs once per item.
- Every example below uses the same array:

```js
const nums = [1, 2, 3, 4, 5];
```

## forEach

- Does something with each item.
- Returns nothing (`undefined`), so you can't chain off it.

```js
nums.forEach((n) => console.log(n));
// 1
// 2
// 3
// 4
// 5
```

## map

- Does something to each item and returns a new array of the results.
- The new array is always the same length as the original.

```js
const doubled = nums.map((n) => n * 2);
// [2, 4, 6, 8, 10]
```

## filter

- Keeps or removes each item: return `true` to keep it, `false` to drop it.
- Returns a new array, which can be shorter than the original.

```js
const evens = nums.filter((n) => n % 2 === 0);
// [2, 4]
```

## find

- Gets the first match and returns only that item, not an array.
- Returns `undefined` if nothing matches.

```js
nums.find((n) => n > 2); // 3
nums.find((n) => n > 10); // undefined
```

## some and every

- Yes or no questions about the array; both return a boolean.
- `some`: is there at least one?
- `every`: do all of them pass?

```js
nums.some((n) => n > 4); // true (5 is)
nums.every((n) => n > 4); // false (1 to 4 aren't)
nums.every((n) => n > 0); // true
```

## reduce

- Boils the whole array down to one value.
- It walks through the array carrying a running total, called the accumulator.
  - `acc`: the running total.
  - `n`: the current item.
  - `0`: the starting value of `acc`.

```js
const total = nums.reduce((acc, n) => acc + n, 0);
// 15
```

| Step | `acc` | `n` | Returns |
| --- | --- | --- | --- |
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 |
| 5 | 10 | 5 | 15 |

## sort

- Reorders the array using a compare function.
- It mutates the original array, so copy it first with spread.
  - `(a, b) => a - b` gives smallest first.
  - `(a, b) => b - a` gives largest first.

```js
const largestFirst = [...nums].sort((a, b) => b - a);
// [5, 4, 3, 2, 1]

nums; // [1, 2, 3, 4, 5], unchanged
```

- Without a compare function, items are compared as strings, so numbers sort wrongly:

```js
[1, 10, 2].sort(); // [1, 10, 2]
[1, 10, 2].sort((a, b) => a - b); // [1, 2, 10]
```

- `nums.toSorted((a, b) => b - a)` returns a sorted copy without the spread.

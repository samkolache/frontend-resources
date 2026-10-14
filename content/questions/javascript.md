---
tags: JavaScript
description: Closures, equality, this and debounce vs throttle.
---

# JavaScript

## What is a closure?

A function plus the variables in scope where it was created. It keeps access to those variables after the outer function has returned.

## `==` vs `===`?

`==` coerces types before comparing; `===` does not. Use `===` except for the `x == null` check, which matches both `null` and `undefined`.

## What does `this` refer to in an arrow function?

Whatever `this` was in the enclosing scope when the arrow function was defined. It cannot be rebound with `call`, `apply` or `bind`.

## Debounce vs throttle?

- **Debounce**: run once after calls stop for N ms (search input).
- **Throttle**: run at most once every N ms (scroll handler).

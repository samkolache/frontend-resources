---
tags: JavaScript
description: Run a function once calls stop for a set time, with cancel.
---

# Debounce

- Each call resets the timer; `fn` runs once, `wait` ms after the last call.
- Regular `function` (not arrow) for `debounced` so the caller's `this` is forwarded.
- Follow-ups: leading-edge option, `flush()`, returning a promise.

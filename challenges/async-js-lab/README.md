---
tags: JavaScript
description: Staged async JavaScript lab: promises, fetch, errors, retries, debounce.
---

# Async JS Lab

## Project brief

Add an "Async JS Lab" section to my existing interview-prep SPA. Follow the SPA's existing stack, routing, styling, and file conventions (inspect the codebase first). Keep the async logic in PLAIN JavaScript, with no helper libraries, since the goal is for me to write and understand the async code.

### Purpose

A staged learning lab. I implement each stage's function myself; the app provides the UI and a test harness that shows pass/fail. Do NOT write the solutions. Leave each stage's function as a stub that throws "not implemented".

### Data source

GitHub REST API, no key: `GET https://api.github.com/users/{username}`

- 404 for unknown users (fetch does not reject on 404; `response.ok` is false)
- 60 req/hr/IP unauthenticated: add a small in-memory cache so repeated lookups of the same username don't count against the limit, and show a friendly message if a 403/429 rate-limit response comes back.

### UI (one page, minimal)

- Search input + button, a result card (avatar, name, bio, public_repos, followers), a loading state, and an error state
- A "Stages" sidebar or tabs, one per stage below
- Each stage shows: the goal, a code stub file I edit, a "Run" button, and a results panel (output log, pass/fail checks, elapsed time in ms)

### Stages

Each is a stub in its own file, e.g. `stage1-delay.js` ... `stage9-debounce.js`.

1. `delay(ms)` -> returns a Promise that resolves after ms. Checks: resolves after ~ms (±30ms), returns a Promise.
2. `getUser(username)` using fetch + `.then` chaining -> resolves to parsed JSON.
3. `getUser` rewritten with async/await (same checks as stage 2).
4. Error handling: `getUser` must reject with a clear Error for a 404 (check `response.ok`) and for a network failure. Use try/catch in the caller. Test with username `this-user-should-not-exist-9f3k2` and with simulated offline (fetch wrapper that throws).
5. Load 5 users two ways: sequentially (await in a loop) and in parallel (`Promise.all`). Display both elapsed times side by side. Use a fixed list of 5 well-known usernames.
6. `Promise.allSettled`: load a list containing one bad username; the good ones must still render, the bad one shows an inline error.
7. Timeout with `Promise.race`: `withTimeout(promise, ms)` rejects if the promise takes longer than ms. Test with a fake slow function (delay-based), not the real network.
8. Retry with exponential backoff: `retry(fn, attempts, baseDelayMs)`. Provide a fake flaky function that fails N times then succeeds, so the checks are deterministic. Show each attempt and wait time in the log.
9. Debounce: `debounce(fn, wait)` wired to the search input so it fetches only after the user stops typing. Show a counter of keystrokes vs. actual calls.

### Extra: event loop puzzles

A separate "Predict the output" panel with ~6 snippets mixing `console.log`, `setTimeout`, `Promise.then`, and async/await. User types the predicted order, and the app reveals the real order (run the snippet and capture the log).

## Implementation requirements

- Stage progress is saved (localStorage or whatever the SPA already uses)
- A "Show hint" button per stage; no solutions shipped in the repo
- Runs entirely client-side, no backend
- Don't mutate the user's stage files from the app; they edit them in their editor

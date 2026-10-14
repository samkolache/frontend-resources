---
tags: React, Accessibility
description: Search input with debounced, race-safe suggestions and full keyboard support.
---

# Autocomplete

**Prompt:** build a search input that suggests results as the user types.

- Debounce requests while typing.
- Ignore responses that arrive out of order.
- Keyboard: ↑/↓ to move, Enter to select, Escape to close.
- Accessible: combobox + listbox roles, `aria-activedescendant`.

**Things to mention**

- Stale responses are dropped with a flag in the effect cleanup; `AbortController` would also cancel the request.
- `onMouseDown` + `preventDefault` on options stops the input blurring before the click lands.
- Extensions: result caching, highlighting the match, loading/empty/error states, virtualised list.

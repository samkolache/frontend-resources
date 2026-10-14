---
tags: HTML
description: Links: accessibility, new tabs, skip links and hover/focus states.
---

# `<a>` - Anchor Element

- Creates a hyperlink to anything a URL can address: web pages, files, email addresses (`mailto:`), phone numbers (`tel:`), or a spot on the same page (`#id`).
- The content inside the tag should tell the user where the link goes.
- `href` is an attribute, and it is what makes an `<a>` a real link. With it, the link can be reached with Tab and pressing Enter follows it.
- Without `href`, the `<a>` is not focusable and is not announced as a link.
- Space does not activate a link. That is button behaviour.

## Accessibility

### Link text

- Use strong link text: the words inside the link should say where it goes.
- Weak text: "Click here", "here", "more".
- Why it matters: screen reader users often pull up a list of every link on the page, so each one is read with no surrounding sentence.

### Link or button?

- Link: goes to a URL.
- Button: does something on the current page (open a modal, submit, toggle).
- If there is no real URL to go to, use a `<button>`, not `<a href="#">` or an `<a>` with a click handler.

### Links that open a new tab

- Tell the user before they click, for example "(opens in new tab)" in the link text.
- Why: a new tab is an unexpected change of context and the Back button stops working. That is disorienting for screen reader users, people using screen magnification and people with cognitive disabilities.
- If an icon is the only thing signalling it, the icon needs a text alternative:
  - `<img>`: use the `alt` attribute.
  - Inline `<svg>`: there is no `alt`; use `role="img"` with `aria-label`, or visually hidden text next to it.
- If the text already says it and the icon is decoration, hide the icon with `aria-hidden="true"` instead.
- Current browsers treat `target="_blank"` as `rel="noopener"` automatically; older code adds `rel="noopener noreferrer"` by hand.

```html
<a href="https://example.com/report.pdf" target="_blank" rel="noopener">
  Annual report (opens in new tab)
</a>
```

### Skip links

- A link that is the first focusable thing on the page and jumps past repeated content (header, nav) to the main content.
- Hidden with CSS until it receives focus.
- Move it off-screen to hide it. `display: none` and `visibility: hidden` take it out of the tab order, so it could never be focused.
- Helps keyboard and screen reader users, who would otherwise tab through the whole nav on every page.

```html
<a class="skip-link" href="#main">Skip to main content</a>
<!-- header, nav -->
<main id="main">...</main>
```

```css
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}

.skip-link:focus {
  transform: translateY(0);
}
```

## States

- Every interactive element needs a visible style for each state it can be in. Links are no different.
- Link states: `:link` (unvisited), `:visited`, `:hover`, `:focus` / `:focus-visible`, `:active`.
- Hover and focus are the two most important.
  - Hover: the pointer is over the link.
  - Focus: the keyboard is on the link.
- When the rules have the same specificity, write them in the order link, visited, hover, focus, active, or later ones get overridden.

### `:focus` vs `:focus-visible`

- `:focus` matches whenever the link has focus, including right after a mouse click.
- `:focus-visible` matches only when the browser decides a focus indicator is needed, which in practice is keyboard navigation.
- Put focus rings on `:focus-visible` so keyboard users get them and mouse users don't see a ring on click.
- Never remove the default outline without replacing it with something just as visible.

### What to change

- Hover: a different shade of the link colour is enough.
- Focus: add an outline or ring as well. A small colour shift on its own is easy to miss.
- Links inside body text should not be marked by colour alone; keep the underline.

```css
a:hover {
  color: #3730a3;
}

a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

---
name: new-entry
description: Scaffold a new entry in this interview-prep repo — a note, a set of questions, a snippet, or a challenge — in the right folder with the right format, title and tags. Use when the user asks to add, create, scaffold or start a note, question(s), trivia, snippet or challenge, or pastes content and asks for it to be turned into one.
argument-hint: "<note|questions|snippet|challenge> <name> [what it should contain]"
---

# New entry

Create one entry in this repo from what the user describes: `$ARGUMENTS`

The site builds its pages from files, so an entry appears as soon as its file exists. The only thing that ever needs registering is a challenge's live demo.

## 1. Work out what is being asked for

- **Type**: note, questions, snippet or challenge. If the user didn't say, infer it from the content (see the table). Ask only if it is truly ambiguous.
- **Name**: becomes the slug (lowercase, hyphenated, e.g. `anchor-element`) and the title.
- **Tags**: use the ones the user gave. If they gave none, pick one or two, reusing existing tags where they fit (`grep -rh "^tags:" content snippets challenges`). Tags are capitalised the way the technology is: `HTML`, `CSS`, `JavaScript`, `React`, `Accessibility`.
- **Content**: whatever the user told you it needs to have. Do not pad it with sections they didn't ask for.

| Type | It is this when… | Goes in |
| --- | --- | --- |
| Note | reference material on one topic | `content/notes/<topic>/<slug>.md` |
| Questions | short question-and-answer or trivia items | `content/questions/<topic>.md` |
| Snippet | a small standalone function or utility | `snippets/<slug>/` |
| Challenge | a "build an X" exercise with a UI | `challenges/<slug>/` |

`<topic>` is the broad area as a lowercase folder or file name: `html`, `css`, `javascript`, `react`, `accessibility`, `performance`. Reuse an existing one when it fits.

## 2. Rules for every markdown file

```md
---
tags: HTML, Accessibility
description: One line shown on the entry's card on the home page.
---

# Page title

Body starts here.
```

- `description` is one plain sentence of under about 80 characters saying what the entry covers. Write one if the user didn't give it.
- The frontmatter block is first, then a blank line, then exactly one `# Title` line. That line is the page title and the name on the home page; it is not a section heading.
- Sections use `##`, sub-sections `###`.
- List items need `- ` at the start. Lines separated by a single newline merge into one paragraph.
- Wrap HTML tags in backticks, including in the title (`` # `<a>` - Anchor Element ``), or the raw file shows them as real HTML.
- Fenced code blocks name their language (```` ```css ````) so they get syntax highlighting.

## 3. Per type

### Note

- One file, `content/notes/<topic>/<slug>.md`.
- Write notes, not a blog post: short bullets, small code examples, no introductions or conclusions.
- When the user supplies the content, keep their structure and wording where it is correct. Proofread it, fix anything factually wrong, and tell them each correction afterwards with the reason. Say separately what you added that they didn't write.

### Questions

- One file per topic, `content/questions/<topic>.md`. If the file exists, append to it; don't create a second file for the same topic.
- Each question is a `## ` heading and the answer is everything under it until the next `## `. The page shows each as a click-to-reveal card.
- Never use `## ` inside an answer; it would start a new card.
- Keep answers to what you would say out loud in an interview: two or three sentences, or a short list.

```md
## What is a closure?

A function plus the variables in scope where it was created.
```

### Snippet

- Folder `snippets/<slug>/` containing:
  - `<slug>.ts`: the implementation, with a named export.
  - `<slug>.test.ts`: Vitest tests (`import { expect, test, vi } from "vitest"`). Cover the main behaviour and the edge cases an interviewer would ask about.
  - `README.md`: frontmatter, title, then three to five bullets on how it works, the gotchas and common follow-up questions.
- Run `npm test` and make sure it passes.

### Challenge

- Folder `challenges/<slug>/` containing:
  - `README.md`: frontmatter, title, a `## Project brief` section and a `## Implementation requirements` bullet list. When the user pastes a brief, keep its wording and only add the markdown syntax.
  - `solution/<Name>.tsx` and `solution/<Name>.module.css`: the component, default-exported, PascalCase file name. Add `"use client"` only if it has state, effects or event handlers.
  - `assets/`: images and other binary files. Never put them in `solution/`; the site prints every file in `solution/` as source code.
- Register the live demo in `challenges/registry.ts`: import the component and add `"<slug>": Name` to `demos`.
- **The user builds challenges themselves.** By default create a minimal placeholder component that renders and compiles, and stop there. Write the full solution only when they ask for it.
- When moving in code the user wrote elsewhere, port it as it is and keep any `REVIEW` comments on the lines they refer to. Do not fix open review items; those are the user's practice.
- A component that needs its own font loads it with `next/font` inside the component, so the rest of the site is unaffected.
- A plain `<a>` pointing at a site route fails lint; placeholder links use `href="#"`.

## 4. Check and report

1. Run `npm run lint` and `npm run build`. Both must pass. Read the note in `AGENTS.md` before changing any Next.js code.
2. Tell the user, briefly:
   - the file(s) created and the URL the entry will be at (`/notes/<topic>/<slug>`, `/questions/<topic>`, `/snippets/<slug>`, `/challenges/<slug>`);
   - the tags you used;
   - any corrections you made to their content, and anything you added;
   - for a challenge, what is left for them to build.
3. Do not commit unless asked.

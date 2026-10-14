# Frontend Prep

Working solutions, snippets and notes for frontend interviews, published as a site.

```bash
npm run dev    # http://localhost:3000/resources
npm test       # snippet and challenge tests
```

## Adding content

Nothing needs registering except a challenge's live demo. A leading `# Title` line names the page; without one the file or folder name is used.

To tag an entry, put this at the very top of its `.md` file (the `README.md` for snippets and challenges). Tags show on the home page and each one gets a `/tags/<tag>` page.

```md
---
tags: HTML, Accessibility
---
```

| Type | Where | What to write |
| --- | --- | --- |
| Note | `content/notes/<topic>/<slug>.md` | Bullets and code blocks. |
| Questions | `content/questions/<topic>.md` | One `## question` heading per card, answer underneath. |
| Snippet | `snippets/<slug>/` | Source file(s), a `*.test.ts`, optional `README.md` with key points. |
| Challenge | `challenges/<slug>/` | `README.md` (prompt and talking points), `solution/`, optional `starter/` to re-attempt from. Add the demo component to `challenges/registry.ts`. |

## Layout

- `content/`, `snippets/`, `challenges/`: the material itself.
- `lib/content.ts`: reads those folders.
- `app/`: the site that renders them.

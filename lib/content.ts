import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NOTES_DIR = path.join(ROOT, "content/notes");
const QUESTIONS_DIR = path.join(ROOT, "content/questions");
const SNIPPETS_DIR = path.join(ROOT, "snippets");
const CHALLENGES_DIR = path.join(ROOT, "challenges");

export type SourceFile = { name: string; code: string };
export type Entry = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};
export type CodeEntry = Entry & { readme: string; files: SourceFile[] };
export type EntryKind = "Challenge" | "Snippet" | "Note" | "Questions";
export type ResolvedTag = { name: string; slug: string; color: string };
export type TaggedEntry = {
  kind: EntryKind;
  href: string;
  title: string;
  description: string;
  tags: string[];
};

function subdirs(dir: string) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function markdownSlugs(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -3))
    .sort();
}

function read(file: string) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

function humanize(slug: string) {
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Optional frontmatter block at the top of a file: "---\ntags: HTML, CSS\n---".
function parseTags(frontmatter: string) {
  const line = frontmatter.match(/^tags:\s*(.*)$/m);
  if (!line) return [];
  return line[1]
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function parseDescription(frontmatter: string) {
  const line = frontmatter.match(/^description:\s*(.*)$/m);
  return line ? line[1].trim().replace(/^["']|["']$/g, "") : "";
}

// A leading "# Title" line names the entry; without one the slug is used.
function parseDoc(markdown: string | null, slug: string) {
  let text = (markdown ?? "").trimStart();
  let tags: string[] = [];
  let description = "";

  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (frontmatter) {
    tags = parseTags(frontmatter[1]);
    description = parseDescription(frontmatter[1]);
    text = text.slice(frontmatter[0].length).trimStart();
  }

  const heading = text.match(/^#\s+(.+)\n?/);
  return heading
    ? {
        // Backticks are kept; TitleText renders them as code.
        title: heading[1].trim(),
        body: text.slice(heading[0].length),
        description,
        tags,
      }
    : { title: humanize(slug), body: text, description, tags };
}

function fileRank(name: string) {
  if (name.includes(".test.")) return 3;
  if (name.endsWith(".css")) return 2;
  return name.endsWith(".tsx") ? 0 : 1;
}

function sourceFiles(dir: string): SourceFile[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== "README.md")
    .map((entry) => entry.name)
    // Components first, then other code, styles, tests.
    .sort((a, b) => fileRank(a) - fileRank(b) || a.localeCompare(b))
    .map((name) => ({
      name,
      code: fs.readFileSync(path.join(dir, name), "utf8"),
    }));
}

/* Notes: content/notes/<topic>/<slug>.md */

export function getNotes() {
  return subdirs(NOTES_DIR).flatMap((topic) =>
    markdownSlugs(path.join(NOTES_DIR, topic)).map((slug) => {
      const doc = parseDoc(read(path.join(NOTES_DIR, topic, `${slug}.md`)), slug);
      return {
        topic,
        slug,
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
      };
    }),
  );
}

export function getNote(topic: string, slug: string) {
  if (!getNotes().some((note) => note.topic === topic && note.slug === slug)) {
    return null;
  }
  return parseDoc(read(path.join(NOTES_DIR, topic, `${slug}.md`)), slug);
}

/* Questions: content/questions/<topic>.md, one "## question" heading per card */

function parseQuestions(markdown: string) {
  return markdown
    .split(/^##\s+/m)
    .slice(1)
    .map((chunk) => {
      const newline = chunk.indexOf("\n");
      return newline === -1
        ? { question: chunk.trim(), answer: "" }
        : {
            question: chunk.slice(0, newline).trim(),
            answer: chunk.slice(newline + 1).trim(),
          };
    });
}

export function getQuestionTopics() {
  return markdownSlugs(QUESTIONS_DIR).map((topic) => {
    const doc = parseDoc(read(path.join(QUESTIONS_DIR, `${topic}.md`)), topic);
    return {
      topic,
      title: doc.title,
      description: doc.description,
      tags: doc.tags,
      count: parseQuestions(doc.body).length,
    };
  });
}

export function getQuestions(topic: string) {
  if (!markdownSlugs(QUESTIONS_DIR).includes(topic)) return null;
  const doc = parseDoc(read(path.join(QUESTIONS_DIR, `${topic}.md`)), topic);
  return {
    title: doc.title,
    tags: doc.tags,
    questions: parseQuestions(doc.body),
  };
}

/* Snippets: snippets/<slug>/ with source files and an optional README.md */

function codeEntries(root: string): Entry[] {
  return subdirs(root).map((slug) => {
    const doc = parseDoc(read(path.join(root, slug, "README.md")), slug);
    return {
      slug,
      title: doc.title,
      description: doc.description,
      tags: doc.tags,
    };
  });
}

function codeEntry(root: string, slug: string, sourceDir: string) {
  if (!subdirs(root).includes(slug)) return null;
  const dir = path.join(root, slug);
  const doc = parseDoc(read(path.join(dir, "README.md")), slug);
  return {
    slug,
    title: doc.title,
    description: doc.description,
    tags: doc.tags,
    readme: doc.body,
    files: sourceFiles(path.join(dir, sourceDir)),
  };
}

export function getSnippets(): Entry[] {
  return codeEntries(SNIPPETS_DIR);
}

export function getSnippet(slug: string): CodeEntry | null {
  return codeEntry(SNIPPETS_DIR, slug, ".");
}

/* Challenges: challenges/<slug>/ with README.md, solution/ and optional starter/ */

export function getChallenges(): Entry[] {
  return codeEntries(CHALLENGES_DIR);
}

export function getChallenge(slug: string): CodeEntry | null {
  return codeEntry(CHALLENGES_DIR, slug, "solution");
}

/* Tags: set in frontmatter, shared across every kind of entry */

export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllEntries(): TaggedEntry[] {
  return [
    ...getChallenges().map(({ slug, title, description, tags }) => ({
      kind: "Challenge" as const,
      href: `/challenges/${slug}`,
      title,
      description,
      tags,
    })),
    ...getSnippets().map(({ slug, title, description, tags }) => ({
      kind: "Snippet" as const,
      href: `/snippets/${slug}`,
      title,
      description,
      tags,
    })),
    ...getNotes().map(({ topic, slug, title, description, tags }) => ({
      kind: "Note" as const,
      href: `/notes/${topic}/${slug}`,
      title,
      description,
      tags,
    })),
    ...getQuestionTopics().map(({ topic, title, count, description, tags }) => ({
      kind: "Questions" as const,
      href: `/questions/${topic}`,
      title: `${title} (${count})`,
      description,
      tags,
    })),
  ];
}

export function getTags() {
  const tags = new Map<string, { slug: string; name: string; count: number }>();
  for (const entry of getAllEntries()) {
    for (const name of entry.tags) {
      const slug = tagSlug(name);
      const tag = tags.get(slug) ?? { slug, name, count: 0 };
      tag.count += 1;
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// Portfolio palette first (brick, navy, ochre, ink), then muted extras in the same family.
// Tags take colours in alphabetical order, so each one is unique until the list runs out.
const TAG_COLORS = [
  "#b8382a",
  "#2b57a3",
  "#c97a2e",
  "#15130f",
  "#3f7d4e",
  "#7b4b94",
  "#0f7c8c",
  "#8a6d1d",
];

export function resolveTags(names: string[]): ResolvedTag[] {
  const all = getTags();
  return names.map((name) => {
    const slug = tagSlug(name);
    const index = Math.max(
      all.findIndex((tag) => tag.slug === slug),
      0,
    );
    return { name, slug, color: TAG_COLORS[index % TAG_COLORS.length] };
  });
}

export function getEntriesByTag(slug: string) {
  return getAllEntries().filter((entry) =>
    entry.tags.some((tag) => tagSlug(tag) === slug),
  );
}

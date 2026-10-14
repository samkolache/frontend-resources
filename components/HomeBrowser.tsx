"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { EntryKind, ResolvedTag } from "@/lib/content";
import TagList from "./TagList";
import TitleText from "./TitleText";

export type BrowserEntry = {
  kind: EntryKind;
  href: string;
  title: string;
  description: string;
  tags: ResolvedTag[];
};

const KINDS: { kind: EntryKind; label: string }[] = [
  { kind: "Challenge", label: "Challenges" },
  { kind: "Snippet", label: "Snippets" },
  { kind: "Note", label: "Notes" },
  { kind: "Questions", label: "Questions" },
];

export default function HomeBrowser({
  entries,
  tags,
}: {
  entries: BrowserEntry[];
  tags: (ResolvedTag & { count: number })[];
}) {
  const [kind, setKind] = useState<EntryKind | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const visible = entries.filter(
    (entry) =>
      (kind === null || entry.kind === kind) &&
      (tag === null || entry.tags.some(({ slug }) => slug === tag)),
  );

  return (
    <div className="home">
      <aside className="sidebar">
        <nav className="sidebar-group" aria-label="Filter by type">
          <h2>Browse</h2>
          <ul>
            <li>
              <button
                type="button"
                aria-pressed={kind === null}
                onClick={() => setKind(null)}
              >
                All <span className="count">{entries.length}</span>
              </button>
            </li>
            {KINDS.map((item) => (
              <li key={item.kind}>
                <button
                  type="button"
                  aria-pressed={kind === item.kind}
                  onClick={() => setKind(item.kind)}
                >
                  {item.label}{" "}
                  <span className="count">
                    {entries.filter((entry) => entry.kind === item.kind).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="sidebar-group" aria-label="Filter by tag">
          <h2>Tags</h2>
          <ul>
            {tags.map(({ name, slug, color, count }) => (
              <li key={slug}>
                <button
                  type="button"
                  aria-pressed={tag === slug}
                  style={{ "--tag-color": color } as CSSProperties}
                  // Clicking the active tag again clears it.
                  onClick={() => setTag(tag === slug ? null : slug)}
                >
                  <span className="swatch" aria-hidden="true" />
                  {name} <span className="count">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div>
        <div className="results-bar">
          <p className="hint" role="status">
            {visible.length === 0
              ? "Nothing matches those filters."
              : `Showing ${visible.length} of ${entries.length}`}
          </p>
          {(kind !== null || tag !== null) && (
            <button
              type="button"
              className="button"
              onClick={() => {
                setKind(null);
                setTag(null);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
        <ul className="grid">
          {visible.map((entry) => (
            <li
              key={entry.href}
              className="entry-card"
              style={
                { "--tag-color": entry.tags[0]?.color ?? "#15130f" } as CSSProperties
              }
            >
              {/* Placeholder until real images are added: one Bauhaus shape per kind. */}
              <div className="thumb" data-kind={entry.kind} aria-hidden="true">
                <span className="shape" />
                <span className="thumb-label">{entry.kind}</span>
              </div>
              <div className="entry-card-body">
                <h3>
                  {/* The ::after on this link covers the whole card; tag links sit above it. */}
                  <Link href={entry.href}>
                    <TitleText>{entry.title}</TitleText>
                  </Link>
                </h3>
                {entry.description && <p>{entry.description}</p>}
                <TagList tags={entry.tags} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

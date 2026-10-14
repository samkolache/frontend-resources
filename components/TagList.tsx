import type { CSSProperties } from "react";
import Link from "next/link";
import type { ResolvedTag } from "@/lib/content";

export default function TagList({ tags }: { tags: ResolvedTag[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="tags" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag.slug}>
          <Link
            href={`/tags/${tag.slug}`}
            style={{ "--tag-color": tag.color } as CSSProperties}
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

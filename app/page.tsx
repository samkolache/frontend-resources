import HomeBrowser from "@/components/HomeBrowser";
import { getAllEntries, getTags, resolveTags } from "@/lib/content";

export default function Home() {
  const entries = getAllEntries().map((entry) => ({
    ...entry,
    tags: resolveTags(entry.tags),
  }));
  const allTags = getTags();
  const tags = resolveTags(allTags.map(({ name }) => name)).map((tag, index) => ({
    ...tag,
    count: allTags[index].count,
  }));

  return (
    <>
      <p className="eyebrow">Interview prep · Notes, snippets, challenges</p>
      <h1>Frontend Prep</h1>
      <p className="lede">
        Working solutions, snippets and notes I keep for frontend interviews.
      </p>
      <HomeBrowser entries={entries} tags={tags} />
    </>
  );
}

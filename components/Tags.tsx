import { resolveTags } from "@/lib/content";
import TagList from "./TagList";

export default function Tags({ tags }: { tags: string[] }) {
  return <TagList tags={resolveTags(tags)} />;
}

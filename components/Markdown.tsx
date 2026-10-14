import rehypeShiki from "@shikijs/rehype";
import { cacheLife } from "next/cache";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { shikiThemes } from "@/lib/highlight";

export default async function Markdown({ children }: { children: string }) {
  "use cache";
  // Content only changes on deploy.
  cacheLife("max");
  return (
    <div className="prose">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeShiki, { ...shikiThemes, lazy: true, fallbackLanguage: "text" }],
        ]}
      >
        {children}
      </MarkdownAsync>
    </div>
  );
}

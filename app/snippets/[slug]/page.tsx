import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Markdown from "@/components/Markdown";
import SourceFiles from "@/components/SourceFiles";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { getSnippet, getSnippets } from "@/lib/content";

export function generateStaticParams() {
  return getSnippets().map(({ slug }) => ({ slug }));
}

export default async function SnippetPage({
  params,
}: PageProps<"/snippets/[slug]">) {
  const { slug } = await params;
  const snippet = getSnippet(slug);
  if (!snippet) notFound();

  return (
    <article>
      <BackButton />
      <p className="eyebrow">Snippet</p>
      <h1>
        <TitleText>{snippet.title}</TitleText>
      </h1>
      <Tags tags={snippet.tags} />
      <Markdown>{snippet.readme}</Markdown>
      <SourceFiles files={snippet.files} />
    </article>
  );
}

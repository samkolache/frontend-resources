import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Markdown from "@/components/Markdown";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { getNote, getNotes } from "@/lib/content";

export function generateStaticParams() {
  return getNotes().map(({ topic, slug }) => ({ topic, slug }));
}

export default async function NotePage({
  params,
}: PageProps<"/notes/[topic]/[slug]">) {
  const { topic, slug } = await params;
  const note = getNote(topic, slug);
  if (!note) notFound();

  return (
    <article>
      <BackButton />
      <p className="eyebrow">Notes · {topic}</p>
      <h1>
        <TitleText>{note.title}</TitleText>
      </h1>
      <Tags tags={note.tags} />
      <Markdown>{note.body}</Markdown>
    </article>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import TitleText from "@/components/TitleText";
import { getEntriesByTag, getTags } from "@/lib/content";

export function generateStaticParams() {
  return getTags().map(({ slug }) => ({ tag: slug }));
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag: slug } = await params;
  const tag = getTags().find((candidate) => candidate.slug === slug);
  if (!tag) notFound();

  return (
    <>
      <BackButton />
      <p className="eyebrow">Tag</p>
      <h1>{tag.name}</h1>
      <ul className="index">
        {getEntriesByTag(slug).map(({ href, title, kind }) => (
          <li key={href}>
            <Link href={href}>
              <TitleText>{title}</TitleText>
            </Link>
            <span className="hint">{kind}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Markdown from "@/components/Markdown";
import SourceFiles from "@/components/SourceFiles";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { demos } from "@/challenges/registry";
import { getChallenge, getChallenges } from "@/lib/content";

export function generateStaticParams() {
  return getChallenges().map(({ slug }) => ({ slug }));
}

export default async function ChallengePage({
  params,
}: PageProps<"/challenges/[slug]">) {
  const { slug } = await params;
  const challenge = getChallenge(slug);
  if (!challenge) notFound();

  const Demo = demos[slug];

  return (
    <article>
      <BackButton />
      <p className="eyebrow">Challenge</p>
      <h1>
        <TitleText>{challenge.title}</TitleText>
      </h1>
      <Tags tags={challenge.tags} />
      {Demo && (
        <section className="demo">
          <Demo />
        </section>
      )}
      <Markdown>{challenge.readme}</Markdown>
      <h2>Solution</h2>
      <SourceFiles files={challenge.files} />
    </article>
  );
}

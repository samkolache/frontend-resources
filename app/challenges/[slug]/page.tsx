import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Markdown from "@/components/Markdown";
import PanelTabs from "@/components/PanelTabs";
import SourceFiles from "@/components/SourceFiles";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { demos } from "@/challenges/registry";
import { getChallenge, getChallenges } from "@/lib/content";
import { BASE_PATH } from "@/lib/site";

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
  const demoSrc = `${BASE_PATH}/challenges/${slug}/demo/index.html`;

  return (
    <article>
      <BackButton />
      <p className="eyebrow">Challenge</p>
      <h1>
        <TitleText>{challenge.title}</TitleText>
      </h1>
      <Tags tags={challenge.tags} />
      {challenge.vanilla ? (
        <section className="demo demo-frame">
          <iframe src={demoSrc} title={`${challenge.title} live demo`} />
          <a href={demoSrc} target="_blank" rel="noopener" className="nav-link">
            Open in new tab
          </a>
        </section>
      ) : (
        Demo && (
          <section className="demo">
            <Demo />
          </section>
        )
      )}
      <PanelTabs
        panels={[
          { label: "Brief", content: <Markdown>{challenge.readme}</Markdown> },
          { label: "Code", content: <SourceFiles files={challenge.files} /> },
        ]}
      />
    </article>
  );
}

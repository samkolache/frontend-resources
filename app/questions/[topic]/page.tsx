import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Markdown from "@/components/Markdown";
import Tags from "@/components/Tags";
import TitleText from "@/components/TitleText";
import { getQuestionTopics, getQuestions } from "@/lib/content";

export function generateStaticParams() {
  return getQuestionTopics().map(({ topic }) => ({ topic }));
}

export default async function QuestionsPage({
  params,
}: PageProps<"/questions/[topic]">) {
  const { topic } = await params;
  const set = getQuestions(topic);
  if (!set) notFound();

  return (
    <article>
      <BackButton />
      <p className="eyebrow">Questions</p>
      <h1>
        <TitleText>{set.title}</TitleText>
      </h1>
      <Tags tags={set.tags} />
      {set.questions.map(({ question, answer }) => (
        <details key={question} className="card">
          <summary>
            <Markdown>{question}</Markdown>
          </summary>
          <Markdown>{answer}</Markdown>
        </details>
      ))}
    </article>
  );
}

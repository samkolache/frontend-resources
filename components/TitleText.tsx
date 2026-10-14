// Renders `code` spans in a title as code, so uppercase headings don't turn `<a>` into `<A>`.
export default function TitleText({ children }: { children: string }) {
  return children
    .split("`")
    .map((part, index) =>
      index % 2 === 1 ? (
        <code key={index} className="title-code">
          {part}
        </code>
      ) : (
        part
      ),
    );
}

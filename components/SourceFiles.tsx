import type { SourceFile } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import SourceTabs from "./SourceTabs";

export default async function SourceFiles({ files }: { files: SourceFile[] }) {
  const highlighted = await Promise.all(
    files.map(async (file) => ({
      name: file.name,
      html: await highlight(file.code, file.name),
    })),
  );

  return <SourceTabs files={highlighted} />;
}

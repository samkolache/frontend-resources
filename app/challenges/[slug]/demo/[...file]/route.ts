import { getDemoFile, getDemoFileParams } from "@/lib/content";

// Serves a plain HTML/CSS/JS challenge's solution/ files so its index.html can run in an iframe.
export function generateStaticParams() {
  return getDemoFileParams();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/challenges/[slug]/demo/[...file]">,
) {
  const { slug, file } = await params;
  const asset = getDemoFile(slug, file.join("/"));
  if (!asset) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(asset.body), {
    headers: { "Content-Type": asset.type },
  });
}

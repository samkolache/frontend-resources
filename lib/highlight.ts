import { codeToHtml } from "shiki";
import { cacheLife } from "next/cache";

// Colours are emitted as --shiki-light / --shiki-dark variables; globals.css picks one.
export const shikiThemes = {
  themes: { light: "github-light", dark: "github-dark" },
  defaultColor: false,
} as const;

const LANGUAGES: Record<string, string> = {
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  css: "css",
  html: "html",
  json: "json",
  md: "markdown",
};

// Cached because Shiki reads the clock internally, which Next won't prerender.
export async function highlight(code: string, filename: string) {
  "use cache";
  // Content only changes on deploy.
  cacheLife("max");
  const extension = filename.split(".").pop() ?? "";
  return codeToHtml(code, {
    lang: LANGUAGES[extension] ?? "text",
    ...shikiThemes,
  });
}

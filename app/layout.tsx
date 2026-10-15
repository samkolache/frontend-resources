import type { Metadata } from "next";
import { IBM_Plex_Mono, Jost, Work_Sans } from "next/font/google";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/bauhaus-logo.svg";
import "./globals.css";

// Same type stack as samkotecha.com.
const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const FOOTER_LINKS = [
  { href: "https://samkotecha.com", title: "Portfolio" },
  { href: "https://www.linkedin.com/in/sam-kotecha/", title: "LinkedIn" },
  { href: "https://github.com/samkolache", title: "GitHub" },
];

// Cached so the build can prerender it without every page revalidating every 15 minutes.
async function CurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export const metadata: Metadata = {
  title: "Frontend Prep · Sam Kotecha",
  description:
    "Working solutions, snippets, notes, and experiments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body>
        <header className="site-header">
          <div className="shell">
            <Link href="/" className="brand">
              <Image src={logo} alt="Sam Kotecha" width={130} unoptimized />
              <span>Frontend Prep</span>
            </Link>
            {/* Plain <a>: the portfolio is a separate app on the same domain. */}
            <a href="https://samkotecha.com" className="nav-link">
              Portfolio
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell">
            <p>
              &copy; <CurrentYear /> Sam Kotecha
            </p>
            <ul>
              {FOOTER_LINKS.map(({ href, title }) => (
                <li key={href}>
                  <a href={href} className="nav-link">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

const SITE_URL = "https://danielshaulov.vercel.app";
const DESCRIPTION =
  "Portfolio of Daniel Shaulov - Economics & Management student at the Open University of Israel, former IDF combat soldier. Targeting data and junior analyst roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daniel Shaulov - Data & Junior Analyst",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Daniel Shaulov - Analyst Portfolio",
    description:
      "Economics & Management student, former IDF combat soldier, targeting data and junior analyst roles.",
    url: SITE_URL,
    siteName: "Daniel Shaulov",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Shaulov - Analyst Portfolio",
    description:
      "Economics & Management student, former IDF combat soldier, targeting data and junior analyst roles.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Shaulov",
  jobTitle: "Data & Junior Analyst",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Open University of Israel",
  },
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/danielshaulov/",
    "https://github.com/danishaulov",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

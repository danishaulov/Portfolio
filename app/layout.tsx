import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const SITE_URL = "https://danielshaulov.vercel.app";
const DESCRIPTION =
  "Daniel Shaulov, accounting student at the Open University of Israel, working towards an Assistant Controller role. Explore projects in financial reporting, Excel, SQL, Python and Power BI.";
const TITLE = "Daniel Shaulov | Accounting & Financial Analysis";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Daniel Shaulov",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#142338" },
  ],
};
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Shaulov",
  description: DESCRIPTION,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Open University of Israel",
  },
  knowsAbout: [
    "Accounting",
    "Financial analysis",
    "Excel",
    "Python",
    "SQL",
    "Power BI",
  ],
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/danielshaulov/",
    "https://github.com/danishaulov",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TerminalLoader } from "@/components/TerminalLoader";
import { SITE } from "@/lib/data";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Full-Stack Developer & AI Systems Builder | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `Full-Stack Developer & AI Systems Builder | ${SITE.name}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/midhun-pm-og.jpg",
        width: 1200,
        height: 630,
        alt: "Midhun P M — Full-stack developer and AI systems builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Full-Stack Developer & AI Systems Builder | ${SITE.name}`,
    description: SITE.description,
    images: ["/images/midhun-pm-og.jpg"],
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-md bg-foreground px-4 py-2 font-mono text-xs text-background transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <TerminalLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}

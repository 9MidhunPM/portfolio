import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midhun P M",
  description:
    "CS sophomore building AI systems, full-stack apps, and low-level games.",
  keywords: [
    "Midhun P M",
    "Portfolio",
    "Full-stack Developer",
    "AI Systems",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "LLaMA.cpp",
    "C++",
  ],
  authors: [{ name: "Midhun P M" }],
  openGraph: {
    title: "Midhun P M",
    description:
      "CS sophomore building AI systems, full-stack apps, and low-level games.",
    type: "website",
    locale: "en_US",
    siteName: "Midhun P M",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midhun P M",
    description:
      "CS sophomore building AI systems, full-stack apps, and low-level games.",
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="antialiased bg-[#08090A] text-[#ECEDEE] min-h-screen selection:bg-[#00DC82]/30 selection:text-white">
        <ScrollProgress />
        <CustomCursor />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadahmad.dev"),
  title: "Muhammad Ahmad — Software Engineer & AI Automation Developer",
  description:
    "Portfolio of Muhammad Ahmad — Software Engineer, Frontend Developer, and AI Automation Developer building web applications, business automation, and desktop POS software.",
  keywords: [
    "Muhammad Ahmad",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "AI Automation Developer",
    "Freelance Developer Pakistan",
  ],
  authors: [{ name: "Muhammad Ahmad" }],
  openGraph: {
    title: "Muhammad Ahmad — Software Engineer & AI Automation Developer",
    description:
      "Software Engineer, Frontend Developer, and AI Automation Developer building web applications, business automation, and desktop POS software.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

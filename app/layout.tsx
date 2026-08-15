import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/interactions/CustomCursor";
import PageIndicator from "@/components/navigation/PageIndicator";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikhil Biju — AI & Data Science Engineer",
  description: "Portfolio of Nikhil Biju, an AI & Data Science Engineer building intelligent systems with AI, machine learning and Generative AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-charcoal-900 text-white antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
        <CustomCursor />
        <PageIndicator />
        {children}
      </body>
    </html>
  );
}

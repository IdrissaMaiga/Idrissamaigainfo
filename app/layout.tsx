import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Font configuration
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

// Metadata
export const metadata: Metadata = {
  title: "Idrissa Maiga | Full-Stack Developer",
  description: "Portfolio of Idrissa Maiga, a Full-Stack Developer specializing in Java, Spring Boot, React, and modern web technologies.",
  keywords: ["Java Developer", "Spring Boot", "React.js", "Full-Stack Developer", "Software Engineer", "Portfolio", "Programming"],
  authors: [{ name: "Idrissa Maiga" }],
  creator: "Idrissa Maiga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Font preloading */}
        <link
          rel="preload"
          href="/fonts/Inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
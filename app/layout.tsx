import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "whoami — Your agent. One identity. Anywhere.",
  description:
    "Meet AgentPassport Connect: a portable identity for AI agents. Connect deployments, verify signatures, and explore owner-controlled identity anchored on NEAR.",
  openGraph: {
    title: "whoami — Identity for the agentic world",
    description:
      "Your agent. One identity. Anywhere. Explore the AgentPassport Connect protocol and interactive verification demo.",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

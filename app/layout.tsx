import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DateType — Discover your dating personality",
  description:
    "A thoughtful, quick quiz to explore your dating style, relationship strengths and communication preferences.",
  openGraph: {
    title: "DateType — Discover your dating personality",
    description: "A thoughtful quiz about how you connect, communicate and date.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
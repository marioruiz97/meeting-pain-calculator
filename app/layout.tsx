import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting Pain Calculator",
  description:
    "Calculate the real cost of your meetings and optimize your team's time",
  keywords: ["meetings", "productivity", "cost calculator", "time management"],
  authors: [{ name: "Meeting Pain Calculator" }],
  openGraph: {
    title: "Meeting Pain Calculator",
    description: "Stop burning money on unproductive meetings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}

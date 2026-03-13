import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "POV Sports",
  description:
    "POV captures the energy of live sports — the moments you only experience by being there — and brings them from the stands to the screen.",
  keywords: ["sports", "POV", "fan footage", "NBA", "NFL", "UFC", "soccer"],
  icons: {
    icon: "/images/povlogo2.png",
    apple: "/images/povlogo2.png",
  },
  openGraph: {
    title: "POV Sports",
    description:
      "POV captures the energy of live sports — the moments you only experience by being there — and brings them from the stands to the screen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

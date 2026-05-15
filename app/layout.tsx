import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Belgrade → Tokyo | Odbrojavanje",
  description: "Odbrojavanje do leta Beograd – Tokio, 11. novembar 2026.",
  icons: {
    icon: "/fuji.png",
    apple: "/fuji.png",
  },
  openGraph: {
    title: "Belgrade → Tokyo | Odbrojavanje",
    description: "Odbrojavanje do leta Beograd – Tokio, 11. novembar 2026.",
    images: ["/fuji.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

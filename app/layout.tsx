import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lightsteelblue-giraffe-291026.hostingersite.com";

export const metadata: Metadata = {
  title: {
    default: "Atletico Xeneizes 149 | Sito Ufficiale",
    template: "%s | Atletico Xeneizes 149"
  },
  description: "Sito ufficiale Atletico Xeneizes 149: match center, rosa, calendario, risultati, classifica, news, media, staff e sponsor.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Atletico Xeneizes 149",
    title: "Atletico Xeneizes 149",
    description: "Match center, risultati, calendario, rosa, news e contenuti ufficiali dell'Atletico Xeneizes 149.",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atletico Xeneizes 149",
    description: "Match center, risultati, calendario, rosa, news e contenuti ufficiali.",
    images: ["/opengraph-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

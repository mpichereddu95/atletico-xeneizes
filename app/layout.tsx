import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atletico Xeneizes | Sito Ufficiale",
  description: "La piattaforma ufficiale di Atletico Xeneizes: rosa, partite, classifica, news, media, staff e sponsor.",
  metadataBase: new URL("https://atleticoxeneizes.local"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Atletico Xeneizes",
    description: "Risultati, calendario, rosa, news e contenuti ufficiali.",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atletico Xeneizes",
    description: "Risultati, calendario, rosa, news e contenuti ufficiali.",
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

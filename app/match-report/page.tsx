import type { Metadata } from "next";
import { NewsSection } from "@/components/NewsSection";
import { PageHero } from "@/components/PageHero";
import { getArticles } from "@/lib/api";

export const metadata: Metadata = {
  title: "Match report",
  description: "Archivio match report Atletico Xeneizes 149."
};

export default async function MatchReportPage() {
  const articles = await getArticles();

  return (
    <main>
      <PageHero
        kicker="Match report"
        title="Archivio report gara"
        text="Cronache, risultati, protagonisti e gallery delle partite ufficiali del club."
        primaryCta={{ href: "/risultati", label: "Risultati" }}
        secondaryCta={{ href: "/news", label: "News" }}
      />
      <NewsSection articles={articles} category="Match report" title="Report ufficiali" kicker="Match report" text="Tutti i match report pubblicati dalla redazione ufficiale." />
    </main>
  );
}

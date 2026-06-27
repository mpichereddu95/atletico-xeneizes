import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { StandingsPreviewSection } from "@/components/StandingsPreviewSection";
import { getStandings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Classifica",
  description: "Classifica ufficiale Atletico Xeneizes 149."
};

export default async function ClassificaPage() {
  const standings = await getStandings();

  return (
    <main>
      <PageHero
        kicker="Classifica"
        title="Classifica completa"
        text="Tabella sportiva della stagione con il percorso competitivo dell'Atletico Xeneizes 149."
        primaryCta={{ href: "/calendario", label: "Calendario" }}
        secondaryCta={{ href: "/risultati", label: "Risultati" }}
      />
      <StandingsPreviewSection standings={standings} limit={standings.length} showLink={false} />
    </main>
  );
}

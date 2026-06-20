import { MatchesSection } from "@/components/MatchesSection";
import { PageHero } from "@/components/PageHero";
import { getMatches, getStandings } from "@/lib/api";

export default async function PartitePage() {
  const [matches, standings] = await Promise.all([getMatches(), getStandings()]);

  return (
    <main>
      <PageHero
        kicker="Partite"
        title="Calendario, risultati e classifica"
        text="Archivio completo della stagione 2025/26: Girone C, classifica finale, accesso alla Poule Scudetto e cronologia ufficiale delle gare."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/news", label: "Ultimi report" }}
      />
      <MatchesSection matches={matches} standings={standings} />
    </main>
  );
}

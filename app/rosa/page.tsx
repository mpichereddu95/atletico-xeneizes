import { PageHero } from "@/components/PageHero";
import { PlayersSection } from "@/components/PlayersSection";
import { getPlayers } from "@/lib/api";

export default async function RosaPage() {
  const players = await getPlayers();

  return (
    <main>
      <PageHero
        kicker="Rosa"
        title="La squadra di Atletico Xeneizes"
        text="Rosa 2026/27 in aggiornamento: tesseramenti non ancora pubblicati su Calcio Liguria. Qui resta consultabile l'archivio 2025/26, con statistiche del Girone C e ruoli confermati dal club."
        primaryCta={{ href: "/partite", label: "Vai alle partite" }}
        secondaryCta={{ href: "/", label: "Torna alla home" }}
      />
      <PlayersSection players={players} />
    </main>
  );
}

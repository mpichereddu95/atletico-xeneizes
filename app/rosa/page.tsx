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
        text="Database giocatori della stagione 2025/26 con ruoli, statistiche ufficiali di Girone C e correzioni manuali richieste dal club."
        primaryCta={{ href: "/partite", label: "Vai alle partite" }}
        secondaryCta={{ href: "/", label: "Torna alla home" }}
      />
      <PlayersSection players={players} />
    </main>
  );
}

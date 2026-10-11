import { PageHero } from "@/components/PageHero";
import { PlayerRosterTabs } from "@/components/PlayerRosterTabs";
import { archiveSeasonLabel, currentSeasonLabel } from "@/data/club";
import { getPlayers } from "@/lib/api";

export default async function RosaPage() {
  const allPlayers = await getPlayers();
  const currentPlayers = allPlayers.filter((player) => player.seasons?.includes(currentSeasonLabel) && player.currentRoster !== false);
  const archivePlayers = allPlayers.filter((player) => player.seasons?.includes(archiveSeasonLabel));

  return (
    <main>
      <PageHero
        kicker="Rosa"
        title="La squadra di Atletico Xeneizes"
        text="La rosa 2026/27 è divisa dall’archivio 2025/26. Le schede della stagione attuale sono pronte per foto e statistiche, che verranno aggiunte in seguito."
        primaryCta={{ href: "/partite", label: "Vai alle partite" }}
        secondaryCta={{ href: "/", label: "Torna alla home" }}
      />
      <section id="rosa" className="bg-axBlack py-12 lg:py-16">
        <div className="section-shell max-w-6xl">
          <PlayerRosterTabs currentPlayers={currentPlayers} archivePlayers={archivePlayers} />
        </div>
      </section>
    </main>
  );
}

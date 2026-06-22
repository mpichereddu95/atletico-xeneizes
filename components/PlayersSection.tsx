import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import type { Player } from "@/lib/types";

const roleOrder: Player["role"][] = ["Portiere", "Difensore", "Centrocampista", "Attaccante"];

type PlayersSectionProps = {
  players: Player[];
  variant?: "full" | "preview";
  limit?: number;
};

export function PlayersSection({ players, variant = "full", limit = 8 }: PlayersSectionProps) {
  if (variant === "preview") {
    return (
      <section id="rosa" className="content-auto bg-axBlack py-14 lg:py-20">
        <div className="section-shell max-w-6xl">
          <SectionHeading
            kicker="Rosa"
            title="Database giocatori"
            text="Preview leggera della rosa: schede cliccabili, statistiche essenziali e database completo nella sezione dedicata."
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {players.slice(0, limit).map((player) => (
              <PlayerCard key={player.id} player={player} compact />
            ))}
          </div>

          <Link href="/rosa" className="mt-5 inline-flex border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold">
            Database completo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="rosa" className="bg-axBlack py-16 lg:py-20">
      <div className="section-shell max-w-6xl">
        <SectionHeading
          kicker="Rosa"
          title="Database giocatori"
          text="Statistiche ufficiali del Girone C 2025/26, schede cliccabili e struttura dati pronta per nuove stagioni, CMS o API sportive."
        />

        <div className="grid gap-8">
          {roleOrder.map((role) => {
            const group = players.filter((player) => player.role === role);

            if (group.length === 0) {
              return null;
            }

            return (
              <div key={role} className="grid gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-2xl font-black uppercase text-white sm:text-3xl">{role}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
                >
                  {group.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlayerCard({ player, compact = false }: { player: Player; compact?: boolean }) {
  return (
    <Link
      href={`/rosa/${player.id}`}
      className={`group rounded-[8px] border border-[#C9A84C22] bg-[#111111] transition hover:-translate-y-1 hover:border-[#C9A84C55] ${compact ? "p-3" : "p-4"}`}
    >
      <div className={`${compact ? "text-[1.65rem]" : "text-[2rem]"} font-semibold uppercase leading-none tracking-[-0.02em] text-[#C9A84C] opacity-60`}>
        {player.number ?? "—"}
      </div>
      <h4 className={`${compact ? "mt-3 text-sm leading-5" : "mt-4 text-base leading-5"} font-bold text-white`}>{player.name}</h4>
      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#888888]">{player.role}</p>
      <div className={`${compact ? "mt-3 pt-3" : "mt-5 pt-4"} border-t border-white/10 text-[0.72rem] font-medium text-white/68`}>
        <span>{player.stats.appearances} presenze</span>
        <span className="px-1.5 text-white/30">·</span>
        <span>{player.stats.goals} gol</span>
        <span className="px-1.5 text-white/30">·</span>
        <span>{player.stats.bestPlayerAwards ?? 0} MVP</span>
      </div>
    </Link>
  );
}

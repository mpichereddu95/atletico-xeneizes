import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import type { Player } from "@/lib/types";

const roleOrder: Player["role"][] = ["Portiere", "Difensore", "Centrocampista", "Attaccante"];

type PlayersSectionProps = {
  players: Player[];
};

export function PlayersSection({ players }: PlayersSectionProps) {
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
                    <Link
                      key={player.id}
                      href={`/rosa/${player.id}`}
                      className="group rounded-[8px] border border-[#C9A84C22] bg-[#111111] p-4 transition hover:-translate-y-1 hover:border-[#C9A84C55]"
                    >
                      <div className="text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] text-[#C9A84C] opacity-60">
                        {player.number ?? "—"}
                      </div>
                      <h4 className="mt-4 text-base font-bold leading-5 text-white">{player.name}</h4>
                      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#888888]">{player.role}</p>
                      <div className="mt-5 border-t border-white/10 pt-4 text-[0.75rem] font-medium text-white/68">
                        <span>{player.stats.appearances} presenze</span>
                        <span className="px-1.5 text-white/30">·</span>
                        <span>{player.stats.goals} gol</span>
                        <span className="px-1.5 text-white/30">·</span>
                        <span>{player.stats.bestPlayerAwards ?? 0} MVP</span>
                      </div>
                    </Link>
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

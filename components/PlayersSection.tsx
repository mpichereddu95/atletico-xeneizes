import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import type { Player } from "@/lib/types";

const roleOrder: Player["role"][] = ["Portiere", "Difensore", "Centrocampista", "Attaccante"];

type PlayersSectionProps = {
  players: Player[];
  variant?: "full" | "preview";
  limit?: number;
  seasonLabel?: string;
};

export function PlayersSection({ players, variant = "full", limit = 8, seasonLabel = "2026/27" }: PlayersSectionProps) {
  if (variant === "preview") {
    return (
      <section id="rosa" className="content-auto bg-axBlack py-14 lg:py-20">
        <div className="section-shell max-w-6xl">
          <SectionHeading
            kicker="Rosa"
            title="Database giocatori"
            text={players.length ? "La rosa attuale e le statistiche della stagione." : "Rosa 2026/27 in aggiornamento: Calcio Liguria non ha ancora pubblicato i tesseramenti. Le schede 2025/26 restano consultabili nell'archivio."}
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {players.slice(0, limit).map((player) => (
              <PlayerCard key={player.id} player={player} compact />
            ))}
          </div>

          <Link href="/rosa" className="focus-ring mt-5 inline-flex rounded-[6px] border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold">
            Database completo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="rosa" className="bg-axBlack py-16 lg:py-20">
      <div className="section-shell max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-axGold">Stagione {seasonLabel}</p>
            <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">{seasonLabel === "2026/27" ? "Rosa attuale" : "Archivio rosa"}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/60">
            {seasonLabel === "2026/27" ? "Schede predisposte per foto e statistiche della stagione. Numeri di maglia non ancora inseriti." : "Rosa e statistiche della stagione 2025/26, conservate separatamente dallo storico attuale."}
          </p>
        </div>

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
      className={`focus-ring group rounded-[8px] border border-[#C9A84C22] bg-[#111111] transition hover:-translate-y-1 hover:border-[#C9A84C55] ${compact ? "p-3" : "p-4"}`}
    >
      <div className={`relative ${compact ? "aspect-[16/8]" : "aspect-[16/9]"} overflow-hidden border border-white/10 bg-white/[0.035]`}>
        {player.photo.src ? (
          <Image src={player.photo.src} alt={player.photo.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full items-center justify-center text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/35">Foto da inserire</div>
        )}
      </div>
      <h4 className={`${compact ? "mt-3 text-sm leading-5" : "mt-4 text-base leading-5"} font-bold text-white`}>{player.name}</h4>
      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#888888]">{player.role}</p>
      <div className={`${compact ? "mt-3 pt-3" : "mt-5 pt-4"} flex flex-wrap gap-x-2 gap-y-1 border-t border-white/10 text-[0.72rem] font-medium text-white/68`}>
        <span>{player.stats.appearances ?? "n.d."} presenze</span>
        <span>{player.stats.goals ?? "n.d."} gol</span>
        {player.stats.bestPlayerAwards != null && <span>{player.stats.bestPlayerAwards} MVP</span>}
      </div>
    </Link>
  );
}

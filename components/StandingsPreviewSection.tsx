import Link from "next/link";
import type { Standing } from "@/lib/types";
import { SectionHeading } from "@/components/SectionHeading";

type StandingsPreviewSectionProps = {
  standings: Standing[];
  limit?: number;
  showLink?: boolean;
};

const CLUB_NAME = "ATLETICO XENEIZES 149";

export function StandingsPreviewSection({ standings, limit = 6, showLink = true }: StandingsPreviewSectionProps) {
  const season = standings[0]?.season ?? "Archivio";
  const competition = standings[0]?.competition ?? "Classifica";
  const rows = standings
    .filter((row) => row.season === season && row.competition === competition)
    .sort((a, b) => a.position - b.position)
    .slice(0, limit);

  return (
    <section id="classifica" className="bg-[#0E0E0E] py-14 lg:py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Classifica"
          title="Situazione stagione"
          text="Lettura sintetica della graduatoria, con accesso alla tabella completa per archivio e stagioni future."
        />

        {rows.length > 0 ? (
          <div className="overflow-x-auto border border-white/10 bg-white/[0.03] [scrollbar-width:thin]">
            <div className="grid min-w-[620px] grid-cols-[48px_minmax(220px,1.4fr)_60px_60px_70px_70px] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
              <span>Pos</span>
              <span>Squadra</span>
              <span className="text-right">Pt</span>
              <span className="text-right">Pg</span>
              <span className="text-right">GF</span>
              <span className="text-right">GS</span>
            </div>
            {rows.map((row) => (
              <div key={row.team} className="grid min-w-[620px] grid-cols-[48px_minmax(220px,1.4fr)_60px_60px_70px_70px] items-center border-t border-white/8 px-5 py-4 text-sm">
                <span className="font-display text-2xl font-light text-axGold">{row.position}</span>
                <span className={row.team === CLUB_NAME ? "font-semibold text-white" : "font-light text-white/72"}>{row.team}</span>
                <span className="text-right font-semibold text-white">{row.points}</span>
                <span className="text-right text-white/58">{row.played}</span>
                <span className="text-right text-white/58">{row.goalsFor}</span>
                <span className="text-right text-white/58">{row.goalsAgainst}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-white/[0.03] p-6 text-sm leading-7 text-white/64">Classifica non ancora disponibile.</div>
        )}

        {showLink ? (
          <Link href="/classifica" className="mt-5 inline-flex border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold">
            Apri classifica completa
          </Link>
        ) : null}
      </div>
    </section>
  );
}

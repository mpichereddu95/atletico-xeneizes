import Link from "next/link";
import type { Match, Standing } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

type MatchCenterSectionProps = {
  latestResult: Match | null;
  nextMatch: Match | null;
  matches: Match[];
  standings: Standing[];
};

const CLUB_NAME = "ATLETICO XENEIZES 149";

export function MatchCenterSection({ latestResult, nextMatch, matches, standings }: MatchCenterSectionProps) {
  const latest = latestResult ?? [...matches].filter((match) => match.status === "played").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] ?? null;
  const next = nextMatch ?? [...matches].filter((match) => match.status === "scheduled").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;
  const competition = latest?.competition ?? next?.competition ?? standings[0]?.competition ?? "Stagione";
  const season = latest?.season ?? next?.season ?? standings[0]?.season ?? "Archivio";
  const tableRows = standings.filter((row) => row.competition === competition && row.season === season).sort((a, b) => a.position - b.position);
  const clubStanding = tableRows.find((row) => row.team === CLUB_NAME);

  return (
    <section id="match-center" className="bg-white py-14 text-axBlack lg:py-18">
      <div className="section-shell">
        <SectionHeading
          kicker="Match center"
          title="Partite, risultati e classifica"
          text="Il punto rapido per seguire calendario, ultimo risultato e posizione in classifica senza lasciare la home."
          tone="light"
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <MatchPanel kicker="Prossima partita" match={next} empty="Nessuna partita programmata." />
          <MatchPanel kicker="Ultimo risultato" match={latest} empty="Nessun risultato disponibile." />

          <article className="border border-axBlack/10 bg-[#f7f5ef] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Classifica sintetica</p>
            {clubStanding ? (
              <div className="mt-5 border border-axBlack/10 bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-axBlack/45">Atletico Xeneizes</p>
                    <p className="mt-2 font-display text-4xl font-light leading-none text-axBlack">{clubStanding.position}°</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-axBlack/45">Punti</p>
                    <p className="mt-2 font-display text-4xl font-light leading-none text-axGold">{clubStanding.points}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="mt-4 grid gap-2">
              {tableRows.slice(0, 4).map((row) => (
                <div key={row.team} className="grid grid-cols-[32px_minmax(0,1fr)_42px] items-center gap-3 border-b border-axBlack/8 py-2 text-sm last:border-b-0">
                  <span className="font-display text-xl font-light text-axGold">{row.position}</span>
                  <span className={row.team === CLUB_NAME ? "truncate font-semibold text-axBlack" : "truncate font-light text-axBlack/70"}>{row.team}</span>
                  <span className="text-right font-semibold text-axBlack">{row.points}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/calendario" className="inline-flex border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
            Calendario completo
          </Link>
          <Link href="/risultati" className="inline-flex border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
            Risultati completi
          </Link>
        </div>
      </div>
    </section>
  );
}

function MatchPanel({ kicker, match, empty }: { kicker: string; match: Match | null; empty: string }) {
  return (
    <article className="border border-axBlack/10 bg-white p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">{kicker}</p>
      {match ? (
        <div className="mt-5 grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-axBlack/45">{formatDate(match.date)} · {match.kickoff || "Orario da definire"}</p>
            <h3 className="mt-3 font-display text-3xl font-light leading-none text-axBlack sm:text-4xl">
              {match.home} <span className="text-axGold">vs</span> {match.away}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-axBlack/58">
            <span>{match.competition}</span>
            <span>{match.phase}</span>
            {match.venue ? <span>{match.venue}</span> : null}
          </div>
          <p className="inline-flex w-fit border border-axBlack/12 px-4 py-2 font-display text-2xl font-light text-axBlack">{match.score ?? "TBD"}</p>
        </div>
      ) : (
        <p className="mt-5 text-sm leading-7 text-axBlack/62">{empty}</p>
      )}
    </article>
  );
}

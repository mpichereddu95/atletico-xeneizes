import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getMatches, getSeasonSummaries, getStandings } from "@/lib/api";
import { summerFriendliesSeasonLabel } from "@/data/club";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stagioni",
  description: "Archivio stagioni Atletico Xeneizes 149."
};

export default async function StagioniPage() {
  const [matches, standings, seasons] = await Promise.all([getMatches(), getStandings(), getSeasonSummaries()]);
  const summerFriendlies = matches
    .filter((match) => match.season === summerFriendliesSeasonLabel)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main>
      <PageHero
        kicker="Archivio"
        title="Stagioni"
        text="Stagione attuale, archivio 2025/26 e competizioni estive raccolte in uno storico consultabile."
        primaryCta={{ href: "/partite", label: "Partite" }}
        secondaryCta={{ href: "/classifica", label: "Classifica" }}
      />
      <section className="bg-white py-14 text-axBlack lg:py-20">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seasons.map((season) => {
              const seasonMatches = matches.filter((match) => match.season === season.title);
              const seasonStandings = standings.filter((row) => row.season === season.title);
              const competitions = Array.from(new Set([...seasonMatches.map((match) => match.competition), ...seasonStandings.map((row) => row.competition)]));

              return (
                <article key={season.id} className="border border-axBlack/10 bg-[#f7f5ef] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">{season.label}</p>
                      <h2 className="mt-3 font-display text-4xl font-light leading-none text-axBlack">{season.title}</h2>
                    </div>
                    <span className="inline-flex border border-axBlack/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-axBlack/58">
                      {season.hasOfficialData ? "Disponibile" : "In aggiornamento"}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-axBlack/62">
                    {season.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack/42">
                    {seasonMatches.length} partite · {competitions.length} competizioni · {seasonStandings.length ? "Classifica disponibile" : "Classifica in aggiornamento"}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/calendario" className="inline-flex border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
                      Calendario
                    </Link>
                    <Link href="/risultati" className="inline-flex border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
                      Risultati
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <section className="mt-12 border-t border-axBlack/10 pt-10" aria-labelledby="summer-friendlies-heading">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Archivio aggiornabile</p>
                <h2 id="summer-friendlies-heading" className="mt-3 font-display text-4xl font-light leading-none text-axBlack">Amichevoli Estive 2026</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-axBlack/62">Risultati delle gare disputate. L’archivio resta aperto per aggiungere le amichevoli mancanti.</p>
              </div>
              <Link href="/partite" className="inline-flex w-fit border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
                Vista completa
              </Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {summerFriendlies.map((match) => (
                <article key={match.id} className="grid min-w-0 gap-3 border border-axBlack/10 bg-[#f7f5ef] p-4 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-center">
                  <time dateTime={match.date} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-axGold">{formatDate(match.date)}</time>
                  <p className="min-w-0 text-sm leading-5 text-axBlack [overflow-wrap:anywhere]">{match.home} <span className="text-axBlack/45">vs</span> {match.away}</p>
                  <span className="inline-flex w-fit min-w-16 justify-center border border-axBlack/12 bg-white px-3 py-2 text-sm font-semibold tabular-nums text-axBlack">{match.score}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

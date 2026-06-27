import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getMatches, getSeasonSummaries, getStandings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Stagioni",
  description: "Archivio stagioni Atletico Xeneizes 149."
};

export default async function StagioniPage() {
  const [matches, standings, seasons] = await Promise.all([getMatches(), getStandings(), getSeasonSummaries()]);

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
              const competitions = Array.from(new Set(seasonMatches.map((match) => match.competition)));

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
        </div>
      </section>
    </main>
  );
}

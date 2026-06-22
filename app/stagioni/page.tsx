import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getMatches, getStandings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Stagioni",
  description: "Archivio stagioni Atletico Xeneizes 149."
};

export default async function StagioniPage() {
  const [matches, standings] = await Promise.all([getMatches(), getStandings()]);
  const seasons = Array.from(new Set([...matches.map((match) => match.season), ...standings.map((row) => row.season)])).filter(Boolean).sort().reverse();

  return (
    <main>
      <PageHero
        kicker="Archivio"
        title="Stagioni"
        text="Struttura pronta per separare stagione 2025/26, 2026/27, 2027/28 e archivio storico senza cambiare il sito."
        primaryCta={{ href: "/partite", label: "Partite" }}
        secondaryCta={{ href: "/classifica", label: "Classifica" }}
      />
      <section className="bg-white py-14 text-axBlack lg:py-20">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seasons.map((season) => {
              const seasonMatches = matches.filter((match) => match.season === season);
              const competitions = Array.from(new Set(seasonMatches.map((match) => match.competition)));

              return (
                <article key={season} className="border border-axBlack/10 bg-[#f7f5ef] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Stagione</p>
                  <h2 className="mt-3 font-display text-4xl font-light leading-none text-axBlack">{season}</h2>
                  <p className="mt-4 text-sm leading-6 text-axBlack/62">
                    {seasonMatches.length} partite · {competitions.length} competizioni
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

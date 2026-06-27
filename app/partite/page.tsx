import { MatchesSection } from "@/components/MatchesSection";
import { PageHero } from "@/components/PageHero";
import { getMatches, getSeasonSummaries, getStandings } from "@/lib/api";

export default async function PartitePage() {
  const [matches, standings, seasons] = await Promise.all([getMatches(), getStandings(), getSeasonSummaries()]);
  const currentSeason = seasons.find((season) => season.status === "current");

  return (
    <main>
      <PageHero
        kicker="Partite"
        title="Calendario, risultati e classifica"
        text="Calendario della stagione in corso in aggiornamento e archivio completo 2025/26 con risultati, classifica e Poule Scudetto."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/news", label: "Ultimi report" }}
      />
      {currentSeason ? (
        <section className="bg-white pt-14 text-axBlack">
          <div className="section-shell">
            <article className="border border-axBlack/10 bg-[#f7f5ef] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">{currentSeason.label}</p>
              <h2 className="mt-3 font-display text-3xl font-light leading-none text-axBlack sm:text-4xl">{currentSeason.title}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-axBlack/64">{currentSeason.description}</p>
            </article>
          </div>
        </section>
      ) : null}
      <MatchesSection matches={matches} standings={standings} />
    </main>
  );
}

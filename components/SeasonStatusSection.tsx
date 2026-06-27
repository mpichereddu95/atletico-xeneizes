import Link from "next/link";
import type { SeasonSummary } from "@/lib/types";
import { SectionHeading } from "@/components/SectionHeading";

type SeasonStatusSectionProps = {
  seasons: SeasonSummary[];
};

export function SeasonStatusSection({ seasons }: SeasonStatusSectionProps) {
  const primarySeasons = seasons.filter((season) => season.id !== "world-cup-estate-2026");
  const secondaryArchive = seasons.find((season) => season.id === "world-cup-estate-2026");

  return (
    <section className="bg-[#f7f5ef] py-14 text-axBlack lg:py-18">
      <div className="section-shell">
        <SectionHeading
          kicker="Stagioni"
          title="Stagione attuale e archivio"
          text="Il sito separa la stagione in corso dall'archivio sportivo, mantenendo risultati e statistiche sempre consultabili."
          tone="light"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {primarySeasons.map((season) => (
            <SeasonCard key={season.id} season={season} />
          ))}
        </div>

        {secondaryArchive ? (
          <div className="mt-4">
            <SeasonCard season={secondaryArchive} compact />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SeasonCard({ season, compact = false }: { season: SeasonSummary; compact?: boolean }) {
  return (
    <article className={`border border-axBlack/10 bg-white ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">{season.label}</p>
          <h2 className={`mt-3 font-display font-light leading-none text-axBlack ${compact ? "text-3xl" : "text-4xl sm:text-5xl"}`}>{season.title}</h2>
        </div>
        <span className="inline-flex w-fit border border-axBlack/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-axBlack/58">
          {season.hasOfficialData ? "Disponibile" : "In aggiornamento"}
        </span>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-axBlack/64">{season.description}</p>
      <Link href={season.href} className="mt-5 inline-flex border border-axBlack/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:border-axGold hover:text-axGold">
        Apri sezione
      </Link>
    </article>
  );
}

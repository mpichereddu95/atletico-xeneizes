import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getMatches } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Risultati",
  description: "Risultati ufficiali Atletico Xeneizes 149."
};

export default async function RisultatiPage() {
  const matches = await getMatches();
  const rows = matches
    .filter((match) => match.status === "played")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <PageHero
        kicker="Risultati"
        title="Risultati completi"
        text="Cronologia ufficiale dei risultati Atletico Xeneizes 149, consultabile per stagione e competizione."
        primaryCta={{ href: "/calendario", label: "Calendario" }}
        secondaryCta={{ href: "/match-report", label: "Match report" }}
      />
      <section className="bg-white py-14 text-axBlack lg:py-20">
        <div className="section-shell">
          <div className="grid gap-3">
            {rows.map((match) => (
              <article key={match.id} className="grid gap-4 border border-axBlack/10 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-axGold">{formatDate(match.date)}</p>
                  <p className="mt-1 text-xs font-light text-axBlack/58">{match.round}</p>
                </div>
                <div>
                  <h2 className="text-base font-light text-axBlack">
                    {match.home} <span className="text-axGold">vs</span> {match.away}
                  </h2>
                  <p className="mt-1 text-sm font-light text-axBlack/58">
                    {match.competition} · {match.phase}
                  </p>
                </div>
                <span className="inline-flex min-w-24 justify-center border border-axBlack/12 px-4 py-2 text-sm font-semibold text-axBlack">{match.score ?? "TBD"}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

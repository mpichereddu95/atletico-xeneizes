"use client";

import { useMemo, useState } from "react";
import type { Match, Standing } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

type MatchesSectionProps = {
  matches: Match[];
  standings: Standing[];
};

type MatchView = "overview" | "results" | "calendar" | "table";
type OutcomeFilter = "all" | "win" | "draw" | "loss";

export function MatchesSection({ matches, standings }: MatchesSectionProps) {
  const seasons = Array.from(new Set(matches.map((match) => match.season))).sort().reverse();
  const [season, setSeason] = useState(seasons[0] ?? "");
  const [view, setView] = useState<MatchView>("overview");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");

  const seasonMatches = useMemo(
    () => matches.filter((match) => match.season === season).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [matches, season]
  );

  const competitions = Array.from(new Set(seasonMatches.map((match) => match.competition)));
  const defaultCompetition = competitions.includes("Coppa Cobram - Girone C") ? "Coppa Cobram - Girone C" : competitions[0] ?? "";
  const [competition, setCompetition] = useState(defaultCompetition);
  const effectiveCompetition = competitions.includes(competition) ? competition : defaultCompetition;

  const filteredMatches = seasonMatches.filter((match) => match.competition === effectiveCompetition);
  const playedMatches = filteredMatches.filter((match) => match.status === "played").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const standingsRows = standings
    .filter((row) => row.season === season && row.competition === effectiveCompetition)
    .sort((a, b) => a.position - b.position);

  const filteredResults = playedMatches.filter((match) => {
    if (outcomeFilter === "all") {
      return true;
    }

    const outcome = getOutcome(match).key;
    return outcomeFilter === outcome;
  });

  const summary = getSummary(matches, standings, season);

  return (
    <section id="partite" className="bg-white py-20 text-axBlack lg:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Partite"
          title="Stagione, risultati e classifica"
          text="Una sezione piu compatta e professionale, con viste distinte per leggere la stagione senza trasformare la pagina in un lungo nastro di blocchi."
          tone="light"
        />

        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="border border-axBlack/10 bg-[#f7f5ef] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-axGold">Controlli</p>
            <div className="mt-5 grid gap-4">
              <FilterField label="Stagione" value={season} options={seasons} onChange={setSeason} />
              <FilterField label="Competizione" value={effectiveCompetition} options={competitions} onChange={setCompetition} />
            </div>

            <div className="mt-8 grid gap-3">
              <SummaryItem label="Posizione Girone C" value={summary.position} />
              <SummaryItem label="Bilancio" value={summary.record} />
              <SummaryItem label="Reti" value={summary.goals} />
              <SummaryItem label="Fase finale" value={summary.finalPhase} />
            </div>
          </aside>

          <div className="border border-axBlack/10 bg-white">
            <div className="border-b border-axBlack/10 px-5 py-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Vista stagione</p>
                  <h3 className="mt-3 font-display text-3xl font-light leading-none text-axBlack sm:text-4xl">
                    {filteredMatches[0]?.phase ?? "Archivio"} · {season}
                  </h3>
                </div>
                <SegmentedControl
                  value={view}
                  onChange={(next) => setView(next as MatchView)}
                  options={[
                    { value: "overview", label: "Overview" },
                    { value: "results", label: "Risultati" },
                    { value: "calendar", label: "Calendario" },
                    { value: "table", label: "Classifica" }
                  ]}
                />
              </div>

              {view === "results" ? (
                <div className="mt-5">
                  <SegmentedControl
                    value={outcomeFilter}
                    onChange={(next) => setOutcomeFilter(next as OutcomeFilter)}
                    options={[
                      { value: "all", label: "Tutte" },
                      { value: "win", label: "Vittorie" },
                      { value: "draw", label: "Pareggi" },
                      { value: "loss", label: "Sconfitte" }
                    ]}
                  />
                </div>
              ) : null}
            </div>

            <div className="p-5">
              {view === "overview" ? <OverviewPane matches={filteredMatches} standings={standingsRows} /> : null}
              {view === "results" ? <ResultsPane matches={filteredResults} emptyMessage="Nessun risultato per il filtro selezionato." /> : null}
              {view === "calendar" ? <CalendarPane matches={filteredMatches} /> : null}
              {view === "table" ? <TablePane standings={standingsRows} /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewPane({ matches, standings }: { matches: Match[]; standings: Standing[] }) {
  const lastThree = [...matches].filter((match) => match.status === "played").slice(-3).reverse();

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Gare ufficiali" value={String(matches.length)} />
        <MetricCard label="Vittorie" value={String(matches.filter((match) => getOutcome(match).key === "win").length)} />
        <MetricCard label="Pareggi" value={String(matches.filter((match) => getOutcome(match).key === "draw").length)} />
        <MetricCard label="Sconfitte" value={String(matches.filter((match) => getOutcome(match).key === "loss").length)} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-axBlack/10">
          <PanelHeader kicker="Ultimi risultati" title="Forma recente" />
          <div>
            {lastThree.map((match) => (
              <CompactMatchRow key={match.id} match={match} />
            ))}
          </div>
        </div>

        <div className="border border-axBlack/10">
          <PanelHeader kicker="Andamento" title="Timeline stagione" />
          <div className="grid gap-3 p-5">
            {matches.slice(0, 6).map((match) => {
              const outcome = getOutcome(match);
              return (
                <div
                  key={match.id}
                  className="grid grid-cols-[70px_minmax(0,1fr)_auto] items-center gap-3 border-b border-l-[3px] border-axBlack/8 pb-3 pl-3 sm:grid-cols-[78px_minmax(0,1fr)_auto] last:border-b-0"
                  style={{ borderLeftColor: outcome.accent }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-axBlack/42">{match.round}</p>
                  <p className="min-w-0 text-sm font-light text-axBlack">{match.home === "ATLETICO XENEIZES 149" ? match.away : match.home}</p>
                  <span
                    className={`inline-flex min-w-10 justify-center px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${outcome.badgeClass}`}
                    style={{ color: outcome.accent }}
                  >
                    {outcome.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {standings.length > 0 ? (
        <div className="border border-axBlack/10">
          <PanelHeader kicker="Classifica sintetica" title="Top 5" />
          <div className="grid gap-0 overflow-x-auto [scrollbar-width:thin]">
            {standings.slice(0, 5).map((row) => (
              <div key={row.team} className="grid min-w-[420px] grid-cols-[40px_minmax(0,1fr)_50px_50px] items-center gap-3 border-b border-axBlack/8 px-5 py-4 last:border-b-0">
                <span className="font-display text-2xl font-light text-axGold">{row.position}</span>
                <p className={`min-w-0 text-sm ${row.team === "ATLETICO XENEIZES 149" ? "font-semibold text-axBlack" : "font-light text-axBlack/78"}`}>{row.team}</p>
                <span className="text-right text-sm font-semibold text-axBlack">{row.points}</span>
                <span className="text-right text-sm font-light text-axBlack/55">{row.difference}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResultsPane({ matches, emptyMessage }: { matches: Match[]; emptyMessage: string }) {
  if (matches.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid gap-3">
      {matches.map((match) => (
        <CompactMatchRow key={match.id} match={match} />
      ))}
    </div>
  );
}

function CalendarPane({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return <EmptyState message="Nessuna gara disponibile per i filtri selezionati." />;
  }

  return (
    <div className="grid gap-3">
      {matches.map((match) => (
        <div key={match.id} className="grid gap-4 border border-axBlack/10 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-axGold">{formatDate(match.date)}</p>
            <p className="mt-1 text-xs font-light text-axBlack/58">{match.kickoff}</p>
          </div>
          <div>
            <p className="text-base font-light text-axBlack">
              {match.home} <span className="text-axGold">vs</span> {match.away}
            </p>
            <p className="mt-1 text-sm font-light text-axBlack/58">
              {match.venue} · {match.phase}
            </p>
          </div>
          <div className="justify-self-start md:justify-self-end">
            <span className="inline-flex min-w-24 justify-center border border-axBlack/12 px-4 py-2 text-sm font-semibold text-axBlack">
              {match.score ?? "TBD"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TablePane({ standings }: { standings: Standing[] }) {
  if (standings.length === 0) {
    return <EmptyState message="Per questa competizione non e disponibile una classifica a girone." />;
  }

  return (
    <div className="overflow-x-auto border border-axBlack/10 [scrollbar-width:thin]">
      <div className="grid min-w-[680px] grid-cols-[48px_minmax(220px,1.4fr)_60px_60px_60px_80px_80px] bg-[#f7f5ef] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-axBlack/58">
        <span>Pos</span>
        <span>Squadra</span>
        <span className="text-right">Pt</span>
        <span className="text-right">Pg</span>
        <span className="text-right">Dr</span>
        <span className="text-right">GF</span>
        <span className="text-right">GS</span>
      </div>
      {standings.map((row) => (
        <div key={row.team} className="grid min-w-[680px] grid-cols-[48px_minmax(220px,1.4fr)_60px_60px_60px_80px_80px] items-center border-t border-axBlack/8 px-5 py-4 text-sm">
          <span className="font-display text-2xl font-light text-axGold">{row.position}</span>
          <div>
            <p className={`${row.team === "ATLETICO XENEIZES 149" ? "font-semibold text-axBlack" : "font-light text-axBlack/78"}`}>{row.team}</p>
            <p className="mt-1 text-[11px] font-light uppercase tracking-[0.14em] text-axBlack/42">
              {row.wins}V {row.draws}N {row.losses}P
            </p>
          </div>
          <span className="text-right font-semibold text-axBlack">{row.points}</span>
          <span className="text-right font-light text-axBlack/62">{row.played}</span>
          <span className="text-right font-light text-axBlack/62">{row.difference}</span>
          <span className="text-right font-light text-axBlack/62">{row.goalsFor}</span>
          <span className="text-right font-light text-axBlack/62">{row.goalsAgainst}</span>
        </div>
      ))}
    </div>
  );
}

function CompactMatchRow({ match }: { match: Match }) {
  const outcome = getOutcome(match);
  const opponent = match.home === "ATLETICO XENEIZES 149" ? match.away : match.home;
  const homeAway = match.home === "ATLETICO XENEIZES 149" ? "Casa" : "Trasferta";

  return (
    <div
      className="grid min-w-0 gap-4 border border-axBlack/10 border-l-[3px] p-4 md:grid-cols-[120px_minmax(0,1fr)_auto_auto] md:items-center"
      style={{ borderLeftColor: outcome.accent }}
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-axGold">{formatDate(match.date)}</p>
        <p className="mt-1 text-xs font-light text-axBlack/58">{homeAway}</p>
      </div>
      <div className="min-w-0">
        <p className="text-base font-light text-axBlack">{opponent}</p>
        <p className="mt-1 text-sm font-light text-axBlack/58">
          {match.phase} · {match.venue}
        </p>
      </div>
      <span className="inline-flex min-w-24 justify-center border border-axBlack/12 px-4 py-2 text-sm font-semibold text-axBlack">{match.score}</span>
      <span
        className={`inline-flex min-w-11 justify-center px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${outcome.badgeClass}`}
        style={{ color: outcome.accent }}
      >
        {outcome.label}
      </span>
    </div>
  );
}

function FilterField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-axBlack/48">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 border border-axBlack/12 bg-white px-4 text-sm font-light text-axBlack outline-none transition focus:border-axGold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SegmentedControl({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-w-[104px] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
              isActive ? "bg-axBlack text-white" : "border border-axBlack/12 text-axBlack/62 hover:border-axGold hover:text-axBlack"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function PanelHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border-b border-axBlack/10 px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-axGold">{kicker}</p>
      <h4 className="mt-3 font-display text-3xl font-light leading-none text-axBlack">{title}</h4>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="border border-axBlack/10 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-axBlack/48">{label}</p>
      <p className="mt-4 font-display text-4xl font-light text-axBlack">{value}</p>
    </article>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-axBlack/10 bg-white px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-axBlack/45">{label}</p>
      <p className="mt-2 text-sm font-light text-axBlack">{value}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="border border-axBlack/10 p-5 text-sm font-light leading-6 text-axBlack/58">{message}</div>;
}

function getSummary(matches: Match[], standings: Standing[], season: string) {
  const tableRow = standings.find((row) => row.season === season && row.team === "ATLETICO XENEIZES 149");
  const finalPhaseMatches = matches.filter((match) => match.phase === "Poule Scudetto");

  return {
    position: tableRow ? `${tableRow.position}° posto` : "n.d.",
    record: tableRow ? `${tableRow.wins}V · ${tableRow.draws}N · ${tableRow.losses}P` : "n.d.",
    goals: tableRow ? `${tableRow.goalsFor} fatti · ${tableRow.goalsAgainst} subiti` : "n.d.",
    finalPhase: finalPhaseMatches.length > 0 ? `${finalPhaseMatches.length} gare di Poule` : "non disponibile"
  };
}

function getOutcome(match: Match) {
  if (!match.score) {
    return {
      key: "draw" as OutcomeFilter,
      label: "--",
      badgeClass: "border border-axBlack/12 text-axBlack/58",
      accent: "#a3a3a3"
    };
  }

  const [left, right] = match.score.split("-").map((value) => Number(value.trim()));
  const atleticoScore = match.home === "ATLETICO XENEIZES 149" ? left : right;
  const opponentScore = match.home === "ATLETICO XENEIZES 149" ? right : left;

  if (atleticoScore > opponentScore) {
    return {
      key: "win" as OutcomeFilter,
      label: "V",
      badgeClass: "bg-[#22c55e14]",
      accent: "#22c55e"
    };
  }

  if (atleticoScore < opponentScore) {
    return {
      key: "loss" as OutcomeFilter,
      label: "P",
      badgeClass: "bg-[#ef444414]",
      accent: "#ef4444"
    };
  }

  return {
    key: "draw" as OutcomeFilter,
    label: "N",
    badgeClass: "bg-[#a3a3a312]",
    accent: "#a3a3a3"
  };
}

"use client";

import { useMemo, useState } from "react";
import type { Match } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type TrendPoint = {
  id: string;
  label: string;
  opponent: string;
  score: string;
  points: number;
  cumulativePoints: number;
  goalsFor: number;
  goalsAgainst: number;
  date: string;
};

const CLUB_NAME = "ATLETICO XENEIZES 149";

export function SeasonTrendChart({ matches }: { matches: Match[] }) {
  const points = useMemo(() => buildTrendPoints(matches), [matches]);
  const [activePoint, setActivePoint] = useState<TrendPoint | null>(points.at(-1) ?? null);

  if (points.length === 0) {
    return <p className="p-5 text-sm leading-7 text-axBlack/62">Andamento non ancora disponibile per questa selezione.</p>;
  }

  const maxPoints = Math.max(...points.map((point) => point.cumulativePoints), 1);
  const width = 640;
  const height = 220;
  const padding = 28;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const coordinates = points.map((point, index) => {
    const x = padding + (points.length === 1 ? plotWidth / 2 : (index / (points.length - 1)) * plotWidth);
    const y = padding + plotHeight - (point.cumulativePoints / maxPoints) * plotHeight;
    return { ...point, x, y };
  });

  const polyline = coordinates.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="p-5">
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Grafico andamento punti Atletico Xeneizes" className="min-w-[520px]">
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(17,17,17,0.16)" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(17,17,17,0.16)" />
          <polyline fill="none" stroke="#D4AF37" strokeWidth="3" points={polyline} />
          {coordinates.map((point) => (
            <g
              key={point.id}
              role="button"
              tabIndex={0}
              onClick={() => setActivePoint(point)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActivePoint(point);
                }
              }}
              className="cursor-pointer outline-none"
              aria-label={`${point.label}, ${point.score}, ${point.cumulativePoints} punti`}
            >
              <circle cx={point.x} cy={point.y} r={activePoint?.id === point.id ? 7 : 5} fill={activePoint?.id === point.id ? "#111111" : "#D4AF37"} stroke="#D4AF37" strokeWidth="2" />
            </g>
          ))}
        </svg>
      </div>

      {activePoint ? (
        <div className="mt-4 grid gap-3 border border-axBlack/10 bg-[#f7f5ef] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-axGold">
              {activePoint.label} · {formatDate(activePoint.date)}
            </p>
            <p className="mt-2 text-sm font-light text-axBlack">
              {activePoint.opponent} · {activePoint.score}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Pt" value={activePoint.cumulativePoints} />
            <Stat label="GF" value={activePoint.goalsFor} />
            <Stat label="GS" value={activePoint.goalsAgainst} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-2xl font-light leading-none text-axBlack">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-axBlack/42">{label}</p>
    </div>
  );
}

function buildTrendPoints(matches: Match[]) {
  let cumulativePoints = 0;

  return [...matches]
    .filter((match) => match.status === "played" && match.score)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((match): TrendPoint => {
      const { goalsFor, goalsAgainst } = getClubScore(match);
      const points = goalsFor > goalsAgainst ? 3 : goalsFor === goalsAgainst ? 1 : 0;
      cumulativePoints += points;

      return {
        id: match.id,
        label: `Giornata ${match.round}`,
        opponent: match.home === CLUB_NAME ? match.away : match.home,
        score: match.score ?? "",
        points,
        cumulativePoints,
        goalsFor,
        goalsAgainst,
        date: match.date
      };
    });
}

function getClubScore(match: Match) {
  const [homeScore = 0, awayScore = 0] = (match.score ?? "0-0").split("-").map((value) => Number.parseInt(value.trim(), 10));
  const isHome = match.home === CLUB_NAME;

  return {
    goalsFor: isHome ? homeScore : awayScore,
    goalsAgainst: isHome ? awayScore : homeScore
  };
}

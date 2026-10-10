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
  round: string;
};

const CLUB_NAME = "ATLETICO XENEIZES 149";

export function SeasonTrendChart({ matches }: { matches: Match[] }) {
  const points = useMemo(() => buildTrendPoints(matches), [matches]);
  const [activePoint, setActivePoint] = useState<TrendPoint | null>(points.at(-1) ?? null);

  if (points.length === 0) {
    return <p className="p-5 text-sm leading-7 text-axBlack/62">Andamento non ancora disponibile per questa selezione.</p>;
  }

  const maxPoints = Math.max(6, Math.ceil(Math.max(...points.map((point) => point.cumulativePoints), 1) / 6) * 6);
  const width = 640;
  const height = 340;
  const padding = { top: 24, right: 18, bottom: 42, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const coordinates = points.map((point, index) => {
    const x = padding.left + (points.length === 1 ? plotWidth / 2 : (index / (points.length - 1)) * plotWidth);
    const y = padding.top + plotHeight - (point.cumulativePoints / maxPoints) * plotHeight;
    return { ...point, x, y };
  });

  const stepPath = coordinates.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${path} H ${point.x} V ${point.y}`;
  }, "");
  const yTicks = [0, maxPoints / 3, (maxPoints * 2) / 3, maxPoints];

  return (
    <div className="flex min-h-[280px] min-w-0 flex-1 flex-col p-4 sm:p-5">
      <div className="min-w-0 flex-1">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Punti cumulativi per giornata: da ${coordinates[0].cumulativePoints} a ${coordinates.at(-1)?.cumulativePoints}`} className="block aspect-[16/9] w-full">
          {yTicks.map((tick) => {
            const y = padding.top + plotHeight - (tick / maxPoints) * plotHeight;
            return (
              <g key={tick}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(17,17,17,0.10)" strokeDasharray={tick === 0 ? undefined : "3 6"} />
                <text x={padding.left - 10} y={y + 4} textAnchor="end" fill="rgba(17,17,17,0.48)" fontSize="12">{tick}</text>
              </g>
            );
          })}
          <path d={stepPath} fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinejoin="round" />
          {coordinates.map((point) => (
            <g
              key={point.id}
              role="button"
              tabIndex={0}
              onClick={() => setActivePoint(point)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActivePoint(point);
                }
              }}
              className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-axGold"
              aria-label={`${point.label}, ${point.opponent}, ${point.score}, ${point.cumulativePoints} punti totali`}
              aria-pressed={activePoint?.id === point.id}
            >
              <circle cx={point.x} cy={point.y} r={activePoint?.id === point.id ? 8 : 5} fill={activePoint?.id === point.id ? "#111111" : "#D4AF37"} stroke="#D4AF37" strokeWidth="2" />
            </g>
          ))}
          <text x={padding.left} y={height - 10} fill="rgba(17,17,17,0.48)" fontSize="12">Giornata {points[0].round}</text>
          <text x={width - padding.right} y={height - 10} textAnchor="end" fill="rgba(17,17,17,0.48)" fontSize="12">Giornata {points.at(-1)?.round}</text>
        </svg>
      </div>

      {activePoint ? (
        <div className="mt-3 grid min-w-0 gap-3 border border-axBlack/10 bg-[#f7f5ef] p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-axGold sm:text-[11px] sm:tracking-[0.18em]">
              {activePoint.label} · {formatDate(activePoint.date)} · +{activePoint.points}
            </p>
            <p className="mt-1 text-sm font-medium text-axBlack [overflow-wrap:anywhere] sm:mt-2">
              {activePoint.opponent} · {activePoint.score}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Tot" value={activePoint.cumulativePoints} />
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
        date: match.date,
        round: match.round
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

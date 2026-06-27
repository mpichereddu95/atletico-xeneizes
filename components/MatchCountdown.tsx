"use client";

import { useEffect, useMemo, useState } from "react";
import type { Match } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type MatchCountdownProps = {
  match: Match | null;
};

type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  label: string;
};

const CLUB_NAME = "ATLETICO XENEIZES 149";

export function MatchCountdown({ match }: MatchCountdownProps) {
  const target = useMemo(() => (match ? buildMatchDate(match) : null), [match]);
  const [remaining, setRemaining] = useState<RemainingTime>(() => getRemainingTime(target));

  useEffect(() => {
    setRemaining(getRemainingTime(target));

    const timer = window.setInterval(() => {
      setRemaining(getRemainingTime(target));
    }, 30000);

    return () => window.clearInterval(timer);
  }, [target]);

  if (!match) {
    return (
      <div className="mt-5 border border-axBlack/10 bg-[#f7f5ef] p-4">
        <p className="text-sm leading-7 text-axBlack/68">
          Calendario in aggiornamento. La prossima gara verra pubblicata appena confermata.
        </p>
      </div>
    );
  }

  const opponent = match.home === CLUB_NAME ? match.away : match.home;

  return (
    <div className="mt-5 grid gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-axBlack/45">
          {formatDate(match.date)} · {match.kickoff || "Orario da definire"}
        </p>
        <h3 className="mt-3 font-display text-3xl font-light leading-none text-axBlack sm:text-4xl">
          {opponent}
        </h3>
      </div>
      <div className="grid gap-2 text-sm text-axBlack/62">
        <p>{match.competition}</p>
        <p>{match.venue || "Campo da confermare"}</p>
        <p className="font-medium text-axBlack">{remaining.label}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <CountdownBox label="Giorni" value={remaining.days} />
        <CountdownBox label="Ore" value={remaining.hours} />
        <CountdownBox label="Min" value={remaining.minutes} />
      </div>
      <span className="inline-flex w-fit border border-axBlack/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-axBlack">
        {match.status === "scheduled" ? "Da giocare" : "Conclusa"}
      </span>
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-axBlack/10 bg-[#f7f5ef] p-3 text-center">
      <p className="font-display text-3xl font-light leading-none text-axBlack">{String(value).padStart(2, "0")}</p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-axBlack/45">{label}</p>
    </div>
  );
}

function buildMatchDate(match: Match) {
  const kickoff = match.kickoff || "00:00";
  const normalizedKickoff = /^\d{2}:\d{2}$/.test(kickoff) ? kickoff : "00:00";
  return new Date(`${match.date}T${normalizedKickoff}:00`);
}

function getRemainingTime(target: Date | null): RemainingTime {
  if (!target) {
    return { days: 0, hours: 0, minutes: 0, label: "Prossima partita in attesa del calendario ufficiale." };
  }

  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, label: "Gara conclusa o in aggiornamento." };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, label: "Countdown alla prossima gara ufficiale." };
}

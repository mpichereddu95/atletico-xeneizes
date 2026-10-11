"use client";

import { useState } from "react";
import { PlayersSection } from "@/components/PlayersSection";
import type { Player } from "@/lib/types";

type PlayerRosterTabsProps = {
  currentPlayers: Player[];
  archivePlayers: Player[];
};

export function PlayerRosterTabs({ currentPlayers, archivePlayers }: PlayerRosterTabsProps) {
  const [season, setSeason] = useState<"2026/27" | "2025/26">("2026/27");
  const players = season === "2026/27" ? currentPlayers : archivePlayers;

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2 border-b border-white/12 pb-4" role="tablist" aria-label="Seleziona stagione">
        {(["2026/27", "2025/26"] as const).map((label) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={season === label}
            onClick={() => setSeason(label)}
            className={`focus-ring min-h-11 border px-5 text-sm font-bold transition ${season === label ? "border-axGold bg-axGold text-axBlack" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
          >
            {label}{label === "2026/27" ? " · Rosa attuale" : " · Archivio"}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={`Rosa ${season}`}>
        <PlayersSection players={players} seasonLabel={season} />
      </div>
    </div>
  );
}

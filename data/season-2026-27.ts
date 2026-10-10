import type { Standing } from "@/lib/types";
import { currentSeasonLabel } from "@/data/club";
export { currentSeasonLabel } from "@/data/club";

export const currentCompetition = "Coppa Cobram - Girone D";
export const currentSeasonSources = {
  checkedAt: "2026-10-10",
  info: "https://www.calcioliguria.com/campionati/Info/2026-Coppa-Cobram-Girone-D/ATLETICO-XENEIZES-149.html",
  squad: "https://www.calcioliguria.com/campionati/Squadre/2026-Coppa-Cobram-Girone-D/atletico-xeneizes-149.html",
  calendar: "https://www.calcioliguria.com/campionati/Calendario/2026-Coppa-Cobram-Girone-D/ATLETICO-XENEIZES-149.html",
  standings: "https://www.calcioliguria.com/campionati.html?func=showResultsRank&p=1283"
};

// Calcio Liguria lists nine teams with zero games; no sporting rank is assigned yet.
export const currentStandings: Standing[] = [
  "MARI ASFALTI",
  "AGUILAS ZENA FC",
  "ATLETICO XENEIZES 149",
  "BAXAICO",
  "CASABLANCA FC",
  "DE WAVE GROUP",
  "GENOVA GALAXY",
  "MAPIGE FC",
  "PRO SECCO FC"
].map((team) => ({
  position: null,
  season: currentSeasonLabel,
  competition: currentCompetition,
  team,
  played: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  points: 0,
  difference: 0
}));

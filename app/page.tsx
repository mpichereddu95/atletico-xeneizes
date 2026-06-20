import { Hero } from "@/components/Hero";
import { MatchesSection } from "@/components/MatchesSection";
import { NewsSection } from "@/components/NewsSection";
import { PlayersSection } from "@/components/PlayersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StaffSection } from "@/components/StaffSection";
import { getArticles, getHomeSnapshot, getMatches, getPlayers, getSponsors, getStaff, getStandings } from "@/lib/api";

export default async function Home() {
  const [{ latestResult, nextMatch }, players, matches, standings, articles, staff, sponsors] = await Promise.all([
    getHomeSnapshot(),
    getPlayers(),
    getMatches(),
    getStandings(),
    getArticles(),
    getStaff(),
    getSponsors()
  ]);

  return (
    <main>
      <Hero latestResult={latestResult} nextMatch={nextMatch} />
      <PlayersSection players={players} />
      <MatchesSection matches={matches} standings={standings} />
      <NewsSection articles={articles} />
      <SponsorsSection sponsors={sponsors} />
      <StaffSection staff={staff} />
    </main>
  );
}

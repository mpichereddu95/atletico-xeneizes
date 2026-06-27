import { Hero } from "@/components/Hero";
import { CommunitySection } from "@/components/CommunitySection";
import { MatchCenterSection } from "@/components/MatchCenterSection";
import { NewsSection } from "@/components/NewsSection";
import { PlayersSection } from "@/components/PlayersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StaffSection } from "@/components/StaffSection";
import { StandingsPreviewSection } from "@/components/StandingsPreviewSection";
import { SeasonStatusSection } from "@/components/SeasonStatusSection";
import { getArticles, getCurrentPlayers, getHomeSnapshot, getMatches, getSeasonSummaries, getSponsors, getStaff, getStandings } from "@/lib/api";

export default async function Home() {
  const [{ latestResult, nextMatch }, players, matches, standings, articles, staff, sponsors, seasons] = await Promise.all([
    getHomeSnapshot(),
    getCurrentPlayers(),
    getMatches(),
    getStandings(),
    getArticles(),
    getStaff(),
    getSponsors(),
    getSeasonSummaries()
  ]);
  const matchReports = articles.filter((article) => article.category === "Match report");
  const newsArticles = articles.filter((article) => article.category !== "Match report");

  return (
    <main>
      <Hero latestResult={latestResult} nextMatch={nextMatch} />
      <MatchCenterSection latestResult={latestResult} nextMatch={nextMatch} matches={matches} standings={standings} />
      <SeasonStatusSection seasons={seasons} />
      <StandingsPreviewSection standings={standings} />
      <PlayersSection players={players} variant="preview" limit={8} />
      <NewsSection
        articles={matchReports}
        kicker="Match report"
        title="Report ufficiali"
        text="Le cronache raccolgono risultati, protagonisti e momenti chiave delle gare ufficiali."
        limit={3}
        ctaHref="/match-report"
        ctaLabel="Tutti i match report"
      />
      <NewsSection
        articles={newsArticles}
        kicker="News"
        title="Ultime news"
        text="Comunicati e aggiornamenti del club raccolti nello spazio ufficiale Atletico Xeneizes 149."
        limit={3}
        ctaHref="/news"
        ctaLabel="Archivio news"
      />
      <CommunitySection />
      <StaffSection staff={staff} />
      <SponsorsSection sponsors={sponsors} />
    </main>
  );
}

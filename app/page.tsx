import { Hero } from "@/components/Hero";
import { CommunitySection } from "@/components/CommunitySection";
import { MatchCenterSection } from "@/components/MatchCenterSection";
import { NewsSection } from "@/components/NewsSection";
import { PlayersSection } from "@/components/PlayersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StaffSection } from "@/components/StaffSection";
import { StandingsPreviewSection } from "@/components/StandingsPreviewSection";
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
  const matchReports = articles.filter((article) => article.category === "Match report");
  const newsArticles = articles.filter((article) => article.category !== "Match report");

  return (
    <main>
      <Hero latestResult={latestResult} nextMatch={nextMatch} />
      <MatchCenterSection latestResult={latestResult} nextMatch={nextMatch} matches={matches} standings={standings} />
      <StandingsPreviewSection standings={standings} />
      <PlayersSection players={players} variant="preview" limit={8} />
      <NewsSection
        articles={matchReports}
        kicker="Match report"
        title="Report ufficiali"
        text="Anteprime dei report gara: risultato, protagonisti, cronaca e gallery saranno gestibili dal CMS."
        limit={3}
        ctaHref="/match-report"
        ctaLabel="Tutti i match report"
      />
      <NewsSection
        articles={newsArticles}
        kicker="News"
        title="Ultime news"
        text="Solo le anteprime piu recenti in home, con archivio completo nella sezione editoriale."
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

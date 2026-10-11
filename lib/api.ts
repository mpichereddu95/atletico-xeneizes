import { articles, cmsArticles, currentPlayers, matches, mediaItems, navigation, officialChannels, players, projectStatement, seasonSummaries, sponsors, staff, standings, summerFriendliesSeasonLabel } from "@/data/club";
import { currentSeasonLabel, currentStandings } from "@/data/season-2026-27";
import {
  getSanityArticleBySlug,
  getSanityArticles,
  getSanityArticleSlugs,
  getSanityMatches,
  getSanityMediaItems,
  getSanityPlayers,
  getSanitySponsors,
  getSanityStandings,
  mapStaticCmsArticle
} from "@/lib/sanity";

export async function getNavigation() {
  return navigation;
}

export async function getHomeSnapshot() {
  const currentMatches = (await getMatches()).filter((match) => match.season === currentSeasonLabel);
  return {
    latestResult: currentMatches.filter((match) => match.status === "played").sort((a, b) => b.date.localeCompare(a.date))[0] ?? null,
    nextMatch: currentMatches.filter((match) => match.status === "scheduled").sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  };
}

export async function getPlayers() {
  const sanityPlayers = await getSanityPlayers();
  const byId = new Map(players.map((player) => [player.id, player]));
  for (const player of currentPlayers) byId.set(player.id, player);
  for (const player of sanityPlayers) byId.set(player.id, player);
  return Array.from(byId.values());
}

export async function getCurrentPlayers() {
  const allPlayers = await getPlayers();

  return allPlayers.filter((player) => player.seasons?.includes(currentSeasonLabel) && player.currentRoster !== false);
}

export async function getPlayerById(playerId: string) {
  const allPlayers = await getPlayers();
  return allPlayers.find((player) => player.id === playerId) ?? null;
}

export async function getMatches() {
  const sanityMatches = await getSanityMatches();
  if (sanityMatches.length === 0) return matches;

  const cmsMatchKeys = new Set(sanityMatches.map((match) => `${match.season}|${match.competition}|${match.date}|${match.home}|${match.away}`));
  const fallbackFriendlies = matches.filter((match) =>
    match.season === summerFriendliesSeasonLabel &&
    !cmsMatchKeys.has(`${match.season}|${match.competition}|${match.date}|${match.home}|${match.away}`)
  );

  return [...sanityMatches, ...fallbackFriendlies];
}

export async function getSeasonSummaries() {
  return seasonSummaries;
}

export async function getStandings() {
  const sanityStandings = await getSanityStandings();
  const cmsCompetitions = new Set(sanityStandings.map((row) => `${row.season}:${row.competition}`));
  const fallback = [...currentStandings, ...standings].filter((row) => !cmsCompetitions.has(`${row.season}:${row.competition}`));
  return [...sanityStandings, ...fallback].sort((a, b) => b.season.localeCompare(a.season));
}

export async function getArticles() {
  const sanityArticles = await getSanityArticles();
  return sanityArticles.length > 0 ? sanityArticles : articles;
}

export async function getArticleSlugs() {
  const sanitySlugs = await getSanityArticleSlugs();
  return sanitySlugs.length > 0 ? sanitySlugs : cmsArticles.map((article) => article.sys.slug);
}

export async function getArticleBySlug(slug: string) {
  const sanityArticle = await getSanityArticleBySlug(slug);
  if (sanityArticle) {
    return sanityArticle;
  }

  const article = cmsArticles.find((entry) => entry.sys.slug === slug);

  return article ? mapStaticCmsArticle(article) : null;
}

export async function getCmsArticles() {
  return cmsArticles;
}

export async function getMediaItems() {
  const sanityMediaItems = await getSanityMediaItems();
  return sanityMediaItems.length > 0 ? sanityMediaItems : mediaItems;
}

export async function getStaff() {
  return staff;
}

export async function getSponsors() {
  const sanitySponsors = await getSanitySponsors();
  return sanitySponsors.length > 0 ? sanitySponsors : sponsors;
}

export async function getOfficialChannels() {
  return officialChannels;
}

export async function getProjectStatement() {
  return projectStatement;
}

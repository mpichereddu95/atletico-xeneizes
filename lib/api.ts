import { articles, cmsArticles, latestResult, matches, mediaItems, navigation, nextMatch, officialChannels, players, projectStatement, seasonSummaries, sponsors, staff, standings } from "@/data/club";
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
  return {
    latestResult,
    nextMatch
  };
}

export async function getPlayers() {
  const sanityPlayers = await getSanityPlayers();
  return sanityPlayers.length > 0 ? sanityPlayers : players;
}

export async function getCurrentPlayers() {
  const excludedFromCurrentRoster = new Set(["stefano-montiel-noguera", "senad-hrustic"]);
  const allPlayers = await getPlayers();

  return allPlayers.filter((player) => player.currentRoster !== false && !excludedFromCurrentRoster.has(player.id));
}

export async function getPlayerById(playerId: string) {
  const allPlayers = await getPlayers();
  return allPlayers.find((player) => player.id === playerId) ?? null;
}

export async function getMatches() {
  const sanityMatches = await getSanityMatches();
  return sanityMatches.length > 0 ? sanityMatches : matches;
}

export async function getSeasonSummaries() {
  return seasonSummaries;
}

export async function getStandings() {
  const sanityStandings = await getSanityStandings();
  return sanityStandings.length > 0 ? sanityStandings : standings;
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

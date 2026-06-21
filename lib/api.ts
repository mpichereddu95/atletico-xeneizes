import { articles, cmsArticles, latestResult, matches, mediaItems, navigation, nextMatch, officialChannels, players, projectStatement, sponsors, staff, standings } from "@/data/club";
import { getSanityArticleBySlug, getSanityArticles, getSanityArticleSlugs, mapStaticCmsArticle } from "@/lib/sanity";

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
  return players;
}

export async function getPlayerById(playerId: string) {
  return players.find((player) => player.id === playerId) ?? null;
}

export async function getMatches() {
  return matches;
}

export async function getStandings() {
  return standings;
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
  return mediaItems;
}

export async function getStaff() {
  return staff;
}

export async function getSponsors() {
  return sponsors;
}

export async function getOfficialChannels() {
  return officialChannels;
}

export async function getProjectStatement() {
  return projectStatement;
}

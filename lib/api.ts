import { articles, cmsArticles, latestResult, matches, mediaItems, navigation, nextMatch, officialChannels, players, projectStatement, sponsors, staff, standings } from "@/data/club";
import type { Article, CmsArticleRecord } from "@/lib/types";

function mapCmsArticle(record: CmsArticleRecord): Article {
  return {
    id: record.sys.id,
    slug: record.sys.slug,
    category: record.fields.category,
    title: record.fields.title,
    excerpt: record.fields.excerpt,
    date: record.sys.publishedAt,
    author: record.fields.author,
    coverImage: record.fields.coverImage,
    content: record.fields.content
  };
}

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
  return articles;
}

export async function getArticleSlugs() {
  return cmsArticles.map((article) => article.sys.slug);
}

export async function getArticleBySlug(slug: string) {
  const article = cmsArticles.find((entry) => entry.sys.slug === slug);

  return article ? mapCmsArticle(article) : null;
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

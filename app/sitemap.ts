import type { MetadataRoute } from "next";
import { getArticleSlugs, getPlayers } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lightsteelblue-giraffe-291026.hostingersite.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [players, articleSlugs] = await Promise.all([getPlayers(), getArticleSlugs()]);
  const now = new Date();

  const staticRoutes = ["", "/rosa", "/giocatori", "/partite", "/calendario", "/risultati", "/classifica", "/match-report", "/stagioni", "/news", "/media", "/staff", "/sponsor"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now
  }));

  const playerRoutes = players.map((player) => ({
    url: `${siteUrl}/rosa/${player.id}`,
    lastModified: now
  }));

  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${siteUrl}/news/${slug}`,
    lastModified: now
  }));

  return [...staticRoutes, ...playerRoutes, ...articleRoutes];
}

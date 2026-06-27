import type { Article, CmsArticleRecord, Match, MediaItem, Player, Sponsor, Standing } from "@/lib/types";

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-21",
  readToken: process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_AUTH_TOKEN ?? ""
};

const articleProjection = `{
  "id": _id,
  "slug": slug.current,
  category,
  title,
  excerpt,
  "date": publishedAt,
  author,
  "coverImage": {
    "src": coverImage.asset->url,
    "alt": coverImage.alt
  },
  "contentBlocks": contentBlocks[]{
    "type": coalesce(type, select(_type == "headingBlock" => "heading", _type == "paragraphBlock" => "paragraph")),
    text
  },
  "matchReport": select(defined(matchReport) => {
    "result": matchReport.result,
    "scorers": matchReport.scorers,
    "mvp": matchReport.mvp,
    "chronicle": matchReport.chronicle[]{
      "type": coalesce(type, "paragraph"),
      text
    },
    "gallery": matchReport.gallery[]{
      "src": asset->url,
      "alt": coalesce(alt, "Gallery Atletico Xeneizes")
    }
  }, null)
}`;

const playerProjection = `{
  "id": slug.current,
  name,
  number,
  role,
  "currentRoster": coalesce(currentRoster, true),
  birthLabel,
  "photo": {
    "src": coalesce(photo.asset->url, externalPhotoUrl),
    "alt": coalesce(photo.alt, name)
  },
  bio,
  sourceUrl,
  "stats": {
    "appearances": coalesce(appearances, 0),
    "goals": coalesce(goals, 0),
    assists,
    "yellowCards": coalesce(yellowCards, 0),
    "redCards": coalesce(redCards, 0),
    "ownGoals": coalesce(ownGoals, 0),
    bestPlayerAwards,
    bestGoalkeeperAwards
  }
}`;

const matchProjection = `{
  "id": _id,
  "season": season->name,
  "competition": competition->name,
  phase,
  round,
  "date": matchDate,
  "kickoff": coalesce(kickoff, ""),
  home,
  away,
  "venue": coalesce(venue, ""),
  score,
  status,
  sourceUrl
}`;

const standingProjection = `{
  position,
  "season": season->name,
  "competition": competition->name,
  team,
  "played": coalesce(played, 0),
  "wins": coalesce(wins, 0),
  "draws": coalesce(draws, 0),
  "losses": coalesce(losses, 0),
  "goalsFor": coalesce(goalsFor, 0),
  "goalsAgainst": coalesce(goalsAgainst, 0),
  "points": coalesce(points, 0),
  "difference": coalesce(difference, 0)
}`;

const sponsorProjection = `{
  name,
  tier,
  description,
  "href": coalesce(href, null),
  "instagramHref": coalesce(instagramHref, instagram, null),
  services,
  "logo": select(defined(logo.asset) => {
    "src": logo.asset->url,
    "alt": coalesce(logo.alt, name)
  }, null)
}`;

const mediaProjection = `{
  "id": _id,
  type,
  title,
  "image": coalesce(image.asset->url, externalImageUrl),
  "alt": coalesce(image.alt, title)
}`;

type SanityArticle = Omit<Article, "content"> & {
  contentBlocks?: Article["content"];
};

function isSanityConfigured() {
  return Boolean(sanityConfig.projectId && sanityConfig.dataset);
}

function queryUrl(query: string) {
  const encodedQuery = encodeURIComponent(query);
  return `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodedQuery}`;
}

async function sanityFetch<T>(query: string) {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    const response = await fetch(queryUrl(query), {
      headers: sanityConfig.readToken ? { Authorization: `Bearer ${sanityConfig.readToken}` } : undefined,
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { result: T };
    return payload.result;
  } catch {
    return null;
  }
}

function mapSanityArticle(article: SanityArticle): Article {
  return {
    ...article,
    content: article.contentBlocks ?? []
  };
}

export async function getSanityArticles() {
  const articles = await sanityFetch<SanityArticle[]>(
    `*[_type == "article" && status == "published"] | order(publishedAt desc) ${articleProjection}`
  );

  return articles?.map(mapSanityArticle) ?? [];
}

export async function getSanityArticleSlugs() {
  return (
    (await sanityFetch<string[]>(
      `*[_type == "article" && status == "published" && defined(slug.current)].slug.current`
    )) ?? []
  );
}

export async function getSanityArticleBySlug(slug: string) {
  const article = await sanityFetch<SanityArticle | null>(
    `*[_type == "article" && status == "published" && slug.current == "${slug}"][0] ${articleProjection}`
  );

  return article ? mapSanityArticle(article) : null;
}

export async function getSanityPlayers() {
  const players = await sanityFetch<Player[]>(
    `*[_type == "player" && defined(slug.current)] | order(role asc, name asc) ${playerProjection}`
  );

  return players?.filter((player) => player.id && player.name && player.photo.src) ?? [];
}

export async function getSanityMatches() {
  const matches = await sanityFetch<Match[]>(
    `*[_type == "match" && defined(season->name) && defined(competition->name)] | order(matchDate asc) ${matchProjection}`
  );

  return matches?.filter((match) => match.season && match.competition && match.date && match.home && match.away) ?? [];
}

export async function getSanityStandings() {
  const standings = await sanityFetch<Standing[]>(
    `*[_type == "standing" && defined(season->name) && defined(competition->name)] | order(position asc) ${standingProjection}`
  );

  return standings?.filter((row) => row.season && row.competition && row.team) ?? [];
}

export async function getSanitySponsors() {
  const sponsors = await sanityFetch<Sponsor[]>(
    `*[_type == "sponsor" && active == true] | order(name asc) ${sponsorProjection}`
  );

  return sponsors?.filter((sponsor) => sponsor.name && sponsor.tier) ?? [];
}

export async function getSanityMediaItems() {
  const mediaItems = await sanityFetch<MediaItem[]>(
    `*[_type == "mediaItem" && defined(title)] | order(featured desc, publishedAt desc) ${mediaProjection}`
  );

  return mediaItems?.filter((item) => item.type && item.title && item.image) ?? [];
}

export function mapStaticCmsArticle(record: CmsArticleRecord): Article {
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

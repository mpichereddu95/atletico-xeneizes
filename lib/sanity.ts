import type { Article, CmsArticleRecord } from "@/lib/types";

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-21"
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
  contentBlocks
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

  const response = await fetch(queryUrl(query), {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
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

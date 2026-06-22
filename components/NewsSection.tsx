import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

type NewsSectionProps = {
  articles: Article[];
  title?: string;
  kicker?: string;
  text?: string;
  limit?: number;
  category?: Article["category"];
  ctaHref?: string;
  ctaLabel?: string;
};

export function NewsSection({
  articles,
  title = "Articoli e comunicati",
  kicker = "News",
  text = "Archivio editoriale con comunicati ufficiali, aggiornamenti del club e match report.",
  limit,
  category,
  ctaHref,
  ctaLabel
}: NewsSectionProps) {
  const visibleArticles = articles.filter((article) => (category ? article.category === category : true)).slice(0, limit ?? articles.length);

  return (
    <section id={category === "Match report" ? "match-report" : "news"} className="content-auto bg-axBlack py-14 lg:py-20">
      <div className="section-shell">
        <SectionHeading
          kicker={kicker}
          title={title}
          text={text}
        />

        {visibleArticles.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {visibleArticles.map((article, index) => {
              const sameAsPrev = visibleArticles[index - 1]?.coverImage.src === article.coverImage.src;
              const sameAsNext = visibleArticles[index + 1]?.coverImage.src === article.coverImage.src;
              const repeatedSource = sameAsPrev || sameAsNext;
              const overlayTint =
                article.category === "Match report"
                  ? "bg-[#C9A84C18]"
                  : article.category === "Comunicato"
                    ? "bg-[#FF8C9418]"
                    : "";
              const imageClass = getArticleCoverClass(article.id);

              return (
              <article key={article.id} className="content-auto overflow-hidden border border-white/10 bg-white/[0.04] transition hover:border-axGold/70">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" loading="lazy" className={`${imageClass} transition duration-500 hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-axBlack via-transparent to-transparent" />
                  {repeatedSource ? <div className={`absolute inset-0 ${overlayTint}`} /> : null}
                  <span className="absolute left-4 top-4 bg-[#0A0A0Acc] px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
                    {article.category} · {formatDate(article.date)}
                  </span>
                </div>
                <div className="grid gap-4 p-6">
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-xs font-bold text-white/55">{article.author}</span>
                  </div>
                  <h3 className="font-display text-3xl font-black uppercase leading-tight text-white">{article.title}</h3>
                  <p className="text-sm leading-6 text-white/62">{article.excerpt}</p>
                  <Link href={`/news/${article.slug}`} className="inline-flex text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-axGold">
                    Leggi l'articolo
                  </Link>
                </div>
              </article>
            );
            })}
          </div>
        ) : (
          <div className="border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-white/64">
            Nessun articolo pubblicato al momento.
          </div>
        )}

        {ctaHref && ctaLabel ? (
          <Link href={ctaHref} className="mt-5 inline-flex border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold">
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function getArticleCoverClass(articleId: string) {
  if (articleId === "news-01") {
    return "object-cover object-center";
  }

  if (articleId === "news-02") {
    return "object-cover object-top";
  }

  return "object-cover object-center";
}

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
              const featured = index === 0 && visibleArticles.length > 2;

              return (
              <article key={article.id} className={`content-auto premium-panel group overflow-hidden transition hover:border-axGold/70 ${featured ? "lg:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"} loading="lazy" className={`${imageClass} transition duration-500 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-axBlack via-transparent to-transparent" />
                  {repeatedSource ? <div className={`absolute inset-0 ${overlayTint}`} /> : null}
                  <span className="absolute left-4 top-4 rounded-[6px] bg-[#0A0A0Acc] px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
                    {article.category} · {formatDate(article.date)}
                  </span>
                </div>
                <div className="grid gap-4 p-5 sm:p-6">
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-xs font-bold text-white/55">{article.author}</span>
                  </div>
                  <h3 className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} font-display font-black uppercase leading-tight text-white`}>{article.title}</h3>
                  <p className="text-sm leading-6 text-white/62">{article.excerpt}</p>
                  <Link href={`/news/${article.slug}`} className="focus-ring inline-flex w-fit rounded-sm text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-axGold">
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
          <Link href={ctaHref} className="focus-ring mt-5 inline-flex rounded-[6px] border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold">
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

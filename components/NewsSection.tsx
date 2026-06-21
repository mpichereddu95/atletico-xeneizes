import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

type NewsSectionProps = {
  articles: Article[];
};

export function NewsSection({ articles }: NewsSectionProps) {
  return (
    <section id="news" className="bg-axBlack py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="News"
          title="Articoli e comunicati"
          text="Archivio editoriale con comunicati ufficiali, aggiornamenti del club e match report."
        />

        {articles.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {articles.map((article, index) => {
              const sameAsPrev = articles[index - 1]?.coverImage.src === article.coverImage.src;
              const sameAsNext = articles[index + 1]?.coverImage.src === article.coverImage.src;
              const repeatedSource = sameAsPrev || sameAsNext;
              const overlayTint =
                article.category === "Match report"
                  ? "bg-[#C9A84C18]"
                  : article.category === "Comunicato"
                    ? "bg-[#FF8C9418]"
                    : "";
              const imageClass = getArticleCoverClass(article.id);

              return (
              <article key={article.id} className="overflow-hidden border border-white/10 bg-white/[0.04] transition hover:border-axGold/70">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className={`${imageClass} transition duration-500 hover:scale-105`} />
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

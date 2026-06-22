import Link from "next/link";
import Image from "next/image";
import { NewsSection } from "@/components/NewsSection";
import { PageHero } from "@/components/PageHero";
import { getArticles } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default async function NewsPage() {
  const articles = await getArticles();
  const featuredArticle = articles[0];

  return (
    <main>
      <PageHero
        kicker="News"
        title="Articoli, comunicati e match report"
        text="Archivio editoriale del club con comunicati ufficiali, approfondimenti e match report della stagione."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/partite", label: "Vai alle partite" }}
      />
      {featuredArticle ? (
        <section className="bg-axBlack pb-4 pt-10">
          <div className="section-shell">
            <article className="grid overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[360px]">
                <Image
                  src={featuredArticle.coverImage.src}
                  alt={featuredArticle.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={featuredArticle.id === "news-01" ? "object-cover object-center" : "object-cover object-top"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-axBlack via-transparent to-transparent" />
              </div>
              <div className="grid content-end gap-5 p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-axGold">In evidenza</p>
                <h2 className="font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl">{featuredArticle.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/58">
                  <span>{formatDate(featuredArticle.date)}</span>
                  <span>{featuredArticle.author}</span>
                </div>
                <p className="max-w-xl text-base leading-7 text-white/72">{featuredArticle.excerpt}</p>
                <Link href={`/news/${featuredArticle.slug}`} className="inline-flex text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-axGold">
                  Apri l'articolo completo
                </Link>
              </div>
            </article>
          </div>
        </section>
      ) : null}
      <NewsSection articles={articles} />
    </main>
  );
}

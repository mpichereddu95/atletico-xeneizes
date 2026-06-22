import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { getArticleBySlug, getArticleSlugs } from "@/lib/api";
import { formatLongDate } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Articolo non trovato | Atletico Xeneizes"
    };
  }

  return {
    title: `${article.title} | Atletico Xeneizes`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage.src]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <article className="bg-axBlack pt-28">
        <div className="section-shell py-10 lg:py-14">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-axGold">{article.category}</p>
            <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/56">
              <span>{formatLongDate(article.date)}</span>
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        <div className="section-shell pb-14">
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.04]">
            <div className="relative aspect-[16/8] min-h-[320px]">
              <Image src={article.coverImage.src} alt={article.coverImage.alt} fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-axBlack/65 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="section-shell pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
              {article.category === "Match report" && article.matchReport ? (
                <div className="mb-8 grid gap-4 border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-3">
                  <ReportStat label="Risultato" value={article.matchReport.result} />
                  <ReportStat label="MVP" value={article.matchReport.mvp} />
                  <ReportStat label="Marcatori" value={article.matchReport.scorers?.join(", ")} />
                </div>
              ) : null}
              <ArticleBody content={article.content} />
              {article.category === "Match report" && article.matchReport?.chronicle?.length ? (
                <div className="mt-10 border-t border-white/10 pt-8">
                  <h2 className="font-display text-3xl font-black uppercase text-white">Cronaca</h2>
                  <div className="mt-6">
                    <ArticleBody content={article.matchReport.chronicle} />
                  </div>
                </div>
              ) : null}
              {article.category === "Match report" && article.matchReport?.gallery?.length ? (
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {article.matchReport.gallery.map((image) => (
                    <div key={image.src} className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.03]">
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <aside className="grid gap-5 self-start">
              <div className="border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-axGold">Autore</p>
                <p className="mt-4 font-display text-3xl font-black uppercase text-white">{article.author}</p>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Contenuto pubblicato dalla redazione ufficiale del club.
                </p>
              </div>
              <div className="border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-axGold">Redazione</p>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  News, comunicati e match report sono organizzati per mantenere uno storico editoriale chiaro e consultabile.
                </p>
                <Link href="/news" className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-axGold">
                  Torna a tutte le news
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}

function ReportStat({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-axGold">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{value || "Da aggiornare"}</p>
    </div>
  );
}

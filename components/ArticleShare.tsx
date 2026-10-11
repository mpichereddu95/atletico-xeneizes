"use client";

import { useState } from "react";

type ArticleShareProps = {
  slug: string;
};

const siteUrl = "https://www.atleticoxeneizes149.com";

export function ArticleShare({ slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = `${siteUrl}/news/${slug}`;

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section aria-labelledby="article-share-title" className="border border-white/10 bg-white/[0.04] p-6">
      <h2 id="article-share-title" className="text-xs font-black uppercase tracking-[0.24em] text-axGold">
        Condividi la notizia
      </h2>
      <button
        type="button"
        onClick={copyArticleLink}
        className="focus-ring mt-4 inline-flex min-h-11 items-center border border-axGold/70 px-3 py-2 text-sm font-semibold text-axGold transition hover:bg-axGold hover:text-axBlack"
      >
        {copied ? "Link copiato" : "Copia link"}
      </button>
      <p className="sr-only" aria-live="polite">
        {copied ? "Link dell'articolo copiato negli appunti." : ""}
      </p>
    </section>
  );
}

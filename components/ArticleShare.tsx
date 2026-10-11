"use client";

import { useState } from "react";

type ArticleShareProps = {
  title: string;
  slug: string;
};

const siteUrl = "https://www.atleticoxeneizes149.com";

export function ArticleShare({ title, slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = `${siteUrl}/news/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` }
  ];

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
      <div className="mt-4 flex flex-wrap gap-2">
        {shareLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Condividi su ${item.label}`}
            className="focus-ring inline-flex min-h-11 items-center border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:border-axGold hover:text-axGold"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyArticleLink}
          className="focus-ring inline-flex min-h-11 items-center border border-axGold/70 px-3 py-2 text-sm font-semibold text-axGold transition hover:bg-axGold hover:text-axBlack"
        >
          {copied ? "Link copiato" : "Copia link"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{copied ? "Link dell'articolo copiato negli appunti." : ""}</p>
    </section>
  );
}

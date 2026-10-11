"use client";

import { useEffect, useState } from "react";

type ArticleShareProps = {
  title: string;
  slug: string;
};

const siteUrl = "https://www.atleticoxeneizes149.com";

export function ArticleShare({ title, slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [sharingStory, setSharingStory] = useState(false);
  const [storyFile, setStoryFile] = useState<File | null>(null);
  const articleUrl = `${siteUrl}/news/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks: { label: string; href: string }[] = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` }
  ];

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/news/${slug}/story`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Story generation failed");
        return response.blob();
      })
      .then((blob) => setStoryFile(new File([blob], `atletico-news-${slug}.png`, { type: "image/png" })))
      .catch(() => {
        if (!controller.signal.aborted) setStoryFile(null);
      });

    return () => controller.abort();
  }, [slug]);

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  async function shareInstagramStory() {
    setShareStatus("");

    try {
      if (!storyFile) throw new Error("Story image is not ready");
      const shareData = { files: [storyFile], title, text: articleUrl };

      if (navigator.canShare?.({ files: [storyFile] })) {
        setSharingStory(true);
        const sharePromise = navigator.share(shareData);
        await sharePromise;
        setShareStatus("Scegli Instagram nel menu di condivisione. Nella storia, aggiungi uno sticker Link all'articolo.");
      } else {
        const downloadUrl = URL.createObjectURL(storyFile);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = storyFile.name;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        setShareStatus("Immagine storia scaricata. Caricala su Instagram e aggiungi uno sticker Link all'articolo.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Non e stato possibile condividere l'immagine. Riprova dal menu di condivisione del telefono.");
    } finally {
      setSharingStory(false);
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
          onClick={shareInstagramStory}
          disabled={sharingStory || !storyFile}
          className="focus-ring inline-flex min-h-11 items-center border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:border-axGold hover:text-axGold disabled:cursor-wait disabled:opacity-60"
        >
          {sharingStory ? "Apertura condivisione..." : storyFile ? "Instagram Stories" : "Preparo la storia..."}
        </button>
        <button
          type="button"
          onClick={copyArticleLink}
          className="focus-ring inline-flex min-h-11 items-center border border-axGold/70 px-3 py-2 text-sm font-semibold text-axGold transition hover:bg-axGold hover:text-axBlack"
        >
          {copied ? "Link copiato" : "Copia link"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Link dell'articolo copiato negli appunti." : shareStatus}
      </p>
      {shareStatus ? <p className="mt-3 text-sm leading-6 text-white/65" role="status">{shareStatus}</p> : null}
    </section>
  );
}

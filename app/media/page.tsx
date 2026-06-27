import { MediaSection } from "@/components/MediaSection";
import { PageHero } from "@/components/PageHero";
import { getMediaItems } from "@/lib/api";

export default async function MediaPage() {
  const mediaItems = await getMediaItems();

  return (
    <main>
      <PageHero
        kicker="Media"
        title="Gallery e contenuti visuali"
        text="I contenuti ufficiali della squadra saranno pubblicati in questa sezione: foto, video, grafiche matchday e momenti del gruppo."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/news", label: "Apri le news" }}
      />
      <MediaSection mediaItems={mediaItems} />
    </main>
  );
}

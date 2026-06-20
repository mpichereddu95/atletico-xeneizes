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
        text="Raccolta iniziale di immagini ufficiali del club con struttura pronta per espandersi in gallery stagionali, highlight video e archivi fotografici."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/news", label: "Apri le news" }}
      />
      <MediaSection mediaItems={mediaItems} />
    </main>
  );
}

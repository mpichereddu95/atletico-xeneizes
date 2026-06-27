import { PageHero } from "@/components/PageHero";
import { SponsorsSection } from "@/components/SponsorsSection";
import { getSponsors } from "@/lib/api";

export default async function SponsorPage() {
  const sponsors = await getSponsors();

  return (
    <main>
      <PageHero
        kicker="Sponsor"
        title="Partner e presenza commerciale"
        text="Partner ufficiali, legami commerciali e realta che sostengono il percorso di Atletico Xeneizes 149."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/media", label: "Apri media" }}
      />
      <SponsorsSection sponsors={sponsors} />
    </main>
  );
}

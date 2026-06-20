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
        text="Sezione preparata per partner ufficiali, loghi, link e visibilita per tier, senza pubblicare brand non ancora confermati."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/media", label: "Apri media" }}
      />
      <SponsorsSection sponsors={sponsors} />
    </main>
  );
}

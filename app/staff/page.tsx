import { PageHero } from "@/components/PageHero";
import { StaffSection } from "@/components/StaffSection";
import { getStaff } from "@/lib/api";

export default async function StaffPage() {
  const staff = await getStaff();

  return (
    <main>
      <PageHero
        kicker="Staff"
        title="Area tecnica e organizzativa"
        text="Staff aggiornato secondo le indicazioni del club, con separazione chiara tra ruoli societari, tecnici e figure di riferimento della squadra."
        primaryCta={{ href: "/", label: "Torna alla home" }}
        secondaryCta={{ href: "/rosa", label: "Vedi la rosa" }}
      />
      <StaffSection staff={staff} />
    </main>
  );
}

import { SectionHeading } from "@/components/SectionHeading";

const communityItems = [
  {
    title: "Newsletter",
    text: "Aggiornamenti ufficiali, comunicazioni del club e appuntamenti della squadra."
  },
  {
    title: "WhatsApp community",
    text: "Uno spazio diretto per vivere matchday, avvisi rapidi e iniziative dedicate ai tifosi."
  },
  {
    title: "Telegram",
    text: "Notizie essenziali e comunicazioni ufficiali in un canale semplice da seguire."
  },
  {
    title: "Registrazione tifosi",
    text: "Un percorso pensato per avvicinare sostenitori, amici e persone legate al progetto."
  }
];

export function CommunitySection() {
  return (
    <section id="community" className="content-auto bg-axBlack py-14 lg:py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Community"
          title="Canali tifosi"
          text="Atletico Xeneizes 149 vuole raccogliere attorno alla squadra una community riconoscibile, presente e informata."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {communityItems.map((item) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-axGold">{item.title}</p>
              <p className="mt-4 text-sm leading-6 text-white/62">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/SectionHeading";

const communityItems = [
  {
    title: "Newsletter",
    text: "Spazio predisposto per aggiornamenti ufficiali, convocazioni e comunicazioni del club."
  },
  {
    title: "WhatsApp community",
    text: "Canale futuro per avvisi rapidi, matchday e contenuti riservati ai tifosi."
  },
  {
    title: "Telegram",
    text: "Area pronta per notifiche leggere e archivio dei comunicati."
  },
  {
    title: "Registrazione tifosi",
    text: "Base futura per creare una community ordinata e aggiornabile nel tempo."
  }
];

export function CommunitySection() {
  return (
    <section id="community" className="content-auto bg-axBlack py-14 lg:py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Community"
          title="Canali tifosi"
          text="Struttura pronta per attivare servizi community senza collegare strumenti esterni in questa fase."
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

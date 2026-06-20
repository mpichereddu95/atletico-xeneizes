import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import type { MediaItem } from "@/lib/types";

type MediaSectionProps = {
  mediaItems: MediaItem[];
};

export function MediaSection({ mediaItems }: MediaSectionProps) {
  return (
    <section id="media" className="bg-[#171717] py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Media"
          title="Foto e contenuti visuali"
          text="Raccolta iniziale di asset ufficiali del club, con impianto pronto per gallery stagionali, video e archivi fotografici estesi."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {mediaItems.map((item) => (
            <article key={item.id} className="group overflow-hidden border border-white/10 bg-axBlack">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={`transition duration-500 group-hover:scale-105 ${item.id === "media-logo" ? "object-contain p-6" : "object-cover"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-axBlack via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-axGold px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-axBlack">{item.type}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-black uppercase text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

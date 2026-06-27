import Link from "next/link";
import Image from "next/image";
import { officialChannels, projectStatement } from "@/data/club";
import { SectionHeading } from "@/components/SectionHeading";
import type { Sponsor } from "@/lib/types";

type SponsorsSectionProps = {
  sponsors: Sponsor[];
};

export function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  const primarySponsor = sponsors[0] ?? null;

  return (
    <section id="sponsor" className="bg-[#0E0E0E] py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Club"
          title="Sponsor, canali ufficiali e progetto"
          text="Partner, canali ufficiali e identita del progetto raccolti in un unico spazio."
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Sponsor principale</p>
            {primarySponsor ? (
              <>
                <div className="mt-8 border border-[#C9A84C33] bg-[#111111] px-6 py-8">
                  {primarySponsor.logo?.src ? (
                    <div className="mb-6 relative h-14 w-40">
                      <Image src={primarySponsor.logo.src} alt={primarySponsor.logo.alt} fill sizes="160px" loading="lazy" className="object-contain object-left" />
                    </div>
                  ) : null}
                  <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">{primarySponsor.name}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">{primarySponsor.description}</p>
                  {primarySponsor.services?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {primarySponsor.services.map((service) => (
                        <span key={service} className="border border-[#C9A84C33] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-axGold">
                          {service}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {primarySponsor.href ? (
                    <Link
                      href={primarySponsor.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold"
                    >
                      Sito ufficiale
                    </Link>
                  ) : null}
                  <Link
                    href={primarySponsor.instagramHref ?? "https://www.instagram.com/wonderland_hair_genova"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold"
                  >
                    Instagram sponsor
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">I partner ufficiali saranno presentati in questa sezione.</p>
            )}
          </article>

          <div className="grid gap-5">
            <article className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Canali ufficiali</p>
              <div className="mt-6 grid gap-3">
                {officialChannels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 border border-white/8 px-4 py-4 text-sm text-white transition hover:border-axGold/50"
                  >
                    <span className="flex items-center gap-3">
                      <ChannelIcon channel={channel.id} />
                      <span className="font-medium text-white">{channel.label}</span>
                    </span>
                    <span className="text-white/48">{channel.value}</span>
                  </a>
                ))}
              </div>
            </article>

            <article className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-axGold">Il progetto</p>
              <p className="mt-4 text-sm leading-7 text-white/68">{projectStatement}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelIcon({ channel }: { channel: string }) {
  const label = channel === "instagram" ? "IG" : "YT";

  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A84C33] bg-[#C9A84C14] text-axGold">
      {label}
    </span>
  );
}

import Link from "next/link";

type PageHeroProps = {
  kicker: string;
  title: string;
  text: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function PageHero({ kicker, title, text, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.22),_transparent_30%),linear-gradient(180deg,#151515_0%,#101010_100%)] pt-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-axGold/70 to-transparent" />
      <div className="section-shell pb-16 lg:pb-20">
        <p className="section-kicker">{kicker}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">{title}</h1>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-8 text-white/72">{text}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <Link href={primaryCta.href} className="bg-axGold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-axBlack transition hover:bg-white sm:tracking-[0.2em]">
                    {primaryCta.label}
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="border border-white/20 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white transition hover:border-axGold hover:text-axGold sm:tracking-[0.2em]">
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/lib/types";

type HeroProps = {
  latestResult: Match | null;
  nextMatch: Match | null;
};

export function Hero({ latestResult: _latestResult, nextMatch: _nextMatch }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 bg-[#0A0A0A] pt-28">
      <div className="absolute inset-0">
        <Image src="/images/club/atletico-xeneizes-hero-2026.jpg" alt="Panorama urbano usato come hero Atletico Xeneizes" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.46)_0%,rgba(10,10,10,0.64)_38%,rgba(10,10,10,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_34%)]" />
      <div className="section-shell relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-axGold">Sito ufficiale</p>
          <h1 className="mt-4 mx-auto max-w-3xl font-display text-5xl font-extrabold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
            Atletico Xeneizes 149
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            Una piattaforma essenziale per seguire squadra, stagione e identita del club con una struttura pronta a crescere nel tempo.
          </p>
          <Link
            href="/rosa"
            className="mt-10 inline-flex bg-axGold px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:bg-white"
          >
            Scopri la squadra
          </Link>
        </div>
      </div>
    </section>
  );
}

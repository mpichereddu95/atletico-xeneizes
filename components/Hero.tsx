import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/lib/types";

type HeroProps = {
  latestResult: Match | null;
  nextMatch: Match | null;
};

export function Hero({ latestResult, nextMatch }: HeroProps) {
  const nextOpponent = nextMatch ? getOpponent(nextMatch) : "Calendario in aggiornamento";

  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 bg-[#0A0A0A] pt-28">
      <div className="absolute inset-0">
        <Image src="/images/club/atletico-xeneizes-hero-2026.jpg" alt="Panorama urbano usato come hero Atletico Xeneizes" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.58)_0%,rgba(10,10,10,0.58)_34%,rgba(10,10,10,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(212,175,55,0.18),transparent_32%)]" />
      <div className="section-shell relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-axGold">Sito ufficiale</p>
          <h1 className="mt-4 mx-auto max-w-3xl font-display text-5xl font-extrabold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
            Atletico Xeneizes 149
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            Il punto ufficiale per seguire squadra, partite, risultati e identita Atletico Xeneizes 149.
          </p>
          <Link
            href="/rosa"
            className="focus-ring mt-9 inline-flex bg-axGold px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-axBlack transition hover:bg-white"
          >
            Scopri la squadra
          </Link>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <HeroSignal label="Ultimo risultato" value={latestResult?.score ?? "In aggiornamento"} detail={latestResult ? `${latestResult.home} vs ${latestResult.away}` : "Risultati ufficiali in aggiornamento"} />
            <HeroSignal label="Prossima partita" value={nextOpponent} detail={nextMatch ? `${nextMatch.competition} · ${nextMatch.kickoff || "orario da definire"}` : "La prossima gara verra pubblicata appena confermata"} />
          </div>
        </div>
      </div>
    </section>
  );
}

function getOpponent(match: Match) {
  return match.home === "ATLETICO XENEIZES 149" ? match.away : match.home;
}

function HeroSignal({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[10px] border border-white/12 bg-black/28 p-4 backdrop-blur-md">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-axGold">{label}</p>
      <p className="mt-2 truncate font-display text-2xl font-semibold leading-none text-white">{value}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/62">{detail}</p>
    </div>
  );
}

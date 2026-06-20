import Link from "next/link";
import { clubSources, navigation } from "@/data/club";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-axBlack py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
        <Logo />
        <div className="grid gap-5">
          <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Navigazione footer">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-[0.18em] text-white/55 transition hover:text-axGold">
                {item.label}
              </Link>
            ))}
          </nav>
          <details className="max-w-3xl text-[0.7rem] leading-5 text-[#555555]">
            <summary className="cursor-pointer select-none text-[0.7rem] font-medium text-[#555555] underline underline-offset-4 transition hover:text-white/55">
              Fonti dati
            </summary>
            <div className="mt-3 grid gap-2">
              <p>
                Dati stagione 2025/26 basati principalmente su Calcio Liguria, con correzioni manuali richieste dal club per presidente, allenatore, capitano, ruoli di alcuni giocatori e composizione della dirigenza.
              </p>
              <p>
                Fonti:{" "}
                <a href={clubSources.info} target="_blank" rel="noreferrer" className="transition hover:text-white/55">
                  info squadra
                </a>{" "}
                ·{" "}
                <a href={clubSources.squad} target="_blank" rel="noreferrer" className="transition hover:text-white/55">
                  rosa
                </a>{" "}
                ·{" "}
                <a href={clubSources.calendar} target="_blank" rel="noreferrer" className="transition hover:text-white/55">
                  calendario
                </a>
              </p>
            </div>
          </details>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">© 2026 Atletico Xeneizes</p>
      </div>
    </footer>
  );
}

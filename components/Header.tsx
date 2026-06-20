import Link from "next/link";
import { navigation } from "@/data/club";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-axBlack/80 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex lg:flex-1 lg:justify-end" aria-label="Navigazione principale">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold uppercase tracking-[0.18em] text-white/70 transition hover:text-axGold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="section-shell flex gap-5 overflow-x-auto border-t border-white/10 pb-3 pt-3 lg:hidden" aria-label="Navigazione mobile">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 text-xs font-black uppercase tracking-[0.18em] text-white/68 transition hover:text-axGold">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

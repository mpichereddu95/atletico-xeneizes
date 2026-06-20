import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3 lg:gap-4" aria-label="Atletico Xeneizes home">
      <span className="relative h-12 w-12 shrink-0 overflow-hidden">
        <Image
          src="/images/club/atletico-xeneizes-logo-transparent.png"
          alt="Logo Atletico Xeneizes"
          fill
          sizes="48px"
          className="object-contain"
        />
      </span>
      <span className="flex min-w-0 items-center leading-none">
        <span className="whitespace-nowrap font-display text-lg font-black uppercase text-white sm:text-xl">
          Atletico <span className="text-axGold">Xeneizes</span>
        </span>
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getPlayerById, getPlayers } from "@/lib/api";
import type { PlayerStatValue } from "@/lib/types";

type PlayerDetailPageProps = {
  params: Promise<{
    playerId: string;
  }>;
};

export async function generateStaticParams() {
  const players = await getPlayers();

  return players.map((player) => ({
    playerId: player.id
  }));
}

export default async function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  const { playerId } = await params;
  const player = await getPlayerById(playerId);

  if (!player) {
    notFound();
  }

  return (
    <main>
      <PageHero
        kicker={player.role}
        title={player.name}
        text={player.bio}
        primaryCta={{ href: "/rosa", label: "Torna alla rosa" }}
        secondaryCta={{ href: "/partite", label: "Vai alle partite" }}
      />

      <section className="bg-axBlack py-20 lg:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-black">
            <Image src={player.photo.src} alt={player.photo.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-axBlack via-transparent to-transparent" />
            <span className="absolute left-5 top-5 border border-white/15 bg-black/60 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-white/72">
              Numero {player.number ?? "--"}
            </span>
            <span className="absolute bottom-5 right-5 border border-axGold/60 bg-axBlack/70 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-axGold">
              {player.role}
            </span>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-4 border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-axGold">Scheda anagrafica</p>
              <div className="grid gap-3 text-base leading-7 text-white/74 sm:grid-cols-2">
                <p>
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/40">Nome completo</span>
                  {player.name}
                </p>
                <p>
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/40">Data di nascita</span>
                  {player.birthLabel}
                </p>
              </div>
              <p className="text-base leading-7 text-white/74">{player.bio}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <DetailCard label="Presenze" value={player.stats.appearances} />
              <DetailCard label="Gol" value={player.stats.goals} />
              <DetailCard label="Assist" value={player.stats.assists} />
              <DetailCard label="Ammonizioni" value={player.stats.yellowCards} />
              <DetailCard label="Espulsioni" value={player.stats.redCards} />
              <DetailCard label="Autogol" value={player.stats.ownGoals} />
              <DetailCard label="Migliore in campo" value={player.stats.bestPlayerAwards} />
              <DetailCard label="Miglior portiere" value={player.stats.bestGoalkeeperAwards} />
            </div>

            <div className="border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-axGold">Fonte dati</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">
                Questa scheda usa i numeri ufficiali del Girone C 2025/26 pubblicati da Calcio Liguria e le correzioni manuali approvate dal club.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={player.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex text-sm font-black uppercase tracking-[0.2em] text-white transition hover:text-axGold">
                  Apri la scheda fonte
                </a>
                <Link href="/news" className="inline-flex text-sm font-black uppercase tracking-[0.2em] text-white/72 transition hover:text-axGold">
                  Leggi le news del club
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailCard({ label, value }: { label: string; value: PlayerStatValue }) {
  return (
    <article className="border border-white/10 bg-white/[0.04] p-6">
      <p className="font-display text-5xl font-black text-white">{value ?? "n.d."}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-axGold">{label}</p>
    </article>
  );
}

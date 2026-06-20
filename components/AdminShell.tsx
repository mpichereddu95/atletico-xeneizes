"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { fetchSupabaseTable, isSupabaseConfigured, type SupabaseSession } from "@/lib/supabase";

const sessionKey = "ax-admin-session";

const modules = [
  { table: "news_articles", label: "News", description: "Articoli, comunicati e match report." },
  { table: "players", label: "Giocatori", description: "Rosa, ruoli, numeri e statistiche." },
  { table: "matches", label: "Partite", description: "Calendario, risultati e competizioni." },
  { table: "standings", label: "Classifiche", description: "Posizioni, punti e differenza reti." },
  { table: "sponsors", label: "Sponsor", description: "Partner, link e descrizioni." },
  { table: "media_items", label: "Media", description: "Foto, video e asset editoriali." }
];

type ModuleState = {
  table: string;
  count: number | null;
  error: string | null;
};

function readSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(sessionKey);
  return raw ? (JSON.parse(raw) as SupabaseSession) : null;
}

export function AdminShell() {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [states, setStates] = useState<ModuleState[]>([]);

  useEffect(() => {
    const storedSession = readSession();
    setSession(storedSession);

    if (!storedSession) {
      return;
    }

    Promise.all(
      modules.map(async (module) => {
        try {
          const rows = await fetchSupabaseTable<Record<string, unknown>>(module.table, storedSession.access_token);
          return { table: module.table, count: rows.length, error: null };
        } catch (error) {
          return {
            table: module.table,
            count: null,
            error: error instanceof Error ? error.message : "Errore sconosciuto."
          };
        }
      })
    ).then(setStates);
  }, []);

  function signOut() {
    window.localStorage.removeItem(sessionKey);
    window.location.href = "/admin/login";
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminNotice
        title="Supabase non configurato"
        body="Aggiungi le variabili NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY su locale e Hostinger prima di usare l'admin."
      />
    );
  }

  if (!session) {
    return (
      <AdminNotice
        title="Accesso richiesto"
        body="Effettua il login con un utente Supabase autorizzato per aprire la dashboard."
        action={<Link href="/admin/login" className="rounded bg-axGold px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black">Vai al login</Link>}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Backoffice</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-none sm:text-5xl">Dashboard Atletico Xeneizes</h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-white/62">
              Prima versione dell'area amministrativa. Da qui collegheremo progressivamente news, giocatori, partite, classifiche, sponsor e media al database Supabase.
            </p>
          </div>
          <button onClick={signOut} className="w-fit border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-axGold hover:text-axGold">
            Esci
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const moduleState = states.find((state) => state.table === module.table);
            return (
              <article key={module.table} className="rounded-lg border border-[#C9A84C22] bg-[#111] p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-axGold">{module.label}</p>
                <p className="mt-3 text-sm leading-6 text-white/64">{module.description}</p>
                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/70">
                  {moduleState?.error ? "Tabella da creare" : `${moduleState?.count ?? 0} record`}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function AdminNotice({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#080808] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-10">
      <section className="mx-auto max-w-3xl rounded-lg border border-[#C9A84C22] bg-[#111] p-8">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-white/64">{body}</p>
        {action ? <div className="mt-8">{action}</div> : null}
      </section>
    </main>
  );
}

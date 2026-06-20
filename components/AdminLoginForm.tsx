"use client";

import { useState } from "react";
import { isSupabaseConfigured, signInWithPassword } from "@/lib/supabase";

const sessionKey = "ax-admin-session";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await signInWithPassword(email, password);
      window.localStorage.setItem(sessionKey, JSON.stringify(session));
      window.location.href = "/admin";
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Accesso non riuscito.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-10">
      <section className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between rounded-lg border border-[#C9A84C22] bg-[#111] p-8">
          <div>
            <p className="section-kicker">Area riservata</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-none sm:text-5xl">Admin Atletico Xeneizes</h1>
            <p className="mt-5 text-sm font-light leading-6 text-white/62">
              Accesso per aggiornare nel tempo news, rosa, partite, classifiche, sponsor e media ufficiali del club.
            </p>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.18em] text-white/35">Supabase backend</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-black/40 p-8">
          <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-3 w-full rounded border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none focus:border-axGold"
            required
          />

          <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-white/50" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-3 w-full rounded border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none focus:border-axGold"
            required
          />

          {error ? <p className="mt-5 rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
          {!isSupabaseConfigured() ? <p className="mt-5 rounded border border-axGold/30 bg-axGold/10 p-3 text-sm text-axGold">Configura prima le variabili Supabase.</p> : null}

          <button
            type="submit"
            disabled={isSubmitting || !isSupabaseConfigured()}
            className="mt-8 w-full rounded bg-axGold px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Accesso..." : "Entra"}
          </button>
        </form>
      </section>
    </main>
  );
}

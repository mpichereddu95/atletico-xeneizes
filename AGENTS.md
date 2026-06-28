# AGENTS.md

## Priorita

- Prima di modificare codice, consulta questo file, `docs/PROJECT_MEMORY.md` e i documenti mirati in `docs/`.
- Limita l'analisi ai file coinvolti dalla richiesta.
- Non modificare branding, logo, palette, tono o identita visiva senza richiesta esplicita.
- Mantieni `lib/api.ts` come facciata dati del frontend.

## Documentazione

- Usa `docs/PROJECT.md` per architettura, route e stato prodotto.
- Usa `docs/PROJECT_MEMORY.md` per contesto essenziale e decisioni operative recenti.
- Usa `docs/BRAND.md` per identita visiva, colori, logo e tipografia.
- Usa `docs/CONTENT.md` e `docs/PLAYERS.md` per contenuti sportivi.
- Usa `docs/EDITORIAL_WORKFLOW.md` per inserimento contenuti tramite Sanity.
- Usa `docs/SECURITY_CHECKLIST.md` per variabili, CMS, admin, token e deploy.
- Aggiorna `docs/ROADMAP.md`, `docs/TODO.md` e `docs/DECISIONS.md` quando cambia il progetto.

## UI/UX

- Mantieni il look premium, sportivo, minimale e scandinavo gia approvato.
- Usa UI/UX Pro Max solo come reference strategica per audit, responsive, accessibilita, gerarchia e pattern, non come fonte di redesign automatico.
- Preferisci correzioni puntuali: layout, spaziature, gerarchia, stati, focus, overflow e leggibilita.
- Verifica sempre mobile, tablet e desktop quando tocchi componenti visuali.

## Frontend

- Usa Server Components di default; aggiungi `use client` solo dove necessario.
- Preferisci componenti riutilizzabili e dati tipizzati.
- Evita duplicazioni tra pagine: estrai sezioni comuni in `components/`.
- Mantieni immagini ottimizzate, lazy loading dove utile e nessun overflow orizzontale.

## CMS e Dati

- Sanity e il CMS operativo per contenuti modificabili senza programmazione.
- Supabase resta parcheggiato per funzioni avanzate future, non come fonte principale v1.
- Non inventare dati sportivi: usa fonti ufficiali, dati gia presenti o placeholder espliciti.

## Verifica

- Per modifiche TypeScript/Next.js esegui almeno `tsc --noEmit` o `next build --webpack` quando fattibile.
- Per UI responsive usa screenshot o browser QA su desktop, tablet e mobile.
- Segnala chiaramente verifiche non eseguite e motivazione.

# PROJECT MEMORY - Atletico Xeneizes 149

## Identita Progetto

Atletico Xeneizes 149 e il sito ufficiale della squadra. Deve essere premium, sportivo, minimale, ordinato e facilmente aggiornabile.

## Obiettivo

Costruire una piattaforma sportiva ufficiale per:

- rosa e schede giocatori;
- calendario e risultati;
- classifiche;
- news e match report;
- media gallery;
- sponsor;
- archivio stagioni.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS
- GitHub + Hostinger

## Struttura Principale

- `app/`: route e metadata.
- `components/`: UI riutilizzabile.
- `data/club.ts`: fallback statico e dati storici.
- `lib/api.ts`: unica facciata dati del frontend.
- `lib/sanity.ts`: lettura dati Sanity.
- `sanity/schemaTypes/`: modelli CMS.
- `docs/EDITORIAL_WORKFLOW.md`: checklist per inserire contenuti reali.
- `docs/SECURITY_CHECKLIST.md`: sicurezza, token, CMS, deploy.
- `docs/`: memoria e decisioni progetto.

## Decisioni Prese

- Sanity e il CMS operativo della v1.
- Sanity non va reinstallato: e gia integrato su `/studio` e registrato sul dominio ufficiale. Il prossimo lavoro e rifinire dashboard, schema mancanti e flusso editoriale.
- Supabase resta parcheggiato per funzioni avanzate future.
- `lib/api.ts` resta il punto unico da cui le pagine leggono dati.
- La hero attuale non va sostituita: rappresenta il quartiere di nascita della squadra.
- Stagione attuale e archivio 2025/26 devono restare separati.
- World Cup / Estate 2026 e archivio secondario, non sezione centrale.
- Montiel e Hrustic restano nello storico ma non nella rosa attuale finche non arrivano tesseramenti aggiornati.

## Design Da Rispettare

- Palette: nero, oro, bianco, argento.
- Look: premium, sportivo, minimale, scandinavo.
- Non cambiare logo, colori, tono o identita senza richiesta esplicita.
- Evitare testi tecnici nel sito pubblico.
- Home ordinata: Hero, Match Center, stagione, classifica/rosa, match report/news, sponsor.

## Fonti Dati

- Sanity per contenuti modificabili.
- `data/club.ts` per fallback e storico verificato.
- Calcio Liguria come fonte sportiva ufficiale quando disponibile.
- Dati del club per correzioni manuali ufficiali.
- Wonderland Hair: sponsor principale confermato.

## Contenuti Mancanti

- Foto squadra definitive.
- Foto giocatori complete.
- Logo/materiali sponsor ufficiali.
- Calendario stagione attuale.
- Tesseramenti aggiornati.
- Risultati stagione attuale.
- Contenuti World Cup / Estate 2026 confermati.
- Video e gallery ufficiali.

## Sicurezza Da Ricordare

- Non committare `.env.local` o token.
- Creare/mantenere `.env.example`.
- Token Sanity di scrittura solo server-side.
- `/studio` e il backoffice reale tramite Sanity.
- `/admin` Supabase e prototipo, non dashboard sicura definitiva.
- Validare upload immagini e alt text.
- Fare backup contenuti Sanity.
- Usare `.env.example` come template, mai valori reali nei commit.
- Ultimo audit dipendenze: 4 vulnerabilita moderate transitive; aggiornare Sanity/lockfile in step controllato.

## Deploy

- Repository GitHub: `mpichereddu95/atletico-xeneizes`.
- Hosting: Hostinger.
- Dominio: `https://www.atleticoxeneizes149.com`.
- Dopo ogni push su `main`, verificare deploy Hostinger e sito live.

## Prossimi Step Prioritari

1. Inserire contenuti reali minimi in Sanity seguendo `docs/EDITORIAL_WORKFLOW.md`.
2. Personalizzare Sanity Studio con viste editoriali per Home, Rosa attuale, Archivio, Partite, Match report, Sponsor e Media.
3. Aggiungere o rifinire gli schema mancanti: `staff`, `homepage`, `siteSettings` e stato roster/season piu leggibile.
4. Audit responsive/performance su produzione.
5. Definire override club separati dai dati ufficiali.
6. Chiarire o disattivare `/admin` finche non sara sicuro.
7. Aggiornare dati 2026/27 quando Calcio Liguria pubblichera calendario e tesseramenti.

## Come Usare Questa Memoria Nelle Prossime Sessioni

Prima di fare modifiche, leggi questo file.

Non rileggere tutto il progetto se non necessario.

Usa questa memoria per recuperare contesto essenziale.

Consulta `AGENTS.md` per regole operative e `docs/PROJECT.md` per architettura estesa.

Aggiorna questo file solo quando cambia una decisione importante, una struttura, una fonte dati o uno step completato.

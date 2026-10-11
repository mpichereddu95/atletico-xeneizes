# TODO

## Aggiornamento 2026/27 - 10 ottobre 2026

- [x] Verificare iscrizione in Coppa Cobram Girone D e nove squadre del girone.
- [x] Separare classifica corrente e risultati storici; non riutilizzare statistiche 2025/26 nella rosa corrente.
- [ ] Importare calendario e tesseramenti quando pubblicati da Calcio Liguria.
- [ ] Trasferire lo snapshot iniziale 2026/27 in Sanity quando disponibile accesso di scrittura.

## Database giocatori - 11 ottobre 2026

- [x] Separare la rosa 2026/27 dall'archivio 2025/26 senza alterare lo storico.
- [x] Inserire i 12 nomi e i ruoli indicati dal club; escludere l'allenatore dal database.
- [x] Predisporre spazio per foto e statistiche; non assegnare numeri di maglia.
- [ ] Aggiungere foto, numeri e statistiche quando comunicati.

## Archivio amichevoli estive - 11 ottobre 2026

- [x] Rinominare l'archivio in Amichevoli Estive 2026, distinto dal campionato.
- [x] Inserire i 16 risultati riportati nella locandina del club e predisporre la sezione per aggiornamenti successivi.
- [ ] Aggiungere le prossime amichevoli quando confermate.
- [x] Ordinare le stagioni nel filtro Partite con 2026/27 in alto, amichevoli al centro, 2025/26 in basso.

## Vulnerabilita Node.js - 11 ottobre 2026

- [x] Aggiornare Next.js, next-sanity, Sanity e PostCSS con versioni compatibili.
- [x] Allineare l'override PostCSS che impediva l'installazione npm.
- [x] Rigenerare lockfile npm e pnpm; typecheck superato.
- [x] Ridistribuire la prima patch: Hostinger completato, critici scesi da 3 a 0.
- [ ] Ripetere la scansione vulnerabilita Hostinger.

## Vulnerabilita transitive Hostinger - 11 ottobre 2026

- [x] Identificare le dipendenze parent per `js-yaml`, `smol-toml`, `uuid` e `postcss-selector-parser`.
- [x] Aggiornare nel lock npm `js-yaml`, `smol-toml` e `uuid` alle patch compatibili.
- [x] Aggiornare `postcss-selector-parser` a 7.1.6; typecheck e CSS Tailwind verificati.
- [x] Build Linux Hostinger completata per `e70b8fe`.
- [x] Scansione Hostinger del 2026-10-11 00:49: nessuna vulnerabilita rilevata.
- [ ] Valutare separatamente `braces` e `sprintf-js` rilevati dall'audit npm nella toolchain Sanity.

## Responsive - 10 ottobre 2026

- [x] Riorganizzare le card dei risultati: data separata, punteggio ed esito distinti, avversaria e dettagli leggibili su una riga dedicata.
- [x] Rendere piu conservative le griglie dense e abilitare wrapping sicuro per contenuti lunghi.
- [x] Ridisegnare il grafico punti come andamento cumulativo a gradini, con scala e dimensioni responsive.
- [ ] Completare QA visuale desktop/tablet/mobile nel browser dell'utente dopo il deploy.

## Regole operative

- consultare prima i file `docs/`
- analizzare solo i file coinvolti
- evitare modifiche non richieste
- aggiornare sempre `ROADMAP.md`, `TODO.md`, `DECISIONS.md`

## Checklist immediata

- [x] creare cartella `docs/`
- [x] creare documenti base
- [x] registrare regole permanenti
- [x] definire architettura iniziale
- [x] centralizzare a livello documentale il principio del single data layer

## Prossimi task raccomandati

- [x] scegliere provider backend/CMS per admin
- [x] creare specifica funzionale area `/admin`
- [x] definire modello dati per news, giocatori, partite, classifiche, sponsor e media
- [ ] decidere strategia autenticazione admin
- [x] creare tabelle Supabase usando `docs/SUPABASE_SCHEMA.sql`
- [x] creare utente admin in Supabase Auth
- [ ] configurare variabili ambiente Supabase su Hostinger
- [ ] aggiungere CRUD news nel pannello admin
- [x] collegare Sanity come sorgente CMS progressiva per news
- [x] creare Sanity Studio/schema `article`
- [x] configurare variabili ambiente Sanity su Hostinger
- [x] separare strategicamente il dataset sportivo da contenuti editoriali
- [x] creare modelli Sanity per stagioni, competizioni, squadre, giocatori, partite, classifiche, sponsor e media
- [x] creare dashboard Sanity semplificata per flusso editoriale
- [x] rimuovere articolo test da Sanity
- [x] reinserire match report e comunicati reali in Sanity
- [x] sincronizzare dati sportivi reali completi da `data/club.ts` a Sanity
- [x] aggiungere script riutilizzabile `npm run sanity:sync`
- [ ] configurare `SANITY_API_READ_TOKEN` su Hostinger
- [ ] progettare file di override ufficiali del club
- [ ] definire convenzioni per aggiornamento dati sportivi
- [ ] documentare component ownership per le sezioni principali
- [x] allineare README ai nuovi documenti `docs/`
- [x] completare QA responsive su desktop, tablet e mobile
- [x] creare `AGENTS.md` come memoria operativa sintetica del progetto
- [x] creare `docs/PROJECT_MEMORY.md` come memoria essenziale per sessioni future
- [x] creare `.env.example` senza segreti reali
- [x] documentare flusso editoriale Sanity
- [x] documentare checklist sicurezza
- [x] dichiarare `/studio` come backoffice operativo v1 e `/admin` come prototipo
- [x] integrare UI/UX Pro Max come reference documentale senza submodule
- [x] portare il Match Center in alto nella home
- [x] ridurre la rosa in home a preview responsive 4/3/2 colonne
- [x] separare anteprime match report e news in home
- [x] predisporre pagine `/giocatori`, `/calendario`, `/risultati`, `/classifica`, `/match-report`, `/stagioni`
- [x] predisporre campi CMS opzionali per risultato, marcatori, MVP, cronaca e gallery dei match report
- [x] separare rosa attuale da database storico senza cancellare giocatori
- [x] introdurre stato "calendario in aggiornamento" per la nuova stagione
- [x] rimuovere dal sito pubblico testi tecnici o da sviluppo
- [x] aggiungere grafico andamento squadra nella sezione Partite
- [x] rifinire la home con gerarchia premium controllata senza redesign
- [ ] rifinire il resto delle pagine interne con la nuova direzione minimal della home
- [ ] preparare asset sponsor ufficiali quando il club li fornira
- [ ] aggiornare calendario, tesseramenti e statistiche 2026/27 quando Calcio Liguria pubblichera dati ufficiali
- [ ] valutare se ridurre o riposizionare la sezione media nella navigazione principale
- [ ] eseguire performance audit finale su produzione Hostinger
- [ ] aggiornare dipendenze transitive moderate in step controllato

## Regola per richieste future troppo ampie

Se una richiesta e troppo ampia:

1. spezzarla in fasi
2. aggiornare `ROADMAP.md`
3. proporre piano sintetico
4. attendere conferma prima di implementare tutto

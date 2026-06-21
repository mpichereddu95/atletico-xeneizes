# TODO

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
- [x] rimuovere articolo test da Sanity
- [x] reinserire match report e comunicati reali in Sanity
- [x] sincronizzare dati sportivi reali completi da `data/club.ts` a Sanity
- [x] aggiungere script riutilizzabile `npm run sanity:sync`
- [ ] configurare `SANITY_API_READ_TOKEN` su Hostinger
- [ ] progettare file di override ufficiali del club
- [ ] definire convenzioni per aggiornamento dati sportivi
- [ ] documentare component ownership per le sezioni principali
- [x] allineare README ai nuovi documenti `docs/`
- [ ] rifinire il resto delle pagine interne con la nuova direzione minimal della home
- [ ] preparare asset sponsor ufficiali quando il club li fornira
- [ ] valutare se ridurre o riposizionare la sezione media nella navigazione principale

## Regola per richieste future troppo ampie

Se una richiesta e troppo ampia:

1. spezzarla in fasi
2. aggiornare `ROADMAP.md`
3. proporre piano sintetico
4. attendere conferma prima di implementare tutto

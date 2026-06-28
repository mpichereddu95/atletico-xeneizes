# Atletico Xeneizes - Sito ufficiale v1

Prima versione della piattaforma ufficiale dell'Atletico Xeneizes, sviluppata con `Next.js`, `React`, `TypeScript` e `Tailwind CSS`.

Il progetto e costruito come base pluriennale: layout responsive, componenti riusabili, route dinamiche per le news, database giocatori estendibile e layer dati pronto per CMS o API future.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS

## Avvio locale

Se hai `npm` disponibile nel tuo ambiente:

```bash
npm install
npm run dev
```

Build di produzione:

```bash
npm run build
npm start
```

## Variabili ambiente

Usa `.env.example` come template e non committare mai valori reali.

Per leggere i contenuti da Sanity:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=pp933t0a
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=token_server_only
NEXT_PUBLIC_SITE_URL=https://dominio-definitivo.it
```

`SANITY_API_READ_TOKEN` non deve avere prefisso `NEXT_PUBLIC_`: serve solo al server per leggere il dataset Sanity non pubblico.
`SANITY_AUTH_TOKEN` serve solo localmente per sincronizzare contenuti verso Sanity con `npm run sanity:sync`.

## Pagine incluse

- `/` home ufficiale
- `/rosa` database giocatori
- `/rosa/[playerId]` scheda giocatore
- `/partite` calendario, risultati, classifica e andamento stagione
- `/news` archivio articoli
- `/news/[slug]` articolo completo
- `/media` foto e contenuti visuali
- `/staff` area tecnica e societaria
- `/sponsor` area partner
- `/studio` pannello Sanity per gestione contenuti

## Fonti dati

Fonte primaria utilizzata in questa versione:

- Calcio Liguria - informazioni squadra
- Calcio Liguria - rosa
- Calcio Liguria - calendario
- Calcio Liguria - classifica Girone C
- Calcio Liguria - Poule Scudetto

I dati non dipendono in modo esclusivo dalla fonte esterna: la struttura puo essere aggiornata o sostituita manualmente in qualsiasi momento.

## Correzioni manuali applicate

Su indicazione del club, questa versione recepisce i seguenti aggiornamenti rispetto alle schede pubbliche:

- Presidente: `Andrea Costanzo`
- Allenatore: `Matteo Pichereddu`
- Capitano: `Salvatore Salleo Puntillo`
- `Federico Cantoro` spostato nei centrocampisti
- `Davide Gallone` spostato nei difensori
- `Riccardo Nucera` spostato nei difensori
- `Andrea Rao` rimosso dalla dirigenza attuale

## Struttura del progetto

- `app/`
  - routing App Router
  - layout globale
  - pagine pubbliche del sito
- `components/`
  - componenti di sezione riutilizzabili
  - hero, liste, cards, tabelle, blocchi editoriali
- `data/club.ts`
  - dataset iniziale del club
  - giocatori, partite, classifica, staff, media, news
- `lib/api.ts`
  - layer di accesso ai dati
  - facciata unica tra Sanity e fallback statico
- `lib/sanity.ts`
  - adapter Sanity con lettura autenticata server-side
- `sanity/`
  - schema CMS per news, giocatori, partite, classifiche, sponsor e media
- `scripts/sync-sanity-content.mjs`
  - sincronizzazione controllata dei dati reali verso Sanity
- `lib/types.ts`
  - tipi condivisi
- `public/images/club/`
  - logo e foto squadra forniti per questa versione

## Modello dati

### Giocatori

Ogni giocatore supporta:

- foto
- nome
- ruolo
- numero
- data di nascita
- biografia
- presenze
- gol
- assist
- ammonizioni
- espulsioni
- autogol
- premi individuali
- URL sorgente

Quando un dato non e disponibile nella fonte, viene mantenuto come `null` o mostrato come `n.d.` invece di inventarlo.

### Partite

Ogni partita supporta:

- stagione
- competizione
- fase
- giornata
- data
- orario
- campo
- squadre
- risultato
- stato

### News

Le news usano gia una struttura compatibile con un futuro CMS:

- `slug`
- titolo
- categoria
- data
- autore
- immagine copertina
- contenuto a blocchi

## Sanity CMS

Sanity e il pannello contenuti principale. Sono gestibili da interfaccia:

- news e match report
- giocatori e schede giocatore
- stagioni, competizioni e partite
- classifiche
- sponsor
- media/gallery

Per risincronizzare i dati reali presenti nel repository:

```bash
SANITY_AUTH_TOKEN=token_editor npm run sanity:sync
```

Il sito continua ad avere fallback statico: se Sanity non risponde, la produzione resta online con i dati locali approvati.

Per il flusso editoriale usare:

- `/studio` come backoffice operativo v1;
- `docs/EDITORIAL_WORKFLOW.md` come checklist contenuti;
- `/admin` solo come prototipo tecnico Supabase, non come dashboard definitiva.

## Memoria operativa

- `AGENTS.md` e il riferimento sintetico per Codex e per le future modifiche.
- `docs/UI_UX_PRO_MAX.md` registra la reference esterna UI/UX Pro Max senza integrarla come dipendenza runtime.
- UI/UX Pro Max va consultato solo per audit o decisioni progettuali mirate, mantenendo invariati brand, palette e identita approvati.

## Note di verifica

- Build di produzione verificata con `next build --webpack`
- TypeScript verificato con `tsc --noEmit`
- Le immagini remote di Calcio Liguria sono abilitate in `next.config.mjs`

## Evoluzioni consigliate

Passi successivi naturali:

1. configurare il dominio definitivo su Hostinger
2. aggiungere tabellini partita e marcatori
3. introdurre asset sponsor ufficiali
4. definire convenzioni editoriali per nuove stagioni
5. valutare automazioni da Calcio Liguria o altre fonti ufficiali

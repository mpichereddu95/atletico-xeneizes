# Atletico Xeneizes - Sito ufficiale v1

Prima versione della piattaforma ufficiale dell'Atletico Xeneizes, sviluppata con `Next.js`, `React`, `TypeScript` e `Tailwind CSS`.

Il progetto e costruito come base pluriennale: layout responsive, componenti riusabili, route dinamiche per le news, database giocatori estendibile e layer dati pronto per CMS o API future.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

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
  - punto naturale per introdurre fetch, cache e revalidation
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

## Pronto per CMS / API

Per collegare un CMS o una fonte dati automatica:

1. sostituisci gli export statici in `data/club.ts`
2. mantieni invariati i tipi in `lib/types.ts`
3. espandi `lib/api.ts` con fetch server-side
4. aggiungi revalidation di Next.js
5. conserva le correzioni manuali del club in un layer separato di override

## Note di verifica

- Build di produzione verificata con `next build --webpack`
- TypeScript verificato con `tsc --noEmit`
- Le immagini remote di Calcio Liguria sono abilitate in `next.config.mjs`

## Evoluzioni consigliate

Passi successivi naturali:

1. collegare un file JSON o CMS privato per override ufficiali del club
2. aggiungere tabellini partita e marcatori
3. introdurre sponsor reali con loghi e link
4. aggiungere social ufficiali del club
5. creare una dashboard admin per aggiornamenti manuali

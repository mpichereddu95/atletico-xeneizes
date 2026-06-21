# SANITY_SCHEMA

## Progetto

- Project ID: `pp933t0a`
- Dataset: `production`
- Uso previsto: CMS editoriale principale per contenuti aggiornabili senza programmazione.

## Stato

Sanity viene adottato come CMS editoriale progressivo. Supabase resta parcheggiato per eventuali funzioni avanzate future, ma non e il cuore della gestione contenuti della v1.

Il dataset richiede autenticazione per la lettura: in produzione va configurata la variabile server-only `SANITY_API_READ_TOKEN`, senza prefisso `NEXT_PUBLIC_`.

## Tipi contenuto attivi

### article

Gestisce News, Comunicati e Match report.

Campi:

- `title`: string
- `slug`: slug
- `category`: string enum `News`, `Comunicato`, `Match report`
- `status`: string enum `draft`, `published`
- `excerpt`: text
- `publishedAt`: datetime
- `author`: string
- `coverImage`: image con campo `alt`
- `relatedMatch`: reference opzionale a `match`
- `contentBlocks`: array di blocchi semplici:
  - `heading`: string
  - `paragraph`: text
- `sourceType`: enum `official`, `historical`, `manual`

### season

Gestisce le stagioni sportive.

- `name`
- `slug`
- `startYear`
- `endYear`
- `status`
- `sourceType`

### competition

Gestisce competizioni e fasi.

- `name`
- `slug`
- `season`
- `phase`
- `sourceUrl`
- `sourceType`

### player

- nome
- ruolo
- numero
- foto
- biografia
- presenze
- gol
- assist
- ammonizioni
- espulsioni
- autogol
- premi migliore in campo / miglior portiere
- stagione
- fonte ufficiale
- tipo dato

### match

- stagione
- competizione
- fase
- giornata
- data
- orario
- casa
- trasferta
- risultato
- stato
- fonte ufficiale
- match report collegato
- tipo dato

### standing

- stagione
- competizione
- posizione
- squadra
- punti
- partite
- vittorie
- pareggi
- sconfitte
- gol fatti
- gol subiti
- differenza reti
- tipo dato

### sponsor

- nome
- livello
- descrizione
- link
- Instagram
- logo
- attivo

### mediaItem

- tipo
- titolo
- immagine
- alt
- link video opzionale
- in evidenza

## Strategia di migrazione

1. News e Match report da Sanity: completato per contenuti reali v1.
2. Giocatori: modello pronto e dati ufficiali 2025/26 sincronizzati.
3. Partite e classifiche: modello pronto e dati ufficiali 2025/26 sincronizzati.
4. Sponsor e Media: modello pronto e contenuti v1 sincronizzati.

Ogni sezione deve continuare a passare da `lib/api.ts`, mantenendo fallback statico finche i contenuti CMS non sono completi.

## Contenuti editoriali attivi

I contenuti reali sono sincronizzabili con `npm run sanity:sync` usando un token Sanity lato ambiente.

- `girone-c-2025-26-terzo-posto-e-poule-scudetto`
- `poule-scudetto-2026-il-cammino-dell-atletico-xeneizes`
- `rosa-2025-26-statistiche-e-aggiornamenti-del-club`

L'articolo di test editoriale e stato rimosso dal dataset Sanity.

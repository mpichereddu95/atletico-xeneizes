# SANITY_SCHEMA

## Progetto

- Project ID: `pp933t0a`
- Dataset: `production`
- Uso previsto: CMS editoriale principale per contenuti aggiornabili senza programmazione.

## Stato

Sanity viene adottato come CMS editoriale progressivo. Supabase resta parcheggiato per eventuali funzioni avanzate future, ma non e il cuore della gestione contenuti della v1.

## Tipi contenuto prioritari

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
- `contentBlocks`: array di blocchi semplici:
  - `heading`: string
  - `paragraph`: text

## Tipi contenuto futuri

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

### standing

- posizione
- squadra
- punti
- partite
- gol fatti
- gol subiti

### sponsor

- nome
- livello
- descrizione
- link
- logo

### mediaItem

- tipo
- titolo
- immagine
- alt
- link video opzionale

## Strategia di migrazione

1. News e Match report da Sanity
2. Giocatori
3. Partite e classifiche
4. Sponsor e Media

Ogni sezione deve continuare a passare da `lib/api.ts`, mantenendo fallback statico finche i contenuti CMS non sono completi.

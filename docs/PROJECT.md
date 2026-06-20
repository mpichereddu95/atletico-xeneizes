# PROJECT

## Nome

Atletico Xeneizes - sito ufficiale v1

## Obiettivo

Costruire una piattaforma sportiva ufficiale, moderna, scalabile e mantenibile per Atletico Xeneizes, pronta a evolvere nei prossimi anni senza dipendere da modifiche manuali diffuse in tutto il codice.

## Stack attuale

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Routing attuale

- `/` home
- `/rosa`
- `/rosa/[playerId]`
- `/partite`
- `/news`
- `/news/[slug]`
- `/media`
- `/staff`
- `/sponsor`

## Architettura corrente

- `app/`: pagine e layout App Router
- `components/`: sezioni UI riutilizzabili
- `data/club.ts`: dataset centrale statico del club
- `lib/api.ts`: adapter dati del frontend
- `lib/types.ts`: contratti TypeScript condivisi
- `public/images/club/`: asset principali del club

## Architettura dati target

Tutte le informazioni sportive ufficiali devono transitare da un unico layer dati centrale.

### Principio

Le pagine non devono conoscere direttamente la provenienza dei dati sportivi. Devono leggere solo da adapter stabili.

### Layer previsti

1. `data/source/`
   - dati grezzi o ingest da fonte esterna
2. `data/overrides/`
   - correzioni ufficiali del club
3. `data/transformers/`
   - normalizzazione verso i tipi interni
4. `lib/api.ts`
   - accesso unico per il frontend

### Stato attuale

Al momento tutto e centralizzato in `data/club.ts`, che funge gia da singolo punto di verita applicativo.

### Evoluzione raccomandata

Separare progressivamente:

- sorgente esterna
- override manuali
- contenuti editoriali
- media
- sponsor

senza cambiare i consumer lato componenti.

## Regole operative permanenti

1. Documentazione prima del codice applicativo
2. Analisi solo dei file coinvolti dal task
3. Nessuna modifica non richiesta
4. Preferire componenti riutilizzabili e codice modulare
5. Aggiornare sempre `ROADMAP.md`, `TODO.md`, `DECISIONS.md` quando cambia il progetto

## Stato attuale del prodotto

Versione funzionante con:

- home editoriale
- database giocatori
- sezione partite
- news con route dinamica
- media
- staff
- sponsor placeholder

## Rischi attuali

1. dataset ancora monolitico in `data/club.ts`
2. contenuti sportivi e contenuti editoriali non ancora separati
3. override manuali non ancora formalizzati in file dedicati
4. assenza di CMS o backoffice

## Principio di sviluppo futuro

Ogni nuova funzionalita deve:

- partire dalla documentazione
- dichiarare file coinvolti
- usare il layer dati centrale
- evitare duplicazioni di informazioni tra componenti

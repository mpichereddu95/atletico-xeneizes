# SANITY SCHEMA PROPOSAL - Atletico Xeneizes 149

## Obiettivo

Rendere Sanity una dashboard semplice per gestire il sito ufficiale senza programmazione, mantenendo separati:

- stagione attuale;
- archivio 2025/2026;
- World Cup / Estate 2026;
- dati ufficiali;
- dati storici;
- correzioni manuali del club.

## Schema Gia Presenti

- `article`
- `season`
- `competition`
- `team`
- `player`
- `match`
- `standing`
- `sponsor`
- `mediaItem`

Questa base e valida. Va rifinita, non riscritta da zero.

## Schema Da Aggiungere

### `staff`

Serve per presidente, allenatore, capitano e ruoli interni.

Campi consigliati:

- `name`
- `slug`
- `role`
- `photo`
- `bio`
- `note`
- `active`
- `order`

### `homepage`

Documento singleton per contenuti principali della home.

Campi consigliati:

- `heroTitle`
- `heroPayoff`
- `primaryCtaLabel`
- `primaryCtaHref`
- `featuredSeason`
- `featuredMatch`
- `featuredSponsors`
- `featuredArticles`
- `communityText`
- `mediaHighlights`

Nota: non deve gestire palette o layout, solo contenuti.

### `siteSettings`

Documento singleton per dati globali.

Campi consigliati:

- `siteName`
- `defaultSeoTitle`
- `defaultSeoDescription`
- `logo`
- `openGraphImage`
- `instagramUrl`
- `youtubeUrl`
- `contactEmail`
- `officialSources`

Nota: colori e identita visiva restano documentati in `docs/BRAND.md`, non modificabili liberamente dal CMS.

## Schema Da Rifinire

### `player`

Gia presente e coerente. Migliorie consigliate:

- separare `firstName` e `lastName` solo se serve davvero; altrimenti mantenere `name`;
- aggiungere `nickname`;
- aggiungere `rosterStatus`: `active`, `historical`, `pendingRegistration`;
- aggiungere `displayOrder`;
- aggiungere array `seasonStats` per statistiche per stagione.

Regola Montiel/Hrustic:

- restano documenti `player`;
- `currentRoster: false`;
- `sourceType: historical`;
- non compaiono nella rosa attuale finche non arriva conferma tesseramento.

### `match`

Gia presente. Migliorie consigliate:

- aggiungere `opponent` o reference a `team` per evitare solo testo libero;
- aggiungere `homeAway`: `home`, `away`, `neutral`;
- espandere `status`: `scheduled`, `played`, `postponed`, `cancelled`;
- aggiungere `scorers`;
- aggiungere `mvp`;
- aggiungere `media`;
- mantenere `matchReport` reference.

### `article`

Attualmente gestisce sia news sia match report.

Scelta consigliata per v1:

- mantenere `article` unico per semplicita;
- usare categoria `Match report`;
- usare object `matchReport` gia presente.

Evoluzione futura:

- creare `matchReport` documento autonomo solo se i report diventano molti e richiedono workflow separato.

### `sponsor`

Gia presente. Migliorie consigliate:

- aggiungere `premiumDescription`;
- aggiungere `order`;
- aggiungere `visibility`: `main`, `partner`, `hidden`;
- aggiungere `images`;
- mantenere `active`.

### `season`

Gia presente. Migliorie consigliate:

- aggiungere `label`;
- aggiungere `kind`: `current`, `archive`, `summerTournament`;
- aggiungere `summary`;
- aggiungere `isCurrent`;
- aggiungere `sourceUrl`.

### `competition`

Gia presente. Migliorie consigliate:

- rendere `phase` meno rigida o spostarla su `match`, per supportare stagioni future;
- aggiungere `type`: `league`, `cup`, `summer`, `friendly`.

### `standing`

Gia presente e adatto.

Migliorie:

- aggiungere `sourceUrl`;
- valutare documento unico per classifica di competizione, con righe annidate, solo se l'editing riga-per-riga diventa scomodo.

### `mediaItem`

Gia presente.

Migliorie:

- aggiungere `season`;
- aggiungere `match`;
- aggiungere `category`;
- aggiungere `credit`;
- aggiungere `visible`.

## Struttura Dashboard Consigliata

La dashboard non deve riflettere l'ordine tecnico degli schema, ma il flusso reale dell'editor.

Menu proposto:

1. Home contenuti principali
2. Prossima partita
3. Rosa attuale
4. Archivio giocatori
5. Partite e risultati
6. Classifiche
7. Match report
8. News
9. Sponsor
10. Staff
11. Media
12. Stagioni e competizioni
13. SEO / Impostazioni sito

## UX Editoriale

Principi:

- label in italiano, non tecniche;
- campi piu importanti sopra;
- stato pubblicazione sempre visibile;
- separare "Attuale" da "Archivio";
- evitare menu troppo lunghi per chi aggiorna solo news o partite;
- usare preview utili: nome giocatore + ruolo, partita + risultato, articolo + categoria;
- obbligare alt text per immagini pubbliche.

## Cosa Non Mettere Nel CMS

- Palette ufficiale.
- Font.
- Struttura layout.
- Componenti UI.
- Regole di navigazione principali.
- Logica di fallback.
- Credenziali, token o endpoint privati.


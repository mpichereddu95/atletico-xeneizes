# CONTENT

## Sezioni principali

### Home

Contiene:

- hero
- payoff sintetico
- una sola CTA primaria
- Match Center con prossima partita, ultimo risultato e classifica sintetica
- classifica sintetica
- preview squadra collegata al database completo
- anteprime match report
- anteprime news
- predisposizione community
- staff
- blocco sponsor + canali ufficiali + progetto

### Rosa

Contiene:

- elenco giocatori per ruolo
- statistiche rapide
- link a scheda giocatore

### Scheda giocatore

Contiene:

- anagrafica base
- biografia
- statistiche individuali
- fonte dati

### Partite

Contiene:

- overview stagione
- risultati
- calendario
- classifica

### Stagioni

Contiene:

- archivio stagionale separabile
- conteggio partite e competizioni
- collegamenti a calendario e risultati

### News

Contiene:

- lista articoli
- articolo completo con route dinamica

### Match report

Contiene:

- risultato
- marcatori
- MVP
- cronaca
- gallery

I campi strutturati sono opzionali e gestibili da Sanity.

### Media

Contiene:

- immagini ufficiali del club

### Staff

Contiene:

- ruoli societari e tecnici

### Sponsor

Contiene:

- sponsor principale confermato:
  - Wonderland Hair
  - sito: `https://www.wonderlandhair.it`
  - instagram: `https://www.instagram.com/wonderland_hair_genova`
- tono premium e legame esplicito con il progetto sportivo

### Stagioni

Contiene:

- stagione attuale con stato pubblico in aggiornamento finche non sono disponibili dati ufficiali
- archivio storico 2025/26 con risultati, classifica, rosa e statistiche
- archivio estivo World Cup / Estate 2026 da completare solo con materiali confermati dal club

### Canali ufficiali

Contiene:

- Instagram `https://www.instagram.com/atletico_xeneizes.149`
- YouTube `@AtleticoXeneizes149`

### Il Progetto

Placeholder approvato:

- “Atletico Xeneizes 149 e un progetto sportivo costruito attorno a identita, appartenenza e cultura del gruppo.”

## Linee guida contenutistiche

1. non inventare dati sportivi
2. usare solo sponsor e canali confermati dal club
3. non inventare biografie non confermate
4. distinguere chiaramente dati ufficiali, override del club e contenuti editoriali

## Fonti attuali di contenuto

- dataset centrale `data/club.ts`
- fonti Calcio Liguria memorizzate in `clubSources`
- asset locali del club

## Contenuti da mantenere separati

- editoriale / news
- dati sportivi
- media
- sponsor
- informazioni istituzionali
- canali ufficiali

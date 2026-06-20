# PLAYERS

## Fonte dati attuale

Dataset centralizzato in `data/club.ts`.

## Ruoli supportati

- Portiere
- Difensore
- Centrocampista
- Attaccante

## Dati previsti per giocatore

- id
- nome
- numero
- ruolo
- data di nascita
- foto
- biografia
- URL sorgente
- presenze
- gol
- assist
- ammonizioni
- espulsioni
- autogol
- premi individuali

## Regole dati

1. se un dato non esiste, usare `null` o `n.d.`
2. non inferire statistiche non disponibili
3. ogni correzione manuale del club va annotata anche in `DECISIONS.md`

## Correzioni manuali attive

- Federico Cantoro -> Centrocampista
- Davide Gallone -> Difensore
- Riccardo Nucera -> Difensore

## Stato attuale

La rosa 2025/26 e gia presente e navigabile da sito.

## Evoluzione raccomandata

Separare il dataset giocatori in:

- `players.source`
- `players.overrides`
- `players.normalized`

cosi da poter aggiornare una sola fonte e riflettere tutto nel sito.

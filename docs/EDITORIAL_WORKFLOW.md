# EDITORIAL WORKFLOW - Atletico Xeneizes 149

## Scopo

Questo file definisce come inserire contenuti reali senza passare dal codice ogni volta.

Il backoffice operativo della v1 e Sanity Studio su `/studio`.

## Regola Principale

Sanity gestisce i contenuti modificabili:

- news;
- comunicati;
- match report;
- giocatori;
- partite;
- classifiche;
- sponsor;
- media.

`data/club.ts` resta fallback statico e archivio verificato. Non va aggiornato per ogni singolo contenuto ordinario se il CMS e configurato correttamente.

## Stato Dei Contenuti

Usa sempre:

- `draft` quando il contenuto e incompleto;
- `published` solo dopo revisione finale.

Prima di pubblicare controlla:

- titolo chiaro;
- slug pulito;
- categoria corretta;
- data corretta;
- autore;
- immagine copertina se richiesta;
- testo alternativo immagine;
- contenuto completo;
- fonte o conferma interna quando il dato e sportivo.

## News

Campi minimi:

- titolo;
- slug;
- categoria `News` o `Comunicato`;
- sommario;
- data pubblicazione;
- autore;
- immagine copertina;
- testo alternativo;
- contenuto articolo.

Tono:

- ufficiale;
- semplice;
- sportivo;
- identitario;
- senza frasi tecniche.

## Match Report

Categoria: `Match report`.

Campi consigliati:

- risultato;
- marcatori;
- MVP;
- cronaca;
- gallery se disponibili;
- partita collegata se presente nel CMS.

Se un dato non e confermato, non inventarlo. Lascia il campo vuoto o pubblica solo quando confermato.

## Giocatori

Campi minimi:

- nome;
- slug;
- ruolo;
- numero se disponibile;
- foto se disponibile;
- biografia;
- statistiche;
- fonte ufficiale quando presente;
- `currentRoster`.

Regola attuale:

- Montiel e Hrustic restano nello storico;
- non vanno mostrati nella rosa attuale finche Calcio Liguria non aggiorna i tesseramenti.

## Partite, Risultati e Classifiche

Inserire solo dati ufficiali o confermati dal club.

Se il calendario della stagione attuale non e disponibile, mantenere lo stato pubblico:

> Calendario ufficiale in aggiornamento.

## Sponsor

Wonderland Hair e main sponsor confermato.

Per ogni sponsor usare:

- nome;
- livello;
- descrizione breve originale;
- sito ufficiale;
- Instagram se presente;
- servizi principali;
- logo quando fornito;
- stato `active`.

Non copiare lunghi testi dal sito sponsor. Rielaborare in modo coerente con Atletico Xeneizes 149.

## Media

Usare Sanity per foto, video e gallery.

Ogni immagine deve avere:

- titolo;
- testo alternativo;
- data se disponibile;
- tipo `Foto` o `Video`.

## Naming Consigliato

Slug:

- minuscolo;
- parole separate da trattini;
- niente accenti;
- niente caratteri speciali.

Esempi:

- `poule-scudetto-2026-cammino-atletico-xeneizes`
- `match-report-2026-04-29`
- `wonderland-hair-main-sponsor`

Asset locali solo per materiali base:

- logo ufficiale;
- hero;
- immagini istituzionali essenziali.

Gli asset editoriali ordinari devono stare in Sanity.

## Checklist Prima Di Pubblicare

- Il contenuto e reale o confermato?
- Non contiene frasi provvisorie o tecniche?
- Ha titolo, data, categoria e autore?
- Le immagini hanno alt text?
- Lo slug e pulito?
- Il contenuto e leggibile da mobile?
- I dati sportivi non sono inventati?
- Il contenuto e impostato su `published` solo quando completo?

## Quando Usare Codex

Usa Codex per:

- inserimenti massivi;
- correzioni strutturali;
- import da fonti ufficiali;
- generazione ordinata di testi da materiale fornito;
- controllo SEO e coerenza.

Usa Sanity direttamente per:

- piccole modifiche testuali;
- cambio immagini;
- pubblicazione/sospensione articoli;
- aggiornamenti rapidi a sponsor, media o news.

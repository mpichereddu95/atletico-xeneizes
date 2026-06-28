# SANITY IMPLEMENTATION PLAN - Atletico Xeneizes 149

## Decisione

Sanity e gia installato e collegato. Il piano non prevede una nuova installazione, ma una rifinitura progressiva del CMS e della dashboard.

## Fase 1 - Analisi

Stato: completata a livello preliminare.

Cosa fare:

- Confermare che `/studio` funziona sul dominio ufficiale.
- Confermare variabili Hostinger:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN`
  - `NEXT_PUBLIC_SITE_URL`
- Verificare che i contenuti pubblicati in Sanity appaiano sul sito.

File coinvolti:

- `sanity.config.ts`
- `lib/sanity.ts`
- `lib/api.ts`
- `.env.example`
- Hostinger environment variables

Rischio: basso.

Conferma manuale: serve accesso Hostinger/Sanity.

## Fase 2 - Progettazione Dashboard

Priorita: alta.

Cosa fare:

- Personalizzare la struttura del desk Sanity.
- Separare viste editoriali:
  - Rosa attuale;
  - Archivio giocatori;
  - Prossima partita;
  - Match report;
  - News;
  - Stagioni/archivi.

File coinvolti:

- `sanity.config.ts`
- nuovo eventuale `sanity/structure.ts`
- `sanity/schemaTypes/*`

Rischio: basso/medio.

Conferma manuale: non necessaria se non cambia il design pubblico.

## Fase 3 - Schema Mancanti

Priorita: alta.

Cosa fare:

- Aggiungere `staff`.
- Aggiungere singleton `homepage`.
- Aggiungere singleton `siteSettings`.
- Rifinire `player`, `match`, `season`, `sponsor`, `mediaItem` senza rompere dati esistenti.

File coinvolti:

- `sanity/schemaTypes/staff.ts`
- `sanity/schemaTypes/homepage.ts`
- `sanity/schemaTypes/siteSettings.ts`
- `sanity/schemaTypes/index.ts`
- schema esistenti da estendere.

Rischio: medio.

Conferma manuale: consigliata prima di cambiare campi gia usati in produzione.

## Fase 4 - Collegamento Frontend Progressivo

Priorita: alta/media.

Cosa fare:

- Estendere `lib/sanity.ts` con query per:
  - staff;
  - homepage;
  - site settings;
  - prossima partita;
  - stagione attuale.
- Mantenere fallback in `data/club.ts`.
- Non cambiare componenti finche i dati CMS non sono validati.

File coinvolti:

- `lib/sanity.ts`
- `lib/api.ts`
- `data/club.ts`
- componenti che leggono dati gia mediati da `lib/api.ts`

Rischio: medio.

Conferma manuale: non necessaria se il fallback resta intatto.

## Fase 5 - Migrazione Contenuti

Priorita: alta.

Cosa fare:

1. Inserire una news reale di test.
2. Inserire Wonderland Hair.
3. Inserire stagione attuale e archivio 2025/26.
4. Inserire giocatori reali, con Montiel/Hrustic storici e non in rosa attuale.
5. Inserire partite e classifiche storiche.
6. Inserire match report ufficiali.

File coinvolti:

- `scripts/sync-sanity-content.mjs`
- `data/club.ts`
- Sanity Studio

Rischio: medio.

Conferma manuale: richiesta sui contenuti sportivi reali.

## Fase 6 - Sicurezza

Priorita: alta.

Cosa fare:

- Tenere `SANITY_API_READ_TOKEN` server-side.
- Non usare token write in produzione se non strettamente necessario.
- Rimuovere token esposti in chat o rigenerarli se necessario.
- Controllare CORS per:
  - `https://www.atleticoxeneizes149.com`
  - eventuale localhost solo sviluppo.
- Definire ruoli Sanity:
  - Owner: tecnico/amministratore;
  - Editor: contenuti;
  - Viewer: eventuale sola lettura.
- Usare draft/published per evitare contenuti incompleti.
- Pianificare export backup Sanity periodico.

File coinvolti:

- `.env.example`
- Hostinger env variables
- Sanity Manage
- `docs/SECURITY_CHECKLIST.md`

Rischio: alto se ignorato.

Conferma manuale: si, per rotazione token e permessi account.

## Fase 7 - Test

Priorita: alta.

Cosa fare:

- `npm run typecheck`
- `npm run build`
- Test produzione:
  - home;
  - news;
  - `/studio`;
  - rosa;
  - partite;
  - media;
  - sponsor.
- Verificare mobile/tablet/desktop.
- Verificare articolo pubblicato da Sanity sul sito pubblico.

File coinvolti:

- tutto il frontend toccato dalle query.

Rischio: medio.

Conferma manuale: non necessaria.

## Fase 8 - Deploy

Priorita: alta.

Cosa fare:

- Commit ordinato.
- Push su GitHub.
- Verifica deploy Hostinger.
- Verifica dominio ufficiale e HTTPS.
- Aggiornamento documentazione finale.

File coinvolti:

- GitHub
- Hostinger
- documentazione.

Rischio: basso/medio.

Conferma manuale: serve solo se Hostinger richiede azioni UI.

## Ordine Operativo Migliore

1. Validare un contenuto reale Sanity -> sito pubblico.
2. Personalizzare dashboard Sanity per editor non tecnico.
3. Aggiungere schema mancanti.
4. Collegare staff/homepage/siteSettings.
5. Migrare contenuti reali in ordine: sponsor, news, giocatori, partite.
6. Hardening sicurezza e backup.
7. Test responsive/performance/SEO.

## Cosa Aspettare

Non conviene aspettare per Sanity: e gia integrato e serve al flusso editoriale.

Conviene invece aspettare per:

- Supabase;
- dashboard custom `/admin`;
- automazioni Calcio Liguria complesse;
- registrazione tifosi/community;
- preview mode avanzata.


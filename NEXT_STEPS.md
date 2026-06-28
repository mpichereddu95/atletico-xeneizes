# NEXT STEPS - Atletico Xeneizes 149

## Priorita Alta

### 1. Inserire contenuti reali minimi

- Cosa manca: contenuti ufficiali per validare layout.
- Perche serve: il design va giudicato con materiali veri.
- Rischio: approvare layout su contenuti incompleti.
- File coinvolti: Sanity Studio, `docs/EDITORIAL_WORKFLOW.md`.
- Intervento: 1 news, 1 match report, sponsor, alcune foto giocatori, media item.

### 2. Stabilizzare flusso CMS Sanity

- Cosa manca: uso costante della checklist editoriale.
- Perche serve: inserire contenuti senza programmazione.
- Rischio: dati duplicati tra CMS e fallback.
- File coinvolti: `sanity/schemaTypes/*`, `scripts/sync-sanity-content.mjs`, `docs/EDITORIAL_WORKFLOW.md`.
- Intervento: usare Sanity `/studio` come backoffice operativo v1.

### 3. Chiarire `/admin`

- Cosa manca: decisione se mantenerlo prototipo o proteggerlo davvero.
- Perche serve: evitare backoffice fragile.
- Rischio: area percepita come sicura ma non pronta per uso reale.
- File coinvolti: `app/admin/*`, `components/Admin*`, `lib/supabase.ts`.
- Intervento: per v1 usare Sanity; rimandare dashboard custom.

### 4. Verificare variabili Hostinger

- Cosa manca: controllo che Hostinger abbia tutte le variabili in `.env.example`.
- Perche serve: evitare fallback statici o CMS non letto.
- Rischio: modifiche Sanity non visibili sul sito.
- File coinvolti: Hostinger dashboard, `.env.example`.
- Intervento: controllare `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`.

### 5. Audit produzione

- Cosa manca: controllo live.
- Perche serve: confermare performance e responsive reali.
- Rischio: problemi mobile o cache/deploy.
- File coinvolti: componenti UI, immagini, Hostinger.
- Intervento: Lighthouse, test mobile/tablet/desktop, controllo deploy.

### 6. Aggiornamento dipendenze controllato

- Cosa manca: risoluzione vulnerabilita moderate transitive.
- Perche serve: ridurre rischio sicurezza e mantenere CMS aggiornato.
- Rischio: aggiornando Sanity/Next senza test si puo rompere Studio o build.
- File coinvolti: `package.json`, lockfile, `/studio`.
- Intervento: aggiornare in step dedicato, eseguire typecheck/build e test Studio.

## Priorita Media

### 7. Separare override club

- Cosa manca: struttura dati per correzioni manuali.
- Perche serve: mantenere storico e dati ufficiali ordinati.
- Rischio: correzioni sparse nel codice.
- File coinvolti: futura `data/overrides/`, `lib/api.ts`.
- Intervento: introdurre override senza rompere API frontend.

### 8. Migliorare validazioni Sanity

- Cosa manca: validazioni condizionali piu severe.
- Perche serve: meno errori editoriali.
- Rischio: contenuti incompleti pubblicati.
- File coinvolti: `sanity/schemaTypes/*`.
- Intervento: rafforzare regole su immagini, date, categorie, match report.

### 9. SEO avanzato

- Cosa manca: dati strutturati e metadata piu specifiche.
- Perche serve: miglior indicizzazione.
- Rischio: SEO limitata.
- File coinvolti: `app/*/page.tsx`, route dinamiche.
- Intervento: aggiungere schema.org SportsTeam, Article, Event.

### 10. Policy immagini

- Cosa manca: naming e dimensioni raccomandate.
- Perche serve: performance e coerenza visiva.
- Rischio: immagini pesanti o tagliate male.
- File coinvolti: Sanity assets, `public/images`.
- Intervento: definire formato e crop per hero, card, gallery, giocatori.

## Priorita Bassa

### 11. Automazione Calcio Liguria

- Cosa manca: ingest automatico.
- Perche serve: aggiornamenti piu rapidi.
- Rischio: aggiornamento manuale.
- File coinvolti: futuri script/source layer.
- Intervento: implementare solo dopo stabilizzazione dati manuali.

### 12. Community

- Cosa manca: newsletter, WhatsApp, Telegram, registrazione tifosi.
- Perche serve: crescita community.
- Rischio: basso per v1.
- File coinvolti: `components/CommunitySection.tsx`, eventuali API/form.
- Intervento: attivare quando canali e privacy sono definiti.

### 13. Dashboard custom completa

- Cosa manca: admin proprietario sicuro.
- Perche serve: utile se Sanity non basta.
- Rischio: complessita inutile se anticipata.
- File coinvolti: `/admin`, auth, database.
- Intervento: rimandare.

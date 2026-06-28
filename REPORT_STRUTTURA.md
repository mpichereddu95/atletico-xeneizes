# REPORT STRUTTURA - Atletico Xeneizes 149

## 1. Stato Attuale

### Stack tecnico

- Next.js 16 con App Router.
- React 19.
- TypeScript.
- Tailwind CSS.
- Sanity CMS integrato.
- Supabase predisposto, ma non centrale nella v1.
- Deploy predisposto su GitHub + Hostinger.

### Librerie installate

Runtime:

- `next`
- `react`
- `react-dom`
- `next-sanity`
- `sanity`

Dev:

- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- tipi React/Node.

Non risultano librerie pesanti per grafici, UI kit o animazioni. Il grafico andamento stagione e gestito senza dipendenze esterne.

### Struttura cartelle

- `app/`: route Next.js, layout, metadata, sitemap, robots, manifest.
- `components/`: sezioni UI riutilizzabili.
- `data/club.ts`: dati statici centrali e fallback.
- `lib/api.ts`: facciata dati unica del frontend.
- `lib/sanity.ts`: adapter Sanity con fallback.
- `lib/supabase.ts`: adapter Supabase per prototipo admin.
- `lib/types.ts`: tipi condivisi.
- `sanity/schemaTypes/`: modelli CMS.
- `scripts/`: script operativi, incluso sync verso Sanity.
- `public/images/`: asset locali.
- `docs/`: documentazione di progetto.

### Route e sezioni presenti

- `/`: home con hero, Match Center, stagione, rosa preview, classifica, partite, news, media, sponsor, staff e community.
- `/rosa` e `/giocatori`: database giocatori.
- `/rosa/[playerId]`: scheda giocatore.
- `/partite`: partite, risultati, calendario, classifica e andamento.
- `/calendario`: calendario.
- `/risultati`: risultati.
- `/classifica`: classifica.
- `/match-report`: archivio match report.
- `/stagioni`: archivio stagioni.
- `/news` e `/news/[slug]`: news e articoli dinamici.
- `/media`: media gallery.
- `/staff`: staff.
- `/sponsor`: sponsor.
- `/studio`: Sanity Studio integrato.
- `/admin` e `/admin/login`: prototipo dashboard Supabase.

### CMS, database e API

Sanity e il CMS operativo consigliato per la v1. Sono presenti modelli per:

- articoli/news/match report;
- stagioni;
- competizioni;
- squadre;
- giocatori;
- partite;
- classifiche;
- sponsor;
- media.

Supabase e presente ma va considerato parcheggiato/prototipale. Non e la fonte principale dei contenuti v1.

### Gestione dati

Il frontend legge da `lib/api.ts`.

Flusso attuale:

1. prova a leggere da Sanity dove previsto;
2. se Sanity non restituisce dati validi, usa fallback statici in `data/club.ts`.

Questo e positivo per continuita del sito, ma va documentato bene per evitare confusione tra contenuti CMS e contenuti statici.

### Sistema immagini/media

- Asset locali in `public/images/club` e `public/images/players`.
- Immagini Sanity abilitate tramite `cdn.sanity.io`.
- Immagini Calcio Liguria abilitate da `next.config.mjs`.
- Sanity supporta upload immagini con testo alternativo.

### Configurazioni importanti

- `package.json`: script `dev`, `build`, `start`, `sanity:sync`, `typecheck`.
- `next.config.mjs`: domini immagini remoti.
- `sanity.config.ts`: progetto Sanity e Studio su `/studio`.
- `app/layout.tsx`: metadata base, Open Graph, icone.
- `app/sitemap.ts`: sitemap dinamica da giocatori/articoli.
- `app/robots.ts`: robots e sitemap.
- `.gitignore`: esclude `.env`, `.env.local`, build e cache.

### Deploy

Il repository e collegato a GitHub e Hostinger. Il dominio ufficiale e `https://www.atleticoxeneizes149.com`.

La build locale recente e passata, con warning non bloccante quando Sanity non e raggiungibile in locale.

### Dipendenze inutili o rischiose

Non emergono dipendenze inutili importanti. Il punto da chiarire non e una libreria, ma l'esistenza parallela di Sanity e Supabase:

- Sanity: utile e coerente per contenuti.
- Supabase: utile solo se servono funzioni avanzate future, ma oggi aumenta complessita se trattato come secondo CMS.

## 2. Step Mancanti

### Priorita Alta

#### Consolidare Sanity come fonte contenuti v1

- Cosa manca: decisione operativa finale che Sanity gestisce contenuti modificabili.
- Perche serve: evita doppio flusso tra Sanity, Supabase e file statici.
- Rischio se non fatto: contenuti aggiornati in un punto ma non visibili nel sito.
- File coinvolti: `lib/api.ts`, `lib/sanity.ts`, `sanity/schemaTypes/*`, `scripts/sync-sanity-content.mjs`.
- Proposta: mantenere Sanity come CMS principale e documentare Supabase come parcheggiato.

#### Mantenere `.env.example`

- Stato: creato come template sicuro delle variabili richieste senza valori reali.
- Perche serve: replicare ambiente locale/Hostinger senza usare chat o memoria.
- Rischio se non fatto: deploy non aggiornato o fallback statici inattesi.
- File coinvolti: `.env.example`, `README.md`.
- Proposta: mantenerlo aggiornato quando cambia CMS, hosting o servizi esterni.

#### Chiarire sicurezza `/admin`

- Cosa manca: protezione robusta server-side o dismissione del prototipo.
- Perche serve: oggi la sessione e in `localStorage` e la dashboard e client-side.
- Rischio se non fatto: falsa percezione di backoffice sicuro.
- File coinvolti: `app/admin/*`, `components/Admin*`, `lib/supabase.ts`.
- Proposta: per v1 usare `/studio`; rendere `/admin` non centrale o proteggerlo meglio prima dell'uso reale.

#### Definire convenzione contenuti reali

- Cosa manca: regole per nomi file, alt text, categorie, stati bozza/pubblicato.
- Perche serve: inserimento ordinato di foto, sponsor, news e partite.
- Rischio se non fatto: CMS disordinato e contenuti incoerenti.
- File coinvolti: `docs/CONTENT.md`, `docs/PROJECT_MEMORY.md`, Sanity Studio.
- Proposta: creare checklist editoriale.

#### Performance e responsive su produzione

- Cosa manca: audit reale su dominio live.
- Perche serve: mobile e velocita sono decisivi per un sito sportivo consultato da telefono.
- Rischio se non fatto: sito bello in locale ma scomodo su dispositivi reali.
- File coinvolti: `components/*`, `app/globals.css`, immagini.
- Proposta: test Lighthouse, mobile, tablet e desktop prima del lancio definitivo.

### Priorita Media

#### Separare dati ufficiali, storici e override

- Cosa manca: file dedicati per override club.
- Perche serve: correggere ruoli, rosa attuale e dati sportivi senza toccare dataset storico.
- Rischio se non fatto: correzioni manuali sparse.
- File coinvolti: nuova struttura `data/overrides/`, `data/source/`, `data/transformers/`, `lib/api.ts`.
- Proposta: introdurre gradualmente senza cambiare API dei componenti.

#### Migliorare validazioni Sanity

- Cosa manca: validazioni piu specifiche per URL, immagini, date, stati e campi obbligatori condizionali.
- Perche serve: riduce errori editoriali.
- Rischio se non fatto: contenuti incompleti pubblicati.
- File coinvolti: `sanity/schemaTypes/*`.
- Proposta: aggiungere validazioni mirate dopo primo giro contenuti reali.

#### Ottimizzare immagini

- Cosa manca: policy dimensioni/crop/alt text.
- Perche serve: performance e coerenza visiva.
- Rischio se non fatto: pagine lente o immagini tagliate male.
- File coinvolti: `public/images`, Sanity image fields, componenti card.
- Proposta: definire naming e formati consigliati.

#### SEO avanzato

- Cosa manca: metadata specifiche per tutte le pagine dinamiche e structured data.
- Perche serve: indicizzazione migliore.
- Rischio se non fatto: visibilita organica limitata.
- File coinvolti: `app/*/page.tsx`, `app/news/[slug]/page.tsx`, `app/rosa/[playerId]/page.tsx`.
- Proposta: aggiungere schema.org SportsTeam/Article/Event in fase successiva.

### Priorita Bassa

#### Automazione Calcio Liguria

- Cosa manca: ingest automatico.
- Perche serve: aggiornamenti piu rapidi.
- Rischio se non fatto: aggiornamento manuale.
- File coinvolti: futura cartella `data/source/` o script.
- Proposta: prima stabilizzare dati manuali, poi automazione.

#### Area community

- Cosa manca: newsletter, WhatsApp, Telegram o registrazione tifosi.
- Perche serve: crescita community.
- Rischio se non fatto: nessuno per la v1.
- File coinvolti: `components/CommunitySection.tsx`, futuri form.
- Proposta: implementare solo quando i canali sono definiti.

#### Dashboard admin custom

- Cosa manca: vero backoffice custom.
- Perche serve: utile solo se Sanity non basta.
- Rischio se non fatto: basso, Sanity copre la v1.
- File coinvolti: `/admin`, Supabase, auth.
- Proposta: rimandare.

## 3. Sicurezza

### Variabili ambiente

Stato: presente `.env.local`; creato `.env.example` senza valori reali.

Azioni consigliate:

- non committare valori reali;
- mantenere `.env.example` aggiornato;
- configurare Hostinger con variabili produzione;
- distinguere token pubblici da token server-only.

### Chiavi API e token

Sanity:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` possono essere pubblici.
- token di scrittura o editoriale deve restare server-only.

Supabase:

- anon key e pubblica per natura, ma le policy RLS devono essere corrette.
- evitare di trattare anon key come segreto.

### Route private

- `/studio` usa autenticazione Sanity.
- `/admin` usa login Supabase client-side: prototipo, non abbastanza robusto per funzioni sensibili.

### Upload immagini/file

- Preferire Sanity Studio per upload.
- Richiedere alt text.
- Definire dimensioni minime/massime e naming.
- Evitare upload non autenticati da frontend pubblico.

### Form e spam

Non risultano form pubblici attivi. Se verranno aggiunti:

- validazione server-side;
- rate limit;
- honeypot o captcha;
- protezione anti spam.

### Dipendenze

Da eseguire periodicamente:

- `npm audit`
- `pnpm audit --prod`
- `npm outdated`
- `pnpm outdated --prod`
- build produzione.

Audit eseguito:

- 4 vulnerabilita moderate transitive.
- Pacchetti segnalati: `js-yaml`, `postcss`, `uuid`.
- Origine: dipendenze transitive di Sanity/Next/next-sanity.
- `sanity` aggiornabile da `6.1.0` a `6.2.0`.

Non e stato eseguito aggiornamento automatico per evitare regressioni su CMS e build. Intervento consigliato: aggiornamento controllato in step dedicato con build e verifica `/studio`.

### Backup

- GitHub copre codice.
- Sanity va gestito con export periodici o piano backup.
- Asset originali devono restare anche fuori dal CMS.

### Logging/error handling

Il fallback Sanity evita crash pubblici, ma puo nascondere errori di configurazione. Serve una checklist deploy per capire quando il sito sta usando CMS o fallback statico.

## 4. Inserimento Contenuti Reali

### Fase 1 - Contenuti indispensabili per testare la struttura

- 1 news breve reale.
- 1 match report reale completo.
- 3-5 giocatori con foto reali.
- 1 sponsor Wonderland Hair senza logo se non ancora fornito.
- 1 media item reale.

Formato consigliato: Sanity per contenuti editoriali e immagini; fallback statico solo per dati gia consolidati.

### Fase 2 - Prima del deploy pubblico definitivo

- Logo ufficiale definitivo gia presente e da mantenere coerente.
- Foto squadra reale.
- Sponsor Wonderland Hair con logo/descrizione/link ufficiali.
- Rosa attuale corretta.
- Archivio 2025/26 verificato.
- Testi istituzionali definitivi.
- Meta SEO e Open Graph.

### Fase 3 - Dopo validazione layout responsive

- Foto giocatori complete.
- Gallery partita.
- Video.
- Matchday graphics.
- Staff completo.
- Contenuti sponsor piu ricchi.

### Fase 4 - Aggiornabili nel tempo

- calendario;
- risultati;
- classifica;
- news;
- match report;
- rosa attuale;
- statistiche;
- media gallery.

### Formato dati consigliato

- CMS Sanity: news, match report, sponsor, media, giocatori modificabili.
- File statici/JSON/TS: fallback essenziali e dati storici verificati.
- Cartelle immagini: solo asset brand/base, non archivio editoriale pesante.
- Naming immagini: `atletico-xeneizes-[tipo]-[data-o-slug].jpg`.
- Alt text: sempre descrittivo, non tecnico.

## 5. UX/UI e Responsive

### Stato

Il sito ha una struttura completa ma alcune sezioni possono risultare dense. La home e centrata su Match Center e identita sportiva, ma va validata con contenuti reali.

### Interventi consigliati

- Ridurre ulteriore peso visivo di sezioni dati se la home appare troppo archivio.
- Tenere World Cup/Estate 2026 in archivio secondario.
- Verificare tabelle su mobile.
- Mantenere preview contenute in home e spostare dettaglio in pagine interne.
- Controllare card giocatori con foto reali.
- Verificare hero su mobile senza cambiare immagine.

## 6. Performance e SEO

### Presente

- Metadata globale.
- Open Graph.
- Sitemap.
- Robots.
- Manifest.
- Lazy loading nativo tramite immagini/componenti dove previsto.
- Nessuna libreria grafica pesante.

### Da verificare

- Lighthouse produzione.
- Peso immagini reali.
- Heading hierarchy su tutte le pagine.
- Alt text completo.
- Metadata dinamiche giocatori/news.
- Bundle Sanity Studio escluso dal sito pubblico.
- Cache e revalidate coerenti.

## 7. Problemi Urgenti

1. `/admin` non va considerata dashboard sicura definitiva.
2. Serve checklist Hostinger/Sanity per evitare fallback statici inconsapevoli.
3. Serve disciplina contenuti prima di caricare molte immagini.
4. Sono presenti vulnerabilita moderate transitive da risolvere con aggiornamento controllato dipendenze.

## 8. Raccomandazione Architetturale

Per la v1 usare:

- GitHub + Hostinger per codice/deploy.
- Sanity per contenuti modificabili.
- `data/club.ts` come fallback e archivio verificato.
- Supabase parcheggiato, non centrale.

Questa e la soluzione piu semplice, economica e mantenibile oggi.

# SANITY FEASIBILITY REPORT - Atletico Xeneizes 149

## Sintesi

Sanity e una scelta sensata per Atletico Xeneizes 149, ma non come "nuovo progetto da installare": e gia installato, collegato al dominio ufficiale e usabile da `/studio`.

La decisione corretta ora non e aggiungere un altro backend, ma rifinire Sanity come backoffice editoriale ordinato, mantenendo `lib/api.ts` come facciata unica tra frontend, fallback statici e CMS.

## Stato Attuale

### Gia pronto

- Next.js 16, React 19, TypeScript, Tailwind CSS.
- Sanity Studio integrato in `app/studio/[[...tool]]/page.tsx`.
- Configurazione Sanity in `sanity.config.ts` e `sanity.cli.ts`.
- Modelli CMS presenti:
  - `article`
  - `season`
  - `competition`
  - `team`
  - `player`
  - `match`
  - `standing`
  - `sponsor`
  - `mediaItem`
- Lettura progressiva da Sanity in `lib/sanity.ts`.
- Facciata dati unica in `lib/api.ts`.
- Fallback statico in `data/club.ts`.
- Script di sincronizzazione contenuti: `npm run sanity:sync`.
- Dominio ufficiale registrato come Studio host: `https://www.atleticoxeneizes149.com`.

### Ancora incompleto

- Dashboard Sanity ancora generica: lista documenti standard, non organizzata per flusso editoriale.
- `staff`, `homepage` e `siteSettings` non risultano ancora modellati come documenti Sanity.
- `matchReport` vive dentro `article`, non come documento autonomo.
- Dati sportivi ancora in parte statici o fallback in `data/club.ts`.
- `getHomeSnapshot()` usa ancora `latestResult` e `nextMatch` statici.
- Workflow editoriale non ancora validato con contenuti reali completi.
- Supabase esiste solo come percorso/prototipo documentato, non e fonte dati v1.

## Sanity Ha Senso?

Si, per questo progetto Sanity ha senso.

Motivi:

- Il sito deve essere aggiornabile da persone non tecniche.
- News, match report, giocatori, sponsor, media e calendario cambieranno spesso.
- Serve separare contenuti attuali, archivio 2025/26 e stagioni future.
- Sanity gestisce bene immagini, draft/published, relazioni e ruoli editoriali.
- Lo stack e gia compatibile: `sanity` e `next-sanity` sono installati.
- Il frontend ha gia un adapter dati che permette una migrazione graduale.

## Alternative Valutate

### GitHub + Hostinger + file statici

Pro:

- Semplice, economico, veloce.
- Nessun pannello admin da mantenere.
- Ottimo per sito poco aggiornato.

Contro:

- Ogni modifica richiede codice, commit e deploy.
- Poco adatto a news, risultati, calendari e foto frequenti.
- Non ideale per una gestione autonoma del club.

Verdetto: utile come fallback, non sufficiente per il target pluriennale.

### GitHub + Hostinger + Markdown/JSON

Pro:

- Strutturato e versionabile.
- Piu semplice di un CMS.
- Buono per archivio storico controllato.

Contro:

- Sempre poco accessibile a utenti non tecnici.
- Upload immagini e contenuti ricchi diventano scomodi.
- Ogni aggiornamento passa ancora dal repository.

Verdetto: buono per backup e seed, non come backoffice principale.

### GitHub + Hostinger + Supabase

Pro:

- Potente per database, autenticazione, storage e funzioni custom.
- Utile se serviranno account utenti, community, iscrizioni, notifiche o statistiche avanzate.

Contro:

- Richiede costruire una dashboard custom.
- Piu complesso da proteggere e mantenere.
- Eccessivo per gestione editoriale v1.

Verdetto: da tenere parcheggiato per funzioni avanzate future, non come CMS principale ora.

### GitHub + Hostinger + Sanity

Pro:

- Gia integrato.
- Ottimo per contenuti editoriali e media.
- Dashboard pronta, ruoli, draft/published, immagini, relazioni.
- Migrazione progressiva senza rompere il sito grazie a `lib/api.ts`.

Contro:

- Richiede definire bene schema, permessi e workflow.
- Va protetto con token server-side e CORS corretti.
- Se gli schema diventano troppo complessi, il pannello puo confondere gli editor.

Verdetto: soluzione consigliata per la v1.

## Cosa Gestire in Sanity

Priorita alta:

- News e match report.
- Giocatori attuali e storici.
- Partite, risultati, calendario.
- Classifiche.
- Sponsor.
- Media.
- Stagioni e competizioni.

Priorita media:

- Staff.
- Homepage editoriale.
- Prossima partita e contenuti del Match Center.
- World Cup / Estate 2026 come archivio secondario.

Da lasciare temporaneamente nel codice:

- Navigazione principale.
- Palette, logo, font e regole brand.
- Componenti UI.
- Fallback storico verificato.
- Regole di business critiche come esclusione Montiel/Hrustic dalla rosa attuale fino a nuovo tesseramento ufficiale.

## Rischi Principali

1. Dashboard troppo tecnica
   - Rischio: l'editor non sa dove aggiornare i contenuti.
   - Mitigazione: struttura Sanity personalizzata per "Rosa attuale", "Archivio", "Prossima partita", "Match report".

2. Token esposti
   - Rischio: scrittura o lettura non autorizzata.
   - Mitigazione: token di scrittura solo locale/server, mai `NEXT_PUBLIC_`; read token solo server-side.

3. Contenuti incompleti pubblicati
   - Rischio: sito pubblico con card rotte o dati parziali.
   - Mitigazione: validazioni Sanity e workflow draft/published.

4. Duplicazione fonti dati
   - Rischio: stesso dato in Sanity e `data/club.ts` divergente.
   - Mitigazione: migrazione graduale e `data/club.ts` solo fallback/seed.

5. Dipendenze Sanity da aggiornare
   - Rischio: vulnerabilita moderate transitive gia note.
   - Mitigazione: aggiornamento controllato di Sanity/lockfile in una PR dedicata.

## Raccomandazione

Sanity e consigliato e va mantenuto come CMS v1.

Non serve installarlo da zero. Serve invece completare:

1. dashboard editoriale ordinata;
2. schema mancanti (`staff`, `homepage`, `siteSettings`);
3. relazioni sportive piu chiare;
4. migrazione contenuti reali;
5. hardening sicurezza e workflow.

## Impatto Sul Progetto

Impatto tecnico: medio.

Impatto sul design pubblico: nullo, se ci limitiamo a schema/dati.

Impatto operativo: alto in positivo, perche consente aggiornamenti senza passare dal codice.


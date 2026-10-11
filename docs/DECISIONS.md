# DECISIONS

## 2026-10-11 - Condivisione news

- Nel riquadro "Condividi la notizia" resta solo il pulsante per copiare il link canonico dell'articolo.
- I metadata Open Graph/Twitter restano attivi per mostrare titolo, sommario e immagine quando il link viene incollato sui social; non vengono mostrati pulsanti social sul sito.
- La condivisione diretta in Instagram Stories non e supportata dal sito web e non viene simulata con un'apertura dell'app o un'immagine scaricata.

## 2026-10-11 - Aggiornamento area Staff

- Su indicazione del club, Matteo Margorani non deve comparire nell'area Staff con il ruolo di dirigente.
- Rimuovere il record dal dataset centrale `data/club.ts`; gli altri ruoli dello staff restano invariati.

## 2026-10-10 - Avvio stagione 2026/27

- Fonte: Calcio Liguria, Coppa Cobram Girone D, progetto 1283; schede Info, Rosa e Calendario del club verificate il 10 ottobre.
- Importate le nove squadre e i valori iniziali a zero. La posizione resta nulla prima dell'inizio del campionato, senza trasformare l'ordine dell'elenco in piazzamento.
- Nessuna gara o rosa 2026/27 pubblicata nella fonte: nessun dato inventato, amichevoli escluse dal campionato.
- Archivio 2025/26 e correzioni dei ruoli conservati. Home limitata alla stagione corrente; filtri partite disponibili anche per stagioni con sola classifica.
- Sanity mantiene priorita per stagione/competizione. Senza token di scrittura disponibile si aggiunge lo snapshot verificato al fallback, senza sovrascrivere documenti CMS.
- Il riepilogo di Poule e ora filtrato per stagione; le gare programmate non contano come pareggi.
- QA mobile: contenitori della tabella con larghezza minima zero per confinare lo scorrimento; corretta la sintassi dell'opacita del fondo header per mantenere i link leggibili.

## 2026-10-11 - Layout responsive dei risultati

- Le card dei risultati recenti usano una gerarchia in due righe: data e punteggio in alto, avversaria e dettagli su tutta la larghezza sottostante, esito distinto.
- Nelle card delle partite i breakpoint multi-colonna devono considerare la larghezza effettiva del pannello, non solo quella del viewport.
- Gli elementi con testi dinamici ricevono larghezza minima zero e wrapping sicuro; tabelle e grafici conservano lo scorrimento confinato ai rispettivi contenitori.
- Evitare quattro colonne a tablet per pannelli piccoli; usare griglie progressive. La QA browser locale resta da eseguire: server e Chrome sono bloccati dal sandbox.

## 2026-10-11 - Leggibilita risultati e grafico andamento

- Punteggio ed esito sono elementi separati con spaziatura esplicita; non condivideranno piu una cella di griglia con date o dettagli partita.
- Il grafico stagione usa una linea a gradini per i punti cumulativi partita per partita, una scala leggibile, riferimenti alle giornate e dimensione proporzionale al pannello.
- La selezione del punto mantiene dettaglio di giornata, avversario, risultato, punti guadagnati e totale, utilizzabile anche da tastiera.

## 2026-10-11 - Archivio amichevoli estive

- L'archivio "World Cup / Estate 2026" viene rinominato "Amichevoli Estive 2026" e resta separato dalle competizioni ufficiali.
- I 16 risultati riportati nella locandina del club sono registrati come partite disputate; orari e impianti non presenti nella fonte restano vuoti.
- L'archivio compare come sezione dedicata in Stagioni e come competizione selezionabile in Partite; nuove gare si aggiungono ai dati strutturati o a Sanity.
- Quando Sanity restituisce altre partite, le amichevoli presenti solo nel fallback statico vengono unite senza duplicare quelle gia inserite nel CMS.

## 2026-10-11 - Rose e schede per stagione

- La rosa 2026/27 e l'archivio 2025/26 sono selezionabili separatamente nel Database giocatori.
- Le 12 schede attuali usano nomi e ruoli comunicati dal club; l'allenatore resta nella sezione Staff.
- Foto, statistiche e numeri non comunicati restano non disponibili: i valori 2025/26 non vengono copiati nella nuova stagione.
- Record Sanity e fallback statici vengono uniti per ID, cosi le schede attuali restano visibili insieme ai dati CMS storici.
- Statistiche Sanity non compilate restano null e non vengono convertite in zeri.

## 2026-10-11 - Ordine filtro stagioni

- Il selettore stagione in Partite mostra dall'alto: 2026/27, Amichevoli Estive 2026, 2025/26.
- Dal basso verso l'alto, l'ordine e 2025/26, amichevoli, 2026/27. La stagione corrente resta selezionata all'apertura; stagioni future non riconosciute vengono elencate dopo quelle note.
- La pagina Partite viene servita dinamicamente per evitare che il browser mobile mantenga HTML statico di un deployment precedente.

## 2026-10-11 - Patch vulnerabilita Node.js

- Hostinger ha segnalato vulnerabilita critiche in Next.js 16.2.9 e vulnerabilita in PostCSS 8.5.15.
- Aggiornare Next.js, PostCSS, Sanity e next-sanity entro le rispettive major, scegliendo versioni patch/minor verificate dal registry.
- La dipendenza PostCSS diretta e il suo override npm devono mantenere lo stesso intervallo; un disallineamento blocca `npm install` e il deploy.
- Verificare build Hostinger e nuova scansione prima di considerare risolti gli avvisi.
- Dopo il deploy Hostinger ha confermato 0 critici, ma 10 vulnerabilita transitive residue. Applicare override mirati, mantenendo js-yaml sulla major 3 richiesta da `@vercel/frameworks` e aggiornando uuid solo sotto `typeid-js`.
- Hostinger ha lasciato un solo avviso moderato su `postcss-selector-parser`; aggiornare a 7.1.6 come raccomandato dal pannello e verificare typecheck, CSS Tailwind e build Hostinger.
- Non usare `npm audit fix --force`, che propone il downgrade breaking di Sanity; valutare separatamente gli avvisi del grafo CMS non mostrati dallo scanner Hostinger.
- La scansione Hostinger successiva al deploy `e70b8fe` (2026-10-11 00:49) mostra zero vulnerabilita; build Next.js Linux completata correttamente.

## Formato

Ogni decisione va registrata con:

- data
- ambito
- decisione
- motivo
- impatto

---

## 2026-06-16 - Documentazione

### Ambito

Gestione contesto e memoria progetto

### Decisione

La memoria del progetto viene spostata nei file `docs/` come fonte primaria operativa.

### Motivo

Ridurre consumo di token, evitare ripetizioni, limitare analisi superflue del repository.

### Impatto

Ogni futura modifica dovra aggiornare almeno:

- `ROADMAP.md`
- `TODO.md`
- `DECISIONS.md`

---

## 2026-06-16 - Data layer

### Ambito

Architettura dati sportivi

### Decisione

Tutti i dati sportivi devono passare da un unico layer centrale e da un'unica facciata di accesso lato frontend.

### Motivo

Evitare incoerenze tra pagine, ridurre manutenzione manuale e rendere semplice l'aggiornamento da fonte singola.

### Impatto

`lib/api.ts` rimane il punto pubblico per il frontend. In futuro i dati interni verranno separati in sorgente, override e normalizzazione.

---

## 2026-06-16 - Fonte dati attuale

### Ambito

Stato iniziale applicazione

### Decisione

`data/club.ts` viene riconosciuto come singolo punto di verita applicativo temporaneo della v1.

### Motivo

E gia centralizzato e consente di non toccare la logica delle pagine mentre si prepara una struttura piu robusta.

### Impatto

Le future richieste devono preferire interventi mirati che preservino il ruolo di `data/club.ts` fino alla separazione in piu layer.

---

## 2026-06-17 - Refactor home minimal

### Ambito

Direzione visiva home e priorita dei contenuti

### Decisione

La home viene semplificata in chiave premium minimale: hero senza foto di sfondo, una sola CTA primaria, meno pulsanti complessivi e un blocco unificato per sponsor, canali ufficiali e presentazione del progetto.

### Motivo

La versione precedente risultava piu densa e piu rumorosa del necessario rispetto all'identita desiderata del club.

### Impatto

Le future modifiche alla home devono privilegiare chiarezza, spazio e gerarchia, evitando sezioni decorative o CTA ridondanti.

---

## 2026-06-17 - Tipografia operativa

### Ambito

Sistema tipografico applicativo

### Decisione

Il progetto usa una famiglia display separata per i titoli e `Inter` per il corpo testo, senza introdurre nuove dipendenze tipografiche in questa fase.

### Motivo

Migliorare la gerarchia visiva subito, mantenendo la v1 leggera e facile da distribuire.

### Impatto

I componenti devono usare `font-display` per heading e `font-sans` per body, con uppercase limitato a label e metadati.

---

## 2026-06-17 - Asset hero e cover editoriali

### Ambito

Aggiornamenti puntuali richiesti dal club sulla home e sui match report

### Decisione

La hero usa una fotografia allegata dal club con overlay nero/oro, mentre i due match report del 16 aprile 2026 e del 29 aprile 2026 adottano le nuove cover fornite.

### Motivo

Recepire richieste specifiche senza alterare il resto del sistema visivo o della struttura del sito.

### Impatto

Gli asset vengono mantenuti locali in `public/images/club/` e referenziati solo nei punti esplicitamente richiesti.

---

## 2026-06-17 - Canonical logo asset

### Ambito

Pulizia asset e riferimenti del logo club

### Decisione

Ogni logo precedente viene rimosso da asset, componenti e documentazione. Il sito mantiene un solo riferimento canonico al nuovo file `atletico-xeneizes-logo-transparent.png`.

### Motivo

Evitare cache, ambiguita tra file quasi omonimi e riferimenti residui al vecchio asset non piu desiderato.

### Impatto

Ogni riferimento al logo deve usare solo il file canonico corrente in `public/images/club/atletico-xeneizes-logo-transparent.png`.

---

## 2026-06-17 - Logo rendering e crop news

### Ambito

Rifiniture puntuali su resa logo e immagini editoriali

### Decisione

Il logo ufficiale viene convertito in un PNG con trasparenza reale, eliminando il bianco di fondo dall'asset stesso, mentre le cover news usano proporzioni e focal point piu adatti al contenuto reale.

### Motivo

Migliorare leggibilita e percezione visiva senza cambiare layout, contenuti o struttura delle sezioni.

### Impatto

Le implementazioni future devono usare il PNG trasparente come sorgente ufficiale, senza dipendere da workaround di blending lato UI.

---

## 2026-06-20 - Avvio area admin

### Ambito

Backoffice, CMS e aggiornamento contenuti

### Decisione

L'area admin viene trattata come una fase autonoma da progettare prima dell'implementazione, includendo autenticazione, database, storage media e modelli dati.

### Motivo

News, giocatori, partite, classifiche, sponsor e media non devono restare modificabili solo da codice. Il sito deve diventare gestibile senza interventi tecnici frequenti.

### Impatto

Prima di sviluppare `/admin` bisogna scegliere il provider dati e definire lo schema centrale, preservando `lib/api.ts` come facciata unica per il frontend.

---

## 2026-06-20 - Supabase come backend admin

### Ambito

Backend, database e autenticazione area admin

### Decisione

La prima versione dell'admin usa Supabase come backend per autenticazione, database e futuro storage media. Il progetto Next.js integra Supabase tramite API REST native per evitare nuove dipendenze nella fondazione.

### Motivo

Supabase consente di arrivare rapidamente a un backoffice reale, mantenendo il progetto semplice e pronto a evolvere verso CRUD completi e storage immagini.

### Impatto

Sono stati creati `/admin`, `/admin/login`, `lib/supabase.ts` e `docs/SUPABASE_SCHEMA.sql`. Prima di usare il pannello vanno create le tabelle SQL, un utente Auth e le variabili ambiente su Hostinger.

---

## 2026-06-21 - Sanity come CMS editoriale

### Ambito

Gestione contenuti modificabili senza programmazione

### Decisione

Sanity viene scelto come CMS editoriale principale per news, match report e progressivamente altri contenuti. Supabase resta parcheggiato per funzioni avanzate future, ma non viene usato come centro della gestione contenuti v1.

### Motivo

L'obiettivo operativo e permettere aggiornamenti senza programmazione. Sanity offre uno Studio editoriale gia pronto, mentre Supabase richiederebbe la costruzione manuale di CRUD, upload, form e workflow.

### Impatto

Il sito mantiene `lib/api.ts` come facciata unica. Le news possono arrivare da Sanity quando presenti, con fallback sui dati statici esistenti per non rompere la produzione.

---

## 2026-06-21 - Fallback resiliente per Sanity

### Ambito

Build, deploy e disponibilita contenuti

### Decisione

Le chiamate a Sanity devono fallire in modo silenzioso e lasciare attivo il fallback statico gia presente nel sito.

### Motivo

Il sito ufficiale non deve andare offline o fallire la build se il CMS non e raggiungibile, se mancano variabili ambiente o se Sanity non contiene ancora articoli pubblicati.

### Impatto

`lib/sanity.ts` intercetta gli errori di rete/API e restituisce `null`. `lib/api.ts` continua quindi a servire i contenuti statici fino a quando Sanity non e configurato e popolato correttamente.

---

## 2026-06-21 - Sanity come pannello contenuti completo

### Ambito

CMS, modelli sportivi e contenuti gestibili da interfaccia

### Decisione

Sanity viene esteso oltre le news con modelli per stagioni, competizioni, squadre, giocatori, partite, classifiche, sponsor e gallery/media. `lib/api.ts` continua a fornire fallback statico finche una sezione non contiene dati completi nel CMS.

### Motivo

Il club deve poter aggiornare progressivamente il portale senza modificare codice, mantenendo pero stabilita produttiva e continuita dei contenuti gia online.

### Impatto

Lo Studio `/studio` diventa il pannello operativo principale. I match report reali sono stati caricati nel dataset Sanity, mentre la migrazione completa dei dati sportivi puo procedere per blocchi senza alterare UI e layout approvati.

---

## 2026-06-21 - Sincronizzazione Sanity tramite script

### Ambito

Contenuti CMS, aggiornamenti futuri e gestione da Codex

### Decisione

Viene introdotto `scripts/sync-sanity-content.mjs` con comando `npm run sanity:sync` per sincronizzare in Sanity i dati reali gia presenti nel repository: stagioni, competizioni, squadre, giocatori, partite, classifiche, sponsor, media e articoli.

### Motivo

Il club deve poter aggiornare sia da Studio sia tramite richieste a Codex con testi e immagini allegati, senza ricostruire ogni volta la pipeline. Lo script non contiene token: usa solo variabili ambiente.

### Impatto

Sanity diventa modificabile da pannello e aggiornabile da automazione controllata. In produzione serve la variabile server-only `SANITY_API_READ_TOKEN` per leggere dataset non pubblico senza esporre credenziali nel browser.

---

## 2026-06-21 - Responsive QA senza redesign

### Ambito

Resa responsive su desktop, laptop, tablet e smartphone

### Decisione

Le correzioni responsive devono limitarsi a classi di layout, overflow controllato, dimensioni tipografiche mobili e griglie adattive, senza modificare palette, contenuti, CMS, SEO o struttura informativa approvata.

### Motivo

Il sito ha gia una direzione visuale approvata. La priorita e garantire leggibilita, tap target e assenza di overflow su viewport piccoli, mantenendo invariata l'identita premium/minimale.

### Impatto

Navigazione mobile, card staff, heading interni, news e tabelle sportive usano vincoli piu robusti per evitare compressioni e uscite dallo schermo.

---

## 2026-06-28 - Dashboard Sanity semplificata

### Ambito

Backoffice editoriale `/studio`

### Decisione

Lo Studio Sanity usa una struttura custom orientata al flusso reale del club: Avvio rapido, News, Match report, Rosa attuale, Archivio giocatori, Partite programmate, Risultati, Classifiche, Sponsor, Media e Stagioni/Competizioni.

### Motivo

La lista tecnica degli schema era corretta ma poco adatta a un editor non tecnico. La nuova struttura riduce attrito e separa contenuti attuali, archivio e contenuti editoriali senza modificare il sito pubblico.

### Impatto

La gestione contenuti diventa piu ordinata. Gli schema restano invariati e il frontend continua a leggere tramite `lib/api.ts`.

---

## 2026-06-22 - Home come piattaforma sportiva

### Ambito

Home page, gerarchia sportiva, SEO e scalabilita stagioni

### Decisione

La home deve funzionare come dashboard sportiva: Hero, Match Center, classifica, preview rosa, match report, news e sponsor. Le sezioni profonde restano su pagine dedicate con URL pulite: `/giocatori`, `/calendario`, `/risultati`, `/classifica`, `/match-report` e `/stagioni`.

### Motivo

Il sito deve servire tifosi e aggiornamenti sportivi prima della comunicazione istituzionale. Ridurre il peso della rosa in home e spostare gli archivi su pagine dedicate migliora lettura, performance e crescita pluriennale.

### Impatto

La home carica meno contenuti visibili subito, usa preview editoriali e sportive, mantiene il design approvato e prepara archivio stagioni e match report strutturati senza cambiare identita visiva. `/rosa` resta la route storica della squadra, mentre `/giocatori` viene aggiunta come alias SEO senza duplicare componenti.

---

## 2026-06-27 - UI/UX Pro Max come reference leggera

### Ambito

Memoria operativa, qualita UI/UX e consumo di contesto

### Decisione

Il repository `nextlevelbuilder/ui-ux-pro-max-skill` non viene integrato come Git Submodule. Viene registrato come riferimento esterno in `docs/UI_UX_PRO_MAX.md`, mentre le regole operative ad alto valore vengono sintetizzate in `AGENTS.md`.

### Motivo

La skill e un toolkit per assistenti AI, non una dipendenza runtime del sito. Un submodule aumenterebbe peso, rumore nei diff e manutenzione senza migliorare build o UX in modo diretto.

### Impatto

Codex deve leggere prima `AGENTS.md` e consultare UI/UX Pro Max solo per audit o decisioni progettuali mirate. Branding, palette e identita Atletico Xeneizes restano governati da `docs/BRAND.md`.

---

## 2026-06-27 - Stagione attuale e archivio storico

### Ambito

Home, partite, stagioni, rosa e contenuti pubblici

### Decisione

La stagione attuale viene separata dall'archivio 2025/26. Se il calendario ufficiale non e disponibile, il sito mostra uno stato pubblico "in aggiornamento" senza inventare gare. Montiel e Hrustic restano nello storico, ma sono esclusi dalla rosa attuale tramite `currentRoster: false` e filtro in `lib/api.ts`.

### Motivo

Il sito deve sembrare ufficiale e vivo anche tra una stagione e l'altra, senza cancellare dati storici o pubblicare informazioni non confermate.

### Impatto

La home usa una preview della rosa corrente, `/rosa` conserva il database storico, il Match Center include countdown dinamico con fallback elegante e la pagina stagioni distingue stagione in corso, archivio 2025/26 e archivio estivo.

---

## 2026-06-28 - Sanity come backoffice v1 e sicurezza operativa

### Ambito

CMS, variabili ambiente, sicurezza, memoria progetto e flusso editoriale.

### Decisione

Sanity Studio su `/studio` e il backoffice operativo della v1. Supabase e `/admin` restano parcheggiati/prototipali finche non verra definita una protezione server-side adeguata. Le variabili ambiente sono documentate in `.env.example`; il flusso editoriale e in `docs/EDITORIAL_WORKFLOW.md`; la checklist sicurezza e in `docs/SECURITY_CHECKLIST.md`.

### Motivo

Sanity copre gia news, match report, giocatori, partite, classifiche, sponsor e media senza richiedere programmazione. Mantenere due sistemi admin attivi aumenterebbe complessita, rischio operativo e consumo di contesto.

### Impatto

Le future modifiche contenutistiche devono partire da Sanity e dal layer `lib/api.ts`. `/admin` non va usato come dashboard definitiva finche non sara progettato come prodotto separato e sicuro.

---

## 2026-06-28 - Build Hostinger stabilizzata su Webpack

### Ambito

Deploy produzione Hostinger, Next.js 16 e stabilita runtime

### Decisione

Lo script `npm run build` usa `next build --webpack` invece del build predefinito con Turbopack.

### Motivo

La build Webpack compila correttamente il progetto e genera tutte le pagine. Turbopack ha mostrato un errore interno locale durante la build; usare Webpack riduce il rischio di deploy instabili e 503 su Hostinger.

### Impatto

Hostinger continuera a usare `npm run build`, ma con pipeline Webpack. Non cambia design, contenuti, CMS o comportamento pubblico del sito.

---

## 2026-06-28 - Start command esplicito per Hostinger

### Ambito

Runtime produzione Hostinger e reverse proxy Node.js

### Decisione

Lo script `npm run start` avvia Next con host esplicito `0.0.0.0` e porta `${PORT:-3000}`.

### Motivo

I log Hostinger mostravano l'app pronta senza errori, ma il dominio restituiva 503. Rendere espliciti host e porta evita disallineamenti tra processo Next e reverse proxy della piattaforma.

### Impatto

Il sito resta invariato. Cambia solo il comando runtime usato da Hostinger per servire l'app.

---

## 2026-06-28 - Runtime standalone per Hostinger

### Ambito

Deploy produzione Hostinger e compatibilita Node.js

### Decisione

Next.js genera output `standalone` e lo script `npm run start` avvia direttamente `.next/standalone/server.js` con `HOSTNAME=0.0.0.0`. Dal 2026-09-06 la build copia anche `public` e `.next/static` nel pacchetto standalone tramite `scripts/prepare-standalone.mjs`, per servire immagini e stili.

### Motivo

Hostinger mostrava il processo Next pronto nei log, ma il dominio restituiva ancora 503. Il runtime standalone riduce la dipendenza dal wrapper `next start` e rende piu esplicito il server Node da eseguire in produzione.

### Impatto

Non cambia il sito pubblico, il CMS o il design. Cambia solo il modo in cui l'app viene avviata in produzione.

---

## 2026-08-31 - Rifinitura UI premium senza redesign

### Ambito

Home pubblica, gerarchia visiva, responsive e accessibilita base.

### Decisione

Applicare una rifinitura mirata su hero, header, Match Center, anteprime news, preview rosa e classifica senza cambiare identita, palette, contenuti, route o CMS.

### Motivo

La piattaforma era gia completa nelle funzioni principali, ma alcune sezioni avevano peso visivo simile e un ritmo piu tecnico che editoriale. La rifinitura rende la home piu leggibile e piu vicina a un sito ufficiale sportivo, mantenendo l'architettura esistente.

### Impatto

Nessuna nuova dipendenza. Le modifiche sono concentrate su componenti visuali riutilizzabili e utility CSS. `lib/api.ts`, Sanity, dati sportivi e configurazione Hostinger restano invariati.

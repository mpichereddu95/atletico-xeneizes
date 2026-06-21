# DECISIONS

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

# ROADMAP

## Visione

Trasformare l'attuale v1 in un portale ufficiale stabile, aggiornabile e gestibile nel tempo.

## Fase 0 - Fondazioni documentali

Stato: completata

- [x] creare struttura documentale base
- [x] definire regole permanenti di progetto
- [x] allineare memoria del progetto ai file in `docs/`
- [x] aggiungere `AGENTS.md` come indice operativo permanente
- [x] registrare UI/UX Pro Max come reference esterna sintetica

## Fase 1 - Consolidamento architettura dati

Stato: in corso

- [x] separare dati sportivi da contenuti editoriali
- [ ] introdurre override ufficiali del club in file dedicato
- [ ] definire struttura target per ingest da fonte esterna
- [ ] mantenere `lib/api.ts` come facciata unica

## Fase 2 - Raffinamento UI

Stato: in corso

- [ ] consolidare visual language across pages
- [ ] uniformare card, tipografia, badge, stati e tabelle
- [ ] migliorare UX mobile delle sezioni dense
- [x] semplificare la home verso una direzione piu premium, minimale e ordinata
- [x] ridurre CTA duplicate nella hero e nei moduli principali
- [x] accorpare sponsor, canali ufficiali e progetto in un blocco unico piu chiaro
- [x] applicare aggiornamenti puntuali a hero, logo e cover news senza alterare il resto del layout
- [x] consolidare un unico asset logo attivo eliminando i riferimenti al file precedente
- [x] migliorare resa del logo su fondo scuro e crop immagini nella sezione news
- [x] ottimizzare responsivita trasversale di navigazione, card staff, news e tabelle sportive senza cambiare identita visiva
- [x] ribilanciare home in chiave sportiva con Match Center, classifica sintetica, preview rosa e anteprime editoriali
- [x] separare stagione attuale, archivio 2025/26 e archivio estivo senza inventare dati non ufficiali
- [x] aggiungere countdown prossima partita con stato in aggiornamento

## Fase 3 - Dati sportivi avanzati

Stato: in corso

- [x] predisporre struttura match report con risultato, marcatori, MVP, cronaca e gallery
- [x] aggiungere grafico andamento squadra leggero senza nuove dipendenze
- [ ] tabellini partita completi
- [ ] storico stagioni completo
- [ ] statistiche aggregate

## Fase 4 - Editoriale e CMS

Stato: completata per v1

- [x] scegliere Sanity come CMS editoriale principale
- [x] documentare modello contenuti Sanity v1
- [x] adapter CMS per news con fallback statico
- [x] creare Studio Sanity integrato in `/studio`
- [x] workflow redazionale base tramite Studio e token editoriale
- [x] documentare checklist editoriale Sanity
- [x] immagini dedicate per articolo
- [x] contenuti reali v1 sincronizzati in Sanity

## Fase 5 - Backoffice / aggiornamenti

Stato: ridimensionata

- [ ] dashboard amministrativa
- [x] scelta stack admin: Sanity per CMS editoriale, Supabase parcheggiato
- [x] dichiarare `/studio` come backoffice operativo v1
- [x] documentare `/admin` come prototipo non definitivo
- [ ] protezione area `/admin`
- [x] creare fondazione `/admin` con login Supabase e dashboard moduli
- [x] documentare schema Supabase v1
- [x] editing manuale dati tramite modelli Sanity
- [x] gestione news da pannello
- [x] gestione giocatori da pannello
- [x] gestione partite, risultati e classifiche da pannello
- [x] gestione sponsor e media da pannello
- [ ] sincronizzazione fonte esterna

## Fase 6 - Presenza ufficiale completa

Stato: pianificata

- [x] sponsor reale principale confermato in home
- [x] canali ufficiali base pubblicati
- [x] SEO base, Open Graph, robots e sitemap
- [x] pagine dedicate per calendario, risultati, classifica, match report e stagioni
- [ ] SEO avanzato
- [x] controllo responsive desktop/tablet/mobile
- [ ] performance audit finale
- [ ] aggiornamento controllato dipendenze moderate segnalate da audit

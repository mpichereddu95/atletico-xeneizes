# SECURITY CHECKLIST - Atletico Xeneizes 149

## Variabili Ambiente

- Non committare `.env.local`, `.env` o token reali.
- Usare `.env.example` come template.
- Su Hostinger configurare almeno:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN` se il dataset Sanity e privato.
- `SANITY_AUTH_TOKEN` deve essere usato solo localmente per sync controllati.

## Sanity

- Usare `/studio` come backoffice operativo v1.
- Limitare gli utenti Sanity ai soli account autorizzati.
- Usare ruolo minimo necessario per collaboratori/editor.
- Richiedere alt text per immagini editoriali.
- Mantenere contenuti incompleti in `draft`.
- Fare export/backup periodici del dataset.

## Supabase

- Supabase e parcheggiato per funzioni future.
- `/admin` e prototipo tecnico, non dashboard sicura definitiva.
- Non usare `/admin` per gestione contenuti reali finche non viene protetto server-side.
- Se Supabase verra riattivato:
  - verificare RLS su tutte le tabelle;
  - evitare policy troppo permissive;
  - separare ruoli admin/editor;
  - non salvare sessioni sensibili senza revisione.

## Upload e Media

- Caricare media editoriali in Sanity.
- Tenere in repository solo asset brand/base realmente necessari.
- Comprimere immagini prima del caricamento.
- Evitare file non necessari o non ottimizzati.
- Non permettere upload pubblici anonimi.

## Form Pubblici

Al momento non risultano form pubblici critici.

Se verranno aggiunti:

- validazione server-side;
- honeypot o captcha;
- rate limit;
- consenso privacy dove necessario;
- logging errori senza esporre dettagli tecnici.

## Dipendenze

Eseguire periodicamente:

```bash
pnpm audit --prod
pnpm outdated --prod
```

Ultimo audit eseguito:

- Hostinger ha rilevato 33 avvisi (3 critici, 14 alti, 16 moderati) il 2026-10-11; dopo gli aggiornamenti delle dipendenze la scansione del 2026-10-11 00:49 ha confermato zero vulnerabilita.
- Le patch compatibili aggiornano `js-yaml` a 3.15.2 e `smol-toml` a 1.9.1 sotto `@vercel/frameworks`, e `uuid` a 11.1.1 sotto `typeid-js`.
- `postcss-selector-parser` e aggiornato a 7.1.6 come richiesto dallo scanner; typecheck, parsing selector, compilazione CSS Tailwind e build Linux Hostinger passano.
- `npm audit --omit=dev` include anche vulnerabilita della toolchain Sanity (`braces` e `sprintf-js`) non presenti nell'ultima scansione Hostinger. `npm audit fix --force` propone un downgrade breaking di Sanity e non va usato senza valutare aggiornamento del CMS.
- Il primo tentativo di deploy e fallito per un override PostCSS non allineato; dipendenza diretta e override devono avere lo stesso intervallo.

Intervento consigliato:

1. mantenere allineati la dipendenza diretta PostCSS e il relativo override;
2. applicare override alle dipendenze transitive con patch compatibili;
3. rigenerare il lockfile npm usato dal deploy Hostinger;
4. eseguire `typecheck` e `build`;
5. verificare `/studio` e le route pubbliche;
6. ridistribuire e ripetere la scansione Hostinger;
7. valutare separatamente gli avvisi della toolchain Sanity in `npm audit` senza forzare downgrade di major.

## Deploy

- Dopo ogni push verificare build Hostinger.
- Controllare che il sito live non usi fallback statici per errore di variabili CMS.
- Verificare `robots.txt`, `sitemap.xml`, Open Graph e dominio canonico.
- Tenere GitHub come fonte del codice.

## Backup

- Codice: GitHub.
- Contenuti CMS: export Sanity periodico.
- Asset originali: archivio separato del club, non solo CMS.

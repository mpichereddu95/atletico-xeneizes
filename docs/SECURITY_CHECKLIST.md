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

- 4 vulnerabilita moderate transitive.
- Pacchetti coinvolti: `js-yaml`, `postcss`, `uuid`.
- Origine principale: dipendenze transitive di Sanity/Next/next-sanity.
- `sanity` risulta aggiornabile da `6.1.0` a `6.2.0`.

Intervento consigliato:

1. aggiornare Sanity in una branch dedicata;
2. rigenerare lockfile;
3. eseguire `typecheck` e `build`;
4. verificare `/studio`;
5. pubblicare solo se tutto passa.

## Deploy

- Dopo ogni push verificare build Hostinger.
- Controllare che il sito live non usi fallback statici per errore di variabili CMS.
- Verificare `robots.txt`, `sitemap.xml`, Open Graph e dominio canonico.
- Tenere GitHub come fonte del codice.

## Backup

- Codice: GitHub.
- Contenuti CMS: export Sanity periodico.
- Asset originali: archivio separato del club, non solo CMS.

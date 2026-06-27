# UI/UX Pro Max Reference

## Decisione

Il repository `nextlevelbuilder/ui-ux-pro-max-skill` viene usato come riferimento esterno, non come Git Submodule.

## Fonte

- Repository: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
- Versione dichiarata: `2.6.2`
- Commit analizzato: `65e23199492fa911af32d9078e627ab4de01f4c8`
- Data integrazione: `2026-06-27`

## Perche non Submodule

Il repository contiene una skill per assistenti AI, CLI, dataset, template multipiattaforma, workflow e preview. Non e una dipendenza runtime del sito Atletico Xeneizes.

Un submodule dentro il progetto aggiungerebbe:

- peso e rumore nella working tree;
- manutenzione extra per clone, checkout e deploy;
- rischio di far rileggere troppi file a Codex;
- nessun beneficio diretto sulla build Next.js.

La soluzione scelta e piu pulita: riferimento documentato piu regole sintetiche in `AGENTS.md`.

Non vengono copiati dataset, script, template o asset del repository esterno. Questo evita ambiguita di licenza, drift tra versioni e aumento inutile del contesto.

## Quando Consultarlo

Consultare UI/UX Pro Max solo per:

- audit UI/UX;
- responsive e accessibilita;
- gerarchia visuale;
- pattern di layout;
- design system review;
- performance percepita e anti-pattern.

Non usarlo per:

- cambiare branding;
- cambiare palette;
- sostituire il design approvato;
- introdurre nuove dipendenze;
- generare redesign non richiesti.

## Principi Estratti per Atletico Xeneizes

- La gerarchia deve guidare: contenuti sportivi primari prima di contenuti secondari.
- Ogni sezione deve avere una funzione chiara e un solo livello di CTA principale.
- Layout responsive da verificare almeno a `375px`, `768px`, `1024px` e desktop largo.
- Tap target, focus state e stati hover devono essere visibili e coerenti.
- Tabelle e dati sportivi devono restare leggibili su mobile, anche con scroll controllato.
- Animazioni limitate a micro-interazioni sobrie, rispettando `prefers-reduced-motion`.
- Evitare elementi decorativi senza funzione, gradienti rumorosi e pattern non coerenti col brand.
- Usare Server Components di default e ridurre JavaScript client non necessario.
- Le immagini editoriali devono avere aspect ratio stabile, alt text e lazy loading quando non sono above the fold.
- I contenuti CMS devono restare resilienti: fallback statico se il provider non risponde.

## Aggiornamento Reference

Per rivalutare la skill in futuro:

```bash
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill /tmp/ui-ux-pro-max-skill
git -C /tmp/ui-ux-pro-max-skill rev-parse HEAD
```

Poi aggiornare questo file solo se emergono regole utili e non ridondanti.

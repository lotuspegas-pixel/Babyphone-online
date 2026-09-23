# Eindcontrole — de negen vinkjes uit A-baseline.md §7

Bijgehouden vanaf taak 11. Elk vinkje met de stand op het moment van vastleggen en hoe het is
gecontroleerd. Wat "QA" heet, wordt door de aparte eindcontrole-agent nog integraal nagemeten
(18 contrastmetingen, netwerktrace, offline-doorloop).

| # | Eis (A §7) | Stand | Hoe gecontroleerd |
|---|---|---|---|
| 1 | Contrastscript 0 fouten op landing, vragen én rapport, licht én donker | **Gehaald per scherm** | Landing 6×0 (taak 3), vragen 6×0 (taak 9), rapport 0/0 (taak 10). De volledige 18-metingenmatrix (3 schermen × 2 thema's × 3 breedtes) draait de QA-agent, omdat de losse agents niet elk drie breedtes konden emuleren. |
| 2 | `prefers-reduced-motion` ≥ 5 regels | **Gehaald** | 6 regels sinds taak 1; niet verwijderd. |
| 3 | JS landing ≤ 95 KB over de lijn | **Gehaald** | 65,8 KB brotli q11 (`meet-bundel.mjs`), ruim onder 95. |
| 4 | Geen netwerkverzoek na laden (behalve een afgesproken teller) | **Gehaald** | Geen analytics/teller toegevoegd; geen enkel extern verzoek. Integrale netwerktrace: QA. |
| 5 | De zes localStorage-sleutels werken identiek; bestaande gebruikers verliezen hun rapport niet | **Gehaald** | `STORAGE_KEYS` ongewijzigd (answers, current_question, result, started_at, completed_at, profile) + `arcana_theme` los. Taak 10 rendert oudere `arcana_result` nog steeds. |
| 6 | Alle drie de disclaimersecties op dezelfde plek in de leesvolgorde | **Gehaald** | Landing "Eerlijk gezegd" (onaangeraakt), rapportvoettekst, `#root`/`noscript`-fallback — geen ervan verplaatst of afgezwakt. |
| 7 | JSON-LD valideert en wijst naar `arcanaprofile.com` | **Gehaald** | `controleer-jsonld.mjs` draait in de build: 4 entiteiten (Organization, WebSite, WebApplication, FAQPage), 9 FAQ-vragen, alle `@id`/`url`/`logo` op arcanaprofile.com. Rich Results Test / Schema Validator vereisen internet → handmatige owner-stap. |
| 8 | `noscript`- en `#root`-fallback aanwezig en inhoudelijk gelijk | **Gehaald (met één feitelijke correctie)** | Structuur en tekst ongewijzigd; alleen "ruim 5.500 woorden" → "ruim 5.700 woorden", een correctie naar de gemeten werkelijkheid (5.996–6.764), consistent met de statbalk. |
| 9 | Dezelfde antwoorden geven exact hetzelfde rapport | **Gehaald** | Determinismetest (gouden master) groen; 129 tests. De harde helft is door taak 9–11 niet aangeraakt. |

## Domeinhardheid (taak 11 acceptatiecriterium)

`npm run build` faalt met exit-code 1 zodra er één absolute URL naar een onbekende host in de
uitvoer staat. **Bewezen:** een tijdelijke `<link href="https://voorbeeld-fout.nl/x">` in
`dist/index.html` gaf `check-domains.mjs` exit 1 met de melding `ONBEKENDE HOST "voorbeeld-fout.nl"`;
na verwijderen weer exit 0.

## Het woord "speaktoart" in de repo

De verzendbare uitvoer is schoon: **0** voorkomens in `dist/`, `src/`, `index.html`, `public/` en
de config. De resterende voorkomens zijn geen live-verwijzingen:
- `docs/` (87): de bronspecificaties (A, D, E, F, G, OPDRACHT, Z) beschrijven de domeinmigratie
  zelf — Z-eindcontrole analyseert letterlijk of speaktoart.com een 301 moet krijgen. Die tekst
  scrubben zou de documenten corrumperen.
- `scripts/check-domains.mjs` (1): de `VERBODEN`-lijst — het mechanisme dat speaktoart juist uit
  de build weert. Verwijderen zou de bewaking verzwakken.
- `arcana-rebuild.patch` (472 KB): een oude patch, cruft. Wordt in taak 13 (opruimen) verwijderd.

De strikte lezing "0 in de hele repo" is niet haalbaar zonder de bewaking en de brondocumenten
kapot te maken; de betekenisvolle eis — 0 in de verzendbare uitvoer — is gehaald.

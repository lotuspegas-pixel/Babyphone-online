# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Nederlandstalige volwassenen die zichzelf beter willen begrijpen — meestal op een rustig moment thuis, op telefoon of laptop — en bereid zijn daar 20–25 minuten (120 vragen) in te steken. Ze komen binnen via de landingspagina, maken de test in één of meer sessies (pauzeren/hervatten) en lezen daarna een lang persoonlijk rapport, vaak 's avonds, soms opnieuw weken later. Een deel wil het rapport bewaren of delen als PDF. (Afgeleid uit docs/arcana en de copy; niet in een interview bevestigd.)

## Product Purpose

Arcana Profile (voorheen Arcana Mirror) is een persoonlijkheidsanalyse-engine die uit 120 antwoorden 30 subdimensies, 12 hoofddimensies, 12 archetypen (+ 6 stress-archetypen) en spanningsvelden berekent en daaruit een rapport van 33 hoofdstukken genereert. Succes = de lezer herkent zichzelf in concreet gedrag (incl. schaduwkant en groeisleutel) en kan elke uitspraak terugvoeren op een getoond cijfer.

## Positioning

"Zelfinzicht dat je kunt narekenen": geen taalmodel, geen server — een deterministische berekening die bij dezelfde antwoorden altijd hetzelfde rapport geeft, met het cijfer naast elke uitspraak. Een buurproduct met een LLM of normgroep-claims kan dit niet waarmaken.

## Operating Context

- Flow: landing → intake (naam, aanspreekvorm je/u, levensfase) → 120 vragen in vier blokken (72 stellingen, 24 keuzes, 16 situaties, 8 rangschikkingen; automatisch doorschakelen) → laadscherm → rapport (web) → PDF/markdown-export, "deel één pagina".
- Statische SPA (Vite + React + TypeScript), gehost op Hostinger; test-domein speaktoart.com, productiedomein arcanaprofile.com. Geen backend/server; alles (scoring, rapportgeneratie, export) draait in de browser; opslag in localStorage (exact zeven sleutels).
- Statisch voorbeeldrapport op /voorbeeld/ (gegenereerd uit verzonnen antwoorden).
- Regressiepoort: `npm run typecheck`, `npm run lint`, `npm run test` (gouden master van 12 rapporten; tekstwijzigingen vereisen `ARCANA_GOLDEN_UPDATE=1`), `npm run build` (incl. domeincontrole, JSON-LD-controle en bundelbegroting: landing-JS ≤ 75.000 B brotli-q11, fonts ≤ 60.000 B, CSS-grens in scripts/meet-bundel.mjs).

## Capabilities and Constraints

- Deterministisch, zonder externe AI-API; geen willekeur in de uitvoer.
- Rapportteksten: Nederlands, warm maar eerlijk, concreet gedrag, schaduwkant, spanningsvelden; geen diagnose, geen Barnum-zinnen, geen absolute claims; formule eigenschap → zichtbaar gedrag → verborgen behoefte → effect op anderen → valkuil → groeisleutel. Archetypenamen blijven Engels (eigenaarsbeslissing).
- Geen kopie van Insights/MBTI/DISC; geen medische diagnose.
- Mobielvriendelijk; print/PDF-vriendelijke rapportweergave is een acceptatiecriterium.
- Afgeleid (okt. 2026, niet bevestigd): het rapport wordt aan het eind als écht gegenereerd .pdf-bestand gedownload (client-side, één klik); print-naar-PDF blijft als reserve. "Backend" betekent de rekenlaag in de browser, niet een server.
- Afgeleid: hero met parallax (scroll + lichte pointerdiepte), secties die één keer bij het scrollen tot leven komen, interactieve tegels, tactielere testflow — alles met `prefers-reduced-motion`-uitschakeling.
- Open eigenaarsbeslissingen (zie docs/arcana/PROJECT_STATUS.md): betaalde bewaarversie, §3.4-terugkeerondersteuning, scoreherijking Fase C.

## Brand Commitments

- Naam: Arcana Profile; tagline "Know your patterns". Zegel: ster boven een figuur op een drietredige sokkel in een gestempelde ring.
- Bindende visuele referentie (eigenaar, sept.–okt. 2026): de landingmockup en de rapport-/PDF-mockups in `C:\Users\rleac\Videos\AI 2026\arcana2026\Arcana Profile.com\Arcana Design Sep 2026\` — archiefcollage op verouderd perkament, inktzwart, dieprood zegelrood, gescheurd papier, handschrift-marginalia, Jungiaanse symboliek (drempel/poort, brein, vlam, kompas, schaakkoning, buste). Alle beeld wordt als eigen vector-SVG nagetekend; geen fotografische of AI-gegenereerde gezichten van echte personen (de map bevat een Jung-gelijkend gezicht dat bewust niet wordt gebruikt).
- Typografie (vastgelegd): Bodoni Moda (display), Spectral (lopende tekst), Courier Prime (data/kickers), Shadows Into Light (alleen marginalia). Zelf gehost, gesubset.
- Stem: Nederlands, je-vorm (u-vorm als keuze in het rapport), zinsopmaak, actieve werkwoorden, geen hype.

## Evidence on Hand

- Echte cijfers: 120 vragen, 12 dimensies, 30 eigenschappen, 33 hoofdstukken, ≈5.700 woorden, 20–25 minuten (src/site/siteContent.ts SITE_STATS).
- Één geverifieerd citaat: "Until you make the unconscious conscious, it will direct your life and you will call it fate." — C.G. Jung.
- Volledig voorbeeldrapport (/voorbeeld/, src/test/golden/*.md).
- Afwezig en niet te verzinnen: gebruikersaantallen, beoordelingen, testimonials, normgroep, validatiestudie, "wetenschappelijk bewezen". De mockups bevatten zulke nepcijfers; die worden niet overgenomen.

## Product Principles

1. Narekenbaar boven overtuigend: elke uitspraak draagt zijn cijfer; geen claim zonder bron.
2. Privacy als product: geen server, geen account, antwoorden blijven op het apparaat.
3. Eerlijk over grenzen: schaduwkant en beperkingen staan in beeld, niet in de kleine letters.
4. Hetzelfde patroon overal: landing, test, rapport en PDF delen één visuele wereld en één embleem per archetype.
5. Licht blijft snel: de landingsbegroting is hard; rijkdom komt uit vector en typografie, niet uit megabytes.

## Accessibility & Inclusion

WCAG 2.1 AA-contrast voor elke kleurtoken (gemeten en gedocumenteerd in src/styles/tokens.css); kleur is nooit de enige drager (label + vorm + positie); toetsenbordfocus zichtbaar; `prefers-reduced-motion` gerespecteerd; donkere modus volwaardig; mobiel vanaf 320 px zonder horizontale scroll.

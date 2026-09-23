# Arcana Mirror Project Status

## Current phase

Alle fases (0–7) afgerond. Daarna uitgebreid met fase 8: naslagwerk, personalisatie en verdiepte rapportsecties.

### Phase 8 — Resultatendocumentatie en personalisatie
- [x] docs/arcana/resultaten.md: 30 subdimensies per scoreband en levensdomein
- [x] resultaten.md: 12 hoofddimensies met leesinstructie
- [x] resultaten.md: 6 stress-archetypes uitgediept
- [x] resultaten.md: 10 spanningsvelden uitgediept
- [x] resultaten.md: 12 archetype-portretten met alle levensdomeinen
- [x] resultaten.md: alle 144 primair × secundair combinaties
- [x] resultaten.md: Jungiaans kader (persona, schaduw, projectie, compensatie, individuatie)
- [x] resultaten.md: acht beschouwingen (liefde, haat, pijn, intuïtie, verdriet, tegenslagen, geluk, blijdschap)
- [x] Intake-scherm met naam, aanspreekvorm en levensfase
- [x] localStorage-sleutel arcana_profile
- [x] Grammaticale omzetting naar de u-vorm met tests
- [x] Rapport uitgebreid van 15 naar 33 secties
- [x] Nuancering wanneer archetypeportret en eigen score botsen

### Phase 9 — Tekstvarianten (build-time, geen runtime-AI)
- [x] Deterministische variantselectie op basis van de antwoorden (`arcanaVariants.ts`)
- [x] `variantSeed` toegevoegd aan het scoreresultaat
- [x] 3 formuleringen per veld voor 30 subdimensies × 5 velden (450 strings)
- [x] 3 formuleringen voor 21 vaste sectieteksten
- [x] Varianten voor de acht beschouwingen
- [x] Tests: stijl, duplicaten, u-vorm en determinisme over alle varianten
- [x] `npm run overlap` meet het effect herhaalbaar

### Deployment — live testomgeving
- [x] Platform live op test-domein https://speaktoart.com/ (Hostinger)
- [x] Productie-build als zip aangeleverd voor upload (paden met forward slashes, Linux-veilig)

### Post-launch verbetertraject (Fase A–E, los van de Phase 0–9 bouwnummering)

Op 2026-08-19 is een klinische/UX/business-analyse van een live (willekeurig ingevuld) rapport uitgevoerd, gevolgd door een fasegewijs verbeterplan (Fase A t/m E) en vijf visuele herontwerp-templates. Zie DECISIONS.md voor de volledige onderbouwing per fase.

- [x] **Fase A — Leesbaarheid en structuur** (arcana-feature-builder + arcana-ux-designer, 2026-08-20)
  - [x] Dubbele hero-introtekst gefixt (`sections[0]` wordt niet meer nogmaals in de sectielijst gerenderd)
  - [x] 6 nieuwe H2-tussenkoppen groeperen de 32 secties; geneste inhoudsopgave
  - [x] "In het kort"-kaart (archetype, top sterkte, top valkuil, actief spanningsveld) tussen scorewiel en sectielijst
  - [x] "Naar inhoudsopgave ↑"-knop, verschijnt na scrollen voorbij de hero
  - [x] `data-kind`-indeling (insight/shadow/reflection/growth/summary) met eigen randaccent per soort
  - [x] `@page`-printregel + versoepelde `break-inside` voor de 6 secties die langer zijn dan 1 A4-pagina
  - [x] Bullettekst gelijkgetrokken met lopende tekst (16px); regellengte lopende tekst begrensd op 65ch
  - [x] Checks: typecheck 0, lint 0 (in `src/`), test 91/91, build slaagt
- [x] **Fase B — Rapportinhoud (herhaling en signalering)** (arcana-report-analyst + arcana-report-writer, 2026-08-20)
  - [x] Spanningsveld-bullet lekte woordelijk (incl. statuslabel) in Week 2 van het 30-dagenplan — nu alleen poolnamen, cijfers blijven canoniek in "Je spanningsvelden"
  - [x] Groeibereidheid-cijfer stond dubbel (who-you-can-become + growth-path) — growth-path canoniek, who-you-can-become verwijst kwalitatief
  - [x] conflictAvoidance-cijfer stond dubbel (relationship + communication) — communication canoniek (cijfer is daar dragend voor de stijlclassificatie), relationship verwijst kwalitatief
  - [x] Cascade who-you-are/at-ease/strengths/shadow/stress: at-ease en strengths-bullets #1-3 tonen het cijfer niet meer (al genoemd bij "Wie je bent"); shadow en stress onderdrukken het cijfer alleen conditioneel, per individueel rapport herberekend — de getoonde subdimensies zelf zijn nergens gewijzigd, alleen de cijfer-herhaling
  - [x] Signaleringszinnen (huisarts-verwijzing, toon van de bestaande "Over verdriet"-zin) toegevoegd bij "Over pijn" en "Over haat"
  - [x] Geverifieerd op 6+ seeds, incl. een edge-case (seed 303, 4/5 shadow-bullets overlappend) — sectie-selectie ongewijzigd, alleen cijfer-weergave; determinisme en bestaande 91 tests intact
  - [x] Checks: typecheck 0, lint 0 (in `src/`), test 91/91, build slaagt
  - Bewust uitgesteld (zie DECISIONS.md 2026-08-20): variant-botsingsmechanisme (aantal formuleringen per veld), pool-overlap "met anderen"/"familie en vrienden"
- [x] **Kaartendeck-ontwerp + gevraagde functies** (2026-08-21)
  - [x] Volledig nieuw uiterlijk: licht standaard met volwaardig donker thema, kaarten met afgeknipte hoek, kleur+vorm per kaartsoort, monospace cijfers
  - [x] Toegepast op alle schermen: start, intake, vragen, laadscherm, rapport
  - [x] Vragen schakelen automatisch door; geen "Volgende"-knop meer bij likert/forcedChoice/scenario
  - [x] Rangschikvragen houden een eigen knop (die leggen bij openen al een antwoord vast en zouden zichzelf overslaan)
  - [x] Terugkeren naar een beantwoorde vraag toont alsnog "Volgende", anders zit de deelnemer klem
  - [x] "Download als PDF"-knop naast "Rapport printen" (beide via het printvenster van de browser)
  - [x] Printweergave forceert het lichte palet, zodat donkere modus geen zwarte vlakken op papier geeft
  - [x] Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt
- [x] **Visueel ontwerp van Arcana Profile overgenomen** (2026-09-10)
  - [x] Warme parchment-wereld: #fbf8f3 achtergrond met radiale wasem, inkt #292420, amber #b66a08 als actiekleur
  - [x] Cormorant Garamond (display) + Inter (leestekst), zelf gehost als woff2 met unicode-range, SIL OFL
  - [x] Gestapeld woordmerk "Arcana / Mirror" op 128px, gewicht 500, letterspacing -0,055em — identiek aan de bronsite
  - [x] Vlakke redactionele vlakken met haarlijnen; geen kaartschaduwen, pil-vormige knoppen (999px, 48px)
  - [x] Landschapsgravure als sfeerband met mix-blend-mode multiply; 3,2MB PNG teruggebracht naar 219KB WebP
  - [x] Vijf kaartsoorten in de clusterkleuren: insight indigo, shadow karmijn, growth jade, reflection amber, summary inkt
  - [x] Bewust geen donker thema (`color-scheme: light`) — de bronsite heeft er ook geen
  - [x] Niets over Human Design overgenomen; functionaliteit van Arcana Mirror ongewijzigd (120 vragen, 12 archetypes, 33 secties, auto-advance, PDF/print)
  - [x] Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt
- [x] **Complete website "Arcana Profile"** (2026-09-14)
  - [x] Productnaam gewijzigd van Arcana Mirror naar Arcana Profile
  - [x] Marketinglandingspagina met 9 secties: hero, sfeerband, cijferstrook, voordelen, hoe het werkt (visuele trechter 120→30→12→1), wat het meet (12 dimensies), je rapport (6 groepen), voor wie, wat dit niet is, FAQ, slot-CTA
  - [x] Plakkende header met navigatie en mobiel menu (<900px), voettekst met disclaimer
  - [x] Losse pagina's privacy en voorwaarden via hash-routing (#/privacy, #/voorwaarden) — geen serverrewrites nodig
  - [x] "Terug naar de website"-knop in het rapport (niet-destructief)
  - [x] SEO: meta-tags, Open Graph, JSON-LD (WebSite + WebApplication + FAQPage), robots.txt, sitemap.xml, webmanifest, og-image
  - [x] Eigen favicon met het stermerk (oude Vite-favicon verwijderd)
  - [x] Responsief geverifieerd op 320/390/768/1024/1440px: nul horizontale overflow op landing, testflow, rapport en beide losse pagina's
  - [x] Alle navigatie-ankers verwijzen naar bestaande secties (de aangeleverde bronsite had hier gebroken links)
  - [x] Testflow ongewijzigd: 120 vragen, automatisch doorschakelen, 33 rapporthoofdstukken, PDF/print
  - [x] Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt (838 KB zip)
- [x] **Rapportweergave "Het portret"** (2026-09-21)
  - [x] Drie ontwerprondes van vijf voorstellen; eigenaar koos expliciet "Het portret"
  - [x] `ArcanaPortrait` (nieuw): canvas-tekening van de 12 hoofddimensies als pluimen rond een kern — kernrand = 0, gestippelde ring = 50, buitencirkel = 100
  - [x] Deterministisch: lengte, buiging, dichtheid, lijndikte en kleur komen alle uit een score of een index; geen `Math.random()`
  - [x] `ArcanaScoreWheel` verwijderd, inclusief `.arcana-score-wheel*` / `.arcana-stat-*` stijlen en hun printregels
  - [x] `meaning` + `color` toegevoegd per hoofddimensie in `arcanaDimensions.ts`
  - [x] "De sleutel": 4 leesregels + de 12 waarden als tekstlijst — die lijst is tegelijk het tekstalternatief voor het beeld en de bediening om één kant op te lichten
  - [x] Rapport heringedeeld: portret → archetypekaart → "In het kort" → expliciete scheiding "Vanaf hier de verdieping" → legenda, inhoudsopgave en de 32 hoofdstukken
  - [x] Print: `print-color-adjust: exact` op het doek, opnieuw tekenen bij `beforeprint`, paginabreuk vóór de verdieping
  - [x] Geverifieerd in de browser op 1000px en 375px: geen horizontale overflow, doek schaalt mee, compacte modus op smal scherm
  - [x] Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt
- [x] **Portret afgemaakt: jargon, kern en verantwoording** (2026-09-22)
  - [x] Zes subdimensielabels herschreven bij de bron — `Stress: …` en `Schaduw: …` waren via 32 generator-aanroepen tot in de slotzin zichtbaar voor de lezer
  - [x] `ArcanaReportGlance` herbouwd tot "De kern": vijf kaarten met ankerlinks naar het volledige hoofdstuk
  - [x] `ArcanaMethod` (nieuw): "Hoe dit gemeten is" — de keten, wat de schaal betekent, hoe stevig de meting staat, wat dit níet is
  - [x] Landingspagina verwees nog naar een scorewiel; nu naar het portret
  - [x] Jargoncontrole over een volledig rapport: nul treffers op `Stress:` / `Schaduw:`
  - [x] Raakdoelen: "lees verder"-links waren 28px, opgehoogd naar 44px
  - [x] Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt
- [x] **Rebuild taak 1 — Designtokens en donkere modus** (2026-09-23; plan in `arcana/docs/rebuild/G-rebuild-spec.md`, changelog in `arcana/docs/rebuild/CHANGELOG.md`)
  - [x] Eigenaar koos richting (a) Perkament & Diepte + donkere modus, en herocopy A voor taak 3
  - [x] `src/styles/tokens.css` = `design-tokens.css` uit werkstroom B, ongewijzigd, plus twee aanvullingen; oude `:root` uit `arcana.css` verwijderd, oude namen als alias
  - [x] Twaalf dimensiekleuren → vier families van drie met symbool (◆ ● ▲ ■); `MAIN_DIMENSIONS` krijgt `token`/`family`, geen hex meer; volgorde per familie gehergroepeerd (generator leest de array niet)
  - [x] Donkere modus: `prefers-color-scheme` + handmatige keuze (`arcana_theme`, JSON, buiten "Antwoorden wissen"), bootscript zonder flits, `theme-color` volgt de keuze, schakelaar in kop, mobiel menu en rapport
  - [x] Portret leest kleuren uit de tokens en tekent opnieuw bij een themawissel; print forceert licht ook vanuit donker
  - [x] Contrast: 0 fouten op landing/vragen/rapport in licht én donker; één echte fout gevonden en gefixt (trechterband 3)
  - [x] Corpustest u-vorm: vals positief op "weet u" hersteld
  - [x] Checks: typecheck 0, lint 0, 120 tests, gouden master 0 gewijzigd, build + domeincontrole geslaagd
- [x] **Rebuild taak 2 — Bundel splitsen, fonts subsetten, portret naar SVG** (2026-09-23; drie commits)
  - [x] 2a: `React.lazy` voor intake/vragen/rapport, engine dynamisch en vóórgeladen bij de intake, foutscherm met antwoorden-download als de engine niet laadt, `QUESTION_COUNT` los van de vragenbank, bronniveau-test op de splitsing, `scripts/meet-bundel.mjs` als laatste stap van de build
  - [x] Gemeten (q11): landing 60,4 KB (doel 75; was ~131 in één chunk), volledig bezoek 132,6, herlezen 74,3; in de browser haalt de landing alleen `index` + `vendor`
  - [x] 2b: fonts gesubset met `scripts/subset-fonts.py` (basis + twee aanvullingen met `unicode-range`), Cormorant 400 rechtop en Inter 500 vervallen, preload op het woordmerkfont; landing 53,5 KB in 4 bestanden (doel 60; was 120,6 in 5)
  - [x] 2c: portret als SVG (`arcanaPortraitGeometry.ts` pure geometrie + `ArcanaPortrait.tsx`), kleuren uit de tokens, toetsenbord-focusbare pluimen met `<title>`, print als vector; canvas blijft tot taak 13 via `?vergelijk`
  - [x] Contrast rapport 0/0 in licht en donker, nu inclusief de tekst in het beeld (567 knopen)
  - [x] Checks: typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, build + domeincontrole + begroting geslaagd
- [x] **Rebuild taak 3 — Landingspagina en hero (variant A)** (2026-09-23)
  - [x] Copy uit `E` §5 met herovariant A: h1 = propositie, merknaam klein erboven, "Drie dingen die je hier wél kunt controleren" direct onder de hero, gravure op plek 3, statbalk `5.700+` / `met de cijfers erbij`, VOORDELEN 1/2/4/6, HOE_HET_WERKT 1/3/4, FAQ 1/5/8 + negende vraag, slot-tekst
  - [x] Ritme uit `B` §4: elke sectie eigen vlak over de volle breedte (`--bg`/`--bg-veil`/`--bg-deep`/`--bg-band`/`--bg-ink`), twee donkere blokken (cijfers, Eerlijk gezegd), asymmetrisch raster, dimensies in de vier families met dimensiekleur en symbool, geen hover
  - [x] Voorbeeldportret op de landing (`src/site/PortraitSample.tsx`, zelfde geometrie en CSS als het echte portret, statisch, +5,3 KB q11)
  - [x] Skip-link naar `<main id="inhoud">`; precies één h1; koppen zonder sprongen
  - [x] SEO-titel op de h1 afgestemd (`G` beslispunt 2): 59 tekens; beschrijving 156 tekens; og/twitter-titel volgen
  - [x] Contrast 0 fouten in licht én donker op 1440/390/320 (254 knopen); trechterband 2 op nacht gefixt (4,31 → 5,0)
  - [x] Checks: typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, build + domeincontrole + begroting (65,7 KB ≤ 75) geslaagd
  - [ ] **Niet gehaald:** paginahoogte 7.638 px op 1440 (doel ≤ 6.000): het controleerblok, het portret in "Wat je krijgt" en de negende vraag passen niet in de hoogte die `B` schatte — keuze voor de eigenaar
  - [ ] Niet gebouwd: sectie "Kijk het zelf na" (`E` §5.9) — wacht op het voorbeeldrapport (taak 12); trechter als SVG; slotzin FAQ 9 (toezegging van de eigenaar)
- [x] **Rebuild taak 4 — Rapport: herleesstructuur** (2026-09-23; eerste stap die de rapporttekst raakt — gouden master bewust bijgewerkt in dezelfde commit)
  - [x] Samenvatting "Je rapport in het kort" direct onder de masthead, vóór het portret, `#samenvatting`, geen verwijzing omhoog, betrouwbaarheidszin erbij, drie niet-destructieve knoppen; "Opnieuw beginnen"/"Antwoorden wissen" naar de voettekst
  - [x] `ifItDoesNotFit` van hoofdstuk 33 naar direct onder de valkuilenlijst (nieuw optioneel veld `outro` op `ArcanaReportSection`; export en weergave kennen het)
  - [x] Deelbaar hoofdstuk: titel "Wat ik je zou willen uitleggen", herkomstalinea met twee scores, losse pagina op `#/delen` met eigen aanhef, disclaimer en drie handelingen (`ArcanaSharePage.tsx`)
  - [x] Overgangszinnen omgedraaid: vier terugkijkende banken dragen nu cijfer + hoofdstuk, twee vooruitwijzende banken erbij; zes deelopeningen (`SECTION_GROUPS.lead`); "Dit rapport staat stevig" vervangen (`C` §6.5)
  - [x] Checks: gouden master 12 fixtures bijgewerkt en gelezen (harde helft onveranderd), 129 tests, typecheck 0, lint 0, build + domeincontrole + begroting; contrast rapport en deelpagina 0 fouten licht én donker
  - [ ] Open: `C` §3 laag 3 (navigatieregel met inhoud), §3.3, §3.4, wisdialoog (`G` taak 10); u-vorm "uw zelf"/"tot uw de" in bestaande traitteksten (omzetter)
- [x] **Rebuild taak 9 — De vragenflow** (2026-09-23)
  - [x] Naamformulier (`ArcanaIntake.tsx`): eyebrow, kop-body, veldhint en aanspreekvorm-toelichting uit `C` §4.7; nieuwe tekstknop "Liever zonder naam →" die met een leeg naamveld bevestigt (`et()`/`addressed()` in de engine hadden de naamloze variant al)
  - [x] Blokaanduiding `Stellingen · {n} van 72` met varianten voor de andere drie blokken (72/24/16/8, berekend uit de globale index i.p.v. "Deel 1 van 4"); voortgangslabel krijgt de resttijd (`Vraag {n} van 120 · nog ongeveer {m} minuten`, pas vanaf 3 antwoorden, uit het tempo sinds `arcana_started_at`)
  - [x] Pauzeren-knop en laatste knop uit `C` §4.8 (`Pauzeren — je antwoorden blijven bewaard`, verkort tot "Pauzeren" onder 420px met de volledige tekst als `aria-label`; `Afronden — laat mijn rapport zien`)
  - [x] Focuskader-bug uit `A` §3.9 gefixt: de vraagkop is nu het vaste focusdoel bij elke vraagwissel (`tabIndex={-1}` + effect op `currentIndex`), root cause was DOM-hergebruik van radiogroup-knoppen met stabiele keys over vragen heen; rangschikking blijft ongemoeid met ↑/↓ bedienbaar
  - [x] Laadscherm herbouwd (`ArcanaResultLoading.tsx` + `App.tsx`): het rekenen (`generateReport`) start meteen bij het tonen van het scherm i.p.v. na 6s; ondergrens 1,2s tegen flikkeren, optie B uit `C` §4.9 (vier regels met echte getallen), doorlopende sterrenanimatie als voortgangsindicatie bij een langzamere berekening
  - [x] Checks: typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, build + domeincontrole + begroting geslaagd; contrast vragenscherm 0 fouten licht/donker op 1440/390/320px
- [x] **Rebuild taak 10 (tekst-deel) — Afsluiters per hoofdstuktype en u-vorm-fix** (2026-09-23; alleen de rapporttekst, de rest van `G` taak 10 staat open)
  - [x] Alle 33 hoofdstukken krijgen een afsluiter passend bij hun kaartsoort (`C` §3.3): insight ("Wat je hiermee kunt" + twee subdimensies), vijf hoofdstukken-over-anderen (vraag het na), vier zware hoofdstukken naast de valkuilen (geruststelling zonder vast aantal), vier groei-hoofdstukken ("van de {n} punten is er één die vandaag al kan"), acht beschouwingen (herkomstzin met twee scores + eerlijke fallback zonder match)
  - [x] Valkuilenafsluiter herschreven volgens `C`'s letterlijke sjabloon in het bestaande `outro`-veld (geen doublure): "Wat je hiermee kunt" → "Als dit niet klopt" (`ifItDoesNotFit`) → vaste slotzin "niet de plekken waar je faalt"
  - [x] Twee gemelde u-vorm-fouten gefixt ("tot je de logica", "sneller dan je zelf zou wensen") plus 24 andere gevonden via een volledige scan van alle "je"-zinnen in de zes tekstbestanden — allemaal opgelost bij de bron, de omzetter zelf niet aangeraakt
  - [x] Bug gevonden en gefixt tijdens het bouwen: alle afsluiters van hetzelfde hoofdstuktype kozen zonder salt dezelfde formulering binnen één rapport; opgelost met de sectie-id als salt (`Sc()`, zelfde patroon als `T()`)
  - [x] `REPORT_VERSION` 2.1.0 → 2.2.0 (puur tekst toegevoegd, oudere `arcana_result` blijft renderbaar)
  - [x] Checks: typecheck 0, lint 0, 129 tests (harde helft onveranderd), gouden master bewust bijgewerkt en regel voor regel gelezen (+1.356 woorden/rapport gemiddeld), `npm run overlap` onveranderd (28,8%, afsluiters staan in `outro` en tellen daar niet in mee), build + domeincontrole + begroting geslaagd
  - [ ] Open (presentatielaag, niet tekst): navigatieregel met inhoud (`C` §3.2 laag 3), terugkeerondersteuning (`C` §3.4), leesinstructie bij de `profile`-kaarten, knoppenherschikking en eigen wisdialoog
  - [ ] Geen browsertool beschikbaar in deze sessie: geen screenshot- of Playwright-contrastcontrole op het rapport; geverifieerd via de markdown-export en broncode-inspectie van de (ongewijzigde) renderfunctie
- [x] **Rebuild taak 10 (presentatiedeel) — Navigatieregel, wisdialoog, knoplabels, versiecontrole** (2026-09-23; maakt `G` taak 10 af zonder de rapportgenerator/tekstdata/gouden master aan te raken)
  - [x] Kaartnavigatie toont nu een halve regel context per richting (`C` §3.2 laag 3): vaste tabel `src/data/arcanaSectionNavReasons.ts` (sectie-id → reden vooruit/achteruit voor alle 32 hoofdstukken), valt terug op de kale titel waar geen reden bestaat; "Kaart X/Y" en de bestaande anker-/toetsenbordwerking ongewijzigd; telt niet mee in de gouden master (staat niet in de markdown-export)
  - [x] `window.confirm` bij "Opnieuw beginnen" en "Antwoorden wissen" vervangen door `ArcanaConfirmDialog` (nieuw, herbruikbaar): `role="dialog"`, `aria-modal`, Tab-val, Escape sluit, focus naar de veilige knop bij openen en terug naar de openende knop bij sluiten (`returnFocusRef`, Safari-veilig); letterlijke teksten uit `C` §5 met twee benoemde knoppen (bewust geen derde "Eerst bewaren als PDF"-knop — buiten de opdracht van deze taak)
  - [x] Knoplabels: `Bewaar als PDF` (met de PDF-instructie nu zichtbaar in plaats van in een `title`-attribuut), `Printen op papier`, `Downloaden als tekstbestand (.md)`, masthead-eyebrow `Het patroon dat het sterkst naar voren kwam` — archetypenamen bewust niet vertaald (apart eigenaarsbesluit, `C` §4.11 rij 55)
  - [x] Datumregel bovenaan het rapport (`C` §3.4-D): `Gemaakt op {datum} · {n} antwoorden · versie {n} van de berekening`, nu ook in de interface
  - [x] Versiecontrole zonder harde 3.0.0-blokkade: `arcanaReportCompat.ts` keurt goed op hoofdversie (additieve minor/patch-bumps blijven renderbaar); `ArcanaReportGate.tsx` (nieuwe lazy chunk i.p.v. `ArcanaReport` in `App.tsx`) toont bij een onbekende/hogere hoofdversie of een echte renderfout (`ArcanaReportErrorBoundary`, class component) het uitlegscherm `ArcanaReportIncompatible.tsx` met downloadknop en "De test opnieuw doen" — nooit een leeg scherm
  - [x] Checks: typecheck 0, lint 0, 129 tests (0 gewijzigd), gouden master 0 gewijzigde fixtures, build + domeincontrole + begroting geslaagd (landingbundel ongewijzigd)
  - [x] In de browser geverifieerd: navigatieregel (inhoud op `core-pattern`), beide dialogen (teksten, Tab-val, Escape, Enter, focus-terugkeer), `meta.version: "9.9.9"` → uitlegscherm, kapotte `sections`-structuur met geldige versie → opgevangen door de foutgrens (console-log bevestigd), contrastscript 0 fouten licht/donker incl. open dialoog (688–693 knopen)
  - [ ] Geen viewport-resize beschikbaar in het browserpaneel van deze sessie: 1440/390/320 px niet apart met het oog gecontroleerd (wel: layoutviewport 1280×720 bevestigd, contrast daar 0 fouten, nieuwe CSS volgt bestaande relatieve/`flex-wrap`-patronen); screenshots op grote scrolldiepte gaven herhaaldelijk een leeg beeld (omgevingsbeperking, DOM/computed-style bevestigde correcte content) — verificatie van diep-gescrolde content liep via de DOM
  - [ ] Open: terugkeerondersteuning (`C` §3.4 A/B/C) en leesinstructie bij de `profile`-kaarten
- [x] **Rebuild taak 11 — Disclaimers, SEO en JSON-LD** (2026-09-23): JSON-LD-graaf met Organization/publisher/audience/about/dateModified, FAQ 5→9 (zichtbaar), 5.500→5.700, één domeinbron (.env.production + generate-seo-files.mjs), controleer-jsonld.mjs; check-domains faalt bewezen op een vreemde host; negen A §7-vinkjes in docs/eindcontrole.md; poort groen, gouden master 0 gewijzigd.
- [ ] **Fase C — Scoremodel herijken** — bewust nog niet gestart, vereist expliciete instemming (breekt vergelijkbaarheid met bestaande rapporten). Extra aanleiding sinds 2026-09-21: op een echt rapport liggen de 12 dimensies tussen 42 en 72, waardoor het nieuwe portret bijna rond uitvalt en zijn zeggingskracht verliest.
- [ ] **Fase D — Eerste betaalde laag (geen backend)** — nog niet gestart
- [ ] **Fase E — Backend/accounts/teamfuncties** — nog niet gestart, fundamentele architectuurbeslissing

## Phase checklist

### Phase 0 — Documentation and agent setup
- [x] docs/arcana created
- [x] AGENTS.md created
- [x] CLAUDE.md created
- [x] project manager agent created
- [x] specialist agents created
- [x] arcana-run skill created
- [x] arcana-review skill created

### Phase 1 — Data and types
- [x] TypeScript types created
- [x] 30 subdimensions defined
- [x] 12 main dimensions defined
- [x] 12 archetypes defined
- [x] 120 questions created
- [x] question validation created

### Phase 2 — Scoring engine
- [x] Likert scoring
- [x] forced-choice scoring
- [x] scenario scoring
- [x] ranking scoring
- [x] normalization 0-100
- [x] confidence scores
- [x] main dimensions
- [x] archetype detection
- [x] tension detection
- [x] response quality

### Phase 3 — Report generator
- [x] report object
- [x] hero section
- [x] all required sections (15/15)
- [x] score-based text selection
- [x] no empty sections
- [x] no diagnosis claims
- [x] no generic filler

### Phase 4 — UI flow
- [x] start screen
- [x] test screen
- [x] all question types
- [x] progress bar
- [x] previous/next
- [x] localStorage
- [x] resume
- [x] result loading screen
- [x] report page

### Phase 5 — Premium design
- [x] visual theme
- [x] responsive layout
- [x] cards
- [x] charts/wheel
- [x] tension cards
- [x] print layout

### Phase 6 — Testing
- [x] dummy answers (7 modes: balanced, highSensitivity, highControl, highFreedom, highRecognition, random, straightLine)
- [x] scoring tests
- [x] report tests
- [x] no NaN/null/undefined (verified by vitest across all dummy modes)
- [x] lint (oxlint — 0 issues)
- [x] typecheck (tsc -b --noEmit — 0 errors)
- [x] build (vite build — succeeds)

### Phase 7 — Deployment readiness
- [x] README updated
- [x] deployment instructions
- [x] final review (manual browser walkthrough: start → 120 questions → loading → full report, desktop + mobile viewport)
- [x] known issues documented

## Verification summary

- `node scripts/arcana-quick-check.js` — 0 failures, 0 warnings
- `npm run lint` (arcana/) — 0 issues
- `npm run typecheck` (arcana/) — 0 errors
- `npm run test` (arcana/) — 15/15 passed
- `npm run build` (arcana/) — succeeds, ~270KB JS / 8KB CSS gzip ~83KB
- Manual E2E in-app browser test: full 120-question flow completed, report rendered with all 15 sections, archetype card, score wheel, tension cards, print button, privacy text and disclaimer all present; verified interactive on a 375px mobile viewport.

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

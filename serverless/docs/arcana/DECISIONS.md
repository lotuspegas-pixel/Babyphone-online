# Arcana Mirror Decisions

Use this format:

## YYYY-MM-DD — Decision title

Decision:
Reason:
Files affected:
Risks:
Follow-up:

---

## 2026-07-11 — Project control system aangemaakt

Decision: AGENTS.md, CLAUDE.md, docs/arcana/*, .claude/agents/*, .claude/skills/* aangemaakt volgens de opgegeven specificatie.
Reason: Fase 0 vereist een projectcontrolesysteem voordat er gebouwd wordt, zodat elke volgende fase getoetst kan worden aan een vaste bron van waarheid.
Files affected: AGENTS.md, CLAUDE.md, docs/arcana/**, .claude/agents/**, .claude/skills/**
Risks: Geen; puur documentatie.
Follow-up: scripts/arcana-quick-check.js toevoegen, daarna stackkeuze documenteren (Fase 1).

## 2026-07-11 — Git branch voor Arcana Mirror build

Decision: Nieuwe branch `arcana-mirror-agent-build` aangemaakt vanaf `main`.
Reason: Git is aanwezig en schoon (geen uncommitted changes); AGENTS.md vereist dat het werk in een aparte branch gebeurt met commits per fase.
Files affected: git branch
Risks: Geen.
Follow-up: committen na elke afgeronde fase.

## 2026-07-11 — Stackkeuze: Vite + React + TypeScript in arcana/

Decision: Arcana Mirror gebouwd als losstaand Vite+React+TypeScript-project onder `serverless/arcana/`, met vitest voor tests en oxlint (meegeleverd door create-vite) voor linting.
Reason: De bestaande `serverless/` codebase is een puur statische HTML/CSS/vanilla-JS babyfoon-app zonder package.json, bundler of TypeScript — er is geen bestaande frontend-stack om in te integreren. AGENTS.md schrijft React+TypeScript+Vite voor als fallback in dat geval. Vite's build-output is statische HTML/CSS/JS, dus prima deploybaar op Vercel, Netlify of Hostinger, en raakt de bestaande babyfoon-pagina's niet aan.
Files affected: serverless/arcana/** (nieuw project)
Risks: Twee aparte front-ends in dezelfde repo (root statische site + arcana/ SPA); gebruikers moeten expliciet naar /arcana/ (of het gekozen subpad) navigeren na deploy. Gedocumenteerd in README.
Follow-up: bij deploy een reverse-proxy/subpad-regel instellen zodat /arcana/ naar de gebouwde SPA wijst (zie README "Deployen").

## 2026-07-11 — .gitignore-uitzondering voor Arcana-subagents/skills

Decision: Root `.gitignore` negeert `.claude/` volledig (editor/tooling-config); voor dit project zijn expliciete negatie-regels toegevoegd zodat `serverless/.claude/agents/**` en `serverless/.claude/skills/**` wél getrackt worden.
Reason: De Arcana-subagents en -skills zijn onderdeel van de gevraagde deliverable (Fase 0), niet lokale editor-instellingen. `serverless/.claude/settings.local.json` blijft wel genegeerd.
Files affected: .gitignore (repo-root)
Risks: Toekomstige `.claude/`-bestanden in `serverless/` buiten `agents/`/`skills/` blijven genegeerd tenzij hier expliciet aan toegevoegd.
Follow-up: geen.

## 2026-07-11 — Rapportgenerator: score-gebaseerde teksten via TRAIT_CONTENT

Decision: Voor elke van de 30 subdimensies is een vast tekstblok vastgelegd (zichtbaar gedrag, verborgen behoefte, effect op anderen, valkuil, groeisleutel) in `arcana/src/data/arcanaTraitContent.ts`. De rapportgenerator selecteert per sectie een vaste top-N van subdimensies (op basis van scores) en compileert daarmee de rapporttekst.
Reason: AGENTS.md verbiedt Barnum-achtige, voor iedereen passende teksten en eist dat elke uitspraak herleidbaar is naar scores. Door tekst per subdimensie vast te leggen en alleen te selecteren op basis van de daadwerkelijke score, blijft de output deterministisch (zelfde antwoorden → zelfde rapport) en score-herleidbaar, zonder externe AI-API.
Files affected: arcana/src/data/arcanaTraitContent.ts, arcana/src/lib/arcanaReportGenerator.ts
Risks: Tekstvariatie is eindig (30 subdimensies × vaste formuleringen); bij zeer grote gebruikersaantallen kunnen twee mensen met vergelijkbare scores gedeeltelijk dezelfde zinnen zien. Dit is inherent aan een deterministisch, niet-AI-gegenereerd systeem en in lijn met de eis "geen externe AI-API".
Follow-up: rapportteksten verfijnen op basis van echte gebruikersfeedback (zie eindadvies).

## 2026-07-29 — resultaten.md: volledig naslagwerk met alle combinaties

Decision: `docs/arcana/resultaten.md` toegevoegd (~345.000 tekens): leeswijzer, Jungiaans kader, 30 subdimensies per scoreband en per levensdomein, 12 hoofddimensies, 6 stress-archetypes, 10 spanningsvelden, 12 archetype-portretten, alle 144 primair × secundair combinaties, en acht beschouwingen (liefde, haat, pijn, intuïtie, verdriet, tegenslagen, geluk, blijdschap).
Reason: De gebruiker vroeg om een uitputtend document met alle mogelijke combinaties en hun betekenis, per levensdomein, met Jung als denkkader.
Files affected: docs/arcana/resultaten.md
Risks: Het document is groot en zal bij wijziging van de scorelogica moeten meegroeien. De 144 combinaties zijn handgeschreven en niet automatisch afgeleid, dus ze kunnen op termijn afwijken van de archetypeformules.
Follow-up: bij elke wijziging aan `arcanaArchetypes.ts` of de scorebanden ook resultaten.md controleren.

## 2026-07-29 — Jung als denkkader, expliciet afgebakend

Decision: Jungs begrippen (persona, schaduw, projectie, complex, compensatie, enantiodromie, spanningspaar, transcendente functie, individuatie) worden gebruikt als interpretatiekader. In resultaten.md staat expliciet dat delen van Jungs werk niet empirisch toetsbaar zijn en dat wij hem als taal gebruiken, niet als bewijs. Zijn typologie wordt uitdrukkelijk NIET gereconstrueerd.
Reason: De gebruiker vroeg om Jung "in alles" toe te passen. AGENTS.md verbiedt tegelijk het kopiëren van MBTI/DISC/Insights (die van Jungs typologie zijn afgeleid) en verbiedt pseudo-spirituele claims. Deze afbakening dient beide eisen: de rijkdom van Jungs begrippen zonder de typologie of de esoterie.
Files affected: docs/arcana/resultaten.md, arcana/src/data/arcanaTraitContent.ts, arcana/src/data/arcanaArchetypeContent.ts, arcana/src/lib/arcanaReportGenerator.ts
Risks: Jung blijft omstreden; het rapport benoemt dat zelf, wat de autoriteit van de tekst bewust relativeert.
Follow-up: geen.

## 2026-07-29 — Personalisatie via intake-scherm en aanspreekvorm

Decision: Nieuw intake-scherm vraagt naam (verplicht voor de persoonlijke toon), aanspreekvorm (je/u) en optionele levensfase. Opgeslagen onder localStorage-sleutel `arcana_profile`. Alle bronteksten blijven in de je-vorm; wie "u" kiest krijgt ze via een grammaticale omzetting in `arcanaVoice.ts`.
Reason: De gebruiker vroeg dat iedereen na het invullen van hun gegevens een reactie op persoonlijke toon krijgt. Eén bronversie met omzetting voorkomt dat elke tekst dubbel onderhouden moet worden.
Files affected: arcana/src/components/ArcanaIntake.tsx, arcana/src/lib/arcanaVoice.ts, arcana/src/lib/arcanaStorage.ts, arcana/src/types/arcana.ts, arcana/src/App.tsx
Risks: De je→u-omzetting is heuristisch: "je" is zowel onderwerp ("je voelt") als bezittelijk ("je grens"). De beslissing valt op basis van een woordenlijst van vervoegde werkwoorden en bijwoorden. Bij nieuwe teksten met ongebruikelijke werkwoorden kan "uw" verschijnen waar "u" hoort. Afgedekt met unit-tests plus een test die het volledige rapport controleert op achtergebleven je/jij/jouw/jezelf.
Follow-up: bij het toevoegen van nieuwe rapportteksten de u-vorm-test laten meelopen; die faalt zichtbaar bij een gemiste werkwoordsvorm.

## 2026-07-29 — Eigen score gaat vóór het archetypeportret

Decision: Wanneer het algemene archetypeportret botst met een individuele score (bijvoorbeeld The Flame met een hoge behoefte aan stilte), voegt de rapportgenerator een expliciete nuancering toe die zegt dat de eigen score leidend is.
Reason: Zonder deze controle beweerde het rapport twee tegengestelde dingen in dezelfde sectie, wat regel 4 van AGENTS.md schendt: elke rapportuitspraak moet herleidbaar zijn naar scores.
Files affected: arcana/src/lib/arcanaReportGenerator.ts (functies `expectationFor` en `reconciliation`), arcana/src/test/arcanaReconciliation.test.ts
Risks: De verwachting wordt afgeleid uit de archetypeformule en een tabel van tegengestelde subdimensies; die tabel is handmatig en dekt niet elke denkbare spanning.
Follow-up: tabel `OPPOSITES` uitbreiden zodra er nieuwe tegenstellingen opvallen in echte rapporten.

## 2026-07-29 — Tekstvarianten via build-time generatie, niet via runtime-AI

Decision: de rapportteksten krijgen meerdere gelijkwaardige formuleringen per uitspraak, geschreven tijdens de bouw en opgeslagen als statische data. De app kiest er deterministisch één op basis van een hash over de antwoorden (`variantSeed` in `ArcanaScoreResult`). Er komt géén taalmodel in de runtime.
Reason: een meting op 300 willekeurige invullingen liet zien dat twee rapporten gemiddeld ~50% van hun regels deelden. De alternatieven waren (a) een taalmodel de teksten laten herschrijven bij het genereren, of (b) meer varianten vooraf schrijven. Optie (a) breekt drie regels uit AGENTS.md tegelijk — determinisme (regel 5/6), "geen externe AI-API" (regel 7), en het lokaal blijven van antwoorden (regel 8) — en introduceert het risico op uitspraken die niet uit een score volgen (regel 4). Optie (b) doet dat allemaal niet en kost alleen eenmalig schrijfwerk.
Files affected: arcana/src/lib/arcanaVariants.ts (nieuw), arcana/src/data/arcanaSectionPhrasings.ts (nieuw), arcana/src/data/arcanaTraitContent.ts, arcana/src/data/arcanaReflections.ts, arcana/src/lib/arcanaReportGenerator.ts, arcana/src/lib/arcanaScoringEngine.ts, arcana/src/types/arcana.ts
Risks: varianten moeten inhoudelijk gelijkwaardig zijn — een variant die iets anders beweert, breekt de herleidbaarheid naar de score. Dat is niet automatisch te toetsen; de tests bewaken alleen vorm (stijl, u-vorm, duplicaten, determinisme). Bij het toevoegen van nieuwe varianten is inhoudelijke review dus nodig.
Follow-up: `npm run overlap` draaien na elke uitbreiding om het effect te meten.

## 2026-08-20 — Fase A: rapportstructuur en leesbaarheid, gescheiden in twee sub-stappen

Decision: het rapport (voorheen 33 losse H3-secties zonder enige groepering) kreeg 6 H2-tussenkoppen, een "in het kort"-kaart, een "naar inhoudsopgave"-knop, een `data-kind`-indeling met randaccent per soort (insight/shadow/reflection/growth/summary), een `@page`-printregel, grotere bullettekst en begrensde regellengte. Uitgevoerd in twee strikt gescheiden sub-stappen: eerst arcana-feature-builder (alleen componentstructuur, TSX + nieuwe data-attributen als hook), daarna arcana-ux-designer (alleen CSS, gebruikmakend van die hooks). Ook de bug gefixt waarbij `ArcanaReport.tsx` `sections[0]` (de hero) zowel los in de banner als nogmaals als eerste kaart in de sectielijst toonde.
Reason: een eerdere klinisch/UX/business-analyse (zie het gekoppelde artifact, samengevat: gemiddelde subdimensiescore bij willekeurige invulling 67,4/100 i.p.v. 50, en ~50% letterlijke tekstherhaling binnen één rapport) identificeerde de platte, ongegroepeerde structuur en de dubbele hero-tekst als de grootste concrete leesbaarheidsproblemen, los van het scoremodel zelf. De twee-stappen-scheiding (structuur eerst, CSS daarna, op basis van een vooraf afgesproken `data-kind`-contract) voorkomt dat twee agents dezelfde bestanden tegelijk en conflicterend bewerken — een patroon dat in eerdere pijplijnruns al effectief bleek.
Files affected: arcana/src/components/ArcanaReport.tsx, ArcanaReportSection.tsx, ArcanaReportToc.tsx (gewijzigd); ArcanaReportGlance.tsx, ArcanaBackToTocButton.tsx, arcana/src/data/arcanaSectionGroups.ts (nieuw); arcana/src/styles/arcana.css (alleen toevoegingen/verplaatsingen, geen bestaande regel verwijderd behalve de randkleur die van `.arcana-report-section--reflection` naar de gedeelde `data-kind`-regel verhuisde).
Risks: de "naar inhoudsopgave"-knop leunt op `IntersectionObserver`, wat in de gebruikte preview-sandbox niet feitelijk vuurde (bevestigd als omgevingsbeperking, niet als codefout: een losse controle-observer op hetzelfde element vuurde in dezelfde sessie evenmin, ook niet initieel) — de implementatie is standaard en correct, maar is nog niet in een echte browser met een mens bevestigd. De `SECTION_GROUPS`- en `data-kind`-tabellen zijn handmatig samengesteld or moeten worden bijgewerkt als er ooit een 34e sectie bijkomt.
Follow-up: bij het toevoegen van een nieuwe rapportsectie ook `arcanaSectionGroups.ts` en de `SECTION_KIND`-lookup in `ArcanaReportSection.tsx` bijwerken — er is een vangnet (ongegroepeerde secties renderen alsnog, ongeclassificeerde secties krijgen geen randaccent) maar geen automatische koppeling. Een mens moet ooit nog handmatig bevestigen dat de "naar inhoudsopgave"-knop in een echte browser verschijnt bij scrollen.

## 2026-09-14 — Van losse test naar complete website "Arcana Profile"

Decision: het product heet nu Arcana Profile (was Arcana Mirror) en is uitgebreid van een enkele testflow naar een volledige website: marketinglandingspagina met negen secties, plakkende header met mobiel menu, voettekst, en losse pagina's voor privacy en voorwaarden. De testflow zelf (120 vragen, 12 archetypen, 33 rapporthoofdstukken, automatisch doorschakelen, PDF/print) is ongewijzigd overgenomen. Nieuwe map `arcana/src/site/` voor de sitelaag, nieuwe stylesheet `arcana/src/styles/site.css`.
Reason: de eigenaar leverde een build van zijn eigen site "Arcana Profile" aan met het verzoek die opzet te behouden maar de test te vervangen door deze. Bij inspectie bleek die site alleen een hero te bevatten: de navigatie verwees naar #over, #human-design, #voor-wie en #faq, maar die secties bestonden niet in de DOM (documenthoogte 1793px, enige element met een id was #root). De "overige pagina's" moesten dus alsnog gebouwd worden. Alles rond Human Design is niet overgenomen; dat zat alleen in die andere applicatie.
Files affected: arcana/src/site/** (nieuw: siteContent.ts, LandingPage.tsx, SiteHeader.tsx, SiteFooter.tsx, LegalPages.tsx, FunnelDiagram.tsx), arcana/src/styles/site.css (nieuw), arcana/src/App.tsx (landing als startscherm + hash-routing), arcana/index.html (SEO, JSON-LD incl. FAQPage, statische fallback voor crawlers), arcana/public/** (favicon met stermerk, robots.txt, sitemap.xml, site.webmanifest, og-image.jpg), arcana/src/components/ArcanaReport.tsx ("Terug naar de website"-knop). Verwijderd: arcana/src/components/ArcanaStart.tsx (vervangen door de landingspagina), arcana/public/icons.svg (ongebruikt restant).
Risks: de losse pagina's hangen aan een hash (#/privacy, #/voorwaarden) in plaats van aan een pad. Dat is bewust — de site wordt als statische map geüpload en /privacy zou zonder rewrite-regels een 404 geven — maar het is SEO-technisch zwakker dan echte paden. Zodra er serverconfiguratie beschikbaar is, kan dit omgezet worden. De cijfers in siteContent.ts (120 vragen, 30 eigenschappen, 12 dimensies, 33 hoofdstukken, ruim 5.500 woorden) zijn gemeten aan de echte data en moeten meebewegen als het vragenbestand of de rapportgenerator verandert.
Follow-up: de site is nu gratis en zonder betaalmuur. Voor daadwerkelijke monetisatie is een keuze nodig over betaalprovider en prijspunt; zonder backend is een eenmalige ontgrendeling via een externe verkooppagina (licentiecode) de haalbare route. Dat vraagt de accountgegevens van de eigenaar en is daarom niet ingebouwd.

## 2026-09-10 — Visueel ontwerp overgenomen van Arcana Profile (zonder Human Design)

Decision: het Kaartendeck-palet is vervangen door het ontwerp van de door de eigenaar aangeleverde site "Arcana Profile" (`public_html (3).zip`): warme parchment-wereld (#fbf8f3 / #292420 / amber #b66a08), Cormorant Garamond als displayletter en Inter als leesletter, vlakke redactionele vlakken met haarlijnen in plaats van kaartschaduwen, pil-vormige knoppen, en een gestapeld woordmerk "Arcana / Mirror" op 128px met letterspacing -0,055em. Er is bewust géén donker thema: `color-scheme: light` staat vast.
Reason: de eigenaar vroeg expliciet om dit ontwerp, met als enige uitzondering dat alles rond Human Design wegblijft. Dat laatste vroeg geen verwijderwerk: Human Design zit alleen in die andere applicatie, niet in Arcana Mirror. Overgenomen is uitsluitend de visuele taal; geen code, teksten, vragen, archetypes of het 64-vragenmodel van Arcana Profile. Het ontbreken van een donker thema is geen omissie maar een overname van hun keuze — hun stylesheet bevat nul `prefers-color-scheme`-regels.
Files affected: arcana/src/styles/arcana.css (herschreven), arcana/index.html (theme-color #FBF8F3, color-scheme light), arcana/src/components/ArcanaStart.tsx (woordmerk + sfeerband), arcana/src/fonts/** (14 woff2, nieuw), arcana/src/assets/valley.webp (nieuw).
Risks: de vijf clusterkleuren hergebruiken de bestaande tokennamen uit het Kaartendeck (`--teal`, `--plum`, `--ember`, `--growth`, `--profile`) maar met nieuwe waarden — de namen dekken de kleur dus niet meer semantisch, wat bij later onderhoud kan verwarren. Contrast dwong drie bewuste afwijkingen van de bronsite af: primaire knoppen gebruiken `--interaction-strong` (#7a4300, 7,98:1) in plaats van `--interaction` (#b66a08, 4,16:1 — onder AA); geselecteerde antwoordopties krijgen een lichte amber-wasem met inkttekst (13,25:1) in plaats van witte tekst op vol amber (3,70:1); en `--color-ink-faint` (#8b8177, 3,60:1) wordt nergens voor leestekst gebruikt.
Follow-up: fonts zijn Fontsource-builds van Cormorant Garamond en Inter, beide SIL Open Font License, dus vrij zelf te hosten. De custom letter "Amoera" uit de bronsite is bewust NIET overgenomen (TTF, herkomst/licentie onbekend, werd daar alleen voor het logokader gebruikt). De landschapsgravure is van 3,2MB PNG naar 219KB WebP gebracht (1600×651) via canvas-hercodering, omdat 3,2MB de mobiele eis uit AGENTS.md regel 13 zou schenden.

## 2026-08-21 — Kaartendeck-ontwerp, automatisch doorschakelen en PDF-export

Decision: het volledige nachtpaars/crème/goud-palet is vervangen door het "Kaartendeck"-ontwerp (licht standaard, volwaardig donker thema): witte/lichtgrijze vlakken, ember/teal/plum accenten, geometrische sans voor UI en Georgia voor leestekst, monospace met tabular-nums voor alle cijfers. Elke rapportsectie is een kaart met een afgeknipte hoek, een gekleurde linker accentbalk en een geometrisch merkteken; kaartsoort is herkenbaar aan kleur én vorm (insight=teal cirkel, shadow=plum driehoek-omlaag, reflection=ember ruit, growth=gemengd driehoek-omhoog, summary/profile=omlijnd vierkant). Daarnaast: de vragenflow schakelt automatisch door zonder "Volgende"-knop, en er is een "Download als PDF"-knop.
Reason: de eigenaar had eerder om een nieuw uiterlijk, automatisch doorschakelen en PDF-export gevraagd. Die drie punten zaten niet in het Fase A+B-plan dat daarna is uitgevoerd, waardoor er na een upload visueel en functioneel niets veranderd bleek. Uit vijf voorgelegde ontwerprichtingen koos de eigenaar expliciet Kaartendeck. Referentie-mockup: `tpl3.html` uit de ontwerpen-artifact.
Files affected: arcana/src/styles/arcana.css (herschreven), index.html (`color-scheme`-meta), arcana/src/components/ArcanaTest.tsx (auto-advance), ArcanaPdfButton.tsx (nieuw), ArcanaReport.tsx, ArcanaReportSection.tsx, ArcanaArchetypeCard.tsx, ArcanaReportGlance.tsx, ArcanaScoreWheel.tsx, ArcanaTensionCard.tsx, ArcanaLikertQuestion.tsx, ArcanaResultLoading.tsx.
Risks: rangschikvragen leggen bij het openen al een antwoord vast (de beginvolgorde) en zouden zichzelf overslaan bij naïef automatisch doorschakelen — daarom schakelen alleen likert/forcedChoice/scenario automatisch door en houden rangschikvragen een eigen knop. Bij het teruglopen naar een al beantwoorde vraag verschijnt alsnog een "Volgende"-knop, anders zit de deelnemer klem. "Download als PDF" opent het printvenster (bestemming: Opslaan als PDF) in plaats van een eigen PDF te genereren: een PDF-bibliotheek zou honderden kilobytes toevoegen aan een app die verder alleen react en react-dom gebruikt.
Follow-up: in `@media print` worden de tokens nu geforceerd naar het lichte palet. Zonder dat kreeg wie in donkere modus op "Download als PDF" klikte donkere kaartvlakken op papier, omdat `.arcana-card-clip` `background: var(--surface)` tekent én `print-color-adjust: exact` zet — die combinatie dwingt de browser die donkere vlakken juist wél af te drukken. Een echte print-preview kon in deze omgeving niet pixel-voor-pixel worden gecontroleerd; dat blijft een handmatige controle waard.

## 2026-09-23 — Rebuild taak 10 (presentatiedeel): navigatieregel, wisdialoog, knoplabels, versiecontrole

Decision: het presentatie-/robuustheidsdeel van `G` taak 10 dat na het tekstdeel nog openstond,
in één stap afgemaakt, zonder de rapportgenerator, de tekstdata of de gouden master aan te raken.
(1) **Navigatieregel met inhoud** (`C` §3.2 laag 3): een vaste tabel
(`src/data/arcanaSectionNavReasons.ts`) koppelt aan elk van de 32 hoofdstukken een halve-regel
reden vooruit en/of achteruit, gekeyed op section-id, gebaseerd op de vaste volgorde in
`arcanaSectionGroups.ts`. `ArcanaReportSection.tsx` toont die reden naast de bestaande "Kaart X/Y"
en de titel; ontbreekt de reden (eerste/laatste kaart, of een niet-ingedeelde vangnet-sectie), dan
blijft de kale titel-link zoals voorheen. (2) **Wisdialoog**: `ArcanaConfirmDialog.tsx` (nieuw,
herbruikbaar) vervangt beide `window.confirm`-aanroepen in `ArcanaReport.tsx`, met de letterlijke
teksten uit `C` §5 "Bevestigingen" — bewust **twee** knoppen (de opdracht voor deze taak vroeg
daar expliciet om), niet de drie uit de spec: de derde knop ("Eerst bewaren als PDF") is
weggelaten, de zin "Bewaar eerst wat je wilt houden" staat wel in de dialoogtekst. Focus gaat bij
openen naar de veilige (annuleer-)knop, een Tab-val houdt de focus in de dialoog, Escape annuleert,
en bij sluiten (ongeacht hoe) gaat de focus terug naar de knop die de dialoog opende — via een
`returnFocusRef`-prop, niet via `document.activeElement`, omdat een klik op een knop in Safari op
macOS die knop niet altijd focust. (3) **Knoplabels**: `Download als PDF` → `Bewaar als PDF` met de
instructie die eerder alleen in een onzichtbaar `title`-attribuut stond nu als zichtbare tekst
eronder; `Rapport printen` → `Printen op papier`; `Rapport downloaden` → `Downloaden als
tekstbestand (.md)`; masthead-eyebrow `Jouw archetype` → `Het patroon dat het sterkst naar voren
kwam`. De achttien archetypenamen zelf zijn niet vertaald — expliciet buiten deze opdracht, `C`
§4.11 rij 55 noemt dat een apart eigenaarsbesluit. (4) **Versiecontrole**: `arcanaReportCompat.ts`
vergelijkt alleen de hoofdversie van `meta.version` met wat de code kent (nu 2) — een hogere
minor/patch blijft dus altijd renderbaar (additief, zoals de rapportgenerator zelf al werkt), geen
harde 3.0.0-blokkade die oudere rapporten zou wissen. Bij een onbekende/hogere hoofdversie, of bij
een echte renderfout ongeacht de versie, toont `ArcanaReportGate.tsx` (nieuw, de lazy-chunk die nu
in `App.tsx` in de plaats van `ArcanaReport` komt) het uitlegscherm `ArcanaReportIncompatible.tsx`:
een downloadknop (probeert eerst de bestaande markdown-export, valt terug op de ruwe JSON als zelfs
die crasht) en "De test opnieuw doen". `ArcanaReportErrorBoundary.tsx` (class component — React
kent geen hook-equivalent voor foutgrenzen) vangt renderfouten op die de versiecheck niet aftoetst.
Reason: `window.confirm` maakt van een destructieve bevestiging het woord "OK" — een twintig jaar
oud, breed gedocumenteerd UX-antipatroon (`C` §5.6). Een kale "← Wie je bent / 14 / 33 / Je
valkuilen →"-navigatie werkt alleen voor wie lineair leest, terwijl het rapport zelf zegt dat dat
niet hoeft; een halve regel per richting maakt van een bladerwijzer een reden om door te klikken
(`C` §3.2). De PDF-instructie in een `title`-attribuut is onzichtbaar op elk touchscreen, dus voor
een fors deel van de doelgroep nooit gelezen. Zonder een versiecontrole zou een toekomstige
structuurwijziging in de rapportgenerator elk bestaand `arcana_result` in het veld stil laten
crashen naar een lege pagina — het zwaarste risico dat `G` taak 10 zelf benoemt.
Files affected: arcana/src/data/arcanaSectionNavReasons.ts (nieuw), arcana/src/lib/arcanaReportCompat.ts
(nieuw), arcana/src/components/ArcanaConfirmDialog.tsx (nieuw), ArcanaReportErrorBoundary.tsx
(nieuw), ArcanaReportIncompatible.tsx (nieuw), ArcanaReportGate.tsx (nieuw), ArcanaReportSection.tsx
(navigatieregel), ArcanaReport.tsx (dialogen, eyebrow, datumregel), ArcanaPdfButton.tsx,
ArcanaPrintButton.tsx, ArcanaExportButton.tsx (labels), App.tsx (`ArcanaReportGate` i.p.v.
`ArcanaReport` als lazy-chunk), arcana/src/styles/arcana.css (nieuwe selectors: `.arcana-dialog*`,
`.arcana-card-nav__link/__label/__detail`, `.arcana-pdf-button*` — geen bestaande selector
gewijzigd).
Risks:
- **De reden-tabel is handgeschreven per hoofdstukpaar, niet afgeleid uit scores.** Dat is bewust:
  de opdracht vroeg om "deterministisch, geen scores nodig" en de tabel telt niet mee in de gouden
  master. Wijzigt de indeling in `arcanaSectionGroups.ts` ooit (een sectie verhuist naar een andere
  plek in de volgorde), dan klopt de bijbehorende reden-tekst niet meer vanzelf — er is geen
  geautomatiseerde koppeling tussen de twee bestanden, alleen de gedeelde aanname dat de volgorde
  identiek is.
- **Twee knoppen in plaats van drie.** `C` §5.6 laat "Eerst bewaren als PDF" als eigen knop zien;
  hier is dat weggelaten op expliciete instructie. Wie de dialoog ziet en nog niets bewaarde, moet
  eerst annuleren en dan de PDF-knop in de masthead gebruiken — één stap meer dan de volledige
  spec.
- **Geen viewport-resize beschikbaar in het browserpaneel van deze sessie**: 1440/390/320 px kon
  niet apart gemeten worden (de echte layoutviewport bleek steeds 1280×720, bevestigd met
  `window.innerWidth`). Het contrastscript is op die breedte gedraaid, in licht én donker, met en
  zonder open dialoog: 0 fouten op 688–693 knopen. Mobielveiligheid van de nieuwe CSS is met
  broncode-review geverifieerd (dezelfde relatieve eenheden en `flex-wrap`-patronen als de rest van
  het bestand, één nieuwe `max-width: 480px`-regel voor de kaartnavigatie), niet met het oog op een
  echt smal scherm.
- **Screenshots op grote scrolldiepte (ruwweg > 2.000 px) gaven in deze sessie herhaaldelijk een
  leeg beeld**, ook na meerdere pogingen — bevestigd als omgevingsbeperking, niet als bug: op
  dezelfde scrollpositie gaf `getComputedStyle`/`elementFromPoint` wél de juiste, correct gekleurde
  content terug. Verificatie van diep-gescrolde content liep daarom via de DOM in plaats van via
  het oog.
Verificatie: typecheck 0, lint 0, 129 tests groen (0 gewijzigd), gouden master 0 gewijzigde
fixtures, build + domeincontrole + bundelbegroting geslaagd (landingbundel ongewijzigd: alle nieuwe
code zit in de lazy rapportchunk). In de browser: kaartnavigatie toont de juiste titel + reden per
richting (geverifieerd op de `core-pattern`-sectie); beide dialogen geopend met de exacte teksten
en knopnamen uit de spec; Tab/Shift+Tab houdt de focus binnen de dialoog en cirkelt tussen de twee
knoppen; Escape sluit en herstelt de focus zonder iets te wissen; Enter op de bevestigingsknop
voert de handeling toetsenbord-only uit; een rapport met een verzonnen `meta.version: "9.9.9"`
toont het uitlegscherm in plaats van te crashen; een rapport met een geldige versie maar een kapotte
`sections`-structuur wordt door `ArcanaReportErrorBoundary` opgevangen (bevestigd via de
console-log) in plaats van een blanco scherm te geven; de downloadknop op het uitlegscherm bouwt
een geldig `.txt`-bestand. Contrastscript: 0 fouten in licht (688 knopen) en donker (693 knopen,
inclusief open dialoog).
Follow-up: de terugkeerondersteuning uit `C` §3.4 A/B/C (welkom-terug-kaart, leesmarkering,
vergelijken na opnieuw invullen) en de leesinstructie bij de `profile`-kaarten staan nog open. Een
echte 320/390 px-controle met het oog vraagt een sessie met viewport-resize in het browserpaneel.

## 2026-09-23 — Rebuild taak 10 (tekst-deel): afsluiters per hoofdstuktype en de u-vorm-fix

Decision: alleen het tekstgedeelte van `G` taak 10 uitgevoerd — de andere onderdelen
(navigatieregel met inhoud, terugkeerondersteuning, knoppenherschikking, eigen wisdialoog) raken
`src/components/*` en horen bij een aparte stap. Wat wél is gedaan: (1) elk van de 33
hoofdstukken krijgt een afsluiter die bij zijn kaartsoort past (`C` §3.3): `insight` krijgt "Wat
je hiermee kunt" met de twee subdimensies waar het hoofdstuk op rust; de vijf hoofdstukken die
letterlijk over anderen gaan krijgen in plaats daarvan een vraag-het-na-variant zonder cijfers;
de vier zware hoofdstukken naast "Je valkuilen" krijgen een geruststelling zonder een vast aantal
te noemen; de vier groei-hoofdstukken krijgen "van de {n} punten is er één die vandaag al kan";
de acht beschouwingen krijgen een herkomstzin met de twee scores achter de gekozen duidingen, of
een eerlijke fallback-zin wanneer geen enkele regel matchte. (2) De valkuilenafsluiter zelf is
herschreven volgens het letterlijke sjabloon uit `C` (het bestaande `outro`-veld, geen tweede
kopie): "Wat je hiermee kunt" (neem er één), dan "Als dit niet klopt" met de al-verplaatste
`ifItDoesNotFit`-tekst, dan de vaste slotzin over "niet de plekken waar je faalt". (3) Twee
gemelde u-vorm-fouten hersteld ("tot je de logica" → "tot uw de logica", "sneller dan je zelf
zou wensen" → "sneller dan uw zelf") plus 24 andere zinnen met hetzelfde patroon, gevonden met
een volledige scan van alle "je"-zinnen in de zes tekstbestanden.
Reason: `C` §3.3 noemt de valkuilenafsluiter expliciet "de belangrijkste tekst in dit hele
document" en de andere vier afsluitertypes lossen hetzelfde probleem op voor de rest van het
rapport — een lezer die klaar is met een hoofdstuk krijgt nu een concreet antwoord op "wat doe ik
hiermee" in plaats van niets. De u-vorm-fout was al twee keer met naam genoemd in taak 4's
changelog als bekend, nog niet gerepareerd probleem.
Files affected: arcana/src/lib/arcanaReportGenerator.ts (afsluiterlogica, `Sc()`-helper met salt,
`matchingRules`/`reflectionCloser`, `REPORT_VERSION` → 2.2.0), arcana/src/data/arcanaSectionPhrasings.ts
(11 nieuwe `closer.*`-sleutels, `shadow.neem-die-ene` uitgebreid), arcana/src/data/arcanaReportBlocks.ts
(`SHADOW_NOT_FAILURE_NOTE`, `GROWTH_MEANING_NOTE`, vaste teksten zonder varianten omdat de precieze
woorden hier telden), arcana/src/data/arcanaTraitContent.ts, arcanaArchetypeContent.ts,
arcanaReflections.ts (u-vorm-fixes), en de twaalf bestanden onder arcana/src/test/golden/
(bewust bijgewerkt in dezelfde commit).
Risks:
- **Variant-botsing binnen één rapport, niet tussen rapporten.** De eerste versie liet alle ~14
  insight-afsluiters in één rapport letterlijk dezelfde formulering kiezen, omdat `S()` overal
  dezelfde `pick`-sleutel gebruikte. Verholpen met een sectie-id als salt (`Sc()`, dezelfde truc
  als `T()`'s `salt`-parameter). Met maar 2–3 varianten per sjabloon blijft een toevallige
  herhaling tussen twee hoofdstukken in hetzelfde rapport mogelijk (waargenomen in de
  steekproef); een vierde/vijfde variant per sjabloon zou dat verder verkleinen maar is niet
  gedaan (zelfde afweging als de 2026-08-20-beslissing: meer varianten per veld is een apart
  besluit).
- **`npm run overlap` bleef bewust ongewijzigd (28,8% → 28,8%).** De afsluiters staan in het
  `outro`-veld; die meting kijkt alleen naar `intro`/`paragraphs`/`bullets`. Dat is geen gat in de
  afsluiters zelf, wel een gat in wat die meting ziet — vastgelegd hier zodat het niet als
  toeval wordt gelezen.
- **Twee omzetter-bugs ontdekt die niet met brontekst alleen op te lossen zijn**, en dus niet
  gerepareerd: `conjugateForInversion('put')` levert `"putt"` op (dubbele stam-t bij een stam die
  al op -t eindigt) en `'plaats'` ontbreekt in `INVERSION_STEMS`. Beide sneden geraakt: de ene zin
  is herschreven met een ander werkwoord, de andere met een andere zinsbouw. Een volledige
  oplossing hoort in `arcanaVoice.ts`, dat buiten dit schrijfdomein valt.
- **Geen browsertool beschikbaar in deze sessie.** Geverifieerd via de gegenereerde
  markdown-export (`buildArcanaExportText`, dezelfde tekst die de bestaande, ongewijzigde
  `ArcanaReportSection.tsx` als platte alinea's rendert) en broncode-inspectie van die
  renderfunctie, niet met een screenshot of een Playwright-contrastmeting.
Verificatie: typecheck 0, lint 0, 129 tests (harde helft ongewijzigd; u-corpus- en
grammaticatest — die alle "je"-zinnen in de broncode omzetten en controleren — bleven groen op
de nieuwe teksten zonder aanpassing, dus ook zij zijn getest). Gouden master: 12 fixtures bewust
bijgewerkt (+810/−90 regels), diff regel voor regel gelezen; gemiddeld +1.356 woorden per rapport
(~+22%), verklaard door 31 nieuwe alinea's. Build + domeincontrole + bundelbegroting geslaagd.
Follow-up: de navigatieregel met inhoud (`C` §3.2 laag 3), de terugkeerondersteuning (`C` §3.4),
de leesinstructie bij de `profile`-kaarten en de knoppenherschikking/wisdialoog uit `G` taak 10
staan nog open — allemaal presentatielaag, niet tekst. Contrastmeting en visuele controle op het
rapport staan ook nog open, voor een sessie met browsertoegang.

## 2026-09-23 — Rebuild taak 9: de vragenflow

Decision: vijf ingrepen uit `C` §4.7–§4.9 en `A` §3.9, geen van alle raakt de opslag of de
engine. (1) Naamformulier: eyebrow, kop-body, veldhint en aanspreekvorm-toelichting letterlijk
uit `C` §4.7, plus een nieuwe tekstknop `Liever zonder naam →` die de test met een leeg
naamveld start — de engine had de naamloze aanspreekvariant al, alleen de knop ontbrak. (2)
Blokaanduiding van "Deel 1 van 4" naar `Stellingen · {n} van 72` (en de drie varianten voor
forcedChoice/scenario/ranking), berekend uit de werkelijke bloklengtes (72/24/16/8) in plaats van
vier gelijke kwarten voor te wenden. (3) Voortgangslabel krijgt de resttijd
(`arcana_started_at` × tempo tot nu toe), pas zichtbaar vanaf drie antwoorden. (4) Pauzeren- en
laatste-knop uit `C` §4.8 rij 45–46. (5) De focuskader-bug uit `A` §3.9 gefixt: de vraagkop is nu
het vaste focusdoel bij elke vraagwissel, in plaats van dat de browserfocus op de oude
knoppositie bleef hangen. (6) Het laadscherm rekent nu meteen door (geen harde 6s-timeout meer)
met een ondergrens van 1,2s en optie B uit `C` §4.9 (vier regels met echte getallen).
Reason: 120 vragen is lang; `A` §3.4/§3.5 noemden de intake-drempel en de wachttijd na de laatste
vraag als concrete afhaakpunten, en `A` §3.9 de focusbug als "verwarrend, en mogelijk sturend".
Files affected: src/components/ArcanaIntake.tsx, ArcanaTest.tsx, ArcanaProgress.tsx,
ArcanaResultLoading.tsx (herschreven), src/App.tsx (`generateReport` geeft een boolean terug in
plaats van zelf het scherm te wisselen; `handleLoadingDone` doet nu alleen de schermwissel),
src/styles/arcana.css (focusring op de vraagkop, verkorte pauzeknop onder 420px).
Risks:
- **`App.tsx` is aangeraakt buiten de oorspronkelijk opgegeven schrijfmap.** Dat was nodig om het
  rekenen (compute) los te koppelen van de schermwissel (reveal): zonder die knip zou
  `generateReport` bij een razendsnelle berekening het laadscherm binnen enkele tientallen
  milliseconden laten flitsen, wat de ondergrens van 1,2s zinloos maakt. De bestaande
  `loadingDoneRef`-bescherming en het `engine-unavailable`-pad zijn functioneel ongewijzigd
  overgenomen, alleen verschoven van "start het rekenen" naar "wissel het scherm".
- **De focusfix kiest de vraagkop, niet de eerste radio-optie.** Beide lezingen van de
  acceptatiecriteria ("de focus op de nieuwe vraag/eerste optie") zijn geldig; de kop is gekozen
  omdat het één herstelpunt in de gezamenlijke ouder is (werkt voor alle vier vraagtypes,
  inclusief rangschikking, die geen radiogroup is) in plaats van vier losse ingrepen per
  vraagcomponent, en omdat hij de nieuwe vraagtekst direct aan een schermlezer aankondigt.
- **De `engine-unavailable`-foutpad is niet opnieuw met een echte kapotte chunk in de browser
  getest** — de gecachete dev-chunk laat zich niet makkelijk laten falen. De catch-structuur in
  `generateReport` is ongewijzigd (geeft nu `false` terug in plaats van zelf `setScreen` aan te
  roepen); typecheck en de bestaande tests geven er vertrouwen in, geen browserbewijs.
- **Geen scherm-lezer beschikbaar in deze omgeving** om VoiceOver letterlijk te testen; de
  focusfix is geverifieerd via `document.activeElement`, ARIA-rollen/labels en een volledige
  toetsenbordronde (landing → intake → 5 vragen).
Verificatie: typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigde fixtures (fixture
`naamloos` dekt de nieuwe knop, want die geeft hetzelfde profiel als nu al met een leeg
naamveld). Build + domeincontrole + begroting geslaagd. Contrastscript uit `A` §5 op het
vragenscherm: 0 fouten op 1440/390/320px, licht én donker (6 metingen, 16–17 knopen per meting).
In de browser: "Liever zonder naam" start de test met een leeg naamveld; blokaanduiding toont de
juiste tekst per blok (getest bij de eerste vraag van elk van de vier blokken); resttijd
verschijnt vanaf het derde antwoord en verdwijnt op de laatste vraag; met het toetsenbord
(Tab/pijltjestoetsen) landt de focus na elke automatische doorschakeling op de nieuwe vraagkop en
géén Likert-optie toont `is-selected`; rangschikking blijft met de bestaande ↑/↓-knoppen werken;
het laadscherm doorloopt de vier regels en toont het rapport na ongeveer 2 seconden in plaats van
6+.
Follow-up: het tussenscherm "Zestig gehad, zestig te gaan" (`C` §5.3) staat niet in taak 9 en is
niet gebouwd. Een echte VoiceOver-test en een browsertest van het foutpad met een echt kapotte
chunk blijven open voor een omgeving waarin dat kan.

## 2026-09-23 — Naregel: de privacy-disclaimer in de u-vorm (QA-bevinding B1)

Decision: `PRIVACY_TEXT` wordt nu op alle drie de renderplekken (intake, rapportvoettekst, markdown-export) door `applyVoice(text, addressForm)` gehaald, en de bronzin is herformuleerd zodat de je→u-omzetter hem grammaticaal correct maakt. `REPORT_VERSION` → 2.3.0; alle 12 gouden fixtures bewust bijgewerkt (uitsluitend de privacy-regel).
Reason: de eindcontrole vond dat de enige disclaimer met je/uw-voornaamwoorden rauw werd getoond — wie "u" koos zag de je-vorm op de intake, onderaan het rapport en in de export. Op een product dat op narekenbaarheid en eerlijkheid verkoopt is een disclaimer in de verkeerde aanspreekvorm een geloofwaardigheidsprobleem. De gouden master was er blind voor (determinisme, geen grammatica; de fout stond al bevroren).
Files affected: src/data/arcanaReportBlocks.ts (PRIVACY_TEXT herformuleerd), src/components/ArcanaIntake.tsx + ArcanaReport.tsx + src/lib/arcanaExport.ts (applyVoice), src/lib/arcanaReportGenerator.ts (versie), 12 gouden fixtures + HASHES.
Risks:
- De omzetter (`arcanaVoice.ts`) blijft fragiel: hij zet aangrenzende "je je" verkeerd om ("uw u") en maakt van een subject-"je" die niet direct door zijn werkwoord wordt gevolgd ten onrechte "uw". De fix omzeilt dat door de bronzin alleen possessieve "je" vóór een zelfstandig naamwoord te laten gebruiken; de omzetter zelf is niet aangepast (dat zou alle u-fixtures onvoorspelbaar raken). Als iemand later een subject-"je" of "je je" in een gedeelde tekstconstante zet, kan dezelfde klasse fout terugkomen — een corpus-test die de daadwerkelijke productie-render toetst (niet alleen `toFormal` in isolatie) zou dit vangen; genoteerd als vervolgstap.
- De je-vorm van de disclaimer is licht ingekort ("Verwijder je je browserdata of klik je op …" → "Wis ze via 'Antwoorden wissen', of door je browsergegevens te verwijderen"); dezelfde betekenis, en nu in beide aanspreekvormen correct.
Verificatie: intake in de browser — bij het kiezen van "U" flipt de fineprint live naar de correcte u-vorm, 0 resterende "je"; alle drie de u-fixtures 0 je-vormen; harde helft onaangeraakt (129 tests groen); typecheck 0, lint 0, build + domeincontrole + JSON-LD + begroting geslaagd.
Follow-up: een productie-render-corpus-test voor de aanspreekvorm; de bredere omzetter-fragiliteit (`arcanaVoice.ts`) blijft een bekend aandachtspunt.

## 2026-09-23 — Taak 13: opruimen en hermeten

Decision: het dode canvas-portret (`ArcanaPortraitCanvas.tsx`) en de `?vergelijk`-vlag zijn verwijderd (de SVG-versie staat sinds taak 6), samen met de dode `.arcana-portrait__canvas`-CSS, de cruft-patch `arcana-rebuild.patch` (472 KB), en het canvas uit de optionele-chunk-filter van `meet-bundel.mjs`. De metrieken uit A §1 zijn opnieuw gemeten en vastgelegd in `docs/nulmeting.json` naast de nulsituatie.
Reason: G taak 13 — het canvas, de functievlaggen en de dode CSS mochten pas weg nadat alles eronder aantoonbaar werkte; dat is nu zo (taak 1-12 groen).
Files affected: src/components/ArcanaPortraitCanvas.tsx (verwijderd), src/components/ArcanaReport.tsx (lazy import + vergelijk-vlag + vergelijkblok weg, Suspense/lazy-import weg), src/styles/arcana.css (dode canvas-CSS weg), scripts/meet-bundel.mjs (canvas uit isOptional), arcana-rebuild.patch (verwijderd), docs/nulmeting.json (nieuw).
Risks:
- Twee doelen zijn niet gehaald en staan eerlijk in de hermeting: (1) de paginahoogte van de landing (≥ 7.638 px tegen doel ≤ 6.000) — de spec vraagt meer inhoud dan in 6.000 px past; inkorten is een eigenaarsbeslissing. (2) TTFB / DOM interactive / PageSpeed — die vereisen een draaiende, gehoste site en zijn eigenaarsstappen.
- De token-aliassen en een volledige dode-CSS-dekkingssweep zijn bewust niet aangepakt: een DevTools-coverage-run is in deze omgeving niet betrouwbaar te draaien, en tokens/CSS blind verwijderen is een regressierisico voor weinig winst. Genoteerd als vervolgstap.
- De `console.error` in de error-boundary blijft (legitiem foutlogboek).
Verificatie: typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, build + domeincontrole (19 bestanden) + JSON-LD + begroting geslaagd; landingbundel 66,4 KB q11, CSS 11,9 KB, fonts 53,5 KB — alle onder de begroting; a11y-regels prefers-color-scheme 5, prefers-reduced-motion 8, skip-link aanwezig.
Follow-up: dode-CSS/token-sweep met DevTools-coverage; de paginahoogte en de live-metingen (TTFB/PageSpeed) door de eigenaar.

## 2026-09-23 — Taak 12: het voorbeeldrapport als tweede, crawlbare URL

Decision: er is een tweede indexeerbare pagina bijgekomen, `/voorbeeld/`, met een volledig voorbeeldrapport (33 hoofdstukken, ~7.500 woorden). Hij wordt bij de build gegenereerd (`scripts/genereer-voorbeeldpagina.mjs`, draait na `vite build`) uit een bestaande gouden fixture (`balanced-je.md`) — geen engine-run in de build, en de tekst is per definitie identiek aan wat een echte deelnemer krijgt. De markdown wordt naar semantische HTML omgezet, het score-overzicht toont leesbare dimensienamen in plaats van interne id's, en de pagina linkt de gebouwde stylesheet (tokens, licht én donker) plus een klein inline stijlblok. Bovenaan én onderaan staat expliciet dat het een voorbeeld is. De landing kreeg de sectie "Kijk het zelf na" (E §5.9) met drie controleerbare dingen; hero, die sectie en de slot-CTA linken alle drie naar `/voorbeeld/`. De sitemap noemt nu twee URL's.
Reason: E §5.9/§7.1 noemt dit het onderdeel dat drie problemen tegelijk oplost (het bewijsgat, de ontbrekende derde weg voor wie geen 25 minuten heeft, en het grootste SEO-gat). G taak 12 eist "indexeerbaar zonder JavaScript: curl levert de volledige tekst" — daarom een echt statisch bestand, geen SPA-route.
Files affected: scripts/genereer-voorbeeldpagina.mjs (nieuw), scripts/generate-seo-files.mjs (sitemap /voorbeeld/), package.json (build-hook), src/site/siteContent.ts (KIJK_NA, VOORBEELD_URL/LINK), src/site/LandingPage.tsx (sectie + links), src/styles/site.css (sectie- en linkstijlen).
Risks:
- De keuze voor een statisch bestand i.p.v. een SPA-route betekent dat `/voorbeeld/` op de dev-server (5173, serveert src) niet bestaat; alleen in de gebouwde bundel (op de preview-server 4173 en in productie). Dat is bewust — het is de enige manier om een crawler de volledige tekst zonder JS te geven.
- De bron is de fixture `balanced-je` (naam "Noor"). Verandert de rapporttekst, dan verandert de voorbeeldpagina mee bij de volgende build. Dat is gewenst (altijd in sync), maar betekent dat "Noor" op een publieke pagina staat — een verzonnen voorbeeldnaam, expliciet als voorbeeld gemarkeerd.
- De omzetter dekt precies de markdown die de export produceert (koppen, bullets, alinea's, `---`); geen tabellen of vet, want die staan niet in de export. Komt daar ooit iets bij, dan moet de omzetter mee.
Verificatie: build geslaagd, voorbeeldpagina 7.487 woorden gegenereerd; in de preview-browser: titel/banner/35 hoofdstukken/7.461 zichtbare woorden, terug-naar-test-knoppen, CSS geladen, contrast 0 fouten in licht én donker (273 knopen); landing-sectie aanwezig met kop "Je hoeft ons niets te geloven", 3 blokken, voorbeeld-CTA en twee voorbeeld-links (hero + slot) naar /voorbeeld/; sitemap 2 URL's; domeincontrole 20 bestanden geslaagd; typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, begroting gehaald (landing 66,4 KB).
Follow-up: Search Console beide URL's laten ontdekken (owner-stap, live site nodig); `arcana-rebuild.patch` opruimen in taak 13.

## 2026-09-23 — Taak 11: SEO, JSON-LD-graaf en één domeinbron

Decision: de JSON-LD is uitgebreid tot een samenhangende graaf (Organization + publisher-refs, audience/about/dateModified op WebApplication, FAQPage van 5 naar 9 zichtbare vragen), het woordental in alle meta/#root op 5.700 gezet, en het domein teruggebracht tot één bron (`.env.production` → `VITE_SITE_URL`) waaruit `robots.txt` en `sitemap.xml` worden gegenereerd. Twee nieuwe buildscripts: `generate-seo-files.mjs` (genereert de SEO-bestanden vóór de bundel) en `controleer-jsonld.mjs` (valideert de JSON-LD in de gebouwde bundel, exit 1 bij een fout of een vreemde host). Beide in `npm run build` gehaakt, met `check-domains.mjs` ertussen.
Reason: E §3.5 (één domeinbron), §7.2 (title/description), §7.4 (de graaf en de FAQ-uitbreiding); A §7 (de negen eindcontrole-vinkjes). De JSON-LD bleef bewust in `index.html` staan (statisch nodig vóór hydratie); het genereren beperkt zich tot robots/sitemap zodat de bewezen statische HTML-structuur niet onnodig wordt aangeraakt.
Files affected: index.html (meta + JSON-LD), .env.production (nieuw), scripts/generate-seo-files.mjs (nieuw), scripts/controleer-jsonld.mjs (nieuw), package.json (build-hook), public/robots.txt + public/sitemap.xml (voortaan gegenereerd, met lastmod), docs/eindcontrole.md (nieuw).
Risks:
- "speaktoart = 0 in de hele repo" is letterlijk niet haalbaar: het woord staat nog 87× in de brondocumenten (die de domeinmigratie beschrijven — Z analyseert speaktoart.com expliciet) en 1× in de `VERBODEN`-lijst van check-domains (het mechanisme dat het juist weert). De verzendbare uitvoer (dist/src/index.html/public/config) is 0. Documentatie en de bewaking scrubben zou schade zijn, geen verbetering.
- De FAQ-antwoorden in de markup zijn getrouwe, iets ingekorte versies van de zichtbare antwoorden; de vragen zijn letterlijk gelijk. Google's eis (markup = zichtbaar) blijft gehaald zolang de zichtbare FAQ niet inkort onder wat in de markup staat.
- Rich Results / Schema Validator niet gedraaid (geen internet in deze sessie) — owner-stap.
Verificatie: build met de nieuwe stappen geslaagd; controleer-jsonld meldt 4 entiteiten, 9 FAQ-vragen, alle URL's op arcanaprofile.com; domeincontrole faalt bewezen op een vreemde host (exit 1) en slaagt na herstel; title 59 / desc 159 tekens; 9 `"Question"` in dist; "5.500" 0× in dist; typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd.
Follow-up: `arcana-rebuild.patch` verwijderen in taak 13; de 18-contrastmatrix en de netwerktrace in de eindcontrole-agent; Rich Results Test handmatig door de eigenaar.

## 2026-09-23 — Rebuild taak 4: herleesstructuur van het rapport

Decision: vier ingrepen uit `C` §3, en de gouden master is er bewust voor bijgewerkt in dezelfde commit. (1) De samenvatting staat direct onder de masthead, vóór het portret, met een eigen anker (`#samenvatting`), zonder één verwijzing naar iets erboven, met de betrouwbaarheidszin in dezelfde kaart en drie knoppen die geen van drieën iets vernietigen; "Opnieuw beginnen" en "Antwoorden wissen" staan nu in de voettekst van het rapport. (2) De per-archetype troosttekst `ifItDoesNotFit` is verhuisd van hoofdstuk 33 naar direct onder de valkuilenlijst, met de regel "Eén van deze vijf herken je waarschijnlijk meteen … Neem die ene." ervoor; daarvoor is een optioneel veld `outro` op `ArcanaReportSection` gekomen (tekst ná de opsomming), dat de export en de weergave kennen en dat oudere opgeslagen rapporten gewoon missen. (3) Het hoofdstuk `understood-by-others` heet nu "Wat ik je zou willen uitleggen" (het "moeten" is weg), krijgt een herkomstalinea met de twee scores, en is als losse pagina te openen op `#/delen`: eigen aanhef aan de ontvanger, "Wat mensen aan mij missen", "Waar dit vandaan komt", "Wat dit niet is", en drie handelingen (PDF van één pagina, kopiëren als tekst, printen). (4) De overgangszinnen zijn omgedraaid: de vier terugkijkende banken ("zoals hierboven al genoemd") dragen nu het cijfer en het hoofdstuk ("Directheid (85/100 — hetzelfde cijfer als bij wie je bent; hier telt het als sterk punt)"), en er zijn twee vooruitwijzende banken bij (wie je bent → onder druk/valkuilen; sterke punten → valkuilen). Daarbovenop de zes deelopeningen uit `C` §3.2 laag 1 als vaste tekst in `arcanaSectionGroups.ts`, en de betrouwbaarheidszin "Dit rapport staat stevig" vervangen door "Dat betekent dat de scores hieronder stabiel zijn — niet dat ze waar zijn" (`C` §6.5), op één plek gedefinieerd. `REPORT_VERSION` 2.0.0 → 2.1.0.
Reason: het rapport was een eenmalige lezing van 6.000 woorden zonder zelfstandige samenvatting (`C` §3.1); wie bij hoofdstuk 14 las dat zijn belangrijkste eigenschap een vluchtroute is, kreeg de nuance negentien hoofdstukken later of nooit (`C` §6.7 — "de belangrijkste aanbeveling in dit hele document"); het deelbare hoofdstuk was niet te lichten en sprak de verkeerde persoon aan (`C` §3.5); achteruit verwijzen las als excuses voor herhaling en werkte alleen voor wie lineair leest (`C` §3.2).
Files affected: src/types/arcana.ts (`outro?`), src/lib/arcanaReportGenerator.ts (sectiehelper, wie-je-bent, onder-druk, op-je-gemak, sterke punten, valkuilen, understood-by-others, understand-yourself, voice op outro, versie), src/data/arcanaSectionPhrasings.ts (twee banken herschreven, drie nieuw), src/data/arcanaSectionGroups.ts (`lead`), src/data/arcanaReportBlocks.ts (`CONFIDENCE_TEXT`), src/lib/arcanaExport.ts (outro in de export, `buildSharePageText`, `formatReportDate`), src/components/ArcanaReport.tsx (volgorde, knoppen, deelopeningen, deelactie), ArcanaReportGlance.tsx (de samenvatting), ArcanaReportSection.tsx (outro, `action`), ArcanaSharePage.tsx (nieuw), ArcanaMethod.tsx, src/App.tsx (route `#/delen`), src/styles/arcana.css, scripts/meet-bundel.mjs (deelpagina telt in geen scenario), src/test/golden/* (12 fixtures + HASHES, bewust bijgewerkt).
Risks:
- **De gouden master is veranderd, in alle twaalf fixtures.** De diff is regel voor regel gelezen: per fixture één vooruitzin bij wie je bent, het cijfer in de drie terugverwijzingen bij de sterke punten en in de sterkte=valkuil-bullets, de score in de drijfveerzin onder druk en in de drie labels bij op je gemak, één vooruitzin bij de sterke punten, twee alinea's onder de valkuilenlijst (verhuisd uit hoofdstuk 33), en de nieuwe titel, intro, twee bullets en herkomstalinea van het deelbare hoofdstuk. Niets anders. De determinismetest zelf (dezelfde antwoorden → dezelfde bytes) is onaangeraakt.
- **De harde helft** (scores, archetypen, spanningsvelden in de fixturekop) is byte voor byte gelijk gebleven — de wijziging raakt alleen tekst.
- **Eén formulering uit `C` is aangepast**: "Van buiten zie je vooral {behavior}" werkt niet omdat `behavior` in hoofdzinsvolgorde staat ("je voelt emoties … aan"); het is "Van buiten zie je vooral het gedrag — {behavior}. Wat daaronder zit is {hiddenNeed} — …" geworden. Dat viel op in de u-fixture ("Van buiten ziet u vooral u voelt …") en is vóór het vastleggen gecorrigeerd.
- **Bevinding, niet gefixt:** de u-vorm heeft twee bestaande fouten in de traitteksten die al in de oude fixtures stonden ("sneller dan uw zelf zou wensen", "tot uw de logica … helder hebt"): "je zelf" → "uw zelf" en "tot je de" → "tot uw de". Dat is de omzetter (`arcanaVoice.ts`), niet deze taak; staat open.
- **Oudere opgeslagen rapporten (2.0.0)** renderen ongewijzigd: `outro` ontbreekt gewoon, de titel van het deelbare hoofdstuk blijft de oude, en de deelpagina toont dan geen herkomstblok. Geen migratie, geen uitlegscherm; de sectiestructuur (id's, aantal) is niet veranderd, dus `G` taak 10's versiecontrole is hier niet nodig.
- **De deelpagina staat in de je-vorm naar de ontvanger**, terwijl de hoofdstuktekst de aanspreekvorm van de invuller volgt (u-profiel → "Van buiten ziet u vooral…"). Dat is consequent met het rapport, maar op de deelpagina leest een u-invuller dus een pagina die de ontvanger tutoyeert en de hoofdstuktekst vousvoyeert. Geen naam → "iemand die dichtbij staat" / "diegene"; geen voornaamwoorden aangenomen.
- **Niet gedaan uit `C` §3**: de navigatieregel met inhoud onderaan elk hoofdstuk (laag 3), de afsluiters per hoofdstuktype (§3.3), de terugkeerondersteuning (§3.4), de eigen wisdialoog in plaats van `window.confirm` (`G` taak 10). De rapportpagina is 23.021 px hoog; er is geen nulmeting van vóór deze taak om "gelijk of lager" tegen af te zetten, en er kwam tekst bij (zes deelopeningen, de troost onder de valkuilen, de voettekst van de samenvatting).
Verificatie: gouden master bewust bijgewerkt (12 fixtures, +257/−161 regels), diff gelezen; 129 tests groen (grammatica, u-corpus, reconciliatie, randgevallen ongewijzigd), typecheck 0, lint 0, build + domeincontrole + begroting geslaagd (rapportchunk 8,9 KB q11, deelpagina 1,5 KB als losse chunk). In de browser: volgorde masthead → samenvatting → portret → archetypekaart → verantwoording → verdieping; samenvatting met 5 kaarten, geen verwijzing omhoog, betrouwbaarheidszin en 3 knoppen; masthead 3 niet-destructieve knoppen, voettekst 3; 6 deelopeningen; 2 alinea's onder de valkuilenlijst; "Deze pagina delen" bij het hoofdstuk; `#/delen` toont de pagina met aanhef, 5 bullets, herkomst met twee scores, eigen disclaimer en datum; "Terug naar je rapport" komt terug in het rapport. Contrast: rapport 0 fouten op 566 knopen, deelpagina 0 op 23 — licht en donker.
Follow-up: `arcanaVoice.ts` — "je zelf"/"tot je de" in de u-vorm; laag 3 en §3.3/§3.4 uit `C` bij taak 10; de wisdialoog; een nulmeting van de rapporthoogte vóór verdere tekstuitbreiding.

## 2026-09-23 — Rebuild taak 3: landingspagina en hero herbouwd (herovariant A)

Decision: de landingspagina is herbouwd op de copy uit `E` §5 met herovariant A (de keuze van de eigenaar, beslispunt 2) en het ritme uit `B` §4. De h1 is de propositie ("De meeste mensen kennen hun patroon. Bijna niemand kan het benoemen."), de merknaam staat klein erboven. Het blok *Drie dingen die je hier wél kunt controleren* staat direct onder de hero, vóór de gravure en de cijfers. Elke sectie heeft een eigen vlak (tokens `--bg`, `--bg-veil`, `--bg-deep`, `--bg-band`, `--bg-ink`) over de volle breedte met de inhoud in een kolom van 1180 px; de statbalk en *Eerlijk gezegd* zijn de twee donkere blokken. De zes voordelen staan asymmetrisch (twee brede kaarten, dan vier), alleen de kaart met de hoofdclaim draagt de gouden bovenrand. De twaalf dimensies staan in de vier kleurfamilies van het portret, elk met zijn dimensiekleur als linkerlijn en het familiesymbool, zonder hovereffect. *Wat je krijgt* toont een statisch voorbeeldportret (`src/site/PortraitSample.tsx`, dezelfde geometrie en CSS-klassen als het echte portret, twee vaste tekeningen waar CSS er één van kiest) naast één lijst; de zes kaarten en zes bullets zijn samengevoegd. Negen FAQ-vragen, de eerste open. Skip-link naar `<main id="inhoud">`. De SEO-titel is op de h1/eyebrow van variant A afgestemd: `Persoonlijkheidstest die je kunt narekenen | Arcana Profile` (59 tekens), de beschrijving is de 156-tekensvariant uit `E` §7.2; `og:title` en `twitter:title` volgen de titel.
Reason: `C` §1 stelde vast dat het woord *narekenbaar* pas op 2.100 px stond en dat wie na de hero wegklikte de propositie nooit had gezien; `A` §3.2 dat elf secties één vlak en één ritme hadden en het sterkste beeld van het product (het portret) achter 25 minuten vragen zat.
Files affected: arcana/src/site/siteContent.ts (HERO variant A, `CONTROLEER`, statbalk `5.700+` / `met de cijfers erbij`, VOORDELEN 1/2/4/6, HOE_HET_WERKT 1/3/4, `DIMENSIE_TEKST` per dimensie-id, `RAPPORT` met lead en bijschrift, `PORTRET_VOORBEELD`, FAQ 1/5/8 en de negende vraag, SLOT_CTA-tekst), src/site/LandingPage.tsx (herbouwd), src/site/PortraitSample.tsx (nieuw), src/styles/site.css (landingblok herschreven: vlakken, hero, controleerblok, families, rapportsectie, skip-link; trechterband 2 donkerder op nacht), src/App.tsx (skip-link, `id="inhoud"`), index.html (titel, beschrijving, og/twitter-titel).
Risks:
- **De paginahoogte is 7.638 px op 1440 px, niet ≤ 6.000** (`G` taak 8, nulmeting 7.083). De besparingen uit `B` §4 zijn gedaan (families in plaats van twaalf kaarten, één lijst naast het beeld, asymmetrisch raster, gravure lager, trechter naast de stappen), maar `E` §5.2 voegt het controleerblok toe (~420 px), het voorbeeldportret staat ín *Wat je krijgt* (~500 px) en de FAQ kreeg een negende vraag met de eerste open (~140 px). `B` rekende die drie niet mee in "~5.800". Verder inkorten betekent inhoud schrappen die de opdracht vraagt of de ritmetokens van `B` kleiner zetten; dat is een keuze voor de eigenaar, niet voor deze taak.
- **Sectie 5.9 "Kijk het zelf na" is niet gebouwd.** Hij hangt aan het voorbeeldrapport (`G` taak 12) dat nog niet bestaat; zonder dat rapport is de eerste kolom ("Lees eerst een heel hoofdstuk") een lege belofte. Komt mee met taak 12. Het derde beeldmoment is daarom de bestaande trechter, niet een rapportuitsnede.
- **De trechter is CSS gebleven**, niet SVG (`E` §5.6). De vier accentkleuren op de banden zijn niet gedaan: de dimensiekleuren zijn op tekstcontrast ontworpen, niet als vlak onder inkt; dat zou een nieuwe contrastmeting per band vragen voor een decoratief effect.
- **De negende FAQ-vraag mist de slotzin** *"Verandert dat ooit, dan staat het hier, vóórdat het gebeurt"*: dat is een toezegging die alleen de eigenaar kan doen (`E` §5.12 zegt zelf: alleen opnemen als hij wordt nagekomen; `G` beslispunt 3 over een betaalde laag staat nog open). De eerste vier zinnen dragen het antwoord.
- **Kaart 4 en FAQ 1 zeggen "de eerste 72"**, niet "zestig" zoals `C` §4 rij 16: de vragenbank begint met 72 stellingen (`ARCANA_QUESTIONS`). De code wint.
- **De begroting blijft op 75.000 B**, anders dan `G` §3 tegenspraak 9 ("80.000 vanaf taak 8"): de landing meet 65,7 KB q11 (was 60,4; het voorbeeldportret kost 5,3 KB, niet de voorspelde 6,5). Een begroting die niet hoeft te groeien, groeit niet.
- `og:description`, `twitter:description`, de JSON-LD-`featureList` en de statische `#root`-tekst zeggen nog "ruim 5.500 woorden": waar, maar niet gelijk aan de statbalk. Dat is taak 11 (SEO), samen met de FAQ-markup (5 van 9 vragen).
- Het bijschrift bij het voorbeeld zegt "Je eigen portret staat bovenaan je rapport" in plaats van "wiel" (`E` §5.8): het rapport heet het een portret sinds 21-09.
Verificatie: contrast 0 fouten in licht én donker op 1440, 390 en 320 px (254 tekstknopen, inclusief de tekst in het voorbeeldportret); één echte fout gevonden en gefixt — trechterband 2 op nacht op een telefoon (4,31:1, tekst < 24 px) → 5,0:1 met iets minder goud in de menging, alleen op donker. Precies één h1, koppen h1→h2→h3 zonder sprongen, skip-link aanwezig met bestaand doel, geen horizontale scroll op 320, de hero tot en met de metaregel eindigt op 611 px op 390×667. Twaalf unieke dimensiekleuren op de pluimen en de linkerlijnen, gravure `screen` op nacht. Poort: 129 tests, typecheck 0, lint 0, build + domeincontrole + begroting geslaagd, gouden master 0 gewijzigd.
Follow-up: taak 12 (voorbeeldrapport) levert sectie 5.9 en de "Liever eerst kijken?"-regel onder de slot-CTA; taak 11 trekt OG/JSON-LD/`#root` gelijk met `5.700+` en zet alle negen FAQ-vragen in de markup; de eigenaar beslist over de paginahoogte (inhoud schrappen of ritmetokens kleiner) en over de slotzin van FAQ 9; het contrastscript staat nu als herbruikbare functie in de sessie maar nog niet in de repo — een Playwright-opstelling (`G` §6) blijft open.

## 2026-09-23 — Rebuild taak 2: bundel gesplitst, fonts gesubset, portret naar SVG

Decision: drie deelstappen, elk apart gecommit. (2a) De bundel is gesplitst op het moment waarop code nodig is: `React.lazy` voor intake, vragen en rapport, en een dynamische import van de rekenengine die wordt vóórgeladen zodra de intake begint — de veilige variant uit `D` §8.2, niet het voorladen bij vraag 110. `QUESTION_COUNT` staat los van de vragenbank zodat de landing het getal kent zonder de vragen. Een bronniveau-test bewaakt dat de app-root en de site-laag de zware modules niet statisch importeren; `scripts/meet-bundel.mjs` meet brotli per chunk en per scenario en laat `npm run build` falen boven de begroting. (2b) De fonts zijn gesubset met fontTools tot precies de tekens die de site toont, met twee aanvulbestanden per letter die via `unicode-range` alleen laden bij een naam met bijzondere tekens; Cormorant 400 rechtop en Inter 500 vervallen (nergens gebruikt), Cormorant 600 blijft; een Vite-plugin zet een `preload` op het woordmerkfont. (2c) Het portret is van canvas naar SVG gegaan. De geometrie staat in `src/lib/arcanaPortraitGeometry.ts` als pure functie van de scores; de component rendert per dimensie één `<g>` met de baardjes in vier dekkingsklassen, de schacht als taps toelopende vorm, en echte `<text>` voor scores en labels. Kleuren komen via `--kleur: var(--dim-…)` rechtstreeks uit de tokens; de donkere modus vraagt geen JavaScript meer. De canvas-versie blijft tot taak 13 bereikbaar met `?vergelijk` in de URL (lazy, laadt anders niet).
Reason: de landingsbezoeker downloadde 37 % aan vragen en rapportteksten die hij nooit nodig had (`D` §3.1); het canvas printte als raster op ~150 dpi en had de kleuren hard in JavaScript (`D` §4.1); vier van de vijf fontbestanden bevatten ~700 glyphs waarvan er ruim 100 gebruikt worden (`D` §3.3).
Files affected: arcana/vite.config.ts (vendor-chunk, `cssCodeSplit: false`, preload-plugin), src/App.tsx (lazy, engine-loader met drie pogingen, foutscherm), src/components/ArcanaEngineUnavailable.tsx (nieuw), src/data/arcanaQuestionCount.ts (nieuw), scripts/meet-bundel.mjs (nieuw), scripts/subset-fonts.py (nieuw), src/fonts/ (15 gesubsette bestanden; de 14 bronbestanden in `src/fonts/bron/`), src/styles/arcana.css (`@font-face`-blok herschreven, SVG-portretstijlen), src/lib/arcanaPortraitGeometry.ts (nieuw), src/components/ArcanaPortrait.tsx (SVG), ArcanaPortraitCanvas.tsx (de oude tekening, hernoemd), ArcanaReport.tsx (vergelijkvlag), src/test/arcanaChunks.test.ts en arcanaPortraitGeometry.test.ts (nieuw), package.json (begroting in de build).
Risks:
- **Wie het hele traject doorloopt downloadt iets méér JavaScript dan eerst** (132,6 KB q11 tegenover ~131 in één chunk): de compressie-overhead van losse chunks. Dat is de ruil die `D` §3.2 vooraf benoemde en hij valt hier kleiner uit dan voorspeld (+6,4 KB).
- **Het SVG-portret is niet pixel-identiek aan het canvas.** De schacht liep in het canvas over 46 segmenten in dikte af; in SVG is dat een gevulde taps toelopende vorm — dat oogt gelijk. De baardjes hebben vier dekkingsklassen in plaats van één per baardje (verschil met het blote oog niet te zien, halveert de DOM). De gloed gebruikt `mix-blend-mode` op een `<g>`; `D` §8.4 waarschuwt dat Safari dat anders afhandelt — de gloed is decoratief (alfa 0,085) en mag daar wegvallen. **Niet in Safari getest.** De vergelijkvlag bestaat precies hiervoor.
- **De intekenanimatie is nu CSS** (schaal + dekking per pluim, verschoven per dimensie) in plaats van een groei langs de schacht. Onder `prefers-reduced-motion` en in print staat het beeld direct compleet. De eindstand is de basisstand.
- **Het rapport-DOM groeit** van 936 naar 1.102 knopen (SVG met gradiënten, labels en `<title>` per pluim); `D` rekende op ≤ 1.030. Merkbaar is het niet, maar het staat boven de streep.
- **Cormorant 600 blijft, anders dan `Z` (tegenspraak 8) besloot.** Reden: hij staat in negen regels op de landing en de begroting (≤ 60 KB) wordt met vier bestanden gehaald (53,5 KB). Laten vallen zou een zichtbare wijziging zijn in een taak die er geen mag opleveren.
- **`size-adjust` op de terugvalletter is niet gedaan** (`D` §3.3 punt 1): dat vraagt een gemeten x-hoogteverhouding per letter. `font-display: swap` staat; de verspringing is klein maar niet nul.
- De contrastmeting telt SVG-`<text>` nu mee (strenger dan de nulmeting). Het script uit `A` §5 ziet ook `<title>`/`<desc>` als tekstknopen — die worden nooit getekend en hebben geen kleur; die ene 'fout' in donker is een meetartefact en is uit de meting gefilterd.
Verificatie: in de gebouwde bundel haalt de landing alleen `index` + `vendor` op (71,9 KB over de lijn, was ~148) en vier fonts (56,0 KB, was 120,6 in vijf); "Start de test" laadt intake + vragen + engine; vraag 1 laadt de vraagschermen. Bundelmeting q11: landing 60,4 KB (doel 75), volledig bezoek 132,6, herlezen 74,3; CSS 10,1 KB; fonts landing 53,5 KB (doel 60). SVG-portret: 12 groepen, 12 toetsenbord-focusbare pluimen met `<title>`, schachtkleur licht `#496cca` / donker `#6284d7` zonder hertekening, oplichten via de lijst werkt (rest op 0,13). Contrast rapport: 0 fouten licht, 0 fouten donker (na filtering van `<title>`/`<desc>`), 567 knopen. Poort: 129 tests (7 nieuw), typecheck 0, lint 0, build + domeincontrole + begroting geslaagd, gouden master 0 gewijzigd.
Follow-up: het statische voorbeeldwiel voor de landing (`D` §4.4) komt in taak 3 uit dezelfde geometriemodule; de canvas-tekening en de vergelijkvlag gaan weg in taak 13; het laadscherm van zes seconden is taak 9 in `G` en staat er nog.

## 2026-09-23 — Rebuild taak 1: één tokenset, vier kleurfamilies, donkere modus

Decision: de eigenaar koos richting (a) Perkament & Diepte met de donkere modus uit (b) integraal, en herocopy variant A (nieuwsgierigheid) voor taak 3. `design-tokens.css` uit werkstroom B is ongewijzigd overgenomen als `src/styles/tokens.css` (plus twee aanvullingen: `--font-sans`, dat al werd gebruikt maar nergens bestond, en `--arc-card-cut`); het oude `:root`-blok in `arcana.css` is verwijderd en de oude tokennamen blijven als alias bestaan, zodat de rest van de CSS niet hernoemd hoefde te worden. De twaalf dimensiekleuren zijn vervangen door vier families van drie met een familiesymbool (◆ ● ▲ ■); `MAIN_DIMENSIONS` draagt geen hex meer maar een `token` en een `family`, en de array is per familie gehergroepeerd. De donkere modus werkt via `prefers-color-scheme` én een handmatige keuze (`arcana_theme`, als JSON, bewust buiten `STORAGE_KEYS` zodat "Antwoorden wissen" hem laat staan), met een blokkerend bootscript vóór de stylesheet zodat er geen lichte flits is, en een schakelaar Licht · Auto · Donker in de kop, het mobiele menu en bovenaan het rapport.
Reason: de vijf gemeten oorzaken van de vlakheid (geen middentonen, geen schaduw, onzichtbare haarlijnen, geen typografische schaal, één beeld) zitten alle vijf in de tokens, en (a) lost ze op zonder één merkbeslissing te raken — de hero van (a) is bovendien letterlijk het portret dat het rapport al toont. Herocopy A is de keuze van de eigenaar en wijkt af van de aanbeveling (B); consequentie per `G` §2: bij taak 3 moet de SEO-titel uit `E` §7.2 op de h1 worden afgestemd.
Files affected: arcana/src/styles/tokens.css (nieuw), arcana.css (`:root` weg, drie hardgecodeerde kleuren getokeniseerd, printblok met extra specificiteit, themaschakelaar- en familiesymboolstijlen), site.css (`.landing__kaart`, trechterband 3, gravurefilter in donker, schakelaar in de kop), index.html (bootscript, boot-stijl, `theme-color`-meta vóór het script, inline kleuren uit de `#root`-fallback), src/lib/arcanaTheme.ts (nieuw), src/components/ArcanaThemeToggle.tsx (nieuw), ArcanaPortrait.tsx (kleuren uit de cascade, hertekenen bij themawissel, familiesymbool in de lijst), src/data/arcanaDimensions.ts, ArcanaReport.tsx, src/site/SiteHeader.tsx, LegalPages.tsx (privacytekst noemt de weergavevoorkeur), App.tsx (importvolgorde), src/test/arcanaTheme.test.ts (nieuw, zonder jsdom), src/test/arcanaVoiceCorpus.test.ts.
Risks:
- **Het portret is nog canvas.** Het leest zijn kleuren nu uit de tokens en tekent opnieuw bij een themawissel (via een event, `matchMedia` én een `MutationObserver` op `data-theme`), maar het blijft een bitmap tot taak 2 het naar SVG omzet. Op donker gebruikt de gloed `screen` in plaats van `multiply`, anders dooft hij uit.
- **De printregel had een specificiteitsprobleem**: `@media print { :root {…} }` verloor van `:root[data-theme="dark"]`, waardoor wie in donker op "Download als PDF" klikte een donker vel kreeg. De printselector dekt nu ook de twee donkere selectors.
- **`theme-color` stond ná het bootscript** in `<head>`, waardoor het script de meta niet vond en de adresbalk licht bleef bij een opgeslagen donkere keuze. Gevonden in de browser, meta naar boven verplaatst.
- **De gravure in donker** is met een CSS-filter geïnverteerd en met `screen` over de nacht gelegd. Dat is nog niet met het oog beoordeeld: het browserpaneel in deze omgeving rendert geen frames. Beoordelen bij de eerste echte blik op de site in donker.
- **De hergroepering per familie verandert de vorm van het portret** voor dezelfde scores: de pluimen staan nu in vier kwadranten. Dat is de bedoeling (`B` §3.2), maar wie een oud rapport naast een nieuw legt ziet een ander beeld bij gelijke cijfers. Geen enkele zin of score verandert: de generator leest `MAIN_DIMENSIONS` niet, en de gouden master is er dus blind voor (0 gewijzigde fixtures).
- `--ink-faint` is zichtbaar donkerder (3,60:1 → 6,26:1). Vooraf gemeld, zoals `G` taak 4 vraagt.
- De schakelaar staat in de kop en het rapport, niet in de voettekst zoals `D` §5.4 wilde: een schakelaar onderaan een pagina van 7.000 px vindt niemand.
Verificatie: contrastscript uit `A` §5 in de browser op landing (179 knopen), vragenscherm (16) en rapport (518), in licht én donker: 6 × 0 fouten. Eén echte fout gevonden en gefixt: trechterband 3 (inkt op een goudmenging, 3,5:1 na de tokenwissel; nu knoptekst op goud, 7,2:1 / 9,7:1). De meting is met transities uitgeschakeld gedaan: dit paneel rendert geen frames, waardoor elementen met een `transition` op `color` in `getComputedStyle` op hun startwaarde blijven hangen — dezelfde beperking die screenshots hier onbruikbaar maakt. Echte schakelweg getest: opgeslagen keuze → bootscript zet `data-theme` en de meta vóór de eerste verf; klik Licht/Donker/Auto → attribuut, opslag, meta en de kern-pixel van het portret volgen alle vier. Poort: typecheck 0, lint 0, 120 tests (5 nieuw), gouden master 0 gewijzigd, build + domeincontrole geslaagd. CSS 11,0 KB brotli (q5), binnen de 14 KB uit `G` taak 4.
Follow-up: de corpustest voor de u-vorm had 'weet' in zijn lijst van kale stammen, terwijl "weet u" correcte inversie is; dat viel nooit op omdat de zinnen met "Weet je zeker" door een losse apostrof eerder in `ArcanaReport.tsx` buiten de string-scan vielen. Een JSX-commentaar met `'s avonds` herstelde de quote-pariteit en bracht het aan het licht. 'weet' is uit de lijst gehaald; de scanner zelf blijft gevoelig voor losse apostrofs — een robuustere tokenizer is een aparte, kleine taak.

## 2026-09-22 — Portret afgemaakt: jargon bij de bron weg, kern en verantwoording toegevoegd

Decision: drie aanvullingen op de portret-weergave van 2026-09-21, samen de afronding van het gekozen ontwerp.
1. **Zes subdimensielabels herschreven.** `Stress: terugtrekken/controleren/versnellen/bevriezen` en `Schaduw: verdedigen/vermijden` zijn vervangen door `Terugtrekken onder druk`, `Grip zoeken onder druk`, `Versnellen onder druk`, `Vastlopen onder druk`, `Jezelf verdedigen bij kritiek` en `Uitstellen wat ongemakkelijk is` — in zowel `arcanaTraitContent.ts` (de lezerskant) als `arcanaDimensions.ts` (om beide lijsten in sync te houden).
2. **`ArcanaReportGlance` herbouwd tot "De kern"**: vijf kaarten (waarom dit archetype, wat er onder druk gebeurt, de grootste valkuil, de eerste concrete stap, het spanningsveld dat trekt) met per kaart een ankerlink naar het volledige hoofdstuk.
3. **`ArcanaMethod` (nieuw): "Hoe dit gemeten is"**, vóór de verdieping — de keten 120 → 30 → 12 → 1, wat de schaal betekent (50 = midden, hoog is niet beter dan laag), hoe stevig deze meting staat op basis van de response-quality-analyse, en wat het rapport níet is.
Reason: bij het aansluiten van het portret op echte data bleek het jargon niet in de wéérgave te zitten maar in de rapporttekst zelf. De labels lekten via 32 `T(...).label`-aanroepen in de generator naar de lezer, tot in de slotzin toe ("jouw kracht als The Flame zit niet in het wegwerken van schaduw: verdedigen"). Dat was precies de klacht van de eigenaar — "termen die niks zeggen" — en ook een harde eis van het gekozen ontwerp. Repareren bij de bron lost het in één keer overal op. De kern en de verantwoording stonden in het gekozen ontwerp onder het beeld en waren op 2026-09-21 bewust uitgesteld; zonder die twee lagen mist het rapport het korte antwoord én de uitleg waar de eigenaar expliciet om vroeg.
Files affected: arcana/src/data/arcanaTraitContent.ts, arcana/src/data/arcanaDimensions.ts, arcana/src/components/ArcanaReportGlance.tsx (herbouwd), ArcanaMethod.tsx (nieuw), ArcanaReport.tsx, arcana/src/styles/arcana.css, arcana/src/site/LandingPage.tsx (verwees nog naar een scorewiel).
Risks:
- De nieuwe labels moeten blijven werken als naamwoordgroep: de slotzin bouwt `het wegwerken van ${label.toLowerCase()}`. Alle zes zijn daarom gerund-vormen ("versnellen onder druk", "jezelf verdedigen bij kritiek"). Geverifieerd op drie seeds; wie later een label wijzigt, moet die zin opnieuw narekenen.
- "De kern" toont dezelfde bullet als de sectie verderop. Dat is bewust hetzelfde patroon als de vorige "In het kort"-kaart: samenvatten zonder de tekst te herschrijven houdt elke uitspraak herleidbaar naar dezelfde score.
- De kaart "Waarom dit archetype" benoemt de twee hoogst scorende hoofddimensies. Bij een bijna-gelijkspel tussen primair en secundair archetype (3 punten of minder) zegt de kaart dat expliciet en verwijst naar beide portretten, in plaats van één winnaar te forceren.
Verificatie: jargoncontrole over een volledig gegenereerd rapport op `Stress:` / `Schaduw:` geeft nul treffers. In de browser gemeten op 1000px en 375px: geen horizontale overflow, kern 2 koloms boven 720px en 1 kolom daaronder, valkuilkaart spant beide kolommen, raakdoelen 44px (de "lees verder"-links waren 28px en zijn opgehoogd), portret vierkant op smal scherm. Checks: typecheck 0, oxlint src 0, test 91/91, build slaagt.
Follow-up: het browserpaneel in deze omgeving kon geen bruikbare screenshots leveren (paneelbreedte viel terug naar 187px); de controle is daarom numeriek gedaan op afmetingen, kolommen, overflow en de daadwerkelijk gerenderde kopij, niet visueel op de volledige pagina.

## 2026-09-21 — Het portret vervangt het scorewiel als voorkant van het rapport

Decision: uit vijftien voorgelegde rapportontwerpen (drie rondes van vijf) koos de eigenaar expliciet "Het portret". Het scorewiel (`ArcanaScoreWheel`) is verwijderd en vervangen door `ArcanaPortrait`: een canvas-tekening waarin de twaalf hoofddimensies als twaalf pluimen rond een kern staan, met de kern-rand als 0, een gestippelde ring als 50 en de buitencirkel als 100. Het portret staat nu direct onder de masthead, gevolgd door de archetypekaart en "In het kort"; de 32 hoofdstukken, de legenda en de inhoudsopgave zijn daarachter geplaatst onder een expliciete scheiding ("Vanaf hier de verdieping — Het volledige rapport").
Reason: de eigenaar noemde het bestaande rapport "onbegrijpelijk, lelijk, een niet concreet bundel aan informatie". Twee eerdere ontwerprondes werden afgewezen; beide varieerden alleen de stijl en bleven een lange scrollpagina vol tekst. De derde ronde varieerde de vorm, en hieruit is het portret gekozen. De herindeling hoort bij dat ontwerp: zonder zichtbare scheiding tussen kern en verdieping blijft het rapport lezen als één ongedeelde stapel van 32 gelijkwaardige kaarten, wat precies de oorspronkelijke klacht was.
Files affected: arcana/src/components/ArcanaPortrait.tsx (nieuw), ArcanaScoreWheel.tsx (verwijderd), ArcanaReport.tsx (herindeling), arcana/src/data/arcanaDimensions.ts (`meaning` en `color` per hoofddimensie), arcana/src/styles/arcana.css (portret- en scheidingsstijlen; `.arcana-score-wheel*` en `.arcana-stat-*` verwijderd, inclusief hun printregels).
Risks:
- **Het portret is zo expressief als de schaal toelaat.** Op een echt gegenereerd rapport (dummy-antwoorden, seed 20260917) liggen de twaalf scores tussen 42 en 72, waardoor de rozet bijna rond is en de vorm weinig zegt. Dat is dezelfde scheefheid die Fase C moet herijken; zolang die niet is doorgevoerd, onderpresteert dit ontwerp. Het beeld is niet fout — de schaal is te vlak.
- Het open ringetje markeert de hoogst scorende hoofddimensie (bij gelijke stand de eerste in de vaste volgorde van `MAIN_DIMENSIONS`), niet de valkuil zoals de rapportgenerator die berekent. Dat is een bewuste vereenvoudiging: de rapportvalkuil is een subdimensie en heeft geen eigen pluim in het beeld. Het onderschrift noemt het daarom "je sterkst uitgesproken kant", niet "je valkuil".
- Canvas print als bitmap. `print-color-adjust: exact` staat erop en de motor tekent opnieuw bij `beforeprint`, zodat het doek niet halverwege de intekening of op schermbreedte op papier belandt. Een echte print-preview is in deze omgeving niet pixel-voor-pixel te controleren; dat blijft een handmatige controle waard.
- `ResizeObserver` bleek niet af te gaan onder apparaat-emulatie in devtools. De motor luistert daarom naar de observer én naar `resize`; `pas()` doet niets bij gelijke breedte, dus dubbel luisteren kost niets. Daarnaast staat `height: auto` op het doek, zodat een door `max-width` geklemde breedte het portret nooit kan uitrekken.
Follow-up: `ArcanaReportGlance` ("In het kort") en de archetypekaart zijn inhoudelijk ongewijzigd gebleven. Het gekozen ontwerp toont onder het beeld een compactere kern (waarom dit archetype, wat er onder druk gebeurt, valkuil, groeisleutel, spanningsveld) dan wat er nu staat; dat samenvoegen raakt de rapportteksten en is bewust niet in deze stap meegenomen.

## 2026-08-20 — Fase B: cijferherhaling binnen één rapport opgelost via presentatie, niet via selectie

Decision: bij 4 bevestigde duplicaten (spanningsveld-bullet in het 30-dagenplan, groeibereidheid in twee secties, conflictAvoidance in twee secties, en een structurele cascade rond who-you-are/at-ease/strengths/shadow/stress) is per geval één canonieke sectie aangewezen die het exacte cijfer behoudt; andere secties laten het cijfer weg en verwijzen kwalitatief terug, met behoud van hun eigen inhoudelijke tekst. De canonieke sectie is steeds de sectie waar het cijfer een claim *draagt* (bv. communicatiestijl se driefactor-classificatie), niet automatisch de sectie die het eerst in leesvolgorde komt.
Reason: de analysefase (arcana-report-analyst) had voor de cascade voorgesteld om overlappende subdimensies uit "Je valkuilen" te filteren, naar analogie van het bestaande "remaining"-patroon in blind-spots/growth-path. Dat is bewust NIET overgenomen: een subdimensie die zowel je grootste sterkte als je grootste valkuil is, is een inhoudelijk waardevol onderdeel van de "sterkte = valkuil"-formule uit AGENTS.md — filteren zou dat weggenomen hebben. In plaats daarvan is de selectie/ranking overal ongewijzigd gelaten; alleen is per sectie lokaal (een pure herberekening van dezelfde deterministische poolfunctie, geen nieuwe gedeelde state) gecontroleerd of een cijfer al eerder expliciet genoemd was.
Files affected: arcana/src/lib/arcanaReportGenerator.ts, arcana/src/data/arcanaSectionPhrasings.ts (5 nieuwe velden, bewust met 5 varianten i.p.v. de standaard 3 om de cross-rapport-overlapmeting niet te laten stijgen), arcana/src/data/arcanaReflections.ts (signaleringszinnen bij pijn/haat, zelfde patroon als de bestaande zin bij verdriet).
Risks: de conditionele onderdrukking bij shadow/stress hangt af van lokaal herberekende topSubDimensions-aanroepen die stilzwijgend uit sync kunnen raken als de poolgrootte (nu top-3/top-5) ooit los van elkaar wijzigt. Cross-rapport tekstoverlap steeg licht (28,7% → 28,8%) door de nieuwe velden; bewust geaccepteerd na een gerichte correctie (3→5 varianten) omdat verdere reductie het uitgestelde variant-botsingsvraagstuk raakt.
Follow-up: twee punten uit de analyse zijn bewust niet meegenomen — (1) het variant-botsingsmechanisme (elk trait-veld heeft maar 3 formuleringen; empirisch 27-40% kans dat twee secties die dezelfde subdimensie citeren toevallig dezelfde formulering kiezen) vraagt een apart besluit over meer varianten per veld versus een ander keuzemechanisme in `arcanaVariants.ts`; (2) de poololap tussen "Hoe je bent met anderen" en "Hoe je bent met familie en vrienden" (5 van 7 gedeelde subdimensies) is laag risico en bewust ongemoeid gelaten.

## 2026-07-29 — Variantselectie op antwoorden, niet op scores

Decision: de `variantSeed` wordt afgeleid uit de antwoorden zelf (gesorteerd op vraag-id, inclusief antwoordinhoud), niet uit de berekende scores.
Reason: twee mensen kunnen bijna identieke scores hebben met verschillende antwoorden. Seeden op scores zou hen dezelfde formuleringen geven en precies het probleem laten bestaan dat we oplossen. Seeden op antwoorden geeft spreiding waar scores dat niet doen, en blijft deterministisch.
Files affected: arcana/src/lib/arcanaVariants.ts (`deriveVariantSeed`)
Risks: iemand die de test tweemaal exact hetzelfde invult krijgt hetzelfde rapport — dat is bedoeld gedrag (regel 5), maar kan bij hertesten als "er is niets veranderd" voelen.
Follow-up: geen.

## 2026-10-10 — Hero: fotoparallax met de naam tússen de lagen

Decision: de hero-collage is geen SVG-tekening meer maar een parallax van zes losse fotolagen (papier, landschap, boog, collage, Jung, schaaktafel) uit `parralax.zip`, met "Arcana Profile" op diepte 0,42 — dus vóór de boog en áchter het gescheurde papier. `HeroCollage.tsx` en `hero-collage.svg` zijn vervallen; `HeroParallax.tsx`, `heroLagen.ts` (gegenereerd) en `src/assets/art/hero/*.webp` komen ervoor in de plaats. De overige landingillustraties blijven SVG.

Reason: de eigenaar vroeg om deze platen als parallax-hero met grote letters tussen de lagen. Het bestaande parallaxmechanisme (`--py`/`--px`/`--pyy` op de wortel, `--diepte` per laag) is ongewijzigd hergebruikt; alleen de lagen zijn vervangen. Drie dingen zijn gemeten in plaats van gegokt:

- **Bijsnijden.** De bronplaten zijn 1672x941 en voor 35-72 % doorzichtig. `scripts/analyseer-lagen.mjs` meet per laag de bounding box van alles met alpha > 8; `scripts/bereid-parallax.mjs` snijdt daarop bij en legt de positie als percentage van het oorspronkelijke vlak vast in `heroLagen.ts`. Daardoor staan er geen magische getallen in de CSS en kan de kunst opnieuw geëxporteerd worden zonder dat iemand posities naloopt. 12,8 MB PNG werd 962 KB WebP.
- **Waar de naam staat.** Niet de omhullende van de collage bepaalt hoeveel schoon papier er links is, maar waar de eerste ondoorzichtige pixel zit. Per horizontale band gemeten: in de bovenste vijfde begint het gescheurde papier pas op 32-46 % van de plaatbreedte, lager al op 17-25 %. Vandaar dat de naam bovenin staat; daar is hij leesbaar én loopt zijn staart zichtbaar achter de koning langs.
- **Hoe groot de naam is.** `--naam` rekent de schone breedte uit (`0,975 × 100vw − 1,12 × bandhoogte`) en neemt daar 0,345 van. Zo houdt de overlap dezelfde verhouding op 1000 px als op 1920 px, in plaats van bij één schermbreedte goed te staan.

Files affected: arcana/src/site/HeroParallax.tsx (nieuw), arcana/src/site/heroLagen.ts (gegenereerd), arcana/src/site/HeroCollage.tsx (verwijderd), arcana/src/assets/art/landing/hero-collage.svg (verwijderd), arcana/src/assets/art/hero/*.webp (nieuw), arcana/src/site/LandingPage.tsx (hero-sectie), arcana/src/styles/site.css, arcana/scripts/analyseer-lagen.mjs + bereid-parallax.mjs (nieuw), arcana/scripts/meet-bundel.mjs, arcana/package.json (sharp als devDependency).

Risks:
- **Gewicht.** De hero weegt op desktop 869 KB aan lagen, tegen 31 KB voor de SVG die er stond. De eigenaar koos dit expliciet boven een lichtere variant ("maximale kwaliteit"). Verzacht doordat de lagen alleen laden op ≥900 px mét bewegingsvoorkeur; mobiel en prefers-reduced-motion halen één platte composiet van 93 KB. Beide grenzen staan apart in `meet-bundel.mjs`, zodat de build faalt als iemand er ongemerkt overheen gaat. Kwaliteit verlagen helpt nauwelijks (q72 → q55 scheelt 10 %): de platen zijn korrel, halftoonraster en papiervezel, en dat comprimeert niet. Alleen resolutie telt.
- **Vaste kleuren in de band.** Alles ín de hero rekent met `--vel-inkt`, `--vel-zegel` en `--vel-papier` en niet met de themavariabelen. De plaat is een foto van papier en wordt niet donker omdat de site dat wordt; zonder die vaste waarden verdween de naam in donkere modus in het papier. Dezelfde afspraak gold al voor het handschrift in de oude hero.
- De CSS-begroting ging van 18.000 naar 19.000 B brotli q11 (plafond blijft 20.000).

Follow-up: bij nieuwe kunst `node scripts/bereid-parallax.mjs <map>` draaien — die herschrijft `heroLagen.ts`. Wijzigt de compositie zo dat de linkerkant minder schoon papier houdt, dan moet de factor 1,12 in `--schoon` opnieuw gemeten worden met `analyseer-lagen.mjs`.

## 2026-10-10 — De twaalf archetypen als register, niet als twaalf kaarten

Decision: nieuwe landingsectie "De twaalf namen" (`ArchetypeVerkenner.tsx`): een register van twaalf namen links en één blad rechts dat meewisselt. Bij elke naam staat de formule — de vier subdimensies waar het archetype uit wordt opgeteld. Gebouwd op radio-inputs.

Reason: de eigenaar koos dit als het interactieve deel. Twee keuzes dragen het:
- **De formule tonen** maakt van dit blok een bewijs in plaats van een sfeerbeeld. De hele pagina belooft dat je het kunt narekenen; hier zie je dat een archetype geen etiket is maar een optelsom van gemeten eigenschappen. De begeleidende tekst zegt er expliciet bij dat herkenning in deze teksten nog niets betekent — ze passen met opzet op veel mensen, en pas eigen scores maken er een uitspraak over jou van. Dat volgt de master-visie: archetypen zijn een presentatievorm, geen hokje.
- **Radio's in plaats van knoppen** laat de browser de pijltjestoetsen, de rolverdeling en het voorlezen doen. Scheelt toetsenbordcode die toch net anders werkt dan mensen gewend zijn.

`ARCHETYPES` (6 KB: naam, formule, basistekst) komt mee op de landing; `ARCHETYPE_CONTENT` (54 KB) bewust niet — die hoort bij het rapport.

Files affected: arcana/src/site/ArchetypeVerkenner.tsx (nieuw), arcana/src/site/siteContent.ts (`ARCHETYPE_VERKENNER`), arcana/src/site/LandingPage.tsx, arcana/src/styles/site.css.

Risks: de landing-JS ging van 66,4 naar 72,7 KB brotli q11 (grens 75.000). Wie hier nog iets aan toevoegt, moet eerst meten. Op smalle schermen staat het blad vóór het register (`order: -1`) terwijl de DOM-volgorde register-eerst is; dat is bewust — voorleesvolgorde klopt zo, en onder elkaar zou het blad anders twaalf namen laag buiten beeld staan.

Follow-up: geen.

## 2026-10-10 — Echte renders in de landing: tegels, doorgang, buste en bergstrook

Decision: de eerdere regel "geen foto's, alleen nagetekende vectoren" (2026-10-06) is voor de landing herzien nadat de eigenaar "het uiterlijk is totaal niet zoals gevraagd" meldde. De hero is een fotoparallax van zes echte lagen (zie de vorige beslissing van de hero-sessie); nu zijn ook de tegels Persona/Schaduw/Denkstijl, de doorgang in de donkere band, de buste bij "De methode" en de bergstrook onder de slotoproep de eigen renders van de eigenaar, als WebP (`src/assets/art/renders/`, gemaakt door `scripts/bereid-renders.mjs`, maten in het gegenereerde `src/site/renderBeeld.ts`). Mijn zes platen bevatten geen Jung-gelijkend gezicht (standbeeld, silhouetten, abstracte profielen). Let op: de hero-laag `jung.webp` (door de eigenaar aangeleverd voor de parallax, verwerkt door de hero-sessie) toont wél een fotorealistische AI-weergave van een oudere man met bril die sterk op C.G. Jung lijkt — dat is een bewuste keuze van de eigenaar voor de hero, geen beslissing van deze sessie, en blijft een gebruiksrecht-/gelijkenisrisico dat bij de eigenaar ligt. De rapportemblemen, deelillustraties en het PDF-voorblad blijven eigen vector.
Reason: de vector-nabootsing las als een goedkope benadering van de mockup; de renders zijn het ontwerp zelf. Gewicht blijft beheerst: WebP met alpha, 878 KB samen in zes lazy `<img>`'s onder de vouw (geen JS, geen eerste verf), bewaakt door `scripts/meet-bundel.mjs` (RENDER_ART, grens 1,07 MB).
Files affected: arcana/src/site/LandingPage.tsx, renderBeeld.ts, arcana/src/styles/site.css, arcana/scripts/bereid-renders.mjs, arcana/scripts/meet-bundel.mjs; verwijderd: src/assets/art/landing/*.svg (zes bestanden).
Risks: de bronbestanden zijn AI-gegenereerd; de eigenaar blijft verantwoordelijk voor het gebruiksrecht. Zwaardere pagina onder de vouw op mobiel (de platen laden pas bij scrollen).
Follow-up: een kleinere mobiele variant (srcset) als de paginalast stoort.

## 2026-10-10 — Standaardthema is licht

Decision: zonder bewaarde keuze opent de site in licht; "Auto" is een bewuste keuze en wordt als "system" bewaard (`arcana_theme`).
Reason: een bezoeker met een apparaat in donkere modus zag een zwarte pagina in plaats van het perkament van het ontwerp; de eigenaar meldde dat het uiterlijk niet klopte.
Files affected: arcana/index.html, arcana/src/lib/arcanaTheme.ts, arcana/src/test/arcanaTheme.test.ts.
Risks: wie eerder "Auto" kozen had geen sleutel opgeslagen en ziet nu licht; opnieuw kiezen herstelt dat.
Follow-up: geen.

## 2026-10-10 — Hero: gedempte beweging en meer lucht in de compositie

Decision: drie bijstellingen op de fotoparallax, op aanwijzing van de eigenaar ("langzamer en soepel", "te opgepropt").

1. **De beweging volgt met vertraging.** `useParallax` zet `--py`/`--px`/`--pyy` niet meer rechtstreeks uit de scroll- en muispositie, maar schuift per frame een deel van de resterende afstand op (`VOLGSNELHEID_SCROLL` 0,08 en `VOLGSNELHEID_POINTER` 0,055). De lus draait alleen zolang er afstand te overbruggen is en landt netjes op de eindwaarde in plaats van er oneindig naartoe te kruipen. Gemeten: de muis legt 90 % van de weg af in ~0,7 s, de scroll in ~0,45 s; daarvóór stond de waarde er in één frame (17 ms).
2. **De uitslag is kleiner.** De scrollfactor ging van 0,26 naar 0,16 px per gescrolde pixel. Bij 0,26 liep het landschap na een halve schermhoogte scrollen ruim 100 px uit op de tafel; dan valt de plaat zichtbaar uit elkaar in plaats van dat hij diepte krijgt.
3. **De plaat is kleiner dan de band.** Was: de collage vulde de bandhoogte volledig. Nu is de plaat 86 % van de band, met lucht boven, onder en rechts (`--kunst-h`, `--kunst-rechts`), zodat hij als foto óp het vel ligt. Op 1440 px levert dat 394 px schoon papier links in plaats van 252, en 32/59/36 px lucht boven/onder/rechts.

Daarnaast staat er nu een `BIJSTELLING` in `HeroParallax.tsx`: een handmatige correctie bovenop de gemeten posities. In de bronplaat liggen Jung en de schaaktafel tegen elkaar en valt een deel van de collage achter hem weg; Jung staat nu 3,5 procentpunt hoger en 5 % kleiner, de tafel 2,5 punt lager en het landschap 1,5 punt naar rechts.

Reason: de parallax voelde schokkerig omdat elke laag exact en onvertraagd de muis volgde — met zeven lagen leest dat als zeven losse sprongetjes in plaats van één beweging. De demping maakt er één traag, zwaar geheel van. De compositie zelf bracht de boodschap niet over omdat hij de band tot in de hoeken vulde; lucht eromheen maakt van de collage een voorwerp op papier, wat ook beter aansluit bij het dossier-idee van de rest van de site.

`BIJSTELLING` staat bewust níét in `heroLagen.ts`: dat bestand wordt gegenereerd uit de kunst en beschrijft alleen waar de platen zaten. Opnieuw exporteren mag deze afstemming niet weggooien.

Files affected: arcana/src/site/landingMotion.ts, arcana/src/site/HeroParallax.tsx, arcana/src/styles/site.css.

Risks:
- De dempingsconstanten zijn smaakgetallen, geen metingen. Ze staan met een schaal erbij in de kop van `landingMotion.ts`, zodat eraan draaien geen zoekwerk is.
- `BIJSTELLING` wijkt af van de compositie zoals de kunstenaar hem afleverde. Wordt de kunst opnieuw geëxporteerd met andere onderlinge posities, dan moeten deze getallen opnieuw beoordeeld worden — ze corrigeren immers iets wat dan misschien al klopt.
- De platte composiet voor mobiel en prefers-reduced-motion is één beeld en volgt `BIJSTELLING` niet; daar blijft de oorspronkelijke, strakkere compositie staan. Bewust geaccepteerd: het alternatief is de composiet opnieuw renderen uit de losse lagen.

Follow-up: geen.

## 2026-10-11 — Ontwerpronde na de eerste live-versie: trager laadmoment, hoofdactie boven de vouw, minder haperen

Decision: (1) Het laadmoment van de hero duurt nu ~3,5 s in plaats van ~1,7 s en is gestapeld: vel → naam → hoofdactie → foto-lagen (dieper = later) → handschrift. De foto-lagen wachten tot ze gedecodeerd zijn (`HeroParallax.useIntro`, `.is-binnen`) zodat ze niet halverwege inspringen; de rest begint meteen. (2) De scroll- en muisparallax rekent met een tijdconstante (0,34 s scroll, 0,6 s muis) en niet meer met een vaste fractie per frame, dus even traag op 60 en 144 Hz; `will-change` staat vast op de lagen in plaats van per beweging aan/uit. (3) De hoofdactie ("Begin met de 120 vragen") staat nu in de hero-band, boven de vouw; op mobiel blijft hij onder de belofte (twee exemplaren in de DOM, steeds één `display:none`). (4) De paginagradiënt staat op een vaste `body::before`-laag in plaats van `background-attachment: fixed` (haperen bij scrollen). (5) De archetype-verkenner toont het embleem van de gekozen naam. (6) Het rapport rekte op een telefoon 24 px breder dan het scherm (decoratieve schijven): `overflow-x: clip` op `.arcana-report`; Likert op een telefoon 4+3 gecentreerd; aanraakdoelen en kleine tekst vergroot; dode kicker-/eyebrow-strings uit siteContent verwijderd.
Reason: de eigenaar vond het parallax-effect te snel en niet soepel bij het opstarten, en vroeg om een totale analyse van wat niet goed werd weergegeven.
Budget: de landing-JS komt op 75,3 KB q11; de documenteerde trap uit G §3 is deels genomen (grens 75.000 → 78.000, zie `scripts/meet-bundel.mjs`).
Files affected: arcana/src/site/HeroParallax.tsx, landingMotion.ts, LandingPage.tsx, ArchetypeVerkenner.tsx, siteContent.ts, arcana/src/styles/site.css, arcana.css, arcana/scripts/meet-bundel.mjs.
Risks: de lagere parallaxsnelheid is een smaakkeuze (`TAU_SCROLL`, `TAU_POINTER` in landingMotion.ts, `--intro` en de vertragingen in site.css); een nog tragere intro vraagt alleen die getallen.
Follow-up: het scrollgevoel op een echt apparaat (trackpad, muiswiel, telefoon) is alleen met de hand te beoordelen.

## 2026-10-11 — Resttijd in de test rekent met de antwoordtijd van deze sessie, niet met de tijd sinds de start

Decision: "nog ongeveer N minuten" komt uit `src/lib/arcanaPace.ts`: het gemiddelde van de tijd per vraag in de huidige sessie (alleen vooruit met één vraag, tussen 0,8 s en 90 s), met het standaardtempo van 12,5 s per vraag tot er drie metingen zijn, begrensd op 4–45 s per vraag. `arcana_started_at` wordt niet meer voor de teller gelezen (de sleutel blijft bestaan en wordt nog gezet).
Reason: de oude teller deelde de tijd sinds `arcana_started_at` door het aantal antwoorden. Na een pauze van dagen (of met een oude starttijd) telde de pauze mee en toonde de test "nog ongeveer 145007 minuten". Gereproduceerd met een starttijd van 100 dagen geleden: nu 25 → 20 minuten over 24 vragen, ook na hervatten.
Files affected: arcana/src/lib/arcanaPace.ts (nieuw), arcana/src/components/ArcanaTest.tsx, arcana/src/test/arcanaPace.test.ts (7 tests, o.a. de 100-dagen-pauze).
Risks: na een herlaad begint de schatting weer met het standaardtempo tot er drie vragen zijn gemeten; dat is bewust (liever een redelijk getal dan een leeg veld of een oud tempo).
Follow-up: geen.

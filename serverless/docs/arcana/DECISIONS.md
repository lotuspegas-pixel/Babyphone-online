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

# Z — Eindcontrole Arcana Profile

**Onafhankelijke controle op de oplevering van werkstroom A t/m G.**
Uitgevoerd 22-09-2026. Ik heb niets van dit werk zelf gemaakt.

**Wat ik werkelijk heb gedraaid, niet alleen gelezen:**

| Controle | Gereedschap |
|---|---|
| Bundel- en fontgroottes, brotli op vijf kwaliteitsniveaus | `python3 -c "import brotli"` op `/home/claude/site/assets/` |
| 120 vragen / 30 subdimensies / 12 dimensies / 33 hoofdstukken | regex + brace-matching op `app.beautified.js` |
| **De engine uit de bundel geknipt en gedraaid** | `tools/engine-uit-bundel.cjs` uit `D` §7.2 nagebouwd, alle acht fixtures uitgevoerd |
| Alle 14 contrastclaims in `design-tokens.css` | eigen WCAG-2.1-implementatie |
| Alle 20 contrastclaims in `B-moodboard.html` | idem, per richting, met de juiste basis en band |
| Het contrastscript uit `A` §5 op het moodboard | Playwright + Chromium, licht **en** donker |
| 264 ΔE2000-metingen (66 paren × 4 zichtcondities × 2 modi) | eigen CIEDE2000 + Machado-2009-matrices, **daarna nogmaals met `colour-science`** |
| De byte-tellingen per laag in `D` §3.1 | alle 27 blokken opnieuw gemeten |
| `check-domains.mjs` op beide mappen | `node`, exit-codes gecontroleerd |
| JSON-LD en XML in `G-domeinfix/` | `json.loads` + `xml.dom.minidom` |
| Het rekenmodel in de xlsx | `openpyxl`, formules én cachewaarden, scenario's met de hand nagerekend |
| `F-verdienmodel.docx` | uitgelezen met `python-docx` en omgezet naar PDF met LibreOffice |

---

# 1 — Oordeel

**Nee, nog niet opleverbaar — maar het scheelt weinig en er is niets structureels mis.** De
feitenbasis van dit dossier is uitzonderlijk goed: ik heb de engine uit de bundel geknipt, alle
acht gouden fixtures gedraaid en **alle acht SHA-256-hashes, alle acht byte-tellingen en alle
acht archetypecombinaties exact gereproduceerd**; de 27 bytemetingen per bundellaag in `D` §3.1
kloppen tot op de byte en tellen exact op tot de 534.838 die er staat; alle 34 gecontroleerde
contrastwaarden in `design-tokens.css` en `B-moodboard.html` kloppen op twee decimalen; de elf
voorkomens van `speaktoart.com` zijn correct geteld en alle elf geraakt; `check-domains.mjs`
slaagt op de gecorrigeerde map en faalt met exit 1 op de originele build, precies zoals beloofd.
Dit is werk dat zichzelf laat narekenen — wat voor dit product de enige juiste standaard is. Wat
oplevering nu blokkeert is dat **twee documenten claims bevatten die de eerlijkheidsbelofte van
het product ondergraven en die `G-rebuild-spec.md` §3 niet heeft afgevangen**: `E` levert
plak-klare landingscopy met `7.500+ woorden` (gemeten: 5.711–6.327), en `F` verkoopt een PDF van
€9 met datzelfde getal én met een technisch argument dat aantoonbaar onjuist is (het scorewiel
zou geen tekstalternatief hebben — het heeft er één van 270 tekens). Daarnaast is er één
gemeten cijfer dat ik niet kon reproduceren en dat vier keer in de oplevering staat: de
ΔE2000-ondergrens van het nieuwe dimensiepalet is in de lichte modus **7,10**, niet 7,4. Dat is
samen ongeveer een halve dag corrigeren, geen herziening.

---

# 2 — De kwaliteitschecklist, punt voor punt

| # | Eis | Oordeel | Bewijs |
|---|---|---|---|
| 1 | Deterministische reken-engine intact | **Gehaald** | Zelf gereproduceerd. Engine uit `app.beautified.js` geknipt (regel 12574–17218 + 18024–18080 = **255.224 bytes**, exact wat `D` §7.2 zegt), draait in Node zonder DOM en geeft `120 12 2.0.0`. Alle acht fixtures uit `D` §7.2 gedraaid: **8/8 SHA-256-hashes identiek** aan `tests/golden/gemeten-2026-09-22.json`, 8/8 `md_bytes` identiek, 8/8 archetypecombinaties identiek, 33 secties in alle acht. `buildReport` heeft `new Date(0)` als standaard, dus hij is zonder stub deterministisch. De regressiepoort in `G` §6 bevriest bovendien de variant-*indices* en `variant-lengtes.json`. |
| 2 | Privacy / lokaal intact | **Gehaald** | Gemeten: **zes** localStorage-sleutels in de bundel, zes `localStorage.*Item`-aanroepen, verder niets. `G` §6 test 4 eist "exact zeven sleutels" (zes plus `arcana_theme`), nul verzoeken naar een ander domein, en — de sterkste test — de hele doorloop met de stekker eruit. Het enige `fetch()` in 484 KB is Vites modulepreload-polyfill op het eigen domein; zelf geverifieerd. **Let op:** `F` citeert drie keer "vier sleutels" (zie fout 5). |
| 3 | Disclaimer intact | **Gehaald** | `C` uitgangspunt 1 legt de drie plekken en de leesvolgorde vast. `C` §4 markeert de FAQ-rijen 31 en 33 als "onaantastbaar". `G` taak 11 en de regressiepoort eisen alle drie de secties op dezelfde plek. `E` §7.4 verbiedt expliciet gezondheidsgerelateerde schema-types. Niets in de oplevering zwakt de disclaimer af. Eén kanttekening: `G` taak 8 spreekt van "de vier disclaimers in sectie 9", de poort van "alle drie de disclaimersecties" — vier bullets in één van drie secties. Verwarrend, niet fout. |
| 4 | Kwaliteit van de rapporttekst behouden | **Gehaald** | `C` uitgangspunt 3: driekwart blijft ongewijzigd; §4 geeft per regel een reden. Het risico dat tekstwerk de engine sloopt is correct afgedekt: `C` voegt **nieuwe** zinsbanken toe in plaats van bestaande lijsten te verlengen, en `G` §6 laat `variant-lengtes.json` elke lengtewijziging vangen. `C` §6.3 is bovendien het beste stuk van de oplevering: het toont aan dat "elke zin komt uit een score" onwaar is voor de acht beschouwingen, de Jung-passages en de fallbacks — en corrigeert de claim in plaats van hem te verdedigen. |
| 5 | SEO / JSON-LD behouden | **Gehaald** (voor de domeinfix), **gedeeltelijk** (voor de rebuild) | Zelf gevalideerd: de JSON-LD in `G-domeinfix/index.html` parseert, `@graph` bevat `WebSite` + `WebApplication` + `FAQPage`, **alle 5** `@id`/`url`-velden staan op `arcanaprofile.com`; `sitemap.xml` is valide XML met correcte namespace. Diff tegen het origineel: alleen de negen domeinen plus één toegevoegde `og:image:alt` — de statische `#root`-fallback en de `noscript` zijn byte-identiek. Voor de rebuild is het gespecificeerd (taak 11) maar nog niet gebouwd. |
| 6 | WCAG-AA gehaald | **Gedeeltelijk — ontwerp bewezen, uitvoering nog niet** | Wat aantoonbaar is: alle 14 contrastclaims in `design-tokens.css` en alle 20 in `B-moodboard.html` nagerekend en correct op twee decimalen. Alle 12 nieuwe dimensiekleuren halen AA (≥4,50) op `--bg` én op `--surface`; gemeten laagste is 4,62. Het contrastscript uit `A` §5 op `B-moodboard.html` met echte Chromium: **555 tekstknopen, 0 fouten in licht én 0 in donker.** Wat níet gehaald is: er is geen gebouwde site om op te meten, en de 18 verplichte metingen uit `G` §6 (3 schermen × 2 thema's × 3 breedtes) zijn niet gedraaid. De ΔE2000-claim klopt bovendien niet in de lichte modus (fout 1). |
| 7 | Lighthouse ≥ baseline | **Niet gehaald — wel eerlijk meetbaar gemaakt** | `A` §1 zegt expliciet dat Lighthouse in die omgeving niet betrouwbaar draaide (FCP 13,5 s was de meetopstelling) en verwijst naar de Navigation Timing API. Er is dus **geen Lighthouse-nullijn en geen eindmeting**. `A`, `D` §6 stap 0 en `G` taak 1 dragen alle drie op om PageSpeed Insights één keer te draaien en het resultaat in `docs/nulmeting.json` te plakken. Dat is niet gebeurd; het is een openstaande handeling. Wat wél meetbaar is gemaakt: de begroting in `scripts/meet-bundel.mjs` (75.000 B, vanaf taak 8 80.000 B) laat de build falen bij overschrijding. |
| 8 | Start-rate meetbaar verbeterd of testbaar gemaakt | **Gedeeltelijk — testbaar gemaakt, niet gemeten** | Er is en was geen analytics; niemand weet vandaag wat de start-rate is. `A` §4 geeft drie routes en beveelt route 1 aan (drie tellers, opt-in, alleen stap 1→2→3), `E` §4.4 schrijft de toestemmingsregel uit, `A` §6 geeft een volledig guerrilla-testprotocol van vijf deelnemers met de 5-secondentest, en `G` §2 beslispunt 2 koppelt de herocopy aan die test. `G` §3 tegenspraak 6 haalt de tellers bewust uit de dertien taken en maakt er een aparte uitlevering van. Het is dus **testbaar gemaakt en goed doordacht, maar niets is gemeten** — en `G` §2 rekent zelf voor dat er circa 2.100 bezoekers nodig zijn voor een A/B-test met drie varianten, wat de site vermoedelijk niet heeft. Een verbetering is hier vandaag niet aantoonbaar en de documenten beweren dat ook nergens. |

**Score: 4 gehaald, 3 gedeeltelijk, 1 niet gehaald.** De drie die niet volledig zijn, zijn alle
drie geblokkeerd door hetzelfde: er is geen bron-repo en dus geen gebouwde site. Dat is eerlijk
benoemd in `G` §2 beslispunt 0.

---

# 3 — Gevonden fouten, op ernst

## Ernstig

### F1 · De ΔE2000-ondergrens van het nieuwe palet klopt niet in de lichte modus
**Waar:** `design-tokens.css` §6 (regelcommentaar), `design-tokens.json` → `controle.min_deltaE2000_licht`, `B-moodboard.html` §"Het bewijs", `B-designrichting.md`.
**Wat er staat:** *"Laagste ΔE2000 over alle 66 paren en vier zichtcondities (normaal, protanopie, deuteranopie, tritanopie): 7,4 in licht en 7,4 in donker — tegen 1,4 in het huidige wiel."* Het moodboard noemt de methode erbij: Machado, Oliveira & Fernandes (2009), severiteit 1,0.
**Wat ik heb gedaan:** alle 264 metingen (66 paren × 4 condities × 2 modi) opnieuw uitgevoerd met exact die methode, twee keer — één keer met een eigen CIEDE2000-implementatie, één keer met de `colour-science`-bibliotheek. Beide geven hetzelfde. Dat het de juiste methode is, staat vast: het referentiegetal voor het oude paar `#9a9349`/`#b58b41` onder protanopie komt er op **1,41** uit, precies de 1,4 die `A` §3.9 en `B` noemen.

| | claim | gemeten | laagste paar |
|---|--:|--:|---|
| Donker | 7,4 | **7,44** ✓ | deuteranopie · emotionele gevoeligheid vs schaduwkant |
| **Licht** | **7,4** | **7,10** ✗ | deuteranopie · sociale energie `#068062` vs zelfbeeld `#ae527b` |

Ter controle: het op één na laagste lichte paar is 7,17 (protanopie, emotionele gevoeligheid vs schaduwkant). Er is dus geen afrondingsmarge die 7,10 naar 7,4 brengt.
**Wat er zou moeten staan:** `7,1 in licht en 7,4 in donker`. In `design-tokens.json` wordt `min_deltaE2000_licht: 7.1`.
**Hoe erg:** ernstig, niet inhoudelijk maar principieel. De conclusie verandert niet — het moodboard zegt zelf al, terecht, dat 7,4 "nog steeds te weinig is om een dimensie op kleur alleen te herkennen". Maar dit staat in vier bestanden, het is gepresenteerd als gemeten, het is het enige getal in werkstroom B dat ik niet kon reproduceren, en het is precies het soort getal waarop dit product zegt afgerekend te mogen worden.

### F2 · `F` verkoopt een betaalde PDF met een woordental dat 20–30 % te hoog is
**Waar:** `F-verdienmodel.md` §2.1 (*"een drukbare bladspiegel voor 7.500+ woorden"* — in de opsomming van wat de koper krijgt) en §5.1 (*"bij een ambachtelijk gezette PDF van 7.500 woorden is dat onjuist"* — als argument waarom €9 niet lager mag).
**Wat waar is:** gemeten over acht fixtures met de engine zelf: **5.711 tot 6.327 markdownwoorden**, rapportproza 5.616 tot 6.201. Dat is `G` §3 tegenspraak 1, en ik heb de onderliggende hashes en bytetellingen zelf gereproduceerd.
**Wat er zou moeten staan:** `5.700+`, conform het besluit in `G` §3.
**Hoe erg:** ernstig, en het grootste merkrisico van de hele oplevering. `G` §3 lost dit op voor de statbalk maar corrigeert `F` niet. Hier is het geen marketingregel maar een **productspecificatie van iets waar €9 voor gevraagd wordt**, én de dragende onderbouwing van de prijs. Een consument die telt, telt 6.000. Op een site waarvan de hele propositie is dat de getallen kloppen, is dat de duurste plek om het mis te hebben.

### F3 · `E` bevat nog overal plak-klare copy met `7.500+`
**Waar:** `E-usp-en-landing.md` §5.4 (de statbalkcopy, letterlijk als blokcitaat), §5.8 (de kop *"33 hoofdstukken, 7.500+ woorden"*), §1.1, §1.2 en §7.7 (actieregel *"Statbalk `5.500+` → `7.500+` · 5 minuten"*). `E` opent zelfs met een kaderblok dat de keuze expliciet verdedigt.
**Wat er zou moeten staan:** `5.700+`, met `volledig over jou` → `met de cijfers erbij`.
**Hoe erg:** ernstig, en het is een zuiver overdrachtsrisico. `G` §3 overrulet dit correct, maar `E` is nergens geannoteerd — terwijl `E` zichzelf presenteert als *"leverbare tekst: kopiëren, plakken, klaar"*. Wie `E` opslaat om de landingspagina te schrijven en `G` §3 niet ernaast legt, zet de overclaim live. `E` §7.7 stuurt daar zelfs actief op aan.

### F4 · `F` §2.1 onderbouwt een verkoopargument met een onjuist technisch feit
**Waar:** `F-verdienmodel.md` §2.1: het scorewiel *"heeft geen tekstalternatief"*, als reden waarom een vector-PDF reële waarde toevoegt.
**Wat waar is:** zelf gemeten in `app.beautified.js` rond regel 18700 — het canvas heeft `role="img"`, een `aria-label` van 270 tekens (*"Portret van … In het hart staat het hoofdprofiel …"*) en `aria-describedby="arcana-portrait-list"` naar een zichtbare lijst van twaalf rijen.
**Wat er zou moeten staan:** de overgang naar SVG blijft verdedigbaar op de drie gronden die `G` §3 tegenspraak 2 correct benoemt (vectorprint, donkere modus, ΔE) — maar niet op schermlezertoegankelijkheid.
**Hoe erg:** ernstig. `G` §3 signaleert het en zegt zelfs dat `F` "één van zijn drie argumenten verliest", maar `F` zelf blijft ongewijzigd en is het document dat naar de opdrachtgever gaat.

### F5 · `F` citeert drie keer "vier localStorage-sleutels"
**Waar:** `F-verdienmodel.md` regel 43 (in §1.1, als verifieerbaar bewijs voor de privacy-USP), regel 275 (§2.8) en regel 699 (bronnenlijst).
**Wat waar is:** **zes** — `arcana_answers`, `arcana_current_question`, `arcana_result`, `arcana_profile`, `arcana_started_at`, `arcana_completed_at`. Zelf geteld in de bundel.
**Hoe erg:** ernstig door de plaats, niet door de omvang. Regel 43 presenteert het getal als iets dat de lezer zelf kan controleren. Een verifieerbare claim die niet klopt is schadelijker dan een vage claim die niet klopt — dat is precies het argument van `E` §1.2. `E` heeft het overigens wél goed (zes).

## Middel

### F6 · `A` §2.5 telt zichzelf mis
**Waar:** `A-baseline.md` §2, punt 5: *"Vier localStorage-sleutels, verder niets"* — direct gevolgd door zes namen. `A` §7 zegt wel correct "de zes localStorage-sleutels".
**Hoe erg:** middel. Op zichzelf een slordigheid van één woord, maar het is aantoonbaar de bron van F5: `F` citeert `A` §2.5 letterlijk. `G` §3 tegenspraak 3 lost het op voor de spec, niet voor `A` zelf.

### F7 · Taak 2b heeft geen dagen, geen acceptatiecriteria en staat niet in de takentabel
**Waar:** `G-rebuild-spec.md` §1b, laatste alinea: *"Nieuw: taak 2b — de 301 instellen op `speaktoart.com` en Arcana Mirror uitzetten. Halve dag."*
**Wat er mis is:** drie dingen tegelijk. (a) De takentabel in §5 loopt van 1 tot 13 en kent geen 2b. (b) Het totaal blijft **26,5 dagen** terwijl het met 2b erbij **27,0** moet zijn; de afgeleide cijfers (24,5 geblokkeerd, 17,5 voor beslispunt 1, "ongeveer 36 werkdagen") zijn alle drie op 26,5 gebaseerd — die kloppen intern wel, maar niet meer met de scope. (c) 2b is de **enige taak zonder eigen sectie en zonder acceptatiecriteria**, terwijl alle dertien andere die wel hebben (gecontroleerd: 13/13).
**Hoe erg:** middel, en het is de scherpste uitvoerbaarheidsfout in het dossier — juist omdat §1b zelf betoogt dat 2b de op één na urgentste actie is.

### F8 · De keepsake-marge van €19 klopt niet met het eigen rekenmodel
**Waar:** `F-verdienmodel.md` §5.1 (*"marge circa €19"*), en het xlsx-tabblad `Prijsscenario's` regel 57 (*"dat de marge per boek wel klopt (circa €19)"*), plus het tabblad `Verdienmodellen`.
**Wat het model werkelijk rekent:** €39 incl. btw − 21 % btw (€6,77) − inkoop en verzending (€17, `Aannames!B22`) − transactiekosten (€0,32) = **€14,91 per boek**. Uit de cachewaarden: `C55` €14,31 ÷ `C50` 0,96 bestellingen = €14,91.
**Waar de €19 vandaan komt:** €32,23 (excl. btw) − €13,60 (alleen drukkosten) = €18,63. Dat is de marge **zonder verzending en zonder transactiekosten** — terwijl `Aannames!B22` die er expliciet in meeneemt.
**Hoe erg:** middel. 27 % te hoog, en de zin annoteert een modelregel die iets anders uitrekent. De conclusie ("de marge klopt maar het volume niet") blijft overeind, dus het is niet fataal — maar het is het enige getal in de hele werkmap dat niet uit de werkmap volgt.

### F9 · `design-tokens.json` heeft een verkeerd gelabeld veld
**Waar:** `design-tokens.json` → `controle.aantal_dimensiekleuren_onder_AA_nu: 2`.
**Wat waar is:** ik heb de twaalf oude wielkleuren nagerekend op `#fbf8f3`. **Twee** halen 3:1 niet (`#9a9349` = 2,98 en `#b58b41` = 2,94), maar **zes** halen 4,5:1 niet (daar komen `#4c8a5b` 3,89, `#75934f` 3,28, `#bf7540` 3,40 en `#b85a41` 4,33 bij). Het veld heet "onder AA" maar bevat het "onder 3:1"-getal. `A` §3.9 formuleert het wél precies goed.
**Hoe erg:** middel. Het is een machineleesbaar controlebestand; een verkeerd label daarin wordt later klakkeloos overgenomen.

### F10 · `D` §3.4 geeft een CSS-grootte die noch klopt met het bestand, noch met de eigen methode
**Waar:** `D-frontend-plan.md` §3.4: *"**[gemeten]** Nu: 52.979 B geminificeerd, 8.603 B brotli q11"*.
**Wat ik meet:** het geleverde `index-CKXF3rIk.css` is **52.359 B**, brotli q11 = **8.606 B**. De min-equiv van `app.pretty.css` — de methode die `D` elders consequent gebruikt — is 55.494 B / 8.654 B. Geen van beide is 52.979 / 8.603.
**Hoe erg:** middel. Het getal draagt geen conclusie (de netto groei van +1,8 KB blijft kloppen), maar het staat als `[gemeten]` en het **spreekt `A` §1 en `SITE-INVENTARIS.md` tegen**, die allebei correct 52,4 KB zeggen. `G` §3 merkt dat niet op.

### F11 · De README van `G-src-reconstructie/` telt zijn eigen bestanden mis
**Waar:** `G-src-reconstructie/README.md`, tabel "De zekerheidsniveaus".
**Wat er staat tegen wat ik tel:**

| Label | README | geteld |
|---|--:|--:|
| `[GEMETEN]` | 57 | 57 ✓ |
| `[AANGENOMEN]` | 4 | **3** |
| `[NIEUW]` | 18 | **17** |
| `[KLAAR]` | 6 | 6 ✓ |
| `[VERVALT]` | 2 | 2 ✓ |
| Plaatshouder `.txt` | 2 | 2, **maar die dragen zelf al een label** en worden dus dubbel geteld |

De map bevat 91 bestanden (85 gelabeld + 6 ongelabeld: README, `package.json`, `tsconfig.json`, `site.webmanifest`, `docs/nulmeting.json`, `tests/golden/…json`), niet de 90 die de README noemt. 24 mappen klopt wel.
**Hoe erg:** middel. Klein op zichzelf, maar dit is een document dat de lezer vraagt zijn telling te vertrouwen.

### F12 · Het gouden-masterbestand geeft een verkeerd `extract_bytes`
**Waar:** `G-src-reconstructie/tests/golden/gemeten-2026-09-22.json` → `"extract_bytes": 255207`.
**Wat waar is:** ik heb het extract opnieuw gemaakt met exact de code uit `D` §7.2 stap A: **255.224 bytes**. `D` zelf zegt óók 255.224. Het gouden bestand wijkt 17 bytes af van zijn eigen bron.
**Hoe erg:** middel. Alles ernaast — acht hashes, acht bytetellingen, acht archetypecombinaties, 33 secties — reproduceert perfect. Maar dit bestand is bedoeld als de onaantastbare referentie van het hele project; daar hoort geen enkel getal in te staan dat niet reproduceert.

### F13 · De achtste fixture heet in twee bestanden anders
**Waar:** `D` §7.2 noemt hem `H-alles-hoogst-optieB`; `tests/golden/gemeten-2026-09-22.json` noemt hem `H-hoogst-optieB`.
**Hoe erg:** middel. `D` §7.2 stap C beschrijft een test die per fixture op `f.naam` itereert — die faalt hierop, of erger, slaat hem stil over.

### F14 · De reconstructie verwijt `A` iets dat `A` al gecorrigeerd heeft
**Waar:** `G-src-reconstructie/src/components/report/ScoreWheel.tsx`: *"A §3.6 stelt ten onrechte dat er geen tekstalternatief is."*
**Wat waar is:** `A` §3.6 bevat een expliciet correctieblok (*"Correctie na nadere analyse (werkstroom D)"*) dat precies dit rechtzet. De opmerking is dus achterhaald en zaait twijfel over een document dat op dat punt klopt.
**Hoe erg:** middel-laag.

## Klein

| # | Waar | Wat er staat | Wat waar is |
|---|---|---|---|
| F15 | `design-tokens.css` §2 | `--ink-inverse-soft: #cbbfab` → *9,07 op `--bg-ink`* | **9,00**. De enige van 14 contrastclaims in dat bestand die afwijkt. |
| F16 | `design-tokens.css` §7 | *"De huidige CSS heeft 68 losse font-size-waarden zonder onderling verband"* | Ik tel **58** unieke waarden (102 declaraties) in `app.pretty.css`. Mogelijk een andere telmethode, maar niet reproduceerbaar. |
| F17 | `D` §3.2, besparingstabel | De correctieregel heet *"landing.js blijft nodig, dus netto op 139,5 → 68,9"* | Het getal (−70,6) klopt, het label niet. De 6,3 KB die daar verdwijnt is de compressie-overhead van zeven losse chunks — wat `D` zelf twee alinea's verderop correct uitlegt als "+6,4 KB". |
| F18 | `D` §3.1 | *"Optelsom over alles: 534.838 B tegenover de werkelijke 484.329"* | De tabel telt **exact** op tot 534.838 ✓, maar met een rechttoe-rechtaan strip kom ik op 534.914. De strip-definitie is niet gedocumenteerd, dus het totaal is niet onafhankelijk reproduceerbaar. |
| F19 | `D` §3.1, blokindeling | Blok 1 eindigt op 12573, blok 2 begint op 12577 | Regels 12574–12576 (de constructor `d()`) zijn ongedekt. Verder dekt de tabel alle 20.744 regels. |
| F20 | `B-moodboard.html` | Zie §6 hieronder | Niet zelfstandig: drie externe PNG's + twee Google-Fonts-verzoeken. |
| F21 | `SITE-INVENTARIS.md`, `A`, `design-tokens.css` | Dimensie 8 heet "schaduwkant" | De bundel gebruikt in de kernpatroontekst *"je schaduwpatroon"* (`shadowPattern`). Beide vormen komen in de oplevering voor. |
| F22 | `A` §2.6 | *"7 hoofdsecties, 37 subkoppen"* | De bundel heeft **6** delen (`wie-je-bent` t/m `je-actieplan`) plus het `hero`-hoofdstuk dat buiten de inhoudsopgave valt. Klopt als je hero meetelt; dat staat er niet bij. |

---

# 4 — Niet-opgeloste tegenspraken

`G-rebuild-spec.md` §3 lost negen tegenspraken op en doet dat goed — ik heb de vier
belangrijkste nagerekend (woordental, localStorage-sleutels, tekstalternatief canvas,
bundelcijfers) en de resolutie klopt telkens. Wat er **niet** in staat:

**T1 · De inspanningsschatting wordt nergens overgedragen.** `D` §6.1 sluit af met 23,5 dagen
basis en *"ongeveer 31 dagen voor één ontwikkelaar"*. `G` §5 komt op 26,5 en *"ongeveer 36
werkdagen"*. Beide rekenen intern correct (×1,35), en `G` is aantoonbaar de superset: 23,5 +
taak 12 (2,5, nieuw) + de verruiming van taak 11 van 1,0 naar 1,5 = 26,5. Maar **geen van beide
documenten zegt dat `G` `D` vervangt**, en §3 behandelt het niet. Een lezer die `D` opslaat als
planningsdocument begroot 31 dagen voor 36 dagen werk. Tel daar taak 2b bij op (F7) en het is
27,0 basis, circa 36,5.

**T2 · Het woordental is maar voor één van de zes vindplaatsen opgelost.** §3 tegenspraak 1
beslist correct dat de statbalk `5.700+` wordt. Niet aangeraakt: `E` §1.1, §1.2, §5.4, §5.8 en
§7.7 (F3), `F` §2.1 en §5.1 (F2). En binnen `B` staan **twee verschillende getallen naast
elkaar**: §2 gebruikt 7.559 als argument voor de regellengte en de donkere modus, terwijl §3
(regel 619) het statbalkontwerp nog met `5.500+` tekent. Geen van beide is het besloten getal.

**T3 · De CSS-grootte.** `A` §1 en `SITE-INVENTARIS.md`: 52,4 KB raw. `D` §3.4: 52.979 B. Het
echte bestand is 52.359 B. Niet gesignaleerd in §3. (Zie F10.)

**T4 · De ΔE2000-methode is niet consistent gedocumenteerd.** `B-moodboard.html` noemt Machado
2009 severiteit 1,0. `design-tokens.json` noemt hem ook. `design-tokens.css` en
`B-designrichting.md` noemen alleen het getal. Ik heb kunnen vaststellen dat het inderdaad
Machado op **lineaire** RGB is (dat is de enige variant die de referentiewaarde 1,41 voor het
oude paar oplevert) — maar dat staat nergens, en op gamma-RGB toegepast komen dezelfde matrices
op heel andere uitkomsten (licht 6,54, donker 5,67). Zonder die ene regel is het getal niet
navolgbaar. (Zie F1.)

**T5 · Het aantal FAQ-vragen is intern consistent maar telt door in de teksten.** De JSON-LD
heeft 5 vragen, de pagina 8, en `E` §7.4 wil naar 9 omdat `E` er zelf één toevoegt. `G` taak 11
zegt correct *"van 5 naar 9"*. Dit is dus **géén fout** — maar het is de enige plek waar drie
verschillende getallen in de oplevering staan zonder dat §3 ze aan elkaar knoopt, en de regel
"alleen vragen die letterlijk op de pagina staan" maakt taak 11 afhankelijk van taak 8. Die
afhankelijkheid staat er wel (taak 11 → "taak 8 en 10"), dus het is afgedekt. Ik noem het hier
alleen omdat het bij oppervlakkig lezen als tegenspraak leest.

---

# 5 — Wat ontbreekt ten opzichte van de opdracht

De deliverable-checklist was: A-baseline · B-designrichting + beelden + tokens ·
C-tekst-en-rapport · D-frontend-plan · E-usp-en-landing · F-verdienmodel + pricing-xlsx ·
G-rebuild-spec + preview-deploy.

| Deliverable | Status |
|---|---|
| A-baseline | **Aanwezig**, op één telfout na (F6) en met Lighthouse eerlijk als openstaand gemarkeerd |
| B-designrichting | **Aanwezig**, 783 regels, drie volledig uitgewerkte richtingen |
| B-beelden | **Aanwezig** — drie hero's van 2400×1000, visueel duidelijk onderscheiden (gemiddelde helderheid 236 / 24 / 241), plus een moodboard en een beeldfilosofie |
| B-tokens | **Aanwezig** in CSS én JSON, onderling exact consistent (alle hexwaarden, luminanties en contrasten gecontroleerd: 0 afwijkingen tussen de twee bestanden) |
| C-tekst-en-rapport | **Aanwezig**, 1.798 regels |
| D-frontend-plan | **Aanwezig**, 2.253 regels, en het best onderbouwde document van de zeven |
| E-usp-en-landing | **Aanwezig**, 2.220 regels — maar met achterhaalde copy (F3) |
| F-verdienmodel | **Aanwezig** in md én docx. De docx is een leesbare beslisnotitie van 1.181 woorden over 2 pagina's; ik heb hem met LibreOffice naar PDF omgezet en gecontroleerd — niets loopt over, de drie tabellen renderen, de percentages (71 % / 8 % / 39 %) komen exact uit het xlsx |
| F-pricing-xlsx | **Aanwezig en echt.** Vier tabbladen, **alle rekencellen zijn werkelijke formules** met `=Aannames!B6`-verwijzingen, één invoertabblad, cachewaarden aanwezig. Alle drie de scenario's met de hand nagerekend: 0,405 × (9/1,21 − 0,32) = €2,88 ✓, 9,6 × 7,118 = €68,33 ✓, netto/jaar €864 ✓, terugverdientijd 3.000/71,96 = 42 maanden ✓, benodigde bezoekers 260/0,04098 = 6.344 ✓. Segmentaandelen tellen op tot 100 %, gewichten tot 100 %, en het hoogst scorende model (0,7125) is inderdaad het model dat PRIMAIR heet |
| G-rebuild-spec | **Aanwezig**, 1.519 regels, 13 taken met 13/13 acceptatiecriteria |
| **G-preview-deploy** | **ONTBREEKT.** `G` §8 specificeert hem volledig (Vercel, branchstrategie, `VITE_SITE_URL` op preview met de juiste waarschuwing over `X-Robots-Tag: noindex`, deploy-checklist) maar er is geen draaiende preview en geen URL. Oorzaak is eerlijk benoemd: er is geen bron-repo (`G` §2 beslispunt 0) |

**Verder ontbrekend:**

1. **De Lighthouse/PageSpeed-nullijn.** Drie documenten dragen op hem te draaien; hij is niet gedraaid. Zonder nullijn is "Lighthouse ≥ baseline" bij oplevering niet te beoordelen.
2. **De gebruikerstest.** `A` §6 beschrijft vijf deelnemers en een compleet script, en `A` zegt zelf *"doe de eerste ronde vóór fase G bouwt"*. Niet gedaan. Beslispunt 2 (de herocopy) hangt er expliciet aan.
3. **Werkende broncode.** `G-src-reconstructie/` is **geen reconstructie**: 91 bestanden waarvan de grootste bronfile 374 bytes is, elk met één tot vier regels commentaar die naar een regelbereik in de bundel wijzen. De README is hier volstrekt eerlijk over (*"Geen werkende code. Geen enkel bestand bevat implementatie. Je kunt dit niet bouwen en je moet het ook niet proberen."*) en dat is de juiste keuze — maar de **mapnaam suggereert iets anders**, en dat is het eerste wat een opdrachtgever ziet. Hernoem hem naar `G-src-kaart/` of `G-bronstructuur/`.
4. **Een fixture met gedeeltelijke invulling.** `G` §3 tegenspraak 1 zegt zelf: *"Vóór publicatie: voeg een fixture toe met 70 % invulgraad en controleer of de ondergrens houdt."* Dat is niet gebeurd, terwijl het getal `5.700+` er rechtstreeks aan hangt. Ik kan bevestigen dat het openstaat: alle acht gemeten fixtures hebben `completionRate: 1`.

---

# 6 — Het moodboard, apart beoordeeld

| Controle | Uitkomst |
|---|---|
| Alle drie de richtingen aanwezig? | **Ja** — Perkament & Diepte, Nacht & Goud, Warm & Nabij, elk met hero, idee, palet, typografie, kaart, dimensiewiel en een "voor wie · risico · kosten"-blok, plus een gezamenlijke bewijssectie en een advies |
| Contrastscript uit `A` §5 erop gedraaid? | **Ja**, met echte Chromium via Playwright, 1440 px breed. **Licht: 555 tekstknopen, 0 fouten. Donker: 555 tekstknopen, 0 fouten.** |
| Kloppen de beweerde contrastwaarden in de pagina zelf? | **Ja, alle twintig, op twee decimalen.** Ik heb ze per richting nagerekend tegen de juiste basis- en bandkleur van díé richting — inclusief de donkere richting, waar `--ink #ece6f2` op `#0e0d14` inderdaad 15,80 geeft en `--gold-deep #bd8d3c` op de band `#2b2540` inderdaad 4,88. **0 afwijkingen.** |
| Werkt hij zelfstandig? | **Nee, niet helemaal.** Zie hieronder. |

**Wat er aan zelfstandigheid ontbreekt.** Geen JavaScript, geen `@import`, geen `url()` — in
zoverre is hij schoon. Maar er zijn twee soorten externe afhankelijkheid:

1. **Drie relatieve PNG-verwijzingen** (`B-hero-a-perkament-en-diepte.png` en twee andere). Die
   staan in dezelfde map, dus het werkt zolang de hele map meegaat. Verstuurt iemand het ene
   HTML-bestand per mail of upload hij het los, dan zijn de drie hero's — het belangrijkste
   beoordelingsmateriaal — leeg. De bestanden zijn samen 4,5 MB; inline als data-URI zou de
   pagina ongeveer 6 MB maken. Dat is een afweging, geen fout, maar hij is niet gedocumenteerd.
2. **Twee Google-Fonts-verzoeken** (`fonts.googleapis.com` + `fonts.gstatic.com`, voor Cormorant
   Garamond en Fraunces). Zonder netwerk valt de typografie terug op systeemfonts — en juist bij
   richting (c), waar Fraunces een dragend onderdeel van het voorstel is, beoordeelt de
   opdrachtgever dan iets anders dan bedoeld. Bij een klant achter een streng netwerk of bij
   offline bekijken is dat een reëel risico.

**Advies:** zet er één regel bovenaan: *"open dit bestand vanuit de map waarin het staat, met
internetverbinding."* Dat kost niets en haalt het risico weg.

---

# 7 — Wat er vóór oplevering moet gebeuren

1. **Corrigeer `7.500` naar `5.700+` in `F` §2.1 en §5.1 en in alle vijf de plekken in `E`
   (§1.1, §1.2, §5.4, §5.8, §7.7).** Dit is het grootste merkrisico van de oplevering en het is
   een zoek-en-vervang. Zet in beide documenten een kaderregel bovenaan die naar `G` §3
   tegenspraak 1 verwijst, zodat de correctie ook overleeft als iemand alleen `E` openslaat.
2. **Corrigeer de ΔE2000-claim naar `7,1 in licht / 7,4 in donker`** in `design-tokens.css` §6,
   `design-tokens.json` → `controle.min_deltaE2000_licht`, `B-moodboard.html` en
   `B-designrichting.md`. Voeg in alle vier één regel toe die de methode volledig vastlegt:
   *"Machado/Oliveira/Fernandes 2009, severiteit 1,0, matrix toegepast op lineaire RGB, afstand
   CIEDE2000, D65."* Zonder die regel is het getal niet navolgbaar.
3. **Herschrijf de scorewiel-passage in `F` §2.1.** Het canvas hééft een tekstalternatief. Voer
   de drie geldige argumenten uit `G` §3 tegenspraak 2 op (vectorprint, donkere modus, ΔE) en
   haal het vierde eruit.
4. **Vervang "vier localStorage-sleutels" door "zes"** op de drie plekken in `F` en corrigeer
   `A` §2.5, zodat de bron van de fout ook weg is.
5. **Geef taak 2b een eigen sectie in `G` §5**, met acceptatiecriteria (301 met padbehoud
   getest op minstens drie paden, Arcana Mirror uit, adreswijziging ingediend), en zet hem in de
   takentabel. Herzie het totaal naar **27,0 dagen basis / circa 36,5 werkdagen**.
6. **Zet één regel in `D` §6.1** die zegt dat `G` §5 de definitieve planning is en dat de 23,5 /
   31 dagen daar zijn vervangen door 26,5 / 36 — anders begroot iemand op het verkeerde document.
7. **Corrigeer de kleine getallen:** `extract_bytes` naar **255224** in het gouden bestand;
   fixture-naam naar `H-alles-hoogst-optieB`; `aantal_dimensiekleuren_onder_AA_nu` naar **6** (of
   hernoem het veld naar `_onder_3_1_nu`); `--ink-inverse-soft` naar **9,00**; de CSS-grootte in
   `D` §3.4 naar **52.359 B / 8.606 B brotli q11**; de labeltelling in de README van
   `G-src-reconstructie` naar 3 `[AANGENOMEN]` en 17 `[NIEUW]`; het aantal bestanden naar 91.
8. **Hernoem `G-src-reconstructie/` naar `G-bronstructuur/`** en zet de zin *"geen werkende
   code"* uit de README ook in de mapnaam of in een `LEESMIJ-EERST.txt`. Haal de achterhaalde
   opmerking over `A` §3.6 uit `ScoreWheel.tsx`.
9. **Draai PageSpeed Insights één keer op `arcanaprofile.com`** en plak het resultaat in
   `A` §1 en `docs/nulmeting.json`. Zonder dat is "Lighthouse ≥ baseline" bij eindoplevering
   niet te beoordelen — en het kost tien minuten.
10. **Voeg de 70 %-invulgraadfixture toe** en controleer of `5.700+` standhoudt, precies zoals
    `G` §3 zelf voorschrijft. Doe dit vóórdat het getal op de site komt, niet erna.
11. **Zet één regel bovenaan `B-moodboard.html`**: open vanuit de map, met internetverbinding.
12. **Lever `G-domeinfix/` vandaag uit.** Dat deel is af, nagerekend en waterdicht: elf
    voorkomens correct geteld en alle elf geraakt, de diff bevat niets anders dan de negen
    domeinen plus een toegevoegde `og:image:alt`, de JSON-LD en de XML valideren, en
    `check-domains.mjs` slaagt op de gecorrigeerde map en faalt met exit 1 op de originele build.
    Er is geen reden om dit op de rest te laten wachten.

---

## Wat ik niet heb kunnen verifiëren

Eerlijkheidshalve expliciet, in plaats van het als goed te beoordelen:

- **Alle live-metingen in `A` §1** — TTFB 1.202 ms, DOM interactive 1.225 ms, 317 DOM-nodes,
  paginahoogte 7.083 px en 21.716 px, 175 en 518 tekstknopen, de wachttijd van >10 s. Daar is
  een draaiende site voor nodig; die heb ik niet. De cijfers die ik wél kon narekenen uit
  dezelfde meetsessie (bundelgroottes, fontbytes, 5 `prefers-reduced-motion`-regels, 0
  `prefers-color-scheme`-regels, de contrastwaarden van het oude wiel) kloppen allemaal exact,
  wat het vertrouwen in de rest verhoogt maar niet vervangt.
- **De brotli-waarde van 139,5 KB over de lijn.** Mijn eigen brotli q11 geeft 125.746 B; op
  kwaliteit 5 geeft hij 139.326 B, wat de meting sterk ondersteunt (Hostinger draait vermoedelijk
  q5). Maar ik heb de server-header niet gezien.
- **De 9.163 B / 2.176 B voor `design-tokens.css` in `D` §3.4.** Met een eenvoudige
  commentaarstrip kom ik op 11.121 B / 2.354 B. Een echte minifier haalt meer weg, dus het getal
  is plausibel — maar niet reproduceerbaar zonder te weten welke minifier.
- **Alle concurrentieprijzen in `E` §2 en `F` §5.1** (123test €14,95, Testcentrum Groei €17,50,
  16personalities €29, Truity $9, Enneagram RHETI $20, NOA MPT-BS €24,95), het Mollie-tarief van
  €0,32, de print-API-tarieven en de benchmarks van Artisan Growth Strategies, Funraise en
  Overney e.a. Geen uitgaand verkeer beschikbaar. Deze cijfers dragen de prijsstelling en de
  conversie-aanname; laat ze door iemand met internettoegang steekproefsgewijs narekenen.
- **Wat `speaktoart.com` vandaag serveert** (`G` §1b, "Arcana Mirror"). Om dezelfde reden niet
  te controleren. Omdat de aanbeveling voor taak 2b — een 301 en een site uitzetten —
  volledig op die waarneming rust, is dit de openstaande bevinding met de grootste
  gevolgen per regel tekst. Laat het bevestigen vóór taak 2b wordt uitgevoerd.
- **De visuele kwaliteit van de drie designrichtingen.** Ik heb vastgesteld dat de hero's
  bestaan, 2400×1000 zijn, geldige PNG's zijn en duidelijk van elkaar verschillen, en ik heb
  richting (a) bekeken — die is van hoog niveau en sluit aan op `B-beeldfilosofie.md`. Maar
  "is dit de juiste richting voor dit merk" is een oordeel dat bij de opdrachtgever hoort, en
  `A` §6 en `G` beslispunt 2 leggen daar terecht een gebruikerstest onder.

---

# Doorgevoerde correcties

**Uitgevoerd 22-09-2026, na en op grond van bovenstaand controlerapport.** Alles hieronder is
eerst nagerekend en daarna pas gewijzigd. De bestanden zijn bewerkt, niet herschreven.

## 1 · Het woordental van het rapport: `7.500+` → `5.700+`

Basis: `G-rebuild-spec.md` §3 tegenspraak 1 (gemeten 5.711–6.327 markdownwoorden over acht
fixtures). De 7.559 uit `A` §1 is de volledig gerenderde pagina en mag als zodanig blijven staan,
mits erbij staat waar het over gaat — dat is overal toegevoegd.

| Bestand | Plek | Oud | Nieuw |
|---|---|---|---|
| `E-usp-en-landing.md` | inleidend kaderblok | verdedigt `7.500+` als keuze | verklaart waarom het `5.700+` wordt, met de meting erbij |
| `E-usp-en-landing.md` | §1.1 vergelijkingstabel | `33 hoofdstukken, 7.500+ woorden` | `… 5.700+ woorden` |
| `E-usp-en-landing.md` | §1.2 | `7.500 woorden lang is` | `5.700 woorden lang is` |
| `E-usp-en-landing.md` | §1.2 ASCII-diagram | `7.500+ woorden` | `5.700+ woorden` |
| `E-usp-en-landing.md` | §5.4 statbalkcopy | `**7.500+** woorden` | `**5.700+** woorden`, met verwijzing naar `G` §3 boven het blokcitaat |
| `E-usp-en-landing.md` | §5.4 toelichting | `"7.500+ woorden, met de cijfers erbij"` | `"5.700+ woorden, …"` |
| `E-usp-en-landing.md` | §5.8 kop | `## 33 hoofdstukken, 7.500+ woorden` | `## 33 hoofdstukken, 5.700+ woorden` |
| `E-usp-en-landing.md` | §7.5 | `Het `7.500+`-probleem` | `Het woordental-probleem` |
| `E-usp-en-landing.md` | §7.6 (voorbeeldrapport) | `circa 7.500 woorden` · `7.500 woorden echte inhoud` | `circa 5.700` · `5.700 woorden echte inhoud` |
| `E-usp-en-landing.md` | §7.7 actieregel P2 | `Statbalk 5.500+ → 7.500+` | `Statbalk 5.500+ → 5.700+` |
| `F-verdienmodel.md` | §2.1 | `drukbare bladspiegel voor 7.500+ woorden` | `… voor 5.700+ woorden over 33 hoofdstukken` |
| `F-verdienmodel.md` | §5.1 | `ambachtelijk gezette PDF van 7.500 woorden` | `… van 5.700+ woorden over 33 hoofdstukken` |
| `F-verdienmodel.md` | §3 besluitkader | `een drukbare bladspiegel` | `een drukbare bladspiegel voor 5.700+ woorden` |
| `F-verdienmodel.docx` | §2 Het besluit | `een drukbare bladspiegel` | `… voor 5.700+ woorden` |
| `F-verdienmodel.docx` | §4 Prijsindicatie | *(geen woordental)* | `Het rapport telt 5.700+ woorden (gemeten 5.711–6.327), niet 7.500.` |
| `C-tekst-en-rapport.md` | §4 rij 9 + §6.3 actie | `7.500+` als advies | `5.700+`, met de bijstelling en de reden erbij |
| `A-baseline.md` | §1 tabel, §2.6, §3.8 | `7.559 woorden` zonder duiding | `7.559 woorden op de volledig gerenderde pagina`, met de 5.711–6.327 erbij |

**De prijsonderbouwing van €9 houdt stand, en dat is expliciet gecontroleerd en opgeschreven.**
In `F` §5.1 staat nu een kaderblok dat uitlegt waarom: het plafond van €12 komt uit de ankers
(123test €14,95 met normgroep), niet uit de lengte, en is dus lengte-onafhankelijk; de ondergrens
rust op wat er gezet wordt, en 5.700 woorden over 33 hoofdstukken blijft een document van
tientallen pagina's — ruim boven de 17 pagina's van Truity (circa $9). De prijs is daarom niet
gewijzigd. Wél is er in de docx één regel bijgekomen die het getal noemt, zodat de beslisnotitie
die naar de opdrachtgever gaat hetzelfde getal draagt als de site.

**`F-pricing-segmenten.xlsx`:** `7.500` kwam er niet in voor. Wel gecontroleerd, alle vier de
tabbladen, formules én cachewaarden.

## 2 · De ΔE2000-claim: `7,4 in licht` → `7,1 in licht` (7,44 in donker blijft)

**Zelf nagerekend, met een eigen script, vóór het overnemen.** Eigen CIEDE2000-implementatie plus
de Machado/Oliveira/Fernandes-matrices (2009, severiteit 1,0), toegepast op **lineaire** RGB,
D65. Eerst geijkt op de referentiewaarde: het oude paar `#9a9349`/`#b58b41` onder protanopie geeft
**1,409** — dat is de 1,4 uit `A` §3.9 en `B`, dus de methode klopt. Op gamma-RGB geeft datzelfde
paar 1,549, wat de methodekeuze bevestigt.

Daarna alle 2 × 264 metingen (66 paren × 4 zichtcondities × 2 modi):

| Zichtconditie | Licht (claim) | Licht (gemeten) | Donker (claim) | Donker (gemeten) |
|---|--:|--:|--:|--:|
| normaal | 8,4 | **8,44** ✓ | 8,8 | **8,77** ✓ |
| protanopie | 7,9 | **7,17** ✗ | 9,8 | **9,78** ✓ |
| deuteranopie | 7,4 | **7,10** ✗ | 7,5 | **7,44** ✗ |
| tritanopie | 7,4 | **7,37** ✓ | 7,4 | **7,49** ✗ |
| **laagste over alles** | **7,4** | **7,10** ✗ | **7,4** | **7,44** ✓ |

Het controlerapport wordt dus bevestigd (licht 7,10, donker 7,44), en er kwamen drie extra
afwijkingen in de per-conditie-tabel van `B-designrichting.md` §3.4 bij die het rapport niet
apart noemde: protanopie licht stond op 7,9 in plaats van 7,17, en de twee donkere waarden voor
deuteranopie en tritanopie stonden verwisseld (7,5 / 7,4 in plaats van 7,44 / 7,49). Die zijn
meegecorrigeerd, in twee decimalen, omdat ze uit dezelfde meting komen.

| Bestand | Oud | Nieuw |
|---|---|---|
| `design-tokens.css` §6 | `7,4 in licht en 7,4 in donker` | `7,1 in licht (7,10) en 7,4 in donker (7,44)`, plus de volledige methoderegel |
| `design-tokens.json` | `"min_deltaE2000_licht": 7.4` | `7.1`, plus nieuw veld `"deltaE2000_methode"` met methode, laagste paren en ijkwaarde |
| `B-moodboard.html` "Het bewijs" | `ΔE2000 = 7,4 in beide modi` | `7,1` licht / `7,4` donker, met het laagste paar per modus en de methoderegel |
| `B-designrichting.md` §3.4 tabel | 8,4 / 7,9 / 7,4 / 7,4 · 8,8 / 9,8 / 7,5 / 7,4 | 8,44 / 7,17 / 7,10 / 7,37 · 8,77 / 9,78 / 7,44 / 7,49 |
| `B-designrichting.md` §3.4 proza | zwakste donkere paar: *Zelfbeeld*/*Schaduwkant* onder tritanopie (7,4) | *Emotionele gevoeligheid*/*Schaduwkant* onder **deuteranopie** (7,44) — het oude paar is met 7,49 pas het op één na laagste |
| `B-designrichting.md` §5 tabel | `7,4 (beide modi)` | `7,1 licht · 7,4 donker` |
| `B-designrichting.md` §6 punt 7 | `7,4 ΔE is beter, niet genoeg` | `7,1 ΔE is beter, niet genoeg` |
| `D-frontend-plan.md` §5.1 | `tegen 7,4 voor het nieuwe systeem` | `tegen 7,1 in licht en 7,4 in donker`, met methode |
| `G-rebuild-spec.md` §4 tabel | `7,4 in beide modi` | `7,1 in licht · 7,4 in donker` |
| `G-rebuild-spec.md` taak 4, acceptatiecriteria | `≥ 7,4` | `≥ 7,1 in licht en ≥ 7,4 in donker`, met de ijkinstructie op 1,41 |

**De methoderegel is in alle vier de bestanden toegevoegd**, zoals §7 punt 2 vraagt: *Machado,
Oliveira & Fernandes (2009), severiteit 1,0, matrix toegepast op lineaire RGB, afstand CIEDE2000,
witpunt D65.* Zonder die regel is het getal niet navolgbaar; op gamma-RGB komen dezelfde matrices
op heel andere uitkomsten.

De conclusie verandert niet en is nergens afgezwakt: ruim 7 ΔE is een verbetering met factor
vijf en nog steeds te weinig om een dimensie op kleur alleen te herkennen.

## 3 · Het scorewiel hééft een tekstalternatief — het verkoopargument is herbouwd

Het canvas heeft `role="img"`, een `aria-label` van 270 tekens en `aria-describedby` naar een
zichtbare lijst van twaalf rijen. Dat is geen tekortkoming en dus geen verkoopargument. De
passages die daarop leunden zijn herschreven op de drie tekortkomingen die er wél zijn:
**rastering op schermresolutie bij print en PDF-export**, **labels die pixels zijn en dus niet
selecteerbaar of doorzoekbaar**, en **niet meeschalen met de browserzoom**.

| Bestand | Plek | Oud | Nieuw |
|---|---|---|---|
| `F-verdienmodel.md` | §2.1 | *"geen tekstalternatief heeft"* als reden voor de PDF | expliciete passage dat het tekstalternatief er is en géén argument is, plus de drie echte gronden en de twee extra uit `G` §3 tegenspraak 2 (donkere modus, ΔE) |
| `F-verdienmodel.md` | §3 besluitkader | `het scorewiel als vector` | `… (vectorprint, selecteerbare labels, zoomvast — níet: een tekstalternatief, dat heeft het canvas al)` |
| `F-verdienmodel.md` | §6 stap 5 | *"staat al op de lijst als toegankelijkheidsfout"* | *"staat al op de lijst als printfout"*, met de drie gronden en de kanttekening over het tekstalternatief |
| `F-verdienmodel.md` | bronnenlijst | `§3.6 (canvas-scorewiel)` | `… inclusief het correctieblok: het wiel hééft een tekstalternatief` |
| `F-verdienmodel.docx` | §2 Het besluit | *"repareert onderweg een toegankelijkheidsfout"* | *"repareert onderweg een printfout"*, met de drie gronden en de kanttekening |
| `B-designrichting.md` | §5 tabel | rij *"Scorewiel voor schermlezers · `<canvas>`, bestaat niet"* | rij *"Scorewiel in print en PDF"*, met de drie echte tekortkomingen en de vermelding dat het tekstalternatief er wél is |
| `G-bronstructuur-kaart/src/components/report/ScoreWheel.tsx` | commentaar | *"A §3.6 stelt ten onrechte dat er geen tekstalternatief is"* | `A` §3.6 heeft dat zelf al gecorrigeerd; het commentaar noemt nu wat de SVG-overgang wél repareert (F14) |

## 4 · Vier → zes localStorage-sleutels

De zes zijn `arcana_answers`, `arcana_current_question`, `arcana_result`, `arcana_profile`,
`arcana_started_at`, `arcana_completed_at`.

| Bestand | Plek | Oud | Nieuw |
|---|---|---|---|
| `F-verdienmodel.md` | §1.1 (regel 43) | `vier localStorage-sleutels` | `zes`, met alle zes bij naam genoemd, zodat de claim werkelijk verifieerbaar is |
| `F-verdienmodel.md` | §2.8 (regel 275) | `vier localStorage-sleutels` | `zes` |
| `F-verdienmodel.md` | bronnenlijst (regel 699) | `vier localStorage-sleutels` | `zes` |
| `F-pricing-segmenten.xlsx` | `Verdienmodellen!H20` | `A-baseline §2.5: vier localStorage-sleutels` | `A-baseline §2.5 en §7: zes localStorage-sleutels` |
| `A-baseline.md` | §2, punt 5 | *"Vier localStorage-sleutels, verder niets"* — met zes namen eronder | *"Zes localStorage-sleutels, verder niets"* (F6 — de bron van F5) |

In `F-verdienmodel.docx` komt het getal niet voor; niets te corrigeren.

## 5 · Taak 2b in `G-rebuild-spec.md`

Taak 2b heeft nu dezelfde opbouw als de andere dertien: een eigen sectie direct na taak 2, met
kop (`## Taak 2b — De 301 en Arcana Mirror · 0,5 dag · risico: laag · volledig zonder repo`),
*Waarom hier*, *Volgorde*, *Wat er gebeurt op bestandsniveau*, *Brondocumenten*,
**acceptatiecriteria**, *Terugrol-optie* en *Afhankelijkheden*. De acceptatiecriteria zijn de drie
die §7 punt 5 voorschrijft, uitgewerkt tot toetsbare regels: de 301 met padbehoud op **minstens
drie paden** (elk met de `curl`-regel erbij en de expliciete eis dat geen pad op de wortel mag
uitkomen), één hop voor `www.` en `http://`, **Arcana Mirror aantoonbaar uit**, de
**adreswijziging ingediend** in Search Console met de datum in `docs/nulmeting.json`, en de
deelkaartcaches opnieuw opgehaald.

| Getal | Oud | Nieuw |
|---|--:|--:|
| Basistotaal (§5 takentabel én §1 samenvatting) | 26,5 dagen | **27,0 dagen** |
| Met test- en terugkoppelopslag (×1,35) | ongeveer 36 werkdagen | **ongeveer 36,5 werkdagen** |
| Geblokkeerd (taak 4 t/m 13) | 24,5 van de 26,5 | 24,5 van de **27,0** |
| Gebonden aan beslispunt 1 | 17,5 van de 26,5 (2×) | 17,5 van de **27,0** |
| Cumulatieve kolom, taak 3 t/m 13 | 2,0 … 26,5 | 2,5 … **27,0** (alles +0,5) |
| Inleiding §5 | *"Dertien taken"* | *"Veertien taken (dertien genummerd plus taak 2b)"* |

De alinea in §1b die 2b introduceerde verwijst nu naar die sectie en noemt het nieuwe totaal.

## 6 · De kleine getallen — elk nagerekend vóór de wijziging

| # | Bestand | Oud | Nieuw | Hoe nagerekend |
|---|---|--:|--:|---|
| 1 | `G-bronstructuur-kaart/tests/golden/gemeten-2026-09-22.json` → `extract_bytes` | 255207 | **255224** | De knipcode uit `D` §7.2 stap A letterlijk in Node gedraaid op `app.beautified.js`: `Buffer.byteLength` = 255.224. Gelijk aan wat `D` zelf zegt. |
| 2 | `G-bronstructuur-kaart/tests/golden/…json` + `G-rebuild-spec.md` §4 | `H-hoogst-optieB` | **`H-alles-hoogst-optieB`** | Naam uit `D` §7.2 stap B; de test in stap C itereert op `f.naam` (F13). Op beide plekken gelijkgetrokken. |
| 3 | `design-tokens.json` → `aantal_dimensiekleuren_onder_AA_nu` | 2 | **6**, plus nieuw veld `aantal_dimensiekleuren_onder_3_1_nu: 2` | Twaalf oude wielkleuren op `#fbf8f3` nagerekend: 2 onder 3:1, 6 onder 4,5:1. Het veld heette "onder AA" en bevatte het 3:1-getal; nu staan beide er los in, correct gelabeld (F9). |
| 4 | `design-tokens.css` §2 → `--ink-inverse-soft` | 9,07 | **9,00** | `#cbbfab` op `--bg-ink #241f1a`: relatieve luminantie → contrast 9,0049 (F15). |
| 5 | `D-frontend-plan.md` §3.4 én §2.1-tabel | 52.979 B / 8.603 B | **52.359 B / 8.606 B** | Het geleverde `index-CKXF3rIk.css` gemeten: 52.359 B; brotli q11 = 8.606 B. Lost tegelijk T3 op (`A` §1 en `SITE-INVENTARIS.md` zeiden al correct 52,4 KB). De drie JS-totalen in §2.1 (227.309 / 79.160 / 228.445) zijn gecontroleerd en veranderen hier niet door — 227.309 telt exact op uit de "blijft"-rijen, en de CSS-rij zit niet in het 79.160-bedrag. |
| 6 | `G-bronstructuur-kaart/README.md`, labeltabel | 4 `[AANGENOMEN]`, 18 `[NIEUW]` | **3** en **17** | Alle 91 bestanden gescand op het label in de kopregel: GEMETEN 57, AANGENOMEN 3, NIEUW 17, KLAAR 6, VERVALT 2 = 85 gelabeld. Geen bestand draagt twee labels. |
| 7 | `G-bronstructuur-kaart/README.md`, aantal bestanden | 90 | **91** gekarteerd (+ `LEESMIJ-EERST.txt` = 92) | Geteld: 91 bestanden, waarvan 6 ongelabeld (`README.md`, `package.json`, `tsconfig.json`, `public/site.webmanifest`, `docs/nulmeting.json`, `tests/golden/…json`). 85 + 6 = 91; dat staat er nu ook uitgelegd, inclusief dat de twee plaatshouders zelf al een label dragen en dus niet dubbel geteld worden. 24 mappen klopte en is ongewijzigd. |
| 8 | Keepsake-marge, vier plekken | circa €19 | **€14,91** | Zelf uit het model gerekend: €39 ÷ 1,21 = €32,2314 − €17 (`Aannames!B22`, inkoop **én** verzending) − €0,32 = **€14,9114**. Bevestigd uit de cachewaarden: `C55` €14,3149 ÷ `C50` 0,96 = €14,9114. De oude €19 was €32,23 − €13,60 drukkosten, dus zonder verzending en zonder transactiekosten (F8). Gecorrigeerd in `F-verdienmodel.md` §5.1, `F-verdienmodel.docx` (§4 én de tabel "Afgewezen"), `F-pricing-segmenten.xlsx` (`Prijsscenario's!A57` en `Verdienmodellen!H15`) en `G-rebuild-spec.md` §9. |

## 7 · `G-src-reconstructie/` → `G-bronstructuur-kaart/`

De map is hernoemd. Wat er verder is gebeurd zodat de naam niet het enige signaal is:

- **`README.md`** opent nu met een kaderblok **"Lees dit eerst"**: *dit is geen broncode en geen
  reconstructie van broncode, het is een kaart*; geen enkel bestand bevat implementatie, de
  grootste "bronfile" is 374 bytes, `npm install` doet niets zinnigs en `vite build` mislukt.
  De kop is `# Bronstructuur-kaart — een kaart van de repo, GEEN broncode`. Er staat expliciet
  bij dat de map eerder `G-src-reconstructie/` heette en waarom die naam is vervangen. Wat het
  wél is (de landingsplek waar de echte repo overheen gaat) staat er onveranderd in.
- **`LEESMIJ-EERST.txt`** toegevoegd: dezelfde waarschuwing in platte tekst, voor wie de map
  opent zonder markdownweergave (§7 punt 8).
- **`G-rebuild-spec.md`**: alle zes de verwijzingen omgezet. De beschrijvingsregel in §0 is
  herschreven — hij zei *"De gereconstrueerde bronstructuur … 89 stuks"* en zegt nu **"Een kaart,
  geen broncode"**, met 91 gekarteerde bestanden, 24 mappen, *"geen enkel bestand bevat
  implementatie; de grootste is 374 bytes commentaar. Je kunt dit niet bouwen."*
- De achterhaalde opmerking over `A` §3.6 in `ScoreWheel.tsx` is vervangen (zie punt 3, F14).

## 8 · De twee bevestigde bevindingen uit de opdracht

**`speaktoart.com` is geverifieerd** (22-09-2026, echte browser: in de lucht,
`<title>Arcana Mirror</title>`, h1 *"Een persoonlijke spiegel voor je patronen, kracht en
groeirichting"*, dezelfde 120 vragen, dezelfde 20-25 minuten, dezelfde disclaimer, géén
canonical; een eerdere versie van hetzelfde product).

- `G-rebuild-spec.md` §1b beschreef dit al correct en is inhoudelijk ongewijzigd gebleven.
- `G-rebuild-spec.md` taak 1 bevatte nog de openstaande handeling *"Open `https://speaktoart.com/`
  in een browser"* plus het acceptatiecriterium *"Er staat één regel in over wat `speaktoart.com`
  serveert"*. Beide zijn nu als **gedaan** gemarkeerd, met de uitkomst en de verwijzing naar §1b.
- `E-usp-en-landing.md` §3.2 bevatte het blok **"Verificatiebeperking"** (*"Ik heb … niet kunnen
  vaststellen … Dit is de eerste handeling na het lezen van dit document"*). Dat is vervangen
  door **"Geverifieerd op 22-09-2026 — route A is van toepassing"**, met de volledige
  waarneming, de conclusie dat het domein nog van de eigenaar is, en de uitleg waarom dit de
  ernst vergroot in plaats van verkleint. De laatste openstaande bevinding uit de sectie
  *"Wat ik niet heb kunnen verifiëren"* is daarmee gesloten.

**`G-domeinfix/` is nagerekend en akkoord** en is **niet aangeraakt**, conform de opdracht.

---

## Wat bewust níet is gewijzigd

| Wat | Waarom |
|---|---|
| **`G-domeinfix/` in zijn geheel**, inclusief de regel in `TOEPASSEN.md` die `C` §4 rij 9 citeert met `7.500+` | Uitdrukkelijk buiten scope gehouden ("nagerekend en akkoord, niets aan doen"). De regel zet dat getal ook niet op de site: hij legt juist uit waarom de statbalk in deze stap níet wordt aangeraakt. Wel het vermelden waard bij een volgende ronde, zodat ook dat document `5.700+` noemt. |
| **De 7.559 woorden in `A` §1, `G` §3 en de gouden-masterbestanden** | Correct getal voor de volledig gerenderde pagina. Overal waar het bleef staan is er nu bijgeschreven waar het over gaat, conform de regel in de opdracht. |
| **De vermeldingen van `7.500+` in `G-rebuild-spec.md` §3 tegenspraak 1** | Dat is de tegenspraak zélf, die daar wordt opgelost. Weghalen zou het besluitspoor wissen. |
| **De prijs van €9 en de conversieaanname van 4 %** | De prijsonderbouwing is met het juiste woordental opnieuw doorgelopen en houdt stand op de ankers; er was geen reden om de prijs te wijzigen. Dat staat nu expliciet in `F` §5.1 in plaats van impliciet. |
| **F16** (`design-tokens.css` §7: 68 versus 58 font-size-waarden) | Het rapport noemt de eigen telling zelf niet doorslaggevend ("mogelijk een andere telmethode"). Zonder de oorspronkelijke telmethode is 68 niet aantoonbaar fout, alleen niet reproduceerbaar. Laten staan is eerlijker dan een getal vervangen door een tweede ongedocumenteerde telling. |
| **F17, F18, F19** (labelfout in de besparingstabel, de strip-definitie achter 534.838, de vier ongedekte regels 12574–12576 in `D` §3.1) | Vallen buiten de zeven kleine getallen uit §7 punt 7 en buiten de opdracht. Alle drie dragen geen conclusie: het getal −70,6 klopt, de tabel telt exact op tot 534.838, en de blokindeling dekt 20.740 van de 20.744 regels. |
| **F20, F21, F22** (zelfstandigheid moodboard, "schaduwkant" versus "schaduwpatroon", 7 versus 6 hoofdsecties) | Buiten de opdracht. De regel boven `B-moodboard.html` (§7 punt 11) is niet toegevoegd omdat de opdracht die niet noemt; het blijft een openstaand punt van één regel. |
| **§7 punt 6** (één regel in `D` §6.1 dat `G` §5 de definitieve planning is, T1) | Buiten de zeven opgedragen correcties. **Let op:** door punt 5 hierboven staat `D` §6.1 nu nóg verder af van de werkelijkheid — 23,5 / 31 dagen tegen 27,0 / 36,5 in `G` §5. Dit is het eerste wat bij een volgende ronde moet gebeuren. |
| **§7 punten 9 en 10** (PageSpeed-nullijn draaien, de 70 %-invulgraadfixture toevoegen) | Dat zijn handelingen, geen tekstcorrecties: de eerste vereist een draaiende site en uitgaand verkeer, de tweede vereist de engine draaien op een nieuwe fixture en valt buiten de opdracht. Beide staan nog open en `5.700+` hangt aan de tweede. |
| **De 13,91 bij `--ink-inverse-soft`-buur in de donkere modus van `design-tokens.css`** | Bij narekenen kwam ik daar op een andere waarde uit, maar het controlerapport heeft alle 14 contrastclaims in dat bestand nagerekend en noemt uitsluitend `--ink-inverse-soft` als afwijking. Zonder zekerheid over welk vlak bedoeld is, is wijzigen riskanter dan laten staan. Signaleren, niet corrigeren. |

## Controles na afloop

- `grep` op `7.500` / `7500`: geen enkel voorkomen meer als **woordental van het rapport**. Wat
  resteert zijn uitsluitend expliciete correctienotities (*"eerdere versies noemden hier …"*,
  *"C §4 rij 9 adviseerde …"*), `G` §3 tegenspraak 1 zelf, en `G-domeinfix/TOEPASSEN.md`.
- `grep` op `7,4`: nergens meer als **lichte** ΔE-waarde. Wat resteert is de donkere waarde (7,4 /
  7,44), het contrastgetal 7,42 van `--gold` en het nettobedrag €7,44 in `F` §5.1 — alle drie
  niet-verwant.
- `grep` op `G-src-reconstructie`: geen padverwijzingen meer; alleen de twee regels in de map
  zelf die vertellen dat hij vroeger zo heette.
- `grep` op `vier localStorage` en `circa €19`: nul, op de ene correctienotitie in `F` §5.1 na.
- `design-tokens.json` en `gemeten-2026-09-22.json` parseren met `json.loads`.
- `B-moodboard.html` parseert (1.606 tags).
- `F-pricing-segmenten.xlsx`: vier tabbladen, **alle 130 formules behouden**, cachewaarden
  behouden (`C50` 0,96 · `C55` €14,3149 → €14,91 per boek). De wijzigingen zijn op
  XML-niveau in `sharedStrings.xml` doorgevoerd juist om die cachewaarden niet te verliezen —
  opslaan via `openpyxl` gooit ze weg.
- `F-verdienmodel.docx`: met LibreOffice naar PDF omgezet en bekeken. **Nog steeds 2 pagina's**,
  alle drie de tabellen renderen, niets loopt over en er is geen weesregel. De toevoegingen zijn
  daarvoor bewust kort gehouden.

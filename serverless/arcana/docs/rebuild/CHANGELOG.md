# Changelog — rebuild Arcana Profile

Eén regel per afgeronde stap, in de taal van de eigenaar. Uitgebreide onderbouwing staat in
`docs/arcana/DECISIONS.md`; hier alleen wat er veranderde en wat het opleverde.

## Stap 0 — Groene basis vastgelegd · 2026-09-22

- Regressiepoort gedraaid op de huidige stand: 115 tests groen, typecheck 0, build slaagt en de
  domeincontrole meldt "Domeincontrole geslaagd".
- `npm run lint` scande per ongeluk een oude gebouwde uitlevermap (`arcana-mirror-hostinger/`) en
  gaf daardoor waarschuwingen op geminificeerde code. Lint is nu beperkt tot de bron; de
  uitlevermappen en zips staan in `.gitignore`.
- Vastgesteld dat de gouden master (12 fixtures) is vastgelegd ná de labelwijziging van
  22-09 (`Stress: …` / `Schaduw: …` → gewone taal): alle 12 fixtures bevatten de nieuwe labels.
- Nog niet gebouwd: er is nog geen designrichting gekozen (beslispunt 1 uit `G` §2).

## Taak 1 — Designtokens en donkere modus · 2026-09-23

**Besluiten van de eigenaar:** richting (a) Perkament & Diepte met de donkere modus uit (b);
herocopy variant A (nieuwsgierigheid) voor taak 3.

### Wat er is veranderd
- De kleuren, lettergroottes, afstanden en schaduwen komen nu uit één gemeten tokenset
  (`src/styles/tokens.css`, licht én donker). De oude kleurdefinities zijn weg.
- Er is een donkere modus. Hij volgt het apparaat, en er is een schakelaar (Licht · Auto ·
  Donker) in de kop van de site, in het mobiele menu en bovenaan het rapport. De keuze wordt
  onthouden en overleeft "Antwoorden wissen".
- Geen lichte flits bij het laden: het thema staat vast vóór de eerste verf, ook voor de
  statische inhoud die zoekmachines zien.
- De twaalf dimensiekleuren zijn vervangen door vier families van drie (◆ motor en richting,
  ● contact, ▲ grip, ■ zelf). Alle twaalf halen AA in licht én donker; het familiesymbool
  staat overal naast de naam, zodat kleur nooit de enige drager is. Het wiel toont ze nu als
  vier kwadranten.
- Het portret tekent zichzelf in het gekozen thema, ook na omschakelen.
- Printen vanuit donkere modus levert een licht vel.
- De trechter op de landingspagina: de smalste band heeft lichte tekst op goud gekregen
  (was inkt op een goudmenging, 3,5:1 na de tokenwissel).
- Zes labels in de vorige stap al: geen wijziging aan rapporttekst in deze taak.

### Wat er bewust niet is veranderd
- Geen vormen: geen nieuwe kaartschaduwen, geen andere sectie-indeling, geen nieuwe
  lettertypen. Dat is taak 3.
- Het scorewiel blijft canvas tot taak 2; het leest zijn kleuren nu wel uit de tokens.
- De rapporttekst en de gouden master: onaangeraakt (0 gewijzigde fixtures).
- Cormorant 600 en de fontsubsets: taak 2.

### Wat de bezoeker merkt
- Het grijs van bijschriften is donkerder geworden (`--ink-faint` van 3,6:1 naar 6,3:1).
  Dat is de bedoeling.
- Wie op donker staat, ziet de site nu in warme nacht in plaats van fel perkament.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| `prefers-color-scheme`-regels | 0 | 3 | > 0 |
| `prefers-reduced-motion`-regels | 5 | 6 | ≥ 5 |
| Contrastfouten, 3 schermen × 2 thema's | 0 (alleen licht gemeten) | 0 / 0 / 0 en 0 / 0 / 0 | 0 |
| Dimensiekleuren onder 4,5:1 | 6 van 12 | 0 van 12 | 0 |
| CSS over de lijn (brotli q5) | ~9,2 KB | 11,0 KB | ≤ 14 KB |
| JS over de lijn (brotli q5) | ~139,5 KB | 138,0 KB | taak 2 |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 120 groen (was 115; 5 nieuwe voor het thema) |
| Contrast, 6 metingen | 6 × 0 fouten (landing 179 knopen, vragen 16, rapport 518) |
| Domeincontrole | geslaagd |

### Terugrollen
`tokens.css` uit `App.tsx` halen en het oude `:root`-blok uit commit `79f8c02` terugzetten in
`arcana.css`; bootscript en boot-stijl uit `index.html`; `ArcanaThemeToggle` uit kop en
rapport. Raakt geen gebruikersgegevens: `arcana_theme` is een losse sleutel.

### Wat dit openlaat
- De geïnverteerde gravure in donkere modus is met een CSS-filter gedaan en nog niet met het
  oog beoordeeld (screenshots werken niet in deze omgeving).
- De contrastmeting is gedaan met transities uitgeschakeld, op 1 breedte per scherm; de
  18-metingenpoort uit `G` §6 (3 breedtes) staat nog open tot er een Playwright-opstelling is.
- Herocopy A wijkt af van de aanbeveling B: bij taak 3 moet de SEO-titel uit `E` §7.2 op de h1
  worden afgestemd (`G` §2, beslispunt 2).

## Taak 2a + 2b — Bundel gesplitst, fonts gesubset · 2026-09-23

### Wat er is veranderd
- Wie alleen de landingspagina bekijkt, downloadt nu alleen wat daarvoor nodig is. De vragen
  laden bij "Start de test", de rekenmodule met alle rapportteksten wordt alvast opgehaald zodra
  de intake begint, en de rapportweergave laadt bij het openen van het rapport.
- Valt de verbinding weg op het moment dat het rapport gemaakt moet worden, dan verschijnt een
  scherm dat zegt dat de antwoorden veilig op het apparaat staan, met een knop om ze te
  downloaden en een knop om het opnieuw te proberen. Er gaat niets verloren.
- De lettertypen zijn teruggebracht tot precies de tekens die de site gebruikt. Namen met
  bijzondere tekens (Şule, Ångström) laden automatisch een klein aanvulbestand.
- Het lettertype van het woordmerk wordt vooraf geladen, zodat de titel niet verspringt.

### Wat er bewust niet is veranderd
- Cormorant 600 blijft, anders dan `Z` (tegenspraak 8) voorstelde: hij staat in negen regels op
  de landing en de begroting wordt ook met vier bestanden ruim gehaald. Geen zichtbare wijziging.
- Het laadscherm van zes seconden staat er nog; dat is taak 9 in `G`, niet deze.
- Het scorewiel: taak 2c.

### Wat de bezoeker merkt
- Niets zichtbaars. De landing is sneller op een trage verbinding; wie de test afmaakt
  downloadt in totaal ongeveer evenveel als eerst.

### Gemeten, vóór → na (brotli q11, gebouwde bundel)
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| JS landing | ~131 KB (één chunk) | 60,4 KB | ≤ 75 KB |
| JS landing → test starten | ~131 KB | 69,3 KB | — |
| JS volledig eerste bezoek | ~131 KB | 132,6 KB | — |
| JS terugkomen voor het rapport | ~131 KB | 74,3 KB | — |
| Fonts op de landing | 120,6 KB (5 bestanden) | 53,5 KB (4) | ≤ 60 KB |
| In de browser: landing haalt op | alles | `index` + `vendor` | — |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 122 groen (2 nieuw: vragenaantal + bronniveau-poort op de splitsing) |
| Bundelbegroting | gehaald; draait nu als laatste stap van `npm run build` |
| Domeincontrole | geslaagd |

### Terugrollen
`App.tsx` terug naar statische imports (één commit), `manualChunks` uit `vite.config.ts`;
de oude fontbestanden staan in `src/fonts/bron/` en het oude `@font-face`-blok in commit `04ba378`.

### Wat dit openlaat
- `size-adjust` op de terugvalletter (D §3.3 punt 1) is niet gedaan; de verspringing bij het
  laden is met `font-display: swap` klein maar niet nul.
- De fontsubsets zijn met `fontTools` gemaakt; herhalen vraagt Python met `fonttools` en
  `brotli` op de ontwikkelmachine. Dat staat in het script zelf.

## Taak 2c — Het portret naar SVG · 2026-09-23

### Wat er is veranderd
- Het portret is nu vectorbeeld: het blijft scherp bij printen en op elke zoom, de scores in
  het beeld zijn echte tekst (selecteerbaar, kopieerbaar), en het volgt de donkere modus
  zonder hertekening.
- Elke pluim is met het toetsenbord te bereiken en heeft een eigen naam en score voor
  schermlezers; oplichten werkt vanuit het beeld én vanuit de lijst eronder.
- De rekenkant staat los in `src/lib/arcanaPortraitGeometry.ts`, zodat de landingspagina er in
  taak 3 een statisch voorbeeldwiel uit kan maken zonder de rapportcode mee te laden.
- De oude canvas-tekening blijft tot taak 13 bereikbaar met `?vergelijk` in de adresbalk, onder
  het nieuwe beeld met dezelfde scores, om met het oog naast elkaar te leggen.

### Wat er bewust niet is veranderd
- De sleutel en de lijst van twaalf onder het beeld: ongewijzigd, ze waren goed.
- De vormregels (lengte, buiging, dichtheid, kleur per familie, het open ringetje): identiek.

### Wat de bezoeker merkt
- De intekening bij het openen is een vloeiende groei per pluim in plaats van een tekening
  langs de schacht. Wie bewegingsvermindering aan heeft, ziet het beeld direct compleet.
- In een PDF is het portret nu scherp.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Print | raster ~150 dpi | vector | vector |
| Rapport-DOM | 936 | 1.102 | ≤ 1.030 (`D`) — erboven, zie DECISIONS |
| Contrast rapport, licht / donker | 0 / 0 (canvas niet meegemeten) | 0 / 0 op 567 knopen, **inclusief** de tekst in het beeld | 0 |
| Rapportchunk | 34,0 KB raw | 35,2 KB raw (9,7 KB q11) | — |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 129 groen (7 nieuw: geometrie deterministisch, lengte/buiging/dichtheid, labelafbreking) |
| Bundelbegroting | gehaald |

### Terugrollen
`ArcanaPortrait.tsx` terug naar de canvas-versie: één import in `ArcanaReport.tsx` (het bestand
`ArcanaPortraitCanvas.tsx` staat er nog).

### Wat dit openlaat
- Niet in Safari getest (`mix-blend-mode` in SVG); de gloed is decoratief en mag daar wegvallen.
- Het beeld is met het oog beoordeeld op vorm en kleurwaarden via de DOM, niet als screenshot —
  het browserpaneel in deze omgeving rendert geen frames. Leg het na uitrol naast de canvas
  met `?vergelijk`.

## Taak 3 — Landingspagina en hero herbouwd · 2026-09-23

**Besluit van de eigenaar:** herocopy variant A (nieuwsgierigheid).

### Wat er is veranderd
- De kop van de site is nu de propositie ("De meeste mensen kennen hun patroon. Bijna niemand
  kan het benoemen."), met de merknaam klein erboven en "Zelfinzicht dat je kunt narekenen" als
  gouden regel. De knop heet "Begin met de 120 vragen"; de metaregel zegt erbij dat je kunt
  pauzeren; de derde geruststelling is "Geen taalmodel — de test rekent".
- Direct onder de hero staan de drie dingen die je wél kunt controleren (narekenen, van jou,
  zegt zelf wat het niet weet), met het terzijde over zelfbeoordeling. Dat stond op 2.100 px;
  nu op ongeveer 700.
- De gravure staat daarna, als rustpunt; dan de cijfers als smalle donkere band
  (`5.700+ woorden, met de cijfers erbij`).
- De zes voordelen: kaart 1 noemt nu de uitzondering van de acht beschouwingen, kaart 2 zegt
  "volgende week" en dat een gewijzigde berekening bij het rapport vermeld wordt, kaart 4
  waarschuwt dat de eerste 72 het snelst gaan, kaart 6 noemt het deelbare hoofdstuk. Kaart 1
  is de enige met een gouden bovenrand; het raster is asymmetrisch.
- Hoe het werkt: stap 1 zegt dat stoppen mag, stap 4 dat de archetypenaam een leeswijzer is en
  je ervaring voorgaat. Op een breed scherm staat de trechter naast de stappen.
- Wat het meet: de twaalf dimensies staan in de vier kleurfamilies van het portret, met
  familiesymbool en dimensiekleur, in dezelfde volgorde als het beeld. Geen hovereffect.
- Wat je krijgt: een echt, getekend voorbeeldportret met verzonnen scores (bijschrift: "Dit is
  een voorbeeld, geen echte uitslag") naast één lijst van de zes delen en de zes extra's.
- Eerlijk gezegd: woordelijk ongewijzigd, nu als donker blok over de volle breedte.
- Vragen: drie antwoorden bijgesteld (duur met 72/48, MBTI met "je ervaring gaat voor",
  bewaren met "wij hebben geen kopie"), een negende vraag "Waarom is dit gratis?", de eerste
  vraag staat open.
- Slot: de tekst geeft het argument in plaats van de herhaalde geruststellingen.
- Skip-link "Naar de inhoud" als eerste tab op elke pagina.
- Zoekresultaat: titel `Persoonlijkheidstest die je kunt narekenen | Arcana Profile` (59
  tekens, was 77) en een beschrijving van 156 tekens (was 264), afgestemd op de h1.

### Wat er bewust niet is veranderd
- De vier disclaimers, de statische `#root`-tekst, de `noscript`-regel, JSON-LD, canonical,
  sitemap: onaangeraakt.
- De sectie "Kijk het zelf na" (`E` §5.9) is niet gebouwd: die hangt aan het voorbeeldrapport
  (taak 12).
- De trechter is CSS gebleven; de vier accentkleuren op de banden zijn niet gedaan.
- De slotzin van de negende FAQ-vraag ("dan staat het hier, vóórdat het gebeurt") staat er
  niet: dat is een toezegging van de eigenaar.
- De begroting blijft 75.000 B: de landing meet 65,7 KB, dus de verhoging naar 80.000 is niet
  nodig.

### Wat de bezoeker merkt
- Een pagina die begint bij een herkenbare ervaring in plaats van bij de merknaam, en die
  binnen één scherm laat zien wat je kunt controleren.
- Vijf verschillende vlakken, twee donkere, en het portret vóórdat je één vraag beantwoordt.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Paginahoogte landing (1440 px) | 7.083 px | **7.638 px** | ≤ 6.000 — **niet gehaald**, zie DECISIONS |
| Positie van "narekenen" | ~2.100 px | ~700 px | boven de tweede schermvulling |
| Hero t/m metaregel op 390 × 667 | — | eindigt op 611 px | binnen 667 |
| JS landing (brotli q11) | 60,4 KB | 65,7 KB | ≤ 75 KB |
| CSS (q11) | 10,1 KB | 11,3 KB | ≤ 14 KB |
| Contrastfouten, 2 thema's × 3 breedtes | 0 (1 breedte) | 6 × 0 (254 knopen) | 0 |
| h1 | merknaam | propositie, precies één | één |
| Skip-link | ontbrak | aanwezig, doel `#inhoud` | aanwezig |
| `<title>` | 77 tekens | 59 tekens | ≤ 60 |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 129 groen |
| Contrast, 6 metingen | 6 × 0 fouten; één gevonden en gefixt (trechterband 2 op nacht, 4,31 → 5,0) |
| Bundelbegroting | gehaald |
| Domeincontrole | geslaagd |

### Terugrollen
`LandingPage.tsx`, `siteContent.ts` en het landingblok in `site.css` terug uit commit `756c3c6`;
`PortraitSample.tsx` weg; de skip-link uit `App.tsx`; titel en beschrijving in `index.html`.
Raakt geen gebruikersgegevens.

### Wat dit openlaat
- De paginahoogte: 7.638 px tegen een doel van 6.000. De inhoud uit `E` (controleerblok, het
  portret ín "Wat je krijgt", negen vragen) past niet in de hoogte die `B` schatte. Inkorten is
  inhoud schrappen of de ritmetokens kleiner zetten — een keuze voor de eigenaar.
- De 5-secondentest uit `E` §6 is niet gedaan; variant A is de keuze van de eigenaar, niet een
  gemeten uitkomst.
- Het beeld is via de DOM gecontroleerd (kleuren, afmetingen, contrast), niet met het oog: het
  browserpaneel in deze omgeving rendert geen frames.

## Taak 4 — Rapport: herleesstructuur · 2026-09-23

**Dit is de eerste stap die de rapporttekst raakt.** De gouden master is bewust bijgewerkt in
dezelfde commit; hieronder staat precies wat er voor de lezer veranderde.

### Wat er is veranderd
- Bovenaan het rapport staat nu "Je rapport in het kort": vijf uitspraken met een cijfer, de
  betrouwbaarheidszin erbij, en drie knoppen (lees verder, bewaar als PDF, inhoudsopgave). De
  kaart verwijst nergens naar iets erboven en is als losse pagina te begrijpen. "Opnieuw
  beginnen" en "Antwoorden wissen" staan onderaan het rapport, niet meer bovenaan.
- De troosttekst per archetype ("Misschien leef je nu in een fase waarin …") staat direct
  onder de valkuilenlijst in plaats van in hoofdstuk 33, met ervoor: "Eén van deze vijf herken
  je waarschijnlijk meteen, en de andere vier niet. Neem die ene."
- Het hoofdstuk om door te geven heet "Wat ik je zou willen uitleggen" (was "Hoe anderen jou
  zouden moeten begrijpen"), zegt met twee scores waar het vandaan komt, en is met "Deze pagina
  delen" als losse pagina te openen: eigen aanhef aan de ontvanger, eigen uitleg van wat het
  niet is, en drie handelingen — PDF van één pagina, kopiëren als tekst, printen. De rest van
  het rapport gaat niet mee, en dat staat erbij.
- De overgangszinnen kijken niet meer achteruit zonder cijfer. "Directheid (zoals hierboven al
  genoemd bij wie je bent)" is "Directheid (85/100 — hetzelfde cijfer als bij wie je bent; hier
  telt het als sterk punt)" geworden; onder druk en op je gemak staat de score erbij; wie je bent
  en je sterke punten wijzen vooruit naar waar dezelfde scores anders uitpakken.
- Elk van de zes delen opent met één zin die zegt waarom het daar staat. De opening van de acht
  beschouwingen zegt dat de openingen daar algemeen zijn en alleen de middenstukken op de scores
  gekozen.
- "Dit rapport staat stevig" is "Je antwoorden waren consistent. Dat betekent dat de scores
  hieronder stabiel zijn — niet dat ze waar zijn." geworden.

### Wat er bewust niet is veranderd
- De berekening, de scores, de archetypen, de spanningsvelden: byte voor byte gelijk.
- De disclaimer, op alle drie de plekken, op dezelfde plaats in de leesvolgorde.
- De archetypenamen (Engels), de zes localStorage-sleutels.
- Oudere opgeslagen rapporten renderen zoals ze waren; ze krijgen de nieuwe tekst niet.

### Wat de bezoeker merkt
- Het rapport begint met het antwoord in plaats van met het beeld; wie stopt na één scherm heeft
  het belangrijkste gelezen, inclusief het voorbehoud.
- Wie 's avonds bij de valkuilen leest, krijgt de nuance op dezelfde kaart.
- Eén pagina kan naar een partner zonder dat de rest meegaat.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Gouden master | 12 fixtures ongewijzigd | 12 fixtures bewust bijgewerkt (+257/−161 regels), diff gelezen | bewuste diff |
| Woorden per fixture | 5.852–6.607 | 5.996–6.764 | — |
| Terugkijkende overgangen zonder cijfer | 4 banken | 0 (alle met cijfer), 2 vooruitwijzende erbij | 0 |
| `ifItDoesNotFit` | hoofdstuk 33 | direct onder de valkuilenlijst | onder de lijst |
| Contrast rapport / deelpagina, licht en donker | — | 0 / 0 (566 en 23 knopen) | 0 |
| Rapportchunk (q11) | 8,8 KB | 8,9 KB + deelpagina 1,5 KB (los) | — |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — harde helft (scores) | onveranderd |
| Determinisme — gouden master | bewust bijgewerkt in dezelfde commit |
| Tests | 129 groen (u-corpus, grammatica, reconciliatie ongewijzigd) |
| Bundelbegroting | gehaald |
| Domeincontrole | geslaagd |

### Terugrollen
Eén commit terug: tekst, `outro`-veld en de twaalf fixtures gaan samen. Opgeslagen rapporten uit
2.1.0 renderen ook op de oude code (het extra veld wordt genegeerd).

### Wat dit openlaat
- Niet gedaan uit `C` §3: de navigatieregel met inhoud per hoofdstuk, de afsluiters per
  hoofdstuktype, de terugkeerondersteuning; en de eigen wisdialoog uit `G` taak 10.
- De u-vorm heeft twee oude fouten in de traitteksten ("uw zelf", "tot uw de") die al in de
  vorige fixtures stonden — de omzetter, niet deze taak.
- Geen nulmeting van de rapporthoogte vóór deze taak; nu 23.021 px op 1508 px breed.

## Taak 9 — De vragenflow · 2026-09-23

### Wat er is veranderd
- Naamformulier (`ArcanaIntake.tsx`): eyebrow "Eén scherm, dan beginnen we", kop-body met de
  reden waaróm er een naam wordt gevraagd, kortere veldhint, en een toelichting bij de
  aanspreekvorm ("Dit verandert je scores niet, alleen de toon van je rapport") — letterlijk
  `C` §4.7 rij 36–40. Nieuwe tekstknop `Liever zonder naam →` onder de submit-knop, die met een
  leeg naamveld bevestigt.
- Blokaanduiding (`ArcanaTest.tsx` + `ArcanaProgress.tsx`): `Stellingen · {n} van 72` met de
  varianten `Kiezen tussen twee · {n} van 24`, `Situaties · {n} van 16`, `Op volgorde zetten ·
  {n} van 8`, in plaats van "Deel 1 van 4". Blok en positie-binnen-blok komen uit de lengtes van
  `LIKERT_QUESTIONS`/`FORCED_CHOICE_QUESTIONS`/`SCENARIO_QUESTIONS`/`RANKING_QUESTIONS`, niet uit
  hardgecodeerde grenzen.
- Voortgangslabel krijgt de resttijd erbij: `Vraag {n} van 120 · nog ongeveer {m} minuten`,
  berekend uit `arcana_started_at` (verstreken tijd / aantal antwoorden × resterende vragen,
  afgerond, minimaal 1). Verschijnt pas vanaf 3 antwoorden.
- Pauzeren-knop toont `Pauzeren — je antwoorden blijven bewaard`; onder 420px valt het tweede
  deel visueel weg (blijft alleen "Pauzeren"), maar de volledige tekst staat altijd in
  `aria-label`. Laatste knop: `Afronden — laat mijn rapport zien`.
- Focuskader-fix (`A` §3.9): de vraagkop (`<h2 tabIndex={-1}>`) krijgt de focus bij elke wissel
  van `currentIndex`. Grondoorzaak was dat de radiogroup-knoppen voor Likert dezelfde React-keys
  (1–7) over alle 72 vragen delen, waardoor React hetzelfde DOM-knopelement hergebruikte en de
  browserfocus op dezelfde plek bleef staan — de nieuwe vraag zag er zo uit alsof er al een
  antwoord op stond. Eén herstelpunt in de gezamenlijke ouder in plaats van vier losse
  vraagcomponenten.
- Laadscherm herbouwd (`ArcanaResultLoading.tsx`): geen harde `setTimeout(onDone, 6000)` meer.
  Het rekenen start meteen (`run()`, in `App.tsx` de omgedoopte `generateReport`, die nu een
  boolean teruggeeft in plaats van zelf het scherm te wisselen) en loopt parallel aan een
  ondergrens van 1.200 ms. Optie B uit `C` §4.9: `120 antwoorden opgeteld` → `30 eigenschappen
  berekend` → `12 dimensies samengevoegd` → `Je rapport is klaar`, met een slotrust van 350 ms
  zodat die laatste regel ook echt gelezen kan worden. `App.tsx`'s `handleLoadingDone` vuurt pas
  als beide voorwaarden gelden en behoudt de bestaande `loadingDoneRef`-bescherming en het
  `engine-unavailable`-pad.

### Wat er bewust niet is veranderd
- De opslag: dezelfde zes `STORAGE_KEYS`, geen nieuwe sleutel, geen hernoeming.
- De scoring engine en de rapportgenerator: geen enkele regel aangeraakt.
- Rangschikkingsvragen: nog steeds ↑/↓-knoppen per regel (`ArcanaRankingQuestion.tsx`
  ongewijzigd); de focusfix zit in de gezamenlijke ouder en raakt hun interne toetsenbordlogica
  niet.
- De vraagteksten, de disclaimer en de privacytekst.
- Het tussenscherm "Zestig gehad, zestig te gaan" uit `C` §5.3 (halverwege-onderbreking): niet in
  taak 9 genoemd, niet gebouwd.

### Wat de bezoeker merkt
- Bij vraag 40 staat er "Stellingen · 40 van 72" in plaats van "Deel 1 van 4" — geen suggestie
  meer dat er nog driemaal zoveel komt terwijl 40% al gedaan is.
- Na een paar antwoorden verschijnt een schatting van de resterende tijd die zichzelf bijstelt.
- Met het toetsenbord landt de focus na elk antwoord zichtbaar op de nieuwe vraag; geen optie
  ziet er meer uit alsof hij al is aangeklikt.
- Het laadscherm na vraag 120 duurt nog maar circa 1,5–2 seconden (was 6+) en telt zichtbaar af
  in vier concrete stappen in plaats van vage lijdende-vorm-zinnen.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Laadscherm, vaste wachttijd | 6.000 ms hard, ongeacht rekentijd | max(rekentijd, 1.200 ms) + 350 ms slotrust | geen vaste 6s |
| Laadscherm, gemeten totaal (balanced-seed) | ~6.000+ ms | ~1.950 ms | < 6.000 ms |
| Focus na antwoord (Likert, toetsenbord) | blijft op oude knoppositie | op de nieuwe vraagkop | op de nieuwe vraag |
| `ArcanaIntake` chunk (brotli q11) | 1,0 KB | 1,1 KB | — |
| `ArcanaTest` chunk (brotli q11) | 1,9 KB | 2,2 KB | — |
| `index` chunk, incl. laadscherm (brotli q11) | 16,2 KB | 16,4 KB | — |
| Contrastfouten, vragenscherm × 3 breedtes × 2 thema's | — | 0 op alle 6 metingen | 0 |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Typecheck | 0 |
| Lint | 0 |
| Tests | 129 groen |
| Determinisme — gouden master | 0 gewijzigde fixtures |
| Contrast, vragenscherm, 1440/390/320 × licht/donker | 6 × 0 fouten (16–17 knopen per meting) |
| Build + domeincontrole + begroting | geslaagd (landing → test starten: 75,4 KB q11, doel ≤ 75) |

### Terugrollen
Vijf componentbestanden plus `App.tsx`, geen opslagwijziging. `ArcanaResultLoading` teruggeven
aan de vorige versie (vaste 6s) vraagt ook `App.tsx`'s `generateReport`/`handleLoadingDone` terug
te zetten naar de vorige vorm (screen-wissel binnen `generateReport` zelf) — die twee horen
samen bij een terugrol.

### Wat dit openlaat
- Het tussenscherm "Zestig gehad, zestig te gaan" (`C` §5.3) en de skip-mogelijkheid daarvan zijn
  geen onderdeel van taak 9 en staan nog open.
- VoiceOver zelf is in deze omgeving niet te bedienen (geen scherm-lezer beschikbaar in het
  browserpaneel); de focusfix is geverifieerd via `document.activeElement`, ARIA-rollen/labels en
  een volledige toetsenbordronde landing → intake → 5 vragen, niet met een echte schermlezer.
- De `engine-unavailable`-foutpad is niet opnieuw met een echte kapotte chunk getest (de
  gecachete dev-chunk laat zich niet makkelijk laten falen); de code-inspectie en het ongewijzigd
  blijven van de catch-structuur geven vertrouwen, geen browserbewijs.

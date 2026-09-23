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

## Taak 10 (tekst-deel) — Afsluiters per hoofdstuktype en de u-vorm-fix · 2026-09-23

**Alleen het tekstgedeelte van taak 10.** De navigatieregel met inhoud (`C` §3.2 laag 3), de
terugkeerondersteuning (`C` §3.4) en de knoppenherschikking/wisdialoog uit `G` taak 10 zijn niet
in deze stap gedaan — zie "Wat dit openlaat".

### Wat er is veranderd
- Elk van de 33 hoofdstukken krijgt nu een afsluiter die bij zijn kaartsoort past (`C` §3.3):
  `insight` (13/14 hoofdstukken) krijgt "Wat je hiermee kunt: dit hoofdstuk rust op {label} ({score})
  en {label} ({score})…" met de twee subdimensies waar het hoofdstuk al op steunde; de vijf
  hoofdstukken over anderen krijgen in plaats daarvan "Wat je hiermee kunt: dit gaat over wat
  anderen van je merken…"; de vier zware hoofdstukken naast "Je valkuilen" (stress, jungian,
  tensions, blind-spots) krijgen een geruststelling zonder een aantal te noemen dat daar niet
  klopt; de vier groei-hoofdstukken krijgen "Van de {n} punten hierboven is er één die vandaag al
  kan…"; de acht beschouwingen krijgen "Waar dit vandaan komt: de inleiding is algemeen — de
  {n} alinea's daarna zijn gekozen op jouw scores: {label} ({score}) en {label} ({score})…", met
  een eigen fallback-zin wanneer geen enkele regel matcht.
- De valkuilenafsluiter (shadow) is herschreven tot wat `C` "de belangrijkste tekst in dit hele
  document" noemt: "Wat je hiermee kunt" (neem er één, de rest mag wachten), dan "Als dit niet
  klopt" met de bestaande per-archetype troosttekst (`ifItDoesNotFit`, al verplaatst in taak 4),
  dan de vaste slotzin "Een lage score op een valkuil betekent niet dat hij er niet is… niet de
  plekken waar je faalt." Geen doublure: het bestaande `outro`-veld ís de afsluiter, er is geen
  tweede kopie ernaast gezet.
- De afsluiters staan als gewone alinea's in het bestaande `outro`-veld, in dezelfde
  "Label: zin"-vorm die de herkomstzin bij "Wat ik je zou willen uitleggen" al gebruikte — geen
  nieuw veld, geen `**`-markdown die ongerenderd op het scherm zou verschijnen. Ze verschijnen dus
  meteen op het scherm (bestaande weergave) en in de markdown-export (bestaande exportcode).
- Twee u-vorm-fouten gefixt bij de bron: "tot je de logica" en "sneller dan je zelf zou wensen"
  werden in de u-vorm "tot uw de logica" en "sneller dan uw zelf" — allebei grammaticaal fout,
  allebei al genoemd in taak 4 als bekende fout van de omzetter. Bij het narekenen van hetzelfde
  patroon ("je" direct gevolgd door "de"/"het"/"zelf" waar "je" onderwerp of lijdend voorwerp is)
  bleken er nog 24 andere zinnen met dezelfde omzetfout te staan, verspreid over alle vijf de
  tekstdatabestanden — allemaal hersteld door de brontekst te herschrijven (nooit de omzetter
  zelf), meestal door "je" op die ene plek te vervangen door "jij" of "jou", wat in de je-vorm
  even natuurlijk leest en in de u-vorm altijd goed omzet.
- Een echte fout ontdekt tijdens het bouwen: de afsluiters van hetzelfde hoofdstuktype kozen
  allemaal dezelfde formulering binnen één rapport (dezelfde `pick`-sleutel voor alle ~14
  insight-hoofdstukken), dus las iemand veertien keer letterlijk dezelfde zin met alleen het
  cijfer anders. Opgelost met een sectie-id als salt (dezelfde truc als `T()`), plus een derde
  variant bij de twee-variant-teksten om de kans op toevallige herhaling verder te verkleinen.
- `REPORT_VERSION`: 2.1.0 → 2.2.0. Puur tekst toegevoegd, geen sectie hernoemd of verwijderd; een
  oudere `arcana_result` blijft renderbaar en toont de nieuwe afsluiters pas na opnieuw genereren.

### Wat er bewust niet is veranderd
- De navigatieregel onderaan elk hoofdstuk (`C` §3.2 laag 3): dat raakt `ArcanaReportSection.tsx`
  (presentatielaag), niet de rapporttekst — en telt volgens `C` zelf niet mee in de gouden master.
  Blijft open voor de volgende stap.
- De terugkeerondersteuning (`C` §3.4: welkom-terug-kaart, leesmarkering, vergelijken na opnieuw
  invullen) en de knoppenherschikking/eigen wisdialoog uit `G` taak 10: allebei presentatie- en
  opslaglaag, niet tekst.
- De leesinstructie "Hoe je dit leest" bij de `profile`-kaarten (scorewiel/portret, methodekaart):
  die kaarten zijn geen `ArcanaReportSection` en lopen niet door de generator — dat hoort bij de
  kaarten zelf (`ArcanaMethod.tsx` zegt het al; het portret nog niet, verkort).
- De berekening, de scores, de archetypen, de spanningsvelden: byte voor byte gelijk (harde helft
  van `npm test` bleef groen tijdens de hele stap).
- "Wat ik je zou willen uitleggen" (understood-by-others) krijgt geen generieke insight-afsluiter
  erbij: die sectie heeft al een eigen "Waar dit vandaan komt"-zin met twee scores uit taak 4, en
  een tweede afsluiter ernaast zou dezelfde functie dubbel vervullen.
- Het 30-dagenplan krijgt geen nieuwe afsluiter: `thirty-day.note` zegt al bijna letterlijk wat
  `C` als afsluiter voorstelt.

### Wat de bezoeker merkt
- Onder elke lijst met bullets staat nu een korte, concrete vervolgstap in plaats van niets.
- De valkuilenkaart eindigt met dezelfde geruststelling als voorheen, nu explicieter opgebouwd.
- Twee zinnen die eerder kromme u-vorm gaven, lezen nu correct voor wie de test in de u-vorm doet.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Woorden per fixture (12) | 6.058–6.837 | 7.402–8.215 | — |
| Gemiddelde groei per rapport | — | +1.356 woorden (~+22%) | — |
| Cross-rapport tekstoverlap (`npm run overlap`) | 28,8% | 28,8% | onveranderd — afsluiters staan in `outro`, dat telt niet mee in deze meting |
| U-vorm-omzetfouten (`uw de`/`uw het`/`uw een`/`uw zelf`) in de zes tekstbestanden | 26 (automatische scan) | 0 | 0 |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Typecheck | 0 |
| Lint | 0 |
| Determinisme — harde helft (scores, archetypen, spanningsvelden) | onveranderd |
| Determinisme — gouden master | bewust bijgewerkt in dezelfde commit, diff gelezen |
| Tests | 129 groen (u-corpus en grammaticatest ongewijzigd gebleven, dus ook op de nieuwe teksten getest) |
| Build + domeincontrole + begroting | geslaagd |

### Terugrollen
Eén commit: tekst, twaalf fixtures en `REPORT_VERSION` gaan samen. Opgeslagen rapporten uit 2.1.0
blijven renderbaar (het `outro`-veld bestond al; er is geen sectie hernoemd of verwijderd).

### Wat dit openlaat
- Alles onder "Wat er bewust niet is veranderd" hierboven: de navigatieregel, de
  terugkeerondersteuning, de wisdialoog, de knoppenherschikking en de leesinstructie bij de
  profielkaarten.
- Geen browsertool beschikbaar in deze sessie: geen visuele screenshot-controle en geen
  Playwright-contrastmeting op het rapport. Geverifieerd via de gegenereerde markdown-export
  (dezelfde tekst die `ArcanaReportSection.tsx` ongewijzigd als platte alinea's rendert) en via
  broncode-inspectie van die renderfunctie.
- De u-vorm-fix is gericht op het letterlijke patroon "je" + "de"/"het"/"zelf", plus alle gevallen
  die een volledige corpusscan (elke "je"-zin in de zes bestanden, automatisch omgezet en
  gecontroleerd op "uw" + die vier woorden) opleverde. Twee losstaande gevallen die tijdens het
  handmatig lezen zijn gevonden (de zin "put je snel uit" gaf door een dubbele-t-fout in de
  omzetter zelf "putt u"; "plaats je een project" mist een stam in de omzetter) zijn omzeild door
  de brontekst te herschrijven, niet door de omzetter te repareren — die staat niet in dit
  schrijfdomein. Een volledige audit van elke "je" gevolgd door een niet-werkwoord in alle
  ~1.000+ tekstvarianten is niet gedaan; dat zou een uitbreiding van de herkende woorden in
  `arcanaVoice.ts` vragen, niet meer brontekst-patches.

## Taak 10 (presentatiedeel) — Navigatieregel, wisdialoog, knoplabels, versiecontrole · 2026-09-23

**Het presentatie-/robuustheidsdeel dat na het tekstdeel nog openstond.** De rapporttekst, de
rapportgenerator en de gouden master zijn in deze stap niet aangeraakt.

### Wat er is veranderd
- De kaartnavigatie onderaan elk hoofdstuk (`C` §3.2 laag 3) toont nu een halve regel context per
  richting in plaats van alleen een titel: "Waar dit naartoe leidt → *Je valkuilen* — dezelfde
  eigenschappen, nu vanaf de kant waar ze tegen je gaan werken" en "Waar dit vandaan komt ← *Wie
  je bent* — …". Een vaste tabel (`src/data/arcanaSectionNavReasons.ts`, sectie-id → reden
  vooruit/achteruit) koppelt dit aan elk van de 31 overgangen tussen de 32 hoofdstukken;
  deterministisch, geen scores, telt niet mee in de gouden master (de navigatie staat niet in de
  markdown-export). Waar geen reden in de tabel staat (het eerste en laatste hoofdstuk, en een
  eventuele niet-ingedeelde sectie), valt de link terug op de kale titel zoals voorheen. De "Kaart
  X / Y"-teller en de bestaande anker-/toetsenbordwerking zijn ongewijzigd.
- `window.confirm` bij "Opnieuw beginnen" en "Antwoorden wissen" is vervangen door een eigen
  `ArcanaConfirmDialog` (`role="dialog"`, `aria-modal`, focus-trap met Tab/Shift+Tab, Escape sluit,
  focus gaat bij openen naar de veilige knop en keert bij sluiten terug naar de knop die de dialoog
  opende). Beide dialogen gebruiken de letterlijke teksten en knopnamen uit `C` §5 "Bevestigingen"
  — twee knoppen die de handeling benoemen (`Ja, wis alles` / `Nee, laat staan` en `Ja, opnieuw
  beginnen` / `Nee, terug naar mijn rapport`) in plaats van "OK"/"Annuleren". De derde knop uit de
  spec ("Eerst bewaren als PDF") is niet gebouwd — de opdracht voor deze taak vroeg expliciet om
  twee knoppen; de zin "Bewaar eerst wat je wilt houden" staat wel in de dialoogtekst.
- Knoplabels: `Download als PDF` → `Bewaar als PDF`, met de instructie die eerder alleen in een
  `title`-attribuut stond (verschijnt op touch nooit) nu als zichtbare tekst eronder. `Rapport
  printen` → `Printen op papier`. `Rapport downloaden` → `Downloaden als tekstbestand (.md)`.
  Masthead-eyebrow: `Jouw archetype` → `Het patroon dat het sterkst naar voren kwam`. De
  archetypenamen zelf zijn niet vertaald — dat is een apart eigenaarsbesluit (`C` §4.11 rij 55) en
  viel buiten deze taak.
- Datumregel bovenaan het rapport (`C` §3.4-D), nu ook in de interface in plaats van alleen in de
  markdown-export: `Gemaakt op {datum} · 120 antwoorden · versie {n} van de berekening`.
- Versiecontrole zodat een `arcana_result` dat deze build niet kent nooit een leeg of kapot scherm
  geeft: `arcanaReportCompat.ts` keurt een rapport goed zolang de hoofdversie van `meta.version`
  bekend is (nu 2), ongeacht het minor/patch-cijfer — additieve rapportwijzigingen blijven dus
  gewoon renderbaar, geen harde 3.0.0-blokkade. Bij een onbekende of hogere hoofdversie, én als
  laatste vangnet bij een echte renderfout (`ArcanaReportErrorBoundary`, een class component),
  verschijnt `ArcanaReportIncompatible`: een uitlegscherm met een downloadknop (probeert eerst de
  bestaande markdown-export, valt terug op de ruwe opgeslagen data als zelfs dat struikelt) en "De
  test opnieuw doen". `ArcanaReportGate.tsx` voegt de versiecheck en de foutgrens samen vóór
  `ArcanaReport`, als één nieuwe lazy chunk in plaats van rechtstreeks `ArcanaReport`.

### Wat er bewust niet is veranderd
- De rapporttekst, de rapportgenerator, de scores, `REPORT_VERSION` (blijft 2.2.0): niet
  aangeraakt. De gouden master heeft 0 gewijzigde fixtures.
- De terugkeerondersteuning uit `C` §3.4 A/B/C (welkom-terug-kaart, leesmarkering, vergelijken na
  opnieuw invullen): staat nog open, alleen onderdeel D (de datumregel) zat in deze taak.
- De zes `STORAGE_KEYS` en hun vorm: ongewijzigd.

### Wat de bezoeker merkt
- Onderaan elk hoofdstuk staat nu een reden om door te klikken, niet alleen een titel.
- Wissen of opnieuw beginnen vraagt een bevestiging met knoppen die zeggen wat ze doen, niet "OK".
- "Bewaar als PDF" legt zelf uit wat er in het printvenster moet gebeuren, ook op een telefoon.
- Een rapport dat is opgeslagen met een andere versie van de berekening dan de app nu gebruikt,
  geeft nooit een lege pagina — altijd een uitleg, een download en een uitweg.

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Typecheck | 0 |
| Lint | 0 |
| Tests | 129 groen, 0 gewijzigd |
| Determinisme — gouden master | 0 gewijzigde fixtures |
| Contrast, rapport, licht/donker, incl. open dialoog | 0 fouten (688–693 knopen) |
| Build + domeincontrole + begroting | geslaagd (landingbundel ongewijzigd: alles nieuw zit in de rapportchunk) |

### Terugrollen
Zeven bestanden gewijzigd, vijf nieuw, alles in één commit. Geen opslagwijziging: terugdraaien
raakt geen `arcana_result`, `arcana_answers` of andere sleutel.

### Wat dit openlaat
- De terugkeerondersteuning (`C` §3.4 A/B/C) en de leesinstructie bij de `profile`-kaarten.
- Geen viewport-resize beschikbaar in het browserpaneel van deze sessie: 1440/390/320 px is niet
  apart gemeten. Wel geverifieerd: de echte layoutviewport was 1280×720 (bevestigd via
  `window.innerWidth`), het contrastscript liep daar met 0 fouten in licht én donker (ook met de
  dialoog open), en alle nieuwe CSS gebruikt dezelfde relatieve eenheden en `flex-wrap`-patronen
  als de rest van het bestand, plus één nieuwe `max-width: 480px`-regel voor het stapelen van de
  kaartnavigatie op smalle schermen. Niet met het oog op 320/390 px gecontroleerd.
- Screenshots op grote scrolldiepte (> ~2.000 px) leverden in deze sessie herhaaldelijk een leeg
  beeld op, los van de code (bevestigd via `getComputedStyle`/`elementFromPoint`: de content stond
  er wel, met de juiste kleuren). Waar een screenshot nodig was is dat opgevangen door dicht bij de
  paginatop te blijven of door de gerenderde HTML/computed styles direct te lezen.

## Taak 11 — Disclaimers, SEO en JSON-LD · 2026-09-23

### Wat er is veranderd
- De JSON-LD is één samenhangende graaf geworden: een `Organization` met `publisher`-verwijzingen
  vanuit `WebSite` en `WebApplication`, plus `inLanguage`, `audience`, `about` en `dateModified`.
- De `FAQPage` in de markup is aangevuld van 5 naar 9 vragen — exact de 9 die zichtbaar op de
  pagina staan (voorwaarde van Google). De accordeons houden hun antwoordtekst in de HTML, ook
  dicht.
- Het woordental "5.500" is op alle vier de plekken in `index.html` (og-, twitter-beschrijving,
  featureList, `#root`-fallback) `5.700` geworden, consistent met de statbalk en de meting.
- `og:image:alt` toegevoegd; de sitemap heeft nu een `lastmod`.
- Het domein staat nog op één bron: `.env.production` met `VITE_SITE_URL`. `robots.txt` en
  `sitemap.xml` worden daaruit gegenereerd (`scripts/generate-seo-files.mjs`), niet met de hand
  getypt. Een nieuwe `scripts/controleer-jsonld.mjs` parseert de JSON-LD uit de gebouwde bundel
  en faalt de build als een type ontbreekt of een URL van het eigen domein afwijkt.

### Wat er bewust niet is veranderd
- Geen `AggregateRating`, geen `Review`, geen gezondheids-/medisch type, geen `Quiz` (E §7.4
  verbiedt ze; verzonnen beoordelingen zijn het tegenovergestelde van waar dit merk voor staat).
- De `#root`-fallback en `noscript` blijven inhoudelijk gelijk, op de feitelijke woordental-
  correctie na. De drie disclaimersecties staan op dezelfde plek.
- De archetypenamen blijven Engels (eigenaarsbeslissing, §4.11 rij 55).

### Gemeten
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| `<title>` | 59 tekens | 59 tekens | ≤ 60 |
| `meta description` | 159 tekens | 159 tekens | ≤ 160 |
| FAQ-vragen in de markup | 5 | 9 | = 9 zichtbaar |
| JSON-LD-entiteiten / types | 3 | 4 (Organization erbij) | graaf met publisher |
| "5.500" in dist/index.html | 4 | 0 | 0 |
| speaktoart in verzendbare uitvoer | 0 | 0 | 0 |

### Regressiepoort
- `npm run build` draait nu `generate-seo-files` (eerst) en `controleer-jsonld` (na de build):
  beide geslaagd, domeincontrole geslaagd, begroting gehaald.
- **Bewezen:** een vreemde host in `dist/index.html` geeft `check-domains.mjs` exit 1; na
  verwijderen exit 0.
- typecheck 0, lint 0, 129 tests groen, gouden master 0 gewijzigd.
- De negen A §7-vinkjes staan in `docs/eindcontrole.md`.

### Wat dit openlaat
- Rich Results Test en Schema Markup Validator vereisen internet — een handmatige owner-stap.
- `arcana-rebuild.patch` (cruft met oude speaktoart-verwijzingen) wordt in taak 13 verwijderd.
- De volledige 18-contrastmatrix draait de eindcontrole-agent.

## Taak 12 — Het voorbeeldrapport als tweede URL · 2026-09-23

### Wat er is veranderd
- Er is nu een tweede, statische pagina: `/voorbeeld/` toont een volledig voorbeeldrapport (alle
  33 hoofdstukken, ~7.500 woorden) dat een bezoeker kan lezen vóór hij één vraag beantwoordt.
- De pagina is crawlbaar zonder JavaScript: de hele tekst staat in de HTML (gegenereerd bij de
  build uit een bestaande, geteste gouden fixture — geen engine in de build, dezelfde tekst die
  een echte deelnemer krijgt). Het score-overzicht toont leesbare dimensienamen in plaats van
  interne id's.
- Bovenaan én onderaan staat expliciet dat het een voorbeeld is, met een knop terug naar de test.
- De landingspagina heeft een nieuwe sectie "Kijk het zelf na — Je hoeft ons niets te geloven"
  (E §5.9): drie controleerbare dingen, waarvan het eerste blok naar het voorbeeldrapport linkt.
- Hero en slot-CTA hebben een klein "Liever eerst kijken? Lees het voorbeeldrapport"-linkje — de
  derde weg voor wie geen 25 minuten heeft.
- De sitemap noemt nu twee URL's.

### Wat er bewust niet is veranderd
- Geen SPA-route: de voorbeeldpagina is een echt statisch bestand (`/voorbeeld/index.html`),
  zodat een crawler hem zonder JavaScript volledig ziet — dezelfde techniek als de `#root`-fallback.
- Geen verzonnen bewijs op de "Kijk het zelf na"-sectie (geen recensies, sterren of afnamecijfers).

### Gemeten
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Indexeerbare URL's | 1 | 2 | 2 |
| Voorbeeldpagina zonder JS | — | 7.461 woorden in de HTML | volledige tekst |
| Contrast voorbeeldpagina, licht / donker | — | 0 / 0 (273 knopen) | 0 |
| Landingbundel (q11) | 65,8 KB | 66,4 KB | ≤ 75 KB |

### Regressiepoort
- typecheck 0, lint 0, 129 tests, gouden master 0 gewijzigd, build + domeincontrole + JSON-LD +
  begroting geslaagd. `genereer-voorbeeldpagina.mjs` draait na `vite build`; `check-domains`
  scant nu 20 bestanden inclusief de voorbeeldpagina.

### Wat dit openlaat
- Search Console moet beide URL's als ontdekt melden — een owner-stap (vereist een live site).
- De voorbeeldpagina gebruikt de fixture `balanced-je` (naam "Noor"); als de rapporttekst
  verandert, verandert de pagina mee bij de volgende build (de bron is een gouden fixture).

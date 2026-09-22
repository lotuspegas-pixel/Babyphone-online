# B — Designrichting: van elegant-maar-vlak naar levend

**Werkstroom B · 22 september 2026**
Gebaseerd op `SITE-INVENTARIS.md` (gemeten nulsituatie), `A-baseline.md` (diagnose en meetlat),
de volledige `app.pretty.css` (2.714 regels) en `app.beautified.js`.

> Alle kleurwaarden in dit document zijn doorgerekend, niet geschat. Contrast volgens WCAG 2.1
> (relatieve luminantie, sRGB). Kleurenblindheid gesimuleerd met de matrices van Machado,
> Oliveira & Fernandes (2009) op severiteit 1,0. Kleurafstand volgens CIEDE2000. De scripts staan
> in de bijlage van §6.

**Bij dit document horen:**

| Bestand | Wat |
|---|---|
| `B-moodboard.html` | Het beslisdocument. Drie richtingen naast elkaar, met palet, typografie, heroschets, kaartvoorbeeld en dimensiekleurenwiel. Werkt op telefoonbreedte. |
| `design-tokens.css` | Volledige tokenset voor de aanbevolen richting, licht én donker, direct bruikbaar als vervanging van de huidige `:root`. |
| `design-tokens.json` | Dezelfde tokens machineleesbaar voor fase G, inclusief alle gemeten ratio's en de simulatiewaarden. |
| `B-hero-a-perkament-en-diepte.png`<br>`B-hero-b-nacht-en-goud.png`<br>`B-hero-c-warm-en-nabij.png` | Originele hero-conceptillustraties, één per richting. |

---

## 1. Diagnose — waaróm het vlak oogt

De site is niet lelijk. Hij is *toonloos*: er zit geen verschil in. Dat is geen smaakoordeel maar
een reeks aanwijsbare eigenschappen van de CSS. Zes oorzaken, in volgorde van impact.

### 1.1 Het palet heeft geen middentoon — een gat van 56,7 luminantiepunten

Dit is de hoofdoorzaak. Alle twintig kleurtokens uit `:root`, gesorteerd op relatieve luminantie:

| Token | Hex | L | | Token | Hex | L |
|---|---|--:|---|---|---|--:|
| `--surface` | `#ffffff` | 100,0 % | | `--ink-faint` | `#8b8177` | 22,5 % |
| `--color-parchment` | `#fbf8f3` | 94,1 % | | `--editorial-gold` | `#bd6c00` | 21,5 % |
| `--color-parchment-veil` | `#f8f4ec` | 90,7 % | | `--interaction` | `#b66a08` | 20,3 % |
| `--color-parchment-deep` | `#f4eee4` | 86,0 % | | `--ember` | `#92610a` | 14,7 % |
| `--interaction-wash` | `#f6ede1` | 85,6 % | | `--growth` | `#0a7355` | 13,0 % |
| `--growth-soft` | `#dcf0ea` | 83,5 % | | `--editorial-gold-dark` | `#8b5008` | 11,2 % |
| `--ember-soft` | `#f1e6d3` | 80,0 % | | `--plum` | `#a81e1e` | 9,3 % |
| `--plum-soft` | `#f8e2e2` | 79,8 % | | `--teal` | `#4338ca` | 8,3 % |
| `--teal-soft` | `#e6e4fa` | 79,2 % | | `--interaction-strong` | `#7a4300` | 8,2 % |
| | | | | `--ink-soft` | `#574f47` | 8,1 % |
| | | | | `--ink` | `#292420` | 1,8 % |

Negen tokens zitten tussen 79,2 % en 100 %. Elf tokens zitten tussen 1,8 % en 22,5 %.
**Tussen 22,5 % en 79,2 % staat niets.** Het palet bestaat uit papier en inkt, en verder niets.

Diepte ontstaat door middentonen. Een pagina zonder middentoon kan geen ruimtelijkheid hebben,
hoeveel schaduw je er ook op legt. Dit is de reden dat de site "plat" oogt en het is de reden
dat geen enkele van de drie richtingen hieronder werkt zonder dat dit gat wordt gevuld.

Erger nog: de drie vlakken die de landingspagina *wél* gebruikt liggen binnen 8,5 luminantiepunten
van elkaar. `--color-parchment` tegen `--color-parchment-veil` is **1,04:1**. Tegen
`--color-parchment-deep` is het **1,09:1**. Een sectiewissel van 1,04:1 is voor het oog geen
sectiewissel.

### 1.2 Elf secties, één ritme

De landingspagina heeft elf secties. Alle elf hebben exact hetzelfde patroon:

```
gouden kapitaal-eyebrow  →  Cormorant-kop  →  grijze introzin  →  raster met kaarten
```

Alle elf gebruiken hetzelfde vlak (`--color-parchment`, drie ervan `--color-parchment-veil`).
Alle elf zijn gescheiden door dezelfde `border-top: 1px solid var(--color-hairline)`.
Alle kaarten zijn identiek: `background: #fff`, `border: 1px solid var(--color-hairline)`,
`border-top: 3px solid var(--interaction)` — **dezelfde gouden bovenrand op elke kaart van de
pagina**, ongeacht waar ze over gaan. Er is geen enkele sectie die volle breedte neemt, geen enkele die
donker is, geen enkele die iets anders doet dan de vorige.

De paginahoogte is 7.083 px. Dat zijn ongeveer zeven schermen waarin niets van vorm verandert.

### 1.3 `--shadow: none`, en één echte schaduw op de hele site

Het token `--shadow` staat op `none` en wordt in de hele CSS **geen enkele keer aangeroepen**
(`var(--shadow)` komt nul keer voor in 2.714 regels). Er staan tien `box-shadow`-declaraties in
het bestand; zeven daarvan zijn `inset`-ringen of `none`. Er zijn precies **twee** echte
slagschaduwen, en op de landingspagina staat er daarvan maar één: de bol onderaan de trechter
(regel 2316). Elke kaart op de landingspagina ligt exact in het paginavlak.

### 1.4 De haarlijnen zijn onzichtbaar

`--color-hairline: #2924201a` is 10 % zwart. Op perkament levert dat `#e6e3de`, een contrast van
**1,21:1**. `--color-hairline-soft` is 7 %. Die lijnen scheiden secties, kaarten, lijstitems en
tabelrijen. Ze doen hun werk niet: op een gemiddeld kantoorscherm bij normale helderheid zijn ze
bij benadering niet aanwezig. Het gevolg is dat alle structuur die ze zouden moeten aanbrengen
wegvalt, en dat versterkt de indruk van één ononderbroken lap tekst.

### 1.5 Vier accentkleuren die in `:root` staan en nergens worden gebruikt

`--teal #4338ca`, `--plum #a81e1e`, `--growth #0a7355` en `--ember #92610a` zijn gedefinieerd,
compleet met `-fill`- en `-soft`-varianten. Op de landingspagina komen ze **nul keer** voor.
Ze leven alleen in het rapport.

Er is dus al een betekenisdragend kleursysteem aanwezig. Het staat uit. (En `--teal` is geen
teal maar indigo — een naamgevingsfout die in het nieuwe systeem wordt opgelost.)

### 1.6 Eén beeld op 7.083 pixels

De sepia-gravure (`valley-zxDIuK9C.webp`, 1600 × 651) is het enige beeld op de hele site. Hij is
goed: een gegraveerd dal met een kompasster, `mix-blend-mode: multiply` op perkament, warm en
rustig. Maar hij staat op één plek, hij is `clamp(150px, 26vw, 330px)` hoog, en daarna volgen
zes schermen zonder enig visueel rustpunt.

### 1.7 De typografische schaal bestaat niet

102 `font-size`-declaraties met **58 unieke waarden**: `12px`, `12,5px`, `13px`, `13,5px`,
`14px`, `14,5px`, `15px`, `16px`, `17px`, `0,68rem`, `0,7rem`, `0,72rem`, `0,74rem`, `0,76rem`,
`0,78rem`, `0,8rem`, `0,82rem`, `0,85rem`, `0,86rem`, `0,88rem` … Er is geen verhouding, geen
reeks, geen systeem. Twintig waarden liggen binnen één stap van 0,2 rem van elkaar. Het oog
registreert die verschillen niet als hiërarchie, alleen als ruis. Hiërarchie ontstaat door
sprongen, niet door schuiven.

### 1.8 Het beste van het product zit achter de hoogste drempel — en het wiel is bovendien stuk

Het scorewiel is het sterkste visuele element dat dit product bezit, en een bezoeker ziet het pas
na 20 tot 25 minuten. De landingspagina *beschrijft* het rapport in zes kaarten met tekst; hij
laat er niets van zien.

Bovendien deugt het kleursysteem van het wiel zelf niet. De twaalf kleuren staan hard gecodeerd in
`app.beautified.js` (regel 13932–14002) en vormen één doorlopende kleurtrap van indigo via groen en
olijf naar karmijn:

| # | Dimensie | Hex | Contrast op perkament | |
|---|---|---|--:|---|
| 1 | Innerlijke motor | `#33386b` | 10,33 | AA |
| 2 | Sociale energie | `#33527a` | 7,54 | AA |
| 3 | Denkstijl | `#2f6b78` | 5,67 | AA |
| 4 | Emotionele gevoeligheid | `#2f7f6d` | 4,53 | AA |
| 5 | Controle en zekerheid | `#4c8a5b` | 3,89 | onder AA |
| 6 | Conflictstijl | `#75934f` | 3,28 | onder AA |
| 7 | Zelfbeeld | `#9a9349` | **2,98** | **haalt 1.4.11 (3:1) niet** |
| 8 | Schaduwkant | `#b58b41` | **2,94** | **haalt 1.4.11 (3:1) niet** |
| 9 | Relatiepatroon | `#bf7540` | 3,40 | onder AA |
| 10 | Werkstijl | `#b85a41` | 4,33 | onder AA |
| 11 | Stressreactie | `#a6423f` | 5,71 | AA |
| 12 | Groeipad | `#8e3350` | 7,24 | AA |

Twee van de twaalf halen zelfs de grafische ondergrens van 3:1 niet. Zes halen de tekstgrens van
4,5:1 niet, wat betekent dat je deze kleuren nergens als label of tekst kunt inzetten.

En dan de kleurenblindheid. De laagste onderlinge afstand over alle 66 paren en de drie
simulaties: **ΔE2000 = 1,4** tussen *Zelfbeeld* en *Schaduwkant* onder protanopie. De net
waarneembare drempel ligt rond 2,3. Voor iemand met rood-groenblindheid — ongeveer 8 % van de
mannen — zijn die twee dimensies op het wiel **niet te onderscheiden**.

Dit is niet zichtbaar in de nulmeting van A (0 fouten op 693 tekstknopen), en terecht: het wiel
is een `<canvas>` zonder tekstknopen. De meting was correct; het probleem zit in een laag die
een tekstcontrastmeting per definitie niet ziet.

### 1.9 Samengevat

Het rapport is mooier dan de pagina die het verkoopt. De pagina heeft geen middentonen, geen
schaduw, geen zichtbare lijnen, geen typografische schaal, elf identieke secties, één beeld en
vier ongebruikte accentkleuren. Dat is geen kwestie van smaak maar van ontbrekend materiaal.

---

## 2. Drie richtingen

Alle drie zijn volwaardig. Alle drie halen op elk tekstvlak WCAG-AA. Alle drie gebruiken hetzelfde
dimensiekleurensysteem uit §3 — alleen de tint verschilt per modus. Vergelijk ze naast elkaar in
`B-moodboard.html`.

---

### (a) Perkament & Diepte — *behoud de ziel, verfijnd*

**Het idee.** Dezelfde inkt, hetzelfde serif, dezelfde stem; wat erbij komt is bodem. Het
luminantiegat uit §1.1 wordt gevuld met vier echte vlakken tussen 69,5 % en 98,4 %, zodat een
sectiewissel weer een sectiewissel is. `--shadow: none` wordt een reeks van vier warme, laag
gedoseerde schaduwen die kaarten uit het vlak tillen zonder de pagina bont te maken. De haarlijn
gaat van 10 % naar 18 % en wordt zichtbaar. De vier accentkleuren die al in `:root` stonden worden
het betekenissysteem uit §3 en debuteren in sectie 6. Twee donkere blokken breken het ritme van
elf identieke secties. Het perkament blijft perkament; het krijgt alleen een achterkant.

**Palet — licht** (contrast gemeten op `--bg #fbf8f3` en op de donkerste band `--bg-band #e4d8c2`):

| Token | Hex | L | op `--bg` | op `--bg-band` | eis |
|---|---|--:|--:|--:|---|
| `--surface` | `#ffffff` | 100,0 % | — | — | vlak |
| `--surface-raised` | `#fffdf9` | 98,4 % | — | — | vlak |
| `--bg` | `#fbf8f3` | 94,1 % | — | — | vlak |
| `--bg-veil` | `#f6f0e5` | 87,6 % | — | — | vlak |
| `--bg-deep` | `#efe6d6` | 79,8 % | — | — | vlak |
| `--bg-band` | `#e4d8c2` | 69,5 % | — | — | vlak |
| `--bg-ink` | `#241f1a` | 1,4 % | — | — | vlak |
| `--ink` | `#241f1a` | | **15,42** | **11,59** | AA |
| `--ink-soft` | `#554d44` | | **7,83** | **5,89** | AA |
| `--ink-faint` | `#655b50` | | **6,26** | **4,71** | AA |
| `--gold` | `#7f4c04` | | **6,75** | **5,07** | AA |
| `--gold-deep` | `#5e3a05` | | **9,51** | **7,15** | AA · knop en focusring |
| `--gold-glyph` | `#b06a00` | | 4,04 | 3,04 | alleen grafisch (≥ 3:1), niet op `--bg-band` |
| `--btn-fg` op `--btn-bg` | `#fffaf2` / `#5e3a05` | | **9,70** | | AA |
| `--ink-inverse` op `--bg-ink` | `#f4ede1` / `#241f1a` | | **14,03** | | AA |

De oude `--ink-faint #8b8177` haalde 3,60 en was daarmee ongeschikt voor tekst; de nieuwe haalt
6,26 en mag overal staan.

**Palet — donker** (warm bijna-zwart; het perkament wordt nacht, geen scherm):

| Token | Hex | L | op `--bg #16130f` | op `--surface #1f1b16` |
|---|---|--:|--:|--:|
| `--bg` | `#16130f` | 0,67 % | — | — |
| `--bg-veil` | `#1b1712` | 1,13 % | — | — |
| `--surface` | `#1f1b16` | 1,52 % | — | — |
| `--surface-raised` | `#262019` | 1,91 % | — | — |
| `--bg-band` | `#322a20` | 2,44 % | — | — |
| `--bg-ink` (papierblok) | `#f2ece0` | 84,3 % | — | — |
| `--ink` | `#ede5d9` | | **14,82** | **13,70** |
| `--ink-soft` | `#c2b7a6` | | **9,36** | **8,66** |
| `--ink-faint` | `#a29786` | | **6,44** | **5,96** |
| `--gold` | `#e3b866` | | **9,98** | **9,22** |
| `--gold-deep` | `#c2953f` | | **6,76** | **6,25** |
| `--gold-glyph` | `#f0cb8c` | | **12,01** | **11,11** |
| `--btn-fg` op `--btn-bg` | `#1b1610` / `#e3b866` | | **9,68** | |

**Typografie.** Cormorant Garamond en Inter blijven. Wat verandert is de schaal: de 58 losse
waarden uit §1.7 worden elf treden met verhouding 1,20 op mobiel oplopend naar 1,26 op desktop,
allemaal vloeiend (`clamp`). Cormorant krijgt meer contrast in gewicht: 500 voor koppen, 600 voor
kaartkoppen, 400 cursief voor de citaten in de beschouwingen. Inter blijft 400/500/600, maar het
gewicht 600 wordt gereserveerd voor kapitaal-eyebrows en knoplabels, niet meer voor lopende
tekst. Regellengte wordt begrensd op 64 tekens (`--measure-prose`) — het rapport telt 7.559
woorden en dat moet leesbaar blijven. Eén lettergewicht kan eruit (Inter 500 óf Cormorant 600),
wat ongeveer 22 KB scheelt op de 94 KB fonts uit de nulmeting.

**Beeld.** De gravure blijft, maar verhuist: hij wordt de onderlaag van de hero in plaats van een
losse strook op plek 2. Daarnaast komen er twee nieuwe beeldmomenten: (i) een **echt scorewiel met
een voorbeeldscore**, in SVG, op de plek waar nu de losse gravure staat — de bezoeker ziet binnen
één scherm wat hij krijgt; (ii) een **uitsnede uit een echte rapportpagina** in sectie 7. Drie
beeldmomenten in plaats van één, en het sterkste van twee is een product-screenshot, geen
illustratie.

**Hero.** Perkament, het gegraveerde dal als fijne contourlijn onderin, en daarboven het
twaalfstralige kompas waarvan elke straal een dimensiekleur draagt (zie
`B-hero-a-perkament-en-diepte.png`). Het wordmerk "Arcana / Profile" in Cormorant 500 op
`clamp(3.25rem, 1.20rem + 10.2vw, 8.5rem)`, de belofte eronder op 34 rem, de knop in `--gold-deep`
met witte tekst (9,70:1), en de drie geruststellingen als rij met gouden sterretjes. Onder de
vouw, over de volle breedte, het voorbeeldwiel.

**Voor wie.** De bezoeker die al aanvoelt dat dit serieus bedoeld is en dat wil geloven. Lezers,
twijfelaars, mensen die naar een coachgesprek toewerken, mensen die "narekenbaar" een aantrekkelijk
woord vinden. Het is de richting die het huidige publiek behoudt en verdiept.

**Risico.** Te weinig verschil met vandaag. Als de uitvoering halfhartig is — schaduwen te zacht,
donkere blokken te voorzichtig, kleursysteem alleen in het rapport — blijft het een keurige pagina
die niemand onthoudt. Dit is de richting die staat of valt met durf in de uitvoering, en dat is
precies het soort risico dat in een oplevering onder tijdsdruk als eerste wordt weggeschaafd.

**Bouwkosten.** Laag. Vervang `:root` door `design-tokens.css`, herschrijf de sectie-CSS
(`.landing__sectie`, `.landing__kaart`, `.landing__stats`, `.landing__dimensies`), bouw het
scorewiel om van `<canvas>` naar SVG, voeg de donkere modus toe. De componentstructuur en alle
React-componenten blijven staan. **5 tot 8 dagen**, plus 2 tot 3 dagen voor de donkere modus en
het SVG-wiel.

---

### (b) Nacht & Goud — *modern-mystiek-premium*

**Het idee.** Donker is hier geen alternatief maar het uitgangspunt. Diep indigoblauw-zwart als
basis, goud als enige warme kleur, en het scorewiel als lichtgevend object in het midden van de
pagina. De typografie mag groter en losser staan omdat er meer zwart omheen is. Het rapport van
7.559 woorden leest 's avonds zonder pijn. De landingspagina wordt een affiche in plaats van een
folder — en het product krijgt de visuele ambitie die het inhoudelijk al heeft.

**Palet** (donker primair; alle contrasten gemeten op de vier donkere vlakken):

| Token | Hex | L | op `#0e0d14` | op `#191627` | op `#211d33` | op `#2b2540` |
|---|---|--:|--:|--:|--:|--:|
| `--bg` | `#0e0d14` | 0,43 % | — | — | — | — |
| `--bg-veil` | `#141220` | 0,68 % | — | — | — | — |
| `--surface` | `#191627` | 0,93 % | — | — | — | — |
| `--surface-raised` | `#211d33` | 1,39 % | — | — | — | — |
| `--bg-band` | `#2b2540` | 2,24 % | — | — | — | — |
| `--paper-block` | `#f3ece0` | 84,4 % | — | — | — | — |
| `--ink` | `#ece6f2` | | **15,80** | **14,48** | **13,33** | **11,91** |
| `--ink-soft` | `#bdb5c9` | | **9,77** | **8,96** | **8,24** | **7,37** |
| `--ink-faint` | `#9a93a8` | | **6,55** | **6,00** | **5,52** | **4,93** |
| `--gold` | `#e0b25c` | | **9,84** | **9,02** | **8,30** | **7,42** |
| `--gold-bright` | `#f2c97e` | | **12,36** | **11,33** | **10,43** | **9,32** |
| `--gold-deep` | `#bd8d3c` | | **6,48** | **5,94** | **5,46** | **4,88** |
| `--indigo-glow` | `#8f8cff` | | **6,78** | **6,21** | **5,72** | **5,11** |
| `--btn-fg` op `--btn-bg` | `#17141f` / `#e0b25c` | | **9,25** | | | |
| `--ink` op `--paper-block` | `#241f1a` / `#f3ece0` | | **13,91** | | | |

Let op het luminantiebereik van de donkere vlakken: 0,43 % tot 2,24 %. Dat is krap, maar het is
voldoende — op donkere achtergronden is een luminantieverhouding van 1:5 tussen basis en band
zichtbaarder dan hetzelfde verschil in het licht, omdat de ogen bij lage helderheid gevoeliger
zijn voor relatieve stappen. Het papierblok op 84,4 % is de tegenhanger van het inktblok in (a):
één lichte sectie in een donkere pagina, precies daar waar de inhoud "wat dit niet is" betreft.

**Lichte modus.** Verplicht, en dat is de kostenpost. Een donkere hoofdmodus zonder lichte modus
is niet acceptabel: een deel van het publiek leest slecht op donker, en `prefers-color-scheme:
light` is een expliciete voorkeur. De lichte modus van (b) is niet het palet van (a) maar een
eigen, koelere variant (perkament met indigo in plaats van sepia) — dat is dus een tweede
volwaardig palet, niet een omkering.

**Typografie.** Cormorant Garamond blijft, maar krijgt meer ruimte: koppen op
`clamp(2rem, 1.58rem + 2.10vw, 3.25rem)` en het wordmerk tot 8,5 rem, met `letter-spacing: -0.055em`.
Op donker oogt serif optisch dunner dan op licht; daarom gaat het displaygewicht van 400 naar 500 en
de regelafstand van 1,08 naar 1,12. Inter blijft de body, maar op 400 in plaats van 500, omdat licht
op donker optisch vetter uitvalt. Kapitalen krijgen `letter-spacing: 0.16em` in plaats van 0,14 —
op donker lopen letters sneller in elkaar over.

**Beeld.** Nieuw en donker. De sepia-gravure kan niet mee: `mix-blend-mode: multiply` werkt niet op
zwart en een lichte gravure op donker oogt als een negatief. Er is nieuw beeldmateriaal nodig — in
dit voorstel een gegraveerde nachtboog met twaalf meridianen
(`B-hero-b-nacht-en-goud.png`). Het scorewiel wordt het belangrijkste beeldelement van de site,
niet alleen van het rapport, en licht letterlijk op tegen het zwart.

**Hero.** Volledig zwart scherm. Het wordmerk groot en gecentreerd in Cormorant, daaronder de
belofte in `--ink-soft`, daaronder één gouden knop. Achter alles de nachtboog met de twaalf
meridianen die vanuit het midden naar de horizon lopen. Geen kaarten, geen statbalk boven de vouw —
alleen de titel, de belofte, de knop en de drie geruststellingen.

**Voor wie.** Wie iets bijzonders verwacht. Jongere bezoekers, mensen die de test 's avonds op hun
telefoon doen, mensen die hem doorsturen omdat hij er goed uitziet. Dit is de richting die het
meest gedeeld zal worden en waarvan de OG-kaart het beste werkt.

**Risico.** Twee, en ze zijn allebei reëel. (i) Mystiek kan kantelen naar esoterisch, en juist daar
zit de geloofwaardigheid van dit product. De hele propositie is "elke zin komt uit een score" en
"er zit geen taalmodel in" — die belofte verdraagt weinig sterrenstof. Goud en nacht zijn ook de
kleuren van tarot en horoscopen, en dat is precies het hokje waar Arcana Profile uit probeert te
blijven. (ii) Donker is de hoofdmodus, dus elke fout in de lichte modus raakt de helft van de
bezoekers, en de lichte modus krijgt in de praktijk altijd minder aandacht.

**Bouwkosten.** Hoog. Alles moet twee keer, en geen van beide modi mag de tweede viool spelen.
Nieuw beeldmateriaal (de bestaande gravure vervalt). Het scorewiel moet in twee paletten werken.
De 33 rapporthoofdstukken moeten in donker doorgelopen worden op leesbaarheid over 21.716 pixels.
**12 tot 18 dagen**, plus illustratiekosten.

---

### (c) Warm & Nabij — *warm-eigentijds-toegankelijk*

**Het idee.** Minder antiquarisch. Het sepia gaat eruit en er komt warm wit voor in de plaats; het
zestiende-eeuwse serif maakt plaats voor een eigentijds serif met meer gewicht en meer
persoonlijkheid; het goud maakt plaats voor twee accenten die niets met oude boeken te maken
hebben: klei en diep blauwgroen. De secties worden korter, er komt meer beeld, en de eerste vraag
staat zichtbaar boven de vouw. Deze richting is er niet om mooier te zijn maar om de start-rate te
verhogen — de enige KPI die er volgens `A-baseline.md` §4 voor de rebuild echt toe doet.

**Palet:**

| Token | Hex | L | op `--bg #fdfbf8` | op `--bg-band #dcd3c8` | eis |
|---|---|--:|--:|--:|---|
| `--bg` | `#fdfbf8` | 96,7 % | — | — | vlak |
| `--bg-veil` | `#f5f1ec` | 88,4 % | — | — | vlak |
| `--bg-deep` | `#ece6de` | 79,7 % | — | — | vlak |
| `--bg-band` | `#dcd3c8` | 66,0 % | — | — | vlak |
| `--surface` | `#ffffff` | 100,0 % | — | — | vlak |
| `--ink-block` | `#20242b` | 1,7 % | — | — | vlak |
| `--ink` | `#20242b` | | **15,07** | **10,53** | AA |
| `--ink-soft` | `#4c525c` | | **7,62** | **5,32** | AA |
| `--ink-faint` | `#555b64` | | **6,63** | **4,63** | AA |
| `--clay` | `#9e381f` | | **6,69** | **4,67** | AA |
| `--clay-deep` | `#8d3320` | | **7,74** | **5,40** | AA · knop |
| `--teal` | `#0c6063` | | **7,09** | **4,95** | AA |
| `--teal-deep` | `#0a5254` | | **8,66** | **6,05** | AA · focusring |
| `--btn-fg` op `--btn-bg` | `#ffffff` / `#8d3320` | | **7,99** | | AA |
| `--ink-inverse` op `--ink-block` | `#f6f3ee` / `#20242b` | | **14,07** | | AA |

De inkt is hier niet sepia maar koelgrijs (`#20242b`, hue 250 in plaats van 61). Dat is het
grootste verschil met (a) en (b): het maakt de pagina onmiddellijk minder oud en minder warm, en
het is ook de reden dat deze richting een ander merk oplevert.

**Typografie.** Cormorant Garamond vervalt. In de plaats komt **Fraunces** (of Instrument Serif als
lichter alternatief): een eigentijds serif met optische grootte, meer gewicht in de stok en een
minder klassieke spatiëring. Inter blijft, maar de body gaat naar 17 px basis in plaats van 16 en
de regelafstand naar 1,68 voor lopende tekst. Koppen worden korter en zwaarder (600 in plaats van
500). Netto: de pagina leest sneller en oogt minder als een uitgave. Fraunces is een variabel font
en vervangt drie statische Cormorant-bestanden, wat ongeveer gelijk uitkomt qua bytes.

**Beeld.** Geen gravures. In plaats daarvan diagrammatisch beeld dat het mechanisme laat zien:
de twaalf draden die uit honderdtwintig antwoorden tot één patroon worden gevlochten
(`B-hero-c-warm-en-nabij.png`), een echte rapportuitsnede, en het scorewiel. Minder sfeer, meer
uitleg. Dat past bij een publiek dat eerst wil weten wat het is.

**Hero.** Warm wit, links een korte kop in Fraunces ("Lees terug wat je patronen zijn"), de belofte
eronder, de knop in klei, en rechts het diagram van de twaalf draden. Twee kolommen op desktop,
gestapeld op mobiel. Direct onder de vouw: **een echte voorbeeldvraag met de zeven antwoordknoppen**,
aanklikbaar. Wie erop klikt zit in de test. Dat is de grootste ingreep van deze richting en de reden
dat hij de start-rate kan verhogen: het formulier met het naamveld (§3.4 van A) verhuist naar ná
vraag 1 of verdwijnt helemaal.

**Voor wie.** Wie langsloopt en niets met het woord "arcana" heeft. Een breder, jonger, minder
literair publiek — en in het bijzonder de sceptische deelnemer uit de usabilitytest in
`A-baseline.md` §6.

**Risico.** Je verliest wat dit product onderscheidt. De literaire toon is de reden dat het rapport
landt; als de buitenkant belooft dat het licht en toegankelijk is, valt de eerste alinea van 5.500
woorden beschouwing zwaar. Er is een reëel scenario waarin de start-rate stijgt en de voltooiingsrate
daalt, en dat is per saldo verlies. **Dit risico is nu niet te beoordelen omdat de usabilitytest uit
`A-baseline.md` §6 nog niet is gedraaid.** Kiezen voor (c) is kiezen op een aanname.

**Bouwkosten.** Middel tot hoog. Nieuw display-lettertype, nieuw beeld, nieuwe sectie-indeling, een
verbouwde onboarding-flow, en de copy moet mee (de huidige teksten zijn geschreven voor het
antiquarische register). **10 tot 14 dagen**, plus copywriting.

---

### Aanbeveling

**Bouw (a) Perkament & Diepte, met de donkere modus uit (b) integraal meegeleverd.**

Drie redenen.

1. **Het gemeten probleem is niet de identiteit van het palet.** Het is het ontbreken van
   middentonen (§1.1), van schaduw (§1.3), van zichtbare lijnen (§1.4), van een typografische
   schaal (§1.7) en van beeld (§1.6). Al die vijf gebreken worden door (a) opgelost zonder dat er
   één merkbeslissing overboord gaat. Een pagina die van drie vlakken naar zeven gaat en van nul
   naar vier schaduwniveaus ziet er wezenlijk anders uit, ook als de kleuren hetzelfde blijven.
   Wie denkt dat (a) "te weinig verandert", onderschat hoe groot dat verschil is.

2. **De donkere modus levert het drama van (b) zonder de weddenschap van (b).** Nul
   `prefers-color-scheme`-regels bij een rapport van 21.716 pixels is de duidelijkste omissie in de
   hele nulmeting. Door de donkere modus van (a) uit te voeren als een volwaardige, donker-eerste
   ervaring — warme nacht, goud, het wiel als lichtbron — krijgt de helft van de bezoekers die
   's avonds leest precies wat (b) belooft, terwijl de lichte modus de literaire geloofwaardigheid
   overeind houdt. Dat is geen compromis maar twee goede antwoorden op twee verschillende
   leessituaties.

3. **(c) is een gok op een publiek dat nog niet gemeten is.** De hele rechtvaardiging van (c) is
   een hogere start-rate. Er zit geen analytics op de site (`A-baseline.md` §4) en de
   guerrilla-usabilitytest (§6) is nog niet gedraaid. Kiezen voor (c) betekent nu het merk
   veranderen op basis van een vermoeden. **Draai eerst die test van vijf mensen.** Als vier van de
   vijf bij stap 1 niet snappen wat het product is, is dat een sterker argument voor (c) dan wat er
   ook in dit document staat — en dan is (c) alsnog te bouwen, want de tokenstructuur uit
   `design-tokens.css` is richtingonafhankelijk.

Wat uit (b) en (c) hoe dan ook meekomt, ongeacht de keuze: de donkere modus (uit b) en de
voorbeeldvraag boven de vouw plus het verplaatsen van het naamveld (uit c). Die twee zijn
goedkoop en hebben in geen enkel scenario een nadeel.

---

## 3. Het accentkleursysteem als betekenisdrager

### 3.1 Waarom twaalf losse kleuren niet werken — met het bewijs erbij

De opdracht luidt: twaalf onderscheidbare kleuren die AA halen op perkament én op donker, en die
onderscheidbaar blijven onder de drie veelvoorkomende vormen van kleurenblindheid. Het eerste deel
is oplosbaar. Het tweede deel is dat niet, en dat moet eerst vaststaan voordat je een systeem
ontwerpt dat er wél tegen kan.

Twee harde beperkingen:

**(i) Eén hex kan niet AA halen op perkament én op donker.** Contrast 4,5:1 tegen `#fbf8f3`
(L 94,1 %) vereist een relatieve luminantie van ten hoogste 17,0 %. Contrast 4,5:1 tegen een
donker vlak van L ≈ 1,5 % vereist een luminantie van ten minste 22,0 %. Die twee eisen sluiten
elkaar uit. Elke dimensie heeft dus **twee tinten** nodig — dezelfde kleur, andere lichtheid — die
via `prefers-color-scheme` omwisselen. Alles wat beweert dat één waarde volstaat, meet niet.

**(ii) Rood-groenblindheid maakt van een kleurenwiel een grijsas.** Protanopie en deuteranopie
klappen het rood-groenkanaal dicht; wat overblijft is vrijwel één blauw-geelas plus lichtheid.
Twaalf categorieën in een tweedimensionale ruimte waarin ook nog de contrasteis de lichtheid
vastzet, is simpelweg te veel.

Om te weten hoeveel te veel, is dit doorgerekend. Een optimalisatie over twaalf kleuren
(hoek, chroma en contrastniveau vrij), met als enige eis dat alle twaalf minstens 4,5:1 halen op
perkament, en als doel de kleinste onderlinge CIEDE2000-afstand over alle 66 paren en vier
zichtcondities te maximaliseren, komt uit op **ΔE2000 ≈ 10,6**. Dat is het theoretische plafond.
Voor betrouwbare categorische identificatie op kleur alleen wil je ΔE ≥ 15 à 20.

**Conclusie: er bestaat geen palet van twaalf kleuren dat deze eis haalt.** Niet dit palet, geen
enkel palet. Wie zegt van wel, heeft niet gemeten. De oplossing zit dus niet in betere kleuren maar
in een betere architectuur.

### 3.2 De oplossing: vier families van drie, plus drie niet-kleurdragers

Twaalf categorieën is te veel voor kleur. **Vier is dat niet.** Daarom draagt de kleur de
*familie*, en onderscheidt de lichtheid het *lid binnen* de familie. Dat is precies wat de vier
bestaande tokens al aanbieden, en het sluit inhoudelijk aan op de structuur van het rapport.

| Familie | Symbool | Uit bestaand token | Betekenis | Dimensies |
|---|:--:|---|---|---|
| **indigo** | ◆ | `--teal #4338ca` | motor en richting | Innerlijke motor · Denkstijl · Werkstijl |
| **groen** | ● | `--growth #0a7355` | contact | Sociale energie · Emotionele gevoeligheid · Relatiepatroon |
| **amber** | ▲ | `--ember #92610a` | grip | Controle en zekerheid · Conflictstijl · Stressreactie |
| **karmijn** | ■ | `--plum #a81e1e` | zelf | Zelfbeeld · Schaduwkant · Groeipad |

De groepering is niet willekeurig. Ze volgt de zesdelige structuur van het rapport: *Wie je bent*
(motor), *Jij en anderen* (contact), *Onder druk en in je kracht* (grip), *Groeien* (zelf). Een
lezer die het wiel bekijkt ziet vier kwadranten die overeenkomen met vier hoofdstukken, in plaats
van een regenboog zonder betekenis.

**Dit vereist één codewijziging.** De huidige volgorde van de array `w` in `app.beautified.js`
(regel 13932) is *innerMotor, socialPattern, thinkingStyle, emotionalSensitivityMain,
controlAndSecurity, conflictStyle, selfImage, shadowPattern, relationshipPattern, workStyle,
stressPattern, growthPath*. De nieuwe volgorde groepeert per familie. Dat verandert de visuele
volgorde op het wiel en in de legenda, maar niet één score en niet één zin in het rapport. De
regressietest uit `A-baseline.md` §7 (markdown-export vergelijken) moet hierop worden aangepast:
vergelijk op sleutel, niet op positie.

**Naast kleur staan altijd drie andere dragers.** Dit is niet optioneel en niet cosmetisch:

1. **Het label.** Elke dimensie toont altijd zijn naam. Het `<canvas>` wordt vervangen door SVG
   met `<title>` per segment, een `<desc>` voor het geheel, en — belangrijker — een zichtbare
   tabel eronder met dimensie, score en balk. Wie het wiel niet kan lezen, om welke reden dan ook,
   leest de tabel.
2. **De vaste positie.** Dimensie 1 staat altijd op twaalf uur, en de volgorde staat vast over het
   hele rapport. Positie is een even betrouwbare drager als kleur, en hij overleeft elke vorm van
   kleurenblindheid.
3. **Het familiesymbool** (◆ ● ▲ ■). Klein, voor het label, overal waar een dimensie genoemd wordt.
   Vier vormen zijn op afstand te onderscheiden en in monochrome print ook.

### 3.3 De twaalf kleuren, gemeten

Contrastniveaus zijn per familie getrapt (ongeveer 4,6 · 6,2 · 9,3) zodat de lichtheid binnen een
familie het lid aanwijst, en tussen families verspringen zodat niet alle vier de families dezelfde
drie luminanties delen — dat laatste was de grootste bron van botsingen in de eerste
optimalisatieronde.

**Lichte modus** — contrast gemeten op `--bg #fbf8f3` en op `--surface #ffffff`:

| Familie | Dimensie | Token | Hex | op `--bg` | op `--surface` | wash |
|---|---|---|---|--:|--:|---|
| ◆ indigo | Innerlijke motor | `--dim-innerlijke-motor` | `#496cca` | **4,63** | 4,91 | `#e9f0ff` |
| ◆ indigo | Denkstijl | `--dim-denkstijl` | `#4242a2` | **7,83** | 8,29 | `#ecefff` |
| ◆ indigo | Werkstijl | `--dim-werkstijl` | `#3c2c73` | **11,01** | 11,67 | `#efeeff` |
| ● groen | Sociale energie | `--dim-sociale-energie` | `#068062` | **4,64** | 4,92 | `#cdfdea` |
| ● groen | Emotionele gevoeligheid | `--dim-emotionele-gevoeligheid` | `#006a5c` | **6,16** | 6,53 | `#c9fdf1` |
| ● groen | Relatiepatroon | `--dim-relatiepatroon` | `#005041` | **8,91** | 9,44 | `#cbfdee` |
| ▲ amber | Controle en zekerheid | `--dim-controle-zekerheid` | `#866e34` | **4,62** | 4,89 | `#ffefca` |
| ▲ amber | Conflictstijl | `--dim-conflictstijl` | `#755a00` | **6,16** | 6,52 | `#ffefc8` |
| ▲ amber | Stressreactie | `--dim-stressreactie` | `#633a00` | **9,28** | 9,83 | `#ffeddb` |
| ■ karmijn | Zelfbeeld | `--dim-zelfbeeld` | `#ae527b` | **4,62** | 4,89 | `#ffeaf1` |
| ■ karmijn | Schaduwkant | `--dim-schaduwkant` | `#bc395c` | **5,11** | 5,42 | `#ffeaed` |
| ■ karmijn | Groeipad | `--dim-groeipad` | `#85003c` | **9,61** | 10,18 | `#ffeaee` |

Alle twaalf halen AA als tekst. De wash-vlakken zijn zo gekozen dat `--ink #241f1a` er
13,3 tot 13,8:1 op haalt, zodat een gekleurd blok altijd leesbaar blijft.

**Donkere modus** — contrast gemeten op `--surface #1f1b16` en op `--bg #16130f`:

| Familie | Dimensie | Hex | op `--surface` | op `--bg` | wash |
|---|---|---|--:|--:|---|
| ◆ indigo | Innerlijke motor | `#6284d7` | **4,73** | 5,11 | `#1d2945` |
| ◆ indigo | Denkstijl | `#99a3fe` | **7,36** | 7,96 | `#242745` |
| ◆ indigo | Werkstijl | `#cec8ff` | **10,87** | 11,75 | `#2a2543` |
| ● groen | Sociale energie | `#3e9377` | **4,60** | 4,98 | `#033325` |
| ● groen | Emotionele gevoeligheid | `#5dc1a7` | **7,87** | 8,51 | `#003328` |
| ● groen | Relatiepatroon | `#26edd0` | **11,50** | 12,44 | `#00322b` |
| ▲ amber | Controle en zekerheid | `#978351` | **4,63** | 5,01 | `#352803` |
| ▲ amber | Conflictstijl | `#cfa940` | **7,67** | 8,29 | `#352803` |
| ▲ amber | Stressreactie | `#ffd09e` | **12,04** | 13,02 | `#3c2407` |
| ■ karmijn | Zelfbeeld | `#d35f78` | **4,63** | 5,01 | `#411e24` |
| ■ karmijn | Schaduwkant | `#c87598` | **5,26** | 5,69 | `#3f1e2c` |
| ■ karmijn | Groeipad | `#ffa5bb` | **9,25** | 10,01 | `#401e27` |

Ook hier: twaalf van de twaalf halen AA, en `--ink #ede5d9` haalt 11,1 tot 11,6:1 op de wash-vlakken.

### 3.4 Het bewijs onder kleurenblindheid

De twaalf kleuren zijn door de drie simulaties gehaald en de onderlinge CIEDE2000-afstand is voor
alle 66 paren berekend. Het minimum per zichtconditie:

| Zichtconditie | Lichte modus | Donkere modus |
|---|--:|--:|
| normaal | **8,44** | **8,77** |
| protanopie | **7,17** | **9,78** |
| deuteranopie | **7,10** | **7,44** |
| tritanopie | **7,37** | **7,49** |
| **laagste over alles** | **7,10** | **7,44** |

> **Methode, zodat het getal navolgbaar is.** Machado, Oliveira & Fernandes (2009), severiteit
> 1,0, matrix toegepast op **lineaire** RGB; afstand CIEDE2000, witpunt D65. Die laatste regel
> is niet vrijblijvend: pas je dezelfde matrices op gamma-RGB toe, dan komen er heel andere
> getallen uit. De ijking is het oude paar `#9a9349`/`#b58b41` onder protanopie, dat met deze
> methode op **1,41** uitkomt — precies de 1,4 die hieronder staat.

Ter vergelijking, dezelfde meting op het huidige wiel: **1,4** (Zelfbeeld tegenover Schaduwkant
onder protanopie), met een tweede paar op 1,4–2,5 en een derde op 2,4.

Het zwakste paar in het nieuwe systeem is *Sociale energie* (`#068062`) tegenover *Zelfbeeld*
(`#ae527b`) onder deuteranopie in licht (**7,10**), en *Emotionele gevoeligheid* (`#5dc1a7`)
tegenover *Schaduwkant* (`#c87598`) onder deuteranopie in donker (**7,44**). Het zijn in beide
gevallen paren uit **verschillende** families — contact tegenover zelf — die op het wiel niet
naast elkaar staan. De positie draagt het onderscheid dus niet mee; label en familiesymbool
doen dat wel, en dat is precies waarom kleur hier nooit de enige drager is.

De simulatiehexen per dimensie en per zichtconditie staan in `design-tokens.json` onder
`dimensies.items[].simulatie_licht` en `.simulatie_donker`, en zijn visueel te zien in
`B-moodboard.html` onder "Het bewijs: twaalf kleuren onder vier soorten zicht".

**Wees eerlijk over wat ruim 7 ΔE betekent.** Het is een verbetering met factor vijf — van 1,4
naar 7,1 in licht en 7,4 in donker — en het brengt elk paar ruim boven de waarnemingsdrempel
van 2,3. Het is **niet** genoeg om een dimensie op kleur
alleen te identificeren. Dat hoeft ook niet, want dat is nergens de opzet: kleur is in dit systeem
een *versneller* van herkenning, geen drager van informatie. De informatie zit in het label, de
positie en het symbool. Haal de kleur weg en het wiel werkt nog steeds; haal de labels weg en het
werkt niet meer — dat is de goede volgorde.

### 3.5 Waar de kleur terugkomt in het rapport

Het punt van een betekenissysteem is dat het consequent is. Alle plekken waar een dimensiekleur
verschijnt, in dezelfde toewijzing:

1. **Het scorewiel** — de twaalf veerbundels, de scorelabels, de "LET HIER OP"-markering.
2. **De inhoudsopgave** — een 3 px gekleurde marge per hoofdstuk, in de familiekleur van het
   hoofdstuk.
3. **Elke hoofdstukkop** — het familiesymbool plus een gekleurde regel boven de kop.
4. **Elke zin met een getal erin** — de score-badge (`72/100`) krijgt de wash van zijn dimensie
   als achtergrond en `--ink` als tekst (13,3:1 of hoger).
5. **De spanningsvelden** — een spanningsveld verbindt twee dimensies; de balk loopt van de ene
   dimensiekleur naar de andere, met beide labels erbij.
6. **De twaalf kaarten in sectie 6 van de landingspagina** — de eerste plek waar de bezoeker het
   systeem ziet, gegroepeerd per familie, elk met symbool en gekleurde linkerlijn.
7. **De markdown- en PDF-export** — daar wordt kleur het familiesymbool plus de naam, want in
   platte tekst bestaat kleur niet. Dat is meteen de beste test of het systeem klopt.

---

## 4. Hiërarchie en ritme — de elf secties laten ademen

De huidige elf secties hebben één vlak, één patroon en één sectieafstand. Hieronder het concrete
plan, met per sectie het vlak, de breedte, het beeld en de verticale ruimte. Drie nieuwe
sectieritmetokens sturen dat laatste: `--sectie-kort` (2,25–3,5 rem), `--sectie-normaal`
(3–5,5 rem) en `--sectie-ruim` (4,5–8 rem).

| # | Sectie | Vlak | Breedte | Beeld | Ruimte | Waarom |
|---|---|---|---|---|---|---|
| 1 | **Hero** | `--bg` met contourgravure | volle breedte | het kompas met twaalf gekleurde stralen | `--sectie-ruim` | Het merk moet één keer groot mogen ademen. |
| 2 | **Voorbeeldwiel** *(nieuw op deze plek)* | `--bg-band` 69,5 % | **volle breedte** | een echt scorewiel met voorbeeldscore, in SVG | `--sectie-normaal` | Het sterkste element van het product staat nu achter 25 minuten vragen. Hier staat het binnen één scherm. Eerste echte vlakwissel: 1,33:1 tegen het perkament, waar de huidige sectiewissel 1,04:1 is. |
| 3 | **Statbalk** 120 · 33 · 5.500+ · 12 | `--bg-ink` **donker** | volle breedte | — | `--sectie-kort` | Eerste ritmebreuk. Een smalle donkere band leest als een streep onder een claim. |
| 4 | **Waarom dit anders leest** (6 kaarten) | `--bg` | binnen 1180 px | — | `--sectie-normaal` | De eerste kaart krijgt dubbele breedte; het raster wordt 2-2-1-1 in plaats van 3-3. Asymmetrie is goedkoper dan beeld en werkt bijna net zo goed. |
| 5 | **Hoe het werkt** (trechter 120→30→12→1) | `--bg-veil` | binnen 1180 px | de trechter als SVG met echte getallen | `--sectie-normaal` | Rust na het raster; het diagram doet hier het visuele werk. |
| 6 | **Wat het meet** (12 dimensies) | `--bg` | binnen 1180 px | het kleursysteem debuteert | `--sectie-ruim` | **De belangrijkste sectie van de hele pagina.** Vier familiegroepen van drie, elke kaart met zijn dimensiekleur als 3 px linkerlijn en zijn familiesymbool. Twaalf identieke witte blokjes worden vier herkenbare kwadranten. |
| 7 | **Wat je krijgt** (33 hoofdstukken) | `--bg-deep` 79,8 % | binnen 1180 px | **uitsnede uit een echte rapportpagina** | `--sectie-normaal` | Laten in plaats van beschrijven. De zes kaarten en de zes bullets worden één lijst naast het beeld. |
| 8 | **Voor wie** (4 kaarten) | `--bg` | smal, 48 rem | — | `--sectie-kort` | Bewust kort en smal. Na zes secties heeft het oog een pauze nodig. |
| 9 | **Eerlijk gezegd** (4 disclaimers) | `--bg-ink` **donker** | volle breedte | — | `--sectie-normaal` | Tweede donkere blok, en inhoudelijk de juiste plek: hier staat wat het *niet* is. Donker maakt van een disclaimer een statement in plaats van kleine lettertjes. |
| 10 | **Vragen** (8 FAQ) | `--bg-veil` | smal, 48 rem | — | `--sectie-normaal` | Functioneel, rustig, smal. |
| 11 | **Slot-CTA** | `--bg-band` | volle breedte | het kompas klein herhaald | `--sectie-ruim` | Rijmt op de hero en sluit de pagina. |

**Wat dit oplevert.** Zeven verschillende vlakken over elf secties in plaats van twee. Drie
volle-breedtemomenten (2, 3, 9, 11 — vier eigenlijk) in plaats van nul. Twee donkere blokken in
plaats van nul. Drie beeldmomenten in plaats van één. Drie sectiehoogtes in plaats van één.

**En het moet korter.** De meetlat uit `A-baseline.md` §1 zegt ≤ 6.000 px; vandaag is het 7.083 px,
en er komt beeld bij. Waar de ruimte vandaan komt:

- Sectie 6: twaalf losse kaarten worden vier familiegroepen met een compacte lijst per groep
  (ongeveer −450 px).
- Sectie 7: zes kaarten plus zes bullets worden één kolom naast het beeld (ongeveer −350 px).
- De gravure verhuist naar de herolaag en levert zijn eigen 330 px in.
- Sectie 4 wordt asymmetrisch en daarmee een rij korter (ongeveer −200 px).

Netto komt dat rond 5.800 px uit, inclusief het nieuwe voorbeeldwiel en de rapportuitsnede.

**Kaarten.** Het radius gaat van 1 rem naar 0,5 rem (`--radius-card`) — strakker leest editorialer.
De identieke gouden bovenrand van 3 px op elke kaart verdwijnt; hij blijft alleen waar hij
iets betekent (de genummerde stappen in sectie 5 en de dimensiekaarten in sectie 6, daar in de
dimensiekleur). Alle kaarten krijgen `--shadow-1` in rust en `--shadow-3` bij hover of focus.

---

## 5. Beweging

Uitgangspunt: beweging moet iets verklaren of iets bevestigen. Alles wat alleen leuk is, kost
frames en aandacht. De site respecteert `prefers-reduced-motion` al (5 blokken in de CSS); dat
niveau moet minimaal blijven en wordt hier op tokenniveau waterdicht gemaakt — in de
reduced-motion-variant gaan alle duraties naar 0,01 ms en alle verschuivingen naar 0 px, waardoor
elke animatie automatisch een directe toestandswissel wordt zonder dat er per component iets
uitgeschakeld hoeft te worden.

### Wat waarde toevoegt

| # | Micro-interactie | Wat het doet | Duur / easing | Bij `reduced-motion` |
|---|---|---|---|---|
| 1 | **Het kompas in de hero tekent zich** | De twaalf stralen groeien vanuit het midden naar buiten, per straal 40 ms verschoven. Dit *is* de uitleg van het product: twaalf lijnen vanuit één kern. | `--dur-verhaal` 1200 ms, `--ease-uit`, eenmalig bij laden | Volledig getekend weergegeven, geen groei. Het beeld is identiek, alleen de opbouw ontbreekt. |
| 2 | **Het scorewiel in het rapport groeit** | Idem, maar dan met de echte scores. Dit is het beloningsmoment na 25 minuten — de enige animatie die er echt toe doet. | 1200 ms, `--ease-uit`, eenmalig bij eerste zicht | Direct compleet. Het wiel is niet minder mooi, alleen niet opgebouwd. |
| 3 | **Secties komen binnen** | 14 px omhoog plus opacity 0 → 1 bij het in beeld komen; binnen een raster max. 4 items met 60 ms verschil. | `--dur-rustig` 380 ms, `--ease-uit`, eenmalig per element | Geen verschuiving, geen fade. Element staat er meteen. **Kritiek:** de basisstaat in de CSS is zichtbaar; JavaScript voegt de animatieklasse toe. Faalt het script, dan staat alles er gewoon. |
| 4 | **De trechter telt** | 120 → 30 → 12 → 1: de getallen tellen op wanneer de trechter in beeld komt. Het maakt de reductie voelbaar in plaats van leesbaar. | `--dur-traag` 700 ms, `--ease-zacht` | Eindgetallen staan er direct. |
| 5 | **Kaart bij hover of focus** | 2 px omhoog, `--shadow-1` → `--shadow-3`. Bevestigt dat er iets aanklikbaar is. | `--dur-snel` 140 ms | Alleen de schaduwwissel, geen verplaatsing. |
| 6 | **Knop bij indrukken** | Achtergrond `--btn-bg` → `--btn-bg-hover`, plus `scale(0.98)` tijdens `:active`. | 140 ms / 80 ms | Alleen de kleurwissel. |
| 7 | **FAQ-accordeon** | Hoogte open/dicht plus het `+`-teken dat naar `−` draait. | `--dur-normaal` 220 ms | Onmiddellijk open, het `+`/`−` wisselt nog steeds — het teken is de statusindicator, niet de animatie. |
| 8 | **Van vraag naar vraag** | 140 ms crossfade in plaats van een harde wissel, zodat de bezoeker ziet dát er iets veranderd is. | 140 ms, `--ease-standaard` | Directe wissel. |
| 9 | **De focus verhuist mee** | Geen animatie maar een correctie: na het beantwoorden van een Likert-vraag springt de focus nu niet mee, waardoor de volgende vraag eruitziet alsof er al iets is aangeklikt (`A-baseline.md` §3.9). De focus moet naar de groep van de nieuwe vraag. | — | Identiek; dit is geen beweging maar gedrag. |

### Wat geen waarde toevoegt

- **Parallax op de hero.** Kost frames op elke scroll, veroorzaakt bij een deel van de bezoekers
  misselijkheid, en voegt hier niets toe: het beeld is al diep door de contourlijnen.
- **Een scrollvoortgangsbalk op de landingspagina.** Een pagina van 5.800 px heeft geen
  navigatiehulp nodig. In het rapport (21.716 px) mag dat wél, maar daar hoort het bij de
  inhoudsopgave, niet bij een streep bovenin.
- **De eindeloos draaiende ster in het laadscherm.** Dit is de tien seconden theater uit
  `A-baseline.md` §3.5 — het rapport staat al in `localStorage` voordat de animatie klaar is.
  Beweging is hier geen oplossing maar een dekmantel. Verwijder de wachttijd, of vul hem eerlijk
  met de vier rekenstappen die je daadwerkelijk zet, met een voortgangsindicatie en een
  overslaan-mogelijkheid.
- **Een typemachine-effect op de belofte.** Vertraagt het lezen, breekt tekstselectie, en is voor
  schermlezers een reeks losse mutaties.
- **Tellende getallen in de statbalk.** Anders dan bij de trechter (#4) betekent het tellen daar
  niets — 5.500 woorden is geen proces maar een feit.
- **Hovereffecten op niet-klikbare elementen.** De twaalf dimensiekaarten in sectie 6 zijn geen
  links. Geef ze geen lift; dat belooft iets wat niet gebeurt.

---

## 6. Accessibility-review van dit voorstel

### 6.1 Wat er wint

| Onderwerp | Nu | Na dit voorstel |
|---|---|---|
| `prefers-color-scheme`-regels | 0 | volledige donkere modus, licht én donker gemeten |
| Dimensiekleuren onder 3:1 (WCAG 1.4.11) | **2** van 12 | 0 van 12 |
| Dimensiekleuren onder 4,5:1 | **6** van 12 | 0 van 12 |
| Laagste ΔE2000 tussen twee dimensies onder CVD | **1,4** | **7,1** licht · **7,4** donker |
| `--ink-faint` als tekst | `#8b8177` = 3,60 (onder AA) | `#655b50` = 6,26 |
| Haarlijn zichtbaarheid | 1,21:1 (10 % zwart) | 1,44:1 (18 %), structuurlijn 1,80:1 (28 %) |
| Focusring | `#7a4300`, 7,54 op perkament | `#5e3a05`, ≥ 7,15 op elk van de zes lichte vlakken; `#f0cb8c`, ≥ 9,16 op elk van de vijf donkere vlakken (eis 1.4.11 is 3,0) |
| Scorewiel in print en PDF | `<canvas>`, gerasterd op schermresolutie, labels niet selecteerbaar, niet zoomvast (het tekstalternatief is er wél: `role="img"` + `aria-label` van 270 tekens + lijst van twaalf rijen) | SVG met `<title>`/`<desc>` plus een zichtbare datatabel: vectorprint, selecteerbare labels, zoomvast |
| Skip-link | ontbreekt | aanwezig |
| Kleur als enige drager | het wiel draagt betekenis in kleur | label + vaste positie + familiesymbool, altijd |
| Dimensiekleur in export | gaat verloren | wordt het familiesymbool + de naam |

`B-moodboard.html` zelf is met het script uit `A-baseline.md` §5 gemeten: **555 tekstknopen,
0 fouten**, in zowel lichte als donkere systeemvoorkeur.

### 6.2 Waar het risico zit

1. **Zeven vlakken in plaats van drie betekent zeven keer zoveel combinaties.** Dat is de prijs
   van diepte. Beheersing: `design-tokens.css` documenteert per token op welk vlak hij mag staan,
   en `design-tokens.json` bevat de volledige kruistabel zodat fase G het kan afdwingen in plaats
   van onthouden.
2. **`--bg-band` (69,5 %) is de krapste marge.** `--ink-faint` haalt daar 4,71 en `--gold` 5,07 —
   dat is AA, maar zonder veel speling. Regel: op `--bg-band` staan alleen `--ink` en `--ink-soft`,
   en `--gold-glyph` komt daar nooit (3,04). Elke nieuwe kleur die later op deze band belandt moet
   opnieuw gemeten worden.
3. **`--gold-glyph` is het enige token onder 4,5:1.** Hij bestaat om de sterretjes, lijnen en
   ornamenten warm te houden zonder ze te zwaar te maken. Hij mag nooit tekst dragen. Dat is een
   discipline-eis, en discipline-eisen worden gebroken. Zet er een lint-regel op.
4. **De twee donkere blokken in de lichte modus erven de lichte `color-scheme`.** Formuliervelden,
   scrollbars en systeemcontrols binnen zo'n blok blijven licht getekend. Ze moeten expliciet
   `color-scheme: dark` krijgen, anders krijg je een witte selectbox in een zwarte band.
5. **De binnenkomstanimatie mag nooit de basisstaat zijn.** Als `opacity: 0` in de CSS staat en
   JavaScript de klasse niet toevoegt — script geblokkeerd, IntersectionObserver niet ondersteund,
   `content-visibility` die niet meespeelt — is de pagina leeg. Regel: de CSS-basisstaat is
   zichtbaar; JavaScript voegt de animatie toe, niet de zichtbaarheid.
6. **De volgorde van de dimensies verandert.** De familiegroepering wijzigt de array `w` in
   `app.beautified.js`. Scores en tekst veranderen niet, maar de regressietest uit
   `A-baseline.md` §7 vergelijkt de markdown-export; die moet op sleutel vergelijken en niet op
   positie, anders geeft hij een vals alarm.
7. **7,1 ΔE is beter, niet genoeg.** Herhaald omdat het de belangrijkste beperking is: kleur
   identificeert geen dimensie. Elk scherm waar een dimensiekleur zonder label of symbool
   verschijnt, is een fout — ook als het contrast klopt.
8. **Donkere modus in het rapport is 21.716 pixels aan onbeproefd terrein.** Eén tabel, één
   citaatblok of één ingesloten badge die alleen in licht is getest, en je hebt een fout die pas
   halverwege hoofdstuk 20 opduikt.

### 6.3 Hoe je het toetst

Het script uit `A-baseline.md` §5 is de scheidsrechter. Draai het op **drie schermen × twee modi ×
drie breedtes**:

| | landing | vragenscherm | rapport |
|---|---|---|---|
| licht, 1440 px | 0 fouten | 0 fouten | 0 fouten |
| licht, 390 px | 0 fouten | 0 fouten | 0 fouten |
| licht, 320 px | 0 fouten | 0 fouten | 0 fouten |
| donker, 1440 px | 0 fouten | 0 fouten | 0 fouten |
| donker, 390 px | 0 fouten | 0 fouten | 0 fouten |
| donker, 320 px | 0 fouten | 0 fouten | 0 fouten |

Dat is achttien metingen, en achttien keer nul is de enige aanvaardbare uitkomst. Het laat zich
automatiseren met Playwright:

```js
// per pagina × per color_scheme × per viewport
const res = await page.evaluate(SCRIPT_UIT_A_PARAGRAAF_5);
if (res.issues.length) throw new Error(`${res.issues.length} contrastfouten`);
```

Daarnaast, buiten het bereik van dat script:

- **Aantal `prefers-color-scheme`-regels** tellen via de CSSOM (nu 0, straks > 0).
- **Aantal `prefers-reduced-motion`-regels** tellen (nu 5, minimaal 5 houden).
- **`forced-colors: active`** (Windows hoog contrast): het wiel mag dan niet verdwijnen. SVG met
  `stroke` in plaats van `fill` overleeft dat; `<canvas>` niet.
- **Toetsenbordronde** over landing, vragenscherm en rapport: tabvolgorde, zichtbare focus op elk
  element, en het focusgedrag na het beantwoorden van een vraag (§5 #9).
- **De twaalf dimensiekleuren hermeten** met het script dat dit document heeft opgeleverd, zodra
  er één hex verandert. Alle getallen in §3.3 en §3.4 zijn reproduceerbaar uit
  `design-tokens.json`.
- **De platte-tekstexport lezen.** Als het rapport in markdown nog steeds begrijpelijk is, draagt
  kleur nergens informatie die er niet ook zonder is. Dat is de goedkoopste en strengste toets
  die dit systeem kent.

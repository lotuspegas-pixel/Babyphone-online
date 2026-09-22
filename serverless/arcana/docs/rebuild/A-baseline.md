# A — Baseline: de nulsituatie van Arcana Profile

**Gemeten:** 22 september 2026, live op `https://arcanaprofile.com`
**Methode:** de live site in een echte browser, plus statische analyse van de meegeleverde build.
De live site is byte-identiek aan de zip (`index-DqFKZ58Q.js`, `index-CKXF3rIk.css`).

> Zonder deze nulmeting is "beter" niet te bewijzen. Elk cijfer hieronder is een
> herhaalbare meting, geen schatting. Fase G moet er straks tegenaan gehouden worden.

---

## 1. De meetlat in één tabel

| Metriek | Nulsituatie | Doel na rebuild | Hoe te hermeten |
|---|---|---|---|
| JS over de lijn | **139,5 KB** brotli (484,3 KB raw), 1 chunk | ≤ 95 KB voor de landing | `performance.getEntriesByType('resource')` |
| CSS over de lijn | 9,2 KB (52,4 KB raw) | ≤ 14 KB incl. donkere modus | idem |
| Fonts | 4 × woff2 = **94,0 KB** | ≤ 60 KB (subset + 1 gewicht minder) | idem |
| Totaal eerste render | ~243 KB | ≤ 170 KB | idem |
| TTFB | 1.202 ms | < 600 ms (statische hosting/CDN) | navigation timing |
| DOM interactive | 1.225 ms | < 900 ms | navigation timing |
| DOM-nodes landing | 317 | ≤ 450 (mag groeien) | `document.querySelectorAll('*').length` |
| Paginahoogte landing | 7.083 px | ≤ 6.000 px | `document.body.scrollHeight` |
| Paginahoogte rapport | 21.716 px / 7.559 woorden op de **volledig gerenderde pagina**, inclusief inhoudsopgave, wiellijst, knoppen en labels (de rapporttekst zelf is 5.711–6.327 woorden, `G` §3 tegenspraak 1) | onveranderd of met TOC-sprongen | idem |
| WCAG-AA tekstcontrast landing | **0 fouten** op 175 tekstknopen | 0 fouten | script in §5 |
| WCAG-AA tekstcontrast rapport | **0 fouten** op 518 tekstknopen | 0 fouten | script in §5 |
| `prefers-color-scheme`-regels | **0** | volledige donkere modus | CSSOM-telling |
| `prefers-reduced-motion`-regels | 5 | ≥ 5 | CSSOM-telling |
| Skip-link | **ontbreekt** | aanwezig | DOM-check |
| Koppenhiërarchie | correct, geen sprongen | correct | DOM-check |
| Wachttijd na laatste vraag | **> 10 seconden** | < 2 s of eerlijk gevuld | stopwatch |

**Lighthouse is niet betrouwbaar te draaien** vanuit deze omgeving (de browserpane rapporteerde
een FCP van 13,5 s, wat de meetopstelling is en niet de site). De cijfers hierboven komen uit de
Navigation Timing API en zijn wél betrouwbaar. Draai vóór de rebuild één keer PageSpeed Insights
op `arcanaprofile.com` en plak het resultaat hieronder als officiële nullijn.

---

## 2. Wat er goed is (en dus niet gesloopt mag worden)

Dit is geen beleefdheidsparagraaf — het is de regressielijst met bewijs erbij.

1. **Toegankelijkheid is nu al in orde.** 693 tekstknopen gemeten over landing én rapport,
   **nul** contrastfouten tegen WCAG-AA. Geen te kleine aanraakvlakken. Koppen lopen netjes
   h1 → h2 → h3. `lang="nl"` staat er. Alle knoppen en links hebben een toegankelijke naam.
   De drempel ligt dus hoog: elke nieuwe kleur moet dit niveau halen.
2. **Motion wordt al gerespecteerd.** 5 `prefers-reduced-motion`-blokken in de CSS.
3. **De SEO-basis is echt goed.** Volledige OG- en Twitter-tags, JSON-LD met WebSite +
   WebApplication + FAQPage, een `noscript`-fallback én — zeldzaam — een volwaardige
   statische HTML-versie van de propositie in `#root` die crawlers zien vóór React laadt.
4. **De engine is echt deterministisch.** Geen netwerkverkeer na het laden van de bundel,
   geen API-calls, geen analytics. De belofte "dezelfde antwoorden geven hetzelfde rapport"
   is verifieerbaar waar.
5. **Privacy is echt waar.** Zes localStorage-sleutels, verder niets. Geen cookies, geen
   trackers, geen server. `arcana_answers`, `arcana_current_question`, `arcana_result`,
   `arcana_profile`, `arcana_started_at`, `arcana_completed_at`.
6. **Het rapport is van hoog niveau.** 7.559 woorden over de hele gerenderde pagina — de rapporttekst zelf telt 5.711 tot 6.327 woorden, zie `G` §3 tegenspraak 1 — 7 hoofdsecties, 37 subkoppen,
   een inhoudsopgave, en een scorewiel dat er werkelijk goed uitziet.

---

## 3. Wat er misgaat — met bewijs

### 3.1 De domeinbug staat live (kritiek)

Bevestigd in de draaiende pagina op `arcanaprofile.com`:

```
canonical  → https://speaktoart.com/
og:url     → https://speaktoart.com/
og:image   → https://speaktoart.com/og-image.jpg
JSON-LD    → "@id": "https://speaktoart.com/#website"
                     "https://speaktoart.com/#app"
                     "https://speaktoart.com/#faq"
sitemap    → <loc>https://speaktoart.com/</loc>
robots     → Sitemap: https://speaktoart.com/sitemap.xml
```

Negen voorkomens in `index.html`, één in `robots.txt`, één in `sitemap.xml`.

Gevolgen, van erg naar erger:
- Een canonical die naar een **ander domein** wijst is een expliciete instructie aan Google
  om `arcanaprofile.com` niet te indexeren maar `speaktoart.com` te tonen. Als dat domein niet
  meer van jou is of iets anders serveert, verdwijnt de site effectief uit de index.
- Elke gedeelde link op WhatsApp, LinkedIn of Slack toont de verkeerde URL en haalt de
  preview-afbeelding van het verkeerde domein — die mogelijk niet bestaat, waardoor de kaart
  leeg blijft.
- De JSON-LD beschrijft een entiteit op een domein dat niet de site is. Structured data die
  naar elders wijst wordt genegeerd of, erger, aan het andere domein toegekend.

**Dit is de enige bevinding in dit hele document die vandaag gefixt zou moeten worden, los van
de rest van de rebuild.** Het is een zoek-en-vervang in drie bestanden. Zie werkstroom E voor
de volledige lijst plus de 301-kwestie.

### 3.2 De pagina is monotoon — dit is meetbaar, geen smaak

Elf secties op de landingspagina. Alle elf hebben:
- dezelfde perkamentachtergrond (`#fbf8f3`, soms `#f8f4ec`)
- hetzelfde patroon: goud kapitaal-eyebrow → Cormorant-kop → grijze introzin → raster met kaarten
- dezelfde kaart: witte vulling, 1 rem radius, haarlijn van 10% zwart, `--shadow: none`
- dezelfde vier accentkleuren die **nergens** worden ingezet

De site definieert `--teal #4338ca`, `--plum #a81e1e`, `--growth #0a7355` en `--ember #92610a`
in `:root` — en gebruikt ze op de hele landingspagina geen enkele keer. Ze leven alleen in het
rapport. Er is dus al een betekenisdragend kleursysteem aanwezig; het staat uit.

Eén beeld op 7.083 pixels hoogte. Dat is één visueel rustpunt per 7 schermen.

### 3.3 Het beste product zit achter de hoogste drempel

Het rapport is aantoonbaar mooier en rijker dan de landingspagina die het moet verkopen.
Het scorewiel — twaalf gekleurde veerbundels rond een kern met je archetype erin — is het
sterkste visuele element dat dit product bezit, en een bezoeker ziet het pas na 20 tot 25
minuten vragen beantwoorden.

De landingspagina *beschrijft* het rapport in zes kaarten met tekst. Hij *laat* er niets van zien.

### 3.4 Wrijving vóór de eerste vraag

Tussen "Start de test" en vraag 1 zit een formulier: naam of roepnaam, aanspreekvorm (je/u),
levensfase. De naam staat als verplicht veld gepresenteerd (het formulier submit niet zonder).

Dat is een account-achtige handeling op een site waarvan de hele belofte "geen account" is.
De uitleg eronder is goed geschreven, maar de bezoeker moet die eerst lezen om te snappen
waarom er ineens om zijn naam wordt gevraagd.

### 3.5 De wachttijd na de laatste vraag

Na "Afronden" verschijnt "Spanningsvelden worden opgebouwd…" met een draaiende ster. Bij de
meting duurde dat **meer dan tien seconden**, terwijl het rapport al in localStorage stond
voordat de animatie klaar was. De berekening zelf is bijna instant — dit is een
theaterscherm.

Tien seconden theater na 25 minuten werk is een gok. Het kan spanning opbouwen; het kan ook
lezen als "hij is vastgelopen". Er is geen voortgangsindicatie en geen manier om over te slaan.

### 3.6 Het scorewiel is een `<canvas>`

Op de hele site staat **geen enkele SVG** — het portret is getekend op een canvas-element.

> **Correctie na nadere analyse (werkstroom D).** Het canvas heeft wél een tekstalternatief:
> een `aria-label` van 270 tekens plus een lijst van twaalf rijen met de dimensies en hun
> scores eronder. De toegankelijkheid voor schermlezers is dus beter dan een eerste blik
> suggereert. De andere bezwaren blijven overeind.

De resterende gevolgen:
- geen selecteerbare tekst; de dimensielabels in het beeld zijn pixels
- bij printen en PDF-export wordt het beeld gerasterd op schermresolutie
- het schaalt niet mee met de zoom van de browser

Voor het element dat de bezoeker het liefst deelt en print, is dat de verkeerde techniek.

### 3.7 Alles in één chunk

484 KB JavaScript in één bestand. Een bezoeker die de landingspagina bekijkt en wegklikt —
verreweg de meeste bezoekers — downloadt de complete vragenbank, de complete rapportengine,
alle archetypeteksten en alle zinsvarianten. Dat is het grootste deel van die 484 KB, en het
is precies wat die bezoeker niet nodig heeft.

### 3.8 Geen donkere modus

Nul `prefers-color-scheme`-regels. Een rapportpagina van 7.559 gerenderde woorden die mensen 's avonds lezen,
in een uitgesproken lichte kleurstelling, zonder alternatief.

### 3.9 Kleine dingen

- Geen skip-link naar de hoofdinhoud.
- De focusring blijft na het beantwoorden van een Likert-vraag op dezelfde positie staan,
  waardoor de volgende vraag eruitziet alsof er al een antwoord is aangeklikt. Verwarrend,
  en mogelijk sturend.
- Rangschikkingsvragen werken met ↑/↓-knoppen per regel. Werkt, is toegankelijk, maar voelt
  omslachtig bij zes items.
- De `--teal`-token bevat `#4338ca`, wat indigo is, geen teal. Verwarrende naamgeving die in
  het nieuwe tokensysteem opgelost moet worden.
- `confidenceLevel` houdt geen rekening met straight-lining: wie alle 120 vragen op dezelfde
  waarde zet, krijgt te horen dat zijn rapport "stevig staat". (Gevonden in werkstroom D.)
- Twee van de twaalf dimensiekleuren in het scorewiel halen zelfs de grafische
  contrasteis van 3:1 niet (`#9a9349` = 2,98, `#b58b41` = 2,94) en zes halen 4,5:1 niet.
  Onder protanopie liggen Zelfbeeld en Schaduwkant op ΔE 1,4 — dat is geen zichtbaar verschil.
  Deze laag valt buiten de tekstcontrastmeting hierboven, dus "0 fouten op 693 tekstknopen"
  blijft correct; het probleem zit in het canvas. (Gevonden en doorgerekend in werkstroom B.)

---

## 4. De funnel — nu nog onmeetbaar

Er zit geen analytics op de site. Dat is een bewuste en verdedigbare keuze die past bij de
privacybelofte, maar het betekent ook: **niemand weet waar mensen afhaken.**

De funnel die gemeten zou moeten worden:

```
  1. landing bekeken
        │  ← start-rate: de belangrijkste knop van het hele product
  2. "Start de test" geklikt
        │  ← formulier-rate: hoeveel mensen struikelen over het naamveld
  3. vraag 1 beantwoord
        │  ← per deel: 1/4 (L), 2/4 (FC), 3/4 (S), 4/4 (R)
  4. vraag 120 beantwoord
        │  ← wachtscherm-rate: haakt iemand af tijdens de 10 seconden?
  5. rapport geopend
        │  ← leesdiepte: hoofdstuk 1 / helft / einde
  6. rapport bewaard (PDF, print, download)
        │
  7. gedeeld
```

**Hoe je dit meet zonder de privacybelofte te breken.** Niet met Google Analytics, en ook niet
met een "privacyvriendelijke" hosted tool, want zodra er een verzoek naar een server gaat is de
zin "er is geen server waar ze naartoe gaan" niet meer letterlijk waar. Drie routes die dat wél
overeind laten:

1. **Alleen stapnummers, geen antwoorden, opt-in.** Eén telverzoek per stap met niets erin
   behalve het stapnummer. Geen ID, geen sessie, geen antwoord, geen IP-opslag. Vraag er
   expliciet toestemming voor in een regel onder de startknop. Eerlijk, maar het verzwakt de
   claim en kost je een deel van de meting.
2. **Lokale funnel + vrijwillig opsturen aan het eind.** Tel de stappen in localStorage en bied
   ná het rapport één knop: "help dit beter maken — stuur anoniem door waar je was toen je
   stopte". Je meet dan alleen de mensen die afmaken, wat precies de groep is die je niet hoeft
   te repareren. Zwakke meting, sterke belofte.
3. **Server-side aggregatie zonder client-code.** Je host serveert de bestanden al. Tel op de
   server alleen: hoe vaak `index.html` is opgehaald. Dat geeft je bezoekersaantallen en verder
   niets. Combineer met route 2 voor de rest.

**Aanbeveling: route 1, maar alleen voor stap 1 → 2 → 3.** Dat zijn de drie punten waar de
meeste mensen verdwijnen en waar de landingspagina het werk moet doen. Zodra iemand vraag 1
heeft beantwoord is hij binnen; wat daarna gebeurt mag je best niet weten. Beperk de meting tot
drie tellers en zeg dat letterlijk zo op de site. Dat is eerlijker dan de meeste sites die
beweren privacyvriendelijk te zijn, en het maakt de start-rate — de enige KPI die er voor de
rebuild echt toe doet — meetbaar.

---

## 5. Hermeetbaar maken: het contrastscript

Dit script draaide de metingen in §1. Plak het in de console op elke pagina, inclusief in
donkere modus, en het geeft nul fouten of een lijst met precies welke combinatie faalt.
Het handelt `color(srgb …)`-notatie en gestapelde doorzichtige achtergronden correct af,
wat de meeste kant-en-klare contrastcheckers niet doen.

```js
function toRGB(s){if(!s)return[0,0,0,0];s=s.trim();
  let m=s.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.%]+))?\)$/i);
  if(m){let a=m[4]==null?1:(m[4].endsWith('%')?parseFloat(m[4])/100:parseFloat(m[4]));
    return[m[1]*255,m[2]*255,m[3]*255,a]}
  m=s.match(/^rgba?\(([^)]+)\)$/i);
  if(m){const p=m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
    return[p[0],p[1],p[2],p[3]==null?1:p[3]]}
  return s==='transparent'?[0,0,0,0]:[0,0,0,1]}
const over=(f,b)=>{const a=f[3];return[f[0]*a+b[0]*(1-a),f[1]*a+b[1]*(1-a),f[2]*a+b[2]*(1-a),1]};
const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};
  return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
function bgOf(el){let e=el,st=[];while(e){const c=toRGB(getComputedStyle(e).backgroundColor);
  if(c[3]>0)st.push(c);if(c[3]===1)break;e=e.parentElement}
  let b=toRGB(getComputedStyle(document.body).backgroundColor);
  if(b[3]<1)b=[255,255,255,1];
  for(let i=st.length-1;i>=0;i--)b=over(st[i],b);return b}
const hex=c=>'#'+c.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const issues=[],seen=new Set();let n=0;
document.querySelectorAll('*').forEach(el=>{
  if(![...el.childNodes].some(x=>x.nodeType===3&&x.textContent.trim()))return;
  const cs=getComputedStyle(el);
  if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return;n++;
  const fs=parseFloat(cs.fontSize),fw=+cs.fontWeight||400;
  const need=(fs>=24||(fs>=18.66&&fw>=700))?3:4.5;
  const bg=bgOf(el),fg=over(toRGB(cs.color),bg),r=ratio(fg,bg),k=hex(fg)+hex(bg)+need;
  if(r<need&&!seen.has(k)){seen.add(k);
    issues.push({tekst:el.textContent.trim().slice(0,40),fg:hex(fg),bg:hex(bg),
      px:+fs.toFixed(1),ratio:+r.toFixed(2),nodig:need})}});
console.table(issues); console.log('gecontroleerd:',n,'· fouten:',issues.length);
```

En de performance-nulmeting:

```js
const n=performance.getEntriesByType('navigation')[0],
      r=performance.getEntriesByType('resource'),
      sum=(f)=>r.filter(f).reduce((a,b)=>a+b.encodedBodySize,0);
({ttfb:Math.round(n.responseStart), domInteractive:Math.round(n.domInteractive),
  jsOverWire:sum(x=>x.name.endsWith('.js')), jsRaw:r.filter(x=>x.name.endsWith('.js'))
    .reduce((a,b)=>a+b.decodedBodySize,0),
  cssOverWire:sum(x=>x.name.endsWith('.css')), fontBytes:sum(x=>x.name.endsWith('.woff2')),
  chunks:r.filter(x=>x.name.endsWith('.js')).length,
  domNodes:document.querySelectorAll('*').length, hoogte:document.body.scrollHeight,
  donkereModus:[...document.styleSheets].reduce((a,s)=>{try{return a+[...s.cssRules]
    .filter(x=>x.media&&/prefers-color-scheme/.test(x.conditionText||'')).length}catch{return a}},0)})
```

---

## 6. Guerrilla-usabilitytest: vijf mensen, één middag

Vijf deelnemers vangen ongeveer 85% van de bruikbaarheidsproblemen. Meer dan vijf levert bij
dit soort tests nauwelijks nieuwe bevindingen op — beter twee rondes van vijf, vóór en na de
rebuild, dan één ronde van tien.

**Wie je zoekt.** Niet je vrienden, want die willen dat het goed is. Vijf mensen die passen bij
de doelgroep uit werkstroom F, die de site nog nooit zagen, en die van tevoren niet weten waar
het over gaat. Eén van hen moet iemand zijn die uitgesproken sceptisch is over
persoonlijkheidstests — die vangt de vertrouwenskwestie die de andere vier beleefd inslikken.

**Opzet.** 30 minuten per persoon, scherm delen, jij zwijgt. Laat ze hardop denken. Neem op
(met toestemming) zodat je citaten hebt in plaats van herinneringen.

**Het script.**

1. *(landing, 5 seconden, dan scherm dicht)* "Wat is dit, en voor wie is het?"
   → **meet:** noemt de deelnemer iets over narekenbaar/eerlijk/privé, of alleen
   "een persoonlijkheidstest"? Dit is de 5-secondentest uit werkstroom E.
2. *(landing, vrij scrollen)* "Scrol door en zeg hardop wat je opvalt. Stop waar je zou
   stoppen als dit je eigen tijd was."
   → **meet:** op welke scrollhoogte stoppen ze, en welke sectie noemen ze als eerste?
3. "Zou je deze test doen? Waarom wel of niet?"
   → **meet:** welk bezwaar komt als eerste — tijd, wantrouwen, "wat gebeurt er met mijn
   gegevens", of "wat levert het me op"?
4. *(doorklikken naar het formulier)* "Wat gebeurt hier?"
   → **meet:** aarzelt iemand bij het naamveld? Zegt iemand "moet ik nu een account maken"?
5. *(10 vragen laten doen)* "Blijf hardop denken."
   → **meet:** wanneer valt het eerste "hoeveel zijn er nog?" Kijkt iemand naar de
   voortgangsbalk? Struikelt iemand over het meeverhuizende focuskader?
6. *(rapport tonen — gebruik het voorbeeldrapport, niet hun eigen)* "Lees de eerste twee
   minuten hardop."
   → **meet:** kijken ze naar het scorewiel of scrollen ze eroverheen? Snappen ze de
   score-getallen? Geloven ze het?
7. "Wat zou je hiermee doen?" en daarna: "Wat zou je hiervoor betalen, als iets?"
   → **meet:** input voor werkstroom F, uit de mond van iemand die het net gelezen heeft.

**Wat je noteert per deelnemer:** de 5-secondenzin letterlijk, de scrollhoogte bij stop, het
eerste bezwaar letterlijk, aarzelingen bij het formulier, het moment van "hoeveel nog", en één
citaat dat je bijblijft. Meer niet. Vijf van die formulieren naast elkaar geven je de
prioriteitenlijst voor werkstroom C en E.

**Doe de eerste ronde vóór fase G bouwt.** Als vier van de vijf mensen bij stap 1 niet snappen
wat het product is, is dat een sterker argument voor een van de drie designrichtingen dan wat
er ook in werkstroom B staat.

---

## 7. Wat dit document vastlegt voor de eindcontrole

Bij oplevering moet aantoonbaar gelden:

- [ ] Contrastscript uit §5 geeft **0 fouten** op landing, vragenscherm én rapport — in
      lichte én donkere modus
- [ ] `prefers-reduced-motion` nog steeds gerespecteerd (≥ 5 regels of een gelijkwaardige
      implementatie)
- [ ] JS voor de landingspagina ≤ 95 KB over de lijn (nu 139,5 KB)
- [ ] Geen enkel netwerkverzoek na het laden, behalve de expliciet afgesproken teller
- [ ] De zes localStorage-sleutels werken identiek; bestaande gebruikers verliezen hun
      rapport niet
- [ ] Alle drie de disclaimersecties staan er nog, op dezelfde plek in de leesvolgorde
- [ ] JSON-LD valideert en wijst naar `arcanaprofile.com`
- [ ] `noscript`- en statische `#root`-fallback nog aanwezig en inhoudelijk gelijk
- [ ] Dezelfde antwoorden geven nog steeds exact hetzelfde rapport (regressietest: bewaar
      een `arcana_answers`-payload en vergelijk de markdown-export vóór en na)

Dat laatste punt is de belangrijkste test van allemaal en is eenvoudig te automatiseren.
Werkstroom D werkt hem uit.

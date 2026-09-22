# G — Rebuild-spec Arcana Profile

**Werkstroom G · synthese · 22 september 2026**

Dit document bundelt `A-baseline.md`, `B-designrichting.md`, `C-tekst-en-rapport.md`,
`D-frontend-plan.md`, `E-usp-en-landing.md` en `F-verdienmodel.md` tot één uitvoerbare spec.
Het vervangt die zes documenten niet — het ordent ze, lost hun tegenspraken op en zet er een
bouwvolgorde onder. Waar een detail nodig is, staat er een verwijzing naar het brondocument.

**Bij dit document horen twee mappen:**

| Map | Wat |
|---|---|
| `G-domeinfix/` | De gecorrigeerde `index.html`, `sitemap.xml` en `robots.txt`, plus `check-domains.mjs` en `TOEPASSEN.md`. Vandaag live te zetten, zonder repo. |
| `G-bronstructuur-kaart/` | **Een kaart, geen broncode.** De bronstructuur uit `D` §1.6 als echte mappen en bestanden — 91 gekarteerde bestanden in 24 mappen, waarvan 85 met een zekerheidslabel — maar **geen enkel bestand bevat implementatie**; de grootste is 374 bytes commentaar. Je kunt dit niet bouwen. Het is de landingsplek waar de echte repo straks overheen gaat, zodat meteen zichtbaar is wat klopt. Zie `LEESMIJ-EERST.txt` en `README.md` in die map. *(Heette eerder `G-src-reconstructie/`; die naam suggereerde werkende bronbestanden.)* |

---

## Inhoud

1. [Managementsamenvatting](#1--managementsamenvatting)
2. [De beslispunten](#2--de-beslispunten)
3. [Tegenspraken tussen de werkstromen, opgelost](#3--tegenspraken-tussen-de-werkstromen-opgelost)
4. [De rebuild-spec](#4--de-rebuild-spec)
5. [Gefaseerde bouwtaken](#5--gefaseerde-bouwtaken)
6. [De regressiepoort](#6--de-regressiepoort)
7. [Changelog-sjabloon](#7--changelog-sjabloon)
8. [Deploy en preview](#8--deploy-en-preview)
9. [Wat er ná de rebuild openstaat](#9--wat-er-na-de-rebuild-openstaat)

---

# 1 — Managementsamenvatting

**Wat er mis is.** Eén fout kost vandaag geld: elke absolute URL op `arcanaprofile.com` wijst
naar `speaktoart.com` — negen keer in `index.html`, één keer in `robots.txt`, één keer in
`sitemap.xml`. De canonical is een instructie aan Google om deze site niet te indexeren, en
elke gedeelde link toont het verkeerde domein met een afbeelding van een domein dat mogelijk
niet meer van de eigenaar is. Daarnaast: de landingspagina laadt 139,5 KB JavaScript over de
lijn (484,3 KB gedecodeerd) in één chunk, waarvan 36 % bestaat uit de vragenbank en de
rapportteksten die een landingsbezoeker nooit nodig heeft. Er is geen donkere modus (nul
`prefers-color-scheme`-regels) voor een rapport van 21.716 pixels. Het scorewiel is een
`<canvas>` waarvan twee van de twaalf kleuren de grafische contrasteis van 3:1 niet halen en
waarvan twee dimensies onder protanopie op ΔE2000 1,4 liggen — niet te onderscheiden. En het
sterkste visuele element van het product staat achter 25 minuten vragen.

**Wat er goed is en niet gesloopt mag worden.** 693 tekstknopen gemeten, nul WCAG-AA-
contrastfouten. Een volwaardige statische HTML-fallback in `#root` die crawlers zien vóór
React laadt — zeldzaam en bewust gebouwd. Een deterministische engine zonder taalmodel en
zonder netwerkverkeer. Zes localStorage-sleutels en verder niets: geen cookies, geen trackers,
geen server. Driekwart van de bestaande tekst is beter dan wat er in deze categorie staat.

**Wat er gaat gebeuren, in volgorde.** Dertien taken, elk apart uit te leveren en apart terug
te rollen. Eerst de domeinfix en de nulmeting, dan de gouden master die bewijst dat er niets
aan de berekening verandert, dan tokens en fonts, dan de bundelsplitsing, dan het wiel in SVG,
dan de donkere modus, dan de landingspagina, de vragenflow en het rapport, en tot slot de
SEO-afronding, een tweede indexeerbare URL en het opruimen.

**Wat het kost.** 27,0 werkdagen basis, plus 20 % voor de tests die in elke taak zitten en
15 % voor de terugkoppeling uit de gebruikerstest: **ongeveer 36,5 werkdagen voor één
ontwikkelaar**, oftewel zeven à acht weken. Tegen het uurtarief dat `F` §7 zelf hanteert
(€75) is dat circa **€21.600 aan opportuniteitskosten**. Het verdienmodel uit `F` levert bij
het verwachte scenario €864 per jaar op. Die twee getallen horen naast elkaar te staan: dit is
geen investering die zichzelf via de betaalknop terugverdient, en `F` §7 risico 9 zegt dat ook.
Wat het wél oplevert is een site die vindbaar is, die op de helft van de bandbreedte laadt, die
's avonds leesbaar is en die de belofte waarmaakt waarop hij verkocht wordt.

**Wat er vandaag al kan, zonder repo.** Taak 2 (de domeinfix) is klaar en getest en staat in
`G-domeinfix/`. Taak 3 (de gouden master) is vandaag gedraaid op de gebouwde bundel: de vier
hashes uit `D` §7.2 zijn exact gereproduceerd en er zijn er vier bij gemeten. Taak 1 kan voor
de helft (de nulmeting op de live site).

**De drie beslissingen die vóór het bouwen genomen moeten worden.**

| # | Beslissing | Aanbeveling | Blokkeert zolang er niet gekozen is |
|---|---|---|---|
| 1 | **Designrichting** uit `B` §2: (a) Perkament & Diepte, (b) Nacht & Goud, (c) Warm & Nabij | **(a), met de donkere modus uit (b) integraal meegeleverd** | Taak 4 t/m 8 en 10 — 17,5 van de 27,0 dagen |
| 2 | **Herocopy** uit `E` §4: variant A (nieuwsgierigheid), B (bewijs), C (privacy) | **B — bewijs**, tenzij de 5-secondentest anders uitwijst | Taak 8, en de titel, beschrijving en OG-tekst in taak 11 |
| 3 | **Verdienmodel** uit `F` §3: betaalde bewaar-versie €9 plus donaties, ja of nee | **Ja, maar pas ná de rebuild en pas na drie maanden verkeersmeting** | Niets in de rebuild zelf — wel één zin in taak 8 en taak 10, zie §2 |

**En één beslissing die daarvóór komt: de bron-repo.** Er is twee keer dezelfde gebouwde zip
geleverd. Zonder `src/`, `package.json` en `vite.config` kunnen taak 1 (deels) en taak 4 tot en
met 13 niet beginnen. Zie beslispunt 0.

---


---

# 1b — Nagekomen bevinding: wat `speaktoart.com` vandaag serveert

Deze vraag stond in taak 1 als eerste openstaande handeling. Hij is inmiddels beantwoord,
op 22-09-2026 via een echte browser (uitgaand verkeer vanuit de analyseomgeving is
geblokkeerd, vandaar dat het eerder niet lukte).

**`https://speaktoart.com/` is nog in de lucht en serveert een werkende site: "Arcana Mirror".**

```
<title>            Arcana Mirror
<h1>               Een persoonlijke spiegel voor je patronen, kracht en groeirichting.
<meta description> Arcana Mirror: een persoonlijke spiegel voor je patronen, kracht en groeirichting.
<link canonical>   ontbreekt
```

De pagina belooft "Beantwoord 120 vragen", "ongeveer 20-25 minuten", "Geen diagnose" en
"Antwoorden worden standaard lokaal opgeslagen", en voert dezelfde disclaimer. Het is een
eerdere versie van hetzelfde product, onder een andere naam.

## Waarom dit de ernst van de domeinbug vergroot

De aanname tot nu toe was dat de canonical naar een dood of vreemd domein wees. Dat is niet
zo. De werkelijke situatie is ongunstiger:

1. `arcanaprofile.com` vertelt Google letterlijk: *de echte versie van deze pagina staat op
   `speaktoart.com`*.
2. Op `speaktoart.com` staat een pagina die inhoudelijk sterk op de nieuwe lijkt — zelfde
   product, zelfde 120 vragen, zelfde belofte, andere naam.
3. Google krijgt dus een geldige canonical naar een bestaande, vergelijkbare pagina. Dat is
   precies de situatie waarin een canonical wél wordt opgevolgd. De verwachte uitkomst is
   dat de **oude** site geïndexeerd blijft en de nieuwe uit de resultaten verdwijnt.
4. Daar bovenop concurreren twee sites van dezelfde eigenaar, in dezelfde taal, over
   hetzelfde onderwerp, met bijna dezelfde tekst, om dezelfde zoekwoorden.

Dit is geen theoretisch risico meer. Het is de meest waarschijnlijke uitkomst van de
huidige configuratie.

## Wat dit betekent voor de 301

Route A uit taak 1 is van toepassing: **het domein is nog van de eigenaar.** De keuze die
daarmee samenhangt is groter dan een redirect en hoort bij de beslispunten.

| | |
|---|---|
| **Aanbevolen** | `speaktoart.com` → 301 naar `arcanaprofile.com` met padbehoud, Arcana Mirror uitzetten, adreswijziging doorgeven in Search Console. |
| **Waarom** | Twee bijna identieke sites verdelen hun autoriteit en kannibaliseren elkaar. Eén site die de volle aandacht krijgt is meer waard dan twee halve. |
| **Als Arcana Mirror moet blijven** | Dan is het geen redirect maar een productbeslissing: geef beide sites een canonical naar zichzelf, geef ze onderscheidende teksten, en accepteer dat ze om dezelfde zoekwoorden strijden. Duurdere route, naar verwachting lagere opbrengst. |
| **Niet doen** | De huidige toestand laten staan. Die is slechter dan beide alternatieven. |

## Gevolg voor de bouwtaken

- **Taak 1** — de openstaande vraag is beantwoord; wat rest is de beslissing hierboven, niet
  het onderzoek.
- **Taak 2** — ongewijzigd en nog steeds vandaag uitvoerbaar. De bestanden in
  `G-domeinfix/` zijn nagemeten: nul voorkomens van het oude domein, elf van het nieuwe,
  JSON-LD parseert met de drie `@id`'s op `arcanaprofile.com`, `sitemap.xml` is valide XML,
  en `check-domains.mjs` geeft "Domeincontrole geslaagd".
- **Nieuw: taak 2b** — de 301 instellen op `speaktoart.com` en Arcana Mirror uitzetten.
  **0,5 dag**, geen code, in dezelfde week als taak 2. Volgorde: eerst taak 2, want pas als
  `arcanaprofile.com` naar zichzelf wijst is de redirect zinvol. De taak staat volledig
  uitgewerkt in §5, met eigen acceptatiecriteria, direct na taak 2. Het basistotaal gaat
  daarmee van 26,5 naar **27,0 dagen** (circa 36,5 werkdagen).


# 2 — De beslispunten

## Beslispunt 0 — de bron-repo (voorwaarde, geen keuze)

**De situatie.** Twee keer is dezelfde gebouwde uitvoer geleverd: `index.html`, één
JavaScript-chunk (`index-DqFKZ58Q.js`), één CSS-bestand, vier woff2-bestanden en de statische
assets. Geen `src/`, geen `package.json`, geen `vite.config`, geen git-geschiedenis.

**Wat er zonder repo wél kan.** Taak 2 volledig (klaar, zie `G-domeinfix/`). Taak 3 volledig,
via `tools/engine-uit-bundel.cjs` uit `D` §7.2 — vandaag gedraaid en bevestigd. De helft van
taak 1: de nulmeting op de live site.

**Wat er zonder repo niet kan: al het andere.** Een rebuild op een geminificeerde bundel van
20.744 regels is geen rebuild maar een herschrijving van 484 KB code die op andere aannames
loopt en een andere begroting heeft. Doe dat niet stilzwijgend.

**De opties:**

| Optie | Consequentie |
|---|---|
| **A. Wachten op de repo, met een harde datum** | Aanbevolen. Zet een datum. Tot die datum: taak 1 (deels), 2 en 3 uitvoeren — samen 2 dagen echte winst. Daarna begint de klok pas. |
| B. De bundel als bron accepteren | De 227.309 bytes eigen code die volgens `D` §2.1 ongemoeid zouden blijven, moeten dan alsnog uit een geminificeerde bundel worden teruggewonnen. Reken op een verdubbeling en op het verlies van alle typeveiligheid. Alleen te overwegen als de repo aantoonbaar niet meer bestaat. |
| C. Opnieuw beginnen | Gooit 152.196 bytes rapporttekst en een werkende engine weg. Uitgesloten zolang optie A of B bestaat. |

**Aanbeveling: A.** Vraag concreet om `src/`, `package.json`, `vite.config.*`, `tsconfig.json`
en de `.git`-map. Noem die vijf bij naam; "de repo" is twee keer als "de zip" gelezen.

**Wat er geblokkeerd blijft:** taak 4 tot en met 13. Dat is 24,5 van de 27,0 dagen.

---

## Beslispunt 1 — de designrichting

**De opties, uit `B` §2.** Alle drie halen op elk tekstvlak WCAG-AA; alle drie gebruiken
hetzelfde dimensiekleursysteem uit `B` §3.

| | (a) Perkament & Diepte | (b) Nacht & Goud | (c) Warm & Nabij |
|---|---|---|---|
| **Het idee** | Dezelfde inkt en hetzelfde serif; wat erbij komt is bodem. Zeven vlakken in plaats van twee, vier schaduwniveaus in plaats van nul, zichtbare haarlijnen, elf treden typografische schaal, twee donkere blokken. | Donker als uitgangspunt, goud als enige warme kleur, het wiel als lichtgevend object. Lichte modus verplicht en volwaardig. | Cormorant vervalt voor Fraunces, sepia voor warm wit, goud voor klei en blauwgroen. Een echte voorbeeldvraag boven de vouw. |
| **Merk** | Blijft | Verschuift naar premium-mystiek | Wordt een ander merk |
| **Beeld** | Bestaande gravure blijft, verhuist naar de herolaag; twee beeldmomenten erbij | Nieuw beeldmateriaal nodig; de gravure vervalt (`multiply` werkt niet op zwart) | Nieuw diagrammatisch beeld; geen gravures |
| **Copy** | Loopt mee met `C` en `E` | Loopt mee | Moet grotendeels herschreven — het antiquarische register past niet |
| **Kosten (`B` §2)** | 5–8 dagen + 2–3 voor donkere modus en wiel | 12–18 dagen plus illustratiekosten | 10–14 dagen plus copywriting |
| **Hoofdrisico** | Te weinig verschil met vandaag als de uitvoering halfhartig is | Mystiek kantelt naar esoterisch — precies het hokje waar dit product uit probeert te blijven; en elke fout in de lichte modus raakt de helft van de bezoekers | Je verliest wat het product onderscheidt: de start-rate kan stijgen terwijl de voltooiingsrate daalt |

**Aanbeveling: (a), met de donkere modus uit (b) integraal meegeleverd.**

Drie redenen, letterlijk uit `B` §2 en hier onderschreven:

1. **Het gemeten probleem is niet de identiteit van het palet.** Het is het ontbreken van
   middentonen (een gat van 56,7 luminantiepunten tussen 22,5 % en 79,2 %), van schaduw
   (`--shadow: none`, nul keer aangeroepen in 2.714 regels), van zichtbare lijnen (haarlijn op
   1,21:1), van een typografische schaal (102 declaraties, 58 unieke waarden) en van beeld (één
   beeld op 7.083 px). Alle vijf worden door (a) opgelost zonder dat er één merkbeslissing
   sneuvelt.
2. **De donkere modus levert het drama van (b) zonder de weddenschap van (b).**
3. **(c) is een gok op een publiek dat niet gemeten is.** De hele rechtvaardiging van (c) is een
   hogere start-rate. Er is geen analytics en de usabilitytest uit `A` §6 is niet gedraaid.

**Wat er hoe dan ook meekomt, ongeacht de keuze:** de donkere modus (uit b) en de
voorbeeldvraag boven de vouw plus het verplaatsen van het naamveld (uit c). Die twee zijn
goedkoop en hebben in geen enkel scenario een nadeel.

**Consequentie per keuze:**

- **(a)** → taak 4 t/m 8 lopen zoals in §5 beschreven. `design-tokens.css` uit werkstroom B
  gaat ongewijzigd in `src/styles/tokens.css`. Geen nieuw beeldmateriaal nodig.
- **(b)** → taak 4 verdubbelt (twee volwaardige paletten in plaats van één plus een
  donkere variant), taak 8 krijgt er illustratiewerk bij, en de 33 rapporthoofdstukken moeten
  over 21.716 pixels in donker doorgelopen worden. Tel ongeveer 8 dagen op de begroting.
- **(c)** → taak 8 en 10 krijgen copywriting erbij, het displaylettertype wisselt (wat taak 4
  opnieuw laat meten) en de onboarding-flow wordt verbouwd. Tel ongeveer 5 dagen op, plus
  copywriting die niet in deze begroting zit.

**Wat er geblokkeerd blijft zolang er niet gekozen is.** Taak 4 (tokens en fonts) kan niet
beginnen, en daarmee ook 5, 6, 7, 8 en de visuele helft van 10 niet. Dat is 17,5 van de 27,0
dagen. Taak 1, 2, 3 en 9 kunnen wel doorlopen.

**Hoe je de keuze goedkoop verbetert.** Draai de guerrilla-usabilitytest uit `A` §6 — vijf
mensen, één middag, één sceptische deelnemer verplicht. Als vier van de vijf bij stap 1 niet
snappen wat het product is, is dat een sterker argument voor (c) dan wat er in `B` staat. De
tokenstructuur is richtingonafhankelijk, dus die test kost geen bouwtijd.

---

## Beslispunt 2 — de herocopy

**De opties, uit `E` §4.** Alle drie zijn volledig uitgeschreven en direct te bouwen; ze delen
de structuur (eyebrow → h1 → subkop → CTA → metaregel → drie geruststellingen).

| | A · Nieuwsgierigheid | B · Bewijs | C · Privacy |
|---|---|---|---|
| **Eyebrow** | `ZELFINZICHT DAT JE KUNT NAREKENEN` | `GEEN TAALMODEL. DE TEST REKENT.` | `GEEN SERVER. GEEN ACCOUNT. GEEN E-MAILADRES.` |
| **H1** | `De meeste mensen kennen hun patroon. Bijna niemand kan het benoemen.` | `Een rapport over jezelf dat zich laat narekenen` | `Dit rapport gaat nergens heen behalve naar jou` |
| **CTA** | `Begin met de 120 vragen` | `Start de test` | `Start de test — zonder account` |
| **Spreekt aan** | De doorgestuurde: geremd door traagheid, niet door wantrouwen (segment 3 uit `F` §4.3) | De scepticus met een besluit (segment 1, `F` §4.1) — het kernsegment | De privacybewuste professional (segment 4, `F` §4.4) en wie aarzelt omdát het over de schaduwkant gaat |
| **Risico** | Zegt niets over privacy of prijs. Faalt als het hoofdbezwaar wantrouwen is. | Geen — het is de directe vertaling van de positionering, met tekst die al geschreven en getoetst is | Zegt niets over wat het oplevert, en kan de bezoeker op een gedachte brengen die hij zelf niet had |

**Aanbeveling: B.**

`E` §1.2 stelt vast dat *narekenbaar* de spits is, om drie redenen: het is het enige antwoord
op het enige bezwaar dat telt (*"is dit weer zo'n test?"*), het is het enige dat de bezoeker
zelf kan controleren, en het wordt elk jaar meer waard naarmate de categorie richting
gegenereerde tekst beweegt. Variant B is de meest directe uitvoering daarvan, en hij haalt de
zin *"Een rapport dat zich laat narekenen"* — volgens `C` §4 rij 11 de beste zin van de hele
site — van scrollhoogte 2.100 px naar de h1.

**Consequentie per keuze:**

- **B** → taak 8 gebruikt de copy uit `E` §5 ongewijzigd. De titel en beschrijving uit `E` §7.2
  sluiten erop aan. De positionering uit `E` §1.4 blijft staan en stuurt ook alle latere tekst,
  deelkaarten en zoekresultaten.
- **A** → de positionering blijft, maar de h1 draagt hem niet meer. De SEO-titel uit `E` §7.2
  (`Persoonlijkheidstest die zich laat narekenen | Arcana`) gaat dan uit de pas lopen met de h1;
  kies er één en pas de ander aan.
- **C** → privacy wordt de spits, en dan moet `E` §1 herzien worden. Dat is een echt resultaat
  als het uit een test komt, en het moet niet worden weggeredeneerd. Het raakt ook `F`: variant
  C belooft *"Wis je je browsergegevens, dan is het weg — ook voor ons"* boven de vouw, wat de
  betaalde bewaar-versie uit `F` §2.1 juist relevanter maakt.

**De beslisregel, vooraf vastleggen** (`E` §4.4): zakt een variant de 5-secondentest, dan valt
hij af ongeacht de cijfers. Slagen er twee en scheelt de start-rate minder dan 10 % relatief,
kies dan B, omdat die de positionering draagt.

**Wat er geblokkeerd blijft zolang er niet gekozen is.** Taak 8 (de landingspagina, 4 dagen) en
de copy-onderdelen van taak 11. De rest loopt door. Let op: dit besluit is het goedkoopst te
onderbouwen van de drie — vijftien mensen, één middag, geen code (`E` §4.4, laag 1).

**Eerlijk over de kwantitatieve toets.** Om een relatieve verbetering van 30 % aan te tonen met
80 % onderscheidend vermogen zijn ongeveer 700 bezoekers per variant nodig, dus circa 2.100
voor drie varianten. Haalt de site die aantallen niet, doe dan niet alsof: test twee varianten
in plaats van drie, of test opeenvolgend en noteer de beperking erbij.

---

## Beslispunt 3 — het verdienmodel

**Het voorstel, uit `F` §3.** Primair: een eenmalige betaalde bewaar-versie van het volledige
rapport, €9. De inhoud blijft gratis en compleet; betaald wordt de uitvoering — een
getypografeerde PDF met het scorewiel als vector, een inhoudsopgave, een drukbare bladspiegel
en de deelpagina als losse eenpagina-PDF. De PDF wordt in de browser gemaakt uit
`arcana_result`; de betaling ontgrendelt alleen de generator. Secundair: één donatieregel na
het rapport.

**Wat `F` afwijst, met reden:** betaalmuur op bestaande hoofdstukken, cloud-opslag,
B2B/coach-licentie, affiliate, advertenties. Geparkeerd: het gedrukte keepsake-rapport.

**De opties:**

| Optie | Consequentie voor de rebuild | Consequentie daarna |
|---|---|---|
| **Ja, later** *(aanbevolen)* | Eén copywijziging in taak 8 en 10 (zie hieronder). Taak 6 moet het wiel drukbaar in vector opleveren — dat stond al op de lijst. Verder niets. | Circa 5 extra dagen ná taak 13: PDF-generator, Mollie-betaallink, ondertekende licentiesleutel, FAQ-antwoord, juridisch minimum. Start pas na drie maanden verkeersmeting. |
| Ja, meteen | De rebuild loopt 5 dagen uit en er komt een betaalknop op een site waarvan `F` §5.4 vaststelt dat de bindende beperking verkeer is, niet prijs. Bij 500 bezoekers per maand levert het model −€6,82 op. | — |
| Nee | Bespaart niets in de rebuild. De zin *"Er is geen server en geen account"* blijft dan staan zoals `C` §4 rij 17 hem wil. De vraag *waar verdienen jullie aan* blijft onbeantwoord — volgens `E` §2.5 een reëel gat op een site die op eerlijkheid verkoopt. | — |

**Aanbeveling: ja, later.** De volgorde uit `F` §6 is juist: eerst meten en vindbaar zijn, dan
bereik, dan pas verkopen. Om €250 netto per maand te halen zijn bij de verwachte percentages
circa 6.300 bezoekers per maand nodig; de site heeft er vandaag vermoedelijk een fractie van,
en de belangrijkste reden daarvoor is de canonical-bug die taak 2 oplost.

**De copyconsequentie, en dit is het deel dat de rebuild wél raakt.** `F` §1.3 wil één zin
preciezer:

| Nu | Na |
|---|---|
| "Er is geen server en geen account." | "Je antwoorden en je rapport blijven op je eigen apparaat. Er is geen account en er is geen server waar ze naartoe gaan." |

`C` §4 rij 17 markeert die kaart juist als `[houden]`, letterlijk vanwege de formulering
*"— ook voor ons"*. Dat is een echte tegenspraak; hij staat in §3, tegenspraak 7. **De
resolutie hangt aan dit beslispunt:** kiest de opdrachtgever *ja*, dan wint `F` en gaat de
herformulering mee in taak 8. Kiest hij *nee*, dan wint `C` en blijft de zin staan.

**Wat er geblokkeerd blijft zolang er niet gekozen is.** Alleen die ene zin in taak 8 en taak
10. Alles anders loopt door. Dit is daarmee het minst urgente van de drie besluiten — maar het
moet wel vóór taak 8 vallen, want daarna staat de zin er en moet hij een tweede keer aangeraakt
worden.

---

## Drie kleinere besluiten die tijdens de bouw vallen

Genoemd omdat ze elk een gouden hash raken en dus niet als refactor-bijvangst mogen gebeuren.

| Besluit | Waar | Wanneer nemen | Aanbeveling |
|---|---|---|---|
| **De achttien archetypenamen vertalen naar het Nederlands** (`De Zoeker`, `De Kluizenaar`, …) | `C` §4 rij 55 | **Vóór taak 10 of ná taak 13, nooit ertussenin** (`D` §8.7) | Doen, vóór taak 10. Achttien Engelse termen op een verder volledig Nederlandse site, als eerste woord over jezelf na 25 minuten introspectie, scheppen afstand op het moment dat je nabijheid wilt. |
| **`confidenceLevel` verlagen bij straight-lining** | `D` §8.5, `C` §6.5 | Bij taak 3, met de gouden-master-diff erbij | Doen. Wie alle 72 likertvragen op 7 zet krijgt nu `straightLiningRisk: true` én `confidenceLevel: "high"`. Dit is een gedragswijziging in de bevroren laag en vraagt een handtekening. |
| **De volgorde van de twaalf dimensies hergroeperen per familie** | `B` §3.2 | Bij taak 4 | Doen. Verandert geen score en geen zin — maar de regressietest moet op sleutel vergelijken en niet op positie, anders geeft hij vals alarm. |

---

# 3 — Tegenspraken tussen de werkstromen, opgelost

De zes documenten spreken elkaar op negen punten tegen. Ze zijn hier alle negen opgelost; waar
dat een aanbeveling van een werkstroom omkeert, staat dat er expliciet bij.

| # | De bewering | Wie zegt wat | Wat waar is | Wat er in deze spec geldt |
|---|---|---|---|---|
| **1** | Hoeveel woorden het rapport telt | `A` §1 en de site: 7.559 gerenderde woorden · site/statbalk en `index.html`: `5.500+` · `C` §4 rij 9 en §6.3: `7.500+`, want 5.500 is een onderschatting · `E`: volgt C, `7.500+` overal · `F` §5.1: "een ambachtelijk gezette PDF van 7.500 woorden" | **Nagemeten met de engine uit de bundel, over acht fixtures.** De markdown-export telt **5.711 tot 6.327 woorden**; de rapportproza alleen (33 secties, titel + intro + alinea's + bullets) **5.616 tot 6.201**. De 7.559 uit `A` is de **hele gerenderde pagina** inclusief inhoudsopgave, de twaalfrijenlijst bij het wiel, knoppen, labels en de kwaliteitskaart — geen rapporttekst. | **`7.500+` is een overclaim en gaat niet op de site.** De statbalk wordt **`5.700+`** — de gemeten ondergrens over acht fixtures, naar beneden afgerond. Het tweede deel van `C` §6.3 blijft wél staan: `volledig over jou` wordt `met de cijfers erbij`, want acht van de 33 hoofdstukken zijn algemene beschouwingen. **Vóór publicatie:** voeg een fixture toe met 70 % invulgraad en controleer of de ondergrens houdt; gedeeltelijke invulling is niet gemeten. |
| **2** | Heeft het scorewiel een tekstalternatief | `A` §3.6: "geen tekstalternatief, voor een schermlezer bestaat het beeld niet" (met een latere correctie in de tekst) · `D` §4.1: gemeten — `role="img"`, `aria-label` van 270 tekens, `aria-describedby` naar een zichtbare lijst van twaalf bedienbare rijen · `F` §2.1: citeert de ongecorrigeerde versie van `A` als rechtvaardiging voor de betaalde PDF | **`D` heeft gelijk**, de bewering is gemeten in de bundel (regel 18735–18863). `F` §2.1 citeert een bron die inmiddels gecorrigeerd is. | De overgang naar SVG blijft, maar op **drie andere gronden**: printen wordt vector in plaats van raster op ~150 dpi effectief, de donkere modus is met hardgecodeerde hexwaarden in JavaScript onmogelijk, en twaalf kleuren op ΔE2000 1,4 moeten sowieso vervangen worden. **Niet** op grond van schermlezertoegankelijkheid. De bestaande sleutel en de twaalfrijenlijst blijven ongewijzigd — ze zijn goed. `F` §2.1 verliest één van zijn drie argumenten voor de betaalde PDF; de andere twee blijven. |
| **3** | Hoeveel localStorage-sleutels er zijn | `A` §2.5: "Vier localStorage-sleutels, verder niets" — en somt er vervolgens zes op · `F` §1.1 en §2.8: citeert "vier" twee keer · `D` §1.4: gemeten, zes, met regelbereik 17219–17312 | **Zes**: `arcana_answers`, `arcana_current_question`, `arcana_result`, `arcana_started_at`, `arcana_completed_at`, `arcana_profile`. `A` §2.5 telt zichzelf mis; `F` neemt die telling over. | **Zes, straks zeven** met `arcana_theme` uit `D` §5.4. De privacytest in §6 controleert op exact zeven sleutels. `arcana_theme` valt buiten "alles wissen": een weergavevoorkeur is geen persoonsgegeven. Documenteer dat in de privacytekst. |
| **4** | Hoe lang het laadscherm duurt | `A` §1 en §3.5: gemeten met een stopwatch, **meer dan 10 seconden** · `D` §1.2: gemeten in de code, `setTimeout(onDone, 6000)` — een harde 6 seconden | **Allebei.** De code wacht 6.000 ms; de klok zegt meer dan 10 s. Het verschil van circa 4 s zit dus ergens anders — in de rendering van het rapport, het wachten op `document.fonts.ready` vóór de canvas-tekening, of de eerste opbouw van 936 DOM-knopen. | **Dat verschil moet gemeten worden in taak 1**, niet weggeredeneerd. Het rekenen zelf duurt minder dan 20 ms. Het laadscherm gaat naar een ondergrens van 1,2 s (zodat het niet flikkert) met een bovengrens en een voortgangsindicatie. Blijkt de resterende vertraging in het renderen te zitten, dan is dat een aparte bevinding voor taak 10, geen laadschermprobleem. |
| **5** | De volgorde: gouden master of domeinfix eerst | `D` §6: stap 0 feiten, stap 1 gouden master, stap 2 domeinbug · `A` §3.1, `E` §7.7 (P0) en `F` §6 (stap 0): de domeinfix vandaag, vóór alles | **Geen echte tegenspraak, wel een volgordefout.** `D`'s argument ("zonder gouden master is elke volgende stap een gok") geldt voor elke stap die code raakt. De domeinfix raakt geen code: het zijn drie statische tekstbestanden. | **De domeinfix gaat vóór de gouden master** en is taak 2. Hij kan bovendien zonder repo en de gouden master niet zonder meerwerk. `D`'s regel blijft onverkort gelden voor taak 4 en verder: **geen enkele regel die de engine raakt vóór taak 3.** |
| **6** | Wanneer de drie tellers gebouwd worden | `A` §4: route 1, drie tellers, opt-in, aanbevolen · `F` §6 stap 0: deze week, vóór alles, "zonder deze drie getallen is elk scenario een gok" · `D` §8.7: "Voeg geen analytics toe tijdens de rebuild — het maakt de test uit §7.5 rood" | **Allebei verdedigbaar, en ze sluiten elkaar niet uit.** `F` heeft de tellers nodig vóór het verdienmodel begint (maand 2 tot 3), niet vóór de rebuild. `D` wil ze niet als bijvangst in een rebuild van dertien taken. | **De tellers zijn een aparte uitlevering met een eigen besluit, een eigen branch en een eigen aanpassing van de privacytest — buiten de dertien taken.** Ze mogen parallel lopen. Wat niet mag: ze meesmokkelen in een rebuild-taak, want dan wordt de test die de kernbelofte bewijst rood en weet niemand meer waarom. De toestemmingsregel staat uitgeschreven in `E` §4.4. |
| **7** | Mag "Er is geen server en geen account" blijven staan | `C` §4 rij 17: `[houden]`, letterlijk, vanwege *"— ook voor ons"* · `F` §1.3: moet preciezer worden zodra er een betaling bestaat, want de belofte gaat over de gegevens en niet over de infrastructuur | **Afhankelijk van beslispunt 3.** `C` heeft gelijk zolang er geen transactie is; `F` heeft gelijk zodra die er is. Een betaaldienstverlener is een server. | **Gekoppeld aan beslispunt 3.** *Nee* → `C` wint, de zin blijft woordelijk. *Ja* → de herformulering uit `F` §1.3 gaat mee in taak 8, samen met het FAQ-antwoord op *waar verdienen jullie aan*. Neem dit besluit **vóór** taak 8, anders staat de zin er en moet hij twee keer aangeraakt worden. |
| **8** | Welk lettergewicht eruit kan | `B` §2(a): "Eén lettergewicht kan eruit (Inter 500 óf Cormorant 600), wat ongeveer 22 KB scheelt" · `D` §3.3: gemeten — er laden vier bestanden, Cormorant 400/500/600 en Inter 600. Inter 500 laadt niet. | **`D`.** Inter 500 bestaat niet in deze build, dus die keuze is er niet. Alleen Cormorant 600 kan eruit. De 22 KB uit `B` is het ongesubsette bestand (23.396 B); `D` rekent met de gesubsette set en komt op 11.440 B verschil. Beide kloppen in hun eigen kader. | **Cormorant 600 vervalt.** Fonts gaan van 94.036 B naar **34.040 B** (−63,8 %) met de basissubset van 114 glyphs plus een aanvulbestand met `unicode-range` voor bijzondere namen. Doel uit `A` §1 is ≤ 60 KB; dat wordt ruim gehaald. |
| **9** | Hoe groot de landingsbundel mag zijn | `D` §3.2: gemeten uitgangspunt 68,9 KB · `D` §6 stap 4 acceptatie: ≤ 75 KB · `D` §6 stap 7 acceptatie: ≤ 80 KB inclusief het inline wiel · `D` §7.8: de begroting in `scripts/meet-bundel.mjs` staat op 75.000 B | **Alle drie kloppen op hun eigen moment.** Het inline voorbeeldwiel kost 6.492 B brotli en komt er pas in taak 8 bij. 68,9 + 6,5 ≈ 75,4 KB. | **De begroting is een trap, geen getal.** 75.000 B vanaf taak 5, **80.000 B vanaf taak 8** — en die verhoging is zelf een gereviewde wijziging in `scripts/meet-bundel.mjs`, met een regel in de changelog. Een begroting die stilzwijgend meegroeit is geen begroting. Doel uit `A` §1 blijft ≤ 95 KB. |

**Wat er van deze negen het duurst zou zijn geweest om te missen:** nummer 1. De statbalk had
`7.500+` gekregen op een site waarvan de hele propositie is dat de getallen kloppen, met een
afwijking van circa 25 % — op precies de plek waar de scepticus kijkt.

---

# 4 — De rebuild-spec

Eén beeld van de eindsituatie. Per onderdeel: wat het wordt, en waar het detail staat.

## 4.1 Architectuur

**Wat blijft, en het is bijna de helft.** Gemeten in min-equiv bytes (`D` §2.1): **227.309 B
blijft** (46,9 %), **79.160 B wordt vervangen** (16,3 %), **228.445 B is React** (47,2 %) en
blijft als afhankelijkheid staan. De vragenbank, de definities, de rekenengine, de
rapportteksten als laag, de sectie-opbouw als structuur, de localStorage-laag en de
markdown-export blijven. Wat vervangen wordt is de presentatielaag plus de volledige CSS.

**De naad ligt op één functie-aanroep** (regel 20671):

```js
let e = Nt(Ce(i), d, new Date().toISOString());   // buildReport(computeResult(answers), profile, now)
```

Boven die regel de presentatie; eronder alles wat bevroren blijft. Doet de nieuwe front-end
deze aanroep met dezelfde argumenten en krijgt hij hetzelfde resultaat, dan is de engine per
definitie ongemoeid — en dat is precies wat de gouden master toetst.

**Vijf bevroren interfaces** (`D` §2.3, samengevat in `G-bronstructuur-kaart/README.md`):
`Answer`, `computeResult`, `buildReport` (met epoch 0 als standaard), de zes
localStorage-sleutels, en de variantkeuze `T(varianten, seed, slot)`. **Bevroren is het
rekenen, niet de tekst.** Werkstroom C wijzigt teksten — dat is de opdracht.

**Routing.** Geen router-bibliotheek. Een eigen `useHashRoute()` van ongeveer veertig regels
vervangt de fasevariabele plus de hashoverlay, kost nul kilobyte aan afhankelijkheden en werkt
op statische hosting zonder server-rewrite (`D` §1.1):

```
#/                        → landing
#/test                    → intake + vragen (vraagnummer in de query: #/test?v=37)
#/rapport                 → rapport
#/rapport#h=schaduwkant   → rapport, gesprongen naar hoofdstuk
#/privacy                 → privacy
#/voorwaarden             → voorwaarden
```

Dat lost drie dingen op die vandaag missen: een deelbare URL voor het rapport, een werkende
browser-terugknop tussen fases, en een deeplink naar één hoofdstuk — dat laatste is de
technische voorwaarde onder de deelpagina uit `C` §3.5.

**Zeven chunks in plaats van één** (`D` §3.2). De samenstelling volgt het moment waarop de code
nodig is, niet het onderwerp:

| Chunk | Wanneer | brotli |
|---|---|--:|
| `vendor.js` — React 19, ReactDOM, jsx-runtime | direct | 55.126 |
| `app.js` — app-root, hashroute, opslag, header, voettekst, juridisch | direct | 4.586 |
| `landing.js` — landingscopy en -componenten | direct | 5.177 |
| `test.js` — vragenbank, intake, vier vraagtypen, laadscherm | bij "Start de test" | 9.401 |
| `meta.js` — archetypen, 12 dimensies, spanningsvelden, duiding | met report of engine | 2.787 |
| `engine.js` — rekenengine, alle rapportteksten, 26 sectiebouwers | **voorgeladen bij vraag 110** | 50.030 |
| `report.js` — rapportweergave, scorewiel, markdown-export | bij het openen van het rapport | 10.186 |

| Scenario | over de lijn | tegenover 139,5 KB |
|---|--:|--:|
| Landing bekijken en weggaan | **68,9 KB** | **−70,6 KB (−50,6 %)** |
| Landing → test starten | 78,9 KB | −60,6 KB |
| Volledig eerste bezoek | 145,9 KB | **+6,4 KB (+4,6 %)** |
| Terugkomen om te herlezen | 77,2 KB | −62,3 KB |

De prijs staat er eerlijk bij: wie het hele traject doorloopt downloadt 6,4 KB méér. Dat is de
compressie-overhead van zeven chunks tegenover één. Betaald door de minderheid die de test
afmaakt, bespaard bij de meerderheid die dat niet doet.

**Het gevaarlijkste punt van de hele splitsing** is de engine-chunk die pas bij vraag 120 nodig
is. Wie op dat moment geen verbinding heeft, heeft 25 minuten gewerkt en krijgt niets. Drie
maatregelen, alle drie (`D` §8.2): voorladen bij vraag 110, een herhaalde import met
exponentiële wachttijd, en een scherm dat zegt dat de antwoorden veilig op het apparaat staan
plus een knop om ze als JSON te downloaden. **Is het schema krap: laad de engine mee bij de
intake in plaats van bij vraag 110.** Dan is de intake 53 KB duurder, de landing niet, en het
risico verdwijnt volledig. Dat is de veiligere variant en hij kost niets aan het hoofddoel.

## 4.2 Designsysteem

`design-tokens.css` en `design-tokens.json` uit werkstroom B gaan ongewijzigd in
`src/styles/tokens.css`. Wat ze oplossen:

| Onderwerp | Nu | Straks |
|---|---|---|
| Vlakken op de landing | 2 (sectiewissel 1,04:1) | 7 (eerste echte wissel 1,33:1) |
| Schaduwniveaus | 0 gebruikt (`--shadow: none`, nul aanroepen) | 4 |
| Haarlijn | 1,21:1 — praktisch onzichtbaar | 1,44:1, structuurlijn 1,80:1 |
| Typografische schaal | 102 declaraties, 58 unieke waarden | 11 treden, verhouding 1,20 → 1,26, vloeiend |
| `prefers-color-scheme`-regels | 0 | volledige donkere modus, licht én donker gemeten |
| Dimensiekleuren onder 3:1 | 2 van 12 | 0 |
| Dimensiekleuren onder 4,5:1 | 6 van 12 | 0 |
| Laagste ΔE2000 onder kleurenblindheid | **1,4** | **7,1** in licht · **7,4** in donker |
| `--ink-faint` als tekst | `#8b8177` = 3,60 (ongeschikt) | `#655b50` = 6,26 |
| Beeldmomenten op de landing | 1 | 3 |
| Paginahoogte landing | 7.083 px | ≤ 6.000 px (verwacht ~5.800) |

**Het accentkleursysteem draagt betekenis.** Twaalf losse kleuren die onderscheidbaar blijven
onder kleurenblindheid bestaan niet — het theoretische plafond ligt op ΔE2000 ≈ 10,6, en voor
betrouwbare categorische identificatie wil je 15 à 20. De oplossing is architectonisch: **vier
families van drie**, waarbij de kleur de familie draagt en de lichtheid het lid aanwijst
(`B` §3.2).

| Familie | Symbool | Betekenis | Dimensies |
|---|:--:|---|---|
| indigo | ◆ | motor en richting | Innerlijke motor · Denkstijl · Werkstijl |
| groen | ● | contact | Sociale energie · Emotionele gevoeligheid · Relatiepatroon |
| amber | ▲ | grip | Controle en zekerheid · Conflictstijl · Stressreactie |
| karmijn | ■ | zelf | Zelfbeeld · Schaduwkant · Groeipad |

De groepering volgt de zesdelige structuur van het rapport. **Naast kleur staan altijd drie
andere dragers:** het label, de vaste positie op het wiel, en het familiesymbool. Haal de kleur
weg en het wiel werkt nog; haal de labels weg en het werkt niet meer. Dat is de goede volgorde.
Elk scherm waar een dimensiekleur zonder label of symbool verschijnt is een fout, ook als het
contrast klopt.

**Het wiel wordt SVG** (`D` §4). 95 DOM-elementen erbij op een rapport van 936 (+10,0 %), de
bundel wordt er niet groter van — de SVG wordt op het apparaat gegenereerd uit de twaalf
scores. De hertekenlus, de `ResizeObserver`, de `devicePixelRatio`-afhandeling en de
`document.fonts.ready`-listener vervallen: ongeveer 120 van de 427 regels gaan weg. De twaalf
kleuren verhuizen van `w[].color` naar `var(--dim-…)`, waarmee de donkere modus van het wiel
klaar is zonder één regel JavaScript.

## 4.3 Tekst

**Driekwart van de bestaande tekst blijft** (`C`, uitgangspunt 3). Het probleem is niet de
schrijfkwaliteit maar de volgorde waarin de kwaliteit zichtbaar wordt. Vierenveertig plekken
worden aangeraakt, negen expliciet niet — waarvan drie **onaantastbaar**: de sectie *Eerlijk
gezegd*, het FAQ-antwoord over validatie (*"Gebruik het als spiegel, niet als bewijs"*) en het
FAQ-antwoord over selectie.

**Zeven bevindingen uit de brand review** (`C` §6), waarvan twee hoog. Beide hoge zijn interne
tegenspraken — de site spreekt zichzelf tegen, niet de werkelijkheid:

1. *"Elke zin komt uit een score"* is onwaar voor acht van de 33 hoofdstukken (de
   beschouwingen). De uitzondering wordt zelf genoemd; dat is sterker dan hem verzwijgen.
2. De landingspagina belooft herhaalbaarheid *over een jaar*; de Voorwaarden zeggen dat de
   berekening kan wijzigen. *"Over een jaar"* wordt *"volgende week"*, plus één zin: *"Wijzigen
   we de berekening, dan staat dat bij je rapport vermeld."* Die vermelding moet er dan ook
   komen.

**Het rapport wordt een naslagwerk in plaats van een lezing** (`C` §3). Vijf ingrepen: een
zelfstandige samenvatting bovenaan met een eigen anker die nergens naar boven verwijst en zes
uitspraken met een cijfer bevat; een rode draad tussen de hoofdstukken; een *"wat je hiermee
kunt"*-afsluiter per hoofdstuktype; terugkeerondersteuning; en het hoofdstuk *Hoe anderen jou
zouden moeten begrijpen* als echt deelbare eenpagina.

**Twee dingen die de vorm het tegendeel laten zeggen van de inhoud, en die weg moeten:** het
laadscherm met drie lijdende vormen zonder handelend voorwerp op een site die belooft dat er
geen taalmodel in zit, en de knoppenvolgorde waarbij het eerste wat iemand na 25 minuten ziet
twee knoppen zijn die dat werk vernietigen.

## 4.4 Landing en positionering

**Het positioneringsstatement** (`E` §1.4), dat alles hierboven stuurt:

> Voor Nederlandstalige volwassenen die zichzelf serieus willen onderzoeken maar niet geloven
> in typetests, is Arcana Profile het zelfreflectie-instrument dat bij elke uitspraak het cijfer
> laat zien waar hij uit volgt — omdat de test rekent in plaats van schrijft, en dat rekenwerk
> in je eigen browser gebeurt.

**De ordening van de claims:** *narekenbaar* is de spits (de reden om te beginnen), *gratis* en
*privé* halen de prijs weg in geld en in risico, *diepte* is wat je overhoudt, en *eerlijk over
de grenzen* is waarom je de andere vier gelooft.

**De elf secties krijgen zeven vlakken, drie breedtes, drie sectiehoogtes en drie
beeldmomenten** (`B` §4). De belangrijkste wijzigingen in de volgorde:

| # | Sectie | Vlak | Wat er verandert |
|---|---|---|---|
| 1 | Hero | `--bg` + contourgravure | h1 wordt de propositie in plaats van de merknaam |
| 2 | **Voorbeeldwiel** *(nieuw)* | `--bg-band` 69,5 %, volle breedte | Het sterkste element van het product staat nu binnen één scherm in plaats van achter 25 minuten |
| 3 | Statbalk | `--bg-ink` **donker** | Eerste ritmebreuk; `5.500+` wordt `5.700+` (zie §3, tegenspraak 1) |
| 4 | Waarom dit anders leest | `--bg` | Verhuist naar direct onder de hero; raster wordt asymmetrisch |
| 6 | Wat het meet | `--bg` | **De belangrijkste sectie**: twaalf identieke blokjes worden vier herkenbare familiekwadranten |
| 7 | Wat je krijgt | `--bg-deep` | Uitsnede uit een echte rapportpagina — laten in plaats van beschrijven |
| 9 | Eerlijk gezegd | `--bg-ink` **donker** | Donker maakt van een disclaimer een statement in plaats van kleine lettertjes |

## 4.5 SEO

**De technische basis is beter dan gemiddeld en dat moet eerst gezegd worden:** volledige OG-
en Twitter-tags, JSON-LD met drie schema-types, een `noscript`-fallback, en een volwaardige
statische HTML-versie van de propositie in `#root` die crawlers zien vóór React laadt.

**Daarnaast staat er één fout die al het bovenstaande ongedaan maakt.** Zolang de canonical
naar een ander domein wijst, is er geen SEO-werk dat effect heeft.

De drie prioriteiten, in volgorde (`E` §7.1): de domeinfix (taak 2), de h1 van merknaam naar
propositie (taak 8), en een tweede indexeerbare URL bouwen — het voorbeeldrapport (taak 12).

**De strategische lijn.** Arcana gaat `persoonlijkheidstest` en `big five test` niet winnen en
moet het niet proberen. Wat wél kan: de termen bezetten waar de eigen eigenschap in de
zoekopdracht zit — `persoonlijkheidstest zonder account`, `zonder e-mailadres`, `zonder
betaalmuur`, `voorbeeld persoonlijkheidsrapport`, `schaduwkant test`. Kleine volumes met een
conversieratio die de hoofdtermen nooit halen.

**Wat er bewust níet komt:** achttien tot dertig archetypepagina's (ondermijnt de
positionering), `AggregateRating` of `Review` in de schema (er zijn geen beoordelingen), een
blog, en de verwachting van FAQ-rich-results (Google beperkt die sinds 2023 tot gezaghebbende
overheids- en gezondheidssites).

## 4.6 Verdienmodel

Zie beslispunt 3. Samengevat: de inhoud blijft gratis en compleet, betaald wordt de uitvoering
(€9, eenmalig, PDF in de browser gemaakt uit `arcana_result`), plus één donatieregel. **Vijf
modellen staan expliciet afgewezen** — betaalmuur op bestaande hoofdstukken, cloud-opslag,
B2B/coach-licentie, affiliate en advertenties — en dat staat opgeschreven zodat het over een
jaar niet opnieuw ter discussie staat als het tegenvalt. Want dan zullen ze allemaal
aantrekkelijk lijken.

**Het belangrijkste getal uit het hele model:** de bindende beperking is verkeer, niet prijs.
Voor €250 netto per maand zijn circa 6.300 bezoekers per maand nodig. Daarom staat de domeinfix
vóór alles.

---

# 5 — Gefaseerde bouwtaken

**Veertien taken** (dertien genummerd plus taak 2b, die na de nagekomen bevinding in §1b is
toegevoegd). De volgorde loopt van laag naar hoog risico en levert de zichtbare winst zo
vroeg mogelijk. **Elke taak is één samenvoegverzoek, achter één functievlag waar dat kan, en de
acceptatiecriteria worden gehaald vóór het samenvoegen, niet erna.**

**De regressiepoort uit §6 geldt voor élke taak, ook waar hij niet apart genoemd wordt.** De
acceptatiecriteria hieronder komen daar bovenop.

| # | Taak | Dagen | Cum. | Risico | Zonder repo? | Was in `D` |
|---|---|--:|--:|---|:--:|---|
| 1 | Nulmeting en feiten vastleggen | 0,5 | 0,5 | geen | **deels** | stap 0 |
| 2 | **De domeinfix** | 0,5 | 1,0 | geen | **ja, klaar** | stap 2 |
| 2b | **De 301 en Arcana Mirror** | 0,5 | 1,5 | geen | **ja** | **nieuw** (§1b) |
| 3 | **De gouden master** | 1,0 | 2,5 | geen | **ja, gedraaid** | stap 1 |
| 4 | Tokens, fonts en de dimensiefamilies | 1,5 | 4,0 | laag | nee | stap 3 |
| 5 | De bundel splitsen | 2,0 | 6,0 | laag–middel | nee | stap 4 |
| 6 | Het scorewiel naar SVG | 3,0 | 9,0 | middel | nee | stap 5 |
| 7 | De donkere modus | 2,0 | 11,0 | laag | nee | stap 6 |
| 8 | De landingspagina | 4,0 | 15,0 | laag, hoge zichtbaarheid | nee | stap 7 |
| 9 | De vragenflow | 2,0 | 17,0 | laag | nee | stap 8 |
| 10 | De rapportweergave | 5,0 | 22,0 | middel–hoog | nee | stap 9 |
| 11 | Disclaimers, SEO en JSON-LD | 1,5 | 23,5 | geen | nee | stap 10 |
| 12 | Het voorbeeldrapport als tweede URL | 2,5 | 26,0 | laag | nee | **nieuw** (`E` §7.6, `F` §6) |
| 13 | Opruimen en hermeten | 1,0 | 27,0 | laag | nee | stap 11 |

**27,0 dagen basis.** Plus ongeveer 20 % voor de tests die in elke taak zitten en 15 % voor de
terugkoppeling uit de gebruikerstest van `A` §6 — samen **ongeveer 36,5 werkdagen voor één
ontwikkelaar**.

**Wat je het eerst uitlevert, los van de rest:** taak 2, deze week.
**Wat je als eerste zichtbare verandering uitlevert:** taak 4 + 6 + 7 + 8 samen — dat is "de
nieuwe site" voor de buitenwereld, na ongeveer drie weken.

---

## Taak 1 — Nulmeting en feiten vastleggen · 0,5 dag · risico: geen · **deels zonder repo**

**Waarom hier.** Zonder nulmeting is "beter" niet te bewijzen. Elk getal in `A` §1 is een
herhaalbare meting; taak 13 wordt er straks tegenaan gehouden.

**Wat er gebeurt.**
- Draai het contrastscript en het performancescript uit `A` §5 op de live site en leg de uitkomst
  vast in `docs/nulmeting.json`, met de negen metrieken uit `A` §1. *(kan zonder repo)*
- Draai PageSpeed Insights één keer op `arcanaprofile.com` en plak het resultaat erbij. `A` §1
  meldt expliciet dat Lighthouse vanuit de onderzoeksomgeving niet betrouwbaar te draaien was.
  *(kan zonder repo)*
- **Meet waar de ontbrekende 4 seconden van het laadscherm zitten** (§3, tegenspraak 4). De code
  wacht 6.000 ms, de stopwatch zei meer dan 10 s. *(kan zonder repo)*
- ~~Open `https://speaktoart.com/` in een browser en leg vast wat er staat.~~ **Gedaan op
  22-09-2026, zie §1b:** het domein is in de lucht en serveert "Arcana Mirror", een eerdere
  versie van hetzelfde product, zonder canonical. **Route A** is van toepassing. Wat rest is de
  beslissing in §1b, niet het onderzoek. *(kan zonder repo — klaar)*
- Loop `G-bronstructuur-kaart/README.md` na tegen de echte repo en corrigeer `D` §1.6 waar de
  werkelijkheid afwijkt. Begin bij `src/data/questions/` — daar hangt de rest van de boom aan.
  *(vereist de repo)*

**Brondocumenten:** `A` §1 en §5 · `D` §1.6 · `G-bronstructuur-kaart/README.md`.

**Acceptatiecriteria.**
- `docs/nulmeting.json` bestaat en bevat alle negen metrieken uit `A` §1 met hun gemeten waarde.
- De PageSpeed-uitslag staat erbij, met datum.
- Er staat één regel in over wat `speaktoart.com` op dit moment serveert. **Al voldaan:** zie
  §1b — "Arcana Mirror", in de lucht, geen canonical, route A.
- `G-bronstructuur-kaart/README.md` is bijgewerkt: elk `[AANGENOMEN]`-label is óf bevestigd óf
  gecorrigeerd.

**Terugrollen.** Niet van toepassing — er verandert geen productiecode.

**Afhankelijkheden.** De tweede helft vereist beslispunt 0.

---

## Taak 2 — De domeinfix · 0,5 dag · risico: geen · **volledig zonder repo, en klaar**

**Waarom hier.** Dit is de enige bevinding in alle zes de documenten die vandaag geld kost en
niet op de rebuild hoeft te wachten. `A` §3.1, `E` §7.7 (P0) en `F` §6 (stap 0) zetten hem alle
drie op positie één. Hij raakt geen enkele regel code, dus de regel "niets vóór de gouden
master" geldt hier niet (§3, tegenspraak 5).

**Wat er gebeurt, op bestandsniveau.** Elf voorkomens van `speaktoart.com` → `arcanaprofile.com`:
negen in `index.html` (canonical, og:url, og:image, twitter:image, drie JSON-LD `@id`'s, twee
JSON-LD `url`'s), één in `robots.txt`, één in `sitemap.xml`. Plus `og:image:alt` en
`<lastmod>` uit `E` §3.1.

**Dit werk is gedaan.** De drie gecorrigeerde bestanden staan in `G-domeinfix/`, met
`TOEPASSEN.md` erbij: de zeven stappen om het vandaag live te zetten, inclusief de 301-kwestie,
de deelkaartcaches en Search Console.

**Brondocumenten:** `E` §3 volledig · `A` §3.1 · `G-domeinfix/TOEPASSEN.md`.

**Acceptatiecriteria.**
- `curl -sS https://arcanaprofile.com/ | grep -c speaktoart` → **0**.
- `curl -sSI https://arcanaprofile.com/og-image.jpg` → 200, `image/jpeg`, 127.674 bytes.
- `robots.txt` en `sitemap.xml` noemen beide uitsluitend `arcanaprofile.com`.
- Rich Results Test herkent `WebSite`, `WebApplication` en `FAQPage`, zonder fouten en zonder
  waarschuwing over URL's op een ander domein.
- De WhatsApp-deelkaart toont de juiste titel, afbeelding **en domeinnaam**. Dit is de enige
  controle die meet wat de bezoeker werkelijk ziet.
- `http://` en `www.` 301'en naar één gekozen canonieke variant.
- `node check-domains.mjs <buildmap>` geeft exit-code 0.

**Terugrol-optie.** De drie originele bestanden terugzetten uit `terugrol/` en de cache legen.
Geen migratie, geen state. Kanttekening: terugrollen herstelt ook de bug.

**Afhankelijkheden.** Geen. De 301-beslissing hangt aan taak 1 (wat serveert `speaktoart.com`).

---

## Taak 2b — De 301 en Arcana Mirror · 0,5 dag · risico: laag · **volledig zonder repo**

**Waarom hier.** Taak 2 zet `arcanaprofile.com` op zichzelf. Zolang `speaktoart.com` dáárnaast
een bijna identieke site blijft serveren, concurreren twee sites van dezelfde eigenaar om
dezelfde zoekwoorden en blijft de oude de sterkste kandidaat in de index. §1b stelt vast dat dit
geen theoretisch risico is: het domein is op 22-09-2026 met een echte browser gecontroleerd, is
in de lucht, serveert "Arcana Mirror" met dezelfde 120 vragen en dezelfde belofte, en heeft
géén canonical. Route A uit taak 1 is van toepassing — het domein is nog van de eigenaar.
Daarmee is dit na taak 2 de urgentste actie in het hele dossier, en hij kost geen regel code.

**Volgorde.** Strikt ná taak 2. Een 301 naar een domein dat nog naar het oude domein canonicaliseert
maakt de lus alleen rond. Zelfde week als taak 2.

**Wat er gebeurt, op bestandsniveau.**
- Op `speaktoart.com` een 301 op de héle boom naar `arcanaprofile.com`, **met padbehoud** — de
  `.htaccess`- en nginx-regels staan letterlijk uitgeschreven in `E` §3.3, route A.
- Arcana Mirror uitzetten, zodat er geen tweede versie van hetzelfde product blijft draaien.
  Als hij wél moet blijven, is dat een productbeslissing en geen redirect: zie de tabel in §1b
  en volg dan de rij *"Als Arcana Mirror moet blijven"* in plaats van deze taak.
- Beide domeinen verifiëren in Search Console en *Instellingen → Adreswijziging* indienen op
  `speaktoart.com`.
- `E` §3.3 noemt ook de deelkaartcaches: LinkedIn Post Inspector en de Facebook Sharing
  Debugger één keer opnieuw laten ophalen.

**Brondocumenten:** §1b · `E` §3.2 en §3.3 (route A) · `G-domeinfix/TOEPASSEN.md`.

**Acceptatiecriteria.**
- De 301 is met **padbehoud** getest op **minstens drie paden**, waaronder de wortel:
  `curl -sSI https://speaktoart.com/` → `301` naar `https://arcanaprofile.com/`;
  `curl -sSI https://speaktoart.com/sitemap.xml` → `301` naar `https://arcanaprofile.com/sitemap.xml`;
  `curl -sSI https://speaktoart.com/wat-je-krijgt` → `301` naar `https://arcanaprofile.com/wat-je-krijgt`.
  Geen enkel pad mag op de wortel uitkomen; dat is de klassieke fout bij deze redirect.
- `www.speaktoart.com` en `http://speaktoart.com` 301'en naar dezelfde canonieke bestemming,
  in **één** hop — `curl -sSIL` toont maximaal één `301` vóór de `200`.
- **Arcana Mirror is uit.** Er draait op `speaktoart.com` geen pagina meer die de test
  aanbiedt: `curl -sS https://speaktoart.com/ | grep -ci "arcana mirror"` → **0** (of de
  redirect vangt het verzoek al af vóór er HTML is).
- De **adreswijziging is ingediend** in Search Console op `speaktoart.com`, met beide domeinen
  geverifieerd. Leg de datum vast in `docs/nulmeting.json`, want de doorlooptijd van de
  herindexering wordt daar vanaf geteld.
- De deelkaart op `speaktoart.com` levert geen eigen voorvertoning meer op; LinkedIn en
  Facebook tonen na het opnieuw ophalen de kaart van `arcanaprofile.com`.

**Terugrol-optie.** De 301-regels uit `.htaccess` of de serverconfiguratie halen en Arcana
Mirror weer aanzetten. Let op: een 301 wordt door browsers agressief gecached, dus terugrollen
werkt niet onmiddellijk voor wie de redirect al heeft gezien. Twijfel je, zet hem dan eerst een
week als **302** neer en pas daarna om naar 301 — dat kost niets en is volledig omkeerbaar.

**Afhankelijkheden.** Taak 2 (moet live zijn). Taak 1 leverde de waarneming; die is met §1b
beantwoord, dus er is geen onderzoek meer nodig.

---

## Taak 3 — De gouden master · 1,0 dag · risico: geen · **volledig zonder repo, en gedraaid**

**Waarom hier.** Zonder gouden master is elke volgende taak een gok. Dit is de goedkoopste
verzekering in het hele project, en vanaf hier geldt: **geen enkele regel die de engine raakt
vóór deze taak groen is.**

**Wat er gebeurt.**
- Acht fixtures vastleggen (`tests/fixtures.ts`), uitgeschreven in `D` §7.2 stap B. De vier
  uitersten zijn niet optioneel: vier willekeurige fixtures gaven alle vier hetzelfde primaire
  archetype.
- De determinismetest in twee helften (`tests/determinisme.test.ts`), uitgeschreven in `D` §7.2
  stap C. Harde helft: scores, archetypen, spanningsvelden, variantkeuzes. Zachte helft: de
  markdown byte voor byte.
- De je→u-omzetting apart testen over **alle** brontekst, niet over een steekproef
  (`tests/aanspreekvorm.test.ts`, `D` §7.3).
- Een test die telt dat geen enkele variantenlijst van lengte veranderd is
  (`tests/golden/variant-lengtes.json`, `D` §8.1).
- De twee controles uit `D` §1.4 toevoegen: een versiecontrole op `arcana_result` en een
  ondergrens van 60 antwoorden in `buildReport`.
- Het besluit over `confidenceLevel` bij straight-lining nemen, met de diff erbij (`D` §8.5).

**Dit is vandaag gedraaid.** `tools/engine-uit-bundel.cjs` knipt regel 12574–17218 plus
18024–18080 uit de bundel en levert 255.207 bytes die meteen in Node draaien, zonder DOM,
zonder React, zonder shim. `120 12 2.0.0`. **De vier hashes uit `D` §7.2 zijn exact
gereproduceerd en er zijn er vier bij gemeten:**

| Fixture | Archetypen (primair / secundair / stress) | Secties | md-bytes | md-woorden | SHA-256 |
|---|---|--:|--:|--:|---|
| A-evenwichtig | theHermit / theSeeker / theDefender | 33 | 35.928 | 5.948 | `8c071eb5fc98a7b0…` |
| B-uitgesproken | theHermit / theSeeker / theSprinter | 33 | 36.021 | 5.964 | `d0d0fc7491e2e6ff…` |
| C-u-vorm | theHermit / theSeeker / theSprinter | 33 | 35.751 | 5.964 | `08f02de30f43074f…` |
| D-zonder-naam | theHermit / theSeeker / theDefender | 33 | 35.090 | 5.797 | `b8a20cc12697a994…` |
| **E-alles-laagst** | theSeeker / theArchitect / theDefender | 33 | 34.646 | 5.711 | `505b2c78301e2b09…` |
| **F-alles-midden** | theFlame / theArchitect / theDefender | 33 | 34.892 | 5.738 | `346c48728b97f0c8…` |
| **G-alles-hoogst** | theFlame / theArchitect / theController | 33 | 38.057 | 6.298 | `52586cb631330652…` |
| **H-alles-hoogst-optieB** | theFlame / theStrategist / theVanisher | 33 | 38.221 | 6.327 | `baa701a91d5babc6…` |

Fixture B en C hebben dezelfde antwoorden en verschillen alleen in `addressForm`. Het
byteverschil van 270 bytes is de volledige je/u-omzetting. **Worden B en C ooit gelijk, dan is
`ze()` stukgegaan.** De volledige hashes, de gekozen archetypen, de `responseQuality` per
fixture en de woordtellingen staan in
`G-bronstructuur-kaart/tests/golden/gemeten-2026-09-22.json`. Neem ze ongewijzigd over.

**Brondocumenten:** `D` §7.2, §7.3, §8.1, §8.5, §8.6 · `A` §7.

**Acceptatiecriteria.**
- `npm test` is groen, in minder dan 20 seconden.
- **De test faalt aantoonbaar als je één letter in een rapporttekst verandert.** Test de test:
  doe dat en draai opnieuw.
- Fixture B en C geven verschillende uitvoer.
- `buildReport(computeResult({}))` gooit nu `OnvoldoendeAntwoorden` in plaats van een compleet
  rapport over niemand te produceren.
- Een `arcana_result` met een oudere `meta.version` geeft een uitlegscherm, niet een witte pagina.

**Terugrol-optie.** Testbestanden verwijderen. De enige productiewijzigingen zijn de
versiecontrole, de ondergrens en eventueel `confidenceLevel` — elk een eigen commit.

**Afhankelijkheden.** Kan zonder repo via `tools/engine-uit-bundel.cjs`. Zodra de repo er is,
vervang je `require('./engine-extract.cjs')` door een import uit `../src` en verandert er
verder niets aan de test.

---

## Taak 4 — Tokens, fonts en de dimensiefamilies · 1,5 dag · risico: laag

**Waarom hier.** Alles wat visueel is hangt hieraan. En het is de goedkoopste taak met het
grootste bereik: de waarden veranderen, de vormen nog niet.

**Wat er gebeurt, op bestandsniveau.**
- `src/styles/tokens.css` ← `design-tokens.css` uit werkstroom B, ongewijzigd (9.163 B min /
  2.176 B brotli).
- `src/styles/fonts.css` ← de `@font-face`-regels met `unicode-range`-splitsing uit `D` §3.3.
  Cormorant 600 vervalt (§3, tegenspraak 8).
- `public/assets/*.woff2` ← de gegenereerde subsets: basis van 114 glyphs plus een aanvulbestand
  van 221 glyphs dat alleen laadt bij een bijzondere naam.
- `index.html` ← `<link rel="preload">` op precies één bestand: Cormorant 500 basis, de LCP van
  de landingspagina.
- `src/data/dimensions.ts` ← `color` eruit, `token` erin, en de volgorde hergroepeerd per
  familie (`B` §3.2).

**Brondocumenten:** `B` §1.1, §1.7, §3.2, §3.3 · `D` §3.3, §3.4 · `design-tokens.css/.json`.

**Acceptatiecriteria.**
- Fonts over de lijn **≤ 60.000 B** (nu 94.036 B; verwacht 34.040 B).
- CSS over de lijn ≤ 14.000 B (nu 9.140 B gemeten, verwacht ~11.000 B).
- Contrastscript: 0 fouten op alle drie de schermen.
- De twaalf dimensiekleuren hermeten uit `design-tokens.json`: 12 van 12 halen AA, laagste
  ΔE2000 over alle 66 paren en vier zichtcondities **≥ 7,1 in licht en ≥ 7,4 in donker**
  (gemeten: 7,10 resp. 7,44). Meet met de methode die in `design-tokens.json` onder
  `deltaE2000_methode` staat — Machado 2009 severiteit 1,0 op **lineaire** RGB, CIEDE2000, D65 —
  en ijk hem eerst op het oude paar `#9a9349`/`#b58b41` onder protanopie, dat 1,41 moet geven.
- De harde helft van de determinismetest is groen. **De hergroepering van de dimensies mag geen
  enkele score raken** — vergelijk op sleutel, niet op positie.
- Visueel vrijwel identiek aan nu. Deze taak verandert waarden, geen vormen.

**Terugrol-optie.** Het oude `:root`-blok en de oude `@font-face`-regels terugzetten. De rest
van de CSS verwijst naar tokennamen die in beide versies bestaan.

**Waarschuwing die je vooraf meldt.** Na deze taak ziet de site er *bijna* hetzelfde uit maar
niet helemaal: `--ink-faint` gaat van `#8b8177` (3,60:1) naar `#655b50` (6,26:1). Dat is
zichtbaar donkerder grijs. Dat is de bedoeling — meld het vooraf, anders wordt het als fout
gemeld.

**Afhankelijkheden.** Beslispunt 1. Taak 3 groen.

---

## Taak 5 — De bundel splitsen · 2,0 dagen · risico: laag tot middel

**Waarom hier.** Dit is de grootste meetbare winst in het hele plan (−70,6 KB op de landing) en
hij is volledig onafhankelijk van hoe de pagina eruitziet. Hij kan dus vóór al het visuele werk.

**Wat er gebeurt, op bestandsniveau.**
- `vite.config.ts` ← `manualChunks` uit `D` §3.2.
- `src/App.tsx` ← `React.lazy` op landing, test en rapport; `genereerRapport()` met dynamische
  import van engine en build; het voorlaadpunt bij vraag 110.
- `index.html` ← `modulepreload` op vendor, app en landing.
- `scripts/meet-bundel.mjs` ← de begroting als test, die faalt bij overschrijding.

**In vier deelstappen, in deze volgorde:** eerst `report.js`, dan `test.js`, dan `meta.js`, dan
als laatste `engine.js`. Die laatste levert 69 % van de winst en is de enige met echt risico.

**Brondocumenten:** `D` §3.1, §3.2, §7.8, §8.2.

**Acceptatiecriteria.**
- Landing over de lijn **≤ 75.000 B** (verwacht 68.938; nu 139.500).
- **De determinismetest is nog groen — dit is het belangrijkste criterium van de hele taak.**
  Asynchroon laden mag geen letter aan de uitvoer veranderen.
- Op een verbinding van 400 kbit/s duurt de overgang van vraag 120 naar rapport minder dan 2 s.
- De privacytest bewijst nul verzoeken naar een ander domein.
- **De offline-test slaagt:** de hele doorloop werkt met de stekker eruit na de eerste render.
  Slaagt hij niet, dan is het voorladen niet op orde en is dat een echt probleem, geen
  testprobleem.
- Alle drie de maatregelen uit `D` §8.2 zitten erin: voorladen bij 110, herhaalde import met
  exponentiële wachttijd, en een scherm dat de antwoorden veiligstelt met een downloadknop.

**Terugrol-optie.** `manualChunks` uitcommentariëren en de `lazy()`-aanroepen terugzetten naar
directe imports. De applicatiecode is verder ongewijzigd: dit is een omkeerbare
configuratiewijziging.

**De veiligere variant als het schema krap wordt.** Laad de engine mee bij de intake in plaats
van bij vraag 110. De intake wordt dan 53 KB duurder, de landing niet, en dit risico verdwijnt
volledig.

**Afhankelijkheden.** Taak 3 groen. Onafhankelijk van beslispunt 1.

---

## Taak 6 — Het scorewiel naar SVG · 3,0 dagen · risico: middel

**Waarom hier.** Het wiel is de enige echte blokkade voor de donkere modus: de twaalf kleuren
en de drie inktkleuren zitten hard in JavaScript, en een donkere modus is met die opzet
onmogelijk zonder de tekenfunctie te herschrijven. Vóór deze taak zou taak 7 een tweede
canvas-tekening vergen die daarna weer weg moet.

**Wat er gebeurt, op bestandsniveau.**
- `src/components/report/scoreWheel.geometry.ts` ← de rekenkant, losgetrokken uit regel
  18327–18398, gedeeld met de statische generator.
- `src/components/report/ScoreWheel.tsx` ← de SVG-component, 95 DOM-elementen bij vier
  alfaklassen.
- `src/styles/wheel.css` ← één regel per dimensie (`--kleur: var(--dim-…)`), plus de vier
  klassen (`vaan`, `gloed`, `score`, `lijn`).
- `src/styles/print.css` ← gloed uit, animatie uit, altijd het lichte palet,
  `print-color-adjust: exact`.
- `scripts/genereer-voorbeeldwiel.ts` ← de statische SVG voor de landingspagina.
- `src/components/report/scoreWheel.canvas.ts` blijft staan tot taak 13, achter een functievlag.

**Brondocumenten:** `D` §4 volledig · `B` §3.3, §3.4, §3.5 · `A` §3.6 met de correctie uit `D` §4.1.

**Acceptatiecriteria.**
- **Het SVG-wiel en het canvas-wiel naast elkaar op hetzelfde scherm, dezelfde score, geen
  zichtbaar verschil in vorm.** Niet in twee tabbladen — naast elkaar. En laat iemand met een
  oog ernaar kijken, niet alleen een diff-drempel: de nieuwe versie hóórt te verschillen in
  kleur, dus een pixelvergelijking zegt hier niets.
- ≤ 95 DOM-elementen bij maximale uitslag (alle twaalf op 0 of 100). Rapport-DOM: 936 → ≤ 1.030.
- Print levert vector: open de PDF, zoom naar 800 %, de pluimen blijven scherp. Controleer in de
  PDF-stream op pad-operatoren in plaats van een `/Image`-object.
- Contrastscript, dat nu ook de `<text>`-knopen van het wiel meeneemt: **0 fouten in licht en
  donker**. Dit is strenger dan de nulmeting, want het canvas werd nooit meegemeten.
- Toetsenbord: tab door de twaalf groepen; elke groep licht op en kondigt naam en score aan.
- `prefers-reduced-motion: reduce` → geen animatie, direct de eindstand.
- `forced-colors: active` (Windows hoog contrast): het wiel verdwijnt niet.
- De bestaande sleutel en de twaalfrijenlijst zijn **ongewijzigd**.

**Terugrol-optie.** Functievlag terugzetten. Het canvas-bestand blijft tot taak 13 in de repo.

**De verborgen complexiteit.** `mix-blend-mode: multiply` binnen een `<svg>` gedraagt zich in
Safari anders dan in Chrome, en de `stroke-dasharray`-animatie over 95 paden is de tweede plek
waar browsers verschillen. **Test Safari vroeg.** Werkt het niet: de gloed heeft alfa 0,085 en
is decoratief — laat hem in Safari vallen in plaats van het plan om te gooien.

**Afhankelijkheden.** Taak 4 (de tokens moeten bestaan). Beslispunt 1.

---

## Taak 7 — De donkere modus · 2,0 dagen · risico: laag

**Waarom hier.** Na taak 6 is het wiel token-gestuurd en is de enige echte blokkade weg.

**Wat er gebeurt, op bestandsniveau.**
- `index.html` ← het blokkerende inline bootscript van 214 bytes vóór de stylesheet, plus een
  minimale kleurregel zodat ook de statische `#root`-inhoud klopt. **De inline `style` met
  `color:#292420` in de `#root`-fallback moet weg** — die blijft anders zwart in donker.
- `src/theme.ts` ← drie standen: licht, donker, systeem. `arcana_theme`, als `JSON.stringify`
  net als alle andere sleutels.
- `src/components/ThemeToggle.tsx` ← in de voettekst én bovenaan het rapport, naast de
  exportknoppen. Het rapport is 21.716 px hoog en wordt 's avonds gelezen; daar is de schakelaar
  geen instelling maar een leeshulp.
- `src/styles/tokens.css` ← de vier uitzonderingen uit `D` §5.2: schaduwen worden randen in
  donker, de sepia-gravure krijgt een CSS-filter, de twee donkere blokken in de lichte modus
  krijgen `color-scheme: dark`, `theme-color` krijgt twee media-varianten.

**Brondocumenten:** `D` §5 volledig · `B` §2(a) palet donker, §6.2.

**Acceptatiecriteria (de zes uit `D` §5.5, alle zes).**
- 0 contrastfouten in donker, op alle drie de schermen.
- **Geen flits bij het laden, ook niet bij een koude cache.** DevTools, netwerk op Slow 3G, CPU
  4× vertraagd, `prefers-color-scheme: dark` geforceerd.
- Handmatige keuze overleeft een herlaadbeurt.
- Handmatige keuze wint van het systeem: systeem donker + app licht → app blijft licht.
- Printen vanuit donker levert een licht vel.
- Het wiel klopt in donker, visueel én met het contrastscript op de `<text>`-knopen.
- `prefers-color-scheme`-regels: van 0 naar > 0. `prefers-reduced-motion`-regels: ≥ 5.
- De privacytest telt exact zeven localStorage-sleutels.

**Terugrol-optie.** Het bootscript en de `[data-theme]`-blokken uit de CSS halen. De
`@media (prefers-color-scheme)`-blokken kunnen blijven staan — die zijn op zichzelf onschadelijk.

**Het risico dat pas laat opduikt.** De donkere modus in het rapport is 21.716 pixels aan
onbeproefd terrein. Eén tabel, één citaatblok of één ingesloten badge die alleen in licht is
getest, en je hebt een fout die pas halverwege hoofdstuk 20 verschijnt. Loop het rapport in
donker van boven naar beneden door, met de hand, één keer volledig.

**Afhankelijkheden.** Taak 6. Beslispunt 1.

---

## Taak 8 — De landingspagina · 4,0 dagen · risico: laag, hoge zichtbaarheid

**Waarom hier.** Dit is de taak met de meeste zichtbare winst, en je wilt hem dus vroeg. Maar
hij bouwt op de tokens (4), het wiel (6) en de donkere modus (7). Dit is de vroegst mogelijke plek.

**Wat er gebeurt, op bestandsniveau.**
- `src/components/landing/*` ← de elf secties uit `B` §4 met hun vlak, breedte, beeld en ritme.
- `src/components/landing/copy.ts` ← de volledige copy uit `E` §5 en de herschrijvingen uit
  `C` §4.1–4.6, inclusief de gekozen herovariant uit beslispunt 2.
- `src/components/landing/ScoreWheelSample.tsx` ← het inline voorbeeldwiel, +6.492 B brotli.
  **Niet de wielcomponent meeladen** — dan sleep je de generator plus de dimensiedata naar de
  landingschunk.
- `src/styles/landing.css`.
- `scripts/meet-bundel.mjs` ← de landingsbegroting van 75.000 naar 80.000 B, als eigen commit
  met een regel in de changelog (§3, tegenspraak 9).

**De inhoudelijke wijzigingen die hier vallen en die je niet mag vergeten:**
- De h1 wordt de propositie, niet de merknaam. De merknaam staat als kleine regel erboven.
- Het "waarom dit anders leest"-blok verhuist naar direct onder de hero.
- De statbalk: `5.500+` wordt **`5.700+`**, en `volledig over jou` wordt `met de cijfers erbij`
  (§3, tegenspraak 1).
- Kaart 1: *"Elke zin komt uit een score"* wordt herschreven mét de uitzondering voor de acht
  beschouwingen (`C` §6.1).
- Kaart 2: *"over een jaar"* wordt *"volgende week"*, plus de zin over de berekening (`C` §6.2).
- De derde geruststelling wordt *"Geen taalmodel — de test rekent"* in plaats van *"Direct je
  volledige rapport"*, dat door het laadscherm gebroken wordt (`C` §6.6).
- De metaregel krijgt `· je kunt pauzeren` erbij. Vier woorden die de grootste drempel van het
  product halveren.
- Kaart 5 (*"Er is geen server en geen account"*): blijft of wordt geherformuleerd, afhankelijk
  van beslispunt 3 (§3, tegenspraak 7).
- **De sectie *Eerlijk gezegd* is onaantastbaar.** Niet inkorten, niet verplaatsen, niet
  verzachten. Wel: donker vlak, volle breedte.

**Brondocumenten:** `B` §4 · `E` §4 en §5 volledig · `C` §4.1–4.6 en §6.

**Acceptatiecriteria.**
- Paginahoogte **≤ 6.000 px** (nu 7.083; verwacht ~5.800).
- Landing over de lijn **≤ 80.000 B** inclusief het inline wiel.
- Contrastscript: 0 fouten, licht en donker, op 1440, 390 en 320 px.
- **Skip-link aanwezig en werkend** — die ontbreekt vandaag.
- Koppenhiërarchie zonder sprongen, precies één h1.
- De vier disclaimers in sectie 9 staan er nog, op dezelfde plek in de leesvolgorde.
- De `noscript`- en de statische `#root`-inhoud zijn inhoudelijk ongewijzigd en nog steeds
  zichtbaar vóór hydratie.
- Zeven verschillende vlakken over elf secties, drie beeldmomenten, twee donkere blokken.
- Geen hovereffect op de twaalf dimensiekaarten — die zijn geen links, en een lift belooft iets
  wat niet gebeurt.
- De binnenkomstanimatie is niet de basisstaat: de CSS-basisstaat is **zichtbaar**, JavaScript
  voegt de animatie toe. Faalt het script, dan staat de pagina er gewoon.

**Terugrol-optie.** De oude landingscomponenten staan in één map; de router wijst één import
aan. Terugrollen is één regel.

**Afhankelijkheden.** Taak 4, 6, 7. Beslispunt 1, 2 en (voor één zin) 3.

---

## Taak 9 — De vragenflow · 2,0 dagen · risico: laag

**Waarom hier.** Onafhankelijk van het visuele werk en van het rapport. Kan parallel aan taak 8
als er twee mensen zijn.

**Wat er gebeurt, op bestandsniveau.**
- `src/components/intake/ProfileForm.tsx` ← de tekst uit `C` §4.7, plus de knop **`Liever zonder
  naam →`**. De engine kan dit al: `et()` heeft voor elke aanspreekzin een naamloze variant. De
  functie is er, de knop niet.
- `src/components/test/*` ← de blokaanduiding wordt `Stellingen · {n} van 72` in plaats van
  `Deel 1 van 4`, want de blokken zijn 72/24/16/8 en die scheefheid moet niet als vier gelijke
  delen gepresenteerd worden. Het voortgangslabel krijgt de resttijd erbij (`arcana_started_at`
  bestaat al). De laatste knop wordt `Afronden — laat mijn rapport zien`.
- **Het meeverhuizende focuskader repareren** (`A` §3.9): na het beantwoorden van een
  Likert-vraag springt de focus nu niet mee, waardoor de volgende vraag eruitziet alsof er al
  iets is aangeklikt. Verwarrend, en mogelijk sturend.
- `src/components/LoadingScreen.tsx` ← optie A of B uit `C` §4 rij 47. De `setTimeout(onDone,
  6000)` verdwijnt.

**Brondocumenten:** `C` §4.7, §4.8, §4.9 · `A` §3.4, §3.5, §3.9 · `D` §1.2.

**Acceptatiecriteria.**
- **Na een antwoord staat de focus op de nieuwe vraag, niet op de oude positie.** Test met
  toetsenbord én met VoiceOver.
- Het laadscherm duurt zo lang als het rekenen werkelijk duurt, met een ondergrens van 1,2 s
  zodat het niet flikkert, en een bovengrens met voortgangsindicatie. Nooit een wachttijd die
  de gebruiker niet kan overslaan na 25 minuten werk.
- De determinismetest is nog groen.
- De rangschikkingsvragen blijven met ↑/↓ bedienbaar. Slepen mag erbij, niet in de plaats.
- De knop `Liever zonder naam` levert een volledig rapport zonder naamaanspreking op — fixture
  D in de gouden master dekt dit.
- Toetsenbordronde: landing → intake → 5 vragen → rapport, zonder muis.

**Terugrol-optie.** Per component. Geen van deze wijzigingen raakt de opslag of de engine.

**Afhankelijkheden.** Taak 3 groen. Onafhankelijk van beslispunt 1 op de inhoud; de vormgeving
volgt de tokens uit taak 4.

---

## Taak 10 — De rapportweergave · 5,0 dagen · risico: middel tot hoog

**Waarom hier.** Dit is de grootste taak, hij raakt de bevroren laag, en hij is de enige waarvan
het terugrollen ook een gegevensmigratie raakt. Hij komt daarom pas als alles eronder staat.

**Wat er gebeurt, op bestandsniveau.**
- `src/components/report/*` ← `C` §3 volledig: de zelfstandige samenvatting bovenaan met eigen
  anker (§3.1), de zes deelopeningen en de kaartnavigatie (§3.2), de afsluiters per
  hoofdstuktype (§3.3), de terugkeerondersteuning (§3.4) en het deelbare hoofdstuk (§3.5).
- `src/report/sections/*` en `src/report/texts/*` ← **de deelopeningen en afsluiters zijn
  gegenereerde tekst met slots en horen in laag 2, niet in de presentatie.**
- De knoppenherschikking uit `C` §4.10: drie knoppen bovenaan (`Bewaar als PDF`,
  `Inhoudsopgave`, `Deel één pagina`); `Terug naar de website`, `Opnieuw beginnen` en
  `Antwoorden wissen` naar de voettekst van het rapport. Het eerste wat iemand na 25 minuten
  ziet mag geen knop zijn die dat werk vernietigt.
- De wisbevestiging wordt een eigen dialoog met twee knoppen die de handeling benoemen, in
  plaats van `window.confirm` — waar de bevestiging van de destructieve actie *"OK"* heet.
- De betrouwbaarheidszin: *"Dit rapport staat stevig"* wordt *"Je antwoorden waren consistent.
  Dat betekent dat de scores hieronder stabiel zijn — niet dat ze waar zijn."* (`C` §6.5).
- `ifItDoesNotFit` verhuist naar het schaduwhoofdstuk zelf (`C` §6.7). Dit is de enige
  bevinding in alle zes documenten die over iemands avond gaat en niet over een conversiecijfer.
- De archetypenamen naar het Nederlands, als dat besluit genomen is — **vóór deze taak, niet
  erin** (zie §2, kleinere besluiten).

**De procedure voor elke tekstwijziging in de bevroren laag** (`D` §8.3, en dit is niet
optioneel):

1. Wijzig alleen tekst, in één commit, zonder enige codewijziging erbij.
2. `npm test` → **de harde helft moet groen blijven.** Blijft hij niet groen, dan heb je per
   ongeluk de berekening geraakt: terug.
3. De zachte helft faalt — dat hoort. `GOLDEN=update npm test`.
4. **`git diff tests/golden/` wordt regel voor regel gelezen door wie de tekst schreef.** Niet
   door wie de code schreef. Dit is de hele controle; sla hem niet over.
5. Commit de nieuwe gouden bestanden in dezelfde commit als de tekst.

**Brondocumenten:** `C` §3 volledig, §4.10, §4.11, §6.5, §6.7 · `D` §8.1, §8.3 · `B` §3.5.

**Acceptatiecriteria.**
- **De harde helft van de determinismetest is onveranderd. Geen enkele uitzondering.**
- De zachte helft is opnieuw goedgekeurd, met een `git diff` die regel voor regel is nagelopen
  door wie de teksten schreef.
- `tests/golden/variant-lengtes.json` is onveranderd, óf de wijziging is een bewust besluit met
  `REPORT_VERSION` op `3.0.0` en een FAQ-regel die het uitlegt.
- De je/u-omzetting is op alle nieuwe teksten getest. Dit is de plek waar het het vaakst misgaat,
  want niemand vult de test in u-vorm in.
- Paginahoogte van het rapport gelijk of lager, met werkende sprongen vanuit de inhoudsopgave.
- Contrastscript: 0 fouten, licht en donker.
- De samenvatting bovenaan verwijst nergens naar boven en is als losse pagina begrijpelijk.
- De deelpagina heeft een eigen URL (`#/rapport#h=…`), een eigen aanhef, een eigen disclaimer en
  een eigen exportknop.
- Een `arcana_result` van een oudere versie toont een uitlegscherm met een downloadknop, nooit
  stilzwijgend een leeg scherm.

**Terugrol-optie — de zwaarste van alle dertien.** Als de sectiestructuur verandert, kan een
`arcana_result` uit de oude versie niet meer renderen. **Daarom de versiecontrole uit taak 3.**
Verhoog `REPORT_VERSION` naar `3.0.0` en toon bij een oudere versie: *"Dit rapport komt uit een
vorige versie. Je kunt het downloaden als tekstbestand, of de test opnieuw doen."* Terugrollen
van de code alleen is niet genoeg als er al nieuwe rapporten in het veld staan.

**Afhankelijkheden.** Taak 4, 6, 7. Beslispunt 1 en 3. Het archetypenamenbesluit.

---

## Taak 11 — Disclaimers, SEO en JSON-LD · 1,5 dag · risico: geen

**Waarom hier.** De copy staat nu vast, dus de meta-teksten en de JSON-LD kunnen erop aansluiten
zonder dat ze twee keer aangeraakt worden.

**Wat er gebeurt, op bestandsniveau.**
- `index.html` ← `<title>` naar 57 tekens, `meta description` naar 156 (`E` §7.2). De huidige
  zijn 77 en 264 tekens; de laatste twee zinnen van de beschrijving worden nooit getoond.
- De JSON-LD krijgt `Organization` met `publisher`-verwijzingen vanuit `WebSite` en
  `WebApplication`, plus `inLanguage`, `audience`, `about` en `dateModified` (`E` §7.4). Dat
  maakt van drie losse entiteiten één samenhangende graaf.
- De `FAQPage` wordt aangevuld van 5 naar 9 vragen. **Regel: alleen vragen die letterlijk
  zichtbaar op de pagina staan.** Dat is een voorwaarde van Google en de huidige situatie
  voldoet eraan; zorg dat dat zo blijft.
- `.env.production` ← `VITE_SITE_URL`. Maatregel 1 uit `E` §3.5: het domein staat exact één keer
  in de codebase.
- `scripts/generate-seo-files.mjs` ← `robots.txt` en `sitemap.xml` worden gegenereerd, niet
  getypt. De JSON-LD idem, uit één object met `SITE` als enige domeinbron.
- `scripts/check-domains.mjs` ← uit `G-domeinfix/`, ingehaakt in `npm run build`.
- Alle punten uit de afvinklijst van `A` §7 nalopen en vastleggen in `docs/eindcontrole.md`.

**Brondocumenten:** `E` §3.5, §7.2, §7.4 · `A` §7 · `G-domeinfix/check-domains.mjs`.

**Acceptatiecriteria.**
- De negen vinkjes uit `A` §7, alle negen gehaald en gedocumenteerd in `docs/eindcontrole.md`.
- `npm run build` faalt met exit-code 1 zodra er één absolute URL naar een onbekende host in de
  uitvoer staat. **Test dat: voeg er expres een toe en draai opnieuw.**
- Rich Results Test en Schema Markup Validator: geen fouten.
- Het woord `speaktoart` komt nul keer voor in de hele repo.
- Alle drie de disclaimersecties staan er nog, op dezelfde plek in de leesvolgorde.

**Terugrol-optie.** Per onderdeel, elk een eigen commit. Niets hiervan raakt de engine.

**Afhankelijkheden.** Taak 8 en 10 (de copy moet vastliggen).

---

## Taak 12 — Het voorbeeldrapport als tweede URL · 2,5 dag · risico: laag

**Waarom hier.** `E` §7.1 noemt dit de derde prioriteit van de hele SEO en `E` §5.9 het enige
onderdeel dat drie problemen tegelijk oplost: het bewijsgat, de ontbrekende derde weg voor wie
geen 25 minuten heeft, en het grootste SEO-gat. `F` §4.1 noemt het de landingspagina voor het
kernsegment. Het kan pas als het rapport er staat (taak 10). Deze taak stond niet in `D` §6 —
`D` gaat over de front-end, niet over bereik.

**Wat er gebeurt, op bestandsniveau.**
- Een verzonnen antwoordenset door de engine, alle 33 hoofdstukken, op een eigen URL.
- Prerenderen, zodat er statische HTML staat die een crawler ziet zonder JavaScript — dezelfde
  techniek als de bestaande `#root`-fallback, die aantoonbaar werkt.
- `sitemap.xml` krijgt een tweede `<url>`.
- Interne links: hero, het narekenbaarheidsblok en de slot-CTA moeten er alle drie naartoe
  linken. Er is vandaag precies één soort interne link (de CTA naar de app).

**Brondocumenten:** `E` §5.9, §7.3, §7.5, §7.6 · `F` §6 stap 1.

**Acceptatiecriteria.**
- De pagina is indexeerbaar zonder JavaScript: `curl` levert de volledige tekst.
- De sitemap noemt twee URL's; Search Console meldt beide als ontdekt.
- Contrastscript: 0 fouten, licht en donker.
- **Op de pagina staat expliciet dat dit een voorbeeld is, niet iemands echte rapport.** Op een
  site die op eerlijkheid verkoopt is dat geen detail.
- Aantal indexeerbare URL's: van 1 naar 2.

**Terugrol-optie.** De route en de sitemap-regel verwijderen. Er verandert niets aan de app.

**Afhankelijkheden.** Taak 10 en 11.

---

## Taak 13 — Opruimen en hermeten · 1,0 dag · risico: laag

**Waarom hier.** Het canvas-bestand, de functievlaggen en de dode CSS mogen pas weg als alles
eronder aantoonbaar werkt.

**Wat er gebeurt.** `scoreWheel.canvas.ts` weg. Functievlaggen weg. Ongebruikte tokens weg.
Dode CSS weg, gemeten met een dekkingsrapport uit DevTools. `console.log` weg.
`tools/engine-uit-bundel.cjs` weg.

**Acceptatiecriteria.** **Alle metrieken uit `A` §1 opnieuw gemeten en vastgelegd naast de
nulmeting uit taak 1**, in dezelfde `docs/nulmeting.json`, als tweede kolom:

| Metriek | Nulsituatie | Doel | Gemeten na |
|---|---|---|---|
| JS over de lijn (landing) | 139,5 KB | ≤ 95 KB | |
| CSS over de lijn | 9,2 KB | ≤ 14 KB | |
| Fonts | 94,0 KB | ≤ 60 KB | |
| Totaal eerste render | ~243 KB | ≤ 170 KB | |
| TTFB | 1.202 ms | < 600 ms | |
| DOM interactive | 1.225 ms | < 900 ms | |
| Paginahoogte landing | 7.083 px | ≤ 6.000 px | |
| WCAG-AA contrast, 18 metingen | 0 fouten op 693 knopen | 0 fouten | |
| `prefers-color-scheme`-regels | 0 | > 0 | |
| `prefers-reduced-motion`-regels | 5 | ≥ 5 | |
| Skip-link | ontbreekt | aanwezig | |
| Wachttijd na laatste vraag | > 10 s | < 2 s of eerlijk gevuld | |

**Eerlijk over de TTFB.** Die 1.202 ms is geen front-endprobleem en geen van de dertien taken
lost hem op. Hij zit in de hosting. Zie §8 en §9.

**Terugrol-optie.** Niet van toepassing: er wordt alleen verwijderd wat aantoonbaar ongebruikt is.

---

# 6 — De regressiepoort

**Dezelfde poort voor élke taak.** Een taak heet pas "klaar" als alle vijf de blokken groen
zijn. Niet erna, niet "op de valreep": vóór het samenvoegen.

```bash
# ── 1. DETERMINISME ────────────────────────────────────────────────────────────
npm test
#    harde helft (scores, archetypen, spanningsvelden, variantindices):  GROEN, altijd
#    zachte helft (markdown byte voor byte):  groen, OF opnieuw goedgekeurd
#    met een `git diff tests/golden/` die regel voor regel gelezen is door wie
#    de tekst schreef — niet door wie de code schreef
#    variant-lengtes.json:  onveranderd, OF een bewust besluit met REPORT_VERSION-bump
#    aanspreekvorm.test.ts:  geen enkele "je/jij/jou/jouw/jezelf" blijft over in de u-vorm

# ── 2. CONTRAST — 18 metingen, licht én donker ─────────────────────────────────
npx playwright test tests/a11y/contrast.spec.ts
#    3 schermen (landing, vragen, rapport) × 2 thema's × 3 breedtes (1440, 390, 320)
#    Elke meting draait het script uit A-baseline.md §5.
#    Slaagt als:  18 × 0 fouten.  Achttien keer nul is de enige aanvaardbare uitkomst.
npx playwright test tests/a11y/axe.spec.ts     # 0 critical, 0 serious
npx playwright test tests/a11y/toetsenbord.spec.ts
#    landing → intake → 5 vragen → rapport, zonder muis
#    skip-link bij de eerste Tab, zichtbaar en werkend
#    na een antwoord staat de focus op de NIEUWE vraag
#    koppenhiërarchie zonder sprongen, precies één h1
#    prefers-reduced-motion:  ≥ 5 regels, wiel toont direct de eindstand

# ── 3. SEO ─────────────────────────────────────────────────────────────────────
node scripts/check-domains.mjs                 # exit 0 — geen enkele vreemde host
grep -ri speaktoart . --exclude-dir=node_modules | wc -l    # → 0
node scripts/controleer-jsonld.mjs             # parseert, 3 types, alle @id op eigen domein
#    Bij een release ook met de hand:
#    - Rich Results Test en Schema Markup Validator: geen fouten
#    - title ≤ 60 tekens, meta description ≤ 160 tekens
#    - noscript en de statische #root-fallback aanwezig en inhoudelijk ongewijzigd

# ── 4. PRIVACY — geen netwerkverzoeken ─────────────────────────────────────────
npx playwright test tests/e2e/geen-netwerk.spec.ts
#    (a) nul verzoeken naar een ander domein tijdens de volledige doorloop
#    (b) de hele doorloop werkt met de stekker eruit na de eerste render
#    (c) exact zeven localStorage-sleutels, document.cookie leeg,
#        sessionStorage leeg, nul IndexedDB-databases
#    Test (b) is de sterkste: hij bewijst dat "er is geen server waar ze naartoe
#    gaan" letterlijk waar is.

# ── 5. BEGROTING ───────────────────────────────────────────────────────────────
npm run build && node scripts/meet-bundel.mjs
#    landing-totaal   ≤  75.000 B brotli   (≤ 80.000 B vanaf taak 8)
#    fonts-totaal     ≤  60.000 B
#    css-totaal       ≤  14.000 B
#    Een begroting die niet automatisch faalt, is geen begroting.
```

**De checklist, om af te vinken per taak:**

- [ ] `npm test` groen — harde helft onveranderd
- [ ] Zachte helft groen, of de gouden diff is gelezen en goedgekeurd door de tekstschrijver
- [ ] `variant-lengtes.json` onveranderd, of het besluit is genomen en vastgelegd
- [ ] Contrastscript: **18 × 0 fouten** (3 schermen × 2 thema's × 3 breedtes)
- [ ] axe: 0 `critical`, 0 `serious`
- [ ] Toetsenbordronde volledig, skip-link werkend, focus op de nieuwe vraag
- [ ] `prefers-reduced-motion` ≥ 5 regels en het wiel toont direct de eindstand
- [ ] `check-domains.mjs` exit 0 en `grep -ri speaktoart` geeft 0
- [ ] JSON-LD parseert; alle `@id`/`url` op `arcanaprofile.com`
- [ ] Nul netwerkverzoeken naar een ander domein
- [ ] De offline-doorloop slaagt
- [ ] Exact zeven localStorage-sleutels, geen cookies, geen sessionStorage, geen IndexedDB
- [ ] Bundelbegroting gehaald
- [ ] Alle drie de disclaimersecties staan er nog, op dezelfde plek in de leesvolgorde
- [ ] `noscript` en de statische `#root`-fallback aanwezig en inhoudelijk ongewijzigd
- [ ] De changelog uit §7 is ingevuld

**Twee uitzonderingen, en alleen deze twee.**

1. **Taak 2 (de domeinfix) heeft geen repo en geen testopstelling.** Daar geldt blok 3 en 4 met
   de hand, plus de verificatielijst in `G-domeinfix/TOEPASSEN.md` §2 en §4.
2. **Taak 10 mag de zachte helft opnieuw goedkeuren** — dat is de hele opzet van de
   twee-helften-test. De harde helft nooit.

**Visuele regressie** (`D` §7.6) hoort erbij vanaf taak 7: twaalf opnamen, altijd op fixture A
met `generatedAt` op epoch 0, `animations: 'disabled'`, drempel `maxDiffPixelRatio: 0.002`.
**Uitzondering: bij taak 6 is een pixelvergelijking het verkeerde gereedschap** — de nieuwe
versie hóórt te verschillen omdat de kleuren veranderen. Daar beslist een mens, niet een drempel.

---

# 7 — Changelog-sjabloon

Eén bestand, `CHANGELOG.md`, één blok per taak. De opdrachtgever leest dit; schrijf het in het
Nederlands en zonder jargon.

```markdown
## Taak {nr} — {titel}

**Uitgeleverd:** {datum} · **Branch:** `rebuild/taak-{nr}-{korte-naam}` ·
**Preview:** {vercel-preview-url} · **Bouwer:** {naam}

### Wat er is veranderd
- {één regel per wijziging, in de taal van de gebruiker — niet "refactor van ScoreWheel.tsx"
  maar "het scorewiel is nu vectorbeeld: het blijft scherp bij printen en op elke zoom"}

### Wat er bewust niet is veranderd
- {elke keuze om iets te laten staan, met de reden. Dit blok voorkomt de vraag
  "was dit vergeten?" en is bij dit project belangrijker dan bij de meeste.}

### Wat de bezoeker merkt
- {nul tot drie regels. Staat hier "niets", dan is dat een goed antwoord —
  taak 3 en 5 horen onzichtbaar te zijn.}

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| {alleen de metrieken die deze taak raakt} | | | |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — harde helft | groen / n.v.t. |
| Determinisme — zachte helft | groen / opnieuw goedgekeurd door {naam} op {datum} |
| Contrast, 18 metingen | {n} × 0 fouten |
| Toetsenbord en axe | 0 critical, 0 serious |
| SEO en domeincontrole | exit 0 |
| Privacy — geen netwerk, 7 sleutels | geslaagd |
| Bundelbegroting | landing {x} B / limiet {y} B |

### Besluiten die in deze taak zijn genomen
- {elk besluit dat een gouden hash, een begroting of een merkzin raakt, met wie tekende}

### Terugrollen
{de precieze handeling, in één of twee regels. Plus: raakt terugrollen gegevens van bestaande
gebruikers? Bij taak 10 is dat ja.}

### Wat dit openlaat
- {wat er doorschuift naar een volgende taak of naar §9 van de rebuild-spec}
```

**Eén regel die er bij elke taak bij hoort en die makkelijk wordt overgeslagen:** als de
bundelbegroting in `scripts/meet-bundel.mjs` is verhoogd, staat dat **hier**, met het bedrag en
de reden. Een begroting die stilzwijgend meegroeit is geen begroting.

---

# 8 — Deploy en preview

**De regel waar alles onder valt: nooit rechtstreeks naar productie.** De site staat live en
heeft bezoekers. Elke taak gaat via een preview die iemand heeft bekeken.

## 8.1 Branches

```
main                          ← productie. Alleen merges vanaf rebuild/main, nooit rechtstreeks.
rebuild/main                  ← de integratiebranch van de rebuild. Hier komen alle taken samen.
rebuild/taak-02-domeinfix     ← één branch per taak, genummerd zoals in §5.
rebuild/taak-03-gouden-master
rebuild/taak-04-tokens-fonts
…
fix/…                         ← losse correcties buiten de rebuild om.
meting/tellers                ← de drie tellers uit A §4 (§3, tegenspraak 6): een eigen branch,
                                een eigen besluit, en een eigen aanpassing van de privacytest.
                                Nooit binnen een rebuild-taak.
```

Eén taak is één samenvoegverzoek naar `rebuild/main`. Eén samenvoegverzoek is één regel in de
changelog. De acceptatiecriteria uit §5 en de poort uit §6 worden gehaald vóór het samenvoegen.

**Taak 2 is de uitzondering en gaat rechtstreeks naar productie**, omdat hij vandaag kan en
geen repo vereist. Hij gaat via de handmatige verificatie in `G-domeinfix/TOEPASSEN.md`, niet
via een preview.

## 8.2 Vercel-preview

**Wat er gebeurt.** Koppel de repo aan een Vercel-project met `main` als productiebranch. Vercel
bouwt dan automatisch een preview-deploy voor elke branch en elk samenvoegverzoek, op een eigen
URL. `rebuild/main` krijgt bovendien een vaste alias — bijvoorbeeld een preview-subdomein — zodat
de opdrachtgever altijd hetzelfde adres kan openen en de rebuild kan zien groeien zonder in
samenvoegverzoeken te hoeven kijken.

```
Build Command      npm run build
Output Directory   dist
Install Command    npm ci
Node               overeenkomstig package.json engines
Environment        VITE_SITE_URL = https://arcanaprofile.com   (Production)
                   VITE_SITE_URL = https://arcanaprofile.com   (Preview — zie waarschuwing)
```

**Waarschuwing bij `VITE_SITE_URL` op preview.** `check-domains.mjs` eist dat canonical, og:url,
og:image en de JSON-LD `@id`'s exact op `VITE_SITE_URL` staan. Zet je die op de preview-URL, dan
wijzen de previews naar zichzelf en is de check daar niet meer representatief. Zet je hem op
`arcanaprofile.com`, dan klopt de check maar staat er op elke preview een canonical naar
productie. **Kies het tweede en zet `X-Robots-Tag: noindex` op elke preview-deploy** — dat is
wat Vercel voor preview-deploys standaard doet, maar controleer het, want het is de enige reden
dat de tweede keuze veilig is.

**Preview-bescherming aan.** Vercel Deployment Protection op previews, zodat er geen tweede
indexeerbare kopie van de site ontstaat. Dat is precies het probleem waar deze site al één keer
aan ten onder is gegaan — met een ander domein in plaats van een preview-URL.

## 8.3 Wat er wel en niet naar productie mag

| Wel | Niet |
|---|---|
| Een taak die de volledige regressiepoort uit §6 heeft gehaald | Iets wat "even snel" is en waarvan de poort niet gedraaid is |
| Taak 2 (de domeinfix), rechtstreeks, met handmatige verificatie | Een halve taak, of twee taken in één samenvoegverzoek |
| Een correctie op een taak die al live staat, via `fix/…` met dezelfde poort | Analytics of tellers als bijvangst van een rebuild-taak — die gaan via `meting/tellers`, met een eigen besluit |
| Een verhoging van de bundelbegroting, als eigen commit met een changelogregel | Een verhoging van de bundelbegroting om een taak groen te krijgen |
| Een tekstwijziging met een gouden diff die gelezen is | Een tekstwijziging met `GOLDEN=update` zonder dat iemand de diff las |
| — | **Een wijziging die de harde helft van de determinismetest rood maakt, zonder handtekening** |

## 8.4 De deploy-checklist

Per uitlevering naar productie. Vul hem in; een afgevinkte lijst zonder ingevulde waarden is
geen controle.

**Vooraf**
- [ ] De volledige regressiepoort uit §6 is groen op de preview van deze branch
- [ ] De preview is door een mens geopend, in licht **en** in donker, op telefoon **en** op desktop
- [ ] De changelog-regel uit §7 is geschreven en de metingen erin zijn ingevuld
- [ ] `docs/nulmeting.json` is bijgewerkt met de nieuwe waarden
- [ ] Bij een wijziging die de bevroren laag raakt: de gouden diff is gelezen en getekend
- [ ] Bij een wijziging aan de rapportstructuur: `REPORT_VERSION` is verhoogd **en** het
      uitlegscherm voor oudere rapporten is getest met een echte oude `arcana_result`
- [ ] De terugrol-optie is opgeschreven en iemand heeft hem gelezen
- [ ] Een exportbestand van de huidige productie staat veilig (`index.html` en de assets), zodat
      terugrollen niet van een build afhangt

**Uitleveren**
- [ ] Merge naar `main`. Vercel bouwt en promoveert.
- [ ] Rooktest op productie, met de hand, binnen vijf minuten:
      landing laadt · "Start de test" werkt · vraag 1 verschijnt · een bestaand rapport uit
      localStorage rendert nog · de themaschakelaar werkt · `#/privacy` opent
- [ ] `curl -sS https://arcanaprofile.com/ | grep -c speaktoart` → 0
- [ ] `node scripts/check-domains.mjs` op de gepubliceerde uitvoer → exit 0
- [ ] Het contrastscript uit `A` §5 één keer met de hand in de console op productie, licht en
      donker → 0 fouten
- [ ] De netwerktab is leeg na het laden: nul verzoeken naar een ander domein

**Achteraf**
- [ ] Search Console: geen nieuwe dekkingsfouten na 48 uur
- [ ] Bij elke wijziging aan `index.html`: deelkaarten opnieuw laten ophalen
      (Facebook Sharing Debugger, LinkedIn Post Inspector) en één keer via WhatsApp controleren
- [ ] De changelog is gepubliceerd waar de opdrachtgever hem leest

**Terugrolcriteria — vooraf vastgelegd, niet tijdens het incident bedacht.** Rol terug bij:
- een bestaand rapport uit localStorage rendert niet meer;
- het contrastscript geeft op productie meer dan nul fouten;
- er gaat één verzoek naar een ander domein;
- de landingspagina komt boven de begroting;
- de test is niet meer af te maken zonder verbinding.

De eerste is de ernstigste: dat is iemands 25 minuten werk.

## 8.5 Waar productie draait

**Dit is niet vast te stellen uit de geleverde bestanden.** De zip heet
`arcana-profile-hostinger.zip` en de TTFB van 1.202 ms past bij gedeelde hosting zonder CDN,
maar dat is een aanwijzing, geen bewijs. **Controleer het in taak 1.**

Als productie op Hostinger blijft staan, gebruik Vercel dan alleen voor previews en lever naar
productie met een build-artefact en een FTP- of Git-deploy. Dat werkt, maar het lost de TTFB
niet op. Het verplaatsen van productie naar statische hosting met een CDN — Vercel of iets
anders — is **een aparte beslissing met een eigen risico** (DNS, certificaat, e-mail-records op
hetzelfde domein) en hij staat daarom in §9 en niet in de dertien taken. De winst is reëel:
1.202 ms naar onder de 600 ms is de grootste enkele verbetering in de hele meetlat die geen
regel code kost.

---

# 9 — Wat er ná de rebuild openstaat

Eerlijk, in drie categorieën.

## 9.1 Wat de rebuild niet oplost

**De TTFB van 1.202 ms.** Geen van de dertien taken raakt hem. Hij zit in de hosting. Het doel
uit `A` §1 is < 600 ms en dat is alleen te halen door te verhuizen naar statische hosting met
een CDN. Aparte beslissing, eigen risico, circa één dag werk plus een DNS-wachttijd. Zie §8.5.

**Het gebrek aan sociaal bewijs.** `E` §2.3 noemt dit de tweede ongemakkelijke waarheid:
Testcentrum Groei zet 431.563 afnames neer, Arcana heeft geen enkel cijfer. Een rebuild dicht
dat gat niet, en verzonnen cijfers zijn uitgesloten. Dit lost zich alleen op met tijd en
verkeer — of niet.

**De as deugdelijkheid.** Er is geen normgroep en geen validatiestudie, en dat staat op vier
plekken op de site. Segment 1 zoekt op *wetenschappelijk*; het aanbod is *narekenbaar*. Dat is
niet hetzelfde. Een validatietraject ziet eruit als een COTAN-beoordeling en kost jaren en geld;
bij €864 per jaar is dat geen realistisch plan. De landingspagina moet dat verschil binnen vijf
seconden eerlijk maken — dat is wat taak 8 kan doen en het is het maximale.

**De merknaam.** *Arcana* roept tarot op en de site is op zijn eigen naam niet vindbaar: een
zoekopdracht levert een Zweedse band, een manga, een spel en een tarotquiz. Na taak 2 hoort de
exacte combinatie met "persoonlijkheidstest" binnen enkele weken te werken, maar op *arcana*
alleen wint deze site nooit. Dat is een structureel gevolg van de naamkeuze en het is een
positioneringsprobleem, geen bouwprobleem.

**De vraag of er publiek is.** Het hele verdienmodel hangt aan een bezoekersaantal dat niemand
kent. `F` rekent, het voorspelt niet.

## 9.2 Wat bewust geparkeerd is

| Onderwerp | Waarom geparkeerd | Wanneer opnieuw bekijken |
|---|---|---|
| **De drie tellers** (`A` §4 route 1) | Maakt de privacytest rood en hoort een eigen besluit te zijn, geen bijvangst (§3, tegenspraak 6) | Direct na taak 2 mag, als aparte uitlevering op `meting/tellers`. Vóór maand 2, want `F` heeft de cijfers nodig. |
| **Het verdienmodel** (`F`) | De bindende beperking is verkeer, niet prijs. Bij 500 bezoekers per maand levert het model −€6,82 op. | Na drie maanden verkeersmeting. Dan circa 5 dagen: PDF-generator, Mollie-betaallink, ondertekende licentiesleutel, FAQ, juridisch minimum. |
| **React vervangen door Preact** | De React-chunk is 55.126 B brotli, 85 % van de landingsbundel, en de app gebruikt alleen `useState`, `useEffect` en `useRef`. Preact/compat zou daar volgens dat project ongeveer 10 KB van maken — **maar dat getal is niet gemeten**, want de bouwomgeving had geen netwerktoegang. | Ná taak 13, met een eigen meting. Zet het niet op het kritieke pad van een rebuild die al dertien taken telt. |
| **Een variabele Inter** in plaats van twee statische gewichten | Idem: niet gemeten, om dezelfde reden | Bij taak 4, als er netwerktoegang is. Anders erna. |
| **Het gedrukte keepsake-rapport** (`F` §2.3) | Marge klopt (**€14,91** per exemplaar: €39 incl. btw − 21 % btw − €17 inkoop en verzending − €0,32 transactiekosten), volume niet (circa €14 per maand). En het is de enige route waarbij de inhoud het apparaat echt verlaat. | Bij meer dan 3.000 bezoekers per maand én een bewezen digitale conversie van ≥ 3 %. |
| **De vier extra SEO-pagina's** (`E` §7.6) — `/hoe-het-gemeten-wordt`, `/wat-dit-niet-is`, `/dimensies`, `/dit-is-geen-mbti` | Vier goede pagina's verslaan twintig middelmatige, maar ze kosten samen 8 tot 13 dagen | Na taak 12, als het voorbeeldrapport aantoonbaar verkeer trekt. In die volgorde: `/wat-dit-niet-is` eerst. |
| **De archetypepagina's** | Niet geparkeerd — **afgewezen**. Ondermijnt de positionering: een site die zegt "dit zijn geen hokjes" en dan dertig hokjespagina's bouwt, gelooft zichzelf niet. | Nooit. |

## 9.3 Wat een volgende ronde is

**De guerrilla-usabilitytest, ronde 2.** `A` §6 beveelt twee rondes van vijf aan, vóór en na.
Ronde 1 hoort vóór taak 8 te vallen en stuurt beslispunt 1 en 2. Ronde 2 hoort na taak 13 en
meet of het gewerkt heeft. Eén middag per ronde.

**De funnelmeting omzetten in besluiten.** Zodra de tellers draaien: vervang de aannames op het
tabblad Aannames in `F-pricing-segmenten.xlsx` door metingen. Het model rekent zichzelf om. De
beslisregel staat al vast (`F` §6 stap 4): blijft de netto-opbrengst na drie maanden onder €50
per maand, dan is het model niet het probleem maar het verkeer — en dan verhoog je níet de prijs
en versmal je níet de gratis laag.

**De herhaalmeting over een jaar.** `C` §6.2 en `F` §2.1 noemen allebei het datumstempel als
voorwaarde: iemand die de test over een jaar opnieuw doet moet iets hebben om tegen af te
zetten. De infrastructuur daarvoor (`generatedAt`, `meta.version`) bestaat al; wat ontbreekt is
de weergave ervan en één zin die uitlegt wat een verschil betekent. Dat is een halve dag, maar
het is pas zinvol als er mensen zijn die terugkomen.

**En één ding dat nu al vaststaat en later verleidelijk wordt.** `F` §6 noteert vijf modellen
die nooit gebeuren: geen betaalmuur op bestaande hoofdstukken, geen cloud-opslag, geen B2B- of
HR-licentie, geen affiliate, geen advertenties. Ze staan daar opgeschreven zodat ze over een
jaar niet opnieuw ter discussie staan als het tegenvalt — want dan zullen ze allemaal
aantrekkelijk lijken. Segment 2 zál om een coachvariant vragen, het is commercieel de
aantrekkelijkste route van allemaal, en bij €864 per jaar klinkt die vraag over een jaar zeer
redelijk. Het antwoord staat op drie plekken vast: in `F` §2.6, in de FAQ, en op de site zelf in
de sectie *Eerlijk gezegd*. Dat is de bedoeling. Het moet moeite kosten om het terug te draaien.

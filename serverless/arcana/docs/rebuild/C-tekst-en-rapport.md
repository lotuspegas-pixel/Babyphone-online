# C — Tekst en rapport

**Werkstroom C van de rebuild van Arcana Profile.**
Gebaseerd op `app.beautified.js` (20.744 regels, alle copy gelezen), `SITE-INVENTARIS.md` en
`A-baseline.md`. Alles wat hier staat is Nederlands en bedoeld om letterlijk over te nemen.

> **Hoe je dit document gebruikt.** §1 is diagnose en mag je overslaan als je haast hebt.
> §2 tot en met §5 zijn leverbare tekst: kopiëren, plakken, klaar. §6 is de controle die je
> moet doen vóórdat er iets live gaat. §7 is de richtlijn waar alle latere tekst aan moet
> voldoen — ook de tekst die iemand anders over een jaar schrijft.

**Vier vaste uitgangspunten, die in het hele document gelden:**

1. De disclaimer blijft intact, op dezelfde drie plekken (landingssectie *Eerlijk gezegd*,
   rapportkaart *Hoe dit gemeten is*, voettekst) en in dezelfde leesvolgorde. Er wordt niets
   aan afgezwakt en niets naar onderen verplaatst.
2. Er komt nergens een belofte bij. Waar dit document een zin sterker maakt, wordt hij
   concreter, niet groter.
3. De bestaande tekst is opvallend goed. Ongeveer driekwart blijft ongewijzigd. Dat is geen
   beleefdheid maar de belangrijkste bevinding: het probleem van deze site is niet de
   schrijfkwaliteit maar de *volgorde* waarin de kwaliteit zichtbaar wordt.
4. Elke herschrijving hieronder heeft een reden die niet "klinkt beter" is.

---

# §1 — De eerste-keer-ervaring, eerlijk beschreven

Hieronder loop ik de flow door met de ogen van iemand die deze site nooit eerder zag. Ik noem
haar Marieke, 41, die op een dinsdagavond een link doorgestuurd kreeg met "moet je eens doen".
Per moment staat er: **wat ze denkt**, **wat de site op dat moment doet**, **wat er mist**, en
**wat er moet gebeuren**.

Dit is geen usabilitytest — die moet nog gedaan worden, en §6 van `A-baseline.md` beschrijft
precies hoe. Dit is een expertdoorloop, met alle beperkingen die daarbij horen: ik weet te veel
van het product om echt te kunnen doen alsof ik het niet ken. Behandel de uitspraken hieronder
als hypotheses met een hoge plausibiliteit, niet als bevindingen.

## Moment 1 — De eerste vijf seconden boven de vouw

**Wat er nu staat, letterlijk, van boven naar beneden:**

```
ZELFINZICHT ZONDER HOKJES
Arcana
Profile
Beantwoord 120 vragen en lees terug wat je patronen zijn: waar je kracht zit, waar
je jezelf in de weg staat, en wat dat betekent voor je werk, je relaties en de keuze
waar je nu voor staat.
[ Start de test ]
120 vragen · 20–25 minuten · gratis
· Je antwoorden blijven op je eigen apparaat
· Geen account nodig
· Direct je volledige rapport
```

**Wat Marieke denkt.** In de eerste seconde leest ze het grootste element. Dat is `Arcana
Profile`, in Cormorant Garamond, over twee regels. Het is de naam van het bedrijf. Het zegt
haar niets. Het woord *Arcana* betekent voor een deel van de bezoekers "tarot", en dat is een
associatie die het product niet wil hebben — dit is een rekeninstrument, geen orakel. In de
tweede seconde leest ze de eyebrow erboven: *zelfinzicht zonder hokjes*. Nu weet ze de
categorie: persoonlijkheidstest. In seconde drie tot vijf begint ze aan de belofte, een zin van
53 woorden met drie bijzinnen, en haalt waarschijnlijk niet het einde.

Haar samenvatting na vijf seconden is daarmee: *"Een persoonlijkheidstest met een chique naam."*

Dat is precies de samenvatting die dit product niet wil. Want de vraag die daarop volgt is
onherroepelijk: **"is dit weer zo'n test?"** — en daarmee bedoelt ze: een test die haar iets
vertelt dat op iedereen past, in vleiende bewoordingen, met een plaatje erbij.

**Wat de site op dat moment doet.** Hij bouwt vertrouwen op precies één as: *privacy*. De drie
geruststellingen gaan over gegevens, account en snelheid. Dat zijn goede punten, maar ze
beantwoorden het bezwaar van een ándere bezoeker — de bezoeker die al gelooft dat de uitkomst
klopt en alleen nog bang is voor datalekken. De scepticus is een andere persoon, met een ander
bezwaar, en die krijgt in de eerste vijf seconden niets.

**Wat er mist.** Het woord *narekenbaar* — het hele onderscheidende vermogen van dit product —
staat pas op ongeveer 2.100 pixels scrollhoogte, in de vierde sectie, als h2 boven zes kaarten.
Iemand die na de hero wegklikt heeft de propositie nooit gezien. Bij een paginahoogte van 7.083
px betekent dat: de belangrijkste zin van de site staat op ongeveer 30% van de pagina, achter
een afbeelding en een statbalk.

Ook mist er iets kleiners maar niet onbelangrijks: nergens boven de vouw staat wat de bezoeker
overhoudt. "Je volledige rapport" is een vormbelofte, geen inhoudsbelofte. Wat je overhoudt is
een document van 33 hoofdstukken waarin per uitspraak het cijfer staat waar hij uit volgt. Dat
is veel concreter en veel geloofwaardiger dan "je volledige rapport".

**Wat er moet gebeuren.**
- De h1 wordt de propositie, niet de merknaam. De merknaam staat al in de koptekst van de
  browser, in de site-header en in de voettekst; hij hoeft niet ook nog het grootste element
  van de pagina te zijn.
- De belofte wordt opgesplitst in twee zinnen, waarvan de eerste op zichzelf staat.
- Eén van de drie geruststellingen wordt ingeruild voor de enige die de scepticus overtuigt:
  dat er geen taalmodel aan te pas komt en dat de uitkomst herhaalbaar is.
- Het volledige "waarom dit anders is"-blok (§2 van dit document) komt direct onder de hero,
  in de compacte variant, en niet pas na de afbeelding en de statbalk.

## Moment 2 — Vlak vóór "Start de test"

Er zijn twee momenten waarop Marieke voor deze knop staat: meteen (ze klikt zonder te lezen) of
onderaan (ze heeft doorgescrold en komt bij het slot-CTA). Beide zijn slecht bediend, om
verschillende redenen.

**Meteen.** De meta-regel onder de knop is `120 vragen · 20–25 minuten · gratis`. Dat is een
eerlijke regel en hij moet blijven staan. Maar hij laat de kosten als laatste indruk achter:
het laatste wat ze leest voordat ze klikt is *twintig tot vijfentwintig minuten*. Op een
dinsdagavond is dat het moment waarop de meeste mensen "morgen" denken en nooit meer terugkomen.

Wat er ontbreekt is de tegenprestatie op dezelfde regel, én de ontsnapping. De site kán
pauzeren — `arcana_current_question` wordt bij elke vraag weggeschreven, de landingspagina toont
bij terugkomst zelfs `Verdergaan — vraag 43 van 120` — maar nergens vóór de start staat dat je
mag stoppen. Dat is de goedkoopste drempelverlaging die deze site heeft liggen en hij wordt niet
gebruikt.

**Onderaan.** Het slot-CTA luidt:

> **Klaar om te lezen wat je al vermoedde?**
> Twintig minuten, 120 vragen, en een rapport dat je kunt bewaren. Je hebt er geen account voor
> nodig en je antwoorden blijven van jou.

Die kop is goed. Hij belooft niet te veel — *wat je al vermoedde* is bescheiden en
psychologisch juist: goede zelfinzichtteksten bevestigen vaker dan dat ze onthullen, en dit is
daar eerlijk over. De tekst eronder is zwakker: hij herhaalt de hero (geen account,
antwoorden van jou) in plaats van het argument te leveren dat de bezoeker na zeven secties nodig
heeft. Iemand die tot onderaan is gescrold heeft alle bezwaren al gelezen; die wil niet nog een
keer horen dat er geen account is. Die wil een reden om nu te beginnen.

**Wat er mist.** Een derde weg. Er zijn twee knoppen op deze site — starten of niet starten — en
geen derde optie voor de vijftig procent die geïnteresseerd is maar geen 25 minuten heeft. Een
voorbeeldrapport, of één echt hoofdstuk uit een fictief rapport, is de meest voor de hand
liggende invulling. `A-baseline.md` §3.3 stelt hetzelfde vast vanuit een andere hoek: het beste
van dit product zit achter de hoogste drempel.

## Moment 3 — Het naamformulier

Ze klikt. En komt op:

> **VOORDAT WE BEGINNEN**
> **Hoe mogen we je aanspreken?**
> Je rapport wordt op jouw naam geschreven. Deze gegevens blijven, net als je antwoorden,
> alleen in deze browser en worden nergens naartoe gestuurd.
>
> *Je naam of roepnaam* — [ Bijvoorbeeld: Sam ]
> *Een voornaam of bijnaam is genoeg. Verzin gerust iets als je liever anoniem blijft.*
>
> *Hoe spreken we je aan?* [Jij / je] [U]
> *Levensfase (optioneel)* [ Zeg ik liever niet ▾ ]
> *Dit verandert je scores niet. Het kleurt alleen hoe je groeipad wordt geformuleerd.*
>
> [Terug] [Begin met de 120 vragen]

**Wat Marieke denkt.** Ze heeft net drie keer gelezen dat ze geen account nodig heeft. Het
eerste scherm na de knop is een formulier met een verplicht veld. De cognitieve dissonantie
duurt ongeveer twee seconden en klinkt als: *"dus toch."* Daarna leest ze de uitleg, die goed is,
en gaat ze waarschijnlijk door. Maar de twijfel is gezaaid op de slechtst denkbare plek: precies
op het moment dat ze zich had gecommitteerd.

**Wat de site op dat moment doet.** De schrijver heeft dit probleem gezien — anders stond er geen
`Verzin gerust iets als je liever anoniem blijft` — maar heeft de oplossing in de kleinste
tekstgrootte op het scherm gezet, ónder het veld, waar hij pas gelezen wordt nadat de bezwaren
al gevormd zijn. En de submit-knop staat uit tot er iets in het veld staat (`disabled: !d`), dus
de site handhaaft ook echt wat de belofte ontkent.

**Wat er mist.**
1. De volgorde. De geruststelling hoort vóór de vraag, niet erna.
2. Een échte uitweg. "Verzin gerust iets" vraagt de bezoeker om creativiteit op een moment dat
   ze er geen zin in heeft. Een knop *Sla over — schrijf het rapport zonder naam* kost één regel
   code en haalt het bezwaar volledig weg. De rapportgenerator kan dit al aan: `et(t, metNaam,
   zonderNaam)` heeft voor elke aanspreekzin al een naamloze variant klaarstaan. De
   functionaliteit is er; alleen de knop ontbreekt.
3. Een reden. Nergens staat wát het oplevert dat je je naam geeft. "Je rapport wordt op jouw
   naam geschreven" beschrijft de handeling, niet de opbrengst. De opbrengst is dat de
   moeilijkste passages — de schaduwkant, de valkuilen — zachter aankomen als er een naam voor
   staat. Dat is een echte, uitlegbare reden en hij wordt niet gegeven.
4. De aanspreekvorm wordt gevraagd zonder dat duidelijk is wat er van afhangt. Bij de levensfase
   staat die uitleg er wél (`Dit verandert je scores niet`). Bij *je/u* niet.

**Wat er moet gebeuren.** Zie §4, rijen 27 t/m 30. Kern: geruststelling naar boven, overslaan
mogelijk maken, reden geven, en de eyebrow van `VOORDAT WE BEGINNEN` naar iets wat de lengte
van dit scherm aangeeft (`ÉÉN SCHERM, DAN BEGINNEN WE`).

## Moment 4 — Vraag 40, waar de energie wegzakt

**De feiten.** De vragen staan in vier blokken achter elkaar: L01–L72 (likert), FC01–FC24
(gedwongen keuze), S01–S16 (scenario), R01–R08 (rangschikking). Bij vraag 40 zit Marieke dus in
het eerste blok, op een derde van het totaal, en het scherm zegt haar twee dingen tegelijk:

> **Deel 1 van 4 — korte stellingen**
> `[███████░░░░░░░░░░░░░░░]`
> **Vraag 40 van 120**

Dat is de wiskundig eerlijke weergave en psychologisch de zwaarst denkbare. Ze is op een derde
en zit nog steeds in deel één van vier. Beide getallen vertellen haar dat ze langer bezig is dan
ze dacht. Het blokgewicht is bovendien scheef: deel 1 is 72 vragen, deel 4 is er 8. "Deel 1 van
4" suggereert dat er nog driemaal zoveel komt als er al was, terwijl er in werkelijkheid nog
maar 48 vragen resteren — 40% van wat er al ligt.

Daar komt de inhoud bij. Vraag 38 tot 42 zijn:

> L38 — *Ik verberg kwetsbaarheid soms achter humor, ratio of afstand.*
> L39 — *Ik heb weleens spijt dat ik niet eerder heb gezegd wat ik echt vond.*
> L40 — *Ik wil iets bouwen of doen dat echt betekenis heeft.*
> L41 — *Ritme en routine helpen mij om rust te houden.*
> L42 — *Te veel mogelijkheden tegelijk kunnen mij blokkeren.*

Dit zijn goede stellingen. Maar ze hebben alle 72 dezelfde vorm, dezelfde lengte, dezelfde
antwoordschaal van zeven bolletjes, en ze staan in een volgorde waarin geen enkele verandering
van register zit. Rond vraag 35 tot 45 is het formaat volledig uitontwikkeld: er valt niets
nieuws meer te leren over hóe je antwoordt, alleen nog wát. Dat is het moment waarop mensen
"hoeveel zijn er nog" denken.

**Wat de site op dat moment doet.** Hij schuift door. De auto-advance na 260 ms is een goede
keuze — hij houdt tempo en respecteert `prefers-reduced-motion` (dan 0 ms). De hint *Kies een
antwoord — de volgende vraag verschijnt vanzelf* staat er alleen bij vragen die je nog niet
beantwoord hebt, wat netjes is.

Maar de site zegt 120 keer hetzelfde en erkent nooit dat het lang duurt. Er is geen enkel moment
waarop hij toegeeft dat dit werk is.

**Wat er mist.** Drie dingen, in volgorde van belang:

1. **Erkenning halverwege.** Eén tussenscherm bij vraag 60 dat zegt dat ze halverwege is, dat ze
   kan stoppen en later verder kan, en — dit is het belangrijkste — dat het niet erger wordt.
   Niet als beloning, niet als aanmoediging, maar als eerlijk bericht over de resterende weg.
2. **Een eerlijke voortgangsmaat.** "Vraag 40 van 120" is het getal dat de bezoeker het slechtst
   helpt. "Nog 12 minuten" is het getal dat ze zoekt. De site weet hoe lang ze al bezig is
   (`arcana_started_at`), dus een geschatte resttijd is rekenbaar, en hij past bij een product
   waarvan de hele belofte narekenbaarheid is.
3. **Een pauzeknop die zijn gevolg noemt.** De knop heet nu `Pauzeren` en zegt niets over wat er
   daarna gebeurt. Dat is de knop die iemand indrukt op het moment dat ze twijfelt of ze het
   ooit afmaakt; dat is precies het moment om te zeggen dat haar antwoorden bewaard blijven.

**Wat er moet gebeuren.** Zie §4 rij 31–34 en §5, blok "Vragenflow". Kern: blokindeling
herformuleren naar een vorm die de scheefheid niet verbergt maar ook niet uitvergroot
(`Stellingen · 40 van 72` met een tweede regel `Vraag 40 van 120 in totaal`), een resttijd
tonen, en een tussenscherm bij 60 en bij 105.

## Moment 5 — De tien seconden wachten

**Wat er nu gebeurt.** Na `Afronden` verschijnt een draaiende ster en vier zinnen, elk 1,5
seconde in beeld, met een harde time-out op 6 seconden. Gemeten duurde het scherm meer dan tien
seconden. De vier zinnen:

> Je antwoorden worden gespiegeld…
> Patronen worden herkend…
> Spanningsvelden worden opgebouwd…
> Je rapport wordt samengesteld…

**Wat Marieke denkt.** De eerste drie seconden: goed, hij rekent. Seconde vier tot zeven: het
duurt lang. Seconde acht tot tien: is hij vastgelopen? Er is geen voortgangsbalk, geen
percentage, geen manier om over te slaan, en de animatie herhaalt zich. Na 25 minuten werk is
het laatste wat je wilt het gevoel dat je het kwijt bent.

**Wat de site op dat moment doet.** Theater. Het rapport is al berekend — `Nt()` draait
synchroon en is bijna instant — en staat in `localStorage` voordat de animatie klaar is. De
vertraging is bewust toegevoegd.

**En hier zit het echte probleem, dat niet over wachttijd gaat.** Drie van de vier zinnen staan
in de lijdende vorm zonder handelend voorwerp: *worden gespiegeld*, *worden herkend*, *worden
opgebouwd*. Dat is exact het register waarin een taalmodel doet alsof het nadenkt. Het is de
toon van elk AI-product dat zijn latentie verkoopt als diepgang. En dit product heeft als
onderscheidend vermogen letterlijk: **er zit geen taalmodel in**.

Het laadscherm ondergraaft dus niet de bruikbaarheid maar de propositie. Het is de enige plek op
de hele site waar de vorm het tegenovergestelde zegt van de inhoud.

**Wat er moet gebeuren.** Kies één van twee, niet allebei half:

- **Optie A — eerlijk kort.** Het rapport is klaar, dus toon het. Eén regel, maximaal 1,5
  seconde: `Klaar. Je rapport staat hieronder.` Dit is de keuze die bij de merkbelofte past en
  die ik aanraad.
- **Optie B — eerlijk gevuld.** Als je de overgang wilt houden (en daar is een goed argument
  voor: 7.559 woorden verdienen een drempel), vul hem dan met iets dat waar is en dat de
  bezoeker iets geeft. Een aftelling met echte stappen en echte getallen, actieve vorm, met de
  bezoeker als onderwerp. Uitgeschreven in §4 rij 35 en §5.

Wat er in geen van beide gevallen mag gebeuren: de lijdende vorm behouden.

## Moment 6 — Het moment waarop het rapport opent

**Wat ze als eerste ziet:**

> **JOUW ARCHETYPE**
> # The Seeker
> *{naam}, op basis van je 120 antwoorden komt The Seeker het sterkst naar voren (78/100), met
> The Alchemist als tweede stem (71/100).*
>
> [Download als PDF] [Rapport printen] [Rapport downloaden]
> [Terug naar de website] [Opnieuw beginnen] [Antwoorden wissen]

**Wat Marieke denkt.** Drie dingen tegelijk, in deze volgorde:

1. *The Seeker.* Engels. Op een site die verder geen woord Engels bevat, in een rapport dat in
   het Nederlands over haar binnenste gaat, is het eerste woord over haarzelf een Engelse term.
   Dat schept afstand op precies het moment dat je nabijheid wilt. Het roept bovendien de
   associatie op met alle typologieproducten waarvan deze site zich in de FAQ expliciet
   distantieert — en het wordt erger bij `The Wounded Healer`, dat als eerste woord over jezelf
   na 25 minuten introspectie behoorlijk hard aankomt.
2. *78/100.* Goed. Dit is de propositie die zich onmiddellijk waarmaakt: er staat een cijfer.
   Dit is het sterkste moment van de hele site en het is goed gedaan.
3. *Zes knoppen.* Direct onder haar naam en haar cijfer staan zes bedieningselementen, waarvan
   er twee (`Opnieuw beginnen`, `Antwoorden wissen`) haar werk kunnen vernietigen. Na 25 minuten
   invullen is het eerste wat het rapport haar aanbiedt een knoppenbalk met twee
   zelfvernietigingsknoppen.

**Wat er mist.**

- **Een samenvatting die op zichzelf staat.** De kaart *De kern* komt wel, maar pas als derde
  blok (na het scorewiel en de archetypekaart) en hij begint met `Dezelfde meting als in het
  portret hierboven, nu in woorden`. Hij verwijst dus naar boven en werkt niet los. Voor iemand
  die over drie maanden terugkomt is dat het verschil tussen "even kijken wat er ook alweer
  stond" en "weer helemaal doorscrollen".
- **Een leesinstructie.** 7.559 woorden en 21.716 pixels. De inhoudsopgave staat er, maar
  ingeklapt, en pas ná het scorewiel, de archetypekaart, de kernkaart, de methodekaart én het
  blok *Vanaf hier de verdieping*. Dat is zeven schermen scrollen voordat de bezoeker leert dat
  ze niet hoeft te scrollen.
- **Een gebruiksaanwijzing voor het moeilijke deel.** Zes van de 33 hoofdstukken gaan over
  valkuilen, schaduw en blinde vlekken. Het rapport zegt op verschillende plekken netjes dat dit
  geen oordeel is, maar die geruststelling staat in het hoofdstuk zelf, onderaan. Iemand die
  bij hoofdstuk 14 in tranen schiet heeft hem dan al gelezen.

**Wat er goed is en moet blijven.** De intro van `who-you-are` is bijna perfect:

> *{naam}, dit is de kern die uit je antwoorden naar voren komt — niet als etiket, maar als het
> patroon dat het vaakst terugkwam.*

En de zin uit hetzelfde hoofdstuk die de hele typologiekwestie in één keer afhandelt:

> *Dat zijn geen hokjes maar leeswijzers: een manier om vier getallen zo op te schrijven dat je
> jezelf erin herkent. Waar de naam en je eigen ervaring uiteenlopen, is je ervaring leidend.*

Die zin is beter dan alles wat de landingspagina over hetzelfde onderwerp zegt. Hij staat op de
verkeerde plek: in hoofdstuk 2 van het rapport, waar alleen mensen komen die al overtuigd waren.

## Moment 7 — Drie maanden later

Het moment dat nergens ontworpen is. Marieke heeft het rapport destijds gelezen, is bij
hoofdstuk 19 gestopt, en komt terug omdat ze van baan wil veranderen.

Ze opent de site. Als `arcana_result` er nog is, ziet ze `Bekijk je rapport` naast `Opnieuw
beginnen`. Ze klikt, en het rapport opent bovenaan, identiek, alsof ze het nooit had gezien. Er
staat nergens wanneer ze het maakte, waar ze was gebleven, of wat ze al had gelezen. De
inhoudsopgave is weer ingeklapt.

Dit is de grootste onbenutte kans in het hele product, en de enige die zonder nieuwe tekst niet
op te lossen is. §3.4 werkt hem uit.

## De zeven momenten samengevat

| # | Moment | Wat de bezoeker denkt | Wat er mist | Ernst |
|---|---|---|---|---|
| 1 | Eerste 5 seconden | "Een test met een chique naam" | De propositie staat 2.100 px lager | **Hoog** |
| 2 | Vlak vóór starten | "25 minuten, dus morgen" | Dat je mag stoppen; iets om eerst te zien | **Hoog** |
| 3 | Naamformulier | "Dus toch een account" | Geruststelling vóór de vraag; overslaan-knop | **Hoog** |
| 4 | Vraag ±40 | "Hoeveel zijn er nog?" | Resttijd, erkenning, blokindeling die klopt | Middel |
| 5 | Tien seconden wachten | "Is hij vastgelopen?" | Eerlijkheid; de lijdende vorm breekt de merkbelofte | **Hoog** |
| 6 | Rapport opent | "Wat is dit veel" | Zelfstandige samenvatting; leesinstructie | Middel |
| 7 | Drie maanden later | "Waar was ik gebleven?" | Alles | Middel |

---

# §2 — "Waarom dit anders is", vóór de drempel

Dit blok komt **direct onder de hero**, vóór de afbeelding en vóór de statbalk. Het moet werken
voor iemand die nog nooit van een persoonlijkheidsdimensie heeft gehoord, én voor iemand die er
tien heeft gedaan en ze alle tien onzin vond.

De opdracht: leg *narekenbaar* uit zonder het woord *deterministisch* te gebruiken. De oplossing
is niet om een synoniem te zoeken maar om het te laten zien. Narekenbaar betekent in gewone taal
twee dingen: **er staat een cijfer bij**, en **er verandert niets als je terugkomt**. Dat zijn
allebei dingen die de bezoeker zelf kan controleren, en dat is precies wat het woord belooft.

## Versie 1 — Eén zin

Voor de hero, als vervanging of aanvulling van de huidige belofte-alinea.

> **Een persoonlijkheidstest die laat zien waar elke zin vandaan komt: bij iedere uitspraak over
> jou staat het cijfer waar hij uit volgt.**

*Alternatieven, voor als er een andere lengte of een ander accent nodig is:*

| | Zin | Accent | Waar bruikbaar |
|---|---|---|---|
| A | Een persoonlijkheidstest die laat zien waar elke zin vandaan komt: bij iedere uitspraak over jou staat het cijfer waar hij uit volgt. | Narekenbaar | Hero, meta-description |
| B | Geen vleiende tekst die op iedereen past, maar 120 antwoorden die uitrekenen wat er over jou gezegd wordt. | Tegen de scepticus | Social share, advertentie |
| C | Een rapport over jezelf dat je kunt narekenen, dat je nergens hoeft achter te laten, en dat zelf zegt wat het niet weet. | De drie waarden samen | Slot-CTA, voettekst |

## Versie 2 — Eén alinea

Voor direct onder de hero-CTA, of als lead boven het driewaardenblok.

> De meeste persoonlijkheidstests geven je een type en een verhaal dat op verrassend veel mensen
> past. Hier gebeurt iets anders: je 120 antwoorden worden opgeteld tot scores, en elke zin in
> je rapport hangt aan zo'n score — die er ook bij staat. Er komt geen taalmodel aan te pas dat
> elke keer iets anders verzint; de test rekent, en dat rekenwerk ligt vast. Je antwoorden
> blijven ondertussen op je eigen apparaat staan, want er is geen server waar ze naartoe kunnen.
> En waar dit instrument zijn grenzen heeft, staat dat er gewoon bij.

## Versie 3 — Het blok van ~120 woorden

Dit is het blok dat op de pagina komt: een kop, een lead, en drie korte kolommen met een
tussenkop die een gewoon woord is, niet een merkterm.

> ### Drie dingen die je hier wél kunt controleren
>
> **Je kunt het narekenen.**
> Bij elke uitspraak over jou staat het cijfer waar hij uit volgt. Geen taalmodel dat iets
> verzint — de test rekent, en dat rekenwerk verandert niet. Doe hem over een jaar opnieuw met
> dezelfde antwoorden en je leest hetzelfde terug.
>
> **Het blijft van jou.**
> Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen
> browser. Wij kunnen ze niet inzien, niet herstellen en niet terugsturen.
>
> **Het zegt zelf wat het niet weet.**
> Geen diagnose, geen normgroep, geen validatiestudie, niet bruikbaar om iemand te beoordelen.
> Dat staat op deze pagina en het staat in je rapport, niet in de kleine lettertjes.

*(Tel: 118 woorden in de drie kolommen, 125 met de kop.)*

**Toelichting bij de woordkeuze, voor wie hem later wil aanpassen:**

- *"Drie dingen die je wél kunt controleren"* — het woordje *wél* doet het werk. Het erkent
  stilzwijgend dat er veel niet te controleren valt aan een persoonlijkheidstest, en dat is
  precies de erkenning die de scepticus nodig heeft voordat hij iets gelooft.
- *"Je kunt het narekenen"* — actief, met de bezoeker als onderwerp. Niet "het is narekenbaar",
  want dan is het weer een eigenschap van het product in plaats van iets dat zij kan doen.
- *"de test rekent"* — twee woorden die precies zeggen wat *deterministisch* betekent zonder het
  woord te gebruiken. Iedereen weet wat rekenen is: 3 + 4 is altijd 7, ook morgen.
- *"Wij kunnen ze niet inzien, niet herstellen en niet terugsturen"* — het nadeel wordt genoemd
  vóór het voordeel. Dat is de goedkoopste geloofwaardigheidswinst die er bestaat, en de
  privacypagina doet dit al; alleen de landingspagina nog niet.
- *"Dat staat op deze pagina en het staat in je rapport, niet in de kleine lettertjes"* — een
  controleerbare bewering. Ze kan hem meteen narekenen door door te scrollen, en dat is precies
  de bedoeling.

**Voor de scepticus, als je één extra regel kwijt kunt.** Onder het blok, in kleiner grijs:

> Wat dit niet oplost: dat je jezelf beoordeelt. Alle 120 antwoorden komen van jou, dus het
> rapport meet hoe je jezelf ziet — niet hoe je bent. Dat is minder dan het lijkt, en meer dan
> je denkt.

Die laatste regel is het sterkste middel tegen "is dit weer zo'n test?" dat op deze pagina kan
staan. Hij geeft het belangrijkste bezwaar weg voordat de bezoeker het zelf formuleert.

---

# §3 — Rapportarchitectuur voor hérlezen

Het rapport is nu een lineaire lezing van 7.559 woorden. Het moet een naslagwerk worden waar
iemand over drie maanden in terugkijkt en binnen twintig seconden vindt wat ze zocht.

Vijf dingen moeten daarvoor veranderen. Per onderdeel staat het **voor** (letterlijk uit de
bundel) en het **na** (uitgeschreven, met `{placeholders}` voor de gemeten waarden).

## 3.1 — Een samenvatting bovenaan die op zichzelf staat

### Voor

Er zijn nu drie dingen die samen de rol van samenvatting vervullen, en geen van drieën werkt los.

De masthead:

> **JOUW ARCHETYPE**
> # {archetypeNaam}
> *{naam}, op basis van je 120 antwoorden komt {archetypeNaam} het sterkst naar voren
> ({score}/100), met {secundairNaam} als tweede stem ({secundairScore}/100).*

De kernkaart (derde blok, na scorewiel en archetypekaart):

> **De kern**
> *Dezelfde meting als in het portret hierboven, nu in woorden. Vijf punten; alles daarna is
> verdieping.*

En het verdiepingsblok (zesde blok):

> **VANAF HIER DE VERDIEPING**
> ## Het volledige rapport
> *Het portret, de kern en de verantwoording hierboven zijn samen het korte antwoord. Wat nu
> volgt is de uitwerking: {n} hoofdstukken, gegroepeerd in 6 delen. Je hoeft ze niet op volgorde
> te lezen — gebruik de inhoudsopgave om te springen naar wat je zoekt.*

Die laatste alinea is goed geschreven en staat vier schermen te laag. En `Dezelfde meting als in
het portret hierboven` maakt de kernkaart structureel afhankelijk van wat erboven staat — precies
wat een samenvatting niet mag zijn.

### Na

Eén kaart, direct onder de masthead en vóór het scorewiel, met een eigen id (`#samenvatting`)
zodat er vanaf overal naartoe gelinkt kan worden. Hij mag nergens naar boven verwijzen en moet
begrijpelijk zijn voor iemand die niets anders leest.

> **JE RAPPORT IN HET KORT**
> ## Wat er uit je antwoorden kwam
>
> Deze pagina staat op zichzelf. Lees je verder niets, dan heb je hiermee het antwoord.
>
> **Je sterkste patroon is {archetypeNaam} ({archetypeScore}/100).**
> Dat komt vooral uit twee dimensies: je {dimensie1} scoort {score1} en je {dimensie2} scoort
> {score2}. Samen verklaren die twee waarom sommige situaties je moeiteloos afgaan en andere
> onevenredig veel van je vragen. Als tweede stem klinkt {secundairNaam} ({secundairScore}/100)
> mee. *{indien verschil ≤ 3: Die twee liggen zo dicht bij elkaar dat geen van beide leidend is —
> je wisselt waarschijnlijk per situatie.}*
>
> **Onder druk word je {stressArchetypeNaam}:** {stressBeschrijving}
>
> **Je grootste valkuil:** {schaduwBullet1}
>
> **Je eerste stap:** {groeipadBullet1}
>
> **Wat het meest aan je trekt:** {spanningsveldLabel} — {labelA} staat op {scoreA}, {labelB} op
> {scoreB}. Allebei hoog, dus geen van beide wint. Daarom blijft die keuze terugkomen.
>
> ---
> *Hoe stevig dit staat: je beantwoordde {beantwoord} van de 120 vragen. {kwaliteitszin}*
> *Alle zes de uitspraken hierboven komen uit een gemeten score. Waar ze en je eigen ervaring
> uiteenlopen, is je ervaring leidend.*
>
> [Lees het hele rapport ↓] [Bewaar als PDF] [Inhoudsopgave]

**Wat hier bewust anders is dan in de huidige kernkaart:**

- De eerste zin geeft toestemming om te stoppen. Dat is het tegenovergestelde van wat een
  marketingtekst doet, en precies wat een naslagwerk moet doen.
- Geen enkele verwijzing naar boven. De kaart is uit zijn context te lichten en zou als losse
  PDF-pagina nog steeds kloppen.
- Zes uitspraken, allemaal met een cijfer. De belofte van de landingspagina wordt op de eerste
  schermvulling van het rapport onmiddellijk waargemaakt.
- De betrouwbaarheidszin staat erbij, in dezelfde kaart, niet drie blokken lager. Wie dit blok
  leest en verder niets, heeft de belangrijkste voorbehouden gelezen.
- De drie knoppen onderaan zijn de drie dingen die iemand op dit moment wil, en geen van drieën
  vernietigt iets. De knoppen `Opnieuw beginnen` en `Antwoorden wissen` verhuizen naar de
  voettekst van het rapport.

**Bijbehorende kwaliteitszinnen** (vervanging van `bn`, zie ook §6 — de huidige hoge-variant is
een overclaim):

| Niveau | Nu | Voorstel |
|---|---|---|
| hoog | *Je antwoordde consistent. Dit rapport staat stevig.* | *Je antwoorden waren consistent. Dat betekent dat de scores hieronder stabiel zijn — niet dat ze waar zijn.* |
| midden | *Je antwoorden waren grotendeels consistent, met een paar twijfelgevallen. Lees de scores als richting, niet als precisie.* | Ongewijzigd — dit is de best geschreven van de drie. |
| laag | *Je antwoorden liepen op meerdere punten uiteen. Dit rapport geeft een indruk, geen scherpe meting — een tweede keer invullen op een rustiger moment geeft een betrouwbaarder beeld.* | Ongewijzigd. |

## 3.2 — Een rode draad tussen de hoofdstukken

### Voor

De bundel heeft hier al infrastructuur voor liggen, en die is beter dan wat de meeste
rapportgeneratoren hebben. Er zijn vijf soorten overgangszinnen, allemaal met meerdere varianten:

```
pt = [`zoals hierboven al genoemd bij wie je bent`,
      `die je hierboven al tegenkwam bij wie je bent`,
      `al even genoemd bij wie je bent`, …]

ht = [`dezelfde eigenschap die hierboven ook al als sterk punt langskwam, heeft hier een keerzijde`,
      `wat hierboven nog een sterk punt was, laat hier ook een andere kant zien`, …]

"at-ease.bridge":  `Dezelfde kern die je eerder al zag terugkomen — {labels} — laat zich hier van een andere kant zien.`
"stress.already-named": `Diezelfde kern kwam al naar voren in het stuk over wie je bent.`
"who-you-can-become.growth-bridge": `Hoeveel ruimte je jezelf daarvoor geeft, bepaalt vooral het tempo, niet de bestemming — daarover meer bij je groeipad.`
"relationship.conflict-bridge-high": `… Hoe dat doorwerkt in wat je wel en niet hardop zegt, lees je bij je communicatiestijl.`
```

Dat is uitstekend gedaan en moet blijven. Maar er zit een patroon in dat de leesbaarheid
beperkt: **vier van de vijf soorten kijken achteruit.** `zoals hierboven al genoemd`, `die je
hierboven al tegenkwam`, `kwam al naar voren`, `stond hierboven al genoemd`. Alleen de twee
`bridge`-varianten wijzen vooruit.

Achteruit verwijzen heeft twee problemen. Het werkt alleen voor wie lineair leest — en het
rapport zegt zelf dat dat niet hoeft. En het leest bij herhaling als excuses maken voor
herhaling, in plaats van als structuur.

### Na

Een rode draad die werkt voor iemand die springt, bestaat uit drie lagen. Alle drie zijn
uitvoerbaar met wat er al in de engine zit.

**Laag 1 — Een deelopening per hoofdstukgroep.** De zes delen hebben nu alleen een `h2` met de
titel (`Wie je bent`, `Jij en anderen`, …). Geef elk deel één zin die zegt waarom het hier staat
en wat het toevoegt aan het vorige. Dat is de goedkoopste rode draad die er is: zes zinnen voor
33 hoofdstukken.

> **Deel 1 · Wie je bent**
> *Vijf hoofdstukken over het patroon zelf: wat er het vaakst terugkwam in je antwoorden, wat
> daarvan zichtbaar is, en wat eronder ligt. Alles wat daarna komt bouwt hierop voort.*
>
> **Deel 2 · Jij en anderen**
> *Hetzelfde patroon, nu in gezelschap. Dezelfde scores als in deel 1, maar gemeten op wat ze
> met anderen doen — op werk, in vertrouwde kring, in een relatie.*
>
> **Deel 3 · Onder druk en in je kracht**
> *Waar het patroon doorslaat. Dit zijn de zwaarste hoofdstukken van je rapport. Ze zijn
> geschreven om te lezen, niet om aan te komen — en als er iets niet klopt, weegt jouw ervaring
> zwaarder dan het cijfer.*
>
> **Deel 4 · Groeien**
> *Niet iemand anders worden, maar hetzelfde patroon met minder dwang. Wat je in deel 3 las als
> valkuil, staat hier als aanknopingspunt.*
>
> **Deel 5 · Acht beschouwingen**
> *Acht korte essays over liefde, haat, pijn, intuïtie, verdriet, tegenslag, geluk en
> blijdschap. Anders dan de rest van dit rapport: de openingen zijn algemeen, alleen de
> middenstukken zijn op jouw scores gekozen. Dat staat er per stuk bij.*
>
> **Deel 6 · Je actieplan**
> *Vier weken, één stap per week, afgeleid uit het patroon dat bij jou het zwaarst weegt. En
> één zin om te onthouden.*

De opening van deel 5 is hier het belangrijkst: hij lost in één zin het eerlijkheidsprobleem op
dat §6 signaleert (de beschouwingen zijn niet score-gedreven en de landingspagina belooft dat
wel).

**Laag 2 — Een vooruitverwijzing per hoofdstuk, waar hij bestaat.** Voeg naast `pt` en `ht` twee
nieuwe zinsbanken toe, in dezelfde stijl en met evenveel varianten (de engine kiest al met
`T(bank, seed, sleutel)`, dus dit past naadloos in de bestaande structuur):

```
vooruit = [
  `Wat dit betekent zodra er druk op komt, lees je bij {hoofdstuk}.`,
  `Hoe dit uitpakt onder spanning, staat bij {hoofdstuk}.`,
  `Dit patroon komt terug bij {hoofdstuk}, daar van een andere kant.`,
  `Bij {hoofdstuk} zie je dezelfde eigenschap in een ander licht.`,
  `Waar dit toe leidt als het te ver doorslaat, staat bij {hoofdstuk}.`,
]

terugMetCijfer = [
  `{label} ({score}/100) kwam hierboven al langs bij {hoofdstuk} — hier telt hetzelfde cijfer anders mee.`,
  `Dit is dezelfde score als bij {hoofdstuk}: {label} staat op {score}. Wat verandert is waar hij op uitkomt.`,
  `{label} staat op {score}, net als bij {hoofdstuk}. Alleen kijk je er hier vanaf de andere kant naar.`,
]
```

Het verschil met de huidige `pt` zit in het cijfer. `zoals hierboven al genoemd` is een
verontschuldiging; `dit is dezelfde score als bij je sterke punten: Autonomie staat op 74` is
een verband. Het tweede leest als architectuur, het eerste als herhaling. En het is ook nog eens
narekenbaar, wat de hele belofte van het product is.

**Laag 3 — Een navigatieregel onderaan elk hoofdstuk, met inhoud.** Nu staat er:

> `← Wie je bent` `14 / 33` `Je valkuilen →`

Dat is functioneel maar leeg. Het zegt alleen dat er iets naast staat. Maak er een reden van om
door te klikken:

> **Waar dit naartoe leidt** → *Je valkuilen* — dezelfde vijf eigenschappen, nu vanaf de kant
> waar ze tegen je gaan werken.
> **Waar dit vandaan komt** ← *Wie je bent* — de drie scores waar dit hoofdstuk op rust.

Dat is één regel extra per hoofdstuk en het verandert de navigatie van een bladerwijzer in een
kaart.

## 3.3 — Een "wat je hiermee kunt"-afsluiter per hoofdstuktype

De bundel kent al vijf kaartsoorten (`kn` / `An`): `insight`, `shadow`, `reflection`, `growth`,
`profile`, plus `summary` voor de slotzin. Elke soort verdient een eigen afsluiter, want de
vraag "wat doe ik hiermee" heeft per soort een ander antwoord. Hieronder staan de patronen
volledig uitgeschreven, met slots, zodat ze rechtstreeks in de generator kunnen.

De regel die voor alle zes geldt: **de afsluiter vraagt of geeft, maar draagt niet op.** Geen
imperatieven zonder ontsnapping, geen huiswerk, geen "jij moet". Dit zijn mensen die over
zichzelf lezen; een opdracht die ze niet uitvoeren wordt een extra bewijs dat ze tekortschieten.

### Type `insight` — 13 hoofdstukken

Wat de lezer hier nodig heeft is **toetsing aan de werkelijkheid**. Deze hoofdstukken doen
beweringen over gedrag, en de bruikbaarste volgende stap is nagaan of die bewering klopt.

```
**Wat je hiermee kunt**
Dit hoofdstuk rust op {label1} ({score1}) en {label2} ({score2}). Leg het naast één
concrete situatie van de afgelopen maand: klopte het daar, of was het daar juist de
uitzondering? Beide antwoorden zijn bruikbaar — de uitzondering vertelt je waar de
grens van dit patroon ligt.
```

Variant voor de hoofdstukken over anderen (`with-others`, `close-circle`, `relationship`,
`work-style`, `communication`):

```
**Wat je hiermee kunt**
Dit gaat over wat anderen van je merken. Dat is het enige stuk van je rapport dat je
kunt controleren zonder te gissen: vraag het aan iemand die je goed kent, en vraag door
tot het ongemakkelijk wordt.
```

### Type `shadow` — 5 hoofdstukken

Hier is de afsluiter niet optioneel maar noodzakelijk. Dit zijn de hoofdstukken die aankomen, en
dit is de plek waar de lezer een uitweg krijgt aangeboden die geen ontkenning is. **Dit is de
belangrijkste tekst in dit hele document.**

```
**Wat je hiermee kunt**
Eén van deze vijf herken je waarschijnlijk meteen, en de andere vier niet. Neem die ene.
De rest kan wachten, of kan niet kloppen — dat mag ook.

**Als dit niet klopt**
{ifItDoesNotFit}

Een lage score op een valkuil betekent niet dat hij er niet is, en een hoge score betekent
niet dat je hem elke dag hebt. Dit zijn de plekken waar jouw patroon het snelst doorslaat,
niet de plekken waar je faalt.
```

Drie dingen zijn hier bewust gedaan:

1. **Het `ifItDoesNotFit`-blok verhuist hiernaartoe.** Nu staat die tekst in hoofdstuk 33
   (`understand-yourself`), negentien hoofdstukken ná de schaduwkant. Dat is negentien
   hoofdstukken te laat. De tekst bestaat, is per archetype geschreven, en is goed — hij staat
   alleen op de verkeerde plek. Voor `theSeeker` luidt hij:
   > *Misschien leef je nu in een fase waarin praktische zekerheid voorrang heeft gekregen, en
   > is de zoektocht naar binnen verplaatst in plaats van verdwenen. Het kan ook zijn dat je je
   > vragen hebt leren onderdrukken omdat ze in je omgeving niet welkom waren, waardoor dit
   > patroon aanwezig is maar nog niet toegestaan.*

   Dat is precies wat iemand nodig heeft die net las dat haar zoektocht een vluchtroute is. Zet
   hem eronder, niet twintig hoofdstukken verderop. (Hij mag daar ook blijven staan; de engine
   kiest al varianten, dus twee plaatsingen leveren geen letterlijke doublure op.)
2. **"Neem die ene, de rest kan wachten."** Vijf valkuilen tegelijk voorgeschoteld krijgen leidt
   bij niemand tot verandering en bij sommigen tot iets veel slechters. De bundel weet dit al —
   `what-you-need.note` zegt *"Kies er één. Wie aan alles tegelijk begint, verandert doorgaans
   niets"* — maar die wijsheid staat in hoofdstuk 30, niet bij de schaduwkant waar ze telt.
3. **"niet de plekken waar je faalt."** Expliciet, in gewone woorden, aan het eind. De bestaande
   `shadow.disclaimer` (*"Dit is geen diagnose en geen tekortkoming"*) staat er al en is goed,
   maar hij staat vóór de vijf bullets, waar hij nog niets hoeft te verzachten.

### Type `reflection` — 8 hoofdstukken

Deze acht zijn het meest literaire deel van het rapport en ook het minst score-gedreven: de
openingsalinea's (`essence`) zijn algemene essays, gekozen op een variantseed, en alleen de
middenstukken (`rules`) hangen aan drempelwaarden. De afsluiter moet dat eerlijk maken en
tegelijk de vorm respecteren.

De bundel heeft hier al een sterke afsluiter: elke beschouwing eindigt met
`Vraag om bij stil te staan: {vraag}`. Die blijft. Eronder komt één regel die de herkomst
benoemt:

```
**Waar dit vandaan komt**
De inleiding van deze beschouwing is algemeen — ze staat in elk rapport. De {n} alinea's
daarna zijn gekozen op jouw scores: {label1} ({score1}) en {label2} ({score2}). De vraag
onderaan is van jou.
```

Bij de fallback-variant (geen enkele regel matcht):

```
**Waar dit vandaan komt**
Op dit thema wijzen je scores niet naar één duidelijk patroon. Deze beschouwing is daarom
algemener dan de andere hoofdstukken in je rapport. Dat is geen tekort aan informatie —
het betekent dat de context bij jou meer bepaalt dan je aanleg.
```

Dat is de eerlijkste zin die dit product kan schrijven, en hij kost niets.

### Type `growth` — 4 hoofdstukken

Hier is de valkuil dat het voelt als een takenlijst. De afsluiter moet de lat verlagen, niet
verhogen.

```
**Wat je hiermee kunt**
Van de {n} punten hierboven is er één die vandaag al kan. Zoek die. De rest is voor later
of voor nooit — dit is een lijst met mogelijkheden, geen lijst met verplichtingen.

Groei betekent hier niet dat dit patroon verdwijnt. Het betekent dat je eerder doorhebt
wanneer het aan het stuur zit, en dat kiezen dan weer kan.
```

Voor het actieplan specifiek:

```
**Wat je hiermee kunt**
Vier weken is een suggestie, geen schema. Als week 1 drie weken duurt, is dat de goede
snelheid. Dit plan is bewust klein: wat je op je slechtste dag niet volhoudt, was nooit
een gewoonte.
```

(Die laatste zin is een lichte herschrijving van de bestaande `thirty-day.note`, die al goed is.)

### Type `profile` — de vaste kaarten

Het scorewiel, de archetypekaart, de kernkaart, de methodekaart, het spanningsveldenraster. Deze
kaarten tonen data. De afsluiter is hier een leesinstructie, niet een uitnodiging.

```
**Hoe je dit leest**
Alle cijfers lopen van 0 tot 100, met 50 als midden. Hoog is niet beter dan laag — een
lage score op conflict aangaan betekent niet dat je zwak bent, maar dat je rust boven
confrontatie kiest. Dat heeft voordelen en kosten, en dit rapport noemt allebei.
```

(Rechtstreeks uit de bestaande methodekaart. Die tekst is te goed om op één plek te blijven
staan; herhaal hem in verkorte vorm bij het scorewiel, waar de bezoeker voor het eerst met
cijfers wordt geconfronteerd.)

### Type `summary` — de slotzin

Hier hoeft niets bij. Het hoofdstuk eindigt al met:

> *En tot slot iets wat in geen enkele score staat: je hoeft niet eerst genezen te zijn om blij
> te mogen zijn. De blijdschap ligt niet aan het eind van je groeipad — ze ligt ernaast, de hele
> weg.*

Dat is de beste zin van het hele rapport en hij moet ongewijzigd blijven. Let op wat hij doet:
hij benoemt expliciet dat hij niet uit een score komt (*"iets wat in geen enkele score staat"*),
en breekt daarmee de belofte van de landingspagina op de enige manier die toegestaan is — door
het hardop te zeggen. Dat is precies het gedrag dat §6 op de rest van de site ook wil zien.

## 3.4 — Terugkeerbezoek ondersteunen

### Voor

Er is niets. `arcana_result` bevat een `meta.generatedAt`, maar die datum wordt in de interface
nergens getoond — alleen in de markdown-export (`Gegenereerd op: 14 maart 2026`). Het rapport
opent altijd bovenaan, altijd identiek, en de inhoudsopgave is altijd ingeklapt.

De landingspagina toont bij terugkomst wel:

> `[Bekijk je rapport]` `[Opnieuw beginnen]`

Twee knoppen, waarvan de tweede alles wist. Geen datum, geen context.

### Na

Drie toevoegingen, in volgorde van opbrengst per regel code.

**A. Een terugkeerregel bovenaan het rapport.** Eén kaart, alleen zichtbaar bij een tweede of
latere opening (herkenbaar aan een nieuwe localStorage-sleutel `arcana_last_read`):

> **WELKOM TERUG**
> Je maakte dit rapport op **{datum}**, {aantal} dagen geleden. Je las het voor het laatst op
> {laatsteDatum} en was toen bij **{laatsteHoofdstuk}**.
>
> [Verder waar ik was] [Opnieuw van voren] [Alleen de samenvatting]

Drie knoppen, drie echte intenties, geen daarvan destructief. De derde is de belangrijkste: wie
na drie maanden terugkomt wil in negen van de tien gevallen één ding nakijken, niet 33
hoofdstukken herlezen.

**B. Leesmarkering per hoofdstuk.** Elk hoofdstuk dat langer dan een paar seconden in beeld is
geweest krijgt een markering in `localStorage` (een array van id's, meer niet — dit blijft
lokaal en verandert niets aan de privacybelofte). In de inhoudsopgave levert dat op:

> **Deel 3 · Onder druk en in je kracht**
> ✓ Hoe je bent wanneer je alleen bent
> ✓ Hoe je bent onder druk
> ✓ Jouw sterke punten
> ○ Je valkuilen
> ○ De Jungiaanse laag: persona, schaduw en projectie
> ○ Je spanningsvelden
> ○ Je blinde vlekken

Met daaronder één regel:

> *Je las {x} van de 33 hoofdstukken. De vier die je nog niet opende staan hierboven open
> gemarkeerd.*

Dit is geen gamificatie en het mag er ook niet zo uitzien. Geen percentages, geen balk, geen
"goed bezig". Een bolletje en een vinkje, in dezelfde inkt als de rest.

**C. Vergelijken na opnieuw invullen.** Dit is de functie die van een test een instrument maakt.
Als `arcana_result` er al is en iemand vult opnieuw in, bewaar dan de vorige onder
`arcana_result_previous` en toon bovenaan het nieuwe rapport:

> **JE VORIGE RAPPORT**
> ## Wat er veranderd is sinds {datum}
>
> Je vulde de test {n} maanden geleden ook in. Dit is wat er sindsdien verschoven is — alleen
> de dimensies die meer dan 5 punten bewogen.
>
> | Dimensie | Toen | Nu | Verschil |
> |---|---|---|---|
> | {dimensie} | {oud} | {nieuw} | {+/−n} |
>
> **Je archetype:** {oudArchetype} → {nieuwArchetype}
>
> Wat dit niet betekent: dat je veranderd bent. Een test meet hoe je jezelf vandaag beschrijft,
> en dat hangt ook af van je dag, je periode en je stemming. Verschuivingen onder de 10 punten
> zeggen weinig. Verschuivingen daarboven zijn het opmerken waard — niet als bewijs, maar als
> vraag.
>
> [Bekijk je vorige rapport] [Verberg deze vergelijking]

De laatste alinea is verplicht. Zonder die alinea wordt een verschiltabel een pseudowetenschap
en ondergraaft hij de disclaimer die de rest van de site zo zorgvuldig overeind houdt. Met die
alinea is het het eerlijkste stuk van het hele product.

**D. Kleiner, maar gratis.** De datum bovenaan het rapport, altijd, ook bij de eerste opening:

> *Gemaakt op {datum} · 120 antwoorden · versie {n} van de berekening*

Drie dingen die een naslagwerk hoort te hebben en die nu alleen in de markdown-export staan. Het
versienummer is er ook al (`meta.version`) en hoort erbij, omdat de Voorwaarden expliciet zeggen
dat de berekening kan wijzigen. Wie zijn rapport over een jaar naast een nieuw rapport legt, moet
kunnen zien of hij twee metingen vergelijkt of twee verschillende instrumenten.

## 3.5 — Het hoofdstuk om door te geven, echt deelbaar maken

Dit is het hoofdstuk `understood-by-others`, en het is het meest onderbenutte onderdeel van het
hele product.

### Voor

> **Hoe anderen jou zouden moeten begrijpen**
>
> *{naam}, dit is het deel dat je zou kunnen laten lezen aan iemand die dichtbij staat. Het is
> geschreven om door te geven.*
>
> *Belangrijk: dit is geen vrijbrief. "Zo ben ik nu eenmaal" is het einde van een gesprek, niet
> het begin. Gebruik dit om jezelf uit te leggen, niet om jezelf te verdedigen.*
>
> - *Als ik van koers verander, ben ik niet onbetrouwbaar, ik ben eerlijk over wat ik nu zie.*
> - *Ik heb geen kant-en-klaar antwoord van jou nodig, alleen iemand die met mij meedenkt.*
> - *Concrete afspraken helpen mij, maar leg ze niet op als een deur die voorgoed dichtgaat.*
> - *Wat mensen makkelijk missen: {hiddenNeed}. Van buiten zien ze vooral het gedrag —
>   {behavior} — en niet de behoefte eronder.*

**Wat hier goed aan is.** De bullets staan in de ik-vorm. Dat is een uitstekende keuze: het zijn
zinnen die de lezer letterlijk kan uitspreken. De waarschuwing over *"zo ben ik nu eenmaal"* is
psychologisch scherp en zeldzaam eerlijk. De titel is duidelijk.

**Waarom het toch niet deelbaar is.** Vier redenen:

1. **Het is niet te lichten.** Het hoofdstuk zit op scrollpositie ~13.000 van 21.716. Er is geen
   knop, geen link, geen aparte weergave. "Doorgeven" betekent in de praktijk: het hele rapport
   doorsturen, of een screenshot maken.
2. **Het spreekt de verkeerde persoon aan.** De intro zegt *"{naam}, dit is het deel dat je zou
   kunnen laten lezen"* — gericht aan de testafnemer. De bullets staan in de ik-vorm — ook van de
   testafnemer. Maar de beoogde lezer is iemand anders, en die krijgt nergens uitgelegd wat hij
   in handen heeft.
3. **Er staat geen context in.** Als je partner je dit toestuurt, weet je niet wat Arcana Profile
   is, hoe het gemeten is, wat het niet is, en wat er van jou verwacht wordt.
4. **De titel is een opdracht aan de ontvanger.** *"Hoe anderen jou zouden moeten begrijpen"* —
   het woordje *moeten* legt de verantwoordelijkheid bij degene die het krijgt. Dat is precies de
   dynamiek waar de eigen waarschuwing ("geen vrijbrief") voor waarschuwt.

### Na

Maak er een op zichzelf staand document van, met een eigen titel, een eigen aanhef aan de
ontvanger, een eigen disclaimer en een eigen exportknop. Eén pagina, drie delen: *wat je in
handen hebt*, *wat ik je wil vertellen*, *wat dit niet is*.

---

> **EEN PAGINA UIT HET RAPPORT VAN {NAAM}**
>
> # Wat ik je zou willen uitleggen
>
> Je krijgt dit van {naam}. Het is één hoofdstuk uit een zelfreflectietest die {hij/zij}
> invulde: 120 vragen, waaruit scores worden berekend op twaalf eigenschappen. Dit hoofdstuk is
> het enige dat geschreven is om door te geven.
>
> Je hoeft er niets mee te doen. Lezen is genoeg.
>
> ---
>
> ## Wat mensen aan mij missen
>
> - Als ik van koers verander, ben ik niet onbetrouwbaar, ik ben eerlijk over wat ik nu zie.
> - Ik heb geen kant-en-klaar antwoord van jou nodig, alleen iemand die met mij meedenkt.
> - Concrete afspraken helpen mij, maar leg ze niet op als een deur die voorgoed dichtgaat.
> - Van buiten zie je vooral {behavior}. Wat daaronder zit is {hiddenNeed} — en dat is het deel
>   dat zelden hardop gaat.
>
> ## Waar dit vandaan komt
>
> Dit is geen mening en geen zelfbeeld. Het volgt uit {label1} ({score1}/100) en {label2}
> ({score2}/100) — twee van de dertig eigenschappen die deze test meet. Alle cijfers lopen van 0
> tot 100 met 50 als midden. Hoog is niet beter dan laag.
>
> ## Wat dit niet is
>
> Dit is geen diagnose en geen gevalideerde psychologische test. Er is geen normgroep en geen
> validatiestudie. Het is ook geen vrijbrief: *"zo ben ik nu eenmaal"* is het einde van een
> gesprek, niet het begin. {naam} kreeg die waarschuwing er zelf ook bij.
>
> Als je iets herkent, zeg het. Als je iets niet herkent, zeg dat ook — dat is even bruikbaar.
> De test meet hoe {naam} zichzelf beschrijft, niet hoe {hij/zij} is. Jij hebt informatie die de
> test niet heeft.
>
> ---
> *Arcana Profile · gemaakt op {datum} · arcanaprofile.com*

---

**Wat er technisch bij hoort.** De knop, bij het hoofdstuk en in de knoppenbalk bovenaan:

> `[Deze pagina delen]`

En bij het klikken, drie opties in plaats van één:

> **Deze pagina delen**
> Dit hoofdstuk is geschreven om door te geven. De rest van je rapport gaat niet mee.
>
> [Opslaan als PDF — één pagina]
> [Kopiëren als tekst]
> [Printen]
>
> *Wat je deelt: deze ene pagina met je naam erop. Wat je niet deelt: je scores op de andere
> dimensies, je valkuilen, je schaduwkant en je stresspatroon. Die blijven waar ze staan.*

Die laatste alinea is de reden dat dit werkt. Iemand die overweegt een stuk van een
persoonlijkheidsrapport naar zijn partner te sturen, heeft precies één angst: *wat stuur ik nog
meer mee?* Beantwoord die vraag voordat hij hem stelt, en de handeling wordt mogelijk.

Dit is bovendien het enige deel van dit product dat organisch kan groeien. Wie deze pagina krijgt,
ziet aan de onderkant waar hij vandaan komt.

---

# §4 — Concrete herschrijvingen

Vierenveertig plekken, waarvan er **negen ongewijzigd blijven** met de reden erbij. Dat is geen
opvulling: bij een tekst van dit niveau is het net zo belangrijk om vast te leggen wát er niet
aangeraakt mag worden.

**Legenda voor de kolom *Waarom*:** `[5s]` = werkt in de eerste vijf seconden · `[scepsis]` =
richt zich op de twijfelaar · `[drempel]` = verlaagt de drempel tot starten of doorgaan ·
`[eerlijk]` = maakt een claim waar of zwakt hem terecht af · `[psych]` = psychologische veiligheid
· `[houden]` = ongewijzigd.

## 4.1 — De hero

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 1 | Hero eyebrow | `Zelfinzicht zonder hokjes` | `Zelfinzicht dat je kunt narekenen` | `[5s]` `[scepsis]` — "zonder hokjes" is een belofte die het product zelf breekt (het levert een archetype), en "narekenen" is de enige claim die het wél waarmaakt. |
| 2 | Hero h1 | `Arcana` / `Profile` | `Een rapport over jezelf` / `dat zich laat narekenen` — met de merknaam als kleine regel erboven | `[5s]` — het grootste element op de pagina moet de propositie zijn, niet de merknaam. De naam staat al in de header, de tab en de voettekst. |
| 3 | Hero belofte | `Beantwoord 120 vragen en lees terug wat je patronen zijn: waar je kracht zit, waar je jezelf in de weg staat, en wat dat betekent voor je werk, je relaties en de keuze waar je nu voor staat.` | `Beantwoord 120 vragen en lees terug wat je patronen zijn. Bij elke uitspraak over jou staat het cijfer waar hij uit volgt — over je werk, je relaties, en de keuze waar je nu voor staat.` | `[5s]` — één zin van 53 woorden wordt twee zinnen waarvan de eerste op zichzelf staat. Het cijfer komt naar voren; de opsomming naar achteren. |
| 4 | Hero meta | `120 vragen · 20–25 minuten · gratis` | `120 vragen · 20–25 minuten · gratis · je kunt pauzeren` | `[drempel]` — de functie bestaat al (`arcana_current_question`), hij wordt alleen niet genoemd. Vier woorden die de grootste drempel van het product halveren. |
| 5 | Geruststelling 1 | `Je antwoorden blijven op je eigen apparaat` | `[houden]` | Precies, controleerbaar, geen overclaim. |
| 6 | Geruststelling 2 | `Geen account nodig` | `Geen account, geen e-mailadres` | `[drempel]` — "geen account" laat ruimte voor "maar wel je mail?". Sluit die ruimte. |
| 7 | Geruststelling 3 | `Direct je volledige rapport` | `Geen taalmodel — de test rekent` | `[scepsis]` `[eerlijk]` — "direct" is niet waar zolang er een laadscherm van tien seconden staat, en deze regel is de enige plek boven de vouw waar de scepticus iets krijgt. |

## 4.2 — Statbalk

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 8 | Stat 1–2, 4 | `120 vragen in vier vraagsoorten` · `33 hoofdstukken in je rapport` · `12 dimensies die gemeten worden` | `[houden]` | Getallen die kloppen, labels die niets beloven. |
| 9 | Stat 3 | `5.500+` / `woorden, volledig over jou` | **`5.700+`** / `woorden, met de cijfers erbij` | `[eerlijk]` — **dit advies is bijgesteld.** Het stond hier eerst op `7.500+` op grond van de 7.559 uit `A` §1; dat is de **volledig gerenderde pagina**, inclusief inhoudsopgave, wiellijst en knoppen. De rapporttekst zelf is met de engine nagemeten over acht fixtures en telt **5.711 tot 6.327 woorden** (`G-rebuild-spec.md` §3, tegenspraak 1). `5.700+` is die ondergrens, naar beneden afgerond. Onderschatten oogt bescheiden maar is óók onnauwkeurig, en dat is bij dit product een duurder soort onnauwkeurigheid — overschatten evengoed. `volledig over jou` is bovendien niet waar voor de acht beschouwingen (zie §6.3). |

## 4.3 — De sectie "Waarom dit anders leest" en de zes kaarten

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 10 | Eyebrow | `Waarom dit anders leest` | `[houden]` — maar de hele sectie verhuist naar direct onder de hero | `[5s]` — de tekst is goed, de positie niet. Nu staat de propositie op 30% van de pagina. |
| 11 | Sectie-h2 | `Een rapport dat zich laat narekenen` | `[houden]` | De beste zin van de hele site. Hij hoort alleen hogerop (zie #2). |
| 12 | Sectie-lead | `De meeste persoonlijkheidstests geven je een type en een verhaal dat op veel mensen past. Hier hangt elke uitspraak aan een cijfer, en dat cijfer staat erbij.` | `[houden]` | Twee zinnen, een tegenstelling, geen bijvoeglijk naamwoord te veel. Dit is het model voor de rest van de site. |
| 13 | Kaart 1 | `Elke zin komt uit een score` — *Geen algemene uitspraken die op iedereen passen. Elke zin in je rapport is gekoppeld aan een gemeten score op een specifieke eigenschap. Staat er iets over je conflictstijl, dan staat het cijfer erbij waar het uit volgt.* | `Bij elke uitspraak staat het cijfer` — *Geen algemene typeringen die op iedereen passen. Wat er over jou gezegd wordt, hangt aan een gemeten score op een specifieke eigenschap — en die score staat erbij. Staat er iets over je conflictstijl, dan lees je het getal waar het uit volgt. De acht beschouwingen achteraan zijn de uitzondering: daar zijn de openingen algemeen, en dat staat er per stuk bij.* | `[eerlijk]` — "elke zin" is aantoonbaar onwaar (zie §6.1). De uitzondering zelf noemen is sterker dan hem verzwijgen, want dit is een product dat verkocht wordt op zijn eerlijkheid. |
| 14 | Kaart 2 | `Dezelfde antwoorden geven hetzelfde rapport` — *Er zit geen taalmodel in dat elke keer iets anders verzint. De test rekent, en die berekening ligt vast. Doe je hem over een jaar opnieuw met dezelfde antwoorden, dan krijg je hetzelfde resultaat terug.* | `Dezelfde antwoorden geven hetzelfde rapport` — *Er zit geen taalmodel in dat elke keer iets anders verzint. De test rekent, en die berekening ligt vast. Doe je hem volgende week opnieuw met dezelfde antwoorden, dan lees je hetzelfde terug. Wijzigen we de berekening, dan staat dat bij je rapport vermeld.* | `[eerlijk]` — de huidige tekst zegt "over een jaar", terwijl de Voorwaarden letterlijk zeggen dat de berekening kan wijzigen. Directe tegenspraak op de site zelf. Zie §6.2. |
| 15 | Kaart 3 | `Ook de kant die je liever niet leest` — *De meeste tests vertellen je vooral wat je goed doet. Hier staat er ook in waar je kracht doorslaat, wat je vermijdt, en wat mensen om je heen merken zonder het te zeggen. Eerlijk, maar niet hard.* | `[houden]` | *"Eerlijk, maar niet hard"* is precies de juiste belofte en het rapport maakt hem waar. Geen woord aan veranderen. |
| 16 | Kaart 4 | `Vier vraagsoorten, geen eindeloze eens-of-oneens` — *Naast stellingen krijg je keuzes tussen twee dingen die allebei kloppen, situaties waarin je moet kiezen, en rangschikkingen. Dat vangt nuance die een enkele schaal mist.* | `Vier vraagsoorten, geen eindeloze eens-of-oneens` — *Naast stellingen krijg je keuzes tussen twee dingen die allebei kloppen, situaties waarin je moet kiezen, en rijtjes om op volgorde te zetten. Dat vangt nuance die één schaal mist. De eerste zestig gaan het snelst; daarna wordt het afwisselender.* | `[drempel]` — de laatste zin bereidt voor op het moment waarop mensen afhaken (§1, moment 4). Beter dat ze het van tevoren weten dan dat ze het ontdekken. |
| 17 | Kaart 5 | `Je gegevens gaan nergens heen` — *Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen browser. Wis je je browsergegevens, dan is het weg — ook voor ons.* | `[houden]` | *"— ook voor ons"* doet in drie woorden wat andere sites in een privacyverklaring proberen. |
| 18 | Kaart 6 | `Van jou, om te bewaren` — *Download je rapport als PDF of tekstbestand, print het, of neem het mee naar een gesprek met je coach of therapeut. Het is jouw document.* | `Van jou, om te bewaren — en om één pagina van door te geven` — *Download je rapport als PDF of tekstbestand, print het, of neem het mee naar een gesprek met je coach of therapeut. Eén hoofdstuk is geschreven om apart door te sturen naar iemand die dichtbij staat, zonder dat de rest meegaat.* | `[drempel]` — het deelbare hoofdstuk (§3.5) is het enige onderdeel dat dit product organisch kan laten groeien, en het wordt nu alleen genoemd in een bulletlijst vier secties lager. |

## 4.4 — De vier stappen

De vier stappen zijn het best geschreven onderdeel van de landingspagina. Ze zijn concreet, ze
lopen op, en ze vertellen samen een verhaal met een einde. Twee kleine ingrepen.

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 19 | Stap 01 | `Je beantwoordt 120 vragen` — *Stellingen, keuzes, situaties en rangschikkingen. De volgende vraag verschijnt vanzelf zodra je antwoordt — je hoeft nergens op te klikken.* | `Je beantwoordt 120 vragen` — *Stellingen, keuzes, situaties en rijtjes op volgorde. De volgende vraag verschijnt vanzelf zodra je antwoordt — je hoeft nergens op te klikken. Stoppen mag: je komt terug waar je gebleven was.* | `[drempel]` — de pauzefunctie wordt op de hele landingspagina nergens genoemd, behalve verstopt in één FAQ-antwoord. |
| 20 | Stap 02 | `Elk antwoord telt mee op 30 eigenschappen` — *Eén vraag raakt meestal meerdere eigenschappen, elk met een eigen gewicht. Zo ontstaat een score op 30 subdimensies, van behoefte aan controle tot gevoeligheid voor kritiek.* | `[houden]` | Het woord *gewicht* is hier de hele uitleg van waarom dit geen simpele optelsom is. |
| 21 | Stap 03 | `Die 30 worden 12 hoofddimensies` — *De subdimensies worden samengevoegd tot twaalf hoofdlijnen: je innerlijke motor, je denkstijl, je conflictstijl, je schaduwkant, en acht andere.* | `Die 30 worden 12 hoofddimensies` — *De subdimensies tellen op tot twaalf hoofdlijnen: je innerlijke motor, je denkstijl, je conflictstijl, je schaduwkant, en acht andere.* | `[eerlijk]` — één lijdende vorm minder. Op een site die verkoopt dat er gerekend wordt, moet het rekenwerk actief zijn. |
| 22 | Stap 04 | `Je patroon krijgt een naam en een verhaal` — *Uit die twaalf volgt welk archetype het sterkst naar voren komt, hoe je onder druk verandert, en welke spanningsvelden er in je spelen. Dat wordt je rapport.* | `Je patroon krijgt een naam en een verhaal` — *Uit die twaalf volgt welk archetype het sterkst naar voren komt, hoe je onder druk verandert, en welke spanningsvelden er in je spelen. Die naam is een leeswijzer, geen hokje: waar hij en je eigen ervaring uiteenlopen, zegt je rapport dat je ervaring voorgaat.* | `[scepsis]` — deze zin staat al in het rapport (`who-you-are`) en is daar de beste weerlegging van het typologiebezwaar. Hij hoort ook op de landingspagina, waar de twijfelaar nog zit. |

## 4.5 — De overige sectiekoppen

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 23 | Eyebrow + lead "Hoe het werkt" | `Hoe het werkt` / `Van 120 antwoorden naar één patroon` / *Je vult geen hokje in. Elk antwoord verschuift meerdere scores tegelijk, en pas aan het einde ontstaat het beeld.* | `[houden]` | Drie regels, geen woord te veel. |
| 24 | Eyebrow + lead "Wat het meet" | `Wat het meet` / `Twaalf dimensies, dertig eigenschappen` / *Achter elke dimensie zitten meerdere gemeten eigenschappen. Je ziet ze in je rapport allemaal terug, met de score erbij.* | `[houden]` | |
| 25 | Lead "Wat je krijgt" | *Geen samenvatting van een alinea, maar een volledig document dat je kunt bewaren, printen of meenemen naar een gesprek.* | *Geen samenvatting van een alinea, maar een document van 33 hoofdstukken dat je kunt bewaren, printen of meenemen naar een gesprek — en dat begint met één pagina die alles samenvat, voor als je het later terugleest.* | `[eerlijk]` — belooft de samenvatting uit §3.1, die het echte verschil maakt tussen een lezing en een naslagwerk. |
| 26 | Eyebrow + lead "Eerlijk gezegd" | `Eerlijk gezegd` / `Wat dit niet is` / *Een instrument dat zijn eigen grenzen niet benoemt, verdient je vertrouwen niet. Daarom hier, niet verstopt in de kleine lettertjes.* | `[houden]` — **onaantastbaar** | De beste alinea op de site en de kern van het merk. Hij mag niet worden ingekort, verplaatst of verzacht. |
| 27 | Slot-CTA tekst | `Twintig minuten, 120 vragen, en een rapport dat je kunt bewaren. Je hebt er geen account voor nodig en je antwoorden blijven van jou.` | `Twintig minuten, 120 vragen, en een rapport waarin bij elke uitspraak het cijfer staat waar hij uit volgt. Stoppen mag onderweg — je komt terug waar je gebleven was.` | `[drempel]` — de huidige tekst herhaalt de hero-geruststellingen die de lezer op dit punt al drie keer heeft gehad. Vervang herhaling door het argument dat hij nog niet kreeg. |

## 4.6 — De FAQ

De FAQ is het sterkste tekstblok van de hele site: acht echte vragen, acht eerlijke antwoorden,
geen ontwijking. Vijf blijven onaangeraakt.

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 28 | `Hoe lang duurt de test?` | *Ongeveer 20 tot 25 minuten voor 120 vragen. Je kunt tussendoor pauzeren: je voortgang blijft bewaard in je browser, dus je kunt later verder waar je gebleven was.* | *Ongeveer 20 tot 25 minuten voor 120 vragen. De eerste 72 zijn korte stellingen en gaan het snelst; de laatste 48 zijn afwisselender en kosten iets meer denkwerk. Je kunt tussendoor pauzeren: je voortgang blijft bewaard in je browser, dus je komt terug waar je gebleven was.* | `[drempel]` — de enige plek waar de vorm van de test wordt uitgelegd. Wie weet dat het afwisselender wordt, haalt vraag 40 eerder. |
| 29 | `Wat kost het?` | *Niets. Je krijgt het volledige rapport van alle 33 hoofdstukken, zonder betaalmuur en zonder account.* | `[houden]` | |
| 30 | `Wat gebeurt er met mijn antwoorden?` | *Die blijven in de opslag van je eigen browser staan. Er is geen server waar ze naartoe gaan…* | `[houden]` | |
| 31 | `Is dit wetenschappelijk gevalideerd?` | *Nee, en dat zeggen we liever eerlijk. Dit is een reflectie-instrument, geen gevalideerde psychologische test… Gebruik het als spiegel, niet als bewijs.* | `[houden]` — **onaantastbaar** | *"Gebruik het als spiegel, niet als bewijs"* is de meest waardevolle zin van de FAQ. |
| 32 | `Is dit hetzelfde als MBTI, DISC of Insights?` | *Nee. Die systemen delen je in bij een vast type. Hier wordt per eigenschap een score berekend, en het archetype is niet meer dan een samenvattende leeswijzer daarover. Waar het archetype en je eigen score elkaar tegenspreken, zegt het rapport expliciet dat je score voorgaat.* | *Nee. Die systemen delen je in bij een vast type dat je erbij krijgt. Hier wordt per eigenschap een score berekend en staat die score in je rapport; het archetype is niet meer dan een samenvattende leeswijzer daarover. Waar het archetype en je eigen score elkaar tegenspreken, zegt het rapport expliciet dat je score voorgaat — en waar je score en je eigen ervaring elkaar tegenspreken, gaat je ervaring voor.* | `[eerlijk]` — de bestaande trap stopt één trede te vroeg. Het rapport zegt zelf dat de ervaring boven het cijfer gaat; de FAQ laat het cijfer bovenaan staan. |
| 33 | `Kan ik dit gebruiken om iemand aan te nemen of te beoordelen?` | *Nee. Het is niet gemaakt of getoetst voor selectie…* | `[houden]` — **onaantastbaar** | Disclaimerkern. |
| 34 | `Krijg ik hetzelfde rapport als iemand anders?` | *Niet helemaal. De teksten kennen meerdere gelijkwaardige formuleringen…* | `[houden]` | Klopt met de engine (`variantSeed`). Narekenbaar. |
| 35 | `Kan ik mijn rapport bewaren?` | *Ja. Je kunt het opslaan als PDF, printen, of downloaden als tekstbestand. Doe dat ook als je het wilt houden — het staat verder alleen in deze browser.* | *Ja. Je kunt het opslaan als PDF, printen, of downloaden als tekstbestand. Doe dat ook echt: het staat verder alleen in deze browser, en wij hebben geen kopie. Eén hoofdstuk kun je apart opslaan om door te sturen naar iemand die dichtbij staat.* | `[eerlijk]` — *"wij hebben geen kopie"* maakt het gevolg concreet in plaats van impliciet, en de laatste zin introduceert de deelactie op de plek waar iemand al over bewaren nadenkt. |

## 4.7 — Het naamformulier

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 36 | Eyebrow | `Voordat we beginnen` | `Eén scherm, dan beginnen we` | `[drempel]` — "voordat we beginnen" belooft een onbekende hoeveelheid werk. "Eén scherm" is een getal. |
| 37 | Kop + body | `Hoe mogen we je aanspreken?` / *Je rapport wordt op jouw naam geschreven. Deze gegevens blijven, net als je antwoorden, alleen in deze browser en worden nergens naartoe gestuurd.* | `Hoe mogen we je aanspreken?` / *Dit is geen account en het gaat nergens heen — het blijft in deze browser, net als je antwoorden. We vragen het omdat een rapport dat je bij je naam noemt zachter aankomt op de plekken waar het over je valkuilen gaat.* | `[drempel]` `[psych]` — geruststelling vóór de vraag, en voor het eerst een echte reden. De huidige tekst beschrijft de handeling; deze beschrijft de opbrengst. |
| 38 | Veldhint | `Een voornaam of bijnaam is genoeg. Verzin gerust iets als je liever anoniem blijft.` | `Een voornaam of bijnaam is genoeg. Of verzin iets — het rapport merkt het verschil niet.` | `[drempel]` — actiever, korter, en het laatste zinsdeel neemt het schuldgevoel weg bij het verzinnen van een naam. |
| 39 | Submit-knop + nieuwe knop | `Begin met de 120 vragen` (uit tot er een naam staat) | `Begin met de 120 vragen` + een tweede, tekstknop eronder: `Liever zonder naam →` | `[drempel]` — de engine kan dit al (`et()` heeft voor elke aanspreekzin een naamloze variant). De functie is er, de knop niet. Dit haalt het dissonantiemoment uit §1.3 volledig weg. |
| 40 | Aanspreekvorm | `Hoe spreken we je aan?` [Jij / je] [U] — geen toelichting | `Hoe spreken we je aan?` [Jij / je] [U] — *Dit verandert je scores niet, alleen de toon van je rapport.* | `[eerlijk]` — bij de levensfase staat deze geruststelling er wel. Consistentie. |
| 41 | Levensfase-hint | `Dit verandert je scores niet. Het kleurt alleen hoe je groeipad wordt geformuleerd.` | `[houden]` | Exact de juiste hoeveelheid uitleg. |

## 4.8 — De vragenflow

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 42 | Blokaanduiding | `Deel 1 van 4 — korte stellingen` (en drie varianten) | `Stellingen · {n} van 72` met daaronder de bestaande regel `Vraag {n} van 120` | `[drempel]` — "Deel 1 van 4" suggereert bij vraag 40 dat er nog driemaal zoveel komt, terwijl er nog 40% van het gedane werk resteert. De blokken zijn 72/24/16/8; die scheefheid moet niet als vier gelijke delen worden gepresenteerd. Varianten: `Kiezen tussen twee · {n} van 24`, `Situaties · {n} van 16`, `Op volgorde zetten · {n} van 8`. |
| 43 | Voortgangslabel | `Vraag 40 van 120` | `Vraag 40 van 120 · nog ongeveer 13 minuten` | `[drempel]` — `arcana_started_at` bestaat al, dus de resttijd is rekenbaar. Het is bovendien het getal dat de bezoeker daadwerkelijk zoekt, en een schatting die zichzelf bijstelt past bij een product dat op narekenbaarheid draait. |
| 44 | Hint bij onbeantwoorde vraag | `Kies een antwoord — de volgende vraag verschijnt vanzelf.` | `[houden]` | Kort, feitelijk, verdwijnt zodra hij overbodig is. Precies goed. |
| 45 | Knop `Pauzeren` | `Pauzeren` | `Pauzeren — je antwoorden blijven bewaard` (of, bij krappe ruimte, `Pauzeren` met een tooltip/hint van dezelfde strekking) | `[drempel]` — dit is de knop die iemand indrukt op het moment dat ze twijfelt of ze ooit terugkomt. Dat is het moment om het antwoord te geven, niet om het te bewaren voor de FAQ. |
| 46 | Laatste knop | `Afronden` | `Afronden — laat mijn rapport zien` | `[drempel]` — na 119 vragen is "afronden" een administratieve handeling. Noem de beloning. |

## 4.9 — Het laadscherm

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 47 | Laadscherm | `Je antwoorden worden gespiegeld…` / `Patronen worden herkend…` / `Spanningsvelden worden opgebouwd…` / `Je rapport wordt samengesteld…` (4 × 1,5 s, harde time-out op 6 s, gemeten >10 s) | **Optie A (aanbevolen):** één regel, max. 1,5 s: `Klaar. Je rapport staat hieronder.` — **Optie B:** vier regels met echte getallen, actieve vorm, max. 3 s totaal: `120 antwoorden opgeteld` → `30 eigenschappen berekend` → `12 dimensies samengevoegd` → `Je rapport is klaar` | `[eerlijk]` — drie van de vier huidige regels staan in de lijdende vorm zonder handelend voorwerp. Dat is het register van een taalmodel dat doet alsof het nadenkt, op een site waarvan de propositie letterlijk *"er zit geen taalmodel in"* is. Dit is de enige plek waar de vorm het tegenovergestelde zegt van de inhoud. |

## 4.10 — De exportknoppen boven het rapport

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 48 | Knop 1 | `Download als PDF` (title: *Kies in het printvenster bij bestemming: Opslaan als PDF*) | `Bewaar als PDF` (helptekst zichtbaar in plaats van in een `title`: *Kies in het printvenster bij "Bestemming" voor "Opslaan als PDF".*) | `[eerlijk]` — het is geen download maar een printdialoog, en de instructie die dat uitlegt staat in een `title`-attribuut dat op touch nooit verschijnt. |
| 49 | Knop 2 | `Rapport printen` | `Printen op papier` | Onderscheidt hem van #48, die dezelfde handeling uitvoert (`window.print()`). Twee knoppen met dezelfde functie en verschillende namen is nu verwarrend. |
| 50 | Knop 3 | `Rapport downloaden` | `Downloaden als tekstbestand (.md)` | `[eerlijk]` — dit is de enige échte download, en het formaat is markdown. Zonder die vermelding opent een deel van de gebruikers een bestand dat ze niet herkennen. |
| 51 | Nieuwe knop | *(bestaat niet)* | `Deze pagina delen` bij het hoofdstuk *Hoe anderen jou zouden moeten begrijpen* | Zie §3.5. |
| 52 | Knoppenvolgorde | Zes knoppen direct onder de titel, waarvan twee destructief | Drie knoppen bovenaan (`Bewaar als PDF`, `Inhoudsopgave`, `Deel één pagina`); `Terug naar de website`, `Opnieuw beginnen` en `Antwoorden wissen` verhuizen naar de voettekst van het rapport | `[psych]` — het eerste wat iemand ziet na 25 minuten werk mag geen knop zijn die dat werk vernietigt. |
| 53 | Wisbevestiging | *Weet je zeker dat je al je antwoorden en dit rapport wilt wissen? Dit kan niet ongedaan worden gemaakt. Overweeg eerst "Rapport downloaden".* | Zie §5, blok "Bevestigingen" — een eigen dialoog met twee knoppen die de handeling benoemen, in plaats van `window.confirm` met OK/Annuleren | De inhoud is goed; het mechanisme niet. `window.confirm` geeft twee knoppen die `OK` en `Annuleren` heten, waardoor de bevestiging van de destructieve actie *"OK"* is. |

## 4.11 — In het rapport

| # | Waar | Nu, letterlijk | Voorstel | Waarom |
|---|---|---|---|---|
| 54 | Masthead-eyebrow | `Jouw archetype` | `Het patroon dat het sterkst naar voren kwam` | `[scepsis]` — het eerste woord van het rapport is nu een typologieterm, terwijl het rapport twee hoofdstukken later uitlegt dat het geen typologie is. Zeg het meteen goed. |
| 55 | Archetypenamen | `The Seeker`, `The Architect`, `The Wounded Healer`, `The Frozen One` … (18 stuks) | Nederlandse namen naast de Engelse, of in plaats daarvan: `De Zoeker`, `De Bouwer`, `De Spiegel`, `De Vlam`, `De Hoeder`, `De Alchemist`, `De Strateeg`, `De Gewonde Heler`, `De Ziener`, `Het Anker`, `De Speler`, `De Kluizenaar` · stress: `De Beheerser`, `De Verdwijner`, `De Sprinter`, `De Bevrorene`, `De Pleaser`, `De Verdediger` | `[eerlijk]` `[psych]` — achttien Engelse termen op een site die verder geen woord Engels bevat, als eerste woord over jezelf na 25 minuten introspectie. Het schept afstand op het moment dat je nabijheid wilt, en het roept precies de typologie-associatie op waar de FAQ zich van distantieert. Dit is een grotere ingreep dan de rest van deze tabel en verdient een eigen beslissing. |
| 56 | Betrouwbaarheidszin (hoog) | `Je antwoordde consistent. Dit rapport staat stevig.` | `Je antwoorden waren consistent. Dat betekent dat de scores hieronder stabiel zijn — niet dat ze waar zijn.` | `[eerlijk]` — *"staat stevig"* is de enige plek in het hele rapport waar een geldigheidsclaim gedaan wordt, en hij wordt gedaan over een instrument zonder normgroep en zonder validatiestudie. Zie §6.5. |
| 57 | Verdiepingsblok | *Het portret, de kern en de verantwoording hierboven zijn samen het korte antwoord. Wat nu volgt is de uitwerking: 33 hoofdstukken, gegroepeerd in 6 delen. Je hoeft ze niet op volgorde te lezen — gebruik de inhoudsopgave om te springen naar wat je zoekt.* | `[houden]` — maar de laatste zin verhuist naar bovenaan het rapport | Goede alinea, staat vier schermen te laag. De instructie "je hoeft niet te scrollen" heeft alleen nut vóórdat iemand gescrold heeft. |
| 58 | Kaartnavigatie | `← Wie je bent` · `14 / 33` · `Je valkuilen →` | Zie §3.2, laag 3 — met een halve regel context per richting | Een bladerwijzer wordt een kaart. |

---

# §5 — Microcopy-set

Kant-en-klaar. Alles wat de rebuild nodig heeft, inclusief de schermen die er nu niet zijn. Per
regel staat waar hij hoort; teksten tussen `{}` zijn slots.

## 5.1 — Knoppen

| Context | Tekst | Noot |
|---|---|---|
| Hero, geen voortgang | `Start de test` | ongewijzigd |
| Hero, voortgang | `Verdergaan — vraag {n} van 120` | ongewijzigd, goed |
| Hero, rapport bestaat | `Bekijk je rapport` | ongewijzigd |
| Hero, rapport bestaat, secundair | `Opnieuw beginnen` | verplaatsen naar tekstknop, minder gewicht |
| Site-header | `Start de test` / `Verdergaan` | ongewijzigd |
| Formulier, primair | `Begin met de 120 vragen` | ongewijzigd |
| Formulier, tekstknop | `Liever zonder naam →` | **nieuw** |
| Formulier, terug | `Terug` | ongewijzigd |
| Vraag, vorige | `Vorige` | ongewijzigd |
| Vraag, volgende | `Volgende` | ongewijzigd |
| Vraag, laatste | `Afronden — laat mijn rapport zien` | gewijzigd |
| Vraag, pauze | `Pauzeren — je antwoorden blijven bewaard` | gewijzigd |
| Rapport, primair | `Bewaar als PDF` | gewijzigd |
| Rapport, secundair | `Inhoudsopgave` | naar boven gehaald |
| Rapport, secundair | `Deel één pagina` | **nieuw** |
| Rapport, tekst | `Printen op papier` | gewijzigd |
| Rapport, tekst | `Downloaden als tekstbestand (.md)` | gewijzigd |
| Rapport, voettekst | `Terug naar de website` | verplaatst |
| Rapport, voettekst | `Opnieuw beginnen` | verplaatst |
| Rapport, voettekst | `Antwoorden wissen` | verplaatst |
| Terugkeer | `Verder waar ik was` | **nieuw** |
| Terugkeer | `Alleen de samenvatting` | **nieuw** |
| Terugkeer | `Opnieuw van voren` | **nieuw** |
| Vergelijking | `Bekijk je vorige rapport` | **nieuw** |
| Vergelijking | `Verberg deze vergelijking` | **nieuw** |
| Deelvenster | `Opslaan als PDF — één pagina` | **nieuw** |
| Deelvenster | `Kopiëren als tekst` | **nieuw** |
| Deelvenster | `Printen` | **nieuw** |
| Naar boven | `Naar inhoudsopgave ↑` | ongewijzigd, goed |
| Juridisch | `← Terug naar de website` | ongewijzigd |
| Skip-link | `Naar de hoofdinhoud` | **nieuw** — ontbreekt nu (A-baseline §3.9) |

## 5.2 — Labels en velden

| Context | Tekst |
|---|---|
| Naamveld, label | `Je naam of roepnaam` |
| Naamveld, placeholder | `Bijvoorbeeld: Sam` |
| Naamveld, hint | `Een voornaam of bijnaam is genoeg. Of verzin iets — het rapport merkt het verschil niet.` |
| Aanspreekvorm, legend | `Hoe spreken we je aan?` |
| Aanspreekvorm, opties | `Jij / je` · `U` |
| Aanspreekvorm, hint | `Dit verandert je scores niet, alleen de toon van je rapport.` |
| Levensfase, label | `Levensfase (optioneel)` |
| Levensfase, opties | `Zeg ik liever niet` · `Tot 25 jaar` · `25 tot 40 jaar` · `40 tot 55 jaar` · `55 jaar of ouder` |
| Levensfase, hint | `Dit verandert je scores niet. Het kleurt alleen hoe je groeipad wordt geformuleerd.` |
| Likert, schaal 1 | `helemaal niet herkenbaar` |
| Likert, schaal 7 | `volledig herkenbaar` |
| Likert, schermlezer | `{n} van 7 — {omschrijving}` |
| Voortgang, blok | `Stellingen · {n} van 72` (varianten zie #42) |
| Voortgang, totaal | `Vraag {n} van 120 · nog ongeveer {m} minuten` |
| Voortgang, schermlezer | `Vraag {n} van 120, {blok}` |
| Rangschikking, instructie | `Zet ze op volgorde van meest naar minst. Gebruik de pijlen of sleep.` |
| Rangschikking, knoppen | `{item} omhoog` · `{item} omlaag` |
| Rapport, datumregel | `Gemaakt op {datum} · 120 antwoorden · versie {n} van de berekening` |
| Rapport, kaartteller | `Kaart {n} / {totaal}` |
| Rapport, legenda | `Inzicht` · `Schaduw` · `Beschouwing` · `Groei` · `Profiel` |
| Rapport, legenda-noot | `Kleur en vorm tonen het kaartsoort — geen label nodig.` |
| TOC, gelezen | `✓ {hoofdstuktitel}` |
| TOC, ongelezen | `○ {hoofdstuktitel}` |
| TOC, teller | `Je las {x} van de 33 hoofdstukken.` |

## 5.3 — Tussenschermen

**Halverwege — na vraag 60.** Eén scherm, doorklikken met één knop, niet weg te klikken met
Escape (want dan mist de functie zijn doel), wel over te slaan door gewoon door te gaan.

> **HALVERWEGE**
> ## Zestig gehad, zestig te gaan
>
> Je bent ongeveer twaalf minuten bezig. Vanaf hier verandert de vorm: nog twaalf stellingen, en
> daarna keuzes, situaties en rijtjes om op volgorde te zetten. Dat leest sneller dan wat je net
> deed.
>
> Je antwoorden staan al opgeslagen in deze browser. Stop je nu, dan kom je terug waar je
> gebleven was.
>
> [Verder] [Pauzeren]

**Bijna klaar — na vraag 105.** Kleiner, als strook boven de vraag, niet als volledig scherm.

> *Nog vijftien. Dit zijn de rijtjes — ze gaan het snelst.*

**Deel begint — bij vraag 73, 97 en 113.** Eén regel boven de vraag, één keer per blok.

> Vraag 73 · *Vanaf hier kies je tussen twee dingen die allebei kunnen kloppen. Er is geen goed
> antwoord; kies wat het vaakst waar is.*
>
> Vraag 97 · *Vanaf hier krijg je situaties met vier reacties. Kies wat je werkelijk zou doen,
> niet wat het beste klinkt.*
>
> Vraag 113 · *De laatste acht: zet de rijtjes op volgorde van wat het meest bij je past.*

Die middelste regel (*"niet wat het beste klinkt"*) is de enige instructie in het hele
instrument die de antwoordkwaliteit kan verbeteren. Hij hoort er te staan.

**Laadscherm, optie A.**

> `Klaar. Je rapport staat hieronder.`

**Laadscherm, optie B.**

> `120 antwoorden opgeteld`
> `30 eigenschappen berekend`
> `12 dimensies samengevoegd`
> `Je rapport is klaar`

**Welkom terug.**

> **WELKOM TERUG**
> Je maakte dit rapport op **{datum}**, {n} dagen geleden. Je was toen bij **{hoofdstuk}**.
>
> [Verder waar ik was] [Alleen de samenvatting] [Opnieuw van voren]

## 5.4 — Lege toestanden

| Situatie | Tekst |
|---|---|
| Geen voortgang, geen rapport | *(geen lege toestand — de landingspagina is het startpunt)* |
| Rapport bestaat niet meer (localStorage gewist, maar de route staat nog open) | **Je rapport is er niet meer.** *Deze browser heeft geen opgeslagen rapport. Dat kan komen doordat je je browsergegevens hebt gewist, doordat je een andere browser of een ander apparaat gebruikt, of doordat je op "Antwoorden wissen" hebt geklikt. We hebben geen kopie — dat is de keerzijde van geen server.* `[Begin opnieuw]` |
| Voortgang bestaat, rapport niet | **Je was al begonnen.** *Je beantwoordde {n} van de 120 vragen. Ze staan er nog.* `[Verder bij vraag {n+1}]` `[Opnieuw beginnen]` |
| Geen actieve spanningsvelden | *Op geen van de tien spanningsvelden trekken twee behoeften tegelijk sterk aan je. Dat is geen tekort: het betekent dat je op dit moment weinig innerlijke tegenstrijdigheid rapporteert. Hieronder staan de drie die het dichtst in de buurt komen.* |
| Beschouwing zonder passende regel | *Op dit thema wijzen je scores niet naar één duidelijk patroon. Deze beschouwing is daarom algemener dan de andere hoofdstukken in je rapport. Dat is geen tekort aan informatie — het betekent dat de context bij jou meer bepaalt dan je aanleg.* |
| Vergelijking, niets veranderd | *Geen enkele dimensie bewoog meer dan vijf punten sinds {datum}. Bij een test die meet hoe je jezelf beschrijft, is dat het meest voorkomende resultaat — en het zegt vooral iets over de stabiliteit van je zelfbeeld, niet over de stabiliteit van jou.* |

## 5.5 — Foutmeldingen

De site heeft er nu geen. Hij draait volledig lokaal, dus er is weinig dat kan misgaan — maar
niet niets. Structuur telkens: *wat er gebeurde · waardoor · wat je nu kunt doen.*

| Situatie | Tekst |
|---|---|
| localStorage niet beschikbaar (privémodus, geblokkeerde opslag) | **Deze browser bewaart niets.** *Je kunt de test wel maken, maar je voortgang en je rapport worden niet opgeslagen. Sluit je dit tabblad, dan is alles weg. Dit komt meestal door een privévenster of door een instelling die opslag blokkeert.* `[Toch beginnen]` `[Uitleg]` |
| localStorage vol | **Er is geen ruimte meer om je antwoorden te bewaren.** *De opslag van je browser zit vol. Maak ruimte vrij via je browserinstellingen, of ga verder zonder opslag — dan blijft je voortgang alleen in dit tabblad.* `[Opnieuw proberen]` `[Verder zonder opslag]` |
| Opgeslagen rapport hoort bij een oudere berekening | **Dit rapport komt uit een oudere versie.** *Sinds je het maakte is de berekening aangepast. Je rapport blijft leesbaar zoals het is. Wil je zien wat er met dezelfde antwoorden nu uitkomt, vul de test dan opnieuw in — je oude rapport blijft bewaard om naast te leggen.* `[Laat mijn rapport zien]` `[Opnieuw invullen]` |
| Opgeslagen gegevens onleesbaar | **We kunnen je opgeslagen antwoorden niet lezen.** *De gegevens in deze browser zijn beschadigd of onvolledig. We kunnen ze niet herstellen — er is geen kopie, want er is geen server. Je kunt opnieuw beginnen; dat wist wat er nog stond.* `[Opnieuw beginnen]` |
| Download mislukt | **Het bestand kon niet worden opgeslagen.** *Je browser blokkeerde de download. Probeer het opnieuw, of gebruik "Printen op papier" en kies daar "Opslaan als PDF".* `[Opnieuw proberen]` |
| Kopiëren mislukt | **Kopiëren lukte niet.** *Je browser geeft geen toegang tot het klembord. Selecteer de tekst hieronder en kopieer hem handmatig.* |

## 5.6 — Bevestigingen

De twee bestaande bevestigingen draaien op `window.confirm`, wat twee knoppen oplevert die `OK`
en `Annuleren` heten. Daarmee bevestig je een onomkeerbare handeling met het woord "OK", en dat
is precies het patroon dat de UX-literatuur al twintig jaar afraadt. Vervang door een eigen
dialoog met knoppen die de handeling benoemen. De inhoud van de huidige teksten is goed en blijft
grotendeels overeind.

**Antwoorden wissen.**

> ## Al je antwoorden en je rapport wissen?
>
> Dit wist je 120 antwoorden en het rapport dat eruit volgde, uit deze browser. Wij hebben geen
> kopie — er is geen server. Dit kan niet ongedaan worden gemaakt.
>
> Bewaar eerst wat je wilt houden.
>
> `[Eerst bewaren als PDF]` `[Ja, wis alles]` `[Nee, laat staan]`

**Opnieuw beginnen.**

> ## Opnieuw beginnen?
>
> Je huidige antwoorden en je rapport verdwijnen. Je naam en aanspreekvorm blijven staan, zodat
> je niet opnieuw hoeft in te vullen.
>
> `[Eerst bewaren als PDF]` `[Ja, opnieuw beginnen]` `[Nee, terug naar mijn rapport]`

**Pauzeren, vanuit de vragenflow.**

> ## Pauzeren
>
> Je {n} antwoorden blijven bewaard in deze browser. Kom je terug op dit apparaat en in deze
> browser, dan ga je verder bij vraag {n+1}.
>
> `[Pauzeren]` `[Toch doorgaan]`

**Deelbevestiging.**

> ## Deze pagina delen
>
> Dit hoofdstuk is geschreven om door te geven. De rest van je rapport gaat niet mee.
>
> `[Opslaan als PDF — één pagina]` `[Kopiëren als tekst]` `[Printen]`
>
> *Wat je deelt: deze ene pagina met je naam erop. Wat je niet deelt: je scores op de andere
> dimensies, je valkuilen, je schaduwkant en je stresspatroon.*
>
> `[Annuleren]`

## 5.7 — Bevestigingsberichten (na afloop)

Kort, één regel, verdwijnt na een paar seconden. Geen uitroeptekens, geen vinkjes-met-confetti.

| Handeling | Tekst |
|---|---|
| PDF opgeslagen | `Opgeslagen. Bewaar het bestand ergens waar je het terugvindt.` |
| Tekstbestand gedownload | `Gedownload als {bestandsnaam}.` |
| Tekst gekopieerd | `Gekopieerd naar je klembord.` |
| Antwoorden gewist | `Gewist. Er staat niets meer in deze browser.` |
| Pauze genomen | `Bewaard bij vraag {n}. Tot ziens.` |
| Test afgerond | *(geen bericht — het rapport zelf is het bericht)* |

## 5.8 — Vaste juridische regels

Deze drie blijven ongewijzigd en verplaatsen niet.

| Sleutel | Tekst | Waar |
|---|---|---|
| `De` | *Je antwoorden worden standaard alleen in deze browser opgeslagen om je rapport te maken. Verwijder je je browserdata of klik je op 'Antwoorden wissen', dan verdwijnen je antwoorden.* | Formulier, rapportvoettekst, markdown-export |
| `Oe` | *Arcana Profile is bedoeld voor zelfreflectie en persoonlijke ontwikkeling. Het is geen medisch, psychologisch of therapeutisch diagnose-instrument.* | Rapportvoettekst, methodekaart, markdown-export |
| Sitevoettekst | *Arcana Profile is bedoeld voor zelfreflectie en persoonlijke ontwikkeling. Het is geen medisch, psychologisch of therapeutisch diagnose-instrument en niet geschikt voor selectie of beoordeling van anderen. Herken je iets dat zwaarder weegt dan reflectie alleen, bespreek dat dan met je huisarts of een behandelaar.* | Elke pagina |

---

# §6 — Brand review

Getoetst: de volledige bestaande copy uit de bundel én alle tekst die in §2 tot en met §5 van dit
document staat. Drie vragen:

1. Wordt er ergens meer beloofd dan geleverd?
2. Ondergraaft er ergens een claim de disclaimer?
3. Maakt de tekst zelf de belofte *"elke zin komt uit een score"* waar?

**Oordeel vooraf.** Deze site is eerlijker dan negentig procent van wat er in deze categorie
staat. De sectie *Eerlijk gezegd*, het FAQ-antwoord over validatie en de slotzin van het rapport
zijn voorbeelden van een merk dat zijn eigen grenzen durft te benoemen zonder zijn product af te
breken. Er zijn zeven bevindingen, waarvan twee **hoog**. Beide hoge bevindingen zijn interne
tegenspraken: de site spreekt zichzelf tegen, niet de werkelijkheid.

## Bevindingenoverzicht

| # | Bevinding | Waar | Ernst | Actie |
|---|---|---|---|---|
| 6.1 | *"Elke zin komt uit een score"* is aantoonbaar onwaar | Landingskaart 1 | **Hoog** | Herformuleren + uitzondering noemen |
| 6.2 | Herhaalbaarheid over een jaar wordt beloofd én tegengesproken | Landingskaart 2 vs. Voorwaarden | **Hoog** | Herformuleren |
| 6.3 | *"woorden, volledig over jou"* klopt niet voor 8 van 33 hoofdstukken | Statbalk | Middel | Herformuleren |
| 6.4 | *"Zelfinzicht zonder hokjes"* terwijl de uitkomst een archetype is | Hero-eyebrow | Middel | Herformuleren |
| 6.5 | *"Dit rapport staat stevig"* is een geldigheidsclaim | Rapport, betrouwbaarheidszin | Middel | Herformuleren |
| 6.6 | *"Direct je volledige rapport"* wordt gebroken door een laadscherm van 10 s | Hero-geruststelling | Laag | Vervangen (zie #7) of laadscherm inkorten |
| 6.7 | Schaduwteksten zonder ontsnapping in hetzelfde hoofdstuk | Rapport, 5 hoofdstukken | Middel | `ifItDoesNotFit` verplaatsen |

## 6.1 — "Elke zin komt uit een score" (hoog)

**De claim.**

> **Elke zin komt uit een score.** *Geen algemene uitspraken die op iedereen passen. Elke zin in
> je rapport is gekoppeld aan een gemeten score op een specifieke eigenschap.*

**Wat er werkelijk in de bundel staat.** De claim is waar voor het grootste deel van het rapport
en onwaar voor een duidelijk aanwijsbaar deel:

- **De acht beschouwingen.** Elke beschouwing opent met twee `essence`-alinea's die per stuk drie
  gelijkwaardige varianten kennen. De keuze tussen die varianten gebeurt met een seed die deels
  op een score rust, maar de *inhoud* is voor iedereen hetzelfde. De openingszin van *Over
  liefde* — *"Verliefdheid begint bijna altijd als projectie…"* — is een algemene uitspraak die
  per definitie op iedereen past. Dat is legitiem als essay, maar het is het tegendeel van *"geen
  algemene uitspraken die op iedereen passen"*.
- **De Jung-passages.** *"Jung zou hier wijzen op enantiodromie…"*, *"irritatie die groter is dan
  de aanleiding, wijst naar binnen"*, *"Individuatie — Jungs woord voor dit proces — gaat niet
  over iemand anders worden"*. Algemene theorie, in elk rapport identiek.
- **De fallbacks.** Elke beschouwing heeft een `fallback` voor het geval geen enkele regel
  matcht. Die tekst komt voort uit de *afwezigheid* van een score.
- **De slotzin.** *"En tot slot iets wat in geen enkele score staat: je hoeft niet eerst genezen
  te zijn om blij te mogen zijn."* De bundel zegt hier zelf, expliciet, dat deze zin niet uit een
  score komt.

Dat laatste is het bewijs dat dit oplosbaar is zonder iets te verliezen. De schrijver wist dit al
en heeft het op de belangrijkste plek hardop gezegd. De landingspagina is alleen absoluter
geformuleerd dan het product.

**Actie.** Zie §4 rij 13. Kaarttitel wordt *"Bij elke uitspraak staat het cijfer"*, en de
uitzondering wordt in dezelfde kaart genoemd. Daarnaast de deelopening bij deel 5 uit §3.2 en de
herkomstregel per beschouwing uit §3.3.

Dit maakt de claim niet zwakker — het maakt hem waar. En bij een merk dat verkoopt op
narekenbaarheid is een claim die de bezoeker zelf kan falsificeren duurder dan een claim die
iets minder groot is.

## 6.2 — De herhaalbaarheid over een jaar (hoog)

**De claim, op de landingspagina:**

> *Doe je hem over een jaar opnieuw met dezelfde antwoorden, dan krijg je hetzelfde resultaat
> terug.*

**De tegenspraak, op de Voorwaardenpagina:**

> *De test en deze voorwaarden kunnen worden aangepast. Wijzigingen aan de berekening kunnen
> betekenen dat een nieuw rapport afwijkt van een ouder rapport met dezelfde antwoorden.*

Twee zinnen op dezelfde site die elkaar letterlijk tegenspreken. De juridische versie is de
juiste; de marketingversie is de zichtbare. Dat is precies de verhouding die je niet wilt bij een
product waarvan de kernwaarde eerlijkheid is.

**Actie.** Zie §4 rij 14. *"over een jaar"* wordt *"volgende week"* — dezelfde belofte, binnen een
termijn waarin hij ook echt houdbaar is — plus één zin die de uitzondering benoemt (*"Wijzigen we
de berekening, dan staat dat bij je rapport vermeld"*). Die vermelding moet er dan ook komen: de
datumregel uit §3.4.D met `versie {n} van de berekening` maakt de belofte technisch controleerbaar.

## 6.3 — "5.500+ woorden, volledig over jou" (middel)

Twee problemen in één label van vier woorden.

*"5.500+"* is een onderschatting. Let wel op wát er geteld wordt: de 7.559 woorden uit `A` §1
zijn de **volledig gerenderde pagina** (inhoudsopgave, de twaalfrijenlijst bij het wiel, knoppen
en labels meegeteld). De rapporttekst zelf is **5.711 tot 6.327 woorden**, nagemeten met de
engine over acht fixtures — zie `G-rebuild-spec.md` §3, tegenspraak 1. Onderschatten is
sympathiek, maar bij een product dat op narekenbaarheid draait is elk getal dat niet klopt een
gemiste kans om te laten zien dat de getallen kloppen; een getal dat te hóóg is, is erger.

*"volledig over jou"* is de eigenlijke overclaim. Acht van de 33 hoofdstukken bestaan voor het
grootste deel uit algemene essayteksten. Die zijn goed en horen erin, maar ze gaan niet
specifiek over de lezer.

**Actie.** Zie §4 rij 9: **`5.700+`** / `woorden, met de cijfers erbij`. *(Dit advies stond hier eerst op `7.500+`; zie de toelichting hierboven en `G-rebuild-spec.md` §3, tegenspraak 1.)*

## 6.4 — "Zelfinzicht zonder hokjes" (middel)

De eyebrow belooft *zonder hokjes*. Het product levert als hoofduitkomst een archetype met een
naam: `The Seeker`, `The Guardian`. Dat is naar elke redelijke maatstaf een hokje.

Het rapport lost dit netjes op:

> *Dat zijn geen hokjes maar leeswijzers: een manier om vier getallen zo op te schrijven dat je
> jezelf erin herkent. Waar de naam en je eigen ervaring uiteenlopen, is je ervaring leidend.*

Dat is een uitstekend antwoord en het staat op de verkeerde plek: in hoofdstuk 2 van het rapport,
waar alleen mensen komen die al overtuigd waren. De bezoeker die op de landingspagina staat en
twijfelt, ziet alleen de belofte, niet de nuance.

**Actie.** Zie §4 rij 1 en rij 22. De eyebrow wordt de claim die wél waarmaakt wat hij zegt
(*"Zelfinzicht dat je kunt narekenen"*), en de leeswijzer-zin komt naar stap 04 op de
landingspagina.

## 6.5 — "Dit rapport staat stevig" (middel)

Bij een hoge consistentiescore staat er:

> *Je antwoordde consistent. Dit rapport staat stevig.*

*"Staat stevig"* is een uitspraak over geldigheid. Consistentie meet iets anders: of iemand
zichzelf niet tegenspreekt. Iemand kan volkomen consistent een zelfbeeld invullen dat niet
overeenkomt met zijn gedrag — dat is bij zelfrapportage eerder regel dan uitzondering. Over een
instrument zonder normgroep en zonder validatiestudie is *"staat stevig"* precies de zin die de
rest van de site zorgvuldig vermijdt.

Het is bovendien de enige plek in het hele rapport waar zo'n claim staat, wat het makkelijk
oplosbaar maakt.

**Actie.** Zie §4 rij 56: *"Je antwoorden waren consistent. Dat betekent dat de scores hieronder
stabiel zijn — niet dat ze waar zijn."*

## 6.6 — "Direct je volledige rapport" (laag)

De derde geruststelling in de hero belooft *direct*. Het laadscherm duurde bij de meting meer dan
tien seconden. Klein, en toch: het is de eerste belofte die de site breekt, en hij wordt gebroken
op het moment dat de bezoeker het meest geïnvesteerd is.

**Actie.** De regel wordt vervangen door de geruststelling die de scepticus wél helpt (§4 rij 7),
en het laadscherm wordt ingekort (§4 rij 47). Beide fixes doen elkaars werk.

## 6.7 — Psychologische veiligheid in de schaduwhoofdstukken (middel)

Geen overclaim, wel de bevinding met de grootste menselijke impact.

De schaduwteksten zijn uitstekend geschreven en psychologisch scherp. Ze zijn ook stellig. De
standaardformulering is:

> *Wat je niet over jezelf wilt weten, is dat je zoektocht soms een manier is om verplichtingen
> te ontlopen, want zolang je nog op reis bent, hoef je nergens definitief voor te kiezen.*

Dat is een uitspraak in de tweede persoon, over een afweermechanisme, in de stellende wijs. De
retorische constructie — *"wat je niet over jezelf wilt weten"* — is bovendien onweerlegbaar
gebouwd: ontkennen bevestigt hem. Dat is een bekend en riskant patroon in duidingsteksten.

Er staan relativeringen in het rapport, en ze zijn goed:

- `shadow.disclaimer`: *"Dit is geen diagnose en geen tekortkoming — het zijn de plekken waar
  bewustwording het meeste oplevert."*
- `ifItDoesNotFit`: een per archetype geschreven uitweg, bijvoorbeeld *"Misschien leef je nu in
  een fase waarin praktische zekerheid voorrang heeft gekregen, en is de zoektocht naar binnen
  verplaatst in plaats van verdwenen."*

Het probleem is uitsluitend de plaatsing. De eerste staat *vóór* de vijf valkuilen, waar er nog
niets te verzachten valt. De tweede staat in hoofdstuk 33, negentien hoofdstukken verderop. Wie
bij hoofdstuk 14 van slag raakt, leest de troost negentien hoofdstukken later of nooit.

**Actie.** Zie §3.3, type `shadow`. `ifItDoesNotFit` verhuist (of dupliceert, wat de engine
aankan) naar direct onder de valkuilenlijst, plus de regel *"Eén van deze vijf herken je
waarschijnlijk meteen, en de andere vier niet. Neem die ene."*

**Dit is de belangrijkste aanbeveling in dit hele document.** De rest gaat over conversie en
geloofwaardigheid; deze gaat over iemand die om elf uur 's avonds in zijn eentje leest dat zijn
belangrijkste eigenschap een vluchtroute is.

## Zelftoets: mijn eigen teksten

Dezelfde meetlat op §2 t/m §5.

| Mijn tekst | Risico | Oordeel |
|---|---|---|
| *"Drie dingen die je hier wél kunt controleren"* | Claimt controleerbaarheid | Houdbaar: alle drie zijn door de bezoeker zelf na te gaan (cijfer bij elke uitspraak, netwerkverkeer, de disclaimersectie). |
| *"de test rekent, en dat rekenwerk verandert niet"* | Hetzelfde risico als 6.2 | Afgedekt met *"volgende week"* in plaats van *"over een jaar"*, plus de versievermelding. |
| *"het rapport merkt het verschil niet"* (verzonnen naam) | Zou als slordigheid kunnen lezen | Houdbaar: de naam gaat alleen in `et()` en beïnvloedt geen enkele score. Letterlijk waar. |
| *"een rapport dat je bij je naam noemt komt zachter aan"* | Psychologische bewering zonder bron | **Aanpassen bij twijfel.** Het is een plausibele claim die niet uit een meting volgt. Veiliger alternatief: *"We vragen het omdat een rapport dat je bij je naam noemt prettiger leest — zeker op de plekken waar het over je valkuilen gaat."* Dat is een smaakuitspraak in plaats van een psychologische. |
| *"nog ongeveer 13 minuten"* | Een schatting die fout kan zijn | Houdbaar mits het woord *ongeveer* blijft staan en de schatting meebeweegt met het werkelijke tempo. Nooit als hard getal tonen. |
| *"Verschuivingen onder de 10 punten zeggen weinig"* | Getal zonder onderbouwing | **Aandachtspunt.** De 10 is een redactionele keuze, geen gemeten drempel. Ofwel onderbouwen in werkstroom D, ofwel formuleren als: *"Kleine verschuivingen zeggen weinig; wat er precies klein is, weten we niet — er is geen normgroep."* Dat laatste is eerlijker en past beter bij het merk. |
| Deelpagina: *"Jij hebt informatie die de test niet heeft."* | Zou als valse bescheidenheid kunnen lezen | Houdbaar en waar: de test meet uitsluitend zelfrapportage. Dit is de eerlijkste zin op die pagina. |

---

# §7 — Tekstrichtlijn

De synthese. Dit is de meetlat waar alle latere tekst aan moet voldoen — ook de tekst die iemand
anders over een jaar schrijft, zonder deze conversatie gelezen te hebben.

## 7.1 — De stem in één alinea

> Arcana Profile schrijft als een goede therapeut die geen therapeut is: rustig, volwassen,
> precies, en bereid om iets ongemakkelijks te zeggen zonder de stem te verheffen. Hij verkoopt
> niet, hij beschrijft. Hij weet meer dan hij laat merken en zegt minder dan hij weet. Waar hij
> iets niet weet, zegt hij dat — niet als voorbehoud achteraf, maar in dezelfde adem als de
> uitspraak zelf. Hij spreekt de lezer aan als een volwassene die tegen een ongemakkelijke
> waarheid kan, en behandelt hem daar ook naar: geen aanmoediging, geen uitroeptekens, geen
> belofte dat het goed komt.

## 7.2 — De vijf vaste regels

**1. De eerste zin draagt de betekenis.** Geen aanloop, geen opwarming, geen "in deze sectie
bespreken we". De bestaande tekst doet dit al consequent goed: *"Jij brengt rust door
structuur."* — vier woorden, de hele propositie van een archetype.

**2. Eén gedachte per zin, ten hoogste twee per alinea.** De gemiddelde zinslengte in de
bestaande rapportteksten ligt rond de 18 tot 22 woorden. Dat is goed voor dit register. De
uitschieters staan in de hero (53 woorden) en in enkele `shadow`-teksten (tot 65 woorden). Die
zijn te lang, en het zijn niet toevallig precies de plekken waar de lezer het minst geconcentreerd
is (het begin) of het meest geraakt (de schaduwkant).

**3. Ritme met afwisseling, met de kortste zin op het zwaarste moment.** Het patroon dat in de
bestaande teksten het best werkt is lang–lang–kort, waarbij de korte zin de klap uitdeelt:

> *"De schaduw verdwijnt niet als je hem wegkijkt; hij komt terug als projectie, als uitbarsting,
> of als vermoeidheid. Het volhouden van een halve mens kost energie."*

**4. Actief, met een onderwerp dat handelt.** *"De test rekent"*, niet *"de berekening wordt
uitgevoerd"*. Het laadscherm (§4 rij 47) is de enige plek waar deze regel systematisch wordt
overtreden, en daar kost het meteen de merkbelofte.

**5. Elk cijfer met zijn context.** Nooit een getal zonder wat het betekent. De bestaande tekst
doet dit voorbeeldig: *"Je sociale patroon scoort hoog (74/100) — dat zegt niet of je aardig
gevonden wordt, maar hoeveel van jezelf je meeneemt naar het contact."* Getal, kwalificatie,
betekenis, en direct daarachter een grens aan wat het getal níet betekent.

## 7.3 — Aanspreekvorm

- **Je/u volgt de keuze van de gebruiker.** `et(profiel, metNaam, zonderNaam)` en
  `ze(tekst, aanspreekvorm)` regelen dit al. Nooit wisselen binnen een tekst.
- **Wij/we alleen waar er echt iemand achter zit.** *"Nee, en dat zeggen we liever eerlijk"* is
  goed: daar staat een persoon. *"Wij kunnen je rapport niet inzien"* is goed: daar wordt een
  verantwoordelijkheid uitgesproken. Verder is *wij* meestal een uitvlucht — vervang door de
  passieve constructie alleen als er werkelijk geen handelend voorwerp is, en anders door de site
  of de test als onderwerp.
- **De test is een instrument, geen persoon.** Hij *rekent*, *meet*, *volgt*, *zegt*. Hij
  *begrijpt* niet, *vindt* niet en *ziet* niet. Dit onderscheid is de hele reden dat het merk
  geloofwaardig is.
- **De lezer is nooit een "gebruiker" of een "deelnemer".** In de rapporttekst is hij *je*. In
  documentatie zoals dit document mag *de bezoeker*.

## 7.4 — Hoe je over scores praat

Vijf regels, alle vijf afgeleid uit de bestaande methodekaart, die al bijna perfect is.

1. **Altijd de schaal erbij, minstens één keer per weergave.** *"Alle cijfers lopen van 0 tot 100,
   met 50 als midden."*
2. **Hoog is niet beter dan laag.** Letterlijk zeggen, niet impliceren. De bestaande formulering
   is de beste die er is: *"Een lage score op conflict aangaan betekent niet dat je zwak bent;
   hij betekent dat je rust boven confrontatie kiest. Dat heeft voordelen en kosten, en het
   rapport benoemt allebei."*
3. **Het cijfer staat vóór de duiding, niet erna.** *"Je vertrouwensbehoefte (68/100) en
   intimiteitsbehoefte (72/100) bepalen samen hoe snel je mensen echt dichtbij laat komen"* —
   eerst het bewijs, dan de bewering. Andersom is het een bewering met een cijfer als decoratie.
4. **Bij een lage betrouwbaarheid staat dat in dezelfde alinea.** De bestaande kanttekening doet
   dit goed: *"Kanttekening: autonomie steunt hier op relatief weinig antwoorden (betrouwbaarheid
   42%), dus lees deze uitspraak als een aanwijzing, niet als een vaststaand feit — je eigen
   herkenning weegt zwaarder dan het getal."*
5. **De ervaring gaat boven het cijfer, en dat staat er.** Op minimaal drie plekken in het
   rapport: bij `who-you-are`, bij de schaduwkant, en in de samenvatting.

## 7.5 — Hoe je over de schaduwkant praat zonder te kwetsen

Dit is het moeilijkste deel van dit product en tegelijk het best uitgevoerde. Zes regels, waarvan
de bestaande tekst er vijf al volgt.

**1. Benoem de functie, niet het gebrek.** Een afweermechanisme heeft een reden. *"Je zoektocht
is soms een manier om verplichtingen te ontlopen"* — het woord *manier* doet het werk: dit is
iets dat iets oplevert, niet iets dat kapot is.

**2. Geef de kosten én de opbrengst.** Elke schaduwtekst in de bundel noemt wat het patroon
oplevert (*"zolang je nog op reis bent, hoef je nergens definitief voor te kiezen"*) vóórdat hij
de prijs noemt. Dat is de juiste volgorde: wie eerst de opbrengst hoort, voelt zich begrepen en
kan daarna de prijs aan.

**3. Maak het weerlegbaar.** Dit is de regel die de bestaande tekst *niet* consequent volgt. De
constructie *"wat je niet over jezelf wilt weten"* is retorisch gesloten: ontkennen bevestigt.
Bied in hetzelfde hoofdstuk een uitweg die geen ontkenning is — dat is precies wat `ifItDoesNotFit`
doet, en waarom die tekst moet verhuizen (§3.3, §6.7).

**4. Eén tegelijk.** Vijf valkuilen zijn er vier te veel voor wie de eerste op zichzelf betrekt.
*"Neem die ene. De rest kan wachten."*

**5. Nooit de diagnose-toon.** Geen klinische termen (*narcistisch*, *vermijdend gehecht*,
*trauma*), geen prognose, geen "dit komt door je jeugd". De bundel houdt zich hier voorbeeldig
aan: Jung wordt geciteerd als denker, niet als diagnosticus, en altijd als *"Jung zou zeggen"* —
een hypothese, geen vaststelling.

**6. Sluit af met de mens, niet met het patroon.** De slotzin van het rapport is hiervan het
model: *"je hoeft niet eerst genezen te zijn om blij te mogen zijn."*

## 7.6 — Hoe je eerlijk bent zonder je product af te breken

De vier technieken die deze site al gebruikt, expliciet gemaakt zodat ze herhaalbaar zijn.

**Techniek 1 — Het nadeel vóór het voordeel.**
> *"Wis je je browsergegevens, dan is het weg — ook voor ons."*

De kosten van de privacykeuze worden genoemd in dezelfde zin als de keuze. Dat maakt de belofte
geloofwaardig op een manier die geen enkele uitroep kan.

**Techniek 2 — De grens als kenmerk.**
> *"Een instrument dat zijn eigen grenzen niet benoemt, verdient je vertrouwen niet. Daarom hier,
> niet verstopt in de kleine lettertjes."*

De disclaimer wordt een verkoopargument door de plaatsing, niet door de formulering. Dit is de
beste zin op de site en het model voor elke toekomstige disclaimer.

**Techniek 3 — Het precieze nee.**
> *"Nee, en dat zeggen we liever eerlijk. Dit is een reflectie-instrument, geen gevalideerde
> psychologische test. […] Gebruik het als spiegel, niet als bewijs."*

Nee zeggen, uitleggen waarom, en dan zeggen waar het wél voor is. Nooit een nee zonder dat derde
deel.

**Techniek 4 — De zelfbenoemde uitzondering.**
> *"En tot slot iets wat in geen enkele score staat: …"*

Als een tekst de eigen regel overtreedt, benoem dat dan in de tekst zelf. Dat versterkt de regel
in plaats van hem te ondermijnen. Deze techniek is de oplossing voor bevinding 6.1 en zou op
minstens drie plekken meer gebruikt moeten worden.

## 7.7 — Do's en don'ts, met echte voorbeelden

| | Do | Don't |
|---|---|---|
| **Openen** | *"Jij brengt rust door structuur."* | *"Ontdek wie je werkelijk bent."* |
| **Claimen** | *"Bij elke uitspraak staat het cijfer waar hij uit volgt."* | *"Elke zin komt uit een score."* (onwaar voor 8 van 33 hoofdstukken) |
| **Herhaalbaarheid** | *"Doe je hem volgende week opnieuw met dezelfde antwoorden, dan lees je hetzelfde terug."* | *"Doe je hem over een jaar opnieuw…"* (spreekt de Voorwaarden tegen) |
| **Rekenen** | *"De test rekent, en die berekening ligt vast."* | *"Spanningsvelden worden opgebouwd…"* (lijdende vorm; toon van een taalmodel) |
| **Zekerheid** | *"Je antwoorden waren consistent. Dat betekent dat de scores stabiel zijn — niet dat ze waar zijn."* | *"Dit rapport staat stevig."* |
| **Scores** | *"Je sociale patroon scoort hoog (74/100) — dat zegt niet of je aardig gevonden wordt, maar hoeveel van jezelf je meeneemt."* | *"Je scoort hoog op sociale energie."* (getal zonder betekenis) |
| **Schaduw** | *"Dit zijn de plekken waar jouw patroon het snelst doorslaat, niet de plekken waar je faalt."* | *"Wat je niet over jezelf wilt weten…"* zonder uitweg in hetzelfde hoofdstuk |
| **Typering** | *"Dat zijn geen hokjes maar leeswijzers."* | *"Zelfinzicht zonder hokjes"* terwijl het product een archetype levert |
| **Aansporen** | *"Kies er één. Wie aan alles tegelijk begint, verandert doorgaans niets."* | *"Begin vandaag nog met je groeiplan."* |
| **Grenzen** | *"Gebruik het als spiegel, niet als bewijs."* | *"Wetenschappelijk onderbouwd"* (is het niet) |
| **Drempel** | *"Stoppen mag: je komt terug waar je gebleven was."* | *"Slechts 20 minuten van je tijd."* |
| **Afsluiten** | *"De blijdschap ligt niet aan het eind van je groeipad — ze ligt ernaast, de hele weg."* | *"Succes met je reis naar jezelf."* |
| **Leestekens** | punt, komma, gedachtestreepje, dubbele punt | uitroepteken, emoji, beletselteken in lopende tekst |
| **Naamgeving** | `De Zoeker`, `Het Anker` | `The Seeker`, `The Anchor` (Engels op een Nederlandse site) |

## 7.8 — Drie voorbeeldalinea's

Drie stukken tekst die de stem demonstreren, in drie verschillende registers. Alle drie zijn
direct bruikbaar.

### Voorbeeld 1 — Landingspagina, tegen de scepticus

> Je hebt waarschijnlijk eerder zo'n test gedaan. Je kreeg een type, een kleur of vier letters,
> en een tekst die verdacht goed klopte tot je hem aan iemand anders liet lezen en zag dat die
> zich er ook in herkende. Dat is geen toeval en geen kwade opzet: een beschrijving die vaag
> genoeg is, past altijd. Hier is het anders geprobeerd. Je krijgt bij elke uitspraak het cijfer
> te zien waar hij uit volgt, en dat cijfer volgt uit jouw antwoorden op een manier die je kunt
> nalopen. Of dat cijfer klopt, weet je zelf het beste — en waar het en jouw ervaring uiteenlopen,
> zegt dit rapport zelf dat je ervaring voorgaat.

*Wat hier gebeurt: het bezwaar wordt eerst volledig uitgesproken, inclusief de reden waarom het
terecht is. Pas daarna komt het tegenargument, en dat tegenargument eindigt met een concessie.
Zeven zinnen, geen enkel bijvoeglijk naamwoord dat het product prijst.*

### Voorbeeld 2 — Rapport, een schaduwhoofdstuk met de nieuwe afsluiter

> Je behoefte aan controle (76/100) is een van de sterkste scores in je profiel, en hij verklaart
> waarom je rustiger wordt van een plan dan van een belofte. De keerzijde staat hieronder.
>
> Wat je niet over jezelf wilt weten, is dat die behoefte vaker uit angst ontspringt dan uit
> overzicht. Toegeven zou de degelijke buitenkant aantasten die je zorgvuldig hebt opgebouwd. Bij
> anderen veroordeel je slordigheid, terwijl je eigenlijk jaloers bent op het gemak waarmee zij
> loslaten wat jij vastklemt.
>
> **Wat je hiermee kunt.** Eén van de vijf punten hierboven herken je waarschijnlijk meteen, en
> de andere vier niet. Neem die ene. De rest kan wachten, of kan niet kloppen — dat mag ook.
>
> **Als dit niet klopt.** Mogelijk leef je in een omgeving waar structuur bieden niet gewaardeerd
> of zelfs onmogelijk is, waardoor dit patroon zich niet kan tonen. Het kan ook zijn dat je die
> behoefte aan grip vroeger hebt afgeleerd omdat vasthouden destijds averechts werkte, waardoor je
> haar nu niet meer als van jou herkent. Een lage score op een valkuil betekent niet dat hij er
> niet is, en een hoge score niet dat je hem elke dag hebt. Dit zijn de plekken waar jouw patroon
> het snelst doorslaat, niet de plekken waar je faalt.

*Wat hier gebeurt: het cijfer komt vóór de duiding. De confrontatie staat er onverkort, want
afzwakken zou de tekst waardeloos maken. Maar de uitweg staat in hetzelfde hoofdstuk, op dezelfde
schermvulling, en hij is inhoudelijk — geen "onthoud dat je goed bent zoals je bent" maar twee
concrete alternatieve verklaringen.*

### Voorbeeld 3 — Een grens benoemen zonder het product af te breken

> Deze test meet hoe je jezelf beschrijft. Dat is minder dan het lijkt: alle 120 antwoorden komen
> van jou, dus wat eruit komt is je zelfbeeld en niet je gedrag. Iemand die zichzelf consequent
> te streng of te mild beoordeelt, krijgt een rapport dat consequent klopt met dat oordeel en
> niet met de werkelijkheid. Er is geen normgroep die dat corrigeert en geen validatiestudie die
> het toetst. En het is ook meer dan het lijkt: hoe je jezelf beschrijft, is zelf een feit met
> gevolgen. Het bepaalt welke kansen je ziet, welke gesprekken je aangaat en welke risico's je
> vermijdt. Dat is de moeite van 120 vragen waard, zolang je onthoudt wat er precies gemeten is.

*Wat hier gebeurt: het zwaarste bezwaar tegen het hele product wordt vrijwillig, volledig en als
eerste opgeschreven. Pas daarna komt de verdediging, en die verdediging claimt niets meer dan
waar is. De laatste bijzin (*"zolang je onthoudt wat er precies gemeten is"*) laat het voorbehoud
staan in plaats van het weg te poetsen.*

---

## Wat er als eerste moet gebeuren

In volgorde, met de reden erbij.

1. **§6.2 en §6.1 — de twee interne tegenspraken.** Twee zinnen wijzigen. Een site die op
   eerlijkheid verkoopt en zichzelf op twee plekken tegenspreekt, verliest precies de bezoeker
   die hij wil overtuigen. Kost een half uur.
2. **§6.7 — `ifItDoesNotFit` naar het schaduwhoofdstuk.** De tekst bestaat, is goed, staat op de
   verkeerde plek. Dit is de enige bevinding in dit document die over iemands avond gaat en niet
   over een conversiecijfer.
3. **§4 rij 47 — het laadscherm.** De enige plek waar de vorm het tegendeel zegt van de
   merkbelofte. Drie zinnen schrappen.
4. **§1.1 en §2 — de propositie naar boven.** Het "waarom dit anders is"-blok direct onder de
   hero, de h1 wordt de belofte in plaats van de merknaam. Dit is de grootste conversie-ingreep
   en hij vraagt om een designbeslissing uit werkstroom B.
5. **§3.1 — de zelfstandige samenvatting bovenaan het rapport.** De ingreep die van een lezing
   een naslagwerk maakt.
6. **§4 rij 39 — `Liever zonder naam`.** De functie bestaat al in de engine. Eén knop.
7. **§3.5 — het deelbare hoofdstuk.** De enige groeimotor die dit product bezit.

Alles daarna: §4 in volgorde, §5 tijdens de bouw, §7 als de vaste meetlat.

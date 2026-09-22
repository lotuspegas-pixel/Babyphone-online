# F — Verdienmodel en doelgroepen

**Werkstroom F van de rebuild van Arcana Profile.**
Onderzoek uitgevoerd op 22 september 2026. Bouwt voort op `SITE-INVENTARIS.md`, `A-baseline.md`,
`C-tekst-en-rapport.md` en `E-usp-en-landing.md`. Het concurrentie- en prijsonderzoek uit
werkstroom E wordt hier niet overgedaan en nergens tegengesproken; waar E een prijspunt of een
oordeel al heeft vastgesteld, staat er een verwijzing naar de paragraaf.

Dit is het werkdocument achter de beslisnotitie `F-verdienmodel.docx`. De notitie bevat het
besluit; dit document bevat de afweging, de berekening en de bronnen. Het rekenmodel zelf staat
in `F-pricing-segmenten.xlsx`.

> **Wat ik niet weet, vooraf gezegd.** Er is geen analytics op `arcanaprofile.com`
> (`A-baseline.md` §4). Er is dus geen bezoekersaantal, geen start-rate, geen afrondingsrate en
> geen enkel conversiecijfer. Waarschijnlijk is het bezoek op dit moment bovendien kunstmatig
> laag, omdat de canonical naar een ander domein wijst en de site daardoor vermoedelijk niet
> geïndexeerd is (`E-usp-en-landing.md` §3.2). Elk getal in de trechter hieronder is een
> aanname met een reden erbij, gelabeld als aanname, en het model is zo gebouwd dat het werkt
> op het moment dat de echte cijfers er zijn. Wie dit document leest als voorspelling, leest
> het verkeerd.

---

## Inhoud

1. [De paradox](#1--de-paradox)
2. [De afweging per model](#2--de-afweging-per-model)
3. [Het besluit](#3--het-besluit)
4. [Segmentanalyse](#4--segmentanalyse)
5. [Prijsindicatie en berekening](#5--prijsindicatie-en-berekening)
6. [Plan van aanpak](#6--plan-van-aanpak)
7. [Risico's](#7--risicos)
8. [Wat dit document niet oplost](#8--wat-dit-document-niet-oplost)
9. [Bronnen](#bronnen)

---

# 1 — De paradox

## 1.1 De zin die niet mag sneuvelen

Op de site staat letterlijk: *"Er is geen server en geen account."* Die zin is een van de vijf
USP's uit werkstroom E, hij is verifieerbaar waar (`A-baseline.md` §2.5 en §7: **zes**
localStorage-sleutels — `arcana_answers`, `arcana_current_question`, `arcana_result`,
`arcana_profile`, `arcana_started_at`, `arcana_completed_at` — geen netwerkverkeer na het
laden, geen cookies, geen trackers), en hij is in de
Nederlandse markt bijna uniek: `gratispersoonlijkheidstest.nl` rekent je LinkedIn-profiel plus
een bericht op je tijdlijn als prijs voor "gratis", en vraagt €9,95 om dat níet te doen
(`E-usp-en-landing.md` §2.2). Tegen die achtergrond is *geen account, geen e-mailadres, geen
server* geen detail maar het hele verschil.

Tegelijk is er niets te verdienen aan een site die geen enkele transactie kan uitvoeren. Dat is
de paradox, en `E-usp-en-landing.md` §2.5 benoemt hem al als openstaande vraag: het Enneagram
Institute heeft dezelfde eerlijkheidspositie als Arcana én een prijskaartje dat die positie
draagt. *"Wij verkopen je gegevens niet want je betaalt ons"* is een eenvoudiger verhaal dan
*"wij verkopen je gegevens niet en het is gratis"*. Op de vraag **waar verdienen jullie dan
aan** heeft Arcana vandaag geen antwoord op de pagina staan, en dat gat is op een site die op
eerlijkheid verkoopt duurder dan het lijkt.

## 1.2 De oplossing: de grens ligt bij de gegevens, niet bij het geld

De belofte gaat niet over de afwezigheid van infrastructuur. Hij gaat over waar de antwoorden
en het rapport zijn. De zin *"er is geen server waar ze naartoe gaan"* zegt iets over *ze* — de
antwoorden. Een betaling is geen antwoord.

Daarmee is de paradox oplosbaar zonder de belofte te verzwakken, mits het verdienmodel aan drie
voorwaarden voldoet:

| Voorwaarde | Wat hij uitsluit |
|---|---|
| **1. Geen antwoord en geen rapportregel verlaat het apparaat, ook niet versleuteld.** | Cloud-opslag, synchronisatie, server-side rendering, e-mailbezorging van het rapport, elke vorm van "wij bewaren het voor je". |
| **2. Geen account, geen inlog, geen verplicht e-mailadres om het product te gebruiken.** | Registratiemuren, "vul je e-mail in voor je rapport", nieuwsbriefkoppelingen, sociale inlog. |
| **3. Wat gratis is, blijft gratis en blijft compleet.** | Een betaalmuur op een van de 33 bestaande hoofdstukken, een "premium-inzicht" dat uit het huidige rapport wordt gelicht, een ingekorte gratis versie. |

Wat daar wél binnen past: **een eenmalige betaling voor iets dat níet uit het rapport wordt
weggenomen maar eraan wordt toegevoegd, en dat volledig lokaal wordt gemaakt.** De betaling
loopt via een betaaldienstverlener; wat er terugkomt is een ondertekende sleutel die de browser
zelf controleert. Daarna is er geen verkeer meer, precies zoals nu.

Concreet: de bezoeker die betaalt, krijgt een knop die een generator ontgrendelt die in zijn
eigen browser draait, op het rapport dat al in zijn eigen localStorage staat. De server heeft
op geen enkel moment de inhoud gezien. Hij heeft gezien dat er €9 is betaald, en dat is alles
wat een betaaldienstverlener sowieso ziet.

## 1.3 De copyconsequentie

Eén zin moet preciezer worden. Niet zwakker — preciezer.

| Nu | Na |
|---|---|
| "Er is geen server en geen account." | "Je antwoorden en je rapport blijven op je eigen apparaat. Er is geen account en er is geen server waar ze naartoe gaan." |

Dat is geen verzwakking maar een verscherping: de huidige zin belooft iets over de
infrastructuur en de nieuwe belooft iets over de gegevens, wat sterker en beter te controleren
is. `C-tekst-en-rapport.md` §7.6 noemt dit de techniek van de grens als kenmerk, en de FAQ kan
de vraag *waar verdienen jullie aan* nu voor het eerst eerlijk beantwoorden.

Daarbij hoort één regel die nergens verstopt mag staan, in de geest van `C` §7.6, techniek 1
(het nadeel vóór het voordeel):

> *De bewaar-versie wordt in je eigen browser gemaakt, uit het rapport dat daar al staat. Wij
> zien je rapport niet en kunnen het niet terugsturen. Verlies je de sleutel, dan kunnen we hem
> niet herstellen — we weten niet wie je bent.*

Dat is een nadeel, het staat vóór de knop, en het is precies het soort zin waarmee dit merk
elders zijn geloofwaardigheid koopt.

---

# 2 — De afweging per model

De gewogen tabel staat in `F-pricing-segmenten.xlsx`, tabblad **Verdienmodellen**, met de
gewichten als invoercellen. Hieronder de argumentatie achter de scores.

## 2.1 Betaalde bewaar-versie van het volledige rapport — **primair**

**Wat het is.** De inhoud blijft gratis en compleet op het web: alle 33 hoofdstukken, alle
cijfers, niets afgedekt. Wat je koopt is de vórm:

- een getypografeerde PDF van het volledige rapport, met het scorewiel als vector in plaats van
  een canvas-rastertje. **Let op waar het argument wél en niet op rust.** Het canvas is niet
  ontoegankelijk: het heeft `role="img"`, een `aria-label` van 270 tekens en een
  `aria-describedby` naar een zichtbare lijst van twaalf rijen met de dimensies en hun scores
  (`A-baseline.md` §3.6, correctieblok na werkstroom D). Voor een schermlezer is het wiel dus
  gewoon leesbaar, en dát is geen verkoopargument. Wat er wél aan mankeert, en wat de
  vector-PDF repareert, zijn drie dingen: het beeld wordt **bij printen en PDF-export gerasterd
  op schermresolutie**, de **dimensielabels in het beeld zijn pixels en dus niet selecteerbaar
  of doorzoekbaar**, en het **schaalt niet mee met de zoom van de browser**. Juist voor het
  element dat de bezoeker het liefst print en deelt, is dat de verkeerde techniek — dat
  repareren is reëel werk met reële waarde. Daar komen twee gronden uit `G-rebuild-spec.md` §3
  tegenspraak 2 bij: de overgang naar SVG maakt het wiel ook geschikt voor de donkere modus en
  laat de nieuwe dimensiekleuren met hun grotere onderlinge ΔE2000-afstand toe;
- een inhoudsopgave met paginanummers, kopregels en een drukbare bladspiegel voor 5.700+ woorden
  over 33 hoofdstukken;
- de deelpagina uit `C-tekst-en-rapport.md` §3.5 als losse eenpagina-PDF, met de eigen aanhef
  aan de ontvanger en de eigen disclaimer;
- een datumstempel, zodat een herhaalmeting over een jaar iets heeft om tegen af te zetten
  (`C` §6.2).

**Waarom dit binnen de belofte past.** De PDF wordt in de browser gemaakt uit `arcana_result`
in localStorage. De betaling ontgrendelt de generator, niet de inhoud. Geen adres, geen
e-mailadres, geen account nodig: de sleutel en de bon staan op de bevestigingspagina en zijn
downloadbaar.

**Waarom dit werkt als product.** `C-tekst-en-rapport.md` §1, moment 7 beschrijft het probleem
dat dit oplost: drie maanden later is het rapport er nog, maar alleen als de browsergegevens
niet gewist zijn. De bewaar-versie is het antwoord op een echte angst die het product zelf
oproept, en hij is het enige onderdeel dat de gebruiker permanent in handen krijgt.

**Wat het kost aan merk.** Niet nul. Er staat straks een prijs op een pagina die tot nu toe
niets verkocht, en `E-usp-en-landing.md` §1.2 waarschuwt terecht dat *gratis* in deze categorie
gelezen wordt als "de eerste vijf procent is gratis". Daarom drie harde randvoorwaarden:

1. De knop staat **na** het rapport, nooit ervoor en nooit ernaast.
2. Op de landingspagina staat het woord *betalen* nergens boven de vouw. In de FAQ staat het wél,
   volledig, als antwoord op *waar verdienen jullie aan*.
3. Er verdwijnt geen enkel woord uit het gratis rapport. Wie dat ooit overweegt, verspeelt het
   enige argument dat op 123test standhoudt (`E` §2.2).

**Gewogen score: 71%** — de hoogste in de tabel.

## 2.2 Donaties / betaal wat je wilt — **secundair**

**Wat het is.** Eén regel na het rapport, met een bedrag dat de bezoeker zelf kiest, en een
zin die zegt waar het heen gaat. Geen popup, geen herhaling, geen herinnering.

**Waarom dit erbij hoort.** Twee redenen die niets met omzet te maken hebben. Ten eerste is dit
het directe antwoord op het gat uit `E` §2.5: er staat straks zichtbaar op de site waar dit
product van bestaat, en dat is op een site die op eerlijkheid verkoopt meer waard dan het
bedrag dat het oplevert. Ten tweede bedient het het segment dat de bewaar-versie niet nodig
heeft maar wel iets wil terugdoen — vooral segment 4, de privacybewuste professional, die
precies dit soort gebaren maakt bij software die niets van hem vraagt.

**Wat het niet is.** Geen verdienmodel. Het onderzoek van Overney e.a. (ICSE 2020) naar
donaties in open source vond een **mediaan van $55 over negen maanden** per project dat om
donaties vraagt; 5% van de npm-projecten en 10% van de GitHub-projecten haalde meer dan $1.000
per maand. De 8%-conversie die in de fondsenwervingsbranche als benchmark geldt (Funraise,
2026) is niet van toepassing: dat percentage geldt voor bezoekers die mét donatie-intentie op
een donatiepagina landen. Hier is dat niet het geval. In het model staat daarom 0,3% /
1,0% / 2,5% van de afronders.

**Gewogen score: 70%** — praktisch gelijk aan de primaire keuze, en dat komt doordat dit model
op geen enkele as iets kost. Het staat tweede omdat het op de as die ertoe doet, opbrengst,
bijna niets levert.

## 2.3 Gedrukt keepsake-rapport (print-on-demand) — **geparkeerd, geen model**

**De marge klopt.** Print API rekent voor een A5-hardcover €7,15 excl. voor de eerste 24
pagina's plus €0,18 per extra pagina; een boek van 60 pagina's komt op circa €13,60 excl.
Verkoop tegen €39 laat na druk, verzending en transactiekosten ongeveer €19 over per exemplaar.

**Het volume klopt niet, en de last is reëel.** Bij het verwachte scenario levert het circa €14
per maand op (`F-pricing-segmenten.xlsx`, tabblad Prijsscenario's, blok *Fase 3*). Daar staan
tegenover: een adres dat je dan wél moet opslaan, retouren, drukfouten, klantcontact, en een
rapport dat naar een drukker gaat — de enige route in dit document waarbij de inhoud het
apparaat echt verlaat. Dat is verdedigbaar omdat de gebruiker het zelf en eenmalig doet, net
als printen, maar het is een uitzondering en geen basis.

**Oordeel.** Een uitbreiding van de bewaar-versie, niet een model ernaast. Pas overwegen bij
meer dan 3.000 bezoekers per maand en een bewezen conversie van ten minste 3% op de digitale
versie. **Gewogen score: 49%.**

## 2.4 Premium-upgrade op bestaande hoofdstukken — **afgewezen**

**Dit is commercieel het sterkst en het is precies wat niet mag.** `E-usp-en-landing.md` §1.1
stelt vast dat *gratis* als toegangsprijs geen onderscheid is, maar als *volledig rapport zonder
betaalmuur* wél. Dat is de enige formulering waarin de claim houdt. `E` §2.2 gebruikt hem
vervolgens tegen 123test (verhaal achter €14,95), Testcentrum Groei (twee van vijf dimensies
gratis, rest €17,50) en 16personalities (circa 5% van de inzichten gratis, rest €29).

Een betaalmuur op de 33 hoofdstukken maakt Arcana de volgende in die rij. Het verschil dat op
123test standhoudt — *"hun cijfers zijn beter onderbouwd, hun verhaal staat achter €14,95, bij
ons zijn het verhaal én de cijfers gratis"* — verdwijnt op de dag dat dit wordt ingevoerd.

Dit is een merkbeslissing, geen prijsbeslissing. **Gewogen score: 55%**, en dat die score hoger
is dan die van het geparkeerde keepsake laat precies zien wat de tabel niet kan uitdrukken.

## 2.5 Opt-in versleutelde cloud-opslag — **afgewezen**

Dit is het model dat de kernzin het meest direct onwaar maakt. Ook bij end-to-end-versleuteling
en volledig opt-in geldt:

- er is dan **wel** een server, en die bewaart versleutelde rapporten over de schaduwkant van
  mensen;
- er is dan **wel** een account, of iets dat er functioneel identiek aan is (een sleutel, een
  herstelprocedure, een wachtwoord);
- er ontstaat een verwerkersrol onder de AVG, een bewaartermijnbeleid, een meldplicht bij een
  datalek en een inbraakoppervlak dat er vandaag niet is;
- de kosten lopen door zolang de laatste gebruiker bestaat, terwijl de opbrengst eenmalig is.

En de betalingsbereidheid is laag om een reden die inhoudelijk is: **de groep die dit product
kiest, kiest het omdat er niets bewaard wordt.** Je verkoopt opslag aan mensen die zijn gekomen
voor de afwezigheid van opslag. **Gewogen score: 8%**, de laagste in de tabel.

## 2.6 B2B / coach-licentie, white-label — **afgewezen**

Dit is het model dat er commercieel het aantrekkelijkst uitziet en dat om drie redenen niet kan.

**Eén: het botst frontaal met de eigen grens.** In de sectie *Eerlijk gezegd* staat: *"Geen
selectie- of beoordelingsinstrument. Niet gemaakt om anderen mee te meten."*
`E-usp-en-landing.md` §5.11 markeert die sectie als onaantastbaar, woord voor woord, en `C` §4
rij 26 doet hetzelfde. Een coach die het instrument mét een cliënt gebruikt valt daar
misschien nog net buiten. Maar white-label betekent dat het rapport de browser van de invuller
verlaat om bij iemand anders terecht te komen, en dan is de privacybelofte voor die stroom weg.
De helling van coach naar loopbaanadviseur naar HR naar selectie is kort en van buitenaf niet te
bewaken. Zodra er één werkgever een sollicitant hiermee beoordeelt, is dat het verhaal — en de
site heeft dan zelf op vier plekken opgeschreven dat dat niet mocht.

**Twee: deze markt koopt deugdelijkheid, en die is er niet.** NOA vraagt vanaf €24,95 per
afname met een normgroep die gewogen is naar geslacht, leeftijd, opleidingsniveau en
etnisch-culturele achtergrond. TestGroup vraagt €15 tot €110 per afname, met
abonnementen van €1.495 tot €11.850. De WPV van Ixly heeft een COTAN-beoordeling. Arcana heeft
geen normgroep, geen validatiestudie en twaalf zelf ontworpen dimensies, en zegt dat zelf op
vier plekken (`E` §2.1, *Big Five-aanbieders algemeen*). In een verkoopgesprek met een
HR-afdeling is dat geen nuance maar een diskwalificatie.

**Drie: het is de duurste verkoop die er is.** Zakelijke verkoop betekent offertes, contracten,
verwerkersovereenkomsten, support met een reactietermijn en een gesprek per klant. Dat is een
ander bedrijf dan dit, gerund door één software-engineer.

**Wat er wél moet gebeuren.** Segment 2 (zie §4) zal deze vraag stellen — *"mag ik dit met mijn
cliënten gebruiken?"* — en dat is een goed teken. Het antwoord is een nee dat uitlegt waarom, in
de FAQ:

> *Een cliënt die zelf de test doet en er iets uit meeneemt naar een gesprek: graag. Een
> begeleider die het afneemt, de uitkomst inziet en er een oordeel op baseert: daar is dit niet
> voor gemaakt en daar is het niet goed genoeg voor. Daarvoor bestaan instrumenten met een
> normgroep en een COTAN-beoordeling; die kosten geld en dat is terecht.*

**Gewogen score: 39%.**

## 2.7 Partnerships en affiliate — **afgewezen**

De geloofwaardigheid van dit product berust erop dat het je niets probeert te verkopen. Eén
affiliate-link naar een boek onder een schaduwhoofdstuk maakt van elke uitspraak in dat
hoofdstuk een verkoopargument, met terugwerkende kracht over alle 33 hoofdstukken: de lezer
gaat zich afvragen of de tekst zo geschreven is omdát er iets bij verkocht wordt. Goedkoop te
bouwen, duurder dan elk ander model op deze lijst. **Gewogen score: 44%.**

Eén uitzondering die geen affiliate is: een lijst met doorverwijzingen zónder vergoeding —
huisarts, POH-GGZ, 113, en de professionele testaanbieders voor wie iets nodig heeft dat
gevalideerd is. Dat is geen verdienmodel maar het versterkt de positie, en `E` §2.5 laat zien
dat eerlijk doorverwijzen naar een sterkere partij dit merk consequent sterker maakt.

## 2.8 Advertenties — **afgewezen, niet bespreekbaar**

Advertentienetwerken brengen trackers mee. Dat is het einde van zes localStorage-sleutels en
verder niets (`A-baseline.md` §2.5 en §7). **Gewogen score: 18%.**

---

# 3 — Het besluit

> **Primair: een eenmalige betaalde bewaar-versie van het volledige rapport — €9.**
> De inhoud blijft gratis en compleet op het web. Betaald wordt de uitvoering: een
> getypografeerde PDF met het scorewiel als vector (vectorprint, selecteerbare labels,
> zoomvast — níet: een tekstalternatief, dat heeft het canvas al), een inhoudsopgave, een
> drukbare bladspiegel voor 5.700+ woorden en de deelpagina als losse eenpagina-PDF. De PDF wordt in de browser gemaakt uit het rapport
> dat daar al staat; de betaling ontgrendelt alleen de generator. Geen account, geen
> e-mailadres, geen enkele rapportregel die het apparaat verlaat.
>
> **Secundair: donaties / betaal wat je wilt, één regel na het rapport.**
> Niet om het geld — om de vraag *waar verdienen jullie aan* op de pagina te kunnen
> beantwoorden, en om het segment te bedienen dat de PDF niet nodig heeft.

**Afgewezen, met reden:** betaalmuur op bestaande hoofdstukken (vernietigt de enige claim die op
123test standhoudt), cloud-opslag (maakt de kernzin onwaar en verkoopt opslag aan mensen die
kwamen voor de afwezigheid ervan), B2B/coach-licentie (botst frontaal met *niet gemaakt om
anderen mee te meten*, en deze markt koopt deugdelijkheid die er niet is), affiliate en
advertenties (maken van elk hoofdstuk een verkoopargument, respectievelijk halen trackers
binnen).

**Geparkeerd:** het gedrukte keepsake-rapport, als uitbreiding van de bewaar-versie vanaf 3.000
bezoekers per maand.

**En het belangrijkste getal uit het hele model:** bij het verwachte scenario levert dit
ongeveer **€72 netto per maand** op, ofwel **€864 per jaar**. Dat is geen inkomen. Het is
hosting plus een bescheiden herinvestering. De knop waar dit product aan moet draaien is niet de
prijs — het is het bezoek. Zie §5.4.

---

# 4 — Segmentanalyse

Vier segmenten. Ze zijn afgeleid uit de vier situaties in de sectie *Voor wie*
(`E-usp-en-landing.md` §5.10 noemt die de best geschreven sectie van de pagina, ongewijzigd te
laten) en uit het positioneringsstatement in `E` §1.4. De tabelvorm met omvang,
betalingsbereidheid en aanname-risico staat in `F-pricing-segmenten.xlsx`, tabblad
**Segmenten**.

## 4.1 Segment 1 — De scepticus met een besluit

**Wie.** Een volwassene op een kantelpunt: baanwissel, relatie, een patroon dat vastloopt. Deed
eerder MBTI, DISC of Insights en geloofde het achteraf niet. Zoekt niet naar een test maar naar
iets dat standhoudt.

**Waarom dit het kernsegment is.** `E` §1.2 stelt vast dat *narekenbaar* de spits is omdat het
het enige antwoord is op het enige bezwaar dat telt: *"is dit weer zo'n test?"* Dit segment is
de belichaming van dat bezwaar. Het is ook het segment dat het rapport helemaal leest, de test
zorgvuldig invult en het aan anderen aanbeveelt mét een argument erbij.

**Bereikskanaal: SEO op vergelijkende en kritische zoektermen, met het voorbeeldrapport als
landingspagina.** Niet "persoonlijkheidstest" — die term is bezet door 123test,
`gratispersoonlijkheidstest.nl` (exacte-match-domein) en 16personalities, en daar is niet tegen
op te bieden. Wel: *is MBTI betrouwbaar*, *alternatief voor MBTI*, *waarom wordt MBTI
afgeraden*, *welke persoonlijkheidstest is wetenschappelijk*. Dat is precies het veld waarover
de Nederlandse vakpers al jaren schrijft (ManagementSite, Werf&, Kritisch Denken — zie de
bronnen in `E`). Wie zo zoekt, zoekt geen test maar een oordeel, en het voorbeeldrapport uit
`E` §5.9 is de enige landingspagina die dat oordeel kan geven zonder 25 minuten te vragen.

**Betalingsbereidheid: hoog.** Dit segment heeft het rapport gelezen voordat het iets koopt, en
koopt dan iets dat het wil bewaren.

**Aanname-risico.** De zoekintentie is *wetenschappelijk* en het aanbod is *narekenbaar*. Dat is
niet hetzelfde, en op de as deugdelijkheid verliest Arcana van 123test, Truity, NOA en Ixly
(`E` §2.4, de derde as). De landingspagina moet dat verschil binnen vijf seconden eerlijk maken,
anders komt het verkeer wel binnen en gaat het weer weg.

## 4.2 Segment 2 — De zelfonderzoeker in begeleiding

**Wie.** Iemand die in therapie, coaching of een loopbaantraject zit en zelf materiaal zoekt om
mee terug te komen. Leest het rapport twee keer en gebruikt het in een gesprek. Correspondeert
met de kaart *"Je werkt aan jezelf, met of zonder begeleiding"* uit *Voor wie*.

**Bereikskanaal: het deelbare hoofdstuk.** `C-tekst-en-rapport.md` §3.5 beschrijft dit
hoofdstuk als het meest onderbenutte onderdeel van het hele product en noemt het *"het enige
deel van dit product dat organisch kan groeien: wie deze pagina krijgt, ziet aan de onderkant
waar hij vandaan komt."* Dat is hier de distributie. De cliënt neemt één pagina mee naar zijn
begeleider; de begeleider ziet de herkomst; sommige begeleiders noemen het bij een volgende
cliënt. Dat is **geen B2B-verkoop** — het is circulatie langs professionals zonder dat er iets
aan hen verkocht wordt, en het is daarmee het enige deel van de B2B-waarde dat binnen de belofte
past.

Daarnaast: fora, patiëntenverenigingen, Reddit-gemeenschappen rond therapie en burn-out.

**Betalingsbereidheid: hoog.** Dit segment heeft een concreet gebruik voor een PDF met een
datum erop.

**Aanname-risico.** Dit segment trekt de B2B-vraag aan. Die vraag moet beantwoord worden met
het nee uit §2.6, en die vraag zal vaker komen naarmate het segment groeit. De verleiding is het
risico.

## 4.3 Segment 3 — De doorgestuurde

**Wie.** Kreeg de link van een partner, vriend of collega met *"moet je eens doen"*. Heeft geen
bezwaar en geen haast. `E` §4, variant A beschrijft hem precies: geremd door traagheid, niet
door wantrouwen.

**Bereikskanaal: de deelpagina en de OG-deelkaart.** Het goedkoopste kanaal dat er is, en het
werkt vandaag aantoonbaar niet: `og:url` en `og:image` wijzen naar `speaktoart.com`, dus elke
gedeelde link in WhatsApp, LinkedIn of Slack toont de verkeerde afzender en mogelijk een lege
kaart (`E` §3.2, gevolgen 3 en 4). Dit is de reden dat de domeinfix in het plan van aanpak vóór
alles staat: hij kost een half uur en hij repareert het belangrijkste groeikanaal.

**Betalingsbereidheid: laag.** Deze groep drukt de gemiddelde conversie en dat is in orde — het
is volumeverkeer dat de andere segmenten voedt.

**Aanname-risico.** Het aandeel van 35% is het zwakste getal op het tabblad Segmenten. Zonder
werkende deelkaart is het vandaag vermoedelijk veel lager; na de fix en na de deelpagina
mogelijk veel hoger. Het is de aanname die het snelst zal moeten worden bijgesteld.

## 4.4 Segment 4 — De privacybewuste professional

**Wie.** IT'er, jurist, journalist, arts. Doet principieel geen gratis test, juist omdát die
gratis is, en weet wat er meestal tegenover staat. Herkent wel wat *"de test rekent, er gaat
niets weg"* technisch betekent.

**Bereikskanaal: technische gemeenschappen en het bewijs zelf.** Tweakers, Hacker News,
`r/thenetherlands`, mastodon-kringen rond privacy. Wat dit segment overtuigt is geen tekst maar
de netwerktab van de browser: na het laden van de bundel gebeurt er niets meer (`A-baseline.md`
§2.4). De pagina *Zo wordt het gerekend* uit `E` §5.9 is voor dit segment de landingspagina.

**Betalingsbereidheid: zeer hoog.** Dit is het segment dat betaalt voor software die niets van
hem vraagt, en dat doneert zonder er iets voor terug te willen.

**Aanname-risico.** Kleinste groep, en tegelijk het segment dat een betaalmuur het scherpst
afstraft. Als de bewaar-versie ook maar íets lijkt op een gegijzeld rapport, is dit het eerste
segment dat vertrekt en het luidste dat erover schrijft. Dat is de belangrijkste reden voor de
drie randvoorwaarden in §2.1.

## 4.5 Waarom er geen vijfde segment is

Twee groepen die zich opdringen en die bewust buiten de lijst blijven.

**HR en werkgevers.** Zie §2.6. Niet een segment dat onderbediend wordt, maar een segment dat
het product uitdrukkelijk afwijst.

**Mensen die snel een deelbaar type willen.** Dat is de markt van 16personalities, en die is
niet te winnen: een vierlettercode is sociale valuta, er zijn memes over, en de test duurt tien
minuten in plaats van vijfentwintig (`E` §2.1). Arcana heeft geen equivalent en moet er ook geen
maken — een "deel je archetype"-kaart zou precies het hokje toevoegen dat de eyebrow
*ZELFINZICHT ZONDER HOKJES* belooft weg te laten.

---

# 5 — Prijsindicatie en berekening

## 5.1 De prijs: €9

| Anker | Prijs | Wat je ervoor krijgt |
|---|---|---|
| 123test, uitgebreid PDF-rapport | €14,95 (van €24,95) | 45 pagina's, gevalideerd model, normgroep |
| Testcentrum Groei, uitgebreid rapport | €17,50 (actie €15,00) | Volledige Big Five in plaats van twee dimensies |
| Truity, Big Five | circa $9 | 17 pagina's, gepubliceerde betrouwbaarheidsdocumentatie |
| 16personalities Premium Career Suite | €29 | 40+ pagina's, plus vijf AI-carrièrementoren |
| Enneagram Institute RHETI | $20 | Scores op negen types |
| NOA MPT-BS | vanaf €24,95 per afname | Gewogen normgroep, zakelijk |
| **Arcana Profile, bewaar-versie** | **€9** | **De uitvoering. De inhoud is gratis.** |

**Waarom €9 en niet meer.** Wat hier gekocht wordt is vorm, geen inhoud, en de inhoud is
gratis. Boven ongeveer €12 gaat de bezoeker vergelijken met het rapport van 123test — dat een
normgroep heeft en waarin de inhoud zelf de aankoop is. Die vergelijking verliest Arcana, en
terecht. Onder €12 blijft het een bedrag dat je uitgeeft zonder erover na te denken: één
iDEAL-klik, geen afweging.

**Waarom €9 en niet minder.** Onder de €7 leest het als een fooi, en dan kun je beter een
donatie vragen dan een product verkopen. Een prijs die te laag is, zegt over het product dat het
niet veel voorstelt — en bij een ambachtelijk gezette PDF van **5.700+ woorden over 33
hoofdstukken**, met vectorwiel, inhoudsopgave en deelpagina, is dat onjuist.

> **Het woordental is naar beneden bijgesteld en de prijs houdt stand.** Eerdere versies van dit
> document noemden hier 7.500 woorden. Dat getal was de *hele gerenderde pagina* (7.559,
> `A-baseline.md` §1) inclusief inhoudsopgave, wiellijst en knoppen — niet de rapporttekst.
> Nagemeten met de engine zelf over acht fixtures telt de export **5.711 tot 6.327 woorden**
> (`G-rebuild-spec.md` §3, tegenspraak 1); de site en dit document noemen daarom `5.700+`.
> De prijsonderbouwing verandert daar niet door, om twee redenen. **Eén:** het plafond van €12
> komt niet uit de lengte maar uit de ankers in de tabel hierboven — boven €12 gaat de bezoeker
> vergelijken met 123test, dat een normgroep heeft. Dat argument is lengte-onafhankelijk.
> **Twee:** de ondergrens rust op wat er gezet wordt, en 5.700 woorden over 33 hoofdstukken is
> nog altijd een document van tientallen pagina's — ruim boven de 17 pagina's van Truity
> (circa $9) en in dezelfde orde als de 45 pagina's van 123test (€14,95), die daar bovendien
> de *inhoud* voor rekent en Arcana alleen de *vorm*. €9 blijft dus de prijs. Wat wél verandert
> is dat het getal nu te controleren is door wie telt, en dat is bij dit product het punt.

**Één iDEAL-betaling kost €0,32** (Mollie, standaardtarief binnenland). Bij €9 is dat 3,6% —
acceptabel. Creditcard kost 1,80% + €0,25 en komt bij dit bedrag op ongeveer hetzelfde uit.

**Btw.** Een PDF-generator die na betaling ontgrendeld wordt, is een elektronische dienst aan
een consument: 21% btw over de Nederlandse omzet. De genoemde €9 is de consumentenprijs
inclusief btw; netto blijft €7,44 over vóór transactiekosten.

**Keepsake-boek (fase 3): €39.** Inkoop circa €13,60 excl. drukkosten, plus verzending. De
marge per boek is **€14,91**, en dat is wat het rekenmodel ook werkelijk uitrekent: €39 incl.
btw − 21 % btw (€6,77) − inkoop én verzending (€17, `Aannames!B22`) − transactiekosten (€0,32).
*(Eerdere versies noemden hier circa €19; dat was €32,23 excl. btw − €13,60 drukkosten, dus
zónder verzending en zónder transactiekosten, terwijl het model die er expliciet in meeneemt.)*

## 5.2 Het rekenmodel

De trechter, zoals `A-baseline.md` §4 hem vaststelt, met de knoppen die de eigenaar kan draaien:

```
bezoekers per maand
   × start-rate            (landing → "Start de test")
   = tests gestart
   × afrondingsrate        (start → vraag 120)
   = tests afgerond
   × conversie             (afronder → koper bewaar-versie)
   = kopers
   × prijs − btw − transactiekosten
   = netto omzet
```

Alle percentages staan als invoercel op het tabblad **Aannames** in
`F-pricing-segmenten.xlsx`; het tabblad **Prijsscenario's** verwijst ernaar en rekent mee.

## 5.3 De drie scenario's

| | Voorzichtig | Verwacht | Optimistisch |
|---|---:|---:|---:|
| Bezoekers per maand *(aanname)* | 500 | 2.000 | 8.000 |
| Start-rate *(aanname)* | 12% | 20% | 28% |
| Afrondingsrate *(aanname)* | 45% | 60% | 72% |
| Conversie naar bewaar-versie *(aanname)* | 1,5% | 4,0% | 8,0% |
| Donatieratio *(aanname)* | 0,3% | 1,0% | 2,5% |
| **Tests gestart** | 60 | 400 | 2.240 |
| **Tests afgerond** | 27 | 240 | 1.613 |
| **Kopers per maand** | 0,4 | 9,6 | 129 |
| Netto bewaar-versie | € 2,88 | € 68,33 | € 918,39 |
| Netto donaties | € 0,30 | € 13,63 | € 349,98 |
| Af: hosting | −€ 10,00 | −€ 10,00 | −€ 10,00 |
| **Netto per maand** | **−€ 6,82** | **€ 71,96** | **€ 1.258,37** |
| **Netto per jaar** | **−€ 82** | **€ 864** | **€ 15.100** |
| Netto-omzet per 1.000 bezoekers | € 6,36 | € 40,98 | € 158,55 |
| Bezoekers nodig voor € 250 netto/maand | 40.869 | 6.344 | 1.640 |
| Terugverdientijd 40 bouwuren à € 75 | n.v.t. | 42 maanden | 2,4 maanden |

**Onderbouwing van de conversie-aanname.** De gangbare freemium-benchmark is 1% tot 10% met een
typische waarde van 2% tot 5% (Artisan Growth Strategies, 2026). Hier zijn twee krachten aan het
werk die tegen elkaar in gaan. Omhoog: de koper heeft al 25 minuten geïnvesteerd en het rapport
al gelezen, wat een veel hogere intentie geeft dan een gemiddelde gratis gebruiker. Omlaag: de
gratis versie is compleet en mist niets, wat bij de meeste freemiumproducten juist niet zo is.
Vandaar de brede bandbreedte van 1,5% tot 8%. **Deze aanname kan een factor vijf mis zijn, in
beide richtingen.**

## 5.4 Wat deze tabel werkelijk zegt

Drie dingen, en het derde is de conclusie van dit hele document.

**Eén. De prijs is niet de knop.** Verdubbel de prijs naar €18 en het verwachte scenario stijgt
naar circa €140 per maand — maar de conversie daalt waarschijnlijk harder dan de prijs stijgt,
want €18 zet het product naast 123test en Testcentrum Groei, waar de inhoud zelf de aankoop is.
Halveer de prijs naar €4,50 en je verkoopt geen twee keer zoveel.

**Twee. Het voorzichtige scenario dekt de hosting niet.** Bij 500 bezoekers per maand levert dit
model min zeven euro op. Dat is geen reden om het niet te doen — het is een reden om er geen 40
uur in te steken voordat er verkeer is.

**Drie, en dit is het besluit achter het besluit: de bindende beperking is verkeer, niet prijs.**
Om €250 netto per maand te halen zijn bij de verwachte percentages ongeveer **6.300 bezoekers per
maand** nodig. De site heeft er vandaag vermoedelijk een fractie van, en de belangrijkste reden
daarvoor is een canonical-tag die zoekmachines instrueert dit domein niet te indexeren
(`E` §3.2). **Het eerste wat dit verdienmodel nodig heeft, is geen betaalknop maar een
vindbare site en een werkende deelkaart.** Dat is een half uur werk en het staat daarom vóór
alles in het plan van aanpak.

---

# 6 — Plan van aanpak

De volgorde is: eerst meten en vindbaar zijn, dan bereik, dan pas verkopen. Wie die volgorde
omdraait, bouwt een betaalknop voor een publiek dat er niet is.

## Stap 0 — Deze week, kost niets

1. **De domeinfix.** Elf voorkomens in drie bestanden, één zoek-en-vervang, volledig uitgewerkt
   in `E-usp-en-landing.md` §3.1. Zonder dit is er geen vindbaarheid en werkt de deelkaart niet.
   Dit is geen onderdeel van het verdienmodel; het is de voorwaarde ervan.
2. **De drie tellers.** Opt-in, alleen stap 1 → 2 → 3, precies zoals `A-baseline.md` §4 route 1
   ze voorschrijft, met de toestemmingsregel uit `E` §4.4. Zonder deze drie getallen is elk
   scenario in §5.3 een gok en blijft het dat ook.

**Beslispunt:** pas na één maand meten weet je in welk scenario je zit. Alles hieronder staat
of valt daarmee.

## Stap 1 — Maand 1 tot 2: bereik, geen omzet

3. **Het voorbeeldrapport.** Een verzonnen antwoordenset door de engine, alle 33 hoofdstukken,
   eigen URL. `E` §5.9 noemt dit het enige onderdeel dat drie problemen tegelijk oplost: het
   bewijsgat, de ontbrekende derde weg voor wie geen 25 minuten heeft, en het grootste SEO-gat.
   Het is de landingspagina voor segment 1.
4. **De deelpagina.** Het hoofdstuk `understood-by-others` als op zichzelf staand document met
   eigen aanhef, eigen disclaimer en eigen exportknop, volledig uitgeschreven in
   `C-tekst-en-rapport.md` §3.5. Dit is de groeimotor voor segment 2 en 3.

Beide leveren nul euro op en zijn de reden dat er later iets te verdienen valt.

## Stap 2 — Maand 2 tot 3: het primaire model

5. **Het scorewiel van canvas naar SVG.** Staat al op de lijst als printfout — gerasterd op
   schermresolutie, labels niet selecteerbaar, niet zoomvast (`A-baseline.md` §3.6; het
   tekstalternatief voor schermlezers is er wél) — en is de voorwaarde voor een drukbare PDF.
   Twee vliegen.
6. **De PDF-generator, client-side.** Uit `arcana_result` in localStorage. Inhoudsopgave,
   kopregels, bladspiegel, datumstempel, de deelpagina als aparte eenpagina-PDF.
7. **De betaling.** Een betaallink bij Mollie; op de bevestigingspagina een ondertekende
   licentiesleutel die de bundel met een ingebakken publieke sleutel controleert. Geen account,
   geen e-mailadres, geen serververkeer na de ontgrendeling. De bon als download op diezelfde
   pagina.
8. **De copy.** De herformulering uit §1.3, de FAQ-vraag *waar verdienen jullie aan*, de
   waarschuwing over de niet-herstelbare sleutel vóór de knop, en het nee tegen B2B uit §2.6.
9. **Het juridische minimum.** Zie §7: btw, inschrijving, herroepingsrecht, bon op een duurzame
   gegevensdrager. Dit hoort vóór de eerste verkoop af te zijn, niet erna.

## Stap 3 — Maand 3: het secundaire model

10. **De donatieregel.** Eén zin na het rapport, één betaallink, geen popup, geen herhaling.
    Een halve dag werk.

## Stap 4 — Maand 4 tot 6: meten en beslissen

11. **Vergelijk de tellers met §5.3** en vervang de aannames op het tabblad Aannames door
    metingen. Het model rekent dan zichzelf om.
12. **Beslisregel, vooraf vastgelegd.** Blijft de netto-opbrengst na drie maanden onder €50 per
    maand, dan is het model niet het probleem — het verkeer is het probleem. In dat geval: níet
    de prijs verhogen, níet de gratis laag versmallen, wél terug naar stap 1 en de SEO en de
    deelpagina.
13. **Keepsake pas overwegen** bij meer dan 3.000 bezoekers per maand én een bewezen digitale
    conversie van ten minste 3%.

## Wat er nooit gebeurt

Geen betaalmuur op bestaande hoofdstukken. Geen cloud-opslag. Geen B2B- of HR-licentie. Geen
affiliate. Geen advertenties. Deze vijf staan hier zodat ze over een jaar niet opnieuw ter
discussie staan als het tegenvalt — want dan zullen ze allemaal aantrekkelijk lijken.

---

# 7 — Risico's

**1. Het woord "gratis" verzwakt zodra er een prijs op de pagina staat.** Ook als de inhoud
gratis blijft. `E` §1.2 waarschuwt dat elke concurrent "gratis" zegt en "de eerste vijf procent"
bedoelt; het risico is dat een bezoeker die de prijs ziet vóórdat hij het rapport heeft, Arcana
in dat rijtje plaatst. *Beperking:* de knop staat uitsluitend ná het rapport, het woord betalen
staat nergens boven de vouw, en de FAQ geeft het volledige antwoord.

**2. De sleutel is niet herstelbaar.** Geen e-mailadres betekent: geen "stuur me mijn licentie
opnieuw". Dat gaat gebeuren, en het gaat leiden tot boze berichten. *Beperking:* de
waarschuwing staat vóór de aankoop, niet erna, en de sleutel is zo kort dat hij te noteren is.
Overweeg een tweede, vrijwillig veld "stuur de sleutel ook naar dit e-mailadres" — maar dan als
expliciete, uitgeschakelde keuze met de consequentie erbij, niet als standaard.

**3. Juridisch en fiscaal.** Structureel verkopen betekent inschrijving bij de KVK en
btw-aangifte; 21% over een elektronische dienst aan een Nederlandse consument. Bij digitale
inhoud die direct geleverd wordt, moet de consument uitdrukkelijk afstand doen van zijn
herroepingsrecht van veertien dagen, en dat moet vastgelegd worden. De bevestiging van de
overeenkomst hoort op een duurzame gegevensdrager — een downloadbare bon op de
bevestigingspagina voldoet, maar het moet wel bewust zo geregeld zijn. *Dit is het risico dat
het vaakst onderschat wordt bij een product dat "gewoon een knop" lijkt.* Laat één keer een
boekhouder ernaar kijken voordat de eerste €9 binnenkomt.

**4. Verkeersrisico — het grootste.** Het hele model staat of valt met vindbaarheid, en die is
vandaag vermoedelijk nul door de canonical-bug. Als de domeinfix het indexeringsprobleem niet
oplost — bijvoorbeeld omdat `speaktoart.com` inmiddels van iemand anders is en iets anders
serveert (`E` §3.3, route B) — dan duurt het langer en is het voorzichtige scenario het
realistische.

**5. Aannamerisico.** De conversie van 4% is een aanname zonder enige meting, en er is geen
publiek benchmarkcijfer voor "gratis compleet rapport plus betaalde uitvoering". Het model kan
een factor vijf mis zijn, beide kanten op. Het is daarom zo gebouwd dat één cel veranderen
volstaat.

**6. Merkrisico bij donaties.** Een bedelregel ondermijnt het zelfvertrouwen van de pagina.
Eén zin, geen popup, geen herinnering, geen voortgangsbalk naar een doel. Als het niet
neutraal geschreven kan worden, dan liever niet.

**7. De B2B-verleiding.** Segment 2 zal om een coachvariant vragen, het is commercieel de
aantrekkelijkste route van allemaal, en bij €864 per jaar zal die vraag over een jaar zeer
redelijk klinken. Het antwoord staat opgeschreven in §2.6, in de FAQ, en op de site zelf in
de sectie *Eerlijk gezegd*. Dat is de bedoeling: het besluit moet op drie plekken vastliggen,
zodat het moeite kost om het terug te draaien.

**8. Het rapport gaat bij de keepsake-route wél naar een server.** Bij print-on-demand verlaat
de inhoud het apparaat richting drukker. Dat is verdedigbaar als eenmalige, expliciete handeling
van de gebruiker zelf — maar het is een uitzondering op de kernbelofte, en dat is de reden dat
dit model geparkeerd staat en niet in fase 1 zit.

**9. Het model dekt de eigen tijd niet.** 40 bouwuren à €75 is €3.000 aan opportuniteitskosten.
Bij het verwachte scenario is dat in 42 maanden terugverdiend — langer dan de gemiddelde
levensduur van een frontend. Dit is eerlijk gezegd het zwakste punt van het hele voorstel, en
het is alleen te verdedigen omdat het meeste werk (SVG-wiel, deelpagina, voorbeeldrapport) ook
zonder verdienmodel op de lijst stond.

---

# 8 — Wat dit document niet oplost

- **De vraag of er publiek is.** Het hele model hangt aan een bezoekersaantal dat niemand kent.
  Het rekent, het voorspelt niet.
- **Het gebrek aan sociaal bewijs.** `E` §2.3 noemt dat de tweede ongemakkelijke waarheid:
  Testcentrum Groei zet 431.563 afnames neer, Arcana heeft geen enkel cijfer. Een verdienmodel
  dicht dat gat niet.
- **De as deugdelijkheid.** Zolang er geen normgroep is, blijft Arcana onderaan op de as waarop
  segment 1 zoekt. Een validatietraject is denkbaar als besteding van de opbrengst, maar bij
  €864 per jaar is dat geen realistisch plan; `E` §2.2 stelt terecht dat validatie eruitziet als
  een COTAN-beoordeling en dat dat jaren en geld kost.
- **De merknaam.** `E` §2.3 stelt vast dat *Arcana* tarot oproept en dat de site op zijn eigen
  naam niet vindbaar is. Dat is een positioneringsprobleem, geen verdienmodelprobleem, maar het
  raakt segment 1 het hardst.

---

# Bronnen

Geraadpleegd op 22 september 2026.

**Prijspunten en tarieven**
- [Mollie — Tarieven per transactie](https://www.mollie.com/pricing) — iDEAL binnenland €0,32; creditcard consument EER 1,80% + €0,25
- [Print API — Hardcover boeken print-on-demand](https://www.printapi.nl/drukwerk/hardcover-boeken) — A5 hardcover vanaf €7,15 excl. voor 24 pagina's, €0,18 per extra pagina
- [Peecho — Print on demand hardcover books](https://www.peecho.com/products/books/hardcover) — minimaal 24 pagina's, prijs per calculator
- [Pumbo — Print on demand, kleine oplage](https://www.pumbo.nl/boek-drukken/print-on-demand)
- [TestGroup — The Bridge Personality](https://www.testgroup.com/personality-test/) — €15 tot €110 per afname, abonnementen €1.495 tot €11.850
- [123test — Persoonlijkheidstest](https://www.123test.com/nl/persoonlijkheidstest/) — uitgebreid rapport €14,95
- [Testcentrum Groei — Persoonlijkheidstest](https://www.testcentrumgroei.nl/persoonlijkheidstest) — uitgebreid rapport €17,50
- [16Personalities — Premium Career Suite](https://www.16personalities.com/premium/premium-report) — €29
- [NOA-VU — MPT-BS](https://noa-vu.nl/producten/online-assessments/losse-tests/persoonlijkheidstests/mpt-bs/) — vanaf €24,95 per afname
- [The Enneagram Institute — RHETI](https://www.enneagraminstitute.com/free-enneagram-tests/) — $20

**Conversie- en donatiebenchmarks**
- [Artisan Growth Strategies — Freemium Conversion Rate Benchmarks 2026](https://www.artisangrowthstrategies.com/blog/freemium-conversion-rate-benchmarks) — 1–10%, typisch 2–5%
- [Growth Unhinged — The 2026 free-to-paid conversion report](https://www.growthunhinged.com/p/free-to-paid-conversion-report)
- [Funraise — Donation Page Conversion Rate Calculator + 2026 Benchmarks](https://www.funraise.org/tools/donation-page-conversion-rate-calculator) — 8% benchmark voor donatiepagina's, geldt alleen bij donatie-intentie
- [Overney e.a. — How to Not Get Rich: An Empirical Study of Donations in Open Source (ICSE 2020)](https://www.cs.cmu.edu/~ckaestne/pdf/icse20-donations.pdf) — mediaan $55 over negen maanden; 5–10% van de projecten haalt meer dan $1.000 per maand
- [Studying donations and their expenses in open source projects (Empirical Software Engineering)](https://dl.acm.org/doi/abs/10.1007/s10664-021-10060-y)

**Marktcontext (aanvullend op de bronnenlijst in werkstroom E)**
- [Werf& — Waarom de Big Five de enige persoonlijkheidstest is die geschikt is voor recruitment](https://www.werf-en.nl/big-five-als-enige-persoonlijkheidstest-geschikt-voor-recruitment/)
- [Ixly — WPV zeer positief beoordeeld door COTAN](https://www.ixly.com/nl/blog/wpv-zeer-positief-beoordeeld-door-cotan)
- [gratispersoonlijkheidstest.nl](https://www.gratispersoonlijkheidstest.nl/) — gratis mits LinkedIn-deling, of €9,95

**Interne bronnen**
- `/home/claude/work/SITE-INVENTARIS.md`
- `/mnt/user-data/outputs/A-baseline.md` — §2.4 en §2.5 (geen netwerkverkeer, **zes** localStorage-sleutels), §3.6 (canvas-scorewiel, inclusief het correctieblok: het wiel hééft een tekstalternatief), §4 (de onmeetbare trechter en de drie tellers)
- `/mnt/user-data/outputs/C-tekst-en-rapport.md` — §1 moment 7 (het rapport drie maanden later), §3.5 (het deelbare hoofdstuk), §6.2, §7.6 (eerlijk zijn zonder het product af te breken)
- `/mnt/user-data/outputs/E-usp-en-landing.md` — §1.1 en §1.2 (de vijf claims en de spits), §2 (het hele concurrentieveld met prijzen), §2.5 (het verdienmodelgat), §3 (de domeinmigratie), §5.9 (het voorbeeldrapport), §5.10 en §5.11 (Voor wie, Eerlijk gezegd)
- `/mnt/user-data/outputs/F-pricing-segmenten.xlsx` — het rekenmodel achter §5

> **Verificatiebeperking.** De genoemde tarieven zijn openbare consumentenprijzen op 22 september
> 2026 en veranderen. De coachtarieven van TestGroup zijn niet openbaar; de pagina verwijst voor
> coaches en trainers naar een offerte. Alle verkeers- en conversiecijfers in dit document zijn
> aannames, gelabeld als aanname, en geen enkele is op `arcanaprofile.com` gemeten — er is daar
> op dit moment niets dat meet.

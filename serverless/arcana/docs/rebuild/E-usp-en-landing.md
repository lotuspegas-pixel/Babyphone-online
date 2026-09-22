# E — Positionering, landingspagina en SEO

**Werkstroom E van de rebuild van Arcana Profile.**
Onderzoek uitgevoerd op 22 september 2026. Gebaseerd op `SITE-INVENTARIS.md`, `A-baseline.md`,
`C-tekst-en-rapport.md`, `/home/claude/site/index.html`, `robots.txt`, `sitemap.xml` en de
landingscopy in `app.beautified.js` (regel 19537–20330). Het concurrentieonderzoek in §2 is
gedaan met live zoekopdrachten en paginabezoeken; elke bewering daar heeft een bron onderaan.

> **Verhouding tot werkstroom C.** C levert de stem en de zinnen. E levert de volgorde, de
> keuze welke claim vooraan staat, en de pagina eromheen. Waar C een zin al heeft geschreven,
> staat hij hier letterlijk zo, met een verwijzing naar het rijnummer in C §4. Er wordt in dit
> document geen enkele zin van C herschreven om hem anders te laten klinken.

> **Eén cijfer wijkt af van de opdracht — en is inmiddels opnieuw vastgesteld.** De opdracht
> noemt "5.500+ woorden", en dat getal staat nu op de site. C §4 rij 9 adviseerde `7.500+` op
> grond van de 7.559 gerenderde woorden uit `A-baseline.md`. Dat advies is **achterhaald**:
> `G-rebuild-spec.md` §3 tegenspraak 1 heeft het rapport met de engine zelf nagemeten over acht
> fixtures en komt op **5.711 tot 6.327 markdownwoorden**. De 7.559 uit `A` is de *hele
> gerenderde pagina* — inclusief inhoudsopgave, de twaalfrijenlijst bij het wiel, knoppen en
> labels — en niet de rapporttekst. Op een site die op narekenbaarheid verkoopt is een
> bescheiden getal dat niet klopt net zo duur als een opgeblazen getal dat niet klopt. Overal
> in dit document staat daarom **5.700+**: de gemeten ondergrens, naar beneden afgerond.
> Het tweede deel van C §4 rij 9 blijft wél staan: `volledig over jou` wordt
> `met de cijfers erbij`.

---

## Inhoud

1. [Positionering](#1--positionering)
2. [Concurrentieveld](#2--concurrentieveld)
3. [De domeinmigratie](#3--de-domeinmigratie)
4. [Drie hero-varianten met hypothese](#4--drie-hero-varianten-met-hypothese)
5. [De volledige landingcopy](#5--de-volledige-landingcopy)
6. [De 5-secondentest](#6--de-5-secondentest)
7. [SEO-audit](#7--seo-audit)
8. [Bronnen](#bronnen)

---

# 1 — Positionering

## 1.1 De vijf kandidaten, gewogen

Er liggen vijf claims op tafel. Ze zijn niet gelijkwaardig, en het is geen kwestie van smaak
welke vooraan staat: drie ervan zijn in deze markt geen onderscheid, één is geen claim maar een
bewijsmiddel, en één is het enige antwoord op de vraag die de bezoeker werkelijk stelt.

| Claim | Waar? | Uniek in de Nederlandse markt? | Beantwoordt welk bezwaar? |
|---|---|---|---|
| Narekenbaar / deterministisch | Ja, verifieerbaar (`A-baseline.md` §2.4: geen netwerkverkeer, geen API, geen taalmodel) | **Ja** — geen enkele onderzochte aanbieder toont het cijfer achter de uitspraak aan de gebruiker | *"Is dit weer zo'n test die op iedereen past?"* |
| Privé / lokaal | Ja, verifieerbaar (6 localStorage-sleutels, verder niets) | Vrijwel — zie §2, de gratis NL-concurrenten vragen e-mail of LinkedIn-koppeling | *"Wat gebeurt er met mijn gegevens?"* |
| Diepte (33 hoofdstukken, 5.700+ woorden) | Ja | Nee — vergelijkbaar met de **betaalde** rapporten van 123test (45 pagina's) en 16personalities (40+ pagina's) | *"Wat krijg ik ervoor terug?"* |
| Gratis | Ja | Als toegangsprijs: nee. Als *volledig rapport zonder betaalmuur*: **ja** | *"Waar zit de adder?"* |
| Eerlijk over de eigen grenzen | Ja | Ja, maar het is geen productclaim | Maakt de andere vier geloofwaardig |

## 1.2 De spits: narekenbaar

**Narekenbaar is de spits.** Drie redenen, in volgorde van gewicht.

**Ten eerste: het is het enige antwoord op het enige bezwaar dat telt.** C §1 formuleert het
precies: de vraag die na vijf seconden opkomt is *"is dit weer zo'n test?"* — een test die iets
vertelt dat op iedereen past, in vleiende bewoordingen. Dat bezwaar is terecht; het heeft een
naam (het Barnum-effect) en het is de reden dat de Nederlandse vakpers al jaren schrijft dat
MBTI en kleurentypologieën beter niet gebruikt kunnen worden voor iets dat ertoe doet. Privacy,
diepte en prijs beantwoorden dat bezwaar geen van drieën. Iemand die denkt dat de uitkomst onzin
is, wordt niet overgehaald door de belofte dat die onzin gratis is, veilig opgeslagen staat en
5.700 woorden lang is. Die laatste drie maken het erger.

**Ten tweede: het is het enige dat de bezoeker zelf kan controleren.** Dat is de zeldzame
eigenschap. "Wetenschappelijk onderbouwd" moet je geloven. "Betrouwbaar" moet je geloven.
"Jouw antwoorden zijn veilig" moet je geloven. Maar *"bij elke uitspraak staat het cijfer waar
hij uit volgt"* en *"dezelfde antwoorden geven hetzelfde rapport"* zijn allebei binnen een
minuut na te lopen door de persoon die het niet gelooft. Een claim die de scepticus zelf kan
falsificeren is een fundamenteel ander soort claim dan een claim die hij moet aannemen.

**Ten derde: de markt beweegt de andere kant op, en dat maakt de claim elk jaar meer waard.**
16personalities verkoopt sinds kort "vijf AI-carrièrementoren, 24/7 beschikbaar" als
premiumproduct. Dat is de richting van de hele categorie: gegenereerde tekst, elke keer net
anders, met niets erachter dat je kunt nalopen. Op het moment dat elke test een taalmodel wordt,
is *"er zit geen taalmodel in — de test rekent, en dat rekenwerk ligt vast"* geen
technische voetnoot meer maar een positie. Dit is de enige claim in de lijst die sterker wordt
naarmate de concurrentie groeit.

**Waarom de andere vier niet de spits zijn.**

- **Gratis** is in deze categorie geen onderscheid maar een verdachtmaking. Elke concurrent zegt
  "gratis" en bedoelt "de eerste vijf procent is gratis" (16personalities: circa 5% van de
  inzichten, daarna €29). Wie met *gratis* opent, wordt gelezen als de volgende die dat zegt.
  Gratis werkt pas als het ná een reden staat om te geloven, en dan als opheffing van de vraag
  "waar zit de adder" — niet ervoor.
- **Privé** is hygiëne, geen verlangen. Het neemt een reden weg om níet te beginnen. Dat is
  waardevol en het moet boven de vouw staan, maar het maakt niemand nieuwsgierig. Uitzondering:
  voor één specifiek publiek (zie hero-variant C in §4) is het wél de spits, en dat is precies
  waarom die variant getest moet worden.
- **Diepte** is de beloning, niet de reden. En hij is minder uniek dan hij lijkt: 123test levert
  een rapport van 45 pagina's, 16personalities 40+ pagina's. Het verschil is niet de omvang maar
  de prijs en de herleidbaarheid. "33 hoofdstukken" zonder "en bij elke uitspraak staat het
  cijfer" is een getal waarvan de concurrent er een groter heeft.
- **Eerlijk over de eigen grenzen** is geen vijfde claim maar het bewijsmiddel onder de vier
  andere. C §7.6 noemt de techniek: de grens als kenmerk. Een site die vrijwillig opschrijft dat
  hij geen normgroep en geen validatiestudie heeft, koopt daarmee geloofwaardigheid voor alles
  wat hij wél beweert. Dat werkt alleen zolang het niet als claim wordt gepresenteerd. Zodra
  "wij zijn eerlijk" een kopregel wordt, is het marketing en vervalt het effect.

## 1.3 De ordening, als één beeld

```
                narekenbaar          ← de reden om het te geloven   (de spits)
                     │
        ┌────────────┼────────────┐
   gratis,        privé,       diepte
   zonder         lokaal       33 hoofdstukken
   betaalmuur                  5.700+ woorden
        │            │            │
        └────────────┼────────────┘
                     │
            eerlijk over de grenzen
            ← het bewijs onder alle vier
```

Lees het als: **narekenbaar** geeft de reden om te beginnen, **gratis en privé** halen de prijs
weg (in geld en in risico), **diepte** is wat je overhoudt, en **eerlijkheid** is waarom je de
andere vier gelooft.

## 1.4 Het positioneringsstatement

**In één zin, in de vorm die werkstroom B, F en G kunnen overnemen:**

> Voor Nederlandstalige volwassenen die zichzelf serieus willen onderzoeken maar niet geloven in
> typetests, is Arcana Profile het zelfreflectie-instrument dat bij elke uitspraak het cijfer
> laat zien waar hij uit volgt — omdat de test rekent in plaats van schrijft, en dat rekenwerk
> in je eigen browser gebeurt.

**Voor intern gebruik, uitgeschreven in de standaardvorm:**

| Onderdeel | Invulling |
|---|---|
| Voor wie | Nederlandstalige volwassenen die op een kantelpunt staan (keuze, patroon, begeleiding) en eerder een test deden die ze niet vertrouwden |
| Categorie | Zelfreflectie-instrument (uitdrukkelijk niet: assessment, diagnose, selectie) |
| Belangrijkste voordeel | Elke uitspraak over jou is herleidbaar naar het cijfer waar hij uit volgt |
| Reden om te geloven | De engine is deterministisch en draait lokaal; geen taalmodel, geen server, geen account |
| Tegenover wat | Typetests die een verhaal geven en een betaalmuur, en gratis tests die je gegevens als prijs rekenen |

## 1.5 "Wij zijn de enige die…"

Een "enige"-claim is op een site die op eerlijkheid draait alleen bruikbaar als hij hard te
maken is. Daarom drie lagen: de claim, de reikwijdte waarbinnen hij geldt, en wat hem
weerlegbaar maakt.

**De claim, zoals hij op de site mag staan:**

> **Bij elke uitspraak over jou staat het cijfer waar hij uit volgt.**
> We kennen geen andere Nederlandstalige persoonlijkheidstest die dat doet — en geen andere die
> het volledige rapport geeft zonder betaalmuur, zonder account en zonder e-mailadres.

**De reikwijdte, zoals hij in de verantwoording of de FAQ hoort te staan:**

> In september 2026 zijn tien Nederlandstalige aanbieders nagelopen: 123test, 16personalities
> (Nederlandse versie), Testcentrum Groei, gratispersoonlijkheidstest.nl,
> onlinepersoonlijkheidstest.nl, jobpersonality.com, NOA, Ixly, Truity (Engelstalig, veel
> gebruikt in Nederland) en het Enneagram Institute. Geen van tien toont de gebruiker de score
> achter een uitspraak; allemaal zetten ze het uitgebreide rapport achter een betaling, een
> e-mailadres of een koppeling met een sociaal netwerk. Vind je een tegenvoorbeeld, laat het
> weten — dan halen we deze zin weg.

Die laatste zin is geen bescheidenheid maar de goedkoopste vorm van bewijs die er is. Hij maakt
van een reclamezin een toetsbare bewering, en dat is precies de beweging die dit merk overal
maakt.

**Wat je níet mag zeggen, en waarom:**

| Niet zeggen | Waarom niet |
|---|---|
| "De enige persoonlijkheidstest ter wereld die…" | Onbewijsbaar, en één tegenvoorbeeld kost je de hele pagina |
| "De meest uitgebreide gratis test van Nederland" | Waarschijnlijk waar, niet te bewijzen, en "meest" is precies het register dat dit merk niet voert |
| "120 vragen en 30 eigenschappen — uniek" | **Aantoonbaar onwaar.** De gratis Big Five van 123test is óók 120 items en 30 subschalen, met een normgroep erbij. Zie §2.3 |
| "Wetenschappelijk onderbouwd" | Is het niet, en de FAQ zegt dat zelf |

---

# 2 — Concurrentieveld

Onderzocht op 22 september 2026 met live zoekopdrachten en paginabezoeken. Waar een pagina iets
niet vermeldde, staat dat er zo bij — geen ingevulde aannames.

## 2.1 De internationale spelers

### 16personalities

| | |
|---|---|
| Wat | MBTI-achtige typetest (16 types, NERIS-model), Nederlandstalige versie beschikbaar |
| Duur | Circa 10 minuten |
| Gratis | Het type, de beschrijving en basisresultaten. Eigen omschrijving: circa **5% van de beschikbare inzichten** |
| Betaalmuur | **€29** voor de Premium Career Suite; 30 dagen geld-terug |
| Rapportlengte | Carrièregids van **40+ pagina's** als PDF, plus onlinemateriaal |
| Recente beweging | **Vijf AI-carrièrementoren, 24/7**, en 31 tests en tools in de Pro Suite |
| Validiteitsclaim | "Freakishly accurate"; geen normgroep of validatiestudie op de productpagina |
| Account | Test kan anoniem, premium vereist account |

**Waar ze sterker zijn.** Merkbekendheid van een andere orde. Een vierlettercode is sociale
valuta: mensen zetten INFP in hun bio, er zijn memes over, en dat is een distributiemotor die
Arcana niet heeft en ook niet kan kopen. De test duurt tien minuten in plaats van vijfentwintig.
En de gratis uitkomst is meteen deelbaar, wat Arcana's rapport niet is.

**Waar Arcana anders staat.** 16personalities geeft je een categorie en een verhaal; de
onderbouwing is een model dat de gebruiker niet te zien krijgt. Arcana geeft je scores waarvan
de herkomst zichtbaar is. En de beweging naar AI-mentoren maakt de tegenstelling scherper dan
hij vorig jaar was: hun premiumproduct is per definitie niet herhaalbaar, het onze wel.

### Truity

| | |
|---|---|
| Wat | Portfolio: TypeFinder (MBTI-achtig), Big Five, Enneagram, DISC, loopbaantests |
| Gratis | Beknopte uitslag na afloop |
| Betaalmuur | Big Five vanaf **$9** per afname; uitgebreide loopbaanrapporten rond **$29** |
| Rapportlengte | Big Five-rapport: **17 pagina's** (online of PDF) |
| Validiteitsclaim | "Extensively researched and validated using a large global sample", "excellent reliability according to standard psychometric measures", technische documentatie beschikbaar |
| Account | E-mailadres nodig voor het rapport |

**Waar ze sterker zijn.** Dit is het eerlijkste van de commerciële aanbod: ze publiceren
technische documentatie en claimen betrouwbaarheid met verwijzing naar meetbare grootheden. Op
de as *bewijs van deugdelijkheid* wint Truity van Arcana, en dat zal altijd zo blijven zolang
Arcana geen normgroep heeft.

**Waar Arcana anders staat.** Truity's transparantie zit in een technisch document dat de
gebruiker niet leest; Arcana's transparantie zit in het rapport zelf, op de regel waar de
uitspraak staat. Dat zijn twee verschillende soorten openheid en ze sluiten elkaar niet uit —
maar alleen de tweede is merkbaar tijdens het lezen. Daarnaast: Truity's Big Five-rapport is
17 pagina's tegen Arcana's 33 hoofdstukken, en het kost $9 tegen niets.

### Het Enneagram Institute (RHETI)

| | |
|---|---|
| Gratis | Beperkte gratis tests |
| Betaalmuur | **$20** voor de RHETI |
| Rapportlengte | Score op alle negen types, uitgebreide rapporten voor je top-3 |
| Positionering | Nadrukkelijk tégen "bait and switch": vooraf transparante prijs, geen doorverkoop van gegevens |
| Account | Betaling, dus ja |

**Waar ze sterker zijn.** Zij hebben, net als Arcana, een eerlijkheidspositie gekozen — en zij
hebben er een prijskaartje bij dat de positie geloofwaardig maakt. "Wij verkopen je gegevens
niet want je betaalt ons" is een eenvoudiger verhaal dan "wij verkopen je gegevens niet en het
is gratis". Op de vraag *waar verdienen jullie dan aan* heeft Arcana geen antwoord op de pagina
staan, en dat is een gat.

**Waar Arcana anders staat.** Het enneagram is per definitie een typologie van negen; het
deelt de zwakte van 16personalities.

### Big Five-aanbieders algemeen

Het Big Five-model (of de zesfactorvariant HEXACO) is wat de vakwereld gebruikt, en het is
tegelijk het model waarop de meeste gratis tests draaien. De commerciële implementaties
(NEO-PI-R, IPIP-NEO-120) hebben normgroepen en gepubliceerde betrouwbaarheidscijfers. Dat is
de belangrijkste categoriale zwakte van Arcana: de twaalf dimensies zijn zelf ontworpen, niet
ontleend aan een gevalideerd model, en er is geen normgroep. Arcana zegt dat zelf, op vier
plekken. Maar wie zoekt op *welke test is betrouwbaar* komt terecht bij Big Five-aanbieders,
en daar heeft Arcana niets tegenin te brengen behalve het eerlijke "daar zijn wij niet voor".

## 2.2 De Nederlandse markt

### 123test

| | |
|---|---|
| Wat | Veertien persoonlijkheidstests; het vlaggenschip is de Big Five (IPIP-gebaseerd) |
| Vragen | **120 stellingen**, circa 15 minuten |
| Gratis | Score op de vijf Big Five-trekken vergeleken met anderen, plus uitleg van de 30 subschalen — **zonder registratie** |
| Betaalmuur | Uitgebreid PDF-rapport van **45 pagina's** voor **€14,95** (van €24,95). Najaarsbundel van acht tests: €29,95 (normaal €120,90) |
| Validiteitsclaim | "Meest uitgebreide, betrouwbare en valide theorie", onderzoeksdocumentatie en validatiestudie beschikbaar |
| Account | Niet nodig voor de gratis versie |

**Dit is de belangrijkste concurrent, en tegelijk de ongemakkelijkste.** 123test doet een groot
deel van wat Arcana doet, met een beter onderbouwd instrument, in minder tijd, ook zonder
account. Hun **120 vragen en 30 subschalen** zijn getalsmatig identiek aan die van Arcana — met
dit verschil dat de hunne uit een gepubliceerd, gevalideerd itemmodel komen en die van Arcana
zelf ontworpen zijn.

**Waar ze sterker zijn.** Validiteit, normgroep, vindbaarheid, merkvertrouwen, en een gratis
laag die werkelijk bruikbaar is. Op de vraag *"welke test is wetenschappelijk het beste?"* is
het antwoord voor de Nederlandse markt bijna altijd 123test of een assessmentpartij, en dat
antwoord is juist.

**Waar Arcana anders staat.** 123test's gratis laag geeft je vijf getallen en een uitleg van de
schalen. Het verhaal — wat die getallen samen betekenen voor je conflictstijl, je relaties, je
schaduwkant, je stresspatroon — staat in het rapport van €14,95. Arcana's hele voorstel is dat
het verhaal én de getallen samen gratis zijn, en dat je de verbinding tussen die twee kunt zien.
Dat is een reëel verschil en het is het enige verschil dat op deze concurrent standhoudt.

### Testcentrum Groei

| | |
|---|---|
| Wat | Big Five met 5 dimensies en 10 subdimensies |
| Duur | 15–20 minuten |
| Gratis | Basisuitslag: je twee sterkste dimensies met beschrijving. **Geen registratie nodig** — dat staat als belofte in de paginatitel |
| Betaalmuur | Uitgebreid rapport **€17,50** (actie: €15,00) |
| Normgroep | Verzamelt geslacht, leeftijd en opleidingsniveau "voor het opbouwen van een normgroep" |
| Volume | 431.563 afnames |

**Waar ze sterker zijn.** Ze claimen "gratis én zonder registratie" op dezelfde as als Arcana,
en ze hebben 431.563 afnames om het gewicht te geven. Arcana heeft geen enkel bezoekcijfer om
te noemen.

**Waar Arcana anders staat.** Hun gratis laag is twee dimensies van de vijf. Dat is een
uitsnede die bewust hongerig maakt. Arcana geeft alles.

### gratispersoonlijkheidstest.nl

| | |
|---|---|
| Wat | Big Five, 50 vragen, circa 20 minuten |
| Gratis | **Gratis mits je je LinkedIn-gegevens deelt** en toestaat dat er op je tijdlijn wordt gepost |
| Alternatief | **€9,95** om die gegevensdeling te vermijden |
| Account | E-mailadres verplicht voor het rapport |

**Dit is het scherpste contrast in het hele veld en het verdient een plek in de argumentatie.**
Een site die "gratis" in het domein heeft staan, rekent als prijs je LinkedIn-profiel plus een
bericht op je tijdlijn — of €9,95 om dat niet te doen. Dat is de gangbare betekenis van gratis
in deze categorie. Daar tegenover is *"geen account, geen e-mailadres, geen server"* geen
detail maar het hele verschil.

**Waar ze sterker zijn.** Nergens die er voor Arcana toe doet, behalve in vindbaarheid: het
exacte-match-domein rankt op de belangrijkste zoekterm.

### NOA (NOA-VU) — de professionele hoek

| | |
|---|---|
| Wat | MPT-BS: zes dimensies (emotionele stabiliteit, extraversie, consciëntieusheid, openheid, vriendelijkheid, integriteit) over **25 subschalen** |
| Duur | Circa 20 minuten |
| Prijs | Vanaf **€24,95** per afname |
| Normgroep | Representatieve normen voor selectie én coaching, gewogen naar geslacht, leeftijd, opleidingsniveau en etnisch-culturele achtergrond |
| Doelgroep | Vanaf 15 jaar, uitdrukkelijk ook mensen met beperkte Nederlandse taalvaardigheid (basisversie MPT-BS-B) |

**Waar ze sterker zijn.** Alles wat met deugdelijkheid te maken heeft. Een normgroep die
gewogen is naar etnisch-culturele achtergrond is precies het soort werk dat een zelfgebouwd
instrument niet kan namaken. Dit is een categorie waarin Arcana niet meespeelt en ook niet moet
willen meespelen.

**Waar Arcana anders staat.** NOA verkoopt aan organisaties, voor beslissingen over mensen.
Arcana zegt met zoveel woorden dat het daar niet voor is. Geen overlap, geen concurrentie.

### Ixly — de professionele hoek

| | |
|---|---|
| Wat | WPV (Werkgerelateerde Persoonlijkheidsvragenlijst) en varianten |
| Onderscheiding | Door de **COTAN** beoordeeld als een van de beste persoonlijkheidstests op HRM-gebied |
| Doelgroep | HR, loopbaanbegeleiding, assessment |
| Prijs | Zakelijke licentie, geen consumentenprijs |

Zelfde verhaal als NOA: een aangrenzende markt, geen concurrent. Wel relevant als
*geloofwaardigheidsanker*: wanneer een bezoeker vraagt "waarom is dit niet gevalideerd", is het
eerlijke antwoord dat validatie eruitziet als een COTAN-beoordeling, dat dat jaren en geld kost,
en dat wie dat nodig heeft bij Ixly of NOA moet zijn. Dat antwoord versterkt Arcana in plaats
van het te verzwakken — het is C §7.6, techniek 3: het precieze nee, met daarachter waar het
wél voor is.

## 2.3 Drie ongemakkelijke waarheden

**Eén. "120 vragen, 30 eigenschappen" is geen onderscheid.** De gratis Big Five van 123test is
óók 120 items met 30 subschalen, en die van hen komt uit een gepubliceerd itemmodel met een
normgroep. Het getal 120 mag blijven staan als beschrijving van de inspanning, maar het mag
nergens als bewijs van grondigheid worden gebruikt, want dan verliest het van een sterkere
partij die hetzelfde getal heeft.

**Twee. Arcana heeft geen enkel sociaal bewijs.** Geen afnamecijfer, geen recensies, geen
bekende gebruikers, geen pers. Testcentrum Groei zet er 431.563 neer. Dat gat is niet te dichten
met tekst en het moet ook niet verzonnen worden. Het enige eerlijke antwoord is bewijs van een
andere soort — controleerbaarheid in plaats van populariteit. Zie §5, de sectie *Kijk het zelf
na*.

**Drie. De merknaam werkt tegen de positionering.** Een zoekopdracht op "Arcana Profile
persoonlijkheidstest" levert tarot, manga, een Zweedse band, een spel en een AI-quiz op — de
site zelf komt in de resultaten niet voor. C §1 stelde al vast dat *Arcana* bij een deel van de
bezoekers "tarot" oproept, wat het tegenovergestelde is van een rekeninstrument. Dat is nu
bevestigd in de zoekresultaten. De naam hoeft niet te veranderen, maar hij mag nergens het werk
doen dat de propositie moet doen — en dat is op dit moment precies wat er gebeurt, want de h1
is de merknaam.

## 2.4 Positioneringsmatrix

De twee assen die ertoe doen zijn **herleidbaarheid van de uitspraken** en **totale prijs, in
geld én in gegevens**. Op geen van de andere gangbare assen (diepte, snelheid, validiteit,
bekendheid) wint Arcana, en op deze twee samen staat niemand anders.

```
  herleidbaar
  (het cijfer            ARCANA PROFILE
  staat erbij)                 ●
       ▲                       :
       │                       :         123test Big Five (betaald)
       │                       :          ●   Truity Big Five
       │                       :              ●   NOA / Ixly (zakelijk)
       │   ─────────────────── : ─────────────────────── ●
       │                       :
       │    123test gratis     :
       │         ●             :    Testcentrum Groei (betaald) ●
       │                       :
       │  gratisp.test.nl ●    :    16personalities Premium ●
       │                       :    Enneagram Institute ●
  type +          16p gratis ● :
  verhaal         ────────────────────────────────────────▶
              niets            :        geld + account + e-mail
                     totale prijs (geld én gegevens)
```

**Wat de matrix laat zien.** Het kwadrant linksboven — hoge herleidbaarheid, lage totale prijs —
is leeg op Arcana na. Dat is geen toeval: herleidbaarheid kost ontwikkelwerk dat je normaal
terugverdient met een betaalmuur, en wie geen betaalmuur heeft, verdient aan gegevens. Arcana
doet geen van beide, en dat is de positie.

**Waar de matrix eerlijk moet zijn.** Er is een derde as die niet getekend is en waarop Arcana
laatste staat: **deugdelijkheid** (normgroep, validatiestudie, COTAN). Op die as staan NOA en
Ixly bovenaan, dan 123test en Truity, dan de gratis Big Five-tests, dan de typetests, en dan
Arcana. Die as moet niet worden weggelaten uit de argumentatie maar juist genoemd — dat is wat
de sectie *Eerlijk gezegd* al doet, en het is de reden dat die sectie onaantastbaar is.

## 2.5 Waar de concurrentie beter is — samengevat

| Wie | Waarin beter | Wat Arcana daartegen kan zeggen |
|---|---|---|
| NOA, Ixly | Normgroep, COTAN-beoordeling, geschikt voor beslissingen | "Klopt. Daar moet je bij hen zijn. Hier is het voor jezelf." |
| 123test | Gevalideerd model, gratis laag, vindbaarheid, 120 items mét normgroep | "Hun cijfers zijn beter onderbouwd. Hun verhaal staat achter €14,95." |
| Truity | Gepubliceerde betrouwbaarheidsdocumentatie | "Hun bewijs staat in een technisch document. Het onze staat in je rapport." |
| 16personalities | Merkbekendheid, sociale valuta, tien minuten | "Hun type is deelbaar. Ons rapport is naleesbaar. Kies zelf." |
| Testcentrum Groei | 431.563 afnames als sociaal bewijs | *(niets — dit gat is reëel)* |
| Enneagram Institute | Een verdienmodel dat de eerlijkheidspositie draagt | *(dit is een openstaande vraag voor werkstroom F)* |

---

# 3 — De domeinmigratie

Dit is een bevestigde live fout, geen risico en geen verbeterpunt. Hij staat nu op
`arcanaprofile.com` en hij instrueert zoekmachines om die site niet te indexeren.

## 3.1 De complete lijst — elke plek, met de exacte vervanging

Gecontroleerd in de bestanden zelf op 22 september 2026. **Elf voorkomens in drie bestanden.**

### `/home/claude/site/index.html` — 9 voorkomens

| Regel | Nu | Vervangen door |
|---|---|---|
| 14 | `<link rel="canonical" href="https://speaktoart.com/" />` | `<link rel="canonical" href="https://arcanaprofile.com/" />` |
| 27 | `<meta property="og:url" content="https://speaktoart.com/" />` | `<meta property="og:url" content="https://arcanaprofile.com/" />` |
| 28 | `<meta property="og:image" content="https://speaktoart.com/og-image.jpg" />` | `<meta property="og:image" content="https://arcanaprofile.com/og-image.jpg" />` |
| 38 | `<meta name="twitter:image" content="https://speaktoart.com/og-image.jpg" />` | `<meta name="twitter:image" content="https://arcanaprofile.com/og-image.jpg" />` |
| 46 | `"@id": "https://speaktoart.com/#website",` | `"@id": "https://arcanaprofile.com/#website",` |
| 47 | `"url": "https://speaktoart.com/",` | `"url": "https://arcanaprofile.com/",` |
| 54 | `"@id": "https://speaktoart.com/#app",` | `"@id": "https://arcanaprofile.com/#app",` |
| 56 | `"url": "https://speaktoart.com/",` | `"url": "https://arcanaprofile.com/",` |
| 76 | `"@id": "https://speaktoart.com/#faq",` | `"@id": "https://arcanaprofile.com/#faq",` |

### `/home/claude/site/sitemap.xml` — 1 voorkomen

| Regel | Nu | Vervangen door |
|---|---|---|
| 4 | `    <loc>https://speaktoart.com/</loc>` | `    <loc>https://arcanaprofile.com/</loc>` |

### `/home/claude/site/robots.txt` — 1 voorkomen

| Regel | Nu | Vervangen door |
|---|---|---|
| 4 | `Sitemap: https://speaktoart.com/sitemap.xml` | `Sitemap: https://arcanaprofile.com/sitemap.xml` |

### De fix, in één commando

```bash
cd /home/claude/site
grep -rl 'speaktoart\.com' . | xargs sed -i 's#https://speaktoart\.com#https://arcanaprofile.com#g'
# controle: moet 0 regels teruggeven
grep -rn 'speaktoart' . ; echo "resterende voorkomens: $(grep -rc 'speaktoart' . | grep -v ':0' | wc -l)"
```

**Nog twee dingen in dezelfde bestanden die nu meteen mee kunnen.** Ze horen niet bij de
domeinfout maar ze zitten in dezelfde regels en het is zonde ze twee keer aan te raken:

```xml
<!-- sitemap.xml: voeg lastmod toe -->
<url>
  <loc>https://arcanaprofile.com/</loc>
  <lastmod>2026-09-22</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```

```html
<!-- index.html, direct onder og:image:height -->
<meta property="og:image:alt" content="Arcana Profile — een persoonlijkheidstest met een rapport dat zich laat narekenen" />
```

## 3.2 Wat er misgaat zolang dit niet gefixt is, per gevolg

**1. De canonical is een instructie om deze site niet te indexeren.**
Dit is het zwaarste gevolg en het staat los van de rest. Een `rel="canonical"` naar een ander
domein zegt tegen Google: *de echte versie van deze pagina staat elders, toon die.* Google volgt
zo'n aanwijzing niet blind, maar hij weegt zwaar, zeker op een site met weinig externe links die
het tegendeel bewijzen. De waarschijnlijke uitkomst is dat `arcanaprofile.com` niet of
nauwelijks in de index komt. Dat komt overeen met wat er nu gebeurt: een zoekopdracht op
"arcanaprofile.com Arcana Profile persoonlijkheidstest" levert de site zelf niet op.

**2. De site kan niet ranken op de eigen merknaam.**
Zolang er geen indexeerbare pagina is, wint elke tarotsite, manga-pagina en quizfarm van de
eigenaar op zijn eigen naam. Dat is de goedkoopste zoekwoordwinst die er bestaat en hij ligt nu
onbenut.

**3. Elke gedeelde link toont het verkeerde adres.**
`og:url` staat op `speaktoart.com`. WhatsApp, LinkedIn, Slack, Signal, Mastodon en Facebook
tonen dat domein in de voorbeeldkaart. Iemand die de link krijgt van een vriend leest een naam
die niets met het product te maken heeft. Bij een product waarvan de hele belofte vertrouwen is,
is een verkeerde afzender op de deelkaart duurder dan bij een gemiddelde site.

**4. De voorbeeldafbeelding laadt mogelijk niet.**
`og:image` en `twitter:image` wijzen naar `https://speaktoart.com/og-image.jpg`. Als dat domein
niet meer draait, niet meer van de eigenaar is, of dat bestand niet serveert, blijft de kaart
leeg of valt hij terug op een kale tekstkaart. De afbeelding (127 KB, 1200×630) staat gewoon op
de juiste plek op het juiste domein; hij wordt alleen op het verkeerde adres opgehaald.

**5. De structured data wordt aan het verkeerde domein toegekend, of genegeerd.**
Alle drie de `@id`'s en beide `url`-velden wijzen naar `speaktoart.com`. Een `WebSite`- en
`WebApplication`-entiteit die zichzelf op een ander domein plaatst dan waar ze staat, wordt door
Google genegeerd of — in het slechtste geval — als eigenschap van dat andere domein gelezen.
Al het werk dat in die JSON-LD zit, en dat is goed werk, doet nu niets.

**6. De sitemap verwijst naar een pagina die niet op dit domein staat.**
`robots.txt` verwijst naar een sitemap op `speaktoart.com`, en die sitemap noemt een URL op
`speaktoart.com`. Als je `arcanaprofile.com` in Search Console indient, vindt Google geen
geldige sitemap voor dit domein. Een sitemap met URL's buiten het eigen domein wordt als
ongeldig afgekeurd.

**7. Het risico dat niemand overziet: wat er op dat andere domein staat.**
Als `speaktoart.com` niet meer van de eigenaar is en door iemand anders is geregistreerd, dan
verwijst deze site op negen plekken naar inhoud waar niemand controle over heeft — inclusief
een afbeelding die in elke deelkaart wordt geladen. Dat is niet alleen een SEO-probleem.

> **Geverifieerd op 22-09-2026 — route A is van toepassing.** Wat `speaktoart.com` serveert
> was vanuit deze omgeving niet vast te stellen (het uitgaande verkeer liep via een proxy die
> beide domeinen blokkeerde), maar het is daarna alsnog met een echte browser gecontroleerd.
> **Het domein is in de lucht en serveert een werkende site met `<title>Arcana Mirror</title>`,
> h1 "Een persoonlijke spiegel voor je patronen, kracht en groeirichting", dezelfde 120 vragen,
> dezelfde 20-25 minuten, dezelfde disclaimer en géén canonical.** Het is een eerdere versie van
> hetzelfde product onder een andere naam, en het is nog van de eigenaar. Volg dus **route A**
> in §3.3, niet route B. Dit maakt het probleem ernstiger, niet lichter: Google krijgt een
> geldige canonical naar een bestaande, vergelijkbare pagina — precies de situatie waarin een
> canonical wél wordt opgevolgd. Zie `G-rebuild-spec.md` §1b voor de volledige bevinding en
> taak 2b.

## 3.3 De 301-kwestie

### Route A — `speaktoart.com` is nog van de eigenaar

Dit is de gunstige uitkomst, en de handelingen zijn dan:

1. **Zet een 301 op de hele boom**, van `speaktoart.com` naar `arcanaprofile.com`, met behoud
   van het pad. Geen redirect naar alleen de homepage: dat is een "soft 404" voor elke
   diepere URL en Google behandelt zo'n redirect alsof hij er niet is.

   Op Hostinger (Apache), in `.htaccess` op `speaktoart.com`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^(www\.)?speaktoart\.com$ [NC]
   RewriteRule ^(.*)$ https://arcanaprofile.com/$1 [R=301,L]
   ```

   Op nginx:
   ```nginx
   server {
     server_name speaktoart.com www.speaktoart.com;
     return 301 https://arcanaprofile.com$request_uri;
   }
   ```

2. **Houd het domein minstens een jaar aan, liefst langer.** Een 301 draagt autoriteit over,
   maar alleen zolang hij bestaat. Zodra het domein vervalt, verdwijnt de overdracht en kan het
   domein bovendien door iemand anders worden opgepikt.

3. **Dien een adreswijziging in bij Search Console.** Voeg beide domeinen toe als property,
   verifieer beide, en gebruik dan *Instellingen → Adreswijziging* op `speaktoart.com`. Dit is
   de enige manier om Google expliciet te vertellen dat het om één verhuizing gaat en niet om
   twee losse sites. Het werkt alleen als de 301 al actief is en beide properties geverifieerd
   zijn.

4. **Laat de 301 staan ook nadat de index is bijgewerkt.** Oude links in WhatsApp-geschiedenis,
   bookmarks en e-mails blijven jaren doorwerken.

### Route B — `speaktoart.com` is niet meer van de eigenaar

Dit is waarschijnlijker dan het lijkt, want de naam suggereert een eerder, ander project. In dat
geval:

1. **Je kunt geen 301 zetten en je hoeft het niet te proberen.** Er valt niets over te dragen:
   de autoriteit, voor zover die er was, hoort bij een domein waar je geen toegang toe hebt.
2. **De fix in §3.1 is dan de hele fix.** Verwijder elke verwijzing en klaar. Er is geen verlies
   te beperken, alleen een verkeerde aanwijzing weg te halen.
3. **Controleer of het domein nu iets anders serveert.** Als er een parkeerpagina, een
   advertentiesite of iets ongewensts op staat, is de urgentie van de fix hoger: je laadt op dit
   moment een afbeelding van dat domein in elke deelkaart en je verwijst er negen keer naar.
4. **Overweeg het domein terug te kopen als het te koop staat en het goedkoop is** — niet voor
   de SEO, maar om te voorkomen dat er ooit iets op komt te staan dat aan dit product wordt
   gekoppeld. Als het duur is: niet doen. De waarde is laag.
5. **Zoek naar inkomende links naar het oude domein.** Als er ooit ergens naar
   `speaktoart.com` is gelinkt in de context van dit product, is dat nu verloren verkeer dat
   niet terug te halen is. Vermeld dat in het overdrachtsdocument zodat niemand er later naar
   zoekt.

### In beide routes

- **Kies één canonieke hostnaam en dwing die af.** Beslis of het `arcanaprofile.com` of
  `www.arcanaprofile.com` wordt, en 301 de andere ernaartoe. Beide bereikbaar laten zonder
  redirect is een tweede, kleinere versie van hetzelfde probleem.
- **Forceer HTTPS.** `http://` moet 301'en naar `https://`.
- **Controleer of `og-image.jpg` daadwerkelijk bereikbaar is op het nieuwe domein**
  (`curl -I https://arcanaprofile.com/og-image.jpg` → `200` en `content-type: image/jpeg`).

## 3.4 Verificatiechecklist na de fix

Werk deze in volgorde af. De eerste drie kunnen binnen tien minuten; de rest heeft tijd nodig
omdat je op Google wacht.

**Direct, met `curl`:**

```bash
# 1. De pagina zelf: 200, en de juiste canonical
curl -sSI https://arcanaprofile.com/ | head -20
curl -sS  https://arcanaprofile.com/ | grep -Ei 'canonical|og:url|og:image|@id'
#    → verwacht: uitsluitend arcanaprofile.com, nergens speaktoart

# 2. De deelafbeelding bestaat echt
curl -sSI https://arcanaprofile.com/og-image.jpg | grep -Ei 'HTTP/|content-type|content-length'
#    → verwacht: 200, image/jpeg, ~127000 bytes

# 3. robots en sitemap
curl -sS https://arcanaprofile.com/robots.txt
curl -sS https://arcanaprofile.com/sitemap.xml
#    → verwacht: beide arcanaprofile.com

# 4. Alleen bij route A: de oude host stuurt door met behoud van pad
curl -sSI https://speaktoart.com/ | grep -Ei 'HTTP/|location'
#    → verwacht: 301 + location: https://arcanaprofile.com/

# 5. Hostnaam- en protocolvarianten
for u in http://arcanaprofile.com/ https://www.arcanaprofile.com/ ; do
  echo "--- $u"; curl -sSI "$u" | grep -Ei 'HTTP/|location'
done
#    → verwacht: 301 naar de gekozen canonieke variant
```

**Structured data:**

- [ ] Draai de **Rich Results Test** (`search.google.com/test/rich-results`) op
      `https://arcanaprofile.com/`. Verwacht: `WebSite`, `WebApplication` en `FAQPage` worden
      herkend, geen fouten, geen waarschuwingen over URL's op een ander domein.
- [ ] Draai daarnaast de **Schema Markup Validator** (`validator.schema.org`) — die is strenger
      en meldt dingen die de Google-test negeert.
- [ ] Controleer met het oog dat geen enkele `@id` of `url` nog het oude domein bevat. De
      Rich Results Test toont de waarden uitgeklapt.

**Deelkaarten:**

- [ ] **Facebook Sharing Debugger** (`developers.facebook.com/tools/debug/`) → plak de URL →
      klik **Scrape Again**. Dat is verplicht: zonder opnieuw ophalen blijft de oude, verkeerde
      kaart maanden in de cache staan.
- [ ] **LinkedIn Post Inspector** (`linkedin.com/post-inspector/`) → idem, LinkedIn heeft een
      eigen hardnekkige cache.
- [ ] **X/Twitter Card Validator** als dat kanaal wordt gebruikt.
- [ ] **De echte test:** stuur de link naar jezelf via WhatsApp en kijk naar de kaart. Titel,
      afbeelding en domeinnaam moeten alle drie kloppen. Dit is de enige controle die meet wat
      de bezoeker werkelijk ziet.

**Search Console:**

- [ ] Voeg `arcanaprofile.com` toe als property (domeinproperty via DNS is het sterkst, want die
      dekt www, non-www, http en https in één).
- [ ] **URL-inspectie** op `https://arcanaprofile.com/`: controleer dat de door Google gekozen
      canonical gelijk is aan de door de gebruiker opgegeven canonical. Zolang daar nog
      `speaktoart.com` staat, is de fix niet doorgekomen.
- [ ] Klik **Indexering aanvragen**.
- [ ] Dien `https://arcanaprofile.com/sitemap.xml` in onder *Sitemaps*. Status moet "Geslaagd"
      worden, met 1 ontdekte URL.
- [ ] Alleen bij route A: verifieer ook `speaktoart.com` en dien de **adreswijziging** in.
- [ ] Na één week: controleer onder *Pagina's* dat de homepage onder "Geïndexeerd" staat en niet
      onder "Alternatieve pagina met correcte canonieke tag" — dat laatste is precies de fout
      die deze bug veroorzaakt.
- [ ] Na twee weken: zoek op `site:arcanaprofile.com`. Verwacht: minstens één resultaat.
- [ ] Na vier weken: zoek op `arcana profile persoonlijkheidstest`. De site hoort nu op de
      eerste pagina te staan op zijn eigen naam.

## 3.5 Hoe je voorkomt dat dit terugkomt

De oorzaak is bekend en alledaags: deze bestanden zijn ontstaan als kopie van een eerder project
op `speaktoart.com`, en het domein stond op negen plekken ingetypt. Zolang het op negen plekken
ingetypt blijft staan, gebeurt dit bij de volgende verhuizing opnieuw. Twee maatregelen, en je
hebt ze allebei nodig: de eerste haalt de oorzaak weg, de tweede vangt af wat er door de vingers
glipt.

### Maatregel 1 — één bronvariabele

Het domein hoort exact één keer in de codebase te staan, en overal elders afgeleid te worden.

**In `.env` (of `.env.production`):**
```
VITE_SITE_URL=https://arcanaprofile.com
```

**In `index.html`**, met `vite-plugin-html` of de ingebouwde `%VITE_*%`-vervanging van Vite:
```html
<link rel="canonical" href="%VITE_SITE_URL%/" />
<meta property="og:url"   content="%VITE_SITE_URL%/" />
<meta property="og:image" content="%VITE_SITE_URL%/og-image.jpg" />
<meta name="twitter:image" content="%VITE_SITE_URL%/og-image.jpg" />
```

**`robots.txt` en `sitemap.xml` worden gegenereerd, niet getypt.** Zet ze in een klein
buildscript dat dezelfde variabele leest:

```js
// scripts/generate-seo-files.mjs — draait in `npm run build`
import { writeFileSync, mkdirSync } from 'node:fs';

const SITE = process.env.VITE_SITE_URL;
if (!SITE || !/^https:\/\/[a-z0-9.-]+$/.test(SITE)) {
  throw new Error(`VITE_SITE_URL ontbreekt of is ongeldig: ${SITE}`);
}
const vandaag = new Date().toISOString().slice(0, 10);

mkdirSync('dist', { recursive: true });

writeFileSync('dist/robots.txt',
`User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

writeFileSync('dist/sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${vandaag}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);

console.log(`SEO-bestanden gegenereerd voor ${SITE}`);
```

Hetzelfde geldt voor de JSON-LD: laat die uit een klein object genereren met `SITE` als enige
domeinbron, in plaats van hem als letterlijke tekst in `index.html` te laten staan.

### Maatregel 2 — een buildcheck die faalt op elk vreemd domein

De variabele lost de oorzaak op, maar iemand die over een jaar snel een `og:image` toevoegt, typt
er weer een adres in. Daarom een controle die de build laat falen. Niet alleen op
`speaktoart.com` — op **elke** absolute URL die niet het eigen domein is en niet op een korte
witte lijst staat.

```js
// scripts/check-domains.mjs
// Draait na de build. Exit-code 1 laat CI en `npm run build` falen.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const SITE = process.env.VITE_SITE_URL;
if (!SITE) { console.error('FOUT: VITE_SITE_URL is niet gezet.'); process.exit(1); }

const EIGEN_HOST = new URL(SITE).hostname;              // arcanaprofile.com

// Hosts die wél in de uitvoer mogen voorkomen, met de reden erbij.
const TOEGESTAAN = new Set([
  EIGEN_HOST,
  'www.' + EIGEN_HOST,
  'schema.org',           // JSON-LD @context
  'www.w3.org',           // SVG- en XML-namespaces
  'www.sitemaps.org',     // sitemap-namespace
  'www.google.com',       // alleen als er ooit iets van Google in komt; anders weghalen
]);

// Hosts die nooit mogen voorkomen, ongeacht de rest. Hier staat de geschiedenis in.
const VERBODEN = ['speaktoart.com'];

const UITVOER = 'dist';
const TE_SCANNEN = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.webmanifest', '.svg']);

function* bestanden(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) yield* bestanden(pad);
    else if (TE_SCANNEN.has(extname(pad))) yield pad;
  }
}

const fouten = [];

for (const pad of bestanden(UITVOER)) {
  const regels = readFileSync(pad, 'utf8').split('\n');

  regels.forEach((regel, i) => {
    // 1. Harde blokkade op bekende oude domeinen, in welke vorm dan ook.
    for (const verboden of VERBODEN) {
      if (regel.toLowerCase().includes(verboden)) {
        fouten.push(`${pad}:${i + 1}  VERBODEN DOMEIN "${verboden}"\n      ${regel.trim().slice(0, 140)}`);
      }
    }
    // 2. Elke absolute https-URL naar een host die niet op de witte lijst staat.
    for (const m of regel.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
      const host = m[1].toLowerCase();
      if (!TOEGESTAAN.has(host)) {
        fouten.push(`${pad}:${i + 1}  ONBEKENDE HOST "${host}"\n      ${regel.trim().slice(0, 140)}`);
      }
    }
  });
}

// 3. De vier plekken die er sowieso moeten staan, op het juiste domein.
const html = readFileSync(join(UITVOER, 'index.html'), 'utf8');
const VERPLICHT = [
  [`<link rel="canonical" href="${SITE}/"`, 'canonical'],
  [`property="og:url" content="${SITE}/"`,  'og:url'],
  [`property="og:image" content="${SITE}/`, 'og:image'],
  [`"@id": "${SITE}/#website"`,             'JSON-LD @id WebSite'],
];
for (const [naald, naam] of VERPLICHT) {
  if (!html.includes(naald)) {
    fouten.push(`dist/index.html  ONTBREEKT of WIJKT AF: ${naam} (verwacht: ${naald})`);
  }
}

if (fouten.length) {
  console.error(`\n  Domeincontrole MISLUKT — ${fouten.length} probleem(en):\n`);
  for (const f of fouten) console.error('  · ' + f);
  console.error(`\n  Het canonieke domein is ${SITE} (uit VITE_SITE_URL).`);
  console.error('  Hoort een host er wel te staan? Zet hem in TOEGESTAAN in scripts/check-domains.mjs,');
  console.error('  met een opmerking erbij waarom.\n');
  process.exit(1);
}

console.log(`Domeincontrole geslaagd — alle absolute URL's wijzen naar ${EIGEN_HOST}.`);
```

**Inhaken in `package.json`:**
```json
{
  "scripts": {
    "build": "vite build && node scripts/generate-seo-files.mjs && node scripts/check-domains.mjs",
    "check:domains": "node scripts/check-domains.mjs"
  }
}
```

**Waarom deze check zo is opgezet.** Hij doet drie dingen die een simpele `grep -q speaktoart`
niet doet. Hij blokkeert het bekende oude domein *en* elk onbekend domein, zodat de volgende
verhuizing ook gedekt is. Hij controleert dat de vier belangrijkste velden er niet alleen zijn,
maar ook op het juiste domein staan — want een ontbrekende canonical is een net zo stille fout
als een verkeerde. En hij scant de **gebouwde uitvoer**, niet de broncode, dus hij ziet ook wat
een plug-in of een derde bibliotheek er alsnog in heeft gezet.

**Nog één, kosteloos: een `preflight`-regel in de release-checklist.** `A-baseline.md` §7 is al
een oplevercontrole. Voeg er één regel aan toe:

```
[ ] `npm run check:domains` geeft exit-code 0 op de gebouwde uitvoer
[ ] URL-inspectie in Search Console toont arcanaprofile.com als gekozen canonical
```

---

# 4 — Drie hero-varianten met hypothese

Alle drie zijn volledig uitgeschreven en direct te bouwen. Ze delen de structuur (eyebrow → h1 →
subkop → CTA → metaregel → drie geruststellingen) zodat het verschil werkelijk in de boodschap
zit en niet in de vorm. Alle drie voldoen aan C §7: geen uitroeptekens, geen emoji, geen
"ontdek jouw ware zelf", geen claim die de disclaimer ondergraaft.

**Wat in alle drie hetzelfde blijft:**
- Het merkwoord `ARCANA PROFILE` staat klein boven de eyebrow, als tekstregel in het
  hoofdletterkapitaal van de huidige eyebrow-stijl. Het verdwijnt dus niet — het houdt op het
  grootste element te zijn (C §4 rij 2).
- De metaregel onder de CTA: `120 vragen · 20–25 minuten · gratis · je kunt pauzeren`
  (C §4 rij 4).
- Direct onder de hero volgt in alle drie hetzelfde blok *Drie dingen die je hier wél kunt
  controleren* (§5.2).

---

## Variant A — Nieuwsgierigheid

> **ARCANA PROFILE**
>
> **ZELFINZICHT DAT JE KUNT NAREKENEN**
>
> # De meeste mensen kennen hun patroon.<br>Bijna niemand kan het benoemen.
>
> Beantwoord 120 vragen en lees terug wat er steeds gebeurt: waar je kracht doorslaat, op welk
> moment je afhaakt, en waarom dat telkens hetzelfde moment is. Bij elke uitspraak over jou
> staat het cijfer waar hij uit volgt.
>
> **[ Begin met de 120 vragen ]**
>
> 120 vragen · 20–25 minuten · gratis · je kunt pauzeren
>
> · Je antwoorden blijven op je eigen apparaat
> · Geen account, geen e-mailadres
> · Geen taalmodel — de test rekent

| | |
|---|---|
| **Eyebrow** | `ZELFINZICHT DAT JE KUNT NAREKENEN` |
| **H1** | `De meeste mensen kennen hun patroon. Bijna niemand kan het benoemen.` |
| **Subkop** | zie hierboven, 2 zinnen, 46 woorden |
| **CTA** | `Begin met de 120 vragen` |
| **Microcopy** | metaregel + de drie geruststellingen uit C §4 rij 5–7 |

**Wie hij aanspreekt.** De bezoeker die uit nieuwsgierigheid klikte en nog niets tegen het
product heeft. Vaak doorgestuurd door iemand anders ("moet je eens doen"). Die persoon wordt
niet geremd door twijfel maar door traagheid — ze moet een reden hebben om nú te beginnen in
plaats van later.

**Waarom deze kop.** Hij doet iets dat de andere twee niet doen: hij beschrijft een ervaring die
de lezer herkent voordat hij iets over het product zegt. "Ik weet dat er iets steeds terugkomt
maar ik kan het niet benoemen" is de meest voorkomende aanleiding om zo'n test te doen, en hij
staat nergens op de huidige site. De tweede zin van de subkop brengt het bewijs binnen zonder
dat de kop erover hoeft te gaan.

**Hypothese.**
> Wij denken dat een hero die begint bij een herkenbare ervaring in plaats van bij een
> producteigenschap **de start-rate verhoogt**, omdat de bezoeker binnen vijf seconden iets
> over zichzelf leest in plaats van iets over de test, en herkenning sneller tot een klik leidt
> dan begrip. **We geloven dat als** bij de 5-secondentest (§6) minstens 4 van de 5 deelnemers
> iets zeggen over *patroon, herkennen of benoemen* in plaats van alleen "een
> persoonlijkheidstest", **en** de start-rate ten minste 15% relatief hoger ligt dan bij de
> huidige hero.

**Risico dat we accepteren.** Deze variant zegt niets over privacy of prijs in de kop. Als het
hoofdbezwaar in de doelgroep wantrouwen blijkt te zijn en niet traagheid, presteert hij het
slechtst van de drie. Dat is precies wat de test moet uitwijzen.

---

## Variant B — Bewijs

> **ARCANA PROFILE**
>
> **GEEN TAALMODEL. DE TEST REKENT.**
>
> # Een rapport over jezelf<br>dat zich laat narekenen
>
> Beantwoord 120 vragen en lees terug wat je patronen zijn. Bij elke uitspraak over jou staat
> het cijfer waar hij uit volgt — over je werk, je relaties, en de keuze waar je nu voor staat.
>
> **[ Start de test ]**
>
> 120 vragen · 20–25 minuten · gratis · je kunt pauzeren
>
> · Dezelfde antwoorden geven hetzelfde rapport
> · Je antwoorden blijven op je eigen apparaat
> · Geen account, geen e-mailadres

| | |
|---|---|
| **Eyebrow** | `GEEN TAALMODEL. DE TEST REKENT.` |
| **H1** | `Een rapport over jezelf dat zich laat narekenen` |
| **Subkop** | letterlijk de herschreven belofte uit C §4 rij 3 |
| **CTA** | `Start de test` |
| **Microcopy** | metaregel + drie geruststellingen, met de herhaalbaarheid bovenaan |

**Wie hij aanspreekt.** De scepticus. Iemand die eerder MBTI, DISC of Insights deed en achteraf
dacht dat het een horoscoop met een diploma was. Die persoon is het moeilijkst binnen te halen
en het meest waard als het lukt: hij doet de test zorgvuldiger, leest het rapport helemaal, en
is de enige die het aan anderen aanbeveelt met een argument erbij.

**Waarom deze kop.** *Een rapport dat zich laat narekenen* is volgens C §4 rij 11 de beste zin
van de hele site. Hij staat nu op 2.100 pixels scrollhoogte als h2 boven zes kaarten. Deze
variant doet niets anders dan hem naar boven halen — en dat is de meest directe uitvoering van
de positionering uit §1. De eyebrow zet de tegenstelling neer voordat de kop hem waarmaakt; twee
korte zinnen, allebei een feit.

**Hypothese.**
> Wij denken dat de propositie als h1 in plaats van de merknaam **de start-rate verhoogt en de
> afhaak op het naamformulier verlaagt**, omdat de bezoeker vóór de klik al weet waaróm deze
> test anders is en dus minder reden heeft om onderweg te heroverwegen. **We geloven dat als**
> bij de 5-secondentest minstens 4 van de 5 deelnemers het woord *narekenen*, *cijfer*, *score*
> of *controleren* gebruiken, **en** de start-rate ten minste 15% relatief hoger ligt dan bij de
> huidige hero, **en** het aandeel dat na de klik ook vraag 1 beantwoordt niet daalt.

**Waarom dit vooraf de meest waarschijnlijke winnaar is.** Hij is de directe vertaling van de
enige claim die deze markt niet heeft (§1.2), hij gebruikt tekst die al geschreven en getoetst
is, en hij repareert de bevinding uit C §1 letterlijk. De andere twee varianten zijn er om te
toetsen of dat klopt — niet als formaliteit.

---

## Variant C — Privacy

> **ARCANA PROFILE**
>
> **GEEN SERVER. GEEN ACCOUNT. GEEN E-MAILADRES.**
>
> # Dit rapport gaat nergens heen<br>behalve naar jou
>
> 120 vragen over je drijfveren, je conflictstijl en je schaduwkant, en een rapport van 33
> hoofdstukken dat je kunt bewaren. Je antwoorden staan in de opslag van je eigen browser — wij
> kunnen ze niet inzien, niet herstellen en niet terugsturen.
>
> **[ Start de test — zonder account ]**
>
> 120 vragen · 20–25 minuten · gratis · je kunt pauzeren
>
> · Geen e-mailadres, geen inlog, geen nieuwsbrief
> · Bij elke uitspraak staat het cijfer waar hij uit volgt
> · Wis je je browsergegevens, dan is het weg — ook voor ons

| | |
|---|---|
| **Eyebrow** | `GEEN SERVER. GEEN ACCOUNT. GEEN E-MAILADRES.` |
| **H1** | `Dit rapport gaat nergens heen behalve naar jou` |
| **Subkop** | zie hierboven; de tweede zin is C §2, versie 3, kolom 2, letterlijk |
| **CTA** | `Start de test — zonder account` |
| **Microcopy** | metaregel + drie geruststellingen, met het nadeel als derde |

**Wie hij aanspreekt.** Twee groepen tegelijk. De eerste: mensen die weleens ergens hun
e-mailadres hebben achtergelaten voor een gratis test en er daarna nieuwsbrieven van kregen. De
tweede, kleiner maar waardevoller: mensen die aarzelen omdát het over hun schaduwkant gaat. Die
tweede groep is precies degene die het product het meest te bieden heeft, en voor hen is de
privacybelofte geen hygiëne maar de voorwaarde om überhaupt eerlijk te antwoorden.

**Waarom deze kop.** Hij is het enige van de drie dat een toezegging doet in plaats van een
beschrijving. En de derde geruststelling — *wis je je browsergegevens, dan is het weg, ook voor
ons* — noemt het nadeel vóór het voordeel. Dat is C §7.6, techniek 1, en het is volgens die
richtlijn de goedkoopste geloofwaardigheidswinst die er bestaat. Het is ook het scherpst
mogelijke contrast met gratispersoonlijkheidstest.nl (§2.2), waar gratis je LinkedIn-profiel
kost.

**Hypothese.**
> Wij denken dat een hero die met de privacytoezegging opent **de start-rate verhoogt bij de
> groep die nu op de drempel blijft staan, en het eerlijkheidsniveau van de antwoorden
> verhoogt**, omdat de belangrijkste rem bij een test over je schaduwkant niet twijfel aan de
> uitkomst is maar de vraag wie het straks kan lezen. **We geloven dat als** in de
> usabilitytest (A-baseline §6, stap 3) *geen enkele* deelnemer "wat gebeurt er met mijn
> gegevens" als eerste bezwaar noemt — bij de huidige hero is dat een van de twee
> hoofdbezwaren — **en** de start-rate niet lager ligt dan bij variant B.

**Risico dat we accepteren.** Een kop die over gegevens gaat, zegt niets over wat de test
oplevert. Deze variant kan de bezoeker die nog niet wist dat hij iets te vrezen had, op een
gedachte brengen die hij zelf niet had. Dat is een reëel risico en het is een van de redenen om
deze variant te meten in plaats van hem te beredeneren.

---

## 4.4 Hoe je deze drie toetst nu er geen analytics is

`A-baseline.md` §4 legt uit dat er geen meting is en beschrijft drie routes om dat op te lossen
zonder de privacybelofte te breken. De aanbeveling daar — route 1, drie tellers, opt-in, alleen
voor stap 1 → 2 → 3 — is precies wat deze test nodig heeft. Hieronder de uitwerking, plus het
eerlijke antwoord op de vraag of het gaat werken.

### Laag 1 — de kwalitatieve toets (nu al mogelijk, geen code nodig)

Dit is de belangrijkste laag en hij kan deze week. Vijftien mensen, vijf per variant, het
5-secondenprotocol uit §6. Kosten: één middag. Wat het oplevert: of de boodschap overkomt. Wat
het niet oplevert: of mensen klikken.

Een variant die de 5-secondentest zakt, hoeft niet gebouwd te worden. Dat scheelt de helft van
het werk in laag 2.

### Laag 2 — de kwantitatieve toets (vraagt drie tellers)

**De meting.** Drie `fetch`-verzoeken naar een eigen eindpunt, elk met niets anders dan een
stapnummer en de variantletter. Geen ID, geen sessie, geen antwoorden, geen IP-opslag:

```
stap=1&variant=B   → landing getoond
stap=2&variant=B   → "Start de test" geklikt
stap=3&variant=B   → vraag 1 beantwoord
```

**De toestemming.** Eén regel onder de startknop, niet weggestopt, met een echte keuze:

> *We tellen drie dingen: dat deze pagina is geopend, dat er op de knop is geklikt, en dat de
> eerste vraag is beantwoord. Verder niets — geen antwoorden, geen apparaat, geen
> identificatie. Dat is de enige manier waarop we weten of deze pagina werkt.*
> **[ Meetellen ]  [ Liever niet ]**

Wie *Liever niet* kiest, wordt niet geteld en er wordt niets onthouden behalve die keuze.

**De toewijzing.** Willekeurig bij het eerste bezoek, vastgelegd in `localStorage` zodat een
terugkerende bezoeker dezelfde variant ziet. Dat is de enige extra sleutel die erbij komt, en
hij bevat één letter.

**De eerlijke rekensom, en die is ongemakkelijk.** Stel dat de huidige start-rate 20% is en je
wilt een relatieve verbetering van 30% (naar 26%) kunnen aantonen met 80% onderscheidend
vermogen. Dan heb je ruwweg **700 bezoekers per variant** nodig, dus **circa 2.100 bezoekers**
voor drie varianten. Wil je een kleinere verbetering zien — 15%, wat nog steeds veel is — dan
loopt dat op naar ongeveer 2.800 per variant, ofwel **ruim 8.000 bezoekers**.

**Dat betekent in de praktijk het volgende.** Als deze site die aantallen niet haalt binnen een
redelijke periode, is een driewegtest met statistische zekerheid niet haalbaar en moet je niet
doen alsof. Twee alternatieven die wel eerlijk zijn:

1. **Twee varianten in plaats van drie.** Laat variant A of C vallen op grond van laag 1 en test
   alleen de winnaar tegen B. Dat halveert bijna de benodigde aantallen.
2. **Opeenvolgend testen, met de beperking erbij genoemd.** Twee weken variant B, twee weken
   variant C, en vergelijk. Dat is methodologisch zwakker — seizoen, verkeersbron en
   nieuwsberichten vervuilen de vergelijking — maar bij een verschil van meer dan 50% is het
   signaal sterker dan de ruis. Noteer wat er in die weken gebeurde, zodat je achteraf weet
   welke vergelijking je niet mag maken.

Schrijf het resultaat op als *"variant B had een hogere start-rate, gemeten over N bezoekers,
met dit voorbehoud"* — niet als *"variant B wint"*. Op een site die op narekenbaarheid verkoopt
is het eigen meetwerk de eerste plek waar die norm moet gelden.

### Laag 3 — de gratis proxymetingen (nu al beschikbaar)

Drie signalen die niets kosten en geen code vragen:

- **Serverlogboeken.** De host telt al hoe vaak `index.html` wordt opgehaald. Dat geeft je de
  noemer van elke rate, zonder één regel clientcode. `A-baseline.md` §4, route 3.
- **Search Console.** Vertoningen en klikken per zoekterm, zodra de domeinfix is doorgekomen.
  Dat is geen conversiemeting, maar het vertelt je wél of een variant met een andere
  paginatitel meer of minder wordt aangeklikt in de zoekresultaten.
- **Eerste-klik-test met een panel.** Toon de hero aan 30 mensen en vraag waar ze zouden
  klikken. Meet niet de start-rate, maar wel of de CTA gevonden wordt. Bruikbaar om variant C's
  langere CTA (`Start de test — zonder account`) te controleren op leesbaarheid.

### De beslisregel, vooraf vastgelegd

Zet dit op papier vóór de test, niet erna:

1. Zakt een variant de 5-secondentest (§6), dan valt hij af, ongeacht de cijfers.
2. Slagen er twee voor de 5-secondentest en scheelt de start-rate minder dan 10% relatief, dan
   kies je de variant die de scepticus bedient — variant B — omdat die de positionering uit §1
   draagt en dus ook alle latere tekst, deelkaarten en zoekresultaten stuurt.
3. Wint variant C op start-rate én op het uitblijven van het privacybezwaar in de
   usabilitytest, dan wordt privacy de spits en moet §1 herzien worden. Dat zou een echt
   resultaat zijn en het moet niet worden weggeredeneerd.

---

# 5 — De volledige landingcopy

Kant-en-klaar, sectie voor sectie. Per sectie staat er: **wat er staat**, **wat er visueel moet
gebeuren**, en **waarom die sectie daar staat**.

**De volgorde wijkt op één punt af van de huidige site** en dat is de hele ingreep: het blok
*Drie dingen die je hier wél kunt controleren* verhuist van positie 4 naar positie 2, direct
onder de hero. C §1 stelde vast dat het woord *narekenbaar* nu pas op 2.100 pixels staat. Na
deze verhuizing staat het op ongeveer 700.

| # | Sectie | Nieuw / verplaatst / ongewijzigd |
|---|---|---|
| 1 | Boven de vouw | **Nieuw** (variant B) |
| 2 | Drie dingen die je wél kunt controleren | **Verplaatst naar boven** (was 4) |
| 3 | Het beeld | Ongewijzigd, nieuwe positie |
| 4 | De statbalk | Eén getal gecorrigeerd |
| 5 | Waarom dit anders leest | Grotendeels ongewijzigd, 4 van 6 kaarten bijgesteld |
| 6 | Hoe het werkt | Ongewijzigd op 3 zinnen na |
| 7 | Wat het meet | **Volledig ongewijzigd** |
| 8 | Wat je krijgt | Lead en één kaart bijgesteld |
| 9 | Kijk het zelf na | **Nieuw** |
| 10 | Voor wie | **Volledig ongewijzigd** |
| 11 | Eerlijk gezegd | **Volledig ongewijzigd — onaantastbaar** |
| 12 | Vragen (FAQ) | 5 van 8 ongewijzigd |
| 13 | Slot-CTA | Kop ongewijzigd, tekst vervangen |

---

## 5.1 Boven de vouw

**De copy** — variant B uit §4, als aanbevolen uitgangspunt:

> **ARCANA PROFILE**
>
> **GEEN TAALMODEL. DE TEST REKENT.**
>
> # Een rapport over jezelf dat zich laat narekenen
>
> Beantwoord 120 vragen en lees terug wat je patronen zijn. Bij elke uitspraak over jou staat
> het cijfer waar hij uit volgt — over je werk, je relaties, en de keuze waar je nu voor staat.
>
> **[ Start de test ]**
>
> 120 vragen · 20–25 minuten · gratis · je kunt pauzeren
>
> · Dezelfde antwoorden geven hetzelfde rapport
> · Je antwoorden blijven op je eigen apparaat
> · Geen account, geen e-mailadres

**Bij een lopende test** (de app kent deze staat al via `arcana_current_question`): de primaire
knop wordt `Verdergaan — vraag 43 van 120`, met `Opnieuw beginnen` als tekstknop eronder. Bij
een afgerond rapport: `Bekijk je rapport` primair, `Opnieuw beginnen` secundair. Beide bestaan
al in de bundel en blijven zo.

**Wat er visueel moet gebeuren.**
- De h1 wordt het grootste element van de pagina, in Cormorant Garamond, over twee regels
  gebroken op `dat zich`. Het merkwoord erboven is klein, in de bestaande
  eyebrow-hoofdletterstijl, met letterafstand.
- De eyebrow *GEEN TAALMODEL. DE TEST REKENT.* staat tussen merkwoord en h1, in het bestaande
  goud (`--editorial-gold`). Dit is de enige plek boven de vouw met kleur; hij trekt daarmee
  het oog naar de zin die het werk doet.
- De hele hero moet **binnen de eerste schermvulling passen op een telefoon van 667 px hoog**,
  tot en met de metaregel. De drie geruststellingen mogen deels onder de vouw vallen. Dit is een
  ontwerpeis, geen wens: hij bepaalt of de 5-secondentest slaagt.
- Eén CTA. Geen tweede knop naast de primaire.

**Waarom deze sectie hier staat.** Omdat de propositie nergens anders kan staan. C §1:
*"iemand die na de hero wegklikt heeft de propositie nooit gezien."* Dit is de enige sectie
waarvan we zeker weten dat elke bezoeker hem ziet.

---

## 5.2 Drie dingen die je hier wél kunt controleren

**De copy** — letterlijk C §2, versie 3. Geen woord veranderd:

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

En eronder, kleiner en in `--color-ink-faint`:

> Wat dit niet oplost: dat je jezelf beoordeelt. Alle 120 antwoorden komen van jou, dus het
> rapport meet hoe je jezelf ziet — niet hoe je bent. Dat is minder dan het lijkt, en meer dan
> je denkt.

> **Eén correctie op C, en het is er een die C zelf voorschrijft.** In kolom 1 staat *"Doe hem
> over een jaar opnieuw"*, terwijl C §6.2 vaststelt dat de Voorwaarden zeggen dat de berekening
> kan wijzigen, en C §7.7 daarom *"volgende week"* voorschrijft. Neem de zin over als:
> *"Doe hem volgende week opnieuw met dezelfde antwoorden en je leest hetzelfde terug. Wijzigen
> we de berekening, dan staat dat bij je rapport vermeld."* Dat is dezelfde correctie die C §4
> rij 14 op kaart 2 doorvoert; hij hoort ook hier te gelden.

**Wat er visueel moet gebeuren.**
- Drie kolommen op desktop, gestapeld op telefoon. **Géén kaarten.** De rest van de pagina
  bestaat uit kaarten; dit blok moet daar visueel buiten vallen zodat het als deel van de hero
  leest en niet als eerste van tien secties.
- Elke kolom krijgt één van de bestaande accentkleuren die nu ongebruikt in `:root` staan:
  narekenbaar → `--editorial-gold`, privé → `--teal`, grenzen → `--color-ink-soft`. Alleen op
  de tussenkop of een dun lijntje erboven, niet als vlak. `A-baseline.md` §3.2 noemt het
  ongebruikte kleursysteem als een van de oorzaken van de monotonie; dit is de eerste plek om
  het aan te zetten, en meteen de plek waar het betekenis draagt.
- De regel eronder staat in grijs, smal, zonder omkadering. Hij mag niet als disclaimer lezen
  maar als terzijde.
- Geen kop met eyebrow erboven. Dit blok hoort bij de hero.

**Waarom deze sectie hier staat.** Dit is de hele ingreep van werkstroom E in één verplaatsing.
Op 700 px in plaats van 2.100 px staat de propositie, de privacybelofte en de zelfbegrenzing —
drie keer een controleerbare bewering, vóórdat de bezoeker iets heeft moeten geloven. Het woord
*wél* in de kop erkent stilzwijgend dat er veel níet te controleren valt aan een
persoonlijkheidstest, en dat is de erkenning die de scepticus nodig heeft voordat hij iets
aanneemt.

---

## 5.3 Het beeld

**De copy.** Geen.

**Wat er visueel moet gebeuren.** De bestaande sepia-gravure (`valley-zxDIuK9C.webp`,
1600 × 651), volle breedte, `alt=""` en `aria-hidden="true"` — dat staat nu al correct in de
bundel en moet zo blijven; het is een decoratief beeld en het hoort geen tekstalternatief te
hebben. Wat wél moet veranderen is de positie: hij stond op plek 2, waar hij de propositie naar
beneden duwde. Nu staat hij op plek 3, als rustpunt ná het argument.

Werkstroom B levert de beslissing of dit beeld blijft. Als er één beeld bijkomt, hoort het hier
of bij §5.9.

**Waarom deze sectie hier staat.** `A-baseline.md` §3.2: één beeld op 7.083 px paginahoogte is
één visueel rustpunt per zeven schermen. Een rustpunt hoort na inspanning, niet ervoor.

---

## 5.4 De statbalk

**De copy** — één getal gecorrigeerd conform `G-rebuild-spec.md` §3 tegenspraak 1 (dat besluit
vervangt het advies `7.500+` uit C §4 rij 9; gemeten over acht fixtures: 5.711–6.327 woorden):

> **120** vragen in vier vraagsoorten
> **33** hoofdstukken in je rapport
> **5.700+** woorden, met de cijfers erbij
> **12** dimensies die gemeten worden

**Wat er visueel moet gebeuren.** Vier getallen op één rij op desktop, twee bij twee op telefoon.
Getal groot in Cormorant, label klein in Inter. Ongewijzigd ten opzichte van nu.

**Waarom deze sectie hier staat en waarom hij niet hoger mag.** Cijfers overtuigen alleen iemand
die al besloten heeft dat het de moeite waard kan zijn. Als eerste indruk zijn ze een
onderscheid dat de concurrent kan namaken — 123test heeft óók 120 items en 30 subschalen, met
een normgroep erbij (§2.3). Pas ná het narekenbaarheidsblok betekent "5.700+ woorden, met de
cijfers erbij" iets wat elders niet staat.

---

## 5.5 Waarom dit anders leest

**De copy** — kop, eyebrow en lead ongewijzigd (C §4 rij 10–12 markeren alle drie als
`[houden]`), vier van de zes kaarten bijgesteld volgens C §4 rij 13–18:

> **WAAROM DIT ANDERS LEEST**
> ## Een rapport dat zich laat narekenen
> *De meeste persoonlijkheidstests geven je een type en een verhaal dat op veel mensen past.
> Hier hangt elke uitspraak aan een cijfer, en dat cijfer staat erbij.*

> **Bij elke uitspraak staat het cijfer**
> Geen algemene typeringen die op iedereen passen. Wat er over jou gezegd wordt, hangt aan een
> gemeten score op een specifieke eigenschap — en die score staat erbij. Staat er iets over je
> conflictstijl, dan lees je het getal waar het uit volgt. De acht beschouwingen achteraan zijn
> de uitzondering: daar zijn de openingen algemeen, en dat staat er per stuk bij.

> **Dezelfde antwoorden geven hetzelfde rapport**
> Er zit geen taalmodel in dat elke keer iets anders verzint. De test rekent, en die berekening
> ligt vast. Doe je hem volgende week opnieuw met dezelfde antwoorden, dan lees je hetzelfde
> terug. Wijzigen we de berekening, dan staat dat bij je rapport vermeld.

> **Ook de kant die je liever niet leest**
> De meeste tests vertellen je vooral wat je goed doet. Hier staat er ook in waar je kracht
> doorslaat, wat je vermijdt, en wat mensen om je heen merken zonder het te zeggen. Eerlijk,
> maar niet hard.

> **Vier vraagsoorten, geen eindeloze eens-of-oneens**
> Naast stellingen krijg je keuzes tussen twee dingen die allebei kloppen, situaties waarin je
> moet kiezen, en rijtjes om op volgorde te zetten. Dat vangt nuance die één schaal mist. De
> eerste zestig gaan het snelst; daarna wordt het afwisselender.

> **Je gegevens gaan nergens heen**
> Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen
> browser. Wis je je browsergegevens, dan is het weg — ook voor ons.

> **Van jou, om te bewaren — en om één pagina van door te geven**
> Download je rapport als PDF of tekstbestand, print het, of neem het mee naar een gesprek met
> je coach of therapeut. Eén hoofdstuk is geschreven om apart door te sturen naar iemand die
> dichtbij staat, zonder dat de rest meegaat.

**Wat hier bewust niet verandert.** Kaart 3 en kaart 5 blijven woord voor woord staan. C noemt
*"Eerlijk, maar niet hard"* en *"— ook voor ons"* allebei onaanraakbaar, en dat klopt: dat zijn
de twee zinnen op deze pagina waar het merk in één adem zichtbaar wordt. De eyebrow, de h2 en de
lead blijven ook letterlijk staan. Dit is een sectie die goed geschreven is; het probleem was
uitsluitend waar hij stond.

**Wat er visueel moet gebeuren.** Zes kaarten in een raster van drie. Ongewijzigd ten opzichte
van nu, behalve dat de eerste kaart visueel iets zwaarder mag zijn (bijvoorbeeld een goudkleurig
lijntje boven de kop) omdat hij de hoofdclaim draagt.

**Waarom deze sectie hier staat.** Hij verdiept wat §5.2 in drie zinnen beweerde. De volgorde
is: claim (hero) → controleerbaar maken (§5.2) → uitwerken (hier).

---

## 5.6 Hoe het werkt

**De copy** — eyebrow, h2 en lead ongewijzigd (C §4 rij 23 markeert alle drie als `[houden]`),
drie zinnen bijgesteld volgens C §4 rij 19–22:

> **HOE HET WERKT**
> ## Van 120 antwoorden naar één patroon
> *Je vult geen hokje in. Elk antwoord verschuift meerdere scores tegelijk, en pas aan het einde
> ontstaat het beeld.*

> **01 — Je beantwoordt 120 vragen**
> Stellingen, keuzes, situaties en rijtjes op volgorde. De volgende vraag verschijnt vanzelf
> zodra je antwoordt — je hoeft nergens op te klikken. Stoppen mag: je komt terug waar je
> gebleven was.

> **02 — Elk antwoord telt mee op 30 eigenschappen**
> Eén vraag raakt meestal meerdere eigenschappen, elk met een eigen gewicht. Zo ontstaat een
> score op 30 subdimensies, van behoefte aan controle tot gevoeligheid voor kritiek.

> **03 — Die 30 worden 12 hoofddimensies**
> De subdimensies tellen op tot twaalf hoofdlijnen: je innerlijke motor, je denkstijl, je
> conflictstijl, je schaduwkant, en acht andere.

> **04 — Je patroon krijgt een naam en een verhaal**
> Uit die twaalf volgt welk archetype het sterkst naar voren komt, hoe je onder druk verandert,
> en welke spanningsvelden er in je spelen. Die naam is een leeswijzer, geen hokje: waar hij en
> je eigen ervaring uiteenlopen, zegt je rapport dat je ervaring voorgaat.

**Wat er visueel moet gebeuren.** De bestaande trechter (120 → 30 → 12 → 1) blijft, met de vier
genummerde stappen eronder. **Twee wijzigingen.** De trechter is nu een reeks CSS-blokken; maak
er een SVG van, zodat hij schaalt, printbaar is en een `<title>` kan krijgen — `A-baseline.md`
§3.6 stelt vast dat er op de hele site geen SVG staat, en dit is de goedkoopste plek om daarmee
te beginnen. En de vier trechterbanden krijgen de vier accentkleuren die al in `:root` staan, in
dezelfde volgorde als het scorewiel in het rapport ze gebruikt, zodat het beeld een
voorbereiding wordt op wat de bezoeker straks te zien krijgt.

**Waarom deze sectie hier staat.** De bezoeker gelooft nu dat het narekenbaar is; hier ziet hij
hóe. C §4.4 noemt dit het best geschreven onderdeel van de pagina, en dat klopt: de vier stappen
lopen op en hebben een einde. Ze verdienen de plek direct na het argument.

---

## 5.7 Wat het meet

**De copy.** Volledig ongewijzigd. Eyebrow *WAT HET MEET*, h2 *Twaalf dimensies, dertig
eigenschappen*, de lead, en de twaalf kaarten van *Innerlijke motor* tot *Groeipad*. C §4 rij 24
markeert de kop als `[houden]`; de twaalf omschrijvingen zijn in de bundel stuk voor stuk van
het niveau van *"Hoeveel onzekerheid je verdraagt voor je grip zoekt"* en *"Welk deel van jezelf
je het liefst niet onder ogen ziet"*.

**Er hoeft hier niets te gebeuren en dat is de aanbeveling.** Dit is de sectie waar de verleiding
het grootst is om iets toe te voegen, omdat het er twaalf zijn. Doe dat niet.

**Wat er visueel moet gebeuren.** Twaalf kleine kaarten. Overweeg één ingreep: geef elke
dimensie hetzelfde kleurbolletje dat hij in het scorewiel van het rapport heeft. Dat kost niets,
gebruikt kleuren die al bestaan, en legt een visueel verband tussen de landingspagina en het
product erachter — precies het verband dat `A-baseline.md` §3.3 mist.

**Waarom deze sectie hier staat.** Hij beantwoordt de vraag "wat gaat dit over mij zeggen" en
hij is het inhoudelijke bewijs dat de twaalf dimensies geen marketingcategorieën zijn maar
onderwerpen waar iemand over nagedacht heeft.

---

## 5.8 Wat je krijgt

**De copy** — lead bijgesteld conform C §4 rij 25, rest ongewijzigd:

> **WAT JE KRIJGT**
> ## 33 hoofdstukken, 5.700+ woorden
> *Geen samenvatting van een alinea, maar een document van 33 hoofdstukken dat je kunt bewaren,
> printen of meenemen naar een gesprek — en dat begint met één pagina die alles samenvat, voor
> als je het later terugleest.*

De zes delen blijven letterlijk staan: *Wie je bent* · *Jij en anderen* · *Onder druk en in je
kracht* · *Groeien* · *Acht beschouwingen* · *Je actieplan*. En de zes bullets eronder ook, met
één toevoeging in de vijfde:

> · Je portret: al je twaalf dimensies samen in één getekend beeld
> · Je vijf sterkste eigenschappen én je vijf grootste valkuilen, met groeisleutel
> · Je stresspatroon: wie je wordt zodra de druk oploopt
> · Je spanningsvelden: twee dingen die je allebei wilt en elkaar in de weg zitten
> · Een hoofdstuk dat geschreven is om door te geven aan iemand die dichtbij staat
> · Een actieplan van vier weken met één concrete stap per week

**Wat er visueel moet gebeuren — en dit is de belangrijkste visuele aanbeveling van dit hele
document.** Deze sectie beschríjft het rapport in zes kaarten met tekst. Hij láát er niets van
zien. `A-baseline.md` §3.3: *"Het scorewiel is het sterkste visuele element dat dit product
bezit, en een bezoeker ziet het pas na 20 tot 25 minuten vragen beantwoorden."*

Zet het scorewiel hier. Niet als scherm­afdruk, maar als een echte, getekende versie met
verzonnen maar plausibele waarden, met eronder:

> *Dit is een voorbeeld, geen echte uitslag. Je eigen wiel staat bovenaan je rapport.*

Het is het enige beeld dat dit product bezit dat het product ook werkelijk toont. Als er één
ding uit werkstroom B hier moet landen, is het dit.

**Waarom deze sectie hier staat.** Nu de bezoeker weet dat het klopt en hoe het werkt, wil hij
weten wat hij overhoudt. Dit is het moment van de beloning.

---

## 5.9 Kijk het zelf na — bewijs en vertrouwen

**Dit is een nieuwe sectie.** Hij bestaat nu niet, en hij is nodig omdat dit product geen enkel
gangbaar bewijsmiddel bezit: geen recensies, geen afnamecijfer, geen bekende gebruikers, geen
normgroep. §2.3 stelt dat als tweede ongemakkelijke waarheid vast.

**De verleiding die je moet weerstaan.** Geen verzonnen citaten. Geen "al duizenden keren
gedaan" zonder bron. Geen sterren. Geen logo's van organisaties die er niets mee te maken
hebben. Op een site die verkoopt op controleerbaarheid is één verzonnen getal genoeg om de hele
pagina te laten vallen, en dit is de pagina die dat risico het hardst loopt.

**Het antwoord is bewijs van een andere soort.** Niet: veel mensen vonden het goed. Maar: je
hoeft ons niets te geloven, hier is het.

> **KIJK HET ZELF NA**
> ## Je hoeft ons niets te geloven
> *Drie dingen die je kunt controleren voordat je één vraag beantwoordt.*

> **Lees eerst een heel hoofdstuk**
> Een volledig voorbeeldrapport, geschreven uit verzonnen antwoorden. Alle 33 hoofdstukken, de
> cijfers erbij, niets weggelaten. Als het je niets zegt, kost dat je vijf minuten in plaats van
> vijfentwintig.
> **[ Lees het voorbeeldrapport ]**

> **Kijk hoe er gerekend wordt**
> Alle scores lopen van 0 tot 100, met 50 als midden. Elk antwoord verschuift meerdere scores
> tegelijk, elk met een eigen gewicht. In je rapport staat per dimensie op hoeveel antwoorden
> hij steunt, en hoe betrouwbaar dat is — ook wanneer dat weinig is.
> **[ Zo wordt het gerekend ]**

> **Controleer of het hetzelfde blijft**
> Maak je rapport, bewaar het als tekstbestand, wis je antwoorden en vul dezelfde antwoorden
> opnieuw in. Je krijgt hetzelfde document terug. Dat is wat "de test rekent" betekent, en het
> is de enige claim op deze pagina die je binnen een uur zelf kunt falsificeren.

En eronder, klein:

> We hebben geen bezoekcijfers, geen recensies en geen normgroep om je te laten zien. Wat we
> wel hebben is een rapport dat je van tevoren mag lezen.

**Wat er visueel moet gebeuren.**
- Drie blokken naast elkaar, waarvan de eerste visueel het zwaarst: een echte uitsnede uit het
  voorbeeldrapport — een halve paragraaf met een zichtbaar cijfer erin, als beeld of als
  levende tekst achter een verloop. Iets dat je kúnt lezen.
- De eerste knop is de enige secundaire CTA op de hele pagina. Hij mag als knop lezen, in de
  ghost-stijl, niet in het primaire bruin.
- De slotregel in grijs, zonder omkadering.

**Waarom deze sectie hier staat, en niet hoger.** Hij vraagt een investering (vijf minuten
lezen) die pas verdedigbaar is nadat de bezoeker weet wat het rapport is. En hij biedt de derde
weg die C §1, moment 2 mist: *"Er zijn twee knoppen op deze site — starten of niet starten — en
geen derde optie voor de vijftig procent die geïnteresseerd is maar geen 25 minuten heeft."*

> **Afhankelijkheid.** Deze sectie kan niet gebouwd worden zonder het voorbeeldrapport. Dat is
> werk — een verzonnen antwoordenset door de engine halen, controleren dat het resultaat
> geloofwaardig en niet vleiend is, en er een eigen URL voor maken. Het is ook het enige
> onderdeel van dit document dat drie problemen tegelijk oplost: het bewijsgat uit §2.3, de
> ontbrekende derde weg uit C §1, en het grootste SEO-gat uit §7. Als er één ding uit werkstroom
> E gebouwd wordt na de domeinfix, is het dit.

---

## 5.10 Voor wie

**De copy.** Volledig ongewijzigd. Eyebrow *VOOR WIE*, h2 *Wanneer dit de moeite waard is*, en
de vier kaarten: *Je staat voor een keuze* · *Je herkent een patroon maar kunt het niet
benoemen* · *Je werkt aan jezelf, met of zonder begeleiding* · *Je wilt begrepen worden door
iemand die dichtbij staat*.

**Dit is de best geschreven sectie van de hele pagina en er mag niets aan gebeuren.** Vier
situaties, allemaal concreet, geen enkele geformuleerd als doelgroep. *"Steeds dezelfde botsing,
steeds hetzelfde moment waarop je afhaakt"* is een zin waar iemand zichzelf in leest zonder dat
er een hokje bij hoeft. Dat is precies waar de hele site op mikt.

**Wat er visueel moet gebeuren.** Vier kaarten, twee bij twee. Ongewijzigd.

**Waarom deze sectie hier staat.** Zelfselectie op het laatste moment vóór de disclaimer. Wie
zich in geen van de vier herkent, hoort niet te beginnen, en dat is goed.

---

## 5.11 Eerlijk gezegd — wat dit niet is

**De copy.** Woord voor woord ongewijzigd. C §4 rij 26 markeert deze sectie als
**onaantastbaar** en dat wordt hier overgenomen zonder discussie.

> **EERLIJK GEZEGD**
> ## Wat dit niet is
> *Een instrument dat zijn eigen grenzen niet benoemt, verdient je vertrouwen niet. Daarom hier,
> niet verstopt in de kleine lettertjes.*

> · Geen medische of psychologische diagnose. Herken je iets zwaars, bespreek dat met je
>   huisarts of een behandelaar.
> · Geen selectie- of beoordelingsinstrument. Niet gemaakt om anderen mee te meten.
> · Geen wetenschappelijk gevalideerde test. Zorgvuldig opgebouwd en herleidbaar, maar zonder
>   normgroep of validatiestudie.
> · Geen voorspelling. Het beschrijft patronen die uit je antwoorden volgen, geen toekomst en
>   geen vaststaand karakter.

**Wat er visueel moet gebeuren.** De sectie heeft nu een eigen achtergrondvariant
(`landing__sectie--eerlijk`) en die moet blijven en mag zelfs sterker: dit is de enige sectie die
een duidelijk ander vlak verdient. Wat **niet** mag: kleiner zetten, inklapbaar maken, verplaatsen
naar de voettekst, of onder de FAQ schuiven. De positie — vóór de FAQ, vóór de slot-CTA, in de
volle leesbreedte — is onderdeel van de belofte.

**Waarom deze sectie hier staat.** Omdat hij hier staat. De plaatsing ís het argument: dit is de
laatste sectie waar de bezoeker nog kan afhaken, en de site geeft hem daar de reden voor. C §7.6
noemt dit techniek 2, de grens als kenmerk, en de beste zin op de site.

---

## 5.12 Vragen

**De copy** — acht vragen, vijf letterlijk ongewijzigd, drie bijgesteld conform C §4 rij 28, 32
en 35:

> **VRAGEN**
> ## Wat mensen willen weten

> **Hoe lang duurt de test?**
> Ongeveer 20 tot 25 minuten voor 120 vragen. De eerste 72 zijn korte stellingen en gaan het
> snelst; de laatste 48 zijn afwisselender en kosten iets meer denkwerk. Je kunt tussendoor
> pauzeren: je voortgang blijft bewaard in je browser, dus je komt terug waar je gebleven was.

> **Wat kost het?**
> Niets. Je krijgt het volledige rapport van alle 33 hoofdstukken, zonder betaalmuur en zonder
> account.

> **Wat gebeurt er met mijn antwoorden?**
> Die blijven in de opslag van je eigen browser staan. Er is geen server waar ze naartoe gaan en
> geen account waarin ze bewaard worden. Wis je je browsergegevens of klik je op "Antwoorden
> wissen", dan zijn ze definitief weg.

> **Is dit wetenschappelijk gevalideerd?**
> Nee, en dat zeggen we liever eerlijk. Dit is een reflectie-instrument, geen gevalideerde
> psychologische test. De vragen en berekeningen zijn zorgvuldig opgebouwd en volledig
> herleidbaar, maar er is geen normgroep en geen validatiestudie. Gebruik het als spiegel, niet
> als bewijs.

> **Is dit hetzelfde als MBTI, DISC of Insights?**
> Nee. Die systemen delen je in bij een vast type dat je erbij krijgt. Hier wordt per eigenschap
> een score berekend en staat die score in je rapport; het archetype is niet meer dan een
> samenvattende leeswijzer daarover. Waar het archetype en je eigen score elkaar tegenspreken,
> zegt het rapport expliciet dat je score voorgaat — en waar je score en je eigen ervaring
> elkaar tegenspreken, gaat je ervaring voor.

> **Kan ik dit gebruiken om iemand aan te nemen of te beoordelen?**
> Nee. Het is niet gemaakt of getoetst voor selectie, beoordeling of welke beslissing over
> iemand anders dan ook. Gebruik het alleen voor jezelf, of samen met iemand die er vrijwillig
> aan meedoet.

> **Krijg ik hetzelfde rapport als iemand anders met dezelfde uitslag?**
> Niet helemaal. De teksten kennen meerdere gelijkwaardige formuleringen, en welke je krijgt
> hangt af van je specifieke antwoordenpatroon — niet alleen van je scores. Twee mensen met
> vergelijkbare uitslagen lezen dus niet hetzelfde stuk tekst.

> **Kan ik mijn rapport bewaren?**
> Ja. Je kunt het opslaan als PDF, printen, of downloaden als tekstbestand. Doe dat ook echt:
> het staat verder alleen in deze browser, en wij hebben geen kopie. Eén hoofdstuk kun je apart
> opslaan om door te sturen naar iemand die dichtbij staat.

**Een negende vraag, nieuw, en hij is er een die de markt oproept:**

> **Waarom is dit gratis? Waar verdienen jullie aan?**
> Nergens aan. Er is geen betaalmuur, geen advertentie, geen nieuwsbrief en geen doorverkoop van
> gegevens — dat laatste kan ook niet, want er komen geen gegevens bij ons binnen. Dit is
> gebouwd omdat het gebouwd moest worden. Verandert dat ooit, dan staat het hier, vóórdat het
> gebeurt.

Die vraag komt bij elke bezoeker op die de andere acht heeft gelezen, en hij staat nu nergens.
§2.1 laat zien waarom hij belangrijk is: het Enneagram Institute draagt zijn eerlijkheidspositie
met een prijskaartje ("wij verkopen je gegevens niet want je betaalt ons"). Arcana moet dat
zonder prijskaartje doen, en dan is het antwoord op *waarom dan* onderdeel van het bewijs.

> **Voorbehoud bij de laatste zin.** *"Verandert dat ooit, dan staat het hier, vóórdat het
> gebeurt"* is een toezegging waar iemand aan gehouden kan worden. Neem hem alleen op als die
> ook echt gedaan wordt. Zo niet, schrap dan de laatste zin — de eerste vier dragen het
> antwoord ook zonder.

**Wat er visueel moet gebeuren.** Accordeons, zoals nu. Twee kleine verbeteringen: laat de eerste
vraag open staan bij het laden (dan weet de bezoeker dat het accordeons zijn), en zorg dat alle
negen vragen als tekst in de HTML staan ook wanneer ze dicht zijn — dat is een SEO-eis, zie §7.4.

**Waarom deze sectie hier staat.** Na de disclaimer, waar de resterende praktische bezwaren
horen. C §4.6 noemt hem het sterkste tekstblok van de site, en dat is hij: acht — nu negen —
echte vragen met echte antwoorden.

---

## 5.13 Slot-CTA

**De copy** — kop ongewijzigd, tekst vervangen conform C §4 rij 27:

> ## Klaar om te lezen wat je al vermoedde?
>
> Twintig minuten, 120 vragen, en een rapport waarin bij elke uitspraak het cijfer staat waar
> hij uit volgt. Stoppen mag onderweg — je komt terug waar je gebleven was.
>
> **[ Start de test ]**
>
> *Liever eerst kijken? [Lees het voorbeeldrapport]*

**Wat er visueel moet gebeuren.** Gecentreerd, ruim, de laatste sectie van de pagina. De
voorbeeldrapport-regel eronder in kleine tekst, als link en niet als knop — hij mag de primaire
CTA niet beconcurreren, alleen opvangen wie nog niet zover is.

**Waarom deze sectie hier staat.** *Klaar om te lezen wat je al vermoedde?* is volgens C §1 een
kop die niet te veel belooft: goede zelfinzichtteksten bevestigen vaker dan ze onthullen, en
deze is daar eerlijk over. De tekst eronder herhaalde de hero; nu levert hij het argument dat de
lezer na twaalf secties nog niet had.

---

## 5.14 Wat er in de voettekst hoort

Ongewijzigd, met de twee bestaande regels uit de bundel:

> *Je antwoorden worden standaard alleen in deze browser opgeslagen om je rapport te maken.
> Verwijder je je browserdata of klik je op 'Antwoorden wissen', dan verdwijnen je antwoorden.*
>
> *Arcana Profile is bedoeld voor zelfreflectie en persoonlijke ontwikkeling. Het is geen
> medisch, psychologisch of therapeutisch diagnose-instrument.*

Dat is de derde van de drie plekken waar de disclaimer staat (C, uitgangspunt 1). Die drie
plekken blijven alle drie, in dezelfde leesvolgorde.

---

# 6 — De 5-secondentest

Dit is stap 1 uit het testscript in `A-baseline.md` §6, uitgewerkt tot een protocol dat iemand
anders kan uitvoeren zonder dit document verder te lezen.

## 6.1 Waarom vijf seconden

Vijf seconden is ongeveer de tijd waarin iemand beslist of een pagina de moeite waard is. Wat er
in die vijf seconden binnenkomt, is niet wat er het mooist staat maar wat er het grootst staat.
Op de huidige pagina is dat `Arcana Profile` — een merknaam die volgens de zoekresultaten in
§2.3 vooral met tarot en manga wordt geassocieerd.

De test meet daarom precies één ding: **komt de propositie binnen, of alleen de categorie?**

## 6.2 Voorbereiding

**Wie.** Vijf deelnemers per variant. Niet je vrienden — `A-baseline.md` §6 zegt waarom: die
willen dat het goed is. Mensen die de site nooit zagen en van tevoren niet weten waar het over
gaat. **Minstens één van de vijf moet uitgesproken sceptisch zijn over persoonlijkheidstests**;
dat is de deelnemer die het bezwaar uitspreekt dat de andere vier beleefd inslikken.

**Wat je klaarzet.**
1. Een scherm­afdruk van de hero, **precies tot de vouw**: alles wat op een telefoon van
   375 × 667 px zichtbaar is zonder scrollen. Niet de hele pagina. Niet uitgezoomd. Als je de
   test op desktop doet: 1440 × 900, ook precies tot de vouw.
2. Eén afbeelding per variant, in gescheiden bestanden, zodat je ze niet per ongeluk in de
   verkeerde volgorde toont.
3. Een timer. Vijf seconden, hardop afgeteld of met een geluidje.
4. Een leeg vel per deelnemer met vier vakken: *de zin*, *de woorden*, *het oordeel*, *het
   citaat*.

**Wat je niet doet.**
- Niet zeggen waar het over gaat. Ook niet "het is een website over zelfinzicht". De vraag is
  juist óf dat binnenkomt.
- Niet meerdere varianten aan dezelfde deelnemer tonen. Na de eerste weet hij wat er staat en is
  de tweede meting waardeloos.
- Niet aan de deelnemer vragen welke variant hij mooier vindt. Dat meet smaak, niet begrip.

## 6.3 Het protocol

**Stap 1 — de instructie, letterlijk voor te lezen:**

> "Ik laat je zo vijf seconden een scherm zien. Daarna gaat het weg en stel ik je twee vragen.
> Je hoeft niets te onthouden of te studeren — kijk gewoon zoals je normaal naar een website
> kijkt. Het is geen test van jou."

**Stap 2 — toon het beeld, precies vijf seconden, en haal het weg.** Niet vier, niet acht.
Scherm dicht of venster minimaliseren.

**Stap 3 — vraag één, en dit is de meting:**

> "Wat is dit, en voor wie?"

Laat de stilte vallen. Niet helpen, niet aanvullen, niet "dus je bedoelt…". Schrijf het antwoord
**letterlijk** op, niet samengevat. Als de deelnemer stopt na drie woorden, vraag één keer:
"Nog iets?" — en dan niets meer.

**Stap 4 — vraag twee:**

> "Wat zou je hier krijgen als je verderging?"

Ook letterlijk noteren.

**Stap 5 — vraag drie, alleen als er tijd is:**

> "Wat was het eerste dat je las?"

Dit controleert of de visuele hiërarchie klopt. Als mensen de eyebrow noemen in plaats van de
h1, staat de h1 niet groot genoeg.

**Stap 6 — noteer het citaat.** Eén zin die je bijbleef. Niet analyseren, opschrijven.

## 6.4 Wat een goed antwoord is

Codeer elk antwoord op drie punten. Dit doe je ná afloop, met de letterlijke tekst voor je.

| Punt | Telt als behaald wanneer | Voorbeelden van wél | Voorbeelden van niet |
|---|---|---|---|
| **1. Categorie** | De deelnemer benoemt dat het om een test of vragenlijst over jezelf gaat | "een persoonlijkheidstest", "zo'n vragenlijst over hoe je in elkaar zit" | "een boek", "iets spiritueels", "geen idee" |
| **2. Onderscheid** | De deelnemer noemt in eigen woorden iets uit de spits of de directe ondersteuning | "je kunt het nakijken", "er staan cijfers bij", "het blijft op je eigen computer", "geen AI", "hij rekent het uit" | "uitgebreid", "professioneel", "mooi gemaakt", "gratis" (alléén dat) |
| **3. Opbrengst** | De deelnemer benoemt dat er een rapport of uitgebreide uitslag uit komt | "een rapport", "een heel verslag over jezelf", "33 hoofdstukken" | "een uitslag", "je type", "weet ik niet" |

**Punt 2 is de test.** Punt 1 haalt vrijwel elke variant; punt 3 is een bonus. De hele ingreep
van werkstroom E staat of valt met de vraag of punt 2 binnen vijf seconden overkomt, want dat is
het enige dat de huidige pagina in die tijd niet doet.

**Let op bij het coderen.** Het woord *gratis* telt niet als onderscheid (§1.2: gratis is in deze
categorie geen differentiatie). Het woord *uitgebreid* telt niet, want daar heeft de concurrent
een grotere versie van. Wél tellen: narekenen, cijfer, score, controleren, nakijken, rekenen,
geen AI, geen taalmodel, blijft lokaal, op mijn eigen apparaat, geen account.

## 6.5 De slaag-/zakgrens

Vooraf vastleggen. Niet achteraf bijstellen.

| Uitkomst op punt 2 (onderscheid) | Oordeel | Wat je doet |
|---|---|---|
| **5 van 5** | Geslaagd, ruim | Bouwen. Deze hero doet zijn werk. |
| **4 van 5** | **Geslaagd — dit is de grens** | Bouwen. Kijk wel naar de ene die het miste: is dat de scepticus of iemand anders? |
| **3 van 5** | Gezakt, herstelbaar | De boodschap is er maar staat niet groot genoeg, of de zin is te lang. Verklein de subkop, vergroot de h1, test opnieuw met vijf nieuwe mensen. |
| **2 of minder** | Gezakt | De kop draagt de boodschap niet. Kies een andere variant of herschrijf de h1. Niet doorbouwen. |

**Bijkomende zakregels, ongeacht de score:**

- **Noemt één of meer deelnemers "tarot", "horoscoop", "sterrenbeelden" of "spiritueel"** — dan
  is het merkwoord te dominant of staat het te dicht bij de h1. Dit is een reële mogelijkheid
  gezien wat er in §2.3 uit de zoekresultaten kwam, en het is een harde zakregel: dat is precies
  de associatie die dit product niet mag oproepen.
- **Noemt geen enkele deelnemer iets over de opbrengst (punt 3)**, dan mist de hero de
  inhoudsbelofte. C §1 stelt dat ook vast: *"je volledige rapport" is een vormbelofte, geen
  inhoudsbelofte.*
- **Zegt een deelnemer "dat moest ik lezen om het te snappen"** — dan is de tekst te lang voor
  de tijd die hij krijgt. Vijf seconden zijn ongeveer twintig woorden.

**De nullijn waar je tegen afzet.** Doe de test ook één keer op de huidige hero, met vijf andere
mensen. Zonder die nulmeting weet je niet of een score van 4 op 5 winst is of gewoon hoe mensen
antwoorden. `A-baseline.md` maakt van die nulmeting een principe en dat principe geldt ook hier.

## 6.6 Hoe dit past in de bredere test

Deze 5-secondentest ís stap 1 van het zevenstappenscript in `A-baseline.md` §6. Voer hem dus
niet apart uit maar als opening van die sessie: vijf seconden hero, twee vragen, en dan door naar
stap 2 (vrij scrollen). Dat kost niets extra en het levert de context waarin je de antwoorden
moet lezen.

Noteer per deelnemer de zes dingen die §6 van A voorschrijft: de 5-secondenzin letterlijk, de
scrollhoogte bij stoppen, het eerste bezwaar letterlijk, aarzelingen bij het naamformulier, het
moment van "hoeveel nog", en één citaat. Vijf van die formulieren naast elkaar zijn de
prioriteitenlijst voor werkstroom C en E.

---

# 7 — SEO-audit

## 7.1 Samenvatting

**De technische basis is duidelijk beter dan gemiddeld, en dat moet eerst gezegd worden.** Deze
site doet een aantal dingen goed die de meeste single-page-apps helemaal niet doen: er staat een
volledige set OG- en Twitter-tags, er staat JSON-LD met drie schema-types, er is een
`noscript`-fallback, en — zeldzaam — er staat een volwaardige statische HTML-versie van de
propositie in `#root` die een crawler ziet vóórdat React laadt. Dat laatste is precies de
oplossing voor het grootste SEO-probleem van een SPA, en iemand heeft er bewust voor gekozen. De
koppenhiërarchie loopt netjes, `lang="nl"` staat er, het decoratieve beeld heeft terecht
`alt=""` met `aria-hidden`, en er is een `robots.txt`, een `sitemap.xml` en een `webmanifest`.

**Daarnaast staat er één fout die al het bovenstaande ongedaan maakt**: elke absolute URL wijst
naar een ander domein (§3). Zolang dat zo is, is er geen SEO-werk dat effect heeft, want de
instructie aan Google luidt: indexeer deze site niet.

**De drie prioriteiten:**
1. De domeinfix uit §3. Alles wat hierna volgt is zinloos zolang die niet gedaan is.
2. De h1 van merknaam naar propositie. Dit is tegelijk de conversie-ingreep uit §4 en de grootste
   on-page SEO-ingreep die beschikbaar is, want de huidige h1 is een woord waarop geen mens zoekt
   en dat bovendien bezet is door tarot en manga.
3. Een tweede indexeerbare URL bouwen: het voorbeeldrapport (§5.9). Eén URL met één
   zoekintentie is het plafond waar deze site nu tegenaan zit.

## 7.2 Huidige situatie, per onderdeel

| Onderdeel | Status | Wat er staat |
|---|---|---|
| `canonical` | **Kritiek** | Wijst naar `speaktoart.com` |
| `og:url`, `og:image`, `twitter:image` | **Kritiek** | Idem, 3 voorkomens |
| JSON-LD `@id` / `url` | **Kritiek** | Idem, 5 voorkomens |
| `sitemap.xml` / `robots.txt` | **Kritiek** | Idem, 2 voorkomens |
| `<title>` | Waarschuwing | 77 tekens — wordt afgekapt rond 60 |
| `meta description` | Waarschuwing | **264 tekens** — wordt afgekapt rond 160; de laatste twee zinnen worden nooit getoond |
| `h1` | Hoog | `Arcana Profile` — merknaam zonder zoekvolume, met een sterk bezette naam |
| `og:image:alt` | Laag | Ontbreekt |
| `sitemap lastmod` | Laag | Ontbreekt |
| JSON-LD `FAQPage` | Middel | 5 vragen in de markup tegen 8 op de pagina |
| JSON-LD `WebApplication` | Goed | Compleet, met `isAccessibleForFree`, `offers`, `featureList` |
| Statische `#root`-fallback | **Sterk** | Volledige propositie in HTML, zichtbaar vóór hydratie |
| `noscript` | Goed | Aanwezig |
| `lang="nl"`, `og:locale` | Goed | `nl` / `nl_NL` |
| Koppenhiërarchie | Goed | h1 → h2 → h3, geen sprongen (`A-baseline.md` §1) |
| Beeld-alt | Goed | `alt=""` + `aria-hidden` op een decoratief beeld — correct |
| `robots`-meta | Goed | `index, follow, max-image-preview:large` |
| Aantal indexeerbare URL's | **Hoog** | **Eén** |
| TTFB | Middel | 1.202 ms (`A-baseline.md` §1) — traag voor een statische site |
| JS over de lijn | Middel | 139,5 KB brotli in één chunk, ook voor wie alleen de landing leest |

### De titel en de beschrijving, met vervanging

**Nu (77 tekens):**
```
Arcana Profile — persoonlijkheidstest met een rapport dat zich laat narekenen
```

**Voorstel (57 tekens):**
```
Persoonlijkheidstest die zich laat narekenen | Arcana
```

De propositie staat vooraan, waar hij niet wordt afgekapt; de merknaam staat achteraan, waar
Google hem toch vaak zelf toevoegt. Wie op *persoonlijkheidstest* zoekt, ziet het woord als
eerste.

**Nu (264 tekens, afgekapt na circa 160):**
```
Gratis persoonlijkheidstest van 120 vragen. Je krijgt een rapport van 33 hoofdstukken over je
drijfveren, denkstijl, relaties, stresspatroon, sterke kanten en blinde vlekken. Elke uitspraak
is herleidbaar naar een score. Je antwoorden blijven op je eigen apparaat.
```

**Voorstel (156 tekens):**
```
Gratis, zonder account. 120 vragen, een rapport van 33 hoofdstukken, en bij elke uitspraak het
cijfer waar hij uit volgt. Je antwoorden blijven op je apparaat.
```

Dezelfde inhoud, binnen de ruimte die getoond wordt, met de onderscheidende zin binnen de eerste
160 tekens in plaats van erbuiten.

## 7.3 Zoekwoorden — wat realistisch haalbaar is

De Nederlandse markt voor persoonlijkheidstests is verzadigd op de hoofdtermen. De volgende
tabel is gebaseerd op wat er daadwerkelijk in de zoekresultaten staat (§2), niet op geschat
zoekvolume; er is geen zoekwoordtool gebruikt. Lees *kans* daarom als een oordeel over de
concurrentie in de resultaten, niet als een cijfer.

| Zoekterm | Intentie | Wie staat er nu | Kans | Wat ervoor nodig is |
|---|---|---|---|---|
| `persoonlijkheidstest` | commercieel | 123test, 16personalities, Testcentrum Groei | **Geen** | Jaren autoriteit. Niet nastreven. |
| `gratis persoonlijkheidstest` | commercieel | idem + exacte-match-domeinen | **Geen** | Idem |
| `big five test` | commercieel | 123test, Truity | **Geen** | Arcana is geen Big Five. Niet claimen. |
| `persoonlijkheidstest zonder account` | commercieel | Testcentrum Groei, diffuus | **Hoog** | Homepage-optimalisatie. Dit is de scherpste term die Arcana kan winnen. |
| `persoonlijkheidstest zonder e-mailadres` | commercieel | vrijwel leeg | **Hoog** | Idem. Klein volume, maar bijna perfecte intentie. |
| `persoonlijkheidstest privacy / gegevens` | commercieel | leeg | **Hoog** | Idem |
| `gratis persoonlijkheidstest zonder betaalmuur` | commercieel | leeg | **Hoog** | Idem; behandel "betaalmuur" expliciet in de FAQ |
| `uitgebreid persoonlijkheidsrapport gratis` | commercieel | 123test (betaald) | **Middel** | Voorbeeldrapport-pagina |
| `voorbeeld persoonlijkheidsrapport` | informationeel | leeg tot dun | **Hoog** | Voorbeeldrapport-pagina. Dit is de beste kans die er ligt. |
| `persoonlijkheidstest 120 vragen` | commercieel | 123test | **Middel** | Concurreert direct met een sterkere partij op hetzelfde getal |
| `verschil mbti en big five` | informationeel | blogs, adviesbureaus | **Middel** | Vergelijkingspagina, 1.200+ woorden |
| `is een persoonlijkheidstest betrouwbaar` | informationeel | ManagementSite, Werf&, vakblogs | **Middel** | Grenzenpagina. Arcana kan hier iets zeggen wat een aanbieder normaal niet zegt. |
| `barnum-effect test` / `waarom klopt een persoonlijkheidstest altijd` | informationeel | Wikipedia, blogs | **Middel** | Idem |
| `schaduwkant test` / `schaduwwerk vragenlijst` | informationeel | **vrijwel leeg** — boeken, Substack, geen enkel testproduct | **Hoog** | Dimensiepagina of hoofdstukvoorbeeld. Geen concurrent. |
| `conflictstijl test` | commercieel | dun | **Hoog** | Dimensiepagina |
| `stressreactie test` / `hoe reageer ik onder druk` | informationeel | dun | **Hoog** | Dimensiepagina |
| `spanningsvelden persoonlijkheid` | informationeel | leeg | **Hoog** | Klein volume, eigen term, geen concurrentie |
| `persoonlijkheidstest meenemen naar therapeut` | commercieel | leeg | **Middel** | Past bij de bestaande sectie *Voor wie* |
| `welk archetype ben ik` | informationeel | quizfarms, tarotsites | **Laag** | Verkeerde intentie: dit publiek zoekt vermaak. Niet nastreven. |
| `arcana profile` (merk) | navigatie | tarot, manga, band, spel | **Middel** | Alleen haalbaar na de domeinfix. Zie hieronder. |

**Over de merknaam.** Een zoekopdracht op "Arcana Profile persoonlijkheidstest" levert nu
Wikipedia-pagina's over een Zweedse band, een manga en een spel, plus een tarotquiz en een
AI-persoonlijkheidstest. De site zelf staat er niet tussen. Na de domeinfix hoort dat binnen
enkele weken te veranderen voor de exacte combinatie met "persoonlijkheidstest" — maar op
"arcana" alleen zal deze site nooit winnen, en dat is een structureel gevolg van de naamkeuze.
Het is een extra reden om de naam nergens het werk van de propositie te laten doen.

**De strategische lijn die hieruit volgt.** Arcana gaat de hoofdtermen niet winnen en moet het
niet proberen. Wat wél kan: **de termen bezetten waar de eigen eigenschap in de zoekopdracht
zit.** Iemand die "persoonlijkheidstest zonder account" of "persoonlijkheidstest zonder
e-mailadres" typt, heeft precies één ding nodig en Arcana is precies dat ene ding. Dat zijn
kleine volumes met een conversieratio die de hoofdtermen nooit halen.

## 7.4 Wat er ontbreekt, en wat de JSON-LD sterker maakt

**De FAQPage aanvullen.** In de markup staan vijf vragen, op de pagina acht (straks negen). Vul
de markup aan tot alle negen. Regel daarbij: **alleen vragen die letterlijk zichtbaar op de
pagina staan** mogen in de markup — dat is een voorwaarde van Google en de huidige situatie
voldoet eraan (de vijf zijn een deelverzameling van de acht). Zorg dat dat zo blijft.

> **Eerlijk over wat dit oplevert: waarschijnlijk niets in de zoekresultaten.** Google heeft de
> FAQ-rich-results sinds 2023 beperkt tot een kleine groep gezaghebbende overheids- en
> gezondheidssites. Een site als deze krijgt de uitklapbare FAQ in de zoekresultaten vrijwel
> zeker niet meer. De markup is nog steeds nuttig — voor begrip van de pagina, voor andere
> zoekmachines en voor AI-assistenten die schema uitlezen — maar wie hem aanvult in de hoop op
> rich results, moet weten dat die hoop klein is. Dat is de reden dat dit punt op *middel* staat
> en niet op *hoog*.

**Toevoegen aan de bestaande graaf:**

```json
{
  "@type": "Organization",
  "@id": "https://arcanaprofile.com/#organisatie",
  "name": "Arcana Profile",
  "url": "https://arcanaprofile.com/",
  "logo": "https://arcanaprofile.com/favicon.svg"
}
```
en in `WebSite` en `WebApplication` een verwijzing `"publisher": { "@id": "…#organisatie" }`.
Dat maakt van drie losse entiteiten één samenhangende graaf, wat is wat de graaf bedoeld is te
doen.

**Verder in `WebApplication`:**

```json
"inLanguage": "nl-NL",
"audience": {
  "@type": "Audience",
  "audienceType": "Volwassenen die zichzelf willen onderzoeken"
},
"about": [
  { "@type": "Thing", "name": "Zelfreflectie" },
  { "@type": "Thing", "name": "Persoonlijkheid" }
],
"dateModified": "2026-09-22"
```

**Wat je níet moet toevoegen, en waarom.** Geen `AggregateRating` en geen `Review` — er zijn geen
beoordelingen, en verzonnen beoordelingen in schema zijn zowel een richtlijnovertreding als het
tegenovergestelde van waar dit merk voor staat. Geen `MedicalWebPage`, geen
`PsychologicalTreatment`, geen enkel gezondheidsgerelateerd type: de disclaimer zegt letterlijk
dat dit geen diagnose-instrument is, en schema dat het tegendeel suggereert ondergraaft precies
de zin die niet onderhandelbaar is. Geen `Quiz` — dat type is bedoeld voor
onderwijsvragenlijsten met goede antwoorden, en dat is dit niet.

**Overig dat ontbreekt:**
- `og:image:alt` (zie §3.1)
- `lastmod` in de sitemap (zie §3.1)
- Interne links: er is er precies één soort (de CTA naar de app). Zodra er een tweede pagina is,
  moeten hero, §5.9 en de slot-CTA er alle drie naar linken.
- De FAQ-accordeons moeten hun antwoordtekst in de HTML hebben staan ook als ze dicht zijn
  (`hidden` of `max-height: 0`, niet conditioneel gerenderd). Controleer dat bij de rebuild;
  het is een makkelijke regressie.

## 7.5 Het SPA-probleem: één URL, één zoekintentie

**De kern van de zaak.** Deze site heeft één URL. Die URL kan ranken op één hoofdintentie. Alles
wat de site te zeggen heeft — over narekenbaarheid, over privacy, over twaalf dimensies, over
wat een archetype wel en niet is — staat op diezelfde ene pagina en concurreert daar met zichzelf
om de aandacht van de crawler en om de zoekintentie.

**Wat er al goed aan is opgelost.** De statische `#root`-inhoud betekent dat een crawler de
propositie ziet zonder JavaScript uit te voeren. Dat is de helft van het SPA-probleem en die
helft is opgelost. De andere helft — dat er maar één adres is — niet.

**Wat je niet moet doen.** Hashroutes (`/#/voorbeeldrapport`) tellen niet als aparte URL's.
JavaScript-routes zonder prerendering geven een URL die alleen bestaat als de server hem ook
serveert. Als er pagina's bijkomen, moeten die als echte, statisch gegenereerde HTML-bestanden
worden opgeleverd — met hun eigen `<title>`, `<meta description>`, `canonical` en
`<h1>`, en een eigen regel in de sitemap.

## 7.6 Extra pagina's: het eerlijke antwoord

De vraag is of pagina's per dimensie (twaalf) of per archetype (achttien plus zes
stress-varianten) zinvol zijn.

### Waarom het verleidelijk is

Dertig URL's, elk met een eigen zoekterm, elk gevoed door tekst die al in de bundel staat. Het
lijkt gratis groei.

### Waarom het dat niet is — vier kosten

**Eén: de tekst bestaat wél, maar mag niet zo gebruikt worden.** De archetypeteksten in
`app.beautified.js` (regel 13600–17200) zijn geschreven om over één specifieke lezer te gaan, in
de context van diens eigen scores. Losgeweekt en op een publieke pagina gezet, worden het
algemene karakterbeschrijvingen die op veel mensen passen — precies het Barnum-effect waar dit
product zich tegen positioneert. Dertig archetypepagina's zouden het merk aan de voorkant
ondermijnen om aan de achterkant verkeer te winnen. **Dat is de zwaarste reden, en hij is
doorslaggevend.**

**Twee: dertig pagina's van dit niveau is een schrijfproject.** De standaard op deze site is
hoog. Een dimensiepagina die kan ranken heeft 600 tot 900 woorden nodig die niet elders staan.
Dertig daarvan is 18.000 tot 27.000 woorden. Dat is geen middag; dat is werkstroom C nog een
keer.

**Drie: dunne en gelijkende pagina's schaden elkaar.** Twaalf dimensiepagina's met dezelfde opzet
en dezelfde zinsbouw worden door Google als één sjabloon herkend. Het risico is niet dat ze niet
ranken maar dat ze de hoofdpagina verdunnen.

**Vier: onderhoud.** Elke pagina is een plek waar over twee jaar een verouderd getal staat. Het
woordental-probleem uit de inleiding van dit document is precies dat, en het staat nu op één plek.

### De aanbeveling: niet dertig, maar vier

In volgorde van opbrengst:

**1. `/voorbeeldrapport` — bouw deze eerst, en als er maar één komt, dan deze.**
Een volledig rapport uit verzonnen antwoorden, alle 33 hoofdstukken, de cijfers erbij. Lengte:
circa 5.700 woorden die al bestaan, want de engine genereert ze.
- *SEO*: de beste kans in de hele tabel van §7.3. "Voorbeeld persoonlijkheidsrapport" is een
  zoekopdracht met duidelijke intentie en een lege SERP. En 5.700 woorden echte inhoud is het
  soort pagina waar zoekmachines diepte in zien.
- *Conversie*: de derde weg die C §1 mist.
- *Bewijs*: de kern van §5.9, en daarmee het antwoord op het ontbrekende sociale bewijs.
- *Kosten*: laag. Eén antwoordenset door de engine halen, controleren dat het resultaat
  geloofwaardig en niet vleiend is, en prerenderen. Zet er boven- én onderaan dezelfde regel bij:
  *"Dit is een voorbeeld uit verzonnen antwoorden. Het gaat niet over jou."*
- *Voorwaarde*: `noindex` erop zetten is níet nodig en zou de hele opbrengst wegnemen — maar de
  pagina moet zonneklaar als voorbeeld gemarkeerd zijn, anders leest iemand hem als uitslag.

**2. `/hoe-het-gemeten-wordt`**
De methode: 120 → 30 → 12, de schaal van 0 tot 100, wat gewichten zijn, wat determinisme
betekent, wat betrouwbaarheid per dimensie betekent en waarom die soms laag is.
- *SEO*: `hoe werkt een persoonlijkheidstest`, `wat betekent een score op een persoonlijkheidstest`
- *Strategisch*: dit is de bewijspagina onder de spits uit §1. Hij hoort te bestaan, los van SEO.
- *Kosten*: circa 900 woorden nieuw, maar het meeste denkwerk staat al in C §7.4.

**3. `/wat-dit-niet-is`**
De uitgebreide versie van de sectie *Eerlijk gezegd*: het Barnum-effect uitgelegd, waarom een
zelfrapportage-instrument meet hoe je jezelf ziet, wat een normgroep is en waarom deze test er
geen heeft, en wanneer je bij NOA, Ixly of een psycholoog moet zijn.
- *SEO*: `is een persoonlijkheidstest betrouwbaar`, `barnum-effect`, `waarom klopt een
  persoonlijkheidstest altijd` — informationele termen met reële vraag en een SERP die nu uit
  vakblogs bestaat.
- *Strategisch*: dit is de pagina die een concurrent niet kan schrijven zonder zijn eigen product
  te beschadigen. C §7.8, voorbeeld 3 is er de eerste alinea van.
- *Kosten*: circa 1.200 woorden. De duurste van de vier en de meest onderscheidende.

**4. `/dimensies` — één pagina, niet twaalf.**
Alle twaalf dimensies uitgebreid, elk met een eigen anker (`/dimensies#conflictstijl`), elk 300
tot 400 woorden. Eén URL, twaalf ankers, circa 4.000 woorden.
- *SEO*: vangt `conflictstijl test`, `stressreactie test` en `schaduwkant test` op zonder twaalf
  dunne pagina's te maken. Ankerlinks kunnen als sitelink in de resultaten verschijnen.
- *De opwaardering*: als na zes maanden blijkt dat één anker daadwerkelijk verkeer trekt, promoveer
  je dát anker tot een eigen pagina met 800 woorden. Dan weet je het in plaats van het te gokken.
  `schaduwkant` is op grond van §7.3 de meest waarschijnlijke kandidaat: de zoekresultaten daar
  zijn vrijwel leeg.

**Eventueel vijfde: `/dit-is-geen-mbti`.** Een vergelijkingspagina, circa 1.200 woorden, die
uitlegt wat MBTI, DISC en Insights doen, waarom psychologen ze afraden, en wat dit instrument
anders doet — en die dan eerlijk zegt dat Big Five beter onderbouwd is dan beide. Die laatste
concessie is wat de pagina geloofwaardig maakt. Alleen bouwen als er tijd over is: het is de
meest concurrerende van de vijf en de minst onderscheidende.

**Wat er níet komt.** Geen archetypepagina's, in geen enkele vorm. Zie reden één hierboven.

## 7.7 Geprioriteerde acties

### P0 — vandaag

| Actie | Impact | Inspanning |
|---|---|---|
| De elf domeinverwijzingen vervangen (§3.1) | **Kritiek** | 10 minuten |
| Controleren wat `speaktoart.com` serveert; 301 of niet (§3.3) | **Kritiek** | 30 minuten |
| `arcanaprofile.com` in Search Console, sitemap indienen, indexering aanvragen (§3.4) | **Kritiek** | 30 minuten |
| Facebook-, LinkedIn- en X-cache opnieuw laten ophalen (§3.4) | Hoog | 10 minuten |

### P1 — deze week

| Actie | Impact | Inspanning |
|---|---|---|
| `<title>` naar 57 tekens, `meta description` naar 156 (§7.2) | Hoog | 15 minuten |
| `og:image:alt` en `lastmod` toevoegen (§3.1) | Laag | 5 minuten |
| Eén canonieke hostnaam afdwingen, HTTPS forceren (§3.3) | Hoog | 30 minuten |
| Buildcheck `check-domains.mjs` inhaken (§3.5) | Hoog (preventief) | 1 uur |
| `Organization` aan de JSON-LD-graaf, `publisher`-verwijzingen (§7.4) | Middel | 30 minuten |
| FAQPage aanvullen naar 9 vragen (§7.4) | Middel | 30 minuten |
| De 5-secondentest draaien op de huidige hero, als nullijn (§6.5) | Hoog | halve dag |

### P2 — deze maand

| Actie | Impact | Inspanning |
|---|---|---|
| Hero vervangen door variant B; h1 wordt de propositie (§4, §5.1) | **Hoog** | 1 dag incl. ontwerp |
| Het narekenbaarheidsblok naar positie 2 (§5.2) | **Hoog** | halve dag |
| `/voorbeeldrapport` bouwen en prerenderen (§7.6) | **Hoog** | 2–3 dagen |
| Statbalk `5.500+` → `5.700+` (§5.4) | Middel (eerlijkheid) | 5 minuten |
| Scorewiel op de landingspagina tonen (§5.8) | Hoog (conversie) | 1–2 dagen |
| De drie tellers plus toestemmingsregel bouwen (§4.4) | Hoog | 1 dag |

### P3 — dit kwartaal

| Actie | Impact | Inspanning |
|---|---|---|
| `/hoe-het-gemeten-wordt` | Middel | 1–2 dagen |
| `/wat-dit-niet-is` | Middel–hoog | 2–3 dagen |
| `/dimensies` met twaalf ankers | Middel | 3–5 dagen |
| Landing loskoppelen van de app-bundel (`A-baseline.md` §3.7) | Hoog (Core Web Vitals) | werkstroom D |
| TTFB van 1.202 ms terugbrengen (statische hosting/CDN) | Hoog | 1 dag |
| `/dit-is-geen-mbti` | Laag–middel | 2 dagen |

### Wat je bewust níet doet

| Niet doen | Waarom |
|---|---|
| Achttien tot dertig archetypepagina's | Ondermijnt de positionering (§7.6, reden 1) |
| Ranken op `persoonlijkheidstest` of `big five test` nastreven | Onhaalbaar, en Big Five is bovendien niet wat dit product is |
| `AggregateRating` of `Review` in de schema | Geen beoordelingen; verzinnen is uitgesloten |
| Bezoek- of afnamecijfers noemen | Die zijn er niet, en er is geen analytics om ze te krijgen |
| Een blog beginnen | Vraagt een publicatieritme dat dit product niet heeft. Vier goede pagina's verslaan twintig middelmatige. |
| FAQ-rich-results verwachten | Google beperkt die sinds 2023 tot gezaghebbende overheids- en gezondheidssites (§7.4) |

---

# Bronnen

Geraadpleegd op 22 september 2026.

**Internationale aanbieders**
- [16Personalities — Premium Career Suite](https://www.16personalities.com/premium/premium-report)
- [16Personalities — Gratis persoonlijkheidstest](https://www.16personalities.com/free-personality-test)
- [16Personalities — homepage](https://www.16personalities.com/)
- [16Personalities — Pro Suite](https://www.16personalities.com/premium/pro-suite)
- [Truity — About the Big Five Test](https://www.truity.com/truity-at-work/product/big-five)
- [Truity — About the TypeFinder for Individuals](https://www.truity.com/truity-at-work/product/typefinder-individuals)
- [Truity — Enneagram Personality Test](https://www.truity.com/test/enneagram-personality-test)
- [The Enneagram Institute — Free Enneagram Tests](https://www.enneagraminstitute.com/free-enneagram-tests/)

**Nederlandse markt**
- [123test — Persoonlijkheidstesten en psychologische tests](https://www.123test.com/nl/persoonlijkheid/)
- [123test — Big Five Personality Test](https://www.123test.com/personality-test/)
- [123test — Persoonlijkheidstest (NL)](https://www.123test.com/nl/persoonlijkheidstest/)
- [123test — Onderzoek: Big Five Persoonlijkheidstest](https://www.123test.com/nl/onderzoek/big-five-persoonlijkheidstest-webversie/)
- [123test — Research and development](https://www.123test.com/research/)
- [Testcentrum Groei — Persoonlijkheidstest, gratis en zonder registratie](https://www.testcentrumgroei.nl/persoonlijkheidstest)
- [gratispersoonlijkheidstest.nl](https://www.gratispersoonlijkheidstest.nl/)
- [onlinepersoonlijkheidstest.nl — Gratis persoonlijkheidstest](https://www.onlinepersoonlijkheidstest.nl/gratis-persoonlijkheidstest/)
- [jobpersonality.com — Big Five persoonlijkheidstest](https://www.jobpersonality.com/big-five-persoonlijkheidstest)

**Professionele hoek (NL)**
- [NOA-VU — Persoonlijkheidstest MPT-BS](https://noa-vu.nl/producten/online-assessments/losse-tests/persoonlijkheidstests/mpt-bs/)
- [NOA-VU — Persoonlijkheidstests met aandacht voor diversiteit](https://noa-vu.nl/producten/online-assessments/losse-tests/persoonlijkheidstests/)
- [Ixly — WPV zeer positief beoordeeld door COTAN](https://www.ixly.com/nl/blog/wpv-zeer-positief-beoordeeld-door-cotan)
- [Ixly — Personality tests](https://www.ixly.com/personality-tests)
- [COTAN Documentatie — Werkgerelateerde Persoonlijkheidsvragenlijst](https://www.cotandocumentatie.nl/beoordelingen/b/14715/werkgerelateerde-persoonlijkheidsvragenlijst/)

**Kritiek op typologieën en validiteit (NL)**
- [Werf& — Waarom de Big Five de enige persoonlijkheidstest is die geschikt is voor recruitment](https://www.werf-en.nl/big-five-als-enige-persoonlijkheidstest-geschikt-voor-recruitment/)
- [ManagementSite — Managementmythe van de maand: persoonlijkheidstesten](https://www.managementsite.nl/managementmythe-persoonlijkheidstesten)
- [ManagementSite — Welke bezwaren zijn er tegen persoonlijkheidstesten?](https://www.managementsite.nl/tql/hrm/werving-en-selectie/welke-bezwaren-zijn-er-tegen-persoonlijkheidstesten)
- [Kritisch Denken — Zeg vaarwel tegen MBTI](https://www.kritischdenken.info/zeg-vaarwel-tegen-mbti-de-rage-die-niet-zal-verdwijnen/)
- [Human Collective — Waarom wordt MBTI afgeraden door psychologen?](https://humancollective.nl/waarom-wordt-mbti-afgeraden-door-psychologen/)
- [RMP-BENE — Waarom blijven typologieën met kleuren of letters zo populair?](https://rmp-bene.com/2020/05/waarom-blijven-typologieen-met-kleuren-o-a-insights-of-letters-o-a-mbti-disc-zo-populair/)

**Achtergrond**
- [Wikipedia — Revised NEO Personality Inventory](https://en.wikipedia.org/wiki/Revised_NEO_Personality_Inventory)
- [Wikipedia — HEXACO model of personality structure](https://en.wikipedia.org/wiki/HEXACO_model_of_personality_structure)
- [Wikipedia — Jungian archetypes](https://en.wikipedia.org/wiki/Jungian_archetypes)

**Interne bronnen**
- `/home/claude/work/SITE-INVENTARIS.md`
- `/mnt/user-data/outputs/A-baseline.md`
- `/mnt/user-data/outputs/C-tekst-en-rapport.md`
- `/home/claude/site/index.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`
- `/home/claude/work/app.beautified.js`, regel 19537–20330 (landingscopy) en 14758–14759 (voetteksten)

> **Verificatiebeperking.** De status van `speaktoart.com` en de live indexering van
> `arcanaprofile.com` konden vanuit deze omgeving niet worden gecontroleerd: het uitgaande
> verkeer loopt via een proxy die beide domeinen blokkeert. Dat is de eerste handeling na het
> lezen van §3, en de uitkomst bepaalt welke van de twee redirect-routes geldt.

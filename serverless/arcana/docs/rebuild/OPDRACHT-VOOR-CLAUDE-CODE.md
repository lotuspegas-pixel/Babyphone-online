# Opdracht voor Claude Code — Arcana Profile

Plak het blok hieronder in Claude Code, met de repo open in
`C:\Users\rleac\Downloads\babyphoneonline\serverless\arcana`.

Alles waar het naar verwijst staat al in de repo. Er hoeft niets meegestuurd te worden.

---

```
Je werkt aan Arcana Profile, een Nederlandse zelfreflectietest die live staat op
arcanaprofile.com. De repo staat open. Werk in het Nederlands, ook in commits en
commentaar.

## Lees dit eerst, in deze volgorde

1. README.md en docs/arcana/ — de bestaande productspecificatie. Die is van de
   eigenaar en wint van alles wat hieronder staat. Lees in elk geval
   06-acceptatiecriteria.md, DECISIONS.md en PROJECT_STATUS.md.
2. docs/rebuild/G-rebuild-spec.md — het plan. §2 bevat de beslispunten, §5 de
   gefaseerde bouwtaken met acceptatiecriteria en terugrol-optie per stap.
3. docs/rebuild/A-baseline.md — de nulmeting. §1 is de meetlat, §5 bevat de
   scripts waarmee je hermeet.
4. De werkstroom die bij je taak hoort: B voor design, C voor tekst, D voor
   techniek, E voor landing en SEO, F voor verdienmodel.
5. docs/rebuild/Z-eindcontrole.md — de onafhankelijke controle op die stukken,
   inclusief negen opgeloste tegenspraken. Waar een werkstroom en Z het oneens
   zijn, wint Z.

Die documenten zijn advies, geen wet. Ze zijn geschreven op basis van de
geminificeerde bundel, voordat de bron beschikbaar was. Zit er iets in dat niet
klopt met wat je in de code ziet: de code wint, en zeg het.

## Wat er al gedaan is — bouw hierop voort, doe het niet over

Drie dingen zijn al doorgevoerd en staan in de repo:

1. **Gouden master** (src/test/goldenMaster.test.ts + src/test/golden/).
   Twaalf vaste antwoordsets, byte-voor-byte vergeleken met vastgelegde uitvoer.
   Dit is de belangrijkste test van het project: de site belooft letterlijk dat
   dezelfde antwoorden hetzelfde rapport geven, en variantkeuze werkt via
   hash % lijstlengte — één zin toevoegen aan een zinnenbank herrolt de tekst
   voor bijna elke bestaande antwoordset, zonder foutmelding.
   Bewezen werkend: bij zo'n toevoeging vielen 10 van de 12 fixtures om terwijl
   de 91 bestaande tests groen bleven.

2. **De u-vorm is gerepareerd** (src/lib/arcanaVoice.ts).
   De omzetter van "je" naar "u" werkte met een whitelist van werkwoorden;
   alles wat daar niet in stond werd bezittelijk "uw". Live stond onder meer:
   "Hoe u bent wanneer uw alleen bent", "kun uw anderen meenemen", "goed voor
   uw is", "op basis van u 120 antwoorden". Circa 70 regels per rapport.
   De regel is omgedraaid: een woord op -t na "je" is standaard een werkwoord,
   met een korte lijst zelfstandige naamwoorden als uitzondering; inversie
   krijgt de -t terug ("voel je" → "voelt u") zonder bezit te breken ("lees je
   rapport" → "lees uw rapport"); telwoorden gelden als bezit.
   src/test/arcanaVoiceCorpus.test.ts toetst dit voortaan over alle zinnen uit
   de databestanden.

3. **De domeinfix** (index.html, public/sitemap.xml, public/robots.txt).
   Elf voorkomens van speaktoart.com vervangen. scripts/check-domains.mjs
   draait nu als laatste stap van `npm run build` en faalt met exit 1 op het
   oude domein, op elke onbekende host, en wanneer canonical, og:url, og:image
   of een JSON-LD @id ontbreekt of afwijkt.

Stand: 115 tests groen (was 91). `npm run build` reproduceert de live bundel
exact wanneer je de drie wijzigingen terugdraait — dat is gecontroleerd met een
md5-vergelijking tegen wat op arcanaprofile.com draait.

arcana-rebuild.patch in de reporoot bevat dezelfde wijzigingen als git-patch,
voor het geval je ze wilt nalezen of terugdraaien.

## Niet-onderhandelbaar

1. De deterministische reken-engine en de belofte dat elke zin uit een score
   komt. Geen taalmodel, geen willekeur, geen netwerk.
2. Privacy: alles lokaal, geen server, geen gedwongen account. Er mag geen
   enkel netwerkverzoek bijkomen dat er nu niet is.
3. De disclaimer: geen diagnose, niet gevalideerd, niet voor selectie of
   beoordeling van anderen. Niet afzwakken, niet verplaatsen naar beneden.
4. De kwaliteit van de rapporttekst en de meerdere zinsvarianten.
5. De SEO-basis: JSON-LD, OG-tags, de noscript-inhoud, de statische
   #root-fallback, canonical, sitemap.
6. Toegankelijkheid mag alleen beter worden. Huidige stand: 0 contrastfouten op
   693 tekstknopen, gemeten met het script in A-baseline.md §5.

## De regressiepoort — draai dit na elke stap

    npm run test          # 115 tests, moet groen blijven
    npm run build         # bouwt en draait de domeincontrole
    npm run typecheck
    npm run lint

Plus, wanneer je aan styling of kleur komt: het contrastscript uit
docs/rebuild/A-baseline.md §5 in de console, in lichte én donkere modus, op de
landing, het vragenscherm en het rapport. Nul fouten.

Wijzig je bewust een tekst, dan werk je de gouden master in dezelfde commit bij:

    ARCANA_GOLDEN_UPDATE=1 npx vitest run src/test/goldenMaster.test.ts

Zo laat de diff precies zien wat er voor de lezer veranderde. Werk hem nooit
bij om een test stil te krijgen zonder te kijken wát er veranderde.

## Werkwijze

- Werk op een branch, nooit direct op de hoofdlijn. Eén commit per afgeronde
  stap, met in de boodschap wat er veranderde en waarom.
- Maak de repo eerst een echte git-repo als dat nog niet zo is (er is alleen
  een .gitignore). Haal daarbij de regel `.arcana-baseline` uit .gitignore weg
  of laat hem staan, maar zorg dat src/test/golden/ wél meegaat — zonder die
  snapshots is de gouden master waardeloos.
- Vraag om een beslissing in plaats van te gokken wanneer een keuze het
  uiterlijk of de tekst van het product raakt.
- Maak per stap een kort changelog-regeltje in docs/rebuild/CHANGELOG.md.

## De taken, in deze volgorde

### 1. Designtokens en donkere modus  (laag risico, hoogste zichtbare winst)

Bron: docs/rebuild/B-designrichting.md, docs/rebuild/design-tokens.css en
-.json, en docs/rebuild/B-moodboard.html (open die in een browser).

- Voer de tokenset in als vervanging van de huidige :root in
  src/styles/arcana.css en src/styles/site.css. Aanbevolen richting: (a)
  Perkament & Diepte, met de donkere modus van (b) Nacht & Goud erbij. Vraag de
  eigenaar of hij die keuze bevestigt voordat je begint — het moodboard is
  daarvoor gemaakt.
- Repareer de twaalf dimensiekleuren. Zes halen nu geen AA en twee halen zelfs
  de grafische eis van 3:1 niet (#9a9349 = 2,98 en #b58b41 = 2,94). Onder
  protanopie liggen Zelfbeeld en Schaduwkant op ΔE 1,4, wat geen zichtbaar
  verschil is. B §3.4 heeft een doorgerekend alternatief met vier families van
  drie, elk onderscheiden door lichtheid én een familiesymbool, zodat kleur
  nooit de enige drager is. Meet elke kleur na met het script uit A §5; schat
  niet.
- Voer de donkere modus in via prefers-color-scheme plus een handmatige
  override die in localStorage bewaard blijft. Er zijn nu nul
  prefers-color-scheme-regels. Let op: geen flits bij het laden, en het
  scorewiel moet mee.
- Behoud de vijf prefers-reduced-motion-blokken die er al zijn.

Klaar wanneer: contrastscript geeft 0 fouten in beide modi op alle drie de
schermen, 115 tests groen, gouden master ongewijzigd (styling raakt de tekst
niet — verandert hij tóch, dan heb je iets geraakt wat je niet wilde raken).

### 2. Bundel splitsen en het scorewiel naar SVG

Bron: docs/rebuild/D-frontend-plan.md §3 en §4.

- Nu: 484 KB in één chunk, 139,5 KB over de lijn. De vragenbank en de
  rapportteksten samen zijn 179.440 bytes — 37% van de bundel — en een
  landingsbezoeker heeft daar niets aan. Doel: landing naar ongeveer 69 KB.
  Meet voor en na met het performancescript uit A §5.
  Let op het risico dat D §8 noemt: laad de engine-chunk al bij de intake en
  niet pas bij vraag 120, anders heeft iemand 25 minuten gewerkt en krijgt bij
  een wegvallende verbinding niets.
- Fonts: 94 KB in vier bestanden. Subsetten brengt dat naar ongeveer 45 KB.
- Het scorewiel (src/components/ArcanaPortrait.tsx) is een canvas. Het hééft
  een aria-label van 270 tekens plus een lijst van twaalf rijen, dus voor een
  schermlezer is het in orde — dat klopt niet in A §3.6, daar is een correctie
  bij gezet. De echte bezwaren blijven: het rastert bij printen en PDF, de
  labels zijn niet selecteerbaar, en het schaalt niet met de zoom. Zet het om
  naar SVG. Een pixeldiff is hier het verkeerde gereedschap, want de kleuren
  veranderen sowieso door taak 1; beoordeel het visueel naast elkaar.

Klaar wanneer: landing ≤ 95 KB over de lijn, gouden master ongewijzigd, wiel
identiek van betekenis en beter van kwaliteit bij print.

### 3. Landingspagina en hero herbouwen

Bron: docs/rebuild/E-usp-en-landing.md (positionering, drie hero-varianten met
hypothese, volledige copy per sectie) en docs/rebuild/C-tekst-en-rapport.md
(toon, microcopy, de eerste-keer-ervaring).

- Het kernprobleem: de h1 is de merknaam en het woord "narekenbaar" staat pas
  2.100 px lager. Wie na de hero wegklikt heeft de propositie nooit gezien.
  Aanbevolen: variant B, de bewijs-hook. Laat de eigenaar kiezen uit de drie.
- Doorbreek het ritme. Elf secties hebben nu identiek opbouw: goud
  kapitaal-eyebrow, Cormorant-kop, grijze introzin, kaartenraster op dezelfde
  perkamentachtergrond. B §4 beschrijft welke secties een andere achtergrond,
  volle breedte of een donker blok krijgen.
- Laat iets van het rapport zien boven de vouw. Het scorewiel is het sterkste
  visuele element dat dit product bezit en een bezoeker ziet het pas na 25
  minuten vragen.
- Twee claims op de site zijn falsifieerbaar onwaar; C §2 benoemt ze. Repareer
  die, het is een half uur werk en het raakt precies de belofte waarop dit
  product verkoopt.
- Gebruik 5.700+ als woordental van het rapport, niet 5.500+ en niet 7.500+.
  Nagemeten over twaalf fixtures: 5.910 tot 6.675 woorden. De 7.559 uit A §1 is
  de hele gerenderde pagina inclusief inhoudsopgave en knoppen.

Klaar wanneer: de propositie staat boven de vouw, de 5-secondentest uit E §6 is
uitvoerbaar, SEO-basis intact, contrast 0 fouten.

### 4. Rapport: herleesstructuur  (hoogste risico — raakt de tekstlaag)

Bron: docs/rebuild/C-tekst-en-rapport.md §3.

- Samenvatting bovenaan die op zichzelf staat, zodat het rapport een naslagwerk
  wordt in plaats van een eenmalige lezing van 6.000 woorden.
- Verplaats `ifItDoesNotFit` van hoofdstuk 33 naar direct onder de
  valkuilenlijst. Die troosttekst bestaat al, is per archetype geschreven, en
  staat negentien hoofdstukken te laat — iemand leest 's avonds alleen dat zijn
  belangrijkste eigenschap een vluchtroute is en krijgt de nuance pas veel
  later.
- Maak het deelbare hoofdstuk (`understood-by-others`) echt deelbaar: eigen
  aanhef, herkomst, disclaimer, als losse pagina.
- Draai de overgangszinnen om: vier van de vijf banken kijken achteruit ("zoals
  hierboven al genoemd"), wat leest als excuses voor herhaling. Met het cijfer
  erin wordt het architectuur én narekenbaar.

Bij élke tekstwijziging: gouden master bijwerken in dezelfde commit, en in de
boodschap zetten wat er inhoudelijk veranderde.

Klaar wanneer: gouden master bewust bijgewerkt met een leesbare diff, 115 tests
groen, disclaimer op dezelfde plek in de leesvolgorde.

## Wat je niet moet doen zonder te overleggen

- De vier localStorage-sleutels hernoemen of hun vorm wijzigen. Bestaande
  gebruikers verliezen dan hun rapport. Het zijn er zes:
  arcana_answers, arcana_current_question, arcana_result, arcana_profile,
  arcana_started_at, arcana_completed_at.
- De achttien archetypenamen vertalen. Ze heten allemaal Engels ("The Wounded
  Healer") op een site die verder geen woord Engels bevat, en dat is het eerste
  wat iemand na 25 minuten over zichzelf leest. Het is een goede vraag, maar
  het is een beslissing van de eigenaar en het raakt de hele tekstlaag.
- Analytics toevoegen. A §4 beschrijft drie routes die de privacybelofte heel
  laten; de aanbeveling is drie opt-in tellers voor uitsluitend de stappen
  landing → start → vraag 1. Alles daarbuiten is een merkbeslissing.
- Een betaalmuur of premium-functie bouwen. F beveelt een betaalde bewaarversie
  van 9 euro aan, maar expliciet pas ná de rebuild en na drie maanden
  verkeersmeting.

## Eerste actie

Lees docs/arcana/ en docs/rebuild/G-rebuild-spec.md, draai `npm run test` en
`npm run build` om te zien dat je op een groene basis begint, en kom dan terug
met: welke van de drie designrichtingen je aanraadt na het zien van het
moodboard, en of je iets in de plannen tegenkomt dat niet klopt met de code.
Begin pas met bouwen als de eigenaar een richting heeft gekozen.
```

---

## Twee dingen die je zelf moet doen, buiten Claude Code om

**1. De 301 op speaktoart.com.** Dat domein serveert nog Arcana Mirror, een
eerdere versie van hetzelfde product. Zolang dat zo is, concurreren twee bijna
identieke sites van jou om dezelfde zoekwoorden. Zet een 301 met padbehoud naar
arcanaprofile.com, zet Arcana Mirror uit, en geef de adreswijziging door in
Search Console. Dit is geen code; Claude Code kan het niet voor je doen.

**2. Een PageSpeed-meting.** Draai PageSpeed Insights één keer op
arcanaprofile.com vóór de rebuild en bewaar de score. Zonder dat getal blijft
"Lighthouse ≥ baseline" in de kwaliteitschecklist een lege regel.

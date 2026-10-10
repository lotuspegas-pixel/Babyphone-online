---
name: Arcana Profile — Het Arcana Dossier
description: Archiefcollage op verouderd perkament — inkt, zegelrood en gescheurd papier — gedeeld door landing, testflow, rapport en PDF.
colors:
  bg: "#ede4cc"
  bg-veil: "#e5d9b8"
  bg-deep: "#dccc9f"
  bg-band: "#cbb87f"
  bg-ink: "#1c1712"
  bg-wash: "#f2e6c4"
  surface: "#f4edda"
  surface-raised: "#f8f3e4"
  ink: "#1c1712"
  ink-soft: "#4e4338"
  ink-faint: "#6b5f4e"
  ink-inverse: "#f2e9d4"
  ink-inverse-soft: "#cbb98f"
  gold: "#7e1e1b"
  gold-deep: "#5a1210"
  gold-glyph: "#9c2b22"
  btn-fg: "#fffaf2"
  fam-motor: "#4242a2"
  fam-contact: "#006a5c"
  fam-grip: "#755a00"
  fam-zelf: "#b43758"
  dim-innerlijke-motor: "#4261b6"
  dim-denkstijl: "#4242a2"
  dim-werkstijl: "#3c2c73"
  dim-sociale-energie: "#057358"
  dim-emotionele-gevoeligheid: "#006a5c"
  dim-relatiepatroon: "#005041"
  dim-controle-zekerheid: "#79632f"
  dim-conflictstijl: "#755a00"
  dim-stressreactie: "#633a00"
  dim-zelfbeeld: "#9b496d"
  dim-schaduwkant: "#b43758"
  dim-groeipad: "#85003c"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(2.3rem, 4.3vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(1.9rem, 3.4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(1.35rem, 1.1rem + 0.9vw, 1.7rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "normal"
  quote:
    fontFamily: "Bodoni Moda, Didot, Times New Roman, serif"
    fontSize: "clamp(1.4rem, 1.1rem + 1.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Spectral, Georgia, Times New Roman, serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Courier Prime, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "0.74rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.2em"
  marginalia:
    fontFamily: "Shadows Into Light, Segoe Print, Bradley Hand, cursive"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "normal"
rounded:
  none: "0"
  edge: "3px"
  panel: "0.875rem"
  pill: "999px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "2.5rem"
  space-8: "3rem"
  space-9: "4rem"
  space-10: "5rem"
  space-11: "6.5rem"
  space-12: "8rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  sectie-kort: "clamp(2.25rem, 5vw, 3.5rem)"
  sectie-normaal: "clamp(3rem, 7vw, 5.5rem)"
  sectie-ruim: "clamp(4.5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.btn-fg}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-primary-site:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.btn-fg}"
    rounded: "{rounded.edge}"
    padding: "0.65rem 1.4rem"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    padding: "12px 4px"
    height: "44px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.edge}"
    padding: "12px 16px"
    height: "48px"
  likert-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.edge}"
    size: "52px"
  likert-option-selected:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.btn-fg}"
  card-torn:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.7rem 1.7rem 1.4rem"
  sheet-torn:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.5rem, 4vw, 2.4rem) clamp(1.1rem, 4vw, 2.2rem) 1.6rem"
    width: "720px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px 24px"
    width: "720px"
  theme-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "2px"
  theme-toggle-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0.4rem 0"
  band-ink:
    backgroundColor: "{colors.bg-ink}"
    textColor: "{colors.ink-inverse}"
---

# Design System: Arcana Profile — Het Arcana Dossier

## Overview

**Creative North Star: "Het Opengeslagen Dossier"**

Arcana Profile ziet eruit als een archiefdossier over één persoon dat open op tafel ligt: verouderd perkament als grond, archiefinkt voor alles wat gezegd wordt, één zegelrood voor wat gedaan of bezegeld wordt, en gescheurd papier als de vorm waarin elk stuk inhoud ligt. De wereld is gepind op de eigenaarsmockups ("Arcana Design Sep 2026") en put uit de Jungiaanse dieptepsychologie — drempel, brein, vlam, kompas, schaakkoning, buste — maar leest als een redactioneel document, niet als een quiz. Landing, testflow, rapport en PDF delen dezelfde materialen en hetzelfde embleem per archetype.

De dichtheid is die van een goed gezet boek: grote Bodoni-koppen met strakke regelafstand, Spectral-leesregels van hooguit 64–70 tekens, Courier-regels voor alles wat cijfer, datum of code is, en handschrift uitsluitend als kanttekening in de marge. Rijkdom komt uit vector, typografie en papierlagen, nooit uit foto's, verlopen of schaduwstapels. Beweging is één intekenmoment per oppervlak en daarna rust.

Bewust afgewezen (directiecontracten, okt. 2026): de categorie-standaard "kop + subtekst + knop + drie gelijke kaarten", de quiz-esthetiek van persoonlijkheidstests, de nepcijfers en testimonials uit de mockups, en elk fotografisch of AI-gegenereerd gezicht.

**Key Characteristics:**
- Perkament, inkt, zegelrood: drie materialen, één accent.
- Gescheurd papier (`clip-path`) als kaart-, blad- en voetvorm; schaduw altijd als `drop-shadow` op de omhulling.
- Bodoni Moda 600 voor koppen, Spectral voor lopende tekst, Courier Prime voor data, Shadows Into Light alleen in de marge.
- Alle beeld eigen vector-SVG: vier herbruikbare motieven, twaalf archetype-emblemen, zes deelillustraties; geen gezichten.
- Twaalf dimensiekleuren in vier families, nooit als enige drager (altijd label, vorm en positie erbij).
- Eén georkestreerd intekenmoment per oppervlak, één reveal per blok, volledige stilstand bij `prefers-reduced-motion`.
- Licht en donker volwaardig; print en PDF altijd op licht perkament; elk contrast gemeten en vastgelegd in `src/styles/tokens.css`.

## Colors

Een warm, laagverzadigd palet van perkamenttinten en inkt met één dieprood accent; de twaalf dimensiekleuren zijn de enige "bonte" kleuren en komen alleen voor waar een score of kaartsoort ze draagt.

### Primary
- **Zegelrood** (`gold`, #7e1e1b): het ene accent. Actie, zegel, opsommingsstippen, korte accentlijnen onder titels, de watermerk-hoofdstuknummers (op 14 % dekking), de leeslijn, voortgangsinkt en de rode inktstreep onder de hero-kop. 7,93:1 op perkament.
- **Diep Zegelrood** (`gold-deep`, #5a1210): knopvlak en focusring (`--btn-bg`, `--focus`). Hover op de primaire knop is geen tweede kleur maar `filter: brightness(1.12)` plus 1 px lift. 10,84:1 op perkament.
- **Lakrood** (`gold-glyph`, #9c2b22): uitsluitend grafisch (opsommingsstippen, de hero-schijf via een radiaal verloop #b8392d → #9c2b22 → #7e1e1b). Nooit voor tekst onder 24 px.

### Secondary
De vier dimensiefamilies, elk met een anker voor koppen en legenda's en drie leden die in lichtheid verschillen:
- **Indigo / motor** (`fam-motor`, #4242a2): innerlijke motor, denkstijl, werkstijl — en de stempel "inzicht" (cirkel).
- **Groen / contact** (`fam-contact`, #006a5c): sociale energie, emotionele gevoeligheid, relatiepatroon — stempel "groei" (driehoek omhoog).
- **Amber / grip** (`fam-grip`, #755a00): controle & zekerheid, conflictstijl, stressreactie — stempel "beschouwing" (ruit).
- **Karmijn / zelf** (`fam-zelf`, #b43758): zelfbeeld, schaduwkant, groeipad — stempel "schaduw" (driehoek omlaag).
Elk archetype krijgt één motief plus één familiekleur (`src/data/arcanaMotifs.ts`); elke dimensie heeft een zachte wasem (`--dim-*-wash`) voor vlakken waar inkt ≥ 13:1 haalt.

### Neutral
- **Oud Perkament** (`bg`, #ede4cc): de paginabasis, met een vaste radiale wasem van `surface-raised` naar `bg-deep` over het hele document.
- **Kaartpapier** (`surface`, #f4edda) en **Opkomend Blad** (`surface-raised`, #f8f3e4): panelen, velden en de gescheurde kaarten/bladen. Lichter papier ligt bóven donkerder papier.
- **Rustig Perkament** (`bg-veil`, #e5d9b8), **Verweerd Perkament** (`bg-deep`, #dccc9f), **Bruine Band** (`bg-band`, #cbb87f): rustige sectie, het papier áchter embleem en hoofdstuk-art, en de volle-breedtebalk.
- **Inktblok** (`bg-ink`, #1c1712): de donkere banden op de landing (Jung-citaat, rapportstapel); tekst daarop is **Lichte Inkt** (`ink-inverse`, #f2e9d4) en **Gedempte Lichte Inkt** (`ink-inverse-soft`, #cbb98f).
- **Archiefinkt** (`ink`, #1c1712), **Verbleekte Inkt** (`ink-soft`, #4e4338), **Potloodgrijs** (`ink-faint`, #6b5f4e): kop- en leestekst, bijschriften, placeholders en de kleine Courier-lijsten. `ink-faint` haalt 4,91:1 en is daarom alleen voor tekst ≥ 0.74rem kapitaal of placeholders.
- **Haarlijnen**: 18 % inkt (`--hairline`), 10 % (`--hairline-soft`), 28 % (`--hairline-strong`, de structuurlijn die een sectie afsluit); `--rule` is 55 % zegelrood.

**Donkere modus** (systeem of `[data-theme="dark"]`): warm bijna-zwart, geen blauwzwart. `bg` #171310, `surface` #1f1913, `surface-raised` #28211a, `bg-veil` #1c1712, `bg-deep` #241d16, `bg-band` #382c1e; `bg-ink` keert om naar een papierblok #efe5ce met `ink-inverse` #1c1712. Inkt wordt #efe5ce / #c7b99c / #96876c; zegelrood wordt #e07c6f, `gold-deep` #eb9e93 (focus), `gold-glyph` #f2bab0. De knop blijft rood maar lichter: `--btn-bg` #c13a2d (3,31:1 op `bg`), hover #c94234. De twaalf dimensies keren om in lichtheid (≥ 4,60:1 op `surface`). Schaduwen werken 's nachts met zwart in plaats van inkt. Print zet alles terug op de lichte waarden.

### Named Rules
**De Zegelrood-regel.** Rood is een handeling of een zegel, geen decoratie: knoppen, focus, stippen, accentlijnen, de hero-schijf en het emblempodium. Het vult nooit een sectie of kaart.
**De Nooit-alleen-kleur-regel.** Een dimensie- of kaartsoortkleur staat altijd naast zijn label, zijn vaste vorm (stempel, familiesymbool) en zijn positie. Haal de kleur weg en de betekenis blijft staan.
**De Oude-naam-regel.** `--gold` heet nog `gold` uit de vorige wereld ("Perkament & Diepte", crème/amber) maar ís het zegelrood. Hernoem niet; honderden verwijzingen hangen eraan.

## Typography

**Display Font:** Bodoni Moda 600 (met Didot, Times New Roman)
**Body Font:** Spectral 400 en 600 (met Georgia)
**Label/Mono Font:** Courier Prime 400 (met ui-monospace)
**Marginalia Font:** Shadows Into Light 400 (met Segoe Print, Bradley Hand) — alleen handschrift in de marge

**Character:** Hoogcontrast-didone tegen een rustige, iets brede leesserif: het dossier klinkt als een gedrukte uitgave, niet als een app. Courier legt elk cijfer en elke code als "getypt" op het papier; het handschrift is de lezer die iets in de kantlijn schrijft. Alle vier zijn zelf gehost en gesubset (`@font-face` in `arcana.css`, basis + twee aanvullingen per snede, fontbegroting ≤ 60.000 B).

### Hierarchy
- **Display** (600, `clamp(2.3rem, 4.3vw, 4.25rem)`, 1.02, −0.025em): de landing-propositie in drie à vier regels, elke zin een blok, de laatste met een rode inktstreep. Het rapportmasthead gaat groter: `clamp(2.7rem, 9vw, 5.6rem)` op 0.98 (archetypenaam), samenvatting en deelopeners `clamp(2.3–2.4rem, 6.5–7.5vw, 4.2–4.6rem)`.
- **Headline** (600, `clamp(1.9rem, 3.4vw, 3rem)`, 1.08, −0.02em): sectiekoppen op de landing; `text-wrap: balance`.
- **Title** (600, `clamp(1.35rem, 1.1rem + 0.9vw, 1.7rem)`, 1.18): kaarttitels, met een korte streep (2.6rem × 3px) in de kaartsoortkleur eronder; inhoudsopgave-titel op `--text-xl`.
- **Quote** (600 cursief, `clamp(1.4rem, 1.1rem + 1.2vw, 2rem)`, 1.3): de slotzin als pull-quote met twee rode lijntjes; de masthead-intro op `--text-lg` cursief in `ink-soft`.
- **Body** (400, 1.08rem in het rapport / 1.0625–1.1rem op de site, 1.65): maat ≤ 64ch (`--measure-prose`), leads ≤ 34–38rem. De kaartintro is Spectral 600 op 1.1rem; opsommingen 1.02rem op 1.6.
- **Label** (Courier 400, 0.72–0.74rem, 0.12–0.22em, kapitaal, tabular-nums): feitenregel, "Deel 1 van 6 · 5 hoofdstukken", "Kaart X van Y", voortgangsblok, stat-labels, trefwoordlijsten (`.mono`). In `ink-soft`, `ink-faint` of zegelrood.
- **Marginalia** (Shadows Into Light, 1.15–1.55rem, 1.15–1.18, gedraaid −5° tot +5°): korte Engelstalige kanttekeningen, altijd `aria-hidden`, nooit lopende tekst. Op zwart papier in de illustraties vast #f2e9d4.

### Named Rules
**De Geen-eyebrow-regel.** Boven een titel staat niets. Courier-kapitaalregels zijn data en staan ónder of naast de kop (feitenregel, deelaanduiding, score); het kaartsoort staat als stempel in de hoek, niet als tekstlabel.
**De Marge-regel.** Handschrift staat alleen in de marge, kort, Engels en `aria-hidden`; het draagt sfeer, nooit informatie.

## Layout

Eén kolom van maximaal 1240 px (`.site --w`) met gutter `clamp(1rem, 4vw, 2.5rem)`; smalle tekstblokken op `calc(50rem + 2 × gutter)`. Secties lopen tot de schermrand (perkament, veil, band of inktblok) en ademen in drie maten: `sectie-kort`, `sectie-normaal`, `sectie-ruim` (scharniermomenten). Binnen blokken telt de 4 px-reeks `space-1…12`.

- **Landing-hero**: vanaf 900 px twee kolommen 0.88fr / 1.12fr; de kop schuift 8vw over de lege linkerrand van de collage, de collage bloedt tot de vensterrand. Daaronder: hairline + drie kolommen "controleerbaar" (≥ 720 px), inktband met citaat, drie lenstegels 1fr / 1.14fr / 1fr (≥ 760 px, middelste verlaagd), voordelenstrook 2 → 5 kolommen (560 / 1000 px), krantenkolommen zonder kaarten voor "waarom".
- **Rapport**: masthead vanaf 860 px 1.1fr / 0.9fr (tekst links, embleem rechts); deelopeners idem, om en om gespiegeld (`--flip`); kaarten in twee kolommen per deel, een alleenstaande of brede kaart over de volle breedte. Links een vaste deelwijzer (zes folio's), bovenaan een 3 px leeslijn.
- **Testflow**: één blad van 720 px per vraag; likert 7 vakjes naast elkaar, onder 420 px 4 per rij; onder 420 px verdwijnt de pauze-hint uit de knoptekst (aria-label blijft).
- **Header**: sticky, 90 % perkament met `backdrop-filter: blur(10px)`; volledige navigatie vanaf 1200 px, daaronder een burger (≥ 44 px) met een uitklappaneel.
- **Breakpoints in gebruik**: 420, 480, 560, 640, 700 (handschrift en bijschriften in de collage), 720, 760, 860, 900 (twee kolommen én parallax), 1000, 1200. Mobiel vanaf 320 px zonder horizontale scroll (`overflow-x: clip` op secties).
- **Print**: A4 staand, marge 14 mm; paginakop en -voet (datum, rapportcode, deeltitel) via `@page`-margeboxen uit `ArcanaReport.tsx`.

## Elevation & Depth

Hybride: diepte komt in de eerste plaats uit papier op papier (perkament → kaartpapier → opkomend blad, met `bg-deep` als het verweerde vel áchter kunst en embleem, licht gedraaid), en pas daarna uit een zachte, inktgetinte `drop-shadow` op de omhulling van elk gescheurd stuk. Geen gestapelde `box-shadow`-niveaus, geen glans.

### Shadow Vocabulary
- **Kaart** (`filter: drop-shadow(0 0.45rem 0.7rem rgb(28 23 18 / 0.16)) drop-shadow(0 0.06rem 0.12rem rgb(28 23 18 / 0.2))`): op `.arcana-card-shell`, de wrapper rond een gescheurde kaart.
- **Blad** (`drop-shadow(0 0.5rem 0.8rem …/0.16) drop-shadow(0 0.06rem 0.12rem …/0.2)`): het vraagblad in de testflow (`.arcana-sheet`).
- **Kunst** (`drop-shadow(0 0.45–0.5rem 0.8rem …/0.2–0.22)`): emblemen, deelillustraties, lenstegels (`0 6px 10px …/0.22`).
- **Rapportstapel op inkt** (`drop-shadow(0 1.4cqw 1.6cqw rgb(0 0 0 / 0.38))`): de uitwaaierende mock-pagina's op de inktband.
- **Tokenladder** `--shadow-1…4` (licht: inktkleur 28 23 18 op 4–14 %; donker: zwart op 35–55 %): beschikbaar voor vlakke panelen; het dossier gebruikt hem op de getoonde oppervlakken niet.

### Named Rules
**De Omhullingsregel.** Een `clip-path` knipt zijn eigen schaduw weg. Schaduw op gescheurd papier staat daarom altijd als `filter: drop-shadow` op de wrapper, nooit als `box-shadow` op de geknipte node.
**De Papier-op-papier-regel.** Hoogteverschil is eerst een lichter vel op een donkerder vel; een schaduw bevestigt dat alleen. Een vlak zonder papierverschil krijgt ook geen schaduw.

## Shapes

De vorm van het dossier is gescheurd, niet afgerond. `.arcana-torn` is één polygoon met een randhoogte `--jag` (7 px op kaarten, 8 px op het vraagblad, 9 px standaard, 11–12 px op het papier achter kunst en embleem, 18 px op de voetrand). Kaarten en bladen hebben daardoor radius 0. Invoervelden en antwoordvakjes zijn hoekig (3 px); het enige ronde is de knop in de testflow (pil, 999 px), de themaschakelaar (pil) en het oude vlakke paneel (0.875rem, haarlijn, voor intake en hulpkaarten). Op de site zijn knoppen rechthoekig met 3 px, zoals de referentie.

Terugkerende geometrie: de korte rode streep (2.6rem × 3 px onder kaarttitels, 3.2rem × 2 px onder de inhoudsopgave, 3rem × 2 px rond de pull-quote); de handgetrokken inktstreep onder de hero-kop (onregelmatige radius, −1.2°); de rode schijf (radiaal verloop, 72 % van het embleem, rechtsboven); het watermerknummer (Bodoni `clamp(6rem, 16vw, 11rem)`, zegelrood op 14 %) achter elke deeltitel; de stempels van 13 px (cirkel, driehoek omlaag, ruit, driehoek omhoog, en een 11 px open ruit met 2 px inktrand voor "profiel"); het zegel (ster boven figuur op drietredige sokkel in een gestippelde ring, puur `currentColor`).

## Components

### Buttons
Tactiel maar ingetogen: één rood vlak, geen glans, een lichte lift.
- **Shape:** pil (999 px) in de testflow en het rapport; rechthoek (3 px) in de site-laag.
- **Primary:** `gold-deep` op `btn-fg`, Spectral 600 14.5px (site 1.02rem), 12 × 24 px, min. 48 px hoog (masthead 44 px). Hover: `brightness(1.12)` + `translateY(-1px)`; actief: `scale(0.98)` in 120 ms; disabled 45 % dekking.
- **Ghost:** transparant, inkt, haarlijn-rand (`hairline-strong` op de site); hover vult met `bg-veil` en de rand wordt zegelrood.
- **Text:** onderstreept (offset 3 px), `ink-soft` → inkt, min. 44 px.
- **Focus:** overal `outline: 3px solid var(--focus)`, offset 2 px; op inktbanden wordt de ring lichte inkt.

### Inputs / Fields
- **Style:** `surface`, 1 px haarlijn, 3 px hoeken, 16 px Spectral, 12 × 16 px, min. 48 px; label Spectral 600 13.5px; placeholder `ink-faint`; caret zegelrood.
- **Focus:** rand én 3 px ring in `focus` (offset 1 px). Hover: rand zegelrood.

### Likert-antwoorden (signatuur van de testflow)
Zeven vierkante vakjes (`aspect-ratio: 1`, min. 52 px, 8 px tussenruimte) met alleen een Courier-cijfer; eindlabels eronder in 12.5px. Hover: rand zegelrood, cijfer `gold-deep`, 1 px lift; gekozen: vult met `btn-bg`/`btn-fg`; indrukken: `scale(0.98)` 120 ms. WAI-ARIA radiogroup, pijltjes verplaatsen keuze. Het volgende blad schuift in vanaf 2rem rechts (220 ms, `ease-uit`; terug van links).

### Voortgang
Courier-kapitaal blok- en vraaglabel (0.74rem, 0.12em; blok in zegelrood) boven een 3 px lijn van segmenten in haarlijn; de inkt vult per blok (`scaleX`, 380 ms `ease-uit`). In het rapport dezelfde 3 px leeslijn bovenaan, zegelrood op `scaleX`.

### Cards / Containers
- **Gescheurde kaart** (`.arcana-card-shell > .arcana-card-clip.arcana-torn`): `surface-raised`, 1.7rem / 1.7rem / 1.4rem, `--jag: 7px`; drop-shadow op de shell; `:target` krijgt een 3 px inzetrand in de kaartsoortkleur. In de hoek rechtsboven (1.3rem / 1.35rem) de stempel van het `data-kind` (insight, shadow, reflection, growth, summary). Titel, korte accentstreep, intro (Spectral 600), lopende tekst, rode stippen (0.58rem, `gold-glyph`), kaartnavigatie onderaan ("Kaart X van Y" in Courier, links/rechts met een halve regel context).
- **Vraagblad** (`.arcana-sheet__paper`): zelfde papier, `--jag: 8px`, 720 px breed.
- **Vlak paneel** (`.arcana-card`): `surface`, haarlijn, 0.875rem, 28 × 24 px, geen schaduw; voor intake en hulpkaarten.
- **Deelopener** (`.arcana-chapter`): watermerknummer, titel, rode streep, Courier-meta, lead ≤ 34rem; rechts de deelillustratie (420 × 380) op een gescheurd `bg-deep`-vel dat −3° (gespiegeld +2.5°) gedraaid ligt; de illustratie tekent zich één keer in (`clip-path inset` → 0) als het deel in beeld komt.
- **Emblempodium** (`.arcana-emblem`): rode schijf (72 %, rechtsboven), gescheurd `bg-deep`-papier (`--jag: 12px`), het archetype-embleem (320 × 340) en de naam in Bodoni cursief op het lege etiket (6.4cqw). Eenmalig intekenmoment in de masthead: band 0.6 s, schijf `pop` 1 s, papier 0.8 s @0.2 s, kunst 0.9 s @0.4 s, titel-`wipe` 0.8 s @0.2 s, citaat @0.65 s, feiten @0.95 s, knoppen @1.1 s, naam en marginalia @1.0–1.2 s; klaar binnen 2.2 s.
- **Inktband** (`.landing__sectie--ink`): `bg-ink` met `ink-inverse`; stippen en Courier worden `ink-inverse-soft`, handschrift `ink-inverse`.

### Navigation
- **Header:** sticky, 90 % perkament + blur, haarlijn onder; zegel (44 px, inkt) + woordmerk Bodoni 1.55rem met de gestapelde slogan "Know your patterns" in Courier 0.56rem / 0.3em. Links in inkt, 1 px onderlijn die op hover zegelrood wordt (180 ms). Rechts de themaschakelaar en de primaire knop. Onder 1200 px: burger (44 px, pilrand, drie 1.5 px streepjes die naar een kruis draaien) en een paneel met rijen van ≥ 44 px en zachte haarlijnen.
- **Themaschakelaar:** drie woorden (Licht / Auto / Donker) in een pil op `surface`, 2 px padding; de gekozen stand is inkt-op-perkament (omgekeerd), `aria-pressed`. Geen iconen.
- **Tekstlinks met pijl** (`.landing__pijl`): onderlijn 1 px in `currentColor`, op hover 2 px; geen knop.
- **Voet:** `bg-veil` met een gescheurde bovenrand (`--jag: 18px`), zegel + woordmerk, links op ≥ 44 px, fineprint 0.85rem ≤ 72ch.

### Zegel, ornamenten, iconen, motieven (signatuur)
- **ArcanaSeal**: het woordmerk-zegel, viewBox 0 0 100 100, puur `currentColor`; favicon tot PDF-voorblad.
- **ArcanaOrnament**: zon-maan, sterrenbarst, maanfasen — kleurloze rustpunten (`currentColor`).
- **ArcanaIcon**: zes fijne lijniconen (kompas, scheut, driehoek, venn, zon, document), 1.8 px lijn, `pathLength="1"` zodat ze zich intekenen (0.9 s, 90 ms per icoon) in de voordelenstrook.
- **ArcanaMotif**: doorgang, brein, vlam, kompas; één `--motif`-kleur (familieanker) per archetype; geanimeerd alleen op de rapport-voorpagina.
- **Kunst als bestand**: hero-collage (760 × 640, op desktop in drie parallaxlagen 0.15 / 0.35 / 0.6), lenstegels, methode-buste, eindscène, 12 emblemen, 6 deelillustraties — allemaal eigen SVG met eigen papier; worden niet omgekleurd; ontbreekt een bestand, dan verdwijnt de hele omhulling.

### Marginalia
`.hand` / `.arcana-note`: Shadows Into Light, gedraaid, max. 15–24rem, in `ink-soft`, zegelrood (`.hand--diep`) of `ink-inverse` op inkt. Op de landing schrijven ze zich in met een `clip-path`-reveal (0.65 s per notitie, gestaffeld, laatste klaar op 1.75 s).

### PDF-knop
Primaire knop "Download als PDF" met daaronder een Spectral 12.5px-regel ("niets verlaat je apparaat") en een tekstknop naar het printvenster als reserve; `aria-busy` tijdens het maken; fouten als `role="alert"` in dezelfde kolom.

## Do's and Don'ts

### Do:
- **Do** zet elk stuk inhoud op papier: kaart, blad of vel met `.arcana-torn`, `surface-raised` op perkament, `drop-shadow` op de omhulling.
- **Do** gebruik zegelrood (`--gold`) alleen voor handeling, zegel, stip en accentlijn; houd het onder de tien procent van een scherm.
- **Do** zet cijfers, datums, codes en korte trefwoordlijsten in Courier Prime kapitaal (0.72–0.74rem, 0.12–0.22em, tabular-nums) ónder of naast de kop.
- **Do** laat elke dimensiekleur vergezeld gaan van label, familiesymbool of stempel en vaste positie.
- **Do** teken nieuw beeld als eigen vector-SVG in dezelfde collagetaal (papier, inkt, rode schijf, Jungiaanse symbolen), met `aria-hidden`/`alt=""` als de tekst ernaast de betekenis draagt.
- **Do** geef een nieuw oppervlak hooguit één georkestreerd intekenmoment (≤ 2.2 s) en per blok één reveal via IntersectionObserver (35 %, eenmalig); alles transform-/clip-path-only, `will-change` alleen tijdens beweging.
- **Do** laat bij `prefers-reduced-motion` en in print alles in de ontworpen eindstand staan (duraties 0.01 ms, `translate: none`, geen parallax).
- **Do** meet het contrast van elke nieuwe kleur en schrijf de ratio in `tokens.css`; tekst ≥ 4,5:1, grafiek ≥ 3:1, focusring 3 px in `--focus`.
- **Do** houd de landing-JS ≤ 75.000 B en de fonts ≤ 60.000 B (brotli); rijkdom komt uit vector en typografie.

### Don't:
- **Don't** zet een kicker, eyebrow of tekstlabel boven een titel; het kaartsoort is een stempel in de hoek.
- **Don't** gebruik `box-shadow` op een element met `clip-path`, en geen schaduw op een vlak zonder papierverschil.
- **Don't** gebruik handschrift voor lopende tekst, Nederlandse copy of iets wat een lezer moet weten.
- **Don't** gebruik foto's, AI-gegenereerde beelden of gezichten van echte personen; geen iconenbibliotheek, geen systeem-displayletter.
- **Don't** voeg nieuwe kleuren toe buiten `tokens.css`, hernoem `--gold`, en maak rood nooit een achtergrond van een sectie of kaart.
- **Don't** rond kaarten of bladen af; alleen knoppen (testflow) en de themaschakelaar zijn pillen, velden blijven 3 px.
- **Don't** fade-up op elke sectie, geen doorlopende of herhalende animaties, geen beweging die een functie draagt.
- **Don't** toon nepcijfers, beoordelingen, testimonials of "wetenschappelijk bewezen"; alleen de echte getallen (120 · 12 · 30 · 33 · ≈5.700 woorden).

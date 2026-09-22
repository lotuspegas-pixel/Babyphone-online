# D — Front-endplan: architectuur, bundel, wiel, donkere modus, bouwvolgorde en tests

**Werkstroom D · 22 september 2026**
Gebaseerd op `SITE-INVENTARIS.md`, `A-baseline.md`, `B-designrichting.md` + `design-tokens.css`/`.json`,
`C-tekst-en-rapport.md`, en op eigen metingen aan `app.beautified.js` (20.744 regels) en
`app.pretty.css` (2.714 regels).

---

## Hoe je dit document leest

**Elk cijfer hieronder is gemeten, niet geschat.** Waar een getal een aanname is, staat dat er
letterlijk bij. De meetscripts staan in bijlage §9 zodat elke uitspraak te herhalen is.

Er zijn drie soorten uitspraken in dit document, en ze zijn steeds als volgt gemarkeerd:

| Markering | Betekenis |
|---|---|
| **[gemeten]** | Uit de bundel of de CSS gemeten met een script dat in §9 staat. |
| **[afgeleid]** | Volgt logisch uit de bundel, maar is niet rechtstreeks meetbaar (bijvoorbeeld een buildinstelling die je afleidt uit de vorm van de uitvoer). |
| **[aangenomen]** | Een reconstructie. De bron-repo bestaat op dit moment niet; dit is wat er redelijkerwijs in moet staan. Controleer dit als eerste zodra de repo er is. |

### De belangrijkste randvoorwaarde vooraf

De meegeleverde zip is de **gebouwde uitvoer**, niet de bron. Alles in §1.6 (de gereconstrueerde
`src/`-boom) is daarom **[aangenomen]**. Alles in §1.1 t/m §1.5 is **[gemeten]** of **[afgeleid]**:
die delen kloppen ook als de bronstructuur anders blijkt te zijn, want ze beschrijven gedrag dat
in de uitvoer zit.

### Eén correctie op `A-baseline.md` vooraf

`A-baseline.md` §3.6 stelt dat het scorewiel "geen tekstalternatief" heeft. Dat klopt niet.
**[gemeten]** Het `<canvas>`-element heeft `role="img"`, een `aria-label` van 270 tekens die de
opbouw van het beeld beschrijft, en een `aria-describedby` naar een zichtbare lijst van twaalf
rijen met naam, betekenis en score — elk een bedienbare knop die de bijbehorende pluim in het
beeld oplicht (regel 18735–18863). Er staat bovendien een uitleg van vier regels boven die lijst
("De sleutel").

Dat verandert de rechtvaardiging voor de SVG-overgang, niet de conclusie. Zie §4.1.

---

# §1 — De architectuur zoals die nu is

## 1.1 Routing: er is geen router

**[gemeten]** De bundel bevat geen router. Navigatie werkt via twee onafhankelijke mechanismen
in één component, `or()` op regel 20604–20741.

**Mechanisme 1 — een fasevariabele.** Eén `useState` met vijf mogelijke waarden bepaalt welk
scherm er staat:

```js
let [e, t] = useState(`landing`);   // 'landing' | 'intake' | 'test' | 'loading' | 'report'
```

De URL verandert hierbij niet. Wie de test halverwege afbreekt en de pagina ververst, komt op de
landingspagina terug (met een "hervatten"-knop, omdat `arcana_current_question` bewaard is).

**Mechanisme 2 — een hashoverlay voor de twee juridische pagina's.** Alleen deze twee:

```js
var ir = { "#/privacy": `privacy`, "#/voorwaarden": `voorwaarden` };
function ar() { return ir[window.location.hash] ?? null; }
```

Een `hashchange`-listener zet de overlaystaat. Zolang die staat niet `null` is, wint hij van de
fasevariabele: privacy en voorwaarden renderen dan in plaats van het scherm van de fase.

**Gevolgen die in het nieuwe ontwerp opgelost moeten worden:**

| Gevolg | Waarom het telt |
|---|---|
| Geen deelbare URL voor het rapport | Iemand kan zijn eigen rapport niet als bladwijzer opslaan. Voor een naslagwerk (C §3.4) is dat een gebrek. |
| Geen terugknop in de browser tussen fases | Browser-terug op vraag 60 verlaat de site in plaats van naar vraag 59 te gaan. |
| Geen deeplink naar een hoofdstuk | C §3.5 vraagt om één deelbaar hoofdstuk. Zonder route-anker is dat alleen met een `#fragment` op te lossen. |
| `window.scrollTo(0,0)` bij elke fasewissel | Correct, maar het betekent ook dat er geen scrollherstel is bij terugkeer. |

**Aanbeveling.** Houd het bij hashroutes; ga geen router-bibliotheek toevoegen. De hele app kent
vijf schermen en twee overlays. Een eigen `useHashRoute()` van ongeveer veertig regels dekt dat,
kost nul kilobyte extra aan afhankelijkheden, en werkt op statische hosting zonder
server-rewrite — wat past bij het hostingmodel (Hostinger, statische bestanden). Breid de
bestaande tabel uit:

```
#/            → landing
#/test        → intake + vragen (vraagnummer in de query: #/test?v=37)
#/rapport     → rapport
#/rapport#h=schaduwkant → rapport, gesprongen naar hoofdstuk
#/privacy     → privacy
#/voorwaarden → voorwaarden
```

## 1.2 State en dataflow

**[gemeten]** Alle state van de hele applicatie zit in zes `useState`-hooks in `or()`. Er is geen
context, geen reducer, geen store, geen externe statebibliotheek.

```js
phase       useState('landing')     // welk scherm
legalRoute  useState(() => ar())    // privacy/voorwaarden overlay
answers     useState({})            // { [questionId]: Answer }  ← 120 items als vol
index       useState(0)             // huidige vraag, 0-based
result      useState(null)          // het volledige rapport-payload
profile     useState({...Ft})       // { name, addressForm, lifePhase }
```

Elke mutatie schrijft synchroon naar localStorage. `S(e)` (antwoord opslaan) doet dat binnen de
state-updater:

```js
function S(e) {
  a((t) => { let n = { ...t, [e.questionId]: e }; Bt(n); return n; });
}
```

**Code-review-bevinding (middel).** Schrijven naar localStorage binnen een `setState`-updater is
een neveneffect in een functie die React onder `StrictMode` bewust twee keer aanroept. Hier is het
onschadelijk omdat de schrijfactie idempotent is, maar het is een patroon dat bij de eerste
uitbreiding stukgaat (bijvoorbeeld een teller die ophoogt). Verplaats het naar een `useEffect` op
`answers`, of naar een expliciete `saveAnswer()`-aanroep naast de setState.

**Code-review-bevinding (laag).** `StrictMode` staat aan in de productiebuild (regel 20742). Dat
is geen fout — het heeft in productie geen effect op React 19 — maar het verdubbelt wel het
aantal effect-aanroepen in ontwikkeling, wat bij de canvas-opbouw merkbaar is.

### Dataflow, van klik tot rapport

```
  gebruiker klikt "Start de test"
        │
        ▼
  ┌──────────────┐   Kt(profile)  ┌─────────────────────┐
  │  intake      │───────────────▶│ arcana_profile      │
  │  (naam, je/u,│   qt(now)      │ arcana_started_at   │
  │   levensfase)│───────────────▶│                     │
  └──────┬───────┘                └─────────────────────┘
         │ phase='test'
         ▼
  ┌──────────────────────────────────────────────┐
  │  vragenflow — 120 vragen, 4 typen            │
  │  likert(72) · forcedChoice(24)               │
  │  scenario(16) · ranking(8)                   │
  └──────┬───────────────────────────────────────┘
         │  per antwoord:  Bt(answers)  →  arcana_answers
         │                 Ht(index)    →  arcana_current_question
         │
         │ index === 119  →  Jt(now) → arcana_completed_at
         ▼
  ┌──────────────┐
  │  loading     │   setTimeout(onDone, 6000)   ← vaste 6 s, geen echte voortgang
  └──────┬───────┘
         │ onDone = te()
         ▼
  ╔═════════════════════════════════════════════════════════════════╗
  ║  DE ENGINE — volledig synchroon, meetbaar < 20 ms                ║
  ║                                                                  ║
  ║  Ce(answers)                   →  ScoreResult                    ║
  ║    ue()  120 antwoorden        →  30 subdimensies (0–100)        ║
  ║    he()  30 subdimensies       →  12 hoofddimensies (0–100)      ║
  ║    ge()  subdimensies          →  18 archetypescores             ║
  ║    _e/ve/be()                  →  primair / secundair / stress   ║
  ║    xe()  subdimensies          →  spanningsvelden (actief j/n)   ║
  ║    Se()  antwoorden            →  responseQuality                ║
  ║    ne()  antwoorden            →  variantSeed (FNV-1a, 32 bit)   ║
  ║                                                                  ║
  ║  Nt(ScoreResult, profile)      →  Report                         ║
  ║    26 sectiebouwers            →  33 secties                     ║
  ║    T(varianten, seed, slot)    →  kiest één zinsvariant          ║
  ║    ze(tekst, addressForm)      →  je/u-omzetting                 ║
  ╚══════════════════════════════════════════════════════════════════╝
         │  Wt(report)  →  arcana_result   ← VOLLEDIG GERENDERDE TEKST
         ▼
  ┌──────────────────────────────────────────────┐
  │  rapport — leest alleen nog report.sections  │
  │  + w/b/S/ee/Ae voor namen en kleuren         │
  └──────────────────────────────────────────────┘
```

**Het belangrijkste architectonische feit van de hele applicatie staat in dat diagram:**
`arcana_result` bevat de **volledig gerenderde tekst**, niet de invoer om die tekst opnieuw te
maken. Het rapportscherm heeft de rapportteksten dus niet nodig. **[gemeten]** In het hele
rapportgebied (regel 17853–19537) wordt geen enkele keer naar `Te`, `Ee`, `je`, `Me` of `Ne`
verwezen; er wordt alleen gelezen uit `b` (archetypen), `S` (stress-archetypen), `w` (twaalf
dimensies), `ee` (spanningsvelddefinities) en één keer uit `Ae` (dimensieduiding).

Dat heeft twee grote gevolgen:

1. **Voor de bundelsplitsing (§3).** De 152.196 bytes rapporttekst hoeven maar één keer geladen
   te worden, op het moment dat vraag 120 beantwoord is. Wie later terugkomt om zijn rapport te
   herlezen, hoeft ze nooit meer te downloaden.
2. **Voor de tekstwijzigingen uit werkstroom C.** Een bestaande gebruiker houdt zijn exacte
   rapport, ook als de teksten in de nieuwe versie veranderen. Alleen wie opnieuw invult krijgt de
   nieuwe teksten. Dat is precies het gewenste gedrag, en het is gratis.

## 1.3 De laagindeling

De bundel is één module­scope zonder zichtbare modulegrenzen, maar de lagen zijn functioneel
scherp te herkennen. **[gemeten]** per regelbereik:

```
┌──────────────────────────────────────────────────────────────────────┐
│ LAAG 4 — PRESENTATIE                     regel 17313–20744           │
│ intake · vragentypen · laadscherm · rapportweergave · scorewiel      │
│ landingspagina · juridische pagina's · app-root                      │
│  81.260 B min-equiv · afhankelijk van laag 1, 2 en 3                 │
├──────────────────────────────────────────────────────────────────────┤
│ LAAG 3 — OPSLAG                          regel 17219–17312           │
│ 6 sleutels · JSON.parse/stringify · try/catch om alles heen          │
│ 1.710 B · afhankelijk van niets                                      │
├──────────────────────────────────────────────────────────────────────┤
│ LAAG 2 — TEKST + SAMENSTELLING           regel 14394–17218           │
│ Te Ee Ae je Me Ne (alle rapporttekst) · 26 sectiebouwers · Nt()      │
│ ze() je/u-omzetting · gn() markdown-export (staat nu in laag 4)      │
│ 179.155 B · afhankelijk van laag 1                                   │
├──────────────────────────────────────────────────────────────────────┤
│ LAAG 1 — REKENEN + DATA                  regel 12574–14393           │
│ 120 vragen · 30 subdimensies · 12 dimensies · 18 archetypen          │
│ 12 spanningsvelden · scoring · FNV-hash · variantkeuze               │
│ 44.344 B · afhankelijk van NIETS — geen DOM, geen React, geen window │
└──────────────────────────────────────────────────────────────────────┘
```

**[gemeten] en bewezen.** Laag 1 en 2 zijn samen te draaien in Node zonder browser. Het script in
§7.2 knipt regel 12574–17218 plus de markdown-export uit de bundel, schrijft er een
`module.exports` achter, en dat draait meteen:

```
$ node -e 'const E=require("./engine-extract.cjs"); console.log(E.vragen.length, E.dims.length, E.VERSION)'
120 12 2.0.0
```

Dat is het bewijs dat de scheidslijn tussen laag 1+2 en laag 4 echt bestaat en dat de
regressietest uit §7 kan draaien zonder browser, zonder jsdom en zonder de rebuild af te wachten.

## 1.4 De localStorage-contracten

**[gemeten]** Zes sleutels, regel 17219–17312. Dit zijn de exacte namen en de exacte
payloadvormen. **Dit is het migratiecontract: breek hier niets.**

```js
var Pt = {
  answers:         `arcana_answers`,
  currentQuestion: `arcana_current_question`,
  result:          `arcana_result`,
  startedAt:       `arcana_started_at`,
  completedAt:     `arcana_completed_at`,
  profile:         `arcana_profile`,
};
```

Alle zes worden opgeslagen als `JSON.stringify(waarde)` — ook de twee tijdstempels en het
vraagnummer, die dus als `"2026-09-22T12:00:00.000Z"` (mét aanhalingstekens) en `37` in de opslag
staan.

### `arcana_answers`

Een object met de vraag-id als sleutel. Vier vormen, onderscheiden door `type`:

```jsonc
{
  "L01": { "questionId": "L01", "type": "likert",       "value": 5 },
  "FC03":{ "questionId": "FC03","type": "forcedChoice", "optionKey": "a" },
  "S07": { "questionId": "S07", "type": "scenario",     "optionKey": "c" },
  "R02": { "questionId": "R02", "type": "ranking",
           "order": ["rust","richting","erkenning","contact","vrijheid","zekerheid"] }
}
```

`value` is 1–7. `optionKey` is `a`/`b` bij forcedChoice, `a`–`d` bij scenario. `order` is een
permutatie van de zes `items[].key` van die vraag.

### `arcana_current_question`

Eén geheel getal, 0-based. Bij het laden begrensd: `Math.min(Vt(), y.length - 1)`.

### `arcana_profile`

```jsonc
{ "name": "Sanne", "addressForm": "je", "lifePhase": "van25tot40" }
```

`addressForm` is `"je"` of `"u"` — bij het lezen wordt alles wat niet exact `"u"` is
teruggebracht tot `"je"`. `lifePhase` is één van `onbekend | tot25 | van25tot40 | van40tot55 |
vanaf55`. Bij het lezen wordt `name` getypecheckt en vallen ontbrekende velden terug op
`{ name: "", addressForm: "je", lifePhase: "onbekend" }`.

### `arcana_result` — de grote

```jsonc
{
  "meta": {
    "generatedAt": "2026-09-22T12:00:00.000Z",
    "version": "2.0.0",
    "responseQuality": {
      "completionRate": 1, "straightLiningRisk": false, "contradictionRisk": false,
      "socialDesirabilityRisk": false, "confidenceLevel": "high", "notes": []
    },
    "profile": { "name": "...", "addressForm": "je", "lifePhase": "..." }
  },
  "archetypes": { "primary": "theHermit", "secondary": "theSeeker", "stress": "theDefender" },
  "scores": {
    "subDimensions":  { "autonomyNeed": { "id":"autonomyNeed","score":67,"confidence":100,"itemCount":9 }, ... 30× },
    "mainDimensions": { "innerMotor":   { "id":"innerMotor","score":67 }, ... 12× },
    "archetypeScores":{ "theSeeker":    { "id":"theSeeker","score":71 }, ... 18× }
  },
  "tensions": [ { "id":"controlVsSurrender","scoreA":72,"scoreB":31,"active":true }, ... 12× ],
  "sections": [ { "id":"who-you-are","title":"...","intro":"...",
                  "paragraphs":["..."],"bullets":["..."] }, ... 33× ]
}
```

**[gemeten]** Gemiddeld 35.090–36.021 bytes aan markdown-export per rapport; het JSON-object zelf
is ongeveer het dubbele. Dat past ruim binnen het localStorage-quotum van 5 MB, ook met marge.

**Twee bevindingen op dit contract:**

1. **Er wordt bij het laden niet op `meta.version` gecontroleerd.** `Ut()` doet
   `JSON.parse` en geeft het object rechtstreeks aan het rapportscherm. Een `arcana_result` van
   een oudere versie waarin `sections` een ander veld had, veroorzaakt een witte pagina. Voeg een
   versiecontrole toe (§6, stap 1).
2. **Een leeg antwoordenobject levert een volledig rapport op.** **[gemeten]**
   `buildReport(computeResult({}))` geeft 33 secties, alle twaalf dimensies op exact 50, archetype
   `theSeeker`, `confidenceLevel: "low"`. Er is geen ondergrens. Een gecorrumpteerde of handmatig
   geleegde `arcana_answers` produceert dus een rapport over niemand. Zet een drempel (§6, stap 1).

## 1.5 De buildconfiguratie, voor zover afleidbaar

**[afgeleid]** uit de vorm van de uitvoer:

| Waarneming in de uitvoer | Wat daaruit volgt |
|---|---|
| `<script type="module" crossorigin src="/assets/index-DqFKZ58Q.js">` | Vite-productiebuild, standaard `assetFileNames`. Geen `@vitejs/plugin-legacy`. |
| Regel 5–33: de `modulepreload`-polyfill met de `MutationObserver` | `build.modulePreload.polyfill` staat aan (Vite-standaard). Dit is **[gemeten]** het enige `fetch()` in de hele bundel van 484 KB, en het haalt uitsluitend `link[rel=modulepreload]`-hrefs op — dus alleen eigen chunks van het eigen domein. |
| Regel 1: `var e = (e,t) => () => (t \|\| (e((t={exports:{}}).exports,t), e=null), t.exports)` | De `__commonJS`-wrapper van Vite/Rollup. React en ReactDOM komen als CommonJS binnen. |
| Eén CSS-bestand, `index-CKXF3rIk.css` | Eén entry, `cssCodeSplit` niet merkbaar (er is maar één chunk). |
| Bestandsnamen `cormorant-garamond-latin-500-normal-BsRWmXhO.woff2` | `@fontsource/cormorant-garamond` en `@fontsource/inter`, geïmporteerd vanuit JS of CSS. **[gemeten]** 14 `@font-face`-regels met `unicode-range`, waarvan er 4 daadwerkelijk laden. |
| `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `og-image.jpg` staan in de root, niet in `/assets` met hash | Deze staan in `public/`. |
| `/assets/valley-zxDIuK9C.webp` | Geïmporteerd vanuit JS (regel 19538: `var In = "/assets/valley-zxDIuK9C.webp"`). **[afgeleid]** Het staat als letterlijk pad in de code, niet als `new URL(..., import.meta.url)` — dus **[aangenomen]** waarschijnlijk óók uit `public/` of via een `?url`-import. |
| **[gemeten]** 0 voorkomens van `import.meta` | Geen `import.meta.env`, dus geen omgevingsvariabelen, geen dev/prod-vertakkingen in de app zelf. |
| De statische `#root`-inhoud in `index.html` | Handgeschreven in `index.html`, geen prerender-plug-in. |

## 1.6 De vermoedelijke bronstructuur — **[aangenomen]**

Dit is een reconstructie zodat werkstroom G meteen kan beginnen. **Controleer dit als eerste
zodra de repo er is** en corrigeer dit document waar het afwijkt.

Er zijn vier plekken waar de bundel een modulegrens verraadt. **[gemeten]** Op regel 12574, 12939,
13147 en 13453 wordt telkens een nieuw paar korte identifiers geïntroduceerd (`d`/`f`, `p`/`m`,
`h`/`g`, `_`/`v`), elk een constructorfunctie plus de bijbehorende vragenarray, gevolgd door
`y = [...f, ...m, ...g, ...v]`. Dat is het handtekeningpatroon van vier aparte bestanden met één
index eroverheen. De rest van de boom is uit functionele samenhang afgeleid.

```
arcana-profile/
├── index.html                      # bevat de statische #root-fallback, OG, JSON-LD, noscript
├── vite.config.ts
├── tsconfig.json                   # [aangenomen] TS: het antwoordmodel is een discriminated union
├── package.json
├── public/
│   ├── favicon.svg  robots.txt  sitemap.xml  site.webmanifest  og-image.jpg
│   └── assets/valley.webp          # [aangenomen] — pad staat letterlijk in de code
└── src/
    ├── main.tsx                    # createRoot(...).render(<StrictMode><App/></StrictMode>)   ← regel 20742
    ├── App.tsx                     # or(): 6 useStates, fasewissel, hashoverlay                ← regel 20604
    ├── index.css                   # de 2.714 regels uit app.pretty.css
    │
    ├── data/                       # ── LAAG 1 · data ──────────────────────────────
    │   ├── questions/
    │   │   ├── likert.ts           # d() + f[]  · 72 vragen L01–L72                            ← 12574
    │   │   ├── forcedChoice.ts     # p() + m[]  · 24 vragen FC01–FC24                          ← 12939
    │   │   ├── scenario.ts         # h() + g[]  · 16 vragen S01–S16                            ← 13147
    │   │   ├── ranking.ts          # _() + v[]  ·  8 vragen R01–R08                            ← 13453
    │   │   └── index.ts            # y = [...likert, ...forcedChoice, ...scenario, ...ranking] ← 13611
    │   ├── archetypes.ts           # b[] 12 primair + S[] 6 stress                             ← 13612
    │   ├── subDimensions.ts        # C[] 30 sleutels                                           ← 13779
    │   ├── dimensions.ts           # w[] 12 × { id, label, meaning, color }                    ← 13931
    │   └── tensions.ts             # ee[] 12 spanningsvelddefinities                           ← 14005
    │
    ├── engine/                     # ── LAAG 1 · rekenen ───────────────────────────
    │   ├── hash.ts                 # te() FNV-1a · ne() antwoordhash · T() variantkeuze        ← 14067
    │   ├── score.ts                # ue() he() ge() · weging, clamp, confidence                ← 14108
    │   ├── archetype.ts            # _e() ve() be() primair/secundair/stress                   ← 14274
    │   ├── tensions.ts             # xe()                                                      ← 14304
    │   ├── quality.ts              # Se() responseQuality                                      ← 14317
    │   └── index.ts                # Ce() = computeResult                                      ← 14369
    │
    ├── report/                     # ── LAAG 2 · tekst + samenstelling ─────────────
    │   ├── texts/
    │   │   ├── solitude.ts         # Te · per archetype "alleen zijn"          46.876 B        ← 14394
    │   │   ├── underPressure.ts    # Ee                                         3.499 B        ← 14720
    │   │   ├── dimensionMeaning.ts # Ae                                         1.133 B        ← 14761
    │   │   ├── essays.ts           # je · de acht beschouwingen                32.691 B        ← 14775
    │   │   ├── variants.ts         # Me · zinsvarianten per slot               12.902 B        ← 15178
    │   │   ├── subDimensionText.ts # Ne · per subdimensie                      55.095 B        ← 15320
    │   │   └── disclaimers.ts      # De, Oe, ke                                               ← 14758
    │   ├── addressForm.ts          # Re() ze() je→u-omzetting                                  ← 16352
    │   ├── sections/               # 26 bouwers nt rt it at ot st ct lt ut dt ft mt gt ...      ← 16386
    │   ├── build.ts                # Nt() → Report ·  Mt() past addressForm toe                ← 17170
    │   └── markdown.ts             # gn() export · _n() datum · vn() bestandsnaam              ← 18024
    │
    ├── storage/
    │   └── index.ts                # Pt sleutels · Lt/Rt · zt/Bt/Vt/Ht/Ut/Wt/Gt/Kt/qt/Jt/Yt    ← 17219
    │
    └── components/                 # ── LAAG 4 · presentatie ───────────────────────
        ├── intake/ProfileForm.tsx           # Qt                                               ← 17320
        ├── test/
        │   ├── Progress.tsx                 # $t                                               ← 17443
        │   ├── LikertQuestion.tsx           # nn                                               ← 17479
        │   ├── ForcedChoiceQuestion.tsx     # rn                                               ← 17541
        │   ├── ScenarioQuestion.tsx         # an                                               ← 17585
        │   ├── RankingQuestion.tsx          # on                                               ← 17635
        │   ├── QuestionCard.tsx             # sn                                               ← 17696
        │   └── TestRunner.tsx               # un                                               ← 17733
        ├── LoadingScreen.tsx                # dn[] + fn                                        ← 17821
        ├── report/
        │   ├── ReportView.tsx               # Fn — het hele rapportscherm                      ← 19267
        │   ├── Toc.tsx                      # pn[] + mn                                        ← 17853
        │   ├── ExportButtons.tsx            # yn (.md) · Sn/Cn (print)                         ← 18094
        │   ├── Quality.tsx                  # bn[] + xn                                        ← 18115
        │   ├── ScoreWheel.tsx               # En — React-wrapper                               ← 18689
        │   ├── scoreWheel.canvas.ts         # Tn — 427 regels canvas-tekening                  ← 18262
        │   ├── SectionCard.tsx              # kn[] + An + jn                                   ← 18997
        │   ├── SectionList.tsx              # Mn                                               ← 19111
        │   └── TensionCard.tsx              # Nn                                               ← 19170
        ├── landing/                         # In..Yn copy-objecten + Xn + Zn + Qn              ← 19538
        ├── SiteHeader.tsx                   # $n                                               ← 20281
        ├── SiteFooter.tsx                   # er                                               ← 20397
        └── legal/{Privacy,Terms}.tsx        # tr/nr/rr                                         ← 20461
```

**Wat je meteen moet verifiëren zodra de repo er is:**

1. Of `data/questions/*` inderdaad vier bestanden zijn (dit is de best onderbouwde aanname).
2. Of de rapportteksten in één bestand of in zes staan. Voor de splitsing in §3 maakt dat niet uit
   — ze gaan hoe dan ook samen in één chunk — maar voor de leesbaarheid wel.
3. Of er al een testmap bestaat. **[gemeten]** In de bundel zit geen enkel spoor van een
   testframework, maar testcode hoort ook niet in een productiebuild, dus dat zegt niets.
4. Of `vite.config.ts` al `manualChunks` kent. De uitvoer (één chunk) zegt van niet.

---

# §2 — Wat blijft en wat vervangen wordt

## 2.1 De scheidslijn in één tabel

| Onderdeel | Regels | Grootte | Oordeel |
|---|---|--:|---|
| Vragenbank (120 vragen, 4 typen) | 12577–13611 | 27.244 B | **Blijft ongewijzigd** |
| Definities (archetypen, subdims, dims, spanningen) | 13612–14066 | 10.699 B | **Blijft**, één veld verhuist (zie 2.3) |
| Rekenengine | 14067–14393 | 6.401 B | **Blijft ongewijzigd — bevroren** |
| Rapportteksten | 14394–16385 | 152.196 B | **Blijft als laag**, inhoud wijzigt onder werkstroom C |
| Sectie-opbouw (26 bouwers) | 16386–17218 | 26.959 B | **Blijft als structuur**, krijgt uitbreidingen uit C §3.2/3.3 |
| localStorage-laag | 17219–17312 | 1.710 B | **Blijft ongewijzigd — bevroren** |
| Markdown-export | 18024–18080 | ~2.100 B | **Blijft**, verhuist naar `report/markdown.ts` |
| Intake- en vragen-UI | 17313–17820 | 10.946 B | **Wordt vervangen** |
| Laadscherm | 17821–17852 | 669 B | **Wordt vervangen** (C §4.9) |
| Rapportweergave | 17853–19537 | 37.930 B | **Wordt vervangen** (C §3) |
| Scorewiel (canvas) | 18262–18870 | 14.461 B | **Wordt vervangen door SVG** (§4) |
| Landingspagina | 19538–20602 | 28.901 B | **Wordt vervangen** (B §4, C §4) |
| App-root en routing | 20603–20744 | 2.814 B | **Wordt vervangen** (§1.1) |
| Volledige CSS | 2.714 regels | 52.359 B | **Wordt vervangen** door tokens + herschreven componenten-CSS |

Opgeteld, gemeten in min-equiv bytes: **227.309 blijft** (46,9 %), **79.160 wordt vervangen**
(16,3 %) en **228.445 is React** (47,2 %), dat als afhankelijkheid blijft staan. De scheidslijn
valt dus zo dat **bijna de helft van de eigen code ongemoeid blijft** en er maar 79 KB werkelijk
herschreven wordt — de rest van het werk zit in CSS, die volledig opnieuw gaat.

## 2.2 Waar de naad precies ligt

De naad ligt op **één functie-aanroep**, en dat is een zeldzaam geluk in een rebuild:

```js
// app-root, regel 20671
function te() {
  let e = Nt(Ce(i), d, new Date().toISOString());   // ← DE NAAD
  (Wt(e), u(e), t(`report`));
}
```

Boven die regel staat de presentatielaag; eronder staat alles wat bevroren blijft. Als de nieuwe
front-end deze aanroep doet met dezelfde argumenten en hetzelfde resultaat krijgt, is de engine
per definitie ongemoeid gebleven — en dat is precies wat de test in §7 controleert.

## 2.3 De interfaces die bevroren moeten worden

Leg deze vijf vast in code, met een type én een test. Elke wijziging hieraan is een bewuste
beslissing met een eigen goedkeuring, geen refactor-bijvangst.

### Bevroren interface 1 — `Answer`

```ts
export type Answer =
  | { questionId: string; type: 'likert';       value: 1|2|3|4|5|6|7 }
  | { questionId: string; type: 'forcedChoice'; optionKey: string }
  | { questionId: string; type: 'scenario';     optionKey: string }
  | { questionId: string; type: 'ranking';      order: string[] };

export type Answers = Record<string, Answer>;
```

Dit is óók het opslagformaat van `arcana_answers`. Verander hier niets, want alle bestaande
gebruikers hebben deze vorm op hun schijf staan.

### Bevroren interface 2 — `computeResult(answers, questions?) => ScoreResult`

Geen DOM, geen `window`, geen `Date`, geen `Math.random`. Pure functie. **[gemeten]** dat dit al
zo is: de extractie in §7.2 draait in Node zonder enige shim.

### Bevroren interface 3 — `buildReport(scoreResult, profile, generatedAt?) => Report`

Let op de derde parameter:

```js
function Nt(e, t, n = new Date(0).toISOString()) { ... }
```

**[gemeten]** De standaardwaarde is **epoch 0**. `buildReport()` is daarmee zonder enige
voorbereiding deterministisch: je hoeft de klok niet te stubben voor de regressietest. Dat is
goed werk in de bestaande code en het moet zo blijven.

### Bevroren interface 4 — de zes localStorage-sleutels

Namen, JSON-vorm en terugvalwaarden exact zoals in §1.4. Uitbreiden mag (§5 voegt
`arcana_theme` toe); hernoemen of van vorm veranderen mag niet zonder migratiepad.

### Bevroren interface 5 — de variantkeuze

```js
function T(varianten, seed, slot) {
  if (typeof varianten === 'string') return varianten;
  if (varianten.length === 0) throw Error(`Lege variantenlijst voor slot "${slot}"`);
  return varianten.length === 1 ? varianten[0] : varianten[te(`${seed}:${slot}`) % varianten.length];
}
```

**Dit is de gevaarlijkste plek in de hele codebase, en dat is nergens gedocumenteerd.** De keuze
is `hash(seed + ':' + slot) % aantalVarianten`. Daaruit volgt:

- Een variant **toevoegen** aan een lijst van drie maakt er vier, en dan verspringt de uitkomst
  voor ongeveer driekwart van alle bestaande antwoordsets. Niet alleen de nieuwe zin verschijnt:
  álle zinnen uit die lijst verschuiven.
- Een slot **hernoemen** verandert de hash-invoer en herrolt dat slot volledig.
- De **volgorde** van de lijst herschikken doet hetzelfde.

Werkstroom C voegt teksten toe (§3.2 deelopeningen, §3.3 afsluiters per hoofdstuktype). Dat is
onvermijdelijk en op zichzelf goed. Zie §8.3 voor hoe je dat doet zonder ongelukken.

## 2.4 Wat expliciet níet bevroren is

Om misverstanden te voorkomen: **de teksten zelf zijn niet bevroren.** Werkstroom C wijzigt ze —
dat is de opdracht. Wat bevroren is, is *het rekenen*: welke score eruit komt, welk archetype
wint, welk spanningsveld actief is, en welke variantindex gekozen wordt. De test in §7 is daarom
in twee helften gesplitst, met een hard en een zacht deel.

---

# §3 — De bundel: 484 KB in één chunk oplossen

## 3.1 De meting

Alle getallen in deze paragraaf zijn gemeten met het script in §9.1. Twee kolommen:

- **min-equiv** — de bundel met inspringing en regeleindes weggehaald. Voor de datablokken
  (vragen, teksten) is dit exact gelijk aan de minifier-uitvoer, want daar valt niets anders weg.
  Voor de codeblokken is het ongeveer 10 % te hoog, omdat een echte minifier ook de spaties rond
  operatoren weghaalt. Optelsom over alles: 534.838 B tegenover de werkelijke 484.329 B.
- **brotli q11** — het blok apart gecomprimeerd. De server levert de hele bundel als 139.500 B;
  mijn eigen brotli q11 over hetzelfde bestand geeft 131.301 B. De server draait dus op een lager
  kwaliteitsniveau. **Alle "over de lijn"-getallen hieronder zijn daarom vermenigvuldigd met
  1,0624** (= 139.500 / 131.301) om vergelijkbaar te zijn met de nulmeting.

| Blok | Regels | min-equiv | brotli q11 |
|---|---|--:|--:|
| React 19 + ReactDOM + jsx-runtime | 1–12573 | 228.445 | 55.126 |
| **Vragenbank — 72 likert** | 12577–12946 | 9.506 | 2.837 |
| **Vragenbank — 24 gedwongen keuze** | 12947–13154 | 6.560 | 1.761 |
| **Vragenbank — 16 scenario** | 13155–13460 | 7.369 | 2.159 |
| **Vragenbank — 8 rangschikking** | 13461–13611 | 3.733 | 1.170 |
| Archetypen (12 primair) | 13612–13746 | 4.306 | 1.473 |
| Stress-archetypen (6) | 13747–13778 | 632 | 269 |
| Subdimensielijst (30) | 13779–13930 | 3.283 | 1.061 |
| Hoofddimensies (12) | 13931–14004 | 1.414 | 595 |
| Spanningsvelden (12) | 14005–14066 | 1.064 | 413 |
| Rekenengine | 14067–14393 | 6.401 | 2.307 |
| **Rapporttekst — alleen zijn, per archetype** | 14394–14719 | 46.876 | 13.314 |
| **Rapporttekst — onder druk** | 14720–14760 | 3.499 | 1.349 |
| **Rapporttekst — dimensieduiding** | 14761–14774 | 1.133 | 514 |
| **Rapporttekst — acht beschouwingen** | 14775–15177 | 32.691 | 9.921 |
| **Rapporttekst — zinsvarianten per slot** | 15178–15319 | 12.902 | 4.405 |
| **Rapporttekst — per subdimensie** | 15320–16385 | 55.095 | 15.008 |
| Sectie-opbouw (26 bouwers) | 16386–17218 | 26.959 | 8.553 |
| localStorage-laag | 17219–17312 | 1.710 | 660 |
| Intake + vragen-UI | 17313–17820 | 10.946 | 2.757 |
| Laadscherm | 17821–17852 | 669 | 355 |
| Rapport-UI zonder wiel | 17853–18261 | 8.893 | 2.807 |
| **Scorewiel — canvas-tekening** | 18262–18688 | 9.811 | 3.169 |
| Scorewiel — React-wrapper + sleutel | 18689–18870 | 4.650 | 1.630 |
| Rapport-UI, rest | 18871–19537 | 14.576 | 3.659 |
| Landingscopy + landings-UI + juridisch | 19538–20602 | 28.901 | 7.694 |
| App-root + hashroute | 20603–20744 | 2.814 | 949 |

### Het antwoord op de vraag uit de opdracht

> *"waarvan de complete vragenbank en alle rapportteksten, die een landingsbezoeker nooit nodig heeft"*

**[gemeten]**

| | min-equiv | brotli q11 | over de lijn (×1,0624) |
|---|--:|--:|--:|
| Vragenbank (120 vragen, samen gemeten) | 27.244 B | 6.518 B | 6.925 B |
| Rapportteksten (Te+Ee+Ae+je+Me+Ne, samen gemeten) | 152.196 B | 40.561 B | 43.092 B |
| **Samen** | **179.440 B** | **47.079 B** | **50.017 B** |

Dat is **37,0 % van de 484.329 bytes** die nu in één keer worden gedownload, en **35,9 % van de
139,5 KB** die over de lijn gaat. Precies zoals de opdracht vermoedde — de vermoeding is nu een
getal.

## 3.2 Het splitsingsplan

De volgende zeven chunks. De samenstelling is gekozen op **het moment waarop de code nodig is**,
niet op onderwerp.

| Chunk | Inhoud | Wanneer geladen | min-equiv | brotli q11 |
|---|---|---|--:|--:|
| `vendor.js` | React 19, ReactDOM, jsx-runtime | direct | 228.445 | 55.126 |
| `app.js` | app-root, hashroute, opslag, header, voettekst, juridische pagina's | direct | 14.868 | 4.586 |
| `landing.js` | landingscopy + landingscomponenten | direct | 18.557 | 5.177 |
| `test.js` | vragenbank (120) + intake + vier vraagtypen + laadscherm | bij klik op "Start de test" | 38.783 | 9.401 |
| `meta.js` | archetypen, 12 dimensies, spanningsvelden, dimensieduiding | samen met `report.js` of `engine.js` | 8.549 | 2.787 |
| `engine.js` | rekenengine + alle rapportteksten + 26 sectiebouwers | **eenmalig**, bij vraag 120 | 187.706 | 50.030 |
| `report.js` | rapportweergave + scorewiel + markdown-export | bij het openen van het rapport | 37.930 | 10.186 |

### Wat een bezoeker werkelijk downloadt

| Scenario | brotli q11 | over de lijn | tegenover nu (139,5 KB) |
|---|--:|--:|--:|
| **Landingspagina bekijken en weggaan** | 64.889 | **68,9 KB** | **−70,6 KB (−50,6 %)** |
| Landing → test starten | 74.290 | 78,9 KB | −60,6 KB (−43,4 %) |
| Landing → test → rapport (volledige eerste bezoek) | 137.293 | 145,9 KB | +6,4 KB (+4,6 %) |
| **Terugkomen om het rapport te herlezen** (`arcana_result` staat er al: vendor + app + meta + report) | 72.685 | 77,2 KB | **−62,3 KB (−44,7 %)** |

De doelstelling uit `A-baseline.md` §1 is **≤ 95 KB voor de landing**. Met 68,9 KB wordt die
ruim gehaald, met 26 KB marge voor de nieuwe landingscomponenten uit werkstroom B (het
voorbeeldwiel kost 6,5 KB, zie §4.4).

De prijs staat er eerlijk bij: **wie het hele traject doorloopt, downloadt 6,4 KB méér** dan nu.
Dat is de compressie-overhead van zeven losse chunks tegenover één. Die 6,4 KB wordt betaald door
de kleine minderheid die de test afmaakt, en bespaard bij de grote meerderheid die dat niet doet.
Dat is de goede ruil, maar het is wel een ruil.

### De Vite-configuratie

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,          // één CSS-bestand; de app is te klein voor CSS per route
    reportCompressedSize: false,  // scheelt bouwtijd; we meten zelf met het script uit §9.1
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
            return 'vendor';
          if (id.includes('/src/report/texts/') || id.includes('/src/report/sections/')
              || id.includes('/src/engine/'))
            return 'engine';
          if (id.includes('/src/data/questions/') || id.includes('/src/components/test/')
              || id.includes('/src/components/intake/'))
            return 'test';
          if (id.includes('/src/data/'))          return 'meta';
          if (id.includes('/src/components/report/')) return 'report';
          if (id.includes('/src/components/landing/')) return 'landing';
        },
      },
    },
    chunkSizeWarningLimit: 240,   // vendor is 228 KB; alles daarboven is een echte waarschuwing
  },
});
```

`manualChunks` alleen is niet genoeg — het bepaalt hóé er gebundeld wordt, niet wannéér er
geladen wordt. Dat laatste gebeurt met `React.lazy` in `App.tsx`:

```tsx
// src/App.tsx — de drie laadpunten
const Landing    = lazy(() => import('./components/landing/Landing'));
const TestFlow   = lazy(() => import('./components/test/TestRunner'));
const ReportView = lazy(() => import('./components/report/ReportView'));

// De engine is geen component; die wordt als module geladen op het moment
// dat hij nodig is, met een expliciete voorlading zodra de laatste vraag in zicht komt.
async function genereerRapport(answers: Answers, profile: Profile) {
  const { computeResult } = await import('./engine');
  const { buildReport }   = await import('./report/build');
  return buildReport(computeResult(answers), profile, new Date().toISOString());
}

// Voorladen bij vraag 110, zodat de 53 KB engine binnen is vóór vraag 120 valt.
useEffect(() => {
  if (index === 109) {
    import('./engine'); import('./report/build');
  }
}, [index]);
```

**Dat voorlaadmoment is waar de tien seconden wachttijd uit `A-baseline.md` §3.5 zijn geld
verdient.** De 53 KB engine wordt gedownload tijdens vraag 110 tot 120 — tien vragen lang, in de
achtergrond, terwijl de bezoeker leest. Op vraag 120 is hij binnen en duurt het rekenen zelf
**[gemeten]** minder dan 20 ms. Het laadscherm mag dan een eerlijke 1,5 seconde duren in plaats
van een gefingeerde zes.

### Winst per stap, apart uitgerekend

| Stap | Wat | Winst op de landing (over de lijn) | Risico |
|---|---|--:|---|
| 1 | `landing.js` los (lazy) | 0 KB — nog steeds alles nodig | geen |
| 2 | `test.js` los, inclusief vragenbank | **−9,99 KB** | laag |
| 3 | `report.js` los, inclusief wiel | **−10,82 KB** | laag |
| 4 | `engine.js` los, inclusief alle rapportteksten | **−53,15 KB** | middel — zie §8.2 |
| 5 | `meta.js` los | **−2,96 KB** | laag |
| **Totaal** | | **−76,9 KB** | |
| | correctie: `landing.js` blijft nodig, dus netto op 139,5 → 68,9 | **−70,6 KB** | |

Stap 4 levert 69 % van de totale winst en is de enige stap met echt risico, omdat hij de
overgang van vraag 120 naar rapport asynchroon maakt. Bouw hem als laatste van de vier en test
hem het hardst.

### Wat je nog nodig hebt in `index.html`

```html
<!-- de drie chunks van de eerste render, zodat ze parallel binnenkomen -->
<link rel="modulepreload" href="/assets/vendor-[hash].js">
<link rel="modulepreload" href="/assets/app-[hash].js">
<link rel="modulepreload" href="/assets/landing-[hash].js">
<!-- het lettertype van het wordmerk, dat de LCP is -->
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/assets/cormorant-500-[hash].woff2">
```

**[gemeten]** De `modulepreload`-polyfill zit al in de bundel (regel 5–33) en werkt in elke
browser die de bouwtarget haalt.

## 3.3 De 94 KB fonts

**[gemeten]** Vier bestanden laden er nu werkelijk, samen exact 94.036 B:

| Bestand | Bytes |
|---|--:|
| `cormorant-garamond-latin-400-normal` | 22.876 |
| `cormorant-garamond-latin-500-normal` | 23.312 |
| `cormorant-garamond-latin-600-normal` | 23.396 |
| `inter-latin-600-normal` | 24.452 |
| **totaal** | **94.036** |

Er staan er veertien gedeclareerd; de `unicode-range` van Fontsource zorgt ervoor dat de
`latin-ext`-varianten en de cursieve niet gedownload worden. Dat deel werkt al goed.

Het probleem is dat de Fontsource-`latin`-subset ongeveer 700 glyphs bevat, terwijl de site er
veel minder gebruikt. **[gemeten]** De volledige zichtbare tekst van de site — alle 6.692
tekenreeksen in de bundel, plus `index.html` — bevat **114 unieke tekens**. De niet-ASCII daarvan
zijn: `© · á è é ë ï ó – — ’ … ← ↑ → ↓ ▲ ▼`.

Drie subsets zijn daadwerkelijk gegenereerd met fontTools en gewogen:

| Variant | Glyphs | Bytes | Winst |
|---|--:|--:|--:|
| Nu (Fontsource `latin`) | ~700 | 94.036 | — |
| **A. Latin Extended-A** (dekt elke Europese naam) | 334 | **63.216** | **−30.820 (−32,8 %)** |
| **B. Alleen wat de site gebruikt** | 114 | **45.480** | **−48.556 (−51,6 %)** |
| A zonder Cormorant 600 | 334 | 47.148 | −46.888 (−49,9 %) |
| B zonder Cormorant 600 | 114 | 34.040 | −60.000 (−63,8 %) |

Variant B alleen is niet veilig: het rapport zet de naam van de bezoeker in Cormorant, en een
naam als *Grzegorz* of *Şule* valt dan terug op de systeemletter. Dat is zichtbaar lelijk op de
plek waar het het meest opvalt.

**Aanbeveling: B als basis, plus een aanvulbestand met `unicode-range`.**

```css
/* het basisbestand — laadt altijd, 114 glyphs */
@font-face {
  font-family: 'Cormorant Garamond';
  font-weight: 500;
  font-display: swap;
  src: url(/assets/cormorant-500-basis.woff2) format('woff2');
  unicode-range: U+20-7E, U+A9, U+B7, U+E1, U+E8-E9, U+EB, U+EF, U+F3,
                 U+2013-2014, U+2019, U+2026, U+2190-2193, U+25B2, U+25BC;
}
/* de aanvulling — laadt alleen als er een teken uit dit bereik op het scherm komt */
@font-face {
  font-family: 'Cormorant Garamond';
  font-weight: 500;
  font-display: swap;
  src: url(/assets/cormorant-500-aanvulling.woff2) format('woff2');
  unicode-range: U+A0-A8, U+AA-B6, U+B8-E0, U+E2-E7, U+EA, U+EC-EE, U+F0-F2,
                 U+F4-FF, U+100-17F, U+20AC, U+2212;
}
```

**[gemeten]** Het aanvulbestand is 7.100 B (Cormorant 400), 7.128 B (Cormorant 500) en 6.524 B
(Inter 600) voor de resterende 221 glyphs. Iemand met een naam die alleen ASCII gebruikt — de
grote meerderheid — downloadt die nooit.

**Resultaat:**

| | Bytes | Tegenover 94.036 |
|---|--:|--:|
| Drie gewichten basis (Cormorant 400 + 500, Inter 600) | 34.040 | −60.000 (−63,8 %) |
| Vier gewichten basis (mét Cormorant 600) | 45.480 | −48.556 (−51,6 %) |
| Aanvulling, alleen bij een bijzondere naam | +20.752 | |

Het doel uit `A-baseline.md` is **≤ 60 KB**. Beide varianten halen dat. Werkstroom B stelt voor om
één gewicht te laten vallen; als dat Cormorant 600 wordt, kom je op **34,0 KB** uit — een
besparing van 60,0 KB, oftewel **63,8 %**.

**Drie dingen die erbij horen en die gratis zijn:**

1. **`size-adjust` op de terugvalletter**, zodat de omschakeling van systeemletter naar Cormorant
   geen layout shift geeft. `font-display: swap` staat al goed.
2. **`<link rel="preload">` op precies één bestand**: Cormorant 500 basis, het wordmerk in de
   hero. Dat is de LCP van de landingspagina.
3. **Niet bouwen op een variabel lettertype zonder te meten.** Een variabele Inter met
   gewichtenas zou beide Inter-gewichten kunnen vervangen; **dat is hier niet gemeten** (de
   bouwomgeving had geen netwerktoegang om het bestand op te halen). Meet het in stap 3 van §6
   voordat je erop rekent.

## 3.4 De CSS

**[gemeten]** Nu: **52.359 B** geminificeerd, **8.606 B** brotli q11 (de site levert 9,2 KB;
dezelfde serverfactor). Dat is het uitgeleverde bestand `index-CKXF3rIk.css`, opnieuw gemeten;
eerdere versies van dit document noemden hier 52.979 B / 8.603 B, wat noch met het bestand noch
met de min-equiv-methode klopte en bovendien `A` §1 en `SITE-INVENTARIS.md` tegensprak — die
zeggen allebei correct 52,4 KB. *(Ter vergelijking: de min-equiv van `app.pretty.css`, de
methode die dit document elders gebruikt, geeft 55.494 B / 8.654 B. De tabel in §2.1 gebruikt
sinds deze correctie eveneens 52.359 B; de drie totalen daar — 227.309 / 79.160 / 228.445 —
zijn JS-bedragen en veranderen hier niet door.)* `design-tokens.css` uit werkstroom B: 9.163 B geminificeerd, 2.176 B brotli.

Het huidige `:root`-blok dat vervangen wordt is ongeveer 1,5 KB. De netto groei door de tokens is
dus ongeveer **+1,8 KB over de lijn**, van 9,2 naar ongeveer 11,0 KB. Het doel uit
`A-baseline.md` is ≤ 14 KB inclusief donkere modus, dus daar zit nog 3 KB in.

**Dat de donkere modus daarbinnen past, is een gevolg van de tokenstructuur, niet van geluk.**
Zolang elke kleurwaarde in de componenten-CSS een `var(--…)` is, hoeft de donkere modus alleen de
tokens om te zetten — niet de componentregels te verdubbelen. Zie §5.2 voor de vier uitzonderingen
waar dat niet opgaat.

---

# §4 — Het scorewiel: van canvas naar SVG

## 4.1 Wat er werkelijk mis is

De canvas-tekening is 427 regels (regel 18262–18688) en het is goed werk. De rechtvaardiging om
hem te vervangen moet daarom precies zijn.

| Klacht uit `A-baseline.md` §3.6 | Oordeel |
|---|---|
| "geen tekstalternatief, dus voor een schermlezer bestaat het beeld niet" | **Onjuist.** `role="img"` + een `aria-label` van 270 tekens + `aria-describedby` naar een zichtbare lijst van twaalf rijen met naam, betekenis en score. |
| "geen selecteerbare tekst; de dimensielabels zijn pixels" | **Juist**, maar de labels staan óók als echte tekst in de lijst eronder. De echte last is dat je de getallen in het beeld niet kunt kopiëren. |
| "bij printen en PDF-export wordt het gerasterd op schermresolutie" | **Juist, en dit is de zwaarste.** Zie hieronder. |
| "het schaalt niet mee met de zoom van de browser" | **Juist.** De `ResizeObserver` reageert op de containerbreedte, maar bij paginazoom blijft de `devicePixelRatio`-cap van 2,5 staan en wordt het beeld zachter. |

**Twee klachten die er niet stonden en die zwaarder wegen dan de vier hierboven:**

1. **De twaalf kleuren zitten hard in de JavaScript.** `w[].color` bevat `#33386b`, `#33527a`,
   `#2f6b78`, … — één vaste hex per dimensie, in een dataobject. Ook de drie inktkleuren zitten
   hard in de tekenfunctie: `c = '#fbf8f3'` als achtergrond, `p(a) = rgba(41,36,32,a)` als inkt,
   `m(a) = rgba(87,79,71,a)` als zachte inkt. **Een donkere modus is met deze opzet onmogelijk
   zonder de tekenfunctie te herschrijven.** Dat maakt de SVG-overgang geen luxe maar een
   voorwaarde voor §5.
2. **Werkstroom B meet de onderlinge afstand van die twaalf kleuren op ΔE2000 = 1,4** onder
   protanopie (B §3.4), tegen 7,1 in licht en 7,4 in donker voor het voorgestelde nieuwe
   systeem (Machado 2009 severiteit 1,0 op lineaire RGB, CIEDE2000, D65). De kleuren moeten sowieso
   vervangen worden; dan kun je de techniek er meteen bij meenemen.

**En het argument dat de doorslag geeft:** dit is het element dat mensen printen en delen. Een
`<canvas>` van 880 × 774 CSS-pixels op `devicePixelRatio` 2 komt op een printer van 600 dpi neer
op ongeveer 150 dpi effectief. Dat is zichtbaar korrelig op papier, en het is precies het
artefact dat een product dat "narekenbaar" belooft, niet moet hebben.

## 4.2 Hoe de tekening werkt, en hoe die naar SVG gaat

**[gemeten]** De geometrie, uit regel 18327–18398:

| Element | Canvas nu | SVG straks |
|---|---|---|
| Pluimvaan ("baardjes") | 11–26 stuks per dimensie, elk twee kwadratische curven, `strokeStyle` met een eigen alfa per baardje | `<path>` met de curven als subpaden aaneengeregen, gegroepeerd in vier alfaklassen |
| Schacht | 46 rechte segmenten met aflopende lijndikte | `<path>` met 46 `L`-segmenten; de aflopende dikte wordt een `<linearGradient>` op `stroke` |
| Gloed | `createRadialGradient` + `globalCompositeOperation='multiply'` | `<ellipse>` met `fill="url(#gloed-N)"` in een `<g style="mix-blend-mode:multiply">` |
| Kern | cirkel + tekst, Cormorant 33 px | `<circle>` + `<text>`; tekst wordt selecteerbaar |
| Labels rondom | `fillText` met handmatige regelafbreking | `<text>` met `<tspan>`; regelafbreking blijft in JS berekend |
| Ring op 50 | `setLineDash([5,6])` | `stroke-dasharray="5 6"` |
| Ringetje op het aandachtspunt | dubbele `arc` | `<circle>` ×2 |
| Animatie 1.500 ms, getrapt per dimensie | `requestAnimationFrame` + `1-(1-t)³` | `stroke-dasharray`/`stroke-dashoffset` per pad, of CSS `@keyframes` met `animation-delay` per dimensie |
| Oplichten bij hover/focus | volledige hertekening met alfa 0,13 op de rest | `opacity` op de `<g>` per dimensie, in CSS |
| `beforeprint` → direct eindstand | listener | `@media print { animation: none }` — komt gratis |
| `document.fonts.ready` → hertekenen | listener | vervalt: SVG-tekst hertekent zichzelf |

De hertekenlus, de `ResizeObserver`, de `devicePixelRatio`-afhandeling en de
`document.fonts.ready`-listener **vervallen volledig**. Dat is ongeveer 120 van de 427 regels die
gewoon weggaan.

## 4.3 Het gemeten kostenplaatje

De geometrie is één-op-één overgezet naar SVG-paden en gewogen (script in §9.2). Drie varianten,
afhankelijk van hoe fijn je de alfa-variatie per baardje aanhoudt:

| Variant | DOM-elementen | SVG ruw | brotli q11 |
|---|--:|--:|--:|
| 1 alfaklasse (alle baardjes gelijk) | 60 | 20.827 B | 6.176 B |
| **4 alfaklassen (aanbevolen)** | **95** | **21.632 B** | **6.492 B** |
| 26 alfaklassen (exact zoals nu) | 184 | 23.776 B | 6.747 B |

**Vier alfaklassen is de keuze.** Het verschil met 26 is met het blote oog niet te zien — de
variatie is `0,8 + 0,2·|sin(n·1,9 + i)|`, oftewel hooguit 20 % — en het scheelt de helft van de
DOM-knopen.

**De kosten in het kort:**

| | Nu (canvas) | Straks (SVG) |
|---|--:|--:|
| Code in de bundel | 9.811 B min-equiv / 3.169 B brotli | **naar verwachting gelijk of iets minder** (de hertekenlus vervalt) |
| DOM-knopen op de rapportpagina | 1 (het canvas) | +95 |
| Totale DOM van het rapport | 936 | **1.030 (+10,0 %)** |
| Print | raster op ~150 dpi effectief | vector, elke resolutie |
| Donkere modus | onmogelijk zonder herschrijven | via `var(--dim-…)` in CSS |
| Tekst selecteerbaar | nee | ja |
| Schaalt met browserzoom | nee | ja |

De bundel wordt hier dus **niet groter van**. De 21.632 bytes SVG worden op het apparaat zelf
gegenereerd uit de twaalf scores; ze gaan nooit over de lijn.

## 4.4 Het voorbeeldwiel op de landingspagina

Werkstroom B zet een echt scorewiel met een voorbeeldscore in sectie 2 van de landingspagina —
het sterkste visuele argument van het hele product, binnen één scherm.

**Doe dat niet met de wielcomponent.** Dan sleep je de generator plus de dimensiedata mee naar de
landingschunk. Genereer in plaats daarvan bij het bouwen één statische SVG met een vaste
voorbeeldscore en plaats die **inline** in de landingscomponent:

| Optie | Kosten op de landing | Donkere modus | Oordeel |
|---|--:|---|---|
| Wielcomponent meeladen | +2,8 KB (`meta.js`) + de generator | werkt | te duur |
| `<img src="wiel.svg">` | ~2 KB extra verzoek | **werkt niet** — een extern SVG-bestand ziet de CSS-variabelen van de pagina niet | valt af |
| `<picture>` met een licht en een donker bestand | ~2 KB | werkt op systeemvoorkeur, **niet op de handmatige schakelaar** | valt af |
| **Inline SVG in de landingscomponent** | **+6.492 B brotli** | werkt volledig | **aanbevolen** |

Met 68,9 KB voor de landing en een doel van 95 KB is die 6,5 KB ruim betaalbaar, en het is meteen
het enige beeld op de pagina dat mee-ademt met het thema.

## 4.5 De toegankelijkheidswinst, concreet

De bestaande sleutel en de twaalfrijenlijst **blijven zoals ze zijn** — ze zijn goed. Wat de SVG
daar bovenop levert:

```svg
<svg viewBox="0 0 880 774" role="img" aria-labelledby="wiel-titel wiel-uitleg"
     class="scorewiel">
  <title id="wiel-titel">Je portret in twaalf pluimen</title>
  <desc id="wiel-uitleg">In het hart staat je hoofdprofiel De Kluizenaar met score 71. …</desc>

  <g class="dim" data-dim="innerMotor" tabindex="0" role="listitem"
     aria-label="Innerlijke motor, score 67 van 100">
    <title>Innerlijke motor — 67</title>
    <path class="gloed" .../>
    <path class="vaan a0" .../>
    …
    <text class="score">67</text>
  </g>
  …
</svg>
```

- Elke `<g>` krijgt een `<title>`, die in elke browser als tooltip verschijnt en door
  schermlezers wordt voorgelezen.
- `tabindex="0"` per groep maakt het beeld toetsenbordbedienbaar — nu kan dat alleen via de lijst
  eronder. De koppeling met `setFocus` blijft: focus in het beeld licht de rij in de lijst op, en
  andersom.
- `<text class="score">` is echte tekst: selecteerbaar, kopieerbaar, en hij schaalt met de
  lettergrootte-instelling van de gebruiker in plaats van met de pixeldichtheid van het scherm.
- **De contrasteis geldt nu ook voor het beeld.** Het contrastscript uit `A-baseline.md` §5 loopt
  over DOM-tekstknopen en zag het canvas niet. Zodra de scores `<text>` zijn, worden ze
  meegemeten — in licht én donker. Dat is strenger dan nu, en dat is de bedoeling.

## 4.6 Printen en PDF

```css
@media print {
  .scorewiel { break-inside: avoid; max-width: 16cm; }
  .scorewiel .dim { animation: none; opacity: 1 !important; }
  .scorewiel .gloed { display: none; }   /* mix-blend-mode multiply op papier: onvoorspelbaar */
  .scorewiel { --wiel-lijn: #241f1a; }   /* altijd het lichte palet op papier */
}
```

Drie aandachtspunten, alle drie testbaar:

1. `mix-blend-mode: multiply` wordt in de printpijplijn van Chrome en Safari verschillend
   afgehandeld. De gloed is decoratief (alfa 0,085); zet hem uit bij het printen.
2. `print-color-adjust: exact` staat al op vier plekken in de huidige CSS (regel 1817–1850). Voeg
   het toe aan de wielselector, anders drukt Chrome de gekleurde pluimen af in grijs.
3. Bij het printen vanuit donkere modus moet het lichte palet terugkomen. Bovenstaande regel doet
   dat; test het expliciet (§7.4).

---

# §5 — Donkere modus

## 5.1 De uitgangspositie

**[gemeten]** Nul `prefers-color-scheme`-regels in 2.714 regels CSS. `design-tokens.css` uit
werkstroom B lost dat aan de tokenkant al volledig op, met precies het juiste patroon:

```css
:root { color-scheme: light dark; --bg: #fbf8f3; … }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { color-scheme: dark; --bg: #16130f; … }
}

:root[data-theme="dark"] { color-scheme: dark; --bg: #16130f; … }
```

Twee ingangen, en de `:not([data-theme="light"])` zorgt ervoor dat een handmatige keuze voor
*licht* wint van een systeem dat op donker staat. Dat is de correcte volgorde en er hoeft niets
aan veranderd te worden.

Wat er nog moet gebeuren, zit in vier plekken buiten de tokens.

## 5.2 De vier plekken waar het niet vanzelf gaat

### (a) Het scorewiel

**[gemeten]** De kleuren zitten hard in JavaScript, op twee niveaus:

```js
// data: w[] — twaalf vaste hexwaarden
{ id: `innerMotor`, label: `Innerlijke motor`, meaning: `…`, color: `#33386b` }

// tekenfunctie Tn: drie vaste inktkleuren
let c = `#fbf8f3`;                                   // achtergrondvulling
function p(a) { return `rgba(41,36,32,${a})`; }      // inkt
function m(a) { return `rgba(87,79,71,${a})`; }      // zachte inkt
```

**De oplossing: haal de kleur uit de data en uit de tekenfunctie, en laat hem uit CSS komen.**

```ts
// src/data/dimensions.ts — na de wijziging
export const DIMENSIES = [
  { id: 'innerMotor', label: 'Innerlijke motor', familie: 'motor',
    meaning: 'Hoe hard je motor draait als niemand je aanzet.',
    token: '--dim-innerlijke-motor' },   // géén hex meer
  …
];
```

```css
/* de SVG leest alles uit de cascade — één regel per dimensie, en klaar */
.scorewiel .dim[data-dim="innerMotor"] { --kleur: var(--dim-innerlijke-motor); }
.scorewiel .vaan  { stroke: var(--kleur); fill: none; }
.scorewiel .gloed { fill: var(--kleur); }
.scorewiel .score { fill: var(--ink); }
.scorewiel .lijn  { stroke: var(--hairline); }
.scorewiel        { background: var(--bg); }
```

Omdat `--dim-innerlijke-motor` in `design-tokens.css` al twee waarden heeft (licht `#496cca`,
donker `#6284d7`, beide gemeten op AA), is de donkere modus van het wiel hiermee **klaar**. Geen
JavaScript die `getComputedStyle` moet lezen, geen thema-observer, geen hertekening bij het
omschakelen. Dit is de belangrijkste reden om van canvas naar SVG te gaan en hij staat niet in
`A-baseline.md`.

### (b) De sepia-gravure

Eén `.webp` van 224.274 B, gemaakt voor perkament. Op `#16130f` klopt hij niet. Twee wegen:

| Optie | Kosten | Oordeel |
|---|--:|---|
| Een tweede bestand, via `<picture>` met `media="(prefers-color-scheme: dark)"` | +~200 KB, en het volgt de handmatige schakelaar niet | af te raden |
| CSS-filter op hetzelfde bestand: `filter: invert(.86) hue-rotate(180deg) saturate(.7) brightness(.9)` | 0 bytes, volgt `[data-theme]` gratis | **aanbevolen — maar wel met het oog controleren** |

Een gravure met fijne lijnen op een lichte ondergrond keert netjes om; een gravure met grote
donkere vlakken niet. **Beoordeel dit met het oog en pas de waarden aan**; het is de enige plek in
dit hele plan waar een getal niet het antwoord geeft.

### (c) De schaduwen

In licht tillen schaduwen een kaart uit het vlak. In donker doen ze niets, want zwart op
bijna-zwart is onzichtbaar. Donkere modus heeft in plaats daarvan een lichter oppervlak nodig.
`design-tokens.css` heeft `--surface #1f1b16` tegen `--bg #16130f` al zo gezet. Vul aan:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --schaduw-1: none;
    --schaduw-2: none;
    --rand-op:   1px solid color-mix(in srgb, var(--ink) 14%, transparent);
  }
}
```

De kaart gebruikt dan `box-shadow: var(--schaduw-1)` én `border: var(--rand-op)`, en welke van de
twee zichtbaar is, hangt af van het thema.

### (d) `theme-color` en de systeembalk

```html
<meta name="theme-color" content="#fbf8f3" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#16130f" media="(prefers-color-scheme: dark)">
```

Bij een handmatige schakelaar moet de actieve `<meta>` in JavaScript meeveranderen, anders houdt
de adresbalk op mobiel de verkeerde kleur.

## 5.3 Geen flits bij het laden

Het probleem: `index.html` heeft een lichte achtergrond en een lichte statische `#root`-inhoud.
Wie op donker staat, ziet een witte flits tot de CSS en React binnen zijn.

**De oplossing, in deze volgorde, vóór alles:**

```html
<head>
  <!-- 1. blokkerend, inline, vóór de stylesheet. 214 bytes. -->
  <script>
    (function () {
      try {
        var t = localStorage.getItem('arcana_theme');
        t = t && JSON.parse(t);
        if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
      } catch (e) {}
    })();
  </script>

  <!-- 2. een minimale kleurregel vóór de stylesheet, zodat ook de statische #root-inhoud klopt -->
  <style>
    :root { color-scheme: light dark; --boot-bg: #fbf8f3; --boot-ink: #292420 }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) { --boot-bg: #16130f; --boot-ink: #ede5d9 }
    }
    :root[data-theme="dark"] { --boot-bg: #16130f; --boot-ink: #ede5d9 }
    html, body { background: var(--boot-bg); color: var(--boot-ink) }
  </style>

  <link rel="stylesheet" href="/assets/index-[hash].css">
</head>
```

Drie punten die het werkend maken:

1. **Het script staat vóór de stylesheet en is niet `defer` of `async`.** Het moet uitgevoerd zijn
   voordat de eerste pixel geverfd wordt. 214 bytes blokkerende JavaScript is hier de juiste ruil;
   elk alternatief flitst.
2. **De `try/catch` is niet cosmetisch.** In een privévenster met geblokkeerde opslag gooit
   `localStorage.getItem` een `SecurityError`. Zonder de `catch` sterft de hele pagina voordat
   React iets kan doen.
3. **`JSON.parse`, niet de kale waarde.** De bestaande opslaglaag schrijft alles als
   `JSON.stringify`, dus de waarde in de opslag is `"dark"` **mét** aanhalingstekens. Lees hem op
   dezelfde manier als alle andere sleutels, anders krijg je twee conventies in één opslag.
4. **De statische `#root`-inhoud in `index.html` moet zijn inline-`style` kwijt.** Nu staat er
   `color:#292420` hard in; dat blijft zwart in donkere modus. Vervang door `var(--boot-ink)`.

## 5.4 De handmatige schakelaar

```ts
// src/theme.ts
export type Thema = 'light' | 'dark' | 'system';
const SLEUTEL = 'arcana_theme';   // zevende sleutel — de eerste nieuwe sinds de oorspronkelijke zes

export function leesThema(): Thema {
  try {
    const v = localStorage.getItem(SLEUTEL);
    const p = v ? JSON.parse(v) : null;
    return p === 'light' || p === 'dark' ? p : 'system';
  } catch { return 'system'; }
}

export function zetThema(t: Thema) {
  const el = document.documentElement;
  if (t === 'system') { delete el.dataset.theme; }
  else                { el.dataset.theme = t; }
  try {
    if (t === 'system') localStorage.removeItem(SLEUTEL);
    else                localStorage.setItem(SLEUTEL, JSON.stringify(t));
  } catch {}
  // houd de adresbalk op mobiel in de pas
  const donker = t === 'dark' ||
    (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', donker ? '#16130f' : '#fbf8f3');
}
```

**Drie standen, niet twee.** "Systeem" moet een echte optie zijn, niet de afwezigheid van een
keuze — anders kan iemand die per ongeluk op licht heeft geklikt nooit meer terug naar automatisch.

**Waar de schakelaar staat.** In de voettekst op de landingspagina, en **bovenaan in het rapport**,
naast de exportknoppen. Het rapport is 21.716 px hoog en wordt 's avonds gelezen; daar is de
schakelaar geen instelling maar een leeshulp.

**Wat er niet verandert:** `Yt()` (alles wissen) verwijdert de zes oorspronkelijke sleutels. Laat
`arcana_theme` daarbuiten — een weergavevoorkeur is geen persoonsgegeven, en het is vervelend als
"antwoorden wissen" ook je leesinstelling weggooit. Documenteer dat in de privacytekst.

## 5.5 Wat de donkere modus moet halen

| Eis | Hoe je het controleert |
|---|---|
| 0 contrastfouten in donker, op alle drie de schermen | Contrastscript uit `A-baseline.md` §5, gedraaid met `data-theme="dark"` |
| Geen flits bij het laden, ook niet bij een koude cache | DevTools, netwerk op "Slow 3G", CPU 4× vertraagd, `prefers-color-scheme: dark` geforceerd |
| Handmatige keuze overleeft een herlaadbeurt | Schakelen, verversen, controleren |
| Handmatige keuze wint van het systeem | Systeem op donker, app op licht → app blijft licht |
| Printen vanuit donker levert een licht vel | `@media print` uit §4.6, in beide thema's testen |
| Het wiel klopt in donker | Visueel, en met het contrastscript op de `<text>`-knopen |

---

# §6 — De gefaseerde bouwvolgorde

Elf stappen. De volgorde loopt van laag naar hoog risico en levert de zichtbare winst zo vroeg
mogelijk. **Elke stap is los te leveren en los terug te draaien.**

Voor elke stap geldt dezelfde terugrolregel: één stap is één samenvoegverzoek, achter één
functievlag waar dat kan, en de acceptatiecriteria worden gehaald vóór het samenvoegen, niet erna.

---

### Stap 0 — Feiten vastleggen · ½ dag · risico: geen

**Wat.** Open de repo. Loop §1.6 na en corrigeer dit document waar de werkelijkheid afwijkt. Draai
de nulmeting uit `A-baseline.md` §5 nog één keer op de live site en leg het resultaat vast in
`docs/nulmeting.json`. Draai PageSpeed Insights één keer en plak het resultaat erbij.

**Acceptatie.** `docs/nulmeting.json` bestaat en bevat de negen metrieken uit `A-baseline.md` §1.
§1.6 van dit document is bijgewerkt.

**Terugrollen.** Niet van toepassing.

---

### Stap 1 — De gouden master · 1 dag · risico: geen

**Wat.** Bouw de regressietest uit §7 **op de bestaande code, vóór er ook maar iets verandert.**
Leg vier fixtures vast, genereer de gouden bestanden, laat de test groen draaien tegen de huidige
bundel. Voeg meteen de twee controles uit §1.4 toe: een versiecontrole op `arcana_result` en een
ondergrens op het aantal antwoorden.

**Bestanden.** `tests/fixtures/*.json`, `tests/golden/*.md`, `tests/golden/*.scores.json`,
`tests/determinisme.test.ts`, `src/storage/index.ts`.

**Acceptatie.** `npm test` is groen. De test faalt aantoonbaar als je één letter in een
rapporttekst verandert (test de test: doe dat en draai opnieuw).

**Terugrollen.** Testbestanden verwijderen. Er is geen productiecode gewijzigd behalve de twee
controles.

**Waarom dit stap 1 is.** Zonder gouden master is elke volgende stap een gok. Dit is de
goedkoopste verzekering in het hele project.

---

### Stap 2 — De domeinbug · ½ dag · risico: geen — **los van de rest uitleveren**

**Wat.** Elf keer `speaktoart.com` → `arcanaprofile.com`: negen in `index.html`, één in
`robots.txt`, één in `sitemap.xml`.

**Acceptatie.** Zoeken op `speaktoart` in de hele repo geeft nul treffers. De Rich Results Test
valideert de drie JSON-LD-blokken. De OG-kaart rendert goed in de Facebook Sharing Debugger en de
LinkedIn Post Inspector.

**Terugrollen.** Terugdraaien van één commit.

**Waarom nu.** Dit is de enige bevinding uit `A-baseline.md` die vandaag geld kost en niet op de
rebuild hoeft te wachten. Lever hem apart uit, deze week.

---

### Stap 3 — Tokens en fonts · 1,5 dag · risico: laag

**Wat.** Vervang het `:root`-blok door `design-tokens.css`. Genereer de subsets uit §3.3 en zet de
`unicode-range`-splitsing op. Preload Cormorant 500. Meet of een variabele Inter goedkoper is dan
twee statische gewichten (§3.3, punt 3).

**Bestanden.** `src/styles/tokens.css`, `src/styles/fonts.css`, `public/assets/*.woff2`,
`index.html`.

**Acceptatie.** Fonts over de lijn ≤ 60 KB (nu 94.036 B). Contrastscript: 0 fouten op alle drie
de schermen. Visueel vrijwel identiek aan nu — deze stap verandert alleen de waarden, nog niet de
vormen.

**Terugrollen.** Het oude `:root`-blok en de oude `@font-face`-regels terugzetten. De rest van de
CSS verwijst naar tokennamen die in beide versies bestaan.

**Waarschuwing.** Na deze stap ziet de site er *bijna* hetzelfde uit maar niet helemaal:
`--ink-faint` gaat van `#8b8177` (3,60:1, ongeschikt voor tekst) naar `#655b50` (6,26:1). Dat is
zichtbaar donkerder grijs. Dat is de bedoeling — meld het vooraf, anders wordt het als een fout
gemeld.

---

### Stap 4 — Het splitsen van de bundel · 2 dagen · risico: laag tot middel

**Wat.** `manualChunks` + `React.lazy` uit §3.2, in vier deelstappen in deze volgorde: eerst
`report.js`, dan `test.js`, dan `meta.js`, dan als laatste `engine.js`. Voeg het voorlaadpunt bij
vraag 110 toe.

**Bestanden.** `vite.config.ts`, `src/App.tsx`, `index.html`.

**Acceptatie.**
- Landing over de lijn ≤ 75 KB (verwacht: 68,9 KB; nu 139,5 KB).
- De regressietest uit stap 1 is nog groen — **dit is het belangrijkste criterium van de hele
  stap**, want asynchroon laden mag geen letter aan de uitvoer veranderen.
- Op een verbinding van 400 kbit/s duurt de overgang van vraag 120 naar rapport minder dan 2 s.
- De test uit §7.5 bewijst dat er nul verzoeken naar een ander domein gaan.

**Terugrollen.** `manualChunks` uitcommentariëren en de `lazy()`-aanroepen terugzetten naar directe
imports. De applicatiecode is verder ongewijzigd, dus dit is een omkeerbare
configuratiewijziging.

---

### Stap 5 — Het scorewiel naar SVG · 3 dagen · risico: middel

**Wat.** §4, inclusief de verhuizing van de twaalf kleuren van `w[].color` naar CSS-tokens.
Bouw het naast het canvas, achter een functievlag, zodat je ze naast elkaar kunt leggen.

**Bestanden.** `src/components/report/ScoreWheel.tsx`,
`src/components/report/scoreWheel.geometry.ts` (de rekenkant, gedeeld met de statische generator),
`src/data/dimensions.ts`, `src/styles/wheel.css`, `scripts/genereer-voorbeeldwiel.ts`.

**Acceptatie.**
- Het SVG-wiel en het canvas-wiel naast elkaar op dezelfde score: geen zichtbaar verschil in vorm.
- 95 DOM-elementen of minder bij maximale uitslag (alle twaalf op 0 of 100).
- Print levert vector: open de PDF, zoom naar 800 %, de pluimen blijven scherp.
- Contrastscript, dat nu ook de `<text>`-knopen van het wiel meeneemt: 0 fouten in licht en donker.
- Toetsenbord: tab door de twaalf groepen, elke groep licht op en kondigt naam en score aan.
- `prefers-reduced-motion: reduce` → geen animatie, direct de eindstand.

**Terugrollen.** Functievlag terugzetten. Het canvas-bestand blijft tot stap 11 in de repo staan.

**De verborgen complexiteit.** De `mix-blend-mode: multiply` op de gloedlaag en de
`stroke-dasharray`-animatie over 95 paden zijn de twee plekken waar browsers gaan verschillen.
Test Safari expliciet en vroeg; Safari's afhandeling van `mix-blend-mode` binnen een `<svg>` wijkt
af van Chrome.

---

### Stap 6 — De donkere modus · 2 dagen · risico: laag

**Wat.** §5 volledig: bootscript, schakelaar, de vier uitzonderingen, `theme-color`.

**Bestanden.** `index.html`, `src/theme.ts`, `src/components/ThemeToggle.tsx`,
`src/styles/tokens.css`, `src/styles/print.css`.

**Acceptatie.** De zes eisen uit §5.5, alle zes afgevinkt.

**Terugrollen.** Het bootscript en de `[data-theme]`-blokken uit de CSS halen. De `@media
(prefers-color-scheme)`-blokken kunnen blijven staan; die zijn op zichzelf onschadelijk.

**Waarom hier.** Na stap 5 is het wiel token-gestuurd, en het wiel was de enige echte blokkade.
Vóór stap 5 zou deze stap een tweede canvas-tekening vergen die daarna weer weg moet.

---

### Stap 7 — De landingspagina · 4 dagen · risico: laag, hoge zichtbaarheid

**Wat.** B §4 (de elf secties met hun vlakken, breedtes en ritme) plus C §4.1–4.6 (de
herschrijvingen). Het inline voorbeeldwiel uit §4.4.

**Bestanden.** `src/components/landing/*`, `src/styles/landing.css`.

**Acceptatie.**
- Paginahoogte ≤ 6.000 px (nu 7.083 px).
- Contrastscript: 0 fouten, in licht en donker.
- Skip-link aanwezig en werkend — dat ontbreekt nu.
- Koppenhiërarchie nog steeds zonder sprongen.
- Landing over de lijn ≤ 80 KB inclusief het inline wiel.
- De vier disclaimers uit sectie 9 staan er nog, op dezelfde plek in de leesvolgorde.
- De `noscript`- en statische `#root`-inhoud zijn inhoudelijk ongewijzigd.

**Terugrollen.** De oude landingscomponenten staan in één map; de router wijst één import aan.

**Waarom hier en niet eerder.** Dit is de stap met de meeste zichtbare winst, en je wilt hem dus
vroeg. Maar hij bouwt op de tokens (stap 3), het wiel (stap 5) en de donkere modus (stap 6). Dit
is de vroegst mogelijke plek.

---

### Stap 8 — De vragenflow · 2 dagen · risico: laag

**Wat.** C §4.7–4.9: het naamveld verplaatsen (B-aanbeveling, overgenomen uit richting c), de
voortgangsindicatie, het eerlijke laadscherm. Plus het meeverhuizende focuskader uit
`A-baseline.md` §3.9 repareren.

**Bestanden.** `src/components/intake/*`, `src/components/test/*`.

**Acceptatie.**
- Na een antwoord staat de focus op de nieuwe vraag, niet op de oude positie. Test met
  toetsenbord én met VoiceOver.
- Het laadscherm duurt zo lang als het rekenen werkelijk duurt, met een ondergrens van 1,2 s zodat
  het niet flikkert, en een bovengrens met een voortgangsindicatie.
- De regressietest uit stap 1 is nog groen.
- De rangschikkingsvragen blijven met ↑/↓ bedienbaar (toegankelijk); slepen mag erbij, niet in de
  plaats.

**Terugrollen.** Per component.

---

### Stap 9 — De rapportweergave · 5 dagen · risico: middel tot hoog

**Wat.** C §3 volledig: de zelfstandige samenvatting bovenaan (§3.1), de zes deelopeningen en de
kaartnavigatie (§3.2), de afsluiters per hoofdstuktype (§3.3), de terugkeerondersteuning (§3.4) en
het deelbare hoofdstuk (§3.5). Plus de knoppenherschikking uit C §4.10.

**Bestanden.** `src/components/report/*`, `src/report/sections/*`, `src/report/texts/*`.

**Dit is de enige stap die de bevroren laag raakt.** De afsluiters uit C §3.3 en de
deelopeningen uit C §3.2 zijn **gegenereerde tekst** met slots — die horen in laag 2, niet in de
presentatie. Volg daarvoor de procedure in §8.3.

**Acceptatie.**
- De **harde** helft van de regressietest (scores, archetypen, spanningsvelden, variantindices) is
  **onveranderd**. Geen enkele uitzondering.
- De **zachte** helft (markdown) is opnieuw goedgekeurd, met een `git diff` van de gouden
  bestanden die regel voor regel is nagelopen door wie de teksten schreef.
- De je/u-omzetting is op alle nieuwe teksten getest (§7.3). Dit is de plek waar het het vaakst
  misgaat.
- Paginahoogte van het rapport is gelijk of lager, mét werkende sprongen vanuit de inhoudsopgave.
- Contrastscript: 0 fouten, licht en donker.

**Terugrollen.** Zwaar. Dit is de enige stap waarvan het terugrollen ook een gegevensmigratie
raakt: als de sectiestructuur verandert, kan een `arcana_result` uit de oude versie niet meer
renderen. **Daarom de versiecontrole uit stap 1.** Verhoog `REPORT_VERSION` naar `3.0.0` en toon
bij een oudere versie een scherm met: "Dit rapport komt uit een vorige versie. Je kunt het
downloaden als tekstbestand, of de test opnieuw doen." Nooit stilzwijgend een leeg scherm.

---

### Stap 10 — De vier disclaimers en de SEO-controle · 1 dag · risico: geen

**Wat.** Alle punten uit de afvinklijst van `A-baseline.md` §7 nalopen. De JSON-LD bijwerken naar
de nieuwe copy. `sitemap.xml` aanvullen met de hashroutes, als je die indexeerbaar wilt.

**Acceptatie.** De negen vinkjes uit `A-baseline.md` §7, alle negen gehaald en gedocumenteerd in
`docs/eindcontrole.md`.

---

### Stap 11 — Opruimen · 1 dag · risico: laag

**Wat.** Canvas-bestand weg, functievlaggen weg, ongebruikte tokens weg, dode CSS weg
(meet met een dekkingsrapport uit DevTools), `console.log` weg.

**Acceptatie.** Alle metrieken uit `A-baseline.md` §1 opnieuw gemeten en vastgelegd naast de
nulmeting uit stap 0.

---

## 6.1 Inspanning in totaal

| Stap | Dagen | Cumulatief |
|---|--:|--:|
| 0 · Feiten vastleggen | 0,5 | 0,5 |
| 1 · De gouden master | 1,0 | 1,5 |
| 2 · De domeinbug | 0,5 | 2,0 |
| 3 · Tokens en fonts | 1,5 | 3,5 |
| 4 · Bundel splitsen | 2,0 | 5,5 |
| 5 · Scorewiel naar SVG | 3,0 | 8,5 |
| 6 · Donkere modus | 2,0 | 10,5 |
| 7 · Landingspagina | 4,0 | 14,5 |
| 8 · Vragenflow | 2,0 | 16,5 |
| 9 · Rapportweergave | 5,0 | 21,5 |
| 10 · Disclaimers en SEO | 1,0 | 22,5 |
| 11 · Opruimen | 1,0 | 23,5 |
| **Totaal** | **23,5 dagen** | |

Plus ongeveer **20 % voor de tests die in elke stap zitten** en **15 % voor de terugkoppeling uit
de gebruikerstest van `A-baseline.md` §6** — samen ongeveer **31 dagen voor één ontwikkelaar**.
Werkstroom B raamde de designrichting zelf op 5 tot 8 dagen plus 2 tot 3 voor donkere modus en
wiel; dat is in bovenstaande stappen 3, 5, 6 en 7 verwerkt (10,5 dagen) en daar past het in.

**Wat je het eerst uitlevert, los van de rest:** stap 2 (de domeinbug), deze week.
**Wat je als eerste zichtbare verandering uitlevert:** stap 3 + 5 + 6 + 7 samen — dat is de
"nieuwe site" voor de buitenwereld, na ongeveer twee en een halve week.

---

# §7 — Teststrategie

## 7.1 De piramide voor dit product

Dit is geen gewone front-end. De inhoud van het product is het resultaat van een berekening, en
die berekening is het enige dat werkelijk niet stuk mag. De piramide staat daarom scheef, en dat
is juist:

```
              ┌───────────────────────────────────────┐
              │  E2E · 6 tests · Playwright            │  traag, hoge zekerheid
              │  volledige doorloop · print · offline  │
              ├───────────────────────────────────────┤
              │  Visuele regressie · 12 opnamen        │
              │  landing/vragen/rapport × licht/donker │
              │  × telefoon/desktop                    │
              ├───────────────────────────────────────┤
              │  Toegankelijkheid · 6 tests            │
              │  contrastscript + axe + toetsenbord    │
              ├───────────────────────────────────────┤
              │  Component · ~25 tests                 │
              │  vier vraagtypen · wiel · export       │
              ├═══════════════════════════════════════┤
              ║  DETERMINISME · 8 fixtures × 2 helften ║  ← de zwaarste steen
              ║  snel, draait bij elke commit          ║     draait in < 2 s
              └───────────────────────────────────────┘
```

## 7.2 De belangrijkste test: determinisme

**Deze test is geschreven en gedraaid tegen de huidige bundel.** Onderstaande code werkt; de
gouden hashes verderop zijn er de uitvoer van.

### Stap A — de engine uit de bundel halen (alleen nodig tot de repo er is)

```js
// tools/engine-uit-bundel.cjs
// Knipt laag 1 + 2 uit de gebouwde bundel zodat je een gouden master kunt maken
// vóórdat de bron-repo beschikbaar is. Werp dit bestand weg zodra de repo er is.
const fs = require('fs');
const L = fs.readFileSync('app.beautified.js', 'utf8').split('\n');
const knip = (a, b) => L.slice(a - 1, b).join('\n');

fs.writeFileSync('tests/engine-extract.cjs', [
  knip(12574, 17218),   // vragenbank + definities + engine + rapportteksten + sectie-opbouw
  knip(18024, 18080),   // gn() markdown-export + _n() datumopmaak
  'module.exports = { vragen: y, computeResult: Ce, buildReport: Nt, toMarkdown: gn,' +
  ' archetypes: b, dims: w, VERSION: Ve };',
].join('\n'));
```

**[gemeten]** Dit levert 255.224 bytes die meteen draaien in Node, zonder DOM, zonder React,
zonder shim:

```
$ node -e 'const E=require("./tests/engine-extract.cjs");
           console.log(E.vragen.length, E.dims.length, E.VERSION)'
120 12 2.0.0
```

Zodra de repo er is, vervang je `require('./engine-extract.cjs')` door
`import { computeResult, buildReport, toMarkdown } from '../src'` en verandert er verder niets aan
de test.

### Stap B — reproduceerbare fixtures

```ts
// tests/fixtures.ts
import { vragen } from '../src/data/questions';
import type { Answers, Profile } from '../src/types';

/** mulberry32 — een vaste PRNG, zodat een fixture 12 bytes is in plaats van 12 KB. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function antwoordenUitSeed(seed: number): Answers {
  const r = rng(seed); const a: Answers = {};
  for (const q of vragen) {
    if (q.type === 'likert')
      a[q.id] = { questionId: q.id, type: 'likert', value: (1 + Math.floor(r() * 7)) as any };
    else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const k = q.options.map(o => o.key);
      a[q.id] = { questionId: q.id, type: q.type, optionKey: k[Math.floor(r() * k.length)] };
    } else {
      const k = q.items.map(i => i.key).slice();
      for (let i = k.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [k[i], k[j]] = [k[j], k[i]]; }
      a[q.id] = { questionId: q.id, type: 'ranking', order: k };
    }
  }
  return a;
}

/** Alle likert op één waarde, alle keuzes op dezelfde optie. Voor de uitersten. */
export function antwoordenVast(value: 1|2|3|4|5|6|7, optieIndex = 0): Answers {
  const a: Answers = {};
  for (const q of vragen) {
    if (q.type === 'likert') a[q.id] = { questionId: q.id, type: 'likert', value };
    else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const k = q.options.map(o => o.key);
      a[q.id] = { questionId: q.id, type: q.type, optionKey: k[Math.min(optieIndex, k.length - 1)] };
    } else a[q.id] = { questionId: q.id, type: 'ranking', order: q.items.map(i => i.key) };
  }
  return a;
}

export const FIXTURES: { naam: string; antwoorden: () => Answers; profiel: Profile }[] = [
  { naam: 'A-evenwichtig',  antwoorden: () => antwoordenUitSeed(1),
    profiel: { name: 'Test', addressForm: 'je', lifePhase: 'van25tot40' } },
  { naam: 'B-uitgesproken', antwoorden: () => antwoordenUitSeed(7),
    profiel: { name: 'Test', addressForm: 'je', lifePhase: 'vanaf55' } },
  { naam: 'C-u-vorm',       antwoorden: () => antwoordenUitSeed(7),
    profiel: { name: 'Test', addressForm: 'u',  lifePhase: 'vanaf55' } },
  { naam: 'D-zonder-naam',  antwoorden: () => antwoordenUitSeed(42),
    profiel: { name: '',     addressForm: 'je', lifePhase: 'onbekend' } },
  { naam: 'E-alles-laagst', antwoorden: () => antwoordenVast(1),
    profiel: { name: 'X',    addressForm: 'je', lifePhase: 'onbekend' } },
  { naam: 'F-alles-midden', antwoorden: () => antwoordenVast(4),
    profiel: { name: 'X',    addressForm: 'je', lifePhase: 'onbekend' } },
  { naam: 'G-alles-hoogst', antwoorden: () => antwoordenVast(7),
    profiel: { name: 'X',    addressForm: 'je', lifePhase: 'onbekend' } },
  { naam: 'H-alles-hoogst-optieB', antwoorden: () => antwoordenVast(7, 1),
    profiel: { name: 'X',    addressForm: 'je', lifePhase: 'onbekend' } },
];
```

**[gemeten]** Waarom die vier uitersten er bij moeten: vier willekeurige fixtures gaven alle vier
hetzelfde primaire archetype (`theHermit`). De vaste fixtures geven `theSeeker`, `theFlame`,
`theFlame` en `theFlame`, met vier verschillende stress-archetypen. **Willekeurige antwoorden
clusteren; zonder de uitersten test je maar één pad door de archetypeselectie.**

### Stap C — de test zelf, in twee helften

```ts
// tests/determinisme.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { computeResult, buildReport, toMarkdown } from '../src';
import { FIXTURES } from './fixtures';

const sha = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

describe('determinisme — de harde helft: de getallen', () => {
  // Deze helft mag NOOIT wijzigen. Een rode test hier is per definitie een regressie,
  // ook als de wijziging bedoeld was. Hij wordt niet opnieuw goedgekeurd zonder
  // een expliciet besluit van de opdrachtgever.
  for (const f of FIXTURES) {
    it(`${f.naam}: scores, archetypen, spanningsvelden en variantkeuzes`, () => {
      const r = buildReport(computeResult(f.antwoorden()), f.profiel);  // generatedAt = epoch 0
      const vingerafdruk = {
        sub:      Object.fromEntries(Object.values(r.scores.subDimensions)
                    .map((d: any) => [d.id, [d.score, d.confidence, d.itemCount]])),
        dim:      Object.fromEntries(Object.values(r.scores.mainDimensions)
                    .map((d: any) => [d.id, d.score])),
        arch:     Object.fromEntries(Object.values(r.scores.archetypeScores)
                    .map((a: any) => [a.id, a.score])),
        gekozen:  r.archetypes,
        spanning: r.tensions.map((t: any) => [t.id, t.scoreA, t.scoreB, t.active]),
        kwaliteit: r.meta.responseQuality,
        // de variantkeuze wordt indirect vastgelegd: de eerste 40 tekens van elke
        // alinea van elke sectie. Verandert er één variant, dan valt dit om.
        vormen:   r.sections.map((s: any) =>
                    [s.id, s.paragraphs.length, s.bullets.length,
                     ...s.paragraphs.map((p: string) => p.slice(0, 40))]),
      };
      expect(vingerafdruk).toEqual(
        JSON.parse(readFileSync(`tests/golden/${f.naam}.scores.json`, 'utf8')));
    });
  }
});

describe('determinisme — de zachte helft: de markdown-export', () => {
  // Deze helft MAG wijzigen, maar alleen met een `git diff` die iemand heeft gelezen.
  // Vernieuwen met: GOLDEN=update npm test
  for (const f of FIXTURES) {
    it(`${f.naam}: markdown byte voor byte`, () => {
      const md = toMarkdown(buildReport(computeResult(f.antwoorden()), f.profiel));
      const pad = `tests/golden/${f.naam}.md`;
      if (process.env.GOLDEN === 'update') {
        require('node:fs').writeFileSync(pad, md, 'utf8'); return;
      }
      const verwacht = readFileSync(pad, 'utf8');
      // Eerst de hash, voor een korte foutmelding; dan de tekst, voor een leesbare diff.
      expect(sha(md)).toBe(sha(verwacht));
      expect(md).toBe(verwacht);
    });
  }
});

describe('determinisme — de eigenschappen die altijd gelden', () => {
  it('dezelfde antwoorden geven twee keer exact dezelfde bytes', () => {
    for (const f of FIXTURES) {
      const a = toMarkdown(buildReport(computeResult(f.antwoorden()), f.profiel));
      const b = toMarkdown(buildReport(computeResult(f.antwoorden()), f.profiel));
      expect(a).toBe(b);
    }
  });

  it('de volgorde van de antwoorden doet er niet toe', () => {
    const a = FIXTURES[0].antwoorden();
    const omgekeerd = Object.fromEntries(Object.entries(a).reverse());
    expect(toMarkdown(buildReport(computeResult(omgekeerd), FIXTURES[0].profiel)))
      .toBe(toMarkdown(buildReport(computeResult(a), FIXTURES[0].profiel)));
  });

  it('buildReport raakt de klok niet aan', () => {
    const echt = Date.now; (Date as any).now = () => { throw new Error('klok gebruikt'); };
    try { expect(() => buildReport(computeResult(FIXTURES[0].antwoorden()),
                                   FIXTURES[0].profiel)).not.toThrow(); }
    finally { (Date as any).now = echt; }
  });

  it('elke score ligt tussen 0 en 100 en is een geheel getal', () => {
    for (const f of FIXTURES) {
      const r = computeResult(f.antwoorden());
      for (const d of Object.values(r.mainDimensions) as any[]) {
        expect(Number.isInteger(d.score)).toBe(true);
        expect(d.score).toBeGreaterThanOrEqual(0);
        expect(d.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it('er is altijd precies één rapport van 33 secties', () => {
    for (const f of FIXTURES) {
      const r = buildReport(computeResult(f.antwoorden()), f.profiel);
      expect(r.sections).toHaveLength(33);
      for (const s of r.sections) { expect(s.title.trim()).not.toBe(''); }
    }
  });
});
```

### De gouden waarden, nu al gemeten

**[gemeten]** Gedraaid tegen de huidige bundel. Dit zijn de waarden waartegen elke wijziging
straks afgezet wordt:

| Fixture | Archetypen (primair / secundair / stress) | Secties | Markdown bytes | SHA-256 van de markdown |
|---|---|--:|--:|---|
| A-evenwichtig | theHermit / theSeeker / theDefender | 33 | 35.928 | `8c071eb5fc98a7b0361244c0b8abbf53f7887ff7094c017e1d46eff404976c01` |
| B-uitgesproken | theHermit / theSeeker / theSprinter | 33 | 36.021 | `d0d0fc7491e2e6ffe1293f4d64456f88b732ab5ea45f20effcc2b7d6c16178bd` |
| C-u-vorm | theHermit / theSeeker / theSprinter | 33 | 35.751 | `08f02de30f43074f27f1a4efc8c80d1db21e834f1bd7ea188d40a184eaf76fbc` |
| D-zonder-naam | theHermit / theSeeker / theDefender | 33 | 35.090 | `b8a20cc12697a99495c1373a2659d4f64be7d524728f20373b9a0ab7fd7c9acd` |

Fixture B en C hebben dezelfde antwoorden en verschillen alleen in `addressForm`. Het
byteverschil van 270 bytes is de volledige je/u-omzetting. **Dat is meteen de test op de
omzetting: als B en C ooit gelijk worden, is `ze()` stukgegaan.**

### Wat deze test wel en niet vangt

| Wel | Niet |
|---|---|
| Elke wijziging in een score, gewicht of drempel | Of de tekst *klopt* — alleen of hij hetzelfde is |
| Elke wijziging in archetypeselectie | Of de je/u-omzetting *goed Nederlands* oplevert |
| Elke verschuiving van de variantkeuze (§2.3) | Of de tekst goed *rendert* — daar zijn de componenttests voor |
| Verandering in de volgorde van de secties | Prestaties |
| Een gebroken je/u-omzetting | Of de opslaglaag werkt — zie §7.6 |

## 7.3 De je/u-omzetting apart testen

**[gemeten]** `Re()` (regel 16359–16377) is een keten van zeven reguliere expressies over álle
gerenderde tekst. Onder andere:

```js
t = t.replace(/\b(je)\b(\s+)([\wÀ-ÿ'-]+)/gi, (e, t, n, r) => `${Le(t, Ie(r))}${n}${r}`);
```

`Ie(woord)` beslist tussen `u` en `uw` op basis van twee woordenlijsten. **Elke nieuwe zin die
werkstroom C toevoegt, kan hier een fout in de u-vorm opleveren die niemand ziet, want niemand
vult de test in u-vorm in.** Daarom een eigen testbestand:

```ts
// tests/aanspreekvorm.test.ts
import { describe, it, expect } from 'vitest';
import { naarUVorm } from '../src/report/addressForm';
import * as teksten from '../src/report/texts';

describe('je → u', () => {
  const gevallen: [string, string][] = [
    ['Je merkt dat je energie wegzakt.',        'U merkt dat uw energie wegzakt.'],
    ['Jij bent degene die jouw grens bewaakt.', 'U bent degene die uw grens bewaakt.'],
    ['Wees eerlijk tegen jezelf.',              'Wees eerlijk tegen uzelf.'],
    ['Dat kost jou meer dan je denkt.',         'Dat kost u meer dan u denkt.'],
    ['Je bent niet je patroon.',                'U bent niet uw patroon.'],
  ];
  for (const [in_, uit] of gevallen)
    it(JSON.stringify(in_), () => expect(naarUVorm(in_)).toBe(uit));

  it('laat geen enkele "je", "jij", "jou" of "jouw" achter in ENIGE brontekst', () => {
    const fouten: string[] = [];
    for (const zin of alleZinnen(teksten)) {
      const u = naarUVorm(zin);
      if (/\b(je|jij|jou|jouw|jezelf)\b/i.test(u)) fouten.push(zin);
    }
    expect(fouten).toEqual([]);
  });

  it('maakt geen "u uw" of "uw u"', () => {
    for (const zin of alleZinnen(teksten))
      expect(naarUVorm(zin)).not.toMatch(/\bu\s+uw\s+(?!eigen)/i);
  });
});
```

De laatste twee tests lopen over **alle** brontekst, niet over een steekproef. Dat is haalbaar:
het zijn 152.196 bytes en de omzetting is een reeks regex-vervangingen.

## 7.4 Toegankelijkheid

| Test | Gereedschap | Wanneer | Slaagt als |
|---|---|---|---|
| Contrast, alle tekstknopen | het script uit `A-baseline.md` §5 | elke PR, 3 schermen × 2 thema's | **0 fouten** (nu: 0 op 693 knopen) |
| WCAG-regels breed | `@axe-core/playwright` | elke PR | 0 `critical` en 0 `serious` |
| Toetsenbord volledig | Playwright, alleen `keyboard.press` | elke PR | landing → intake → 5 vragen → rapport, zonder muis |
| Focus zichtbaar en op de juiste plek | Playwright + opname | elke PR | na een antwoord staat de focus op de nieuwe vraag |
| Skip-link | Playwright | elke PR | eerste Tab geeft een zichtbare skip-link die werkt |
| Koppenhiërarchie | eigen DOM-controle | elke PR | h1 → h2 → h3 zonder sprongen, precies één h1 |
| `prefers-reduced-motion` | CSSOM-telling + Playwright | elke PR | ≥ 5 regels; wiel toont direct de eindstand |
| Schermlezer, met de hand | VoiceOver + NVDA | per fase, één keer | het wiel en de twaalfrijenlijst zijn te volgen |

**Eén aanscherping tegenover nu.** Het contrastscript draait nu over DOM-tekstknopen. Zodra het
wiel SVG is, worden de twaalf scores en de kerntekst **meegemeten**. Dat betekent dat de
lichtgrijze scoretekst in het wiel — die als canvaspixels nooit gecontroleerd werd — nu de
4,5:1-eis moet halen. Verwacht daar werk; het is winst.

## 7.5 Bewijzen dat er niets het apparaat verlaat

De privacybelofte is de kern van het product. Die hoort dus als test in de pijplijn te staan, niet
als bewering op een pagina.

```ts
// tests/e2e/geen-netwerk.spec.ts
import { test, expect } from '@playwright/test';

test('er gaat geen enkel verzoek naar een ander domein', async ({ page, baseURL }) => {
  const vreemd: string[] = [];
  const eigen = new URL(baseURL!).origin;

  page.on('request', r => { if (!r.url().startsWith(eigen) && !r.url().startsWith('data:')) vreemd.push(r.url()); });
  page.on('websocket', ws => vreemd.push('ws: ' + ws.url()));

  await page.goto('/');
  await page.getByRole('button', { name: /start de test/i }).click();
  await vulHeleTestIn(page);                       // hulpfunctie, 120 antwoorden
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();   // het rapport staat er

  expect(vreemd, `verzoeken naar buiten:\n${vreemd.join('\n')}`).toEqual([]);
});

test('de hele doorloop werkt zonder netwerk na de eerste render', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await context.setOffline(true);                  // trek de stekker eruit
  await page.getByRole('button', { name: /start de test/i }).click();
  await vulHeleTestIn(page);
  await expect(page.getByText(/hoofdprofiel/i)).toBeVisible();
});

test('er wordt niets anders opgeslagen dan de zeven bekende sleutels', async ({ page }) => {
  await page.goto('/');
  await vulHeleTestIn(page);
  const sleutels = await page.evaluate(() => Object.keys(localStorage).sort());
  expect(sleutels).toEqual([
    'arcana_answers', 'arcana_completed_at', 'arcana_current_question',
    'arcana_profile', 'arcana_result', 'arcana_started_at', 'arcana_theme',
  ]);
  expect(await page.evaluate(() => document.cookie)).toBe('');
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  expect(await page.evaluate(() => indexedDB.databases?.().then(d => d.length) ?? 0))
    .resolves.toBe(0);
});
```

**De tweede test is de sterkste.** Hij bewijst niet alleen dat er niets wéggaat, maar ook dat de
belofte *"er is geen server waar ze naartoe gaan"* letterlijk waar is: de hele test werkt met de
stekker eruit. **Let op:** deze test is de reden dat de asynchrone chunks uit §3.2 vóór het
offline gaan geladen moeten zijn. Met `lazy()` en een chunk die pas bij vraag 120 laadt, faalt
deze test als de bezoeker onderweg zijn verbinding verliest.

**Dat is geen testprobleem maar een echt probleem** — zie §8.2 voor de oplossing (voorladen bij
vraag 110, met een expliciete terugval).

## 7.6 Componenttests en visuele regressie

**Componenttests** (Vitest + Testing Library), ongeveer 25:

- De vier vraagtypen: kiezen slaat het juiste antwoordobject op, de vorm klopt per type, de
  rangschikking blijft een permutatie, ↑/↓ verplaatst precies één plaats.
- De opslaglaag: lezen van een kapotte JSON geeft `null` en gooit niet; schrijven bij een vol
  quotum gooit niet; `Yt()` verwijdert zes sleutels en laat `arcana_theme` staan.
- De markdown-export: bestandsnaam bij een naam met diakrieten, bij een lege naam, bij een naam
  van 200 tekens.
- Het wiel: 12 groepen, elke groep een `<title>`, de scoretekst komt overeen met de score.
- De thema-schakelaar: drie standen, schrijven naar de opslag, `data-theme` op `<html>`.

**Visuele regressie** (Playwright `toHaveScreenshot`), 12 opnamen:

| | landing | vragen | rapport |
|---|---|---|---|
| licht · 390 px | ✓ | ✓ | ✓ |
| licht · 1440 px | ✓ | ✓ | ✓ |
| donker · 390 px | ✓ | ✓ | ✓ |
| donker · 1440 px | ✓ | ✓ | ✓ |

Alle opnamen op een **vaste fixture** (fixture A) met `generatedAt` op epoch 0, zodat het beeld
reproduceerbaar is. Zet `animations: 'disabled'` en `prefers-reduced-motion: reduce`, anders is
het wiel elke keer anders. Drempel: `maxDiffPixelRatio: 0.002` — laag genoeg om een
kleurverschuiving te vangen, hoog genoeg om niet op letterrendering te struikelen.

## 7.7 E2E, zes tests

1. Volledige doorloop: landing → intake → 120 vragen → rapport, met de muis.
2. Dezelfde doorloop, alleen met het toetsenbord.
3. Hervatten: 40 vragen, verversen, "hervatten", verder bij vraag 41.
4. Terugkeer: rapport bestaat, pagina verversen, rapport staat er nog, **en de engine-chunk wordt
   niet opnieuw gedownload** (controleer met `page.on('request')`).
5. Printen: `page.pdf()`, controleer dat het wiel vector is (zoek in de PDF-stream naar
   pad-operatoren in plaats van een `/Image`-object).
6. Wissen: "Antwoorden wissen" → bevestigen → alle zes sleutels weg, `arcana_theme` nog aanwezig,
   landingspagina terug.

## 7.8 Wat er in de pijplijn staat

```yaml
# .github/workflows/ci.yml — de kern
- run: npm run lint && npm run typecheck
- run: npm test                       # determinisme + componenten — < 20 s
- run: npm run build
- run: node scripts/meet-bundel.mjs   # faalt als de landing boven de begroting komt
- run: npx playwright test            # e2e + a11y + visueel
```

```js
// scripts/meet-bundel.mjs — de begroting als test
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { brotliCompressSync, constants } from 'node:zlib';

const BEGROTING = {           // bytes over de lijn, brotli
  'landing-totaal': 75_000,   // vendor + app + landing · gemeten uitgangspunt: 68.938
  'fonts-totaal':   60_000,   // nu 94.036
  'css-totaal':     14_000,   // nu 9.140 gemeten, 9.200 geleverd
};
// … per bestand brotli'en, optellen, vergelijken, en bij overschrijding met code 1 stoppen
```

**Een begroting die niet automatisch faalt, is geen begroting.** Dit script is de reden dat de
139,5 KB niet stilletjes terugkomt.

---

# §8 — Risico's

Eerlijk, in volgorde van hoeveel het kost als het misgaat.

## 8.1 De variantkeuze verschuift ongemerkt — **grootste risico**

**Wat er gebeurt.** `T()` kiest `varianten[hash(seed + ':' + slot) % varianten.length]`. Werkstroom
C voegt teksten toe. Elke toevoeging aan een bestaande lijst verandert `length`, en daarmee de
uitkomst van de modulo voor **ongeveer alle bestaande antwoordsets** — niet alleen voor de nieuwe
zin, maar voor elke zin uit die lijst.

**Waarom het ongemerkt gebeurt.** Het rapport blijft er goed uitzien. De zinnen zijn allemaal
correct geschreven, ze komen allemaal uit dezelfde lijst, en er komt geen foutmelding. Alleen de
gouden master merkt het.

**Wat het kost.** Wie de test twee keer invult met dezelfde antwoorden en twee verschillende
rapporten krijgt, verliest het vertrouwen in het hele product — en dat vertrouwen is het product.
De belofte *"dezelfde antwoorden geven hetzelfde rapport"* staat letterlijk op de pagina.

**De verzachting, en ze is niet gratis.** Bestaande gebruikers merken hier niets van, want hun
rapport staat volledig gerenderd in `arcana_result` (§1.2). Het raakt alleen wie opnieuw invult.
Dat is precies de groep die het verschil kan zien.

**Wat je doet:**

1. **Accepteer één bewuste herrol, bij de lancering.** Zet `REPORT_VERSION` op `3.0.0` en zeg in
   de FAQ: "In september 2026 is de tekst van het rapport herschreven. Wie de test daarna opnieuw
   invult, kan andere formuleringen zien bij dezelfde antwoorden. De scores zijn niet veranderd."
   Dat is eerlijk en het is één keer.
2. **Bevries daarna de slotnamen en het aantal varianten per slot.** Een test die telt:
   ```ts
   it('geen enkele variantenlijst is van lengte veranderd', () => {
     expect(Object.fromEntries(Object.entries(VARIANTEN)
       .map(([k, v]) => [k, Array.isArray(v) ? v.length : 1])))
       .toEqual(JSON.parse(readFileSync('tests/golden/variant-lengtes.json', 'utf8')));
   });
   ```
   Deze test is één regel, draait in milliseconden en vangt het enige dat je hier kunt missen.
3. **Wil je later tóch een variant toevoegen zonder herrol:** voeg hem toe aan een nieuwe lijst
   met een nieuwe slotnaam, in plaats van aan de bestaande. Kost tekstduplicatie, levert een
   stabiele uitvoer.

## 8.2 De engine-chunk komt te laat of komt niet aan

**Wat er gebeurt.** Na stap 4 uit §6 zit de 53 KB rapportengine in een chunk die pas bij vraag 120
nodig is. Wie op dat moment geen verbinding heeft — in de trein, met een haperende wifi, achter
een bedrijfsproxy die een `Cache-Control`-fout maakt — krijgt een `import()` die faalt. **De
bezoeker heeft dan 25 minuten gewerkt en krijgt niets.**

**Wat het kost.** Dit is het duurste dat in dit hele plan kan misgaan, want het slaat toe op het
exacte moment van maximale investering.

**Wat je doet — alle drie, niet één:**

1. **Voorladen bij vraag 110** (§3.2). Tien vragen lang heeft de browser de tijd om 53 KB binnen
   te halen. Dat is genoeg op elke verbinding die de test überhaupt heeft kunnen laden.
2. **Een expliciete terugval bij een mislukte import**, met opnieuw proberen:
   ```ts
   async function laadEngine(pogingen = 3): Promise<Engine> {
     for (let i = 0; i < pogingen; i++) {
       try { return await import('./engine'); }
       catch { await new Promise(r => setTimeout(r, 400 * 2 ** i)); }
     }
     throw new EngineNietBeschikbaar();
   }
   ```
3. **Een scherm dat de antwoorden veiligstelt.** Bij `EngineNietBeschikbaar`: "Je antwoorden zijn
   bewaard op dit apparaat. Je rapport kan nu niet gemaakt worden omdat de verbinding wegviel.
   Probeer het opnieuw, of kom later terug — je hoeft niets over te doen." Plus een knop
   "Antwoorden downloaden" die `arcana_answers` als JSON aanbiedt. **[gemeten]** De antwoorden
   staan op dat moment al volledig in localStorage; er gaat niets verloren. Zeg dat dan ook.

**Alternatief dat je moet overwegen.** Als je die drie maatregelen niet wilt bouwen: laad de
engine-chunk mee bij de intake in plaats van bij vraag 110. Dan is de intake-fase 53 KB duurder en
de landing niet. De landingswinst — het punt van de hele exercitie — blijft dan intact, en dit
risico verdwijnt volledig. **Dat is de veiligere variant en hij kost niets aan het hoofddoel.**
Kies hem als het schema krap wordt.

## 8.3 Werkstroom C raakt de bevroren laag — en dat is geen fout

**Wat er gebeurt.** C §3.2 (deelopeningen) en C §3.3 (afsluiters per hoofdstuktype, met slots
`{label1}` `{score1}`) zijn **gegenereerde tekst**. Ze horen in laag 2, bij de sectiebouwers, niet
in de React-component. C §4.11 punt 55 stelt bovendien voor om alle achttien archetypenamen naar
het Nederlands te vertalen — dat verandert `b[].name`, dat verandert de markdown-export, en dat
verandert elke gouden hash.

**Het misverstand dat je moet voorkomen.** "De engine blijft bevroren" wordt makkelijk gelezen als
"de teksten mogen niet veranderen". Dat is niet wat het betekent en het zou werkstroom C
onmogelijk maken.

**Wat er werkelijk bevroren is:** de getallen. De harde helft van §7.2 — subdimensies,
hoofddimensies, archetypescores, welk archetype wint, welk spanningsveld actief is, welke
variant-*index* gekozen wordt. Die helft wordt nooit opnieuw goedgekeurd.

**Wat er mag wijzigen:** de tekstinhoud zelf, onder deze procedure:

1. Wijzig alleen tekst, in één commit, zonder enige codewijziging erbij.
2. `npm test` → de harde helft moet **groen** blijven. Blijft hij niet groen, dan heb je per
   ongeluk de berekening geraakt: terug.
3. De zachte helft faalt — dat hoort. `GOLDEN=update npm test`.
4. **`git diff tests/golden/` wordt regel voor regel gelezen door wie de tekst schreef.** Niet door
   wie de code schreef. Dit is de hele controle; sla hem niet over.
5. Commit de nieuwe gouden bestanden in dezelfde commit als de tekst.

## 8.4 Het SVG-wiel is visueel niet gelijkwaardig

**Wat er gebeurt.** De canvas-tekening gebruikt `globalCompositeOperation = 'multiply'` voor de
gloedlaag, een alfa per baardje, en een lijndikte die over 46 segmenten afloopt. In SVG is dat
`mix-blend-mode`, vier alfaklassen en een gradiënt op `stroke`. **Het wordt niet pixel-identiek.**

**Wat het kost.** Het wiel is het mooiste dat het product heeft. Een versie die er 90 % zo goed
uitziet is een verlies dat niemand in een test zal melden en iedereen zal voelen.

**Wat je doet:**

- Bouw het naast het canvas, achter een functievlag, en leg ze naast elkaar op hetzelfde scherm
  met dezelfde score (§6 stap 5). Niet in twee tabbladen — naast elkaar.
- **Laat iemand met een oog ernaar kijken, niet alleen een diff-drempel.** Dit is de ene plek in
  dit plan waar een pixelvergelijking het verkeerde gereedschap is: de nieuwe versie hóórt te
  verschillen (andere kleuren, uit werkstroom B), dus een diff zegt niets.
- Test Safari vroeg. `mix-blend-mode` binnen een `<svg>` gedraagt zich daar anders dan in Chrome.
  Als het niet werkt: de gloed is alfa 0,085 en decoratief — laat hem in Safari vallen in plaats
  van het hele plan om te gooien.

## 8.5 `confidenceLevel` zegt "stevig" tegen wie alles hetzelfde invulde

**[gemeten]** In `Se()` (regel 14317–14367) wordt straight-lining correct gedetecteerd:

```js
Math.max(...e.values()) / a.length > 0.7 && (o = !0, r.push(`Veel Likert-antwoorden hebben dezelfde waarde…`));
```

Maar `confidenceLevel` wordt daarna uitsluitend bepaald door de **invulgraad**:

```js
let u = `low`;
i >= 0.95 ? (u = `high`) : i >= 0.7 && (u = `medium`);
```

**[gemeten]** Gevolg: wie alle 72 likertvragen op 7 zet, krijgt `straightLiningRisk: true`,
`confidenceLevel: "high"`, en daarmee de zin *"Je antwoordde consistent. Dit rapport staat
stevig."*

Dat is precies de overclaim die `C-tekst-en-rapport.md` §6.5 aanwijst, maar de oorzaak zit een
laag dieper dan C aanneemt: het is niet alleen de formulering, het is de berekening.

**Wat je doet.** Dit is een **gedragswijziging in de bevroren laag** en dus geen refactor:

```ts
let niveau: 'low' | 'medium' | 'high' = 'low';
if (invulgraad >= 0.95) niveau = 'high';
else if (invulgraad >= 0.70) niveau = 'medium';
// nieuw: een risicosignaal verlaagt het niveau met één trede
if (straightLiningRisk || socialDesirabilityRisk) {
  niveau = niveau === 'high' ? 'medium' : 'low';
}
```

Leg dit als aparte beslissing aan de opdrachtgever voor, met de gouden-master-diff erbij. Het is
een verbetering, maar het is er één die de harde helft van de test rood maakt — en dat mag alleen
met een handtekening.

## 8.6 Een leeg of gecorrumpeerd antwoordenobject levert een volwaardig rapport

**[gemeten]** `buildReport(computeResult({}))` geeft 33 secties, alle twaalf dimensies op exact
50, archetype `theSeeker`, `confidenceLevel: "low"`. Geen fout, geen waarschuwing, een compleet
rapport over niemand.

**Hoe dat gebeurt in het echt.** Een browser die localStorage gedeeltelijk leegt. Een gebruiker
die twee tabbladen open heeft. Een uitbreiding die opslag opschoont. Een mislukte migratie.

**Wat je doet.** Een ondergrens in `buildReport`, niet in de UI — dan geldt hij overal:

```ts
const MINIMUM_ANTWOORDEN = 60;   // de helft
if (Object.keys(answers).length < MINIMUM_ANTWOORDEN) {
  throw new OnvoldoendeAntwoorden(Object.keys(answers).length);
}
```

Plus een scherm dat het uitlegt en de test laat hervatten. Voeg de drempel toe in stap 1 van §6,
vóór alle andere wijzigingen, zodat hij vanaf het begin in de gouden master zit.

## 8.7 Wat ik de opdrachtgever zou afraden

**Rond alles wat de engine raakt vóór stap 1.** Niet één regel. De gouden master is één dag werk
en hij is het verschil tussen "we hebben het gecontroleerd" en "het zag er goed uit".

**Doe de rebuild niet in één keer.** Elf stappen die elk apart uit te leveren zijn, geeft elf
momenten waarop je kunt stoppen met iets dat werkt. Eén grote samenvoeging geeft er nul. De site
staat live en heeft bezoekers.

**Vervang React niet door Preact in deze ronde.** Het is verleidelijk: **[gemeten]** de
React-chunk is 55.126 B brotli, 85 % van de hele landingsbundel, en de app gebruikt alleen
`useState`, `useEffect` en `useRef`. Preact/compat zou daar volgens de opgaven van dat project
ongeveer 10 KB van maken. **Dat getal is hier niet gemeten** — de bouwomgeving had geen
netwerktoegang om het te controleren — en dat is precies de reden om het niet nu te doen. Het is
een aparte beslissing, met een eigen meting, ná stap 11, als alles werkt. Zet het niet op het
kritieke pad van een rebuild die al elf stappen telt.

**Voeg geen analytics toe tijdens de rebuild.** `A-baseline.md` §4 beveelt drie tellers aan en dat
is een verdedigbaar voorstel, maar het maakt de test uit §7.5 rood. Doe het erna, als aparte
uitlevering, met een eigen besluit en een eigen aanpassing van die test — niet als bijvangst.

**Houd het laadscherm niet op zes seconden omdat het "spanning opbouwt".** **[gemeten]**
`setTimeout(onDone, 6000)` op regel 17842, terwijl het rekenen minder dan 20 ms duurt. Als het
theater blijft, maak het dan een keuze: één knop "Toon mijn rapport" die meteen werkt, naast de
opbouw die vanzelf doorloopt. Wachttijd die de gebruiker niet kan overslaan, na 25 minuten werk,
is een gok met het enige moment waarop hij zeker weet dat hij klaar is.

**Vertaal de archetypenamen niet halverwege.** C §4.11 punt 55 is een goed voorstel — achttien
Engelse termen op een verder volledig Nederlandse site is werkelijk vreemd. Maar het is een
merkbeslissing die elke gouden hash raakt en die je maar één keer kunt nemen. Neem hem vóór stap 9
of na stap 11, nooit ertussenin.

---

# §9 — Bijlage: de meetscripts

Elke getalsmatige uitspraak in dit document komt uit een van deze drie scripts. Ze draaien op
`/home/claude/work/app.beautified.js` en op de bestanden uit `/home/claude/site/assets/`.

## 9.1 Bytes per gebied van de bundel

```js
// meet-bundel.mjs
import { readFileSync } from 'node:fs';
import { brotliCompressSync, constants } from 'node:zlib';

const L = readFileSync('app.beautified.js', 'utf8').split('\n');
const strip = t => t.split('\n').map(l => l.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '')).join('');
const br = b => brotliCompressSync(Buffer.from(b),
  { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

const GEBIEDEN = [
  ['react-dom + react + jsx-runtime',          1, 12573],
  ['vragenbank (120 vragen)',              12577, 13611],
  ['definities (archetypen, dims, spanningen)', 13612, 14066],
  ['rekenengine',                          14067, 14393],
  ['rapportteksten',                       14394, 16385],
  ['sectie-opbouw',                        16386, 17218],
  ['localStorage-laag',                    17219, 17312],
  ['intake + vragen-UI',                   17313, 17852],
  ['rapport-UI + scorewiel',               17853, 19537],
  ['landing + juridisch',                  19538, 20602],
  ['app-root',                             20603, 20744],
];
for (const [naam, a, b] of GEBIEDEN) {
  const s = strip(L.slice(a - 1, b).join('\n'));
  console.log(naam.padEnd(44), String(Buffer.byteLength(s)).padStart(7),
              String(br(s)).padStart(7));
}
```

**Kalibratie, zodat je de getallen kunt vertrouwen:** de optelsom van `strip()` over het hele
bestand geeft 534.914 B tegenover de werkelijke 484.329 B (+10,4 %). Dat verschil zit volledig in
de codegebieden (spaties rond operatoren die een echte minifier óók weghaalt); de datagebieden
zijn exact. De optelsom van brotli q11 over alle gebieden is 137.293 B tegenover 131.301 B voor
het bestand in één stuk — dat verschil van 5.992 B is de werkelijke prijs van het splitsen. De
server levert 139.500 B, dus alle "over de lijn"-getallen in §3 zijn met 1,0624 vermenigvuldigd.

## 9.2 De SVG-kosten van het scorewiel

Het script dat §4.3 heeft opgeleverd zet de canvas-geometrie uit regel 18327–18398 één-op-één om
naar SVG-paden en weegt het resultaat, bij één, vier en 26 alfaklassen. Het produceert de drie
regels uit de tabel in §4.3. De volledige code staat in
`tools/wiel-svg-kosten.cjs` en is overgezet uit de functies `ne()`, `T()`, `re()`, `ae()` en
`ie()` van de bundel.

## 9.3 De fontsubsets

```python
# meet-fonts.py — vereist fonttools ≥ 4.60
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options
import os

GEBRUIKT = set(range(0x20, 0x7F)) | {
    0x00A9, 0x00B7, 0x00E1, 0x00E8, 0x00E9, 0x00EB, 0x00EF, 0x00F3,
    0x2013, 0x2014, 0x2019, 0x2026, 0x2190, 0x2191, 0x2192, 0x2193, 0x25B2, 0x25BC }
LATIN_A = set(range(0x20, 0x7F)) | set(range(0xA0, 0x100)) | set(range(0x100, 0x180)) | {
    0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x00B7, 0x00A9,
    0x2190, 0x2191, 0x2192, 0x2193, 0x25B2, 0x25BC, 0x20AC, 0x2212 }

def subset(pad, codepoints, uit):
    f = TTFont(pad)
    o = Options(); o.layout_features = ['kern', 'liga', 'calt']; o.notdef_outline = True
    s = Subsetter(options=o); s.populate(unicodes=codepoints); s.subset(f)
    f.flavor = 'woff2'; f.save(uit)
    return os.path.getsize(uit)
```

**Uitkomst, ter herhaling:** de vier ladende bestanden gaan van 94.036 B naar 63.216 B
(Latin Extended-A, 334 glyphs) of 45.480 B (alleen wat de site gebruikt, 114 glyphs). Het
aanvulbestand met de resterende 221 glyphs is 7.100 / 7.128 / 6.524 B per gewicht.

---

## Wat je als eerste opent zodra de repo er is

1. **`vite.config.ts`** — staat er al een `manualChunks`? (De uitvoer zegt van niet.)
2. **`src/data/questions/`** — zijn het vier bestanden? Dit is de best onderbouwde aanname uit
   §1.6 en de rest van de boom hangt eraan.
3. **`package.json`** — is er een testopdracht, en welke React-versie precies?
4. **`src/report/`** — waar staan de 26 sectiebouwers, en is `T()` (de variantkeuze) al ergens
   gedocumenteerd? Zo niet: dat is de eerste regel commentaar die je schrijft, met §2.3 erbij.
5. **Daarna stap 1 uit §6**, dezelfde dag: de gouden master, vóór er iets verandert.

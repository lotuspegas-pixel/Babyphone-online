# Arcana Mirror

Een premium persoonlijkheidsanalyse-engine: 120 vragen, 30 subdimensies, 12
hoofddimensies, 12 archetypes en een uitgebreid, score-gebaseerd Nederlands
rapport (kernpatroon, sterke kanten, schaduwkant, stressprofiel,
relatiepatroon, werkstijl, communicatiestijl, spanningsvelden, blinde vlekken,
groeipad en een 30-dagen actieplan).

Volledige productspecificatie: [`../docs/arcana/`](../docs/arcana/).
Projectstatus: [`../docs/arcana/PROJECT_STATUS.md`](../docs/arcana/PROJECT_STATUS.md).

## Belangrijkste eigenschappen

- **Deterministic**: dezelfde antwoorden geven altijd hetzelfde rapport (geen `Math.random`, geen externe AI-API).
- **Score-herleidbaar**: elke zin in het rapport komt voort uit een concrete subdimensie-score, niet uit generieke Barnum-teksten.
- **Geen diagnose**: expliciete disclaimer en privacytekst op start- en rapportpagina.
- **Lokaal-first**: antwoorden en resultaat worden standaard alleen in `localStorage` van de browser bewaard (geen backend, geen accounts).
- **Print/PDF-vriendelijk**: het rapport heeft een aparte `@media print`-laag.

## Waar dingen staan

| Onderdeel | Bestand |
|---|---|
| Vragen (120) | [`src/data/arcanaQuestions.ts`](src/data/arcanaQuestions.ts) |
| Dimensies & spanningsvelden | [`src/data/arcanaDimensions.ts`](src/data/arcanaDimensions.ts) |
| Archetypes | [`src/data/arcanaArchetypes.ts`](src/data/arcanaArchetypes.ts) |
| Trait-teksten (kracht/schaduw/groeisleutel) | [`src/data/arcanaTraitContent.ts`](src/data/arcanaTraitContent.ts) |
| Scoring engine | [`src/lib/arcanaScoringEngine.ts`](src/lib/arcanaScoringEngine.ts) |
| Rapportgenerator | [`src/lib/arcanaReportGenerator.ts`](src/lib/arcanaReportGenerator.ts) |
| localStorage-laag | [`src/lib/arcanaStorage.ts`](src/lib/arcanaStorage.ts) |
| UI-flow (start/test/loading/rapport) | [`src/App.tsx`](src/App.tsx), [`src/components/`](src/components/) |
| Premium styling + print-CSS | [`src/styles/arcana.css`](src/styles/arcana.css) |
| Tests | [`src/test/arcana.test.ts`](src/test/arcana.test.ts) |

## Lokaal starten

```bash
cd arcana
npm install
npm run dev
```

Open daarna de URL die Vite toont (standaard `http://localhost:5173`).

## Checks

```bash
npm run lint        # oxlint
npm run typecheck    # tsc -b --noEmit
npm run test         # vitest — scoring + rapport, alle dummy-modi, determinisme
npm run build         # tsc -b && vite build
```

Er is ook een repo-brede sanity-check die geen npm-install nodig heeft:

```bash
node ../scripts/arcana-quick-check.js
```

## Bouwen voor productie

```bash
npm run build
```

Dit produceert een statische `dist/` map (HTML/CSS/JS) — geen server nodig.

## Deployen

### Vercel / Netlify

- **Root directory**: `serverless/arcana`
- **Build command**: `npm run build`
- **Output directory**: `dist`

Beide platforms detecteren Vite automatisch zodra de root directory naar
`serverless/arcana` wijst.

### Hostinger (of elke statische host)

1. `npm run build` lokaal draaien.
2. De inhoud van `dist/` uploaden naar de gewenste map op de hosting (bijv. `/arcana/`).
3. Zorg dat de server onbekende routes terugvalt op `index.html` (single-page app); voor deze app is dat in de praktijk niet nodig omdat er geen client-side routing met losse URL's is — alles draait op één pagina.

## Privacy & disclaimer

- Antwoorden en rapport staan alleen in de `localStorage` van de browser van de gebruiker. Er is geen backend en er wordt niets naar een server gestuurd.
- "Antwoorden wissen" op de rapportpagina verwijdert alle Arcana Mirror-data uit `localStorage`.
- Arcana Mirror is bedoeld voor zelfreflectie en persoonlijke ontwikkeling en is nadrukkelijk **geen** medisch, psychologisch of therapeutisch diagnose-instrument.

## Bekende beperkingen

- Rapportteksten zijn samengesteld uit een vaste bibliotheek van tekstblokken per subdimensie (zie Decision-log in `../docs/arcana/DECISIONS.md`) — geen vrije-tekstgeneratie, met opzet, om determinisme en score-herleidbaarheid te garanderen.
- Er is geen automatische E2E-testsuite (Playwright/Cypress); de teststroom is handmatig geverifieerd in de browser (desktop + 375px mobiel-viewport) en de scoring/rapport-logica is gedekt door vitest.
- Ranking-vragen gebruiken op-en-neer-knoppen in plaats van drag-and-drop, voor betere mobiele toegankelijkheid.

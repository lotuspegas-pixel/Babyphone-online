# Arcana Mirror Decisions

Use this format:

## YYYY-MM-DD — Decision title

Decision:
Reason:
Files affected:
Risks:
Follow-up:

---

## 2026-07-11 — Project control system aangemaakt

Decision: AGENTS.md, CLAUDE.md, docs/arcana/*, .claude/agents/*, .claude/skills/* aangemaakt volgens de opgegeven specificatie.
Reason: Fase 0 vereist een projectcontrolesysteem voordat er gebouwd wordt, zodat elke volgende fase getoetst kan worden aan een vaste bron van waarheid.
Files affected: AGENTS.md, CLAUDE.md, docs/arcana/**, .claude/agents/**, .claude/skills/**
Risks: Geen; puur documentatie.
Follow-up: scripts/arcana-quick-check.js toevoegen, daarna stackkeuze documenteren (Fase 1).

## 2026-07-11 — Git branch voor Arcana Mirror build

Decision: Nieuwe branch `arcana-mirror-agent-build` aangemaakt vanaf `main`.
Reason: Git is aanwezig en schoon (geen uncommitted changes); AGENTS.md vereist dat het werk in een aparte branch gebeurt met commits per fase.
Files affected: git branch
Risks: Geen.
Follow-up: committen na elke afgeronde fase.

## 2026-07-11 — Stackkeuze: Vite + React + TypeScript in arcana/

Decision: Arcana Mirror gebouwd als losstaand Vite+React+TypeScript-project onder `serverless/arcana/`, met vitest voor tests en oxlint (meegeleverd door create-vite) voor linting.
Reason: De bestaande `serverless/` codebase is een puur statische HTML/CSS/vanilla-JS babyfoon-app zonder package.json, bundler of TypeScript — er is geen bestaande frontend-stack om in te integreren. AGENTS.md schrijft React+TypeScript+Vite voor als fallback in dat geval. Vite's build-output is statische HTML/CSS/JS, dus prima deploybaar op Vercel, Netlify of Hostinger, en raakt de bestaande babyfoon-pagina's niet aan.
Files affected: serverless/arcana/** (nieuw project)
Risks: Twee aparte front-ends in dezelfde repo (root statische site + arcana/ SPA); gebruikers moeten expliciet naar /arcana/ (of het gekozen subpad) navigeren na deploy. Gedocumenteerd in README.
Follow-up: bij deploy een reverse-proxy/subpad-regel instellen zodat /arcana/ naar de gebouwde SPA wijst (zie README "Deployen").

## 2026-07-11 — .gitignore-uitzondering voor Arcana-subagents/skills

Decision: Root `.gitignore` negeert `.claude/` volledig (editor/tooling-config); voor dit project zijn expliciete negatie-regels toegevoegd zodat `serverless/.claude/agents/**` en `serverless/.claude/skills/**` wél getrackt worden.
Reason: De Arcana-subagents en -skills zijn onderdeel van de gevraagde deliverable (Fase 0), niet lokale editor-instellingen. `serverless/.claude/settings.local.json` blijft wel genegeerd.
Files affected: .gitignore (repo-root)
Risks: Toekomstige `.claude/`-bestanden in `serverless/` buiten `agents/`/`skills/` blijven genegeerd tenzij hier expliciet aan toegevoegd.
Follow-up: geen.

## 2026-07-11 — Rapportgenerator: score-gebaseerde teksten via TRAIT_CONTENT

Decision: Voor elke van de 30 subdimensies is een vast tekstblok vastgelegd (zichtbaar gedrag, verborgen behoefte, effect op anderen, valkuil, groeisleutel) in `arcana/src/data/arcanaTraitContent.ts`. De rapportgenerator selecteert per sectie een vaste top-N van subdimensies (op basis van scores) en compileert daarmee de rapporttekst.
Reason: AGENTS.md verbiedt Barnum-achtige, voor iedereen passende teksten en eist dat elke uitspraak herleidbaar is naar scores. Door tekst per subdimensie vast te leggen en alleen te selecteren op basis van de daadwerkelijke score, blijft de output deterministisch (zelfde antwoorden → zelfde rapport) en score-herleidbaar, zonder externe AI-API.
Files affected: arcana/src/data/arcanaTraitContent.ts, arcana/src/lib/arcanaReportGenerator.ts
Risks: Tekstvariatie is eindig (30 subdimensies × vaste formuleringen); bij zeer grote gebruikersaantallen kunnen twee mensen met vergelijkbare scores gedeeltelijk dezelfde zinnen zien. Dit is inherent aan een deterministisch, niet-AI-gegenereerd systeem en in lijn met de eis "geen externe AI-API".
Follow-up: rapportteksten verfijnen op basis van echte gebruikersfeedback (zie eindadvies).

## 2026-07-29 — resultaten.md: volledig naslagwerk met alle combinaties

Decision: `docs/arcana/resultaten.md` toegevoegd (~345.000 tekens): leeswijzer, Jungiaans kader, 30 subdimensies per scoreband en per levensdomein, 12 hoofddimensies, 6 stress-archetypes, 10 spanningsvelden, 12 archetype-portretten, alle 144 primair × secundair combinaties, en acht beschouwingen (liefde, haat, pijn, intuïtie, verdriet, tegenslagen, geluk, blijdschap).
Reason: De gebruiker vroeg om een uitputtend document met alle mogelijke combinaties en hun betekenis, per levensdomein, met Jung als denkkader.
Files affected: docs/arcana/resultaten.md
Risks: Het document is groot en zal bij wijziging van de scorelogica moeten meegroeien. De 144 combinaties zijn handgeschreven en niet automatisch afgeleid, dus ze kunnen op termijn afwijken van de archetypeformules.
Follow-up: bij elke wijziging aan `arcanaArchetypes.ts` of de scorebanden ook resultaten.md controleren.

## 2026-07-29 — Jung als denkkader, expliciet afgebakend

Decision: Jungs begrippen (persona, schaduw, projectie, complex, compensatie, enantiodromie, spanningspaar, transcendente functie, individuatie) worden gebruikt als interpretatiekader. In resultaten.md staat expliciet dat delen van Jungs werk niet empirisch toetsbaar zijn en dat wij hem als taal gebruiken, niet als bewijs. Zijn typologie wordt uitdrukkelijk NIET gereconstrueerd.
Reason: De gebruiker vroeg om Jung "in alles" toe te passen. AGENTS.md verbiedt tegelijk het kopiëren van MBTI/DISC/Insights (die van Jungs typologie zijn afgeleid) en verbiedt pseudo-spirituele claims. Deze afbakening dient beide eisen: de rijkdom van Jungs begrippen zonder de typologie of de esoterie.
Files affected: docs/arcana/resultaten.md, arcana/src/data/arcanaTraitContent.ts, arcana/src/data/arcanaArchetypeContent.ts, arcana/src/lib/arcanaReportGenerator.ts
Risks: Jung blijft omstreden; het rapport benoemt dat zelf, wat de autoriteit van de tekst bewust relativeert.
Follow-up: geen.

## 2026-07-29 — Personalisatie via intake-scherm en aanspreekvorm

Decision: Nieuw intake-scherm vraagt naam (verplicht voor de persoonlijke toon), aanspreekvorm (je/u) en optionele levensfase. Opgeslagen onder localStorage-sleutel `arcana_profile`. Alle bronteksten blijven in de je-vorm; wie "u" kiest krijgt ze via een grammaticale omzetting in `arcanaVoice.ts`.
Reason: De gebruiker vroeg dat iedereen na het invullen van hun gegevens een reactie op persoonlijke toon krijgt. Eén bronversie met omzetting voorkomt dat elke tekst dubbel onderhouden moet worden.
Files affected: arcana/src/components/ArcanaIntake.tsx, arcana/src/lib/arcanaVoice.ts, arcana/src/lib/arcanaStorage.ts, arcana/src/types/arcana.ts, arcana/src/App.tsx
Risks: De je→u-omzetting is heuristisch: "je" is zowel onderwerp ("je voelt") als bezittelijk ("je grens"). De beslissing valt op basis van een woordenlijst van vervoegde werkwoorden en bijwoorden. Bij nieuwe teksten met ongebruikelijke werkwoorden kan "uw" verschijnen waar "u" hoort. Afgedekt met unit-tests plus een test die het volledige rapport controleert op achtergebleven je/jij/jouw/jezelf.
Follow-up: bij het toevoegen van nieuwe rapportteksten de u-vorm-test laten meelopen; die faalt zichtbaar bij een gemiste werkwoordsvorm.

## 2026-07-29 — Eigen score gaat vóór het archetypeportret

Decision: Wanneer het algemene archetypeportret botst met een individuele score (bijvoorbeeld The Flame met een hoge behoefte aan stilte), voegt de rapportgenerator een expliciete nuancering toe die zegt dat de eigen score leidend is.
Reason: Zonder deze controle beweerde het rapport twee tegengestelde dingen in dezelfde sectie, wat regel 4 van AGENTS.md schendt: elke rapportuitspraak moet herleidbaar zijn naar scores.
Files affected: arcana/src/lib/arcanaReportGenerator.ts (functies `expectationFor` en `reconciliation`), arcana/src/test/arcanaReconciliation.test.ts
Risks: De verwachting wordt afgeleid uit de archetypeformule en een tabel van tegengestelde subdimensies; die tabel is handmatig en dekt niet elke denkbare spanning.
Follow-up: tabel `OPPOSITES` uitbreiden zodra er nieuwe tegenstellingen opvallen in echte rapporten.

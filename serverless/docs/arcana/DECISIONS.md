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

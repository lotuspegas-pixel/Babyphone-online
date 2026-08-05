---
name: arcana-pipeline
description: Draait de volledige Arcana Mirror verbeterpijplijn — analyse, verbetering en validatie door gespecialiseerde agents in gescheiden schrijfdomeinen.
---

Draai de Arcana Mirror verbeterpijplijn.

## Voordat je begint

Leg een baseline vast zodat het effect meetbaar is:

```
cd arcana
mkdir -p .arcana-baseline
for s in 20260729 777 31337; do
  ARCANA_SAMPLE_SEED=$s ARCANA_SAMPLE_OUT=".arcana-baseline/rapport-$s.md" npm run sample
done
npm run overlap | tee .arcana-baseline/overlap.txt
```

Controleer met `git status` dat de werkmap schoon is. Is dat niet zo, commit of
stash eerst — de pijplijn wijzigt veel bestanden tegelijk en je wilt het verschil
kunnen zien.

## De fasen

**Fase 1 — analyse (parallel, read-only).** Vier agents onderzoeken elk hun
domein en leveren gestructureerde bevindingen:

| Agent | Onderzoekt |
|---|---|
| `arcana-report-analyst` | rapportkwaliteit: Barnum, herhaling, tegenspraak, toon |
| `arcana-model-architect` | meetmodel: spreiding, itemdekking, formulevaliditeit |
| `arcana-ux-designer` | flow, leesbaarheid, toegankelijkheid, mobiel, print |
| `arcana-feature-builder` | ontbrekende functionaliteit |

**Fase 2 — verbetering (gescheiden schrijfdomeinen).** Elke agent past zijn eigen
bevindingen toe. De domeinen overlappen niet, dus dit kan parallel:

| Agent | Schrijft in |
|---|---|
| `arcana-report-writer` | `src/data/arcana*Content.ts`, `arcanaReflections`, `arcanaSectionPhrasings`, `arcanaReportGenerator.ts` |
| `arcana-model-architect` | `src/lib/arcanaScoringEngine.ts`, `arcanaValidation.ts`, `src/data/arcanaDimensions.ts`, `arcanaArchetypes.ts`, `src/types/` |
| `arcana-ux-designer` | `src/styles/arcana.css`, bestaande componenten, `index.html` |
| `arcana-feature-builder` | nieuwe componenten, `App.tsx`, `arcanaStorage.ts` |

**Fase 3 — validatie.** `arcana-test-runner` draait quick-check, lint, typecheck,
test en build, en repareert wat kapot is.

**Fase 4 — hermeting.** Genereer nieuwe rapporten en vergelijk met de baseline:
overlap, aantal secties, testaantal, bundelgrootte.

## Regels die de pijplijn niet mag breken

Deze gelden voor elke agent, in elke fase:

- Determinisme: zelfde antwoorden → zelfde rapport
- Geen externe AI-API, geen netwerkaanroepen, geen nieuwe dependencies
- Antwoorden blijven in localStorage
- Geen medische claims, geen Barnum, elke uitspraak herleidbaar naar een score
- Privacytekst en disclaimer blijven zichtbaar
- Nederlands in de je-vorm; de u-vorm wordt afgeleid

## Afronden

Werk `docs/arcana/PROJECT_STATUS.md` en `docs/arcana/DECISIONS.md` bij, en commit
per fase met een bericht dat het gemeten effect noemt — niet alleen wat er
gewijzigd is, maar wat het opleverde.

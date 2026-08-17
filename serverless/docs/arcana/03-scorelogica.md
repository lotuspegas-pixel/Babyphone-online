# Arcana Mirror — Scorelogica

## Likert

Score 1 t/m 7 wordt omgezet:

| Likert | Waarde |
|---|---|
| 1 | -3 |
| 2 | -2 |
| 3 | -1 |
| 4 | 0 |
| 5 | +1 |
| 6 | +2 |
| 7 | +3 |

Voor elk target:
```
rawScore[target] += likertValue * weight
maxPossible[target] += 3 * abs(weight)
```

Standaard weights bij targetlijsten:
- 1e target = 1.0
- 2e target = 0.7
- 3e target = 0.4

## Forced choice

Gekozen optie:
```
rawScore[target] += 3 * weight
maxPossible[target] += 3 * abs(weight)
```

## Scenario

Gekozen optie:
```
rawScore[target] += 3 * weight
maxPossible[target] += 3 * abs(weight)
```

## Ranking

| Plek | Punten |
|---|---|
| 1e | 3 |
| 2e | 2.25 |
| 3e | 1.5 |
| 4e | 0.75 |
| 5e en lager | 0.3 |

```
rawScore[target] += rankingPoints * weight
maxPossible[target] += 3 * abs(weight)
```

## Normalisatie

```
normalizedScore = 50 + (rawScore / maxPossible) * 50
clamp(0, 100)
rond af op hele getallen
```

Als `maxPossible == 0`: score = 50, confidence = 0.

## Confidence

```
confidence = min(100, round((itemCount / 6) * 100))
```

## Hoofddimensies

- innerMotor = average(autonomyNeed, securityNeed, recognitionNeed, meaningNeed, connectionNeed)
- socialPattern = average(socialEnergy, connectionNeed, 100 - solitudeNeed)
- thinkingStyle = average(analyticalThinking, intuitiveThinking, creativeThinking, practicalThinking)
- emotionalSensitivityMain = average(emotionalSensitivity, criticismSensitivity, intimacyNeed)
- controlAndSecurity = average(controlNeed, securityNeed, perfectionism)
- conflictStyle = average(directness, 100 - conflictAvoidance, 100 - peoplePleasing)
- selfImage = average(selfConfidence, recognitionNeed, 100 - selfDoubt)
- shadowPattern = average(shadowDefensiveness, shadowAvoidance, perfectionism, 100 - growthReadiness)
- relationshipPattern = average(connectionNeed, trustNeed, intimacyNeed, 100 - conflictAvoidance)
- workStyle = average(practicalThinking, analyticalThinking, creativeThinking, controlNeed, meaningNeed)
- stressPattern = average(stressWithdrawal, stressControl, stressAcceleration, stressFreeze)
- growthPath = average(growthReadiness, meaningNeed, selfConfidence, 100 - shadowAvoidance)

## Archetype scores

- The Seeker = average(meaningNeed, intuitiveThinking, autonomyNeed, growthReadiness)
- The Architect = average(controlNeed, analyticalThinking, securityNeed, practicalThinking)
- The Mirror = average(emotionalSensitivity, intuitiveThinking, connectionNeed, intimacyNeed)
- The Flame = average(socialEnergy, recognitionNeed, directness, selfConfidence)
- The Guardian = average(connectionNeed, trustNeed, peoplePleasing, securityNeed)
- The Alchemist = average(creativeThinking, meaningNeed, growthReadiness, emotionalSensitivity)
- The Strategist = average(analyticalThinking, intuitiveThinking, controlNeed, practicalThinking)
- The Wounded Healer = average(emotionalSensitivity, criticismSensitivity, connectionNeed, growthReadiness)
- The Visionary = average(creativeThinking, autonomyNeed, intuitiveThinking, meaningNeed)
- The Anchor = average(securityNeed, practicalThinking, trustNeed, 100 - stressAcceleration)
- The Performer = average(recognitionNeed, socialEnergy, selfConfidence, creativeThinking)
- The Hermit = average(solitudeNeed, intuitiveThinking, meaningNeed, independenceNeed)

Primary archetype = hoogste score. Secondary archetype = tweede hoogste score.

> **Kalibratienotitie (empirisch vastgesteld):** The Flame en The Performer deelden
> voorheen exact dezelfde vier subdimensies (alleen in andere volgorde). Omdat
> `average()` orde-onafhankelijk is, gaven ze altijd identiek dezelfde score, en won
> The Flame bij een gelijkspel altijd (lagere index in `ARCHETYPES`) — The Performer
> kon daardoor wiskundig nooit primary archetype worden (0/360 in een steekproef over
> zes dummy-modi x 60 seeds, zie `arcana/src/dev/archetypeMetrics.test.ts`). The
> Performer gebruikt nu `creativeThinking` in plaats van `directness`, wat beter
> aansluit bij de beschrijving "expressie, impact en erkenning" tegenover Flame's
> "energie, beweging, lef en zichtbaarheid" (`docs/arcana/01-testmodel.md`). Na de
> wijziging kan The Performer aantoonbaar hoger scoren dan The Flame (zie
> regressietest `theFlame and thePerformer can diverge` in `arcana/src/test/arcana.test.ts`).

## Stress-archetype

- The Controller — hoogste als stressControl dominant is
- The Vanisher — hoogste als stressWithdrawal dominant is
- The Sprinter — hoogste als stressAcceleration dominant is
- The Frozen One — hoogste als stressFreeze dominant is
- The Pleaser — als peoplePleasing + conflictAvoidance hoog is
- The Defender — als shadowDefensiveness hoog is

## Spanningsvelden

Actief als beide scores > 65. Zeer sterk als beide scores > 75.

1. Vrijheid versus zekerheid — autonomyNeed + securityNeed
2. Erkenning versus onafhankelijkheid — recognitionNeed + independenceNeed
3. Controle versus overgave — controlNeed + emotionalSensitivity
4. Verbinding versus bescherming — connectionNeed + trustNeed + conflictAvoidance
5. Diepgang versus luchtigheid — meaningNeed + hoge solitudeNeed of lage socialEnergy
6. Ambitie versus zelftwijfel — recognitionNeed + selfDoubt
7. Intuïtie versus bewijsdrang — intuitiveThinking + analyticalThinking + controlNeed
8. Zorg voor anderen versus eigen grenzen — peoplePleasing + connectionNeed + lage directness
9. Creativiteit versus afmaken — creativeThinking + perfectionism + controlNeed
10. Rust versus impact — solitudeNeed + recognitionNeed

## Response quality

```
{
  completionRate,
  straightLiningRisk,
  contradictionRisk,
  socialDesirabilityRisk,
  confidenceLevel,
  notes
}
```

Regels:
- completionRate = ingevulde vragen / 120
- straightLiningRisk hoog als >70% Likert dezelfde score heeft
- socialDesirabilityRisk hoog als: `growthReadiness > 80 AND shadowAvoidance < 20 AND shadowDefensiveness < 60 AND perfectionism < 20`
- confidenceLevel: high/medium/low

> **Kalibratienotitie (empirisch vastgesteld):** `shadowDefensiveness` heeft geen
> enkel Likert-item — alleen forcedChoice/scenario/ranking-opties, die per ontwerp
> nooit negatief kunnen bijdragen (een niet-gekozen optie levert 0, nooit een
> "tegenstem"). Daardoor ligt de structurele ondergrens van `shadowDefensiveness` op
> 55, niet op 0 (bewezen in `arcana/src/dev/responseQualityContam.test.ts`, ook
> vastgelegd als regressietest onder `arcana/src/test/arcana.test.ts`). Met de
> oorspronkelijke drempel van `< 20` kon `socialDesirabilityRisk` daarom nooit
> triggeren, voor geen enkele invulling. De drempel is verhoogd naar `< 60`: dat
> ligt ruim boven de structurele bodem (55) maar duidelijk onder het gemiddelde bij
> neutrale of willekeurige invulling (77-85, zie
> `arcana/src/dev/baselineCalibration.test.ts`), zodat de detector wél normale
> invullingen ongemoeid laat maar opzettelijk eenzijdig positieve invulpatronen
> herkent. De onderliggende itemdekking van `shadowDefensiveness` (geen Likert-item,
> laagste itemCount van alle 30 subdimensies) is een apart, nog openstaand probleem
> — zie bevinding 3 en 6 in de modelanalyse; dat vraagt itemontwerp in
> `arcanaQuestions.ts`, buiten het schrijfdomein van de scoring-engine.

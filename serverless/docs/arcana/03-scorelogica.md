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
- The Performer = average(recognitionNeed, socialEnergy, selfConfidence, directness)
- The Hermit = average(solitudeNeed, intuitiveThinking, meaningNeed, independenceNeed)

Primary archetype = hoogste score. Secondary archetype = tweede hoogste score.

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
- socialDesirabilityRisk hoog als iemand extreem positief scoort op zelfcontrole, groei en sociaal gedrag maar laag op alle schaduwitems
- confidenceLevel: high/medium/low

# Arcana Mirror Agent Instructions

## Projectdoel

Arcana Mirror is een premium persoonlijkheidsanalyse-engine met:

- 120 vragen
- 30 subdimensies
- 12 hoofddimensies
- 12 archetypes
- stress-archetypes
- spanningsvelden
- response-quality analyse
- deterministic scoring engine
- rapportgenerator
- premium UI
- printvriendelijk rapport
- localStorage
- geen externe AI-API

Het doel is een rapport dat diep, persoonlijk, concreet en herkenbaar voelt zonder medische diagnose of zweverige claims.

## Absolute regels

1. Kopieer Insights Discovery, MBTI of DISC niet.
2. Maak geen medische diagnose.
3. Gebruik geen Barnum-achtige algemene horoscoopzinnen.
4. Elke rapportuitspraak moet herleidbaar zijn naar scores.
5. Dezelfde antwoorden moeten altijd hetzelfde rapport geven.
6. Bouw deterministic: geen willekeurige output.
7. Werk zonder externe AI-API.
8. Antwoorden worden standaard lokaal opgeslagen.
9. Wijzig geen bestaande functionaliteit zonder noodzaak.
10. Werk in fases.
11. Sla geen fase over.
12. Run checks voordat een fase als klaar wordt gemarkeerd.
13. Bouw mobielvriendelijk.
14. Maak een print/PDF-vriendelijke rapportweergave.
15. Documenteer keuzes in docs/arcana/DECISIONS.md.

## Bouwfases

Fase 0: documentatie en projectstructuur
Fase 1: data en types
Fase 2: scoring engine
Fase 3: rapportgenerator
Fase 4: testflow UI
Fase 5: premium design
Fase 6: validatie, dummy tests en build
Fase 7: polish, mobiel, print/PDF en deployment-check

## Rapportregels

Rapportteksten moeten:

- Nederlands zijn
- warm maar eerlijk zijn
- concreet gedrag benoemen
- ook schaduwkant benoemen
- spanningsvelden uitleggen
- geen diagnose stellen
- geen vage algemene zinnen gebruiken
- geen absolute uitspraken doen alsof de test onfeilbaar is

Gebruik altijd deze formule:

Eigenschap → zichtbaar gedrag → verborgen behoefte → effect op anderen → valkuil → groeisleutel

## Technische checks

Gebruik de bestaande package manager (npm, binnen `arcana/`).

Run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Als scripts ontbreken, documenteer wat ontbreekt in DECISIONS.md.

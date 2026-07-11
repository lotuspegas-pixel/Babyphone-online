# Claude Code Instructions

@AGENTS.md

## Claude Code specifieke regels

Lees vóór elke Arcana Mirror-taak:

- AGENTS.md
- docs/arcana/00-master-visie.md
- docs/arcana/06-acceptatiecriteria.md
- docs/arcana/PROJECT_STATUS.md
- het relevante fase-document

Werk altijd volgens docs/arcana/PROJECT_STATUS.md.

Gebruik gespecialiseerde Arcana-subagents waar nuttig.

Voer nooit meerdere grote fases tegelijk uit zonder tussentijdse controle.

Na elke fase:
1. run relevante checks
2. fix errors
3. update PROJECT_STATUS.md
4. update DECISIONS.md
5. geef korte samenvatting
6. ga door naar de volgende fase als checks slagen

Alleen stoppen en om hulp vragen bij:
- destructieve wijzigingen
- ontbrekende projectrechten
- deployment-credentials
- onoplosbare buildfouten na meerdere herstelpogingen

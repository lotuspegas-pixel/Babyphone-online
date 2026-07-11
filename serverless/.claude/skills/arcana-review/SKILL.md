---
name: arcana-review
description: Reviews Arcana Mirror against vision, scoring correctness, report quality, UI quality and acceptance criteria.
---

Review Arcana Mirror.

Read:
- AGENTS.md
- CLAUDE.md
- docs/arcana/00-master-visie.md
- docs/arcana/06-acceptatiecriteria.md
- docs/arcana/PROJECT_STATUS.md

Check:
1. Does the test match the original vision?
2. Are all 120 questions present?
3. Are all question types correct?
4. Are all scoring rules deterministic?
5. Are all report claims score-based?
6. Are there Barnum-like vague claims?
7. Are there medical claims?
8. Does localStorage work?
9. Does the report contain all required sections?
10. Does mobile UI work?
11. Does print/PDF layout work?
12. Does build pass?

Return:
- blocking issues
- important issues
- polish issues
- recommended next action

---
name: arcana-run
description: Runs the next Arcana Mirror project phase based on PROJECT_STATUS.md.
---

Run the Arcana Mirror project workflow.

Steps:
1. Read AGENTS.md.
2. Read CLAUDE.md.
3. Read docs/arcana/PROJECT_STATUS.md.
4. Determine the next incomplete phase.
5. Read relevant docs/arcana specification files.
6. Use specialist subagents if useful.
7. Implement only the current phase.
8. Run checks.
9. Fix errors.
10. Update PROJECT_STATUS.md.
11. Update DECISIONS.md.
12. Summarize changed files.
13. Continue to next phase only if checks pass.

Never skip:
- deterministic scoring
- validation
- privacy/disclaimer
- no-diagnosis rule
- report output quality
- mobile responsiveness
- print/PDF layout

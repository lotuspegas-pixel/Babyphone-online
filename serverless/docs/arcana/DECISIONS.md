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

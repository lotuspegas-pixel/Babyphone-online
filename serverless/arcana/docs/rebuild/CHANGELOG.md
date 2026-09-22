# Changelog — rebuild Arcana Profile

Eén regel per afgeronde stap, in de taal van de eigenaar. Uitgebreide onderbouwing staat in
`docs/arcana/DECISIONS.md`; hier alleen wat er veranderde en wat het opleverde.

## Stap 0 — Groene basis vastgelegd · 2026-09-22

- Regressiepoort gedraaid op de huidige stand: 115 tests groen, typecheck 0, build slaagt en de
  domeincontrole meldt "Domeincontrole geslaagd".
- `npm run lint` scande per ongeluk een oude gebouwde uitlevermap (`arcana-mirror-hostinger/`) en
  gaf daardoor waarschuwingen op geminificeerde code. Lint is nu beperkt tot de bron; de
  uitlevermappen en zips staan in `.gitignore`.
- Vastgesteld dat de gouden master (12 fixtures) is vastgelegd ná de labelwijziging van
  22-09 (`Stress: …` / `Schaduw: …` → gewone taal): alle 12 fixtures bevatten de nieuwe labels.
- Nog niet gebouwd: er is nog geen designrichting gekozen (beslispunt 1 uit `G` §2).

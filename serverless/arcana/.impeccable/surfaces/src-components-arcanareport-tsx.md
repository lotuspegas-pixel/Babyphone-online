---
version: 1
slug: "src-components-arcanareport-tsx"
primary_target: "src/components/ArcanaReport.tsx"
related_targets: ["src/components/ArcanaTest.tsx","src/lib/arcanaPdf.ts","src/styles/arcana.css"]
---

# Surface brief — rapport, testflow en PDF (src/components/ArcanaReport.tsx e.a., ArcanaTest.tsx, src/lib/arcanaPdf.ts)

Scope: het gegenereerde rapport (web), het PDF-bestand dat eruit volgt, en de testflow (intake → 120 vragen → laadscherm). Visitor mode: **Read** voor het rapport en de PDF; **Operate** voor de testflow.

Reader's question: "wie ben ik volgens mijn antwoorden, waar klopt het, en wat doe ik ermee?" Bron: het rapportobject (33 secties in 6 delen, scores, spanningsvelden) — tekst is onaantastbaar (gouden master). Wayfinding: samenvatting + inhoudsopgave vooraan, deelopeners met hoofdstuk-art, "kaart X van Y", terug-naar-inhoud.

Constraints: rapportchunk lazy; geen server; PDF client-side (pdf-lib + fontkit, dynamisch geladen bij de klik); fonts gesubset als TTF; alle beeld eigen SVG → geraster via canvas voor de PDF; geen verzonnen cijfers (geen "4.8/5", geen gebruikersaantallen); privacy- en disclaimertekst blijven; `applyVoice` voor je/u.

## Direction contract

THESIS: Het rapport is een officieel dossier over één persoon — voorblad met zegel en archetype-embleem, inhoud & profielsamenvatting, genummerde delen met eigen collage-illustratie — en geen stapel gelijke kaarten of een lap tekst. De testflow is een rustig werkblad in dezelfde wereld: één vraag per blad, voortgang als inkttekening per blok.

OWN-WORLD: Zelfde perkament/inkt/zegelrood-wereld als de landing; Bodoni Moda voor hoofdstuktitels, Spectral lopend (≥1.1rem, regelafstand 1.65, maat ≤70ch), Courier Prime voor rapportcode, datum, paginanummers en kleine kapitaal-onderkoppen; crimson stippen voor opsommingen; gescheurde papierblokken voor kaarten; het archetype-embleem (src/assets/art/emblems) als vast beeld van de lezer, deel-art (src/assets/art/secties) per deelopener. Herkenbaar zonder tekst aan: voorblad met embleem en rode schijf, de genummerde deelopeners, de lopende kop/voet met zegel.

STORY: De lezer ziet eerst het korte antwoord (archetype, samenvatting, inhoud), begrijpt daarna per deel waarom het er staat, gelooft het omdat het cijfer ernaast staat, en eindigt met een plan van vier weken en één zin om te onthouden; downloadt het als PDF dat er op papier net zo officieel uitziet.

FIRST VIEWPORT (web): masthead met links kicker-vrije H1 (archetype-naam, Bodoni), de intro-zin, de feitenregel (datum · antwoorden · versie · rapportcode), de knoppenrij (PDF downloaden / tekstbestand / deel één pagina) en rechts het embleem groot op gescheurd papier met rode schijf, met twee handgeschreven marginalia; één intekenmoment bij laden (schijf stijgt, embleem landt, titelregels komen op, marginalia schrijven; ≤2,2 s). PDF: A4 staand, voorblad = zegel + woordmerk, embleem groot, "Jouw Arcana Profile rapport", rode korte lijn, naam, archetype, tweede stem, voetstrook DATUM | RAPPORTCODE | VERSIE.

FORM: Brief-gepind (rapportmockups in de map "Arcana Design Sep 2026\Rapport"); geen concept-seed-roll. Seed key: n.v.t. (pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction & motion grammar
Rapport: het masthead-intekenmoment (eenmalig); hoofdstukken openen in beeld met één reveal per deelopener (art tekent in); leesvoortgang als dunne inktlijn boven aan de pagina; portret-pluimen reageren op hover/focus met hun label. Testflow: antwoordknop drukt in (scale 0.98, 120 ms) en kleurt zegelrood, de volgende vraag schuift in vanaf rechts (220 ms, ease-out), de blokvoortgang tekent zich als inktlijn; rangschikken met toetsenbord en sleep. Alles staat stil bij reduced-motion.

## Open
- Versiecheck van oude rapporten (ReportGate) blijft; nieuwe velden alleen optioneel.

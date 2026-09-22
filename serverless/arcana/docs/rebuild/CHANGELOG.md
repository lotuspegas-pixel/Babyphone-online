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

## Taak 1 — Designtokens en donkere modus · 2026-09-23

**Besluiten van de eigenaar:** richting (a) Perkament & Diepte met de donkere modus uit (b);
herocopy variant A (nieuwsgierigheid) voor taak 3.

### Wat er is veranderd
- De kleuren, lettergroottes, afstanden en schaduwen komen nu uit één gemeten tokenset
  (`src/styles/tokens.css`, licht én donker). De oude kleurdefinities zijn weg.
- Er is een donkere modus. Hij volgt het apparaat, en er is een schakelaar (Licht · Auto ·
  Donker) in de kop van de site, in het mobiele menu en bovenaan het rapport. De keuze wordt
  onthouden en overleeft "Antwoorden wissen".
- Geen lichte flits bij het laden: het thema staat vast vóór de eerste verf, ook voor de
  statische inhoud die zoekmachines zien.
- De twaalf dimensiekleuren zijn vervangen door vier families van drie (◆ motor en richting,
  ● contact, ▲ grip, ■ zelf). Alle twaalf halen AA in licht én donker; het familiesymbool
  staat overal naast de naam, zodat kleur nooit de enige drager is. Het wiel toont ze nu als
  vier kwadranten.
- Het portret tekent zichzelf in het gekozen thema, ook na omschakelen.
- Printen vanuit donkere modus levert een licht vel.
- De trechter op de landingspagina: de smalste band heeft lichte tekst op goud gekregen
  (was inkt op een goudmenging, 3,5:1 na de tokenwissel).
- Zes labels in de vorige stap al: geen wijziging aan rapporttekst in deze taak.

### Wat er bewust niet is veranderd
- Geen vormen: geen nieuwe kaartschaduwen, geen andere sectie-indeling, geen nieuwe
  lettertypen. Dat is taak 3.
- Het scorewiel blijft canvas tot taak 2; het leest zijn kleuren nu wel uit de tokens.
- De rapporttekst en de gouden master: onaangeraakt (0 gewijzigde fixtures).
- Cormorant 600 en de fontsubsets: taak 2.

### Wat de bezoeker merkt
- Het grijs van bijschriften is donkerder geworden (`--ink-faint` van 3,6:1 naar 6,3:1).
  Dat is de bedoeling.
- Wie op donker staat, ziet de site nu in warme nacht in plaats van fel perkament.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| `prefers-color-scheme`-regels | 0 | 3 | > 0 |
| `prefers-reduced-motion`-regels | 5 | 6 | ≥ 5 |
| Contrastfouten, 3 schermen × 2 thema's | 0 (alleen licht gemeten) | 0 / 0 / 0 en 0 / 0 / 0 | 0 |
| Dimensiekleuren onder 4,5:1 | 6 van 12 | 0 van 12 | 0 |
| CSS over de lijn (brotli q5) | ~9,2 KB | 11,0 KB | ≤ 14 KB |
| JS over de lijn (brotli q5) | ~139,5 KB | 138,0 KB | taak 2 |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 120 groen (was 115; 5 nieuwe voor het thema) |
| Contrast, 6 metingen | 6 × 0 fouten (landing 179 knopen, vragen 16, rapport 518) |
| Domeincontrole | geslaagd |

### Terugrollen
`tokens.css` uit `App.tsx` halen en het oude `:root`-blok uit commit `79f8c02` terugzetten in
`arcana.css`; bootscript en boot-stijl uit `index.html`; `ArcanaThemeToggle` uit kop en
rapport. Raakt geen gebruikersgegevens: `arcana_theme` is een losse sleutel.

### Wat dit openlaat
- De geïnverteerde gravure in donkere modus is met een CSS-filter gedaan en nog niet met het
  oog beoordeeld (screenshots werken niet in deze omgeving).
- De contrastmeting is gedaan met transities uitgeschakeld, op 1 breedte per scherm; de
  18-metingenpoort uit `G` §6 (3 breedtes) staat nog open tot er een Playwright-opstelling is.
- Herocopy A wijkt af van de aanbeveling B: bij taak 3 moet de SEO-titel uit `E` §7.2 op de h1
  worden afgestemd (`G` §2, beslispunt 2).

## Taak 2a + 2b — Bundel gesplitst, fonts gesubset · 2026-09-23

### Wat er is veranderd
- Wie alleen de landingspagina bekijkt, downloadt nu alleen wat daarvoor nodig is. De vragen
  laden bij "Start de test", de rekenmodule met alle rapportteksten wordt alvast opgehaald zodra
  de intake begint, en de rapportweergave laadt bij het openen van het rapport.
- Valt de verbinding weg op het moment dat het rapport gemaakt moet worden, dan verschijnt een
  scherm dat zegt dat de antwoorden veilig op het apparaat staan, met een knop om ze te
  downloaden en een knop om het opnieuw te proberen. Er gaat niets verloren.
- De lettertypen zijn teruggebracht tot precies de tekens die de site gebruikt. Namen met
  bijzondere tekens (Şule, Ångström) laden automatisch een klein aanvulbestand.
- Het lettertype van het woordmerk wordt vooraf geladen, zodat de titel niet verspringt.

### Wat er bewust niet is veranderd
- Cormorant 600 blijft, anders dan `Z` (tegenspraak 8) voorstelde: hij staat in negen regels op
  de landing en de begroting wordt ook met vier bestanden ruim gehaald. Geen zichtbare wijziging.
- Het laadscherm van zes seconden staat er nog; dat is taak 9 in `G`, niet deze.
- Het scorewiel: taak 2c.

### Wat de bezoeker merkt
- Niets zichtbaars. De landing is sneller op een trage verbinding; wie de test afmaakt
  downloadt in totaal ongeveer evenveel als eerst.

### Gemeten, vóór → na (brotli q11, gebouwde bundel)
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| JS landing | ~131 KB (één chunk) | 60,4 KB | ≤ 75 KB |
| JS landing → test starten | ~131 KB | 69,3 KB | — |
| JS volledig eerste bezoek | ~131 KB | 132,6 KB | — |
| JS terugkomen voor het rapport | ~131 KB | 74,3 KB | — |
| Fonts op de landing | 120,6 KB (5 bestanden) | 53,5 KB (4) | ≤ 60 KB |
| In de browser: landing haalt op | alles | `index` + `vendor` | — |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 122 groen (2 nieuw: vragenaantal + bronniveau-poort op de splitsing) |
| Bundelbegroting | gehaald; draait nu als laatste stap van `npm run build` |
| Domeincontrole | geslaagd |

### Terugrollen
`App.tsx` terug naar statische imports (één commit), `manualChunks` uit `vite.config.ts`;
de oude fontbestanden staan in `src/fonts/bron/` en het oude `@font-face`-blok in commit `04ba378`.

### Wat dit openlaat
- `size-adjust` op de terugvalletter (D §3.3 punt 1) is niet gedaan; de verspringing bij het
  laden is met `font-display: swap` klein maar niet nul.
- De fontsubsets zijn met `fontTools` gemaakt; herhalen vraagt Python met `fonttools` en
  `brotli` op de ontwikkelmachine. Dat staat in het script zelf.

## Taak 2c — Het portret naar SVG · 2026-09-23

### Wat er is veranderd
- Het portret is nu vectorbeeld: het blijft scherp bij printen en op elke zoom, de scores in
  het beeld zijn echte tekst (selecteerbaar, kopieerbaar), en het volgt de donkere modus
  zonder hertekening.
- Elke pluim is met het toetsenbord te bereiken en heeft een eigen naam en score voor
  schermlezers; oplichten werkt vanuit het beeld én vanuit de lijst eronder.
- De rekenkant staat los in `src/lib/arcanaPortraitGeometry.ts`, zodat de landingspagina er in
  taak 3 een statisch voorbeeldwiel uit kan maken zonder de rapportcode mee te laden.
- De oude canvas-tekening blijft tot taak 13 bereikbaar met `?vergelijk` in de adresbalk, onder
  het nieuwe beeld met dezelfde scores, om met het oog naast elkaar te leggen.

### Wat er bewust niet is veranderd
- De sleutel en de lijst van twaalf onder het beeld: ongewijzigd, ze waren goed.
- De vormregels (lengte, buiging, dichtheid, kleur per familie, het open ringetje): identiek.

### Wat de bezoeker merkt
- De intekening bij het openen is een vloeiende groei per pluim in plaats van een tekening
  langs de schacht. Wie bewegingsvermindering aan heeft, ziet het beeld direct compleet.
- In een PDF is het portret nu scherp.

### Gemeten, vóór → na
| Metriek | Voor | Na | Doel |
|---|--:|--:|--:|
| Print | raster ~150 dpi | vector | vector |
| Rapport-DOM | 936 | 1.102 | ≤ 1.030 (`D`) — erboven, zie DECISIONS |
| Contrast rapport, licht / donker | 0 / 0 (canvas niet meegemeten) | 0 / 0 op 567 knopen, **inclusief** de tekst in het beeld | 0 |
| Rapportchunk | 34,0 KB raw | 35,2 KB raw (9,7 KB q11) | — |

### Regressiepoort
| Blok | Uitkomst |
|---|---|
| Determinisme — gouden master | groen, 0 gewijzigde fixtures |
| Tests | 129 groen (7 nieuw: geometrie deterministisch, lengte/buiging/dichtheid, labelafbreking) |
| Bundelbegroting | gehaald |

### Terugrollen
`ArcanaPortrait.tsx` terug naar de canvas-versie: één import in `ArcanaReport.tsx` (het bestand
`ArcanaPortraitCanvas.tsx` staat er nog).

### Wat dit openlaat
- Niet in Safari getest (`mix-blend-mode` in SVG); de gloed is decoratief en mag daar wegvallen.
- Het beeld is met het oog beoordeeld op vorm en kleurwaarden via de DOM, niet als screenshot —
  het browserpaneel in deze omgeving rendert geen frames. Leg het na uitrol naast de canvas
  met `?vergelijk`.

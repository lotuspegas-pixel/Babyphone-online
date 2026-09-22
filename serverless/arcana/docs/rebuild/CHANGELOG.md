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

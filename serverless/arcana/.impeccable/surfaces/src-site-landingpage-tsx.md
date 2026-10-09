---
version: 1
slug: "src-site-landingpage-tsx"
primary_target: "src/site/LandingPage.tsx"
related_targets: ["src/site/SiteHeader.tsx","src/site/SiteFooter.tsx","src/styles/site.css"]
---

# Surface brief — landingspagina (src/site/LandingPage.tsx, SiteHeader.tsx, SiteFooter.tsx, site.css)

Scope: de publieke landingspagina van Arcana Profile. Visitor mode: **Persuade**.

Audience & job: een Nederlandstalige volwassene die zichzelf beter wil begrijpen en binnen enkele seconden moet weten wat dit is, waarom het anders is (narekenbaar, geen server) en wat de actie is (de test starten / eerst het voorbeeldrapport lezen).

Proof/content: echte cijfers (120 vragen, 12 dimensies, 33 hoofdstukken, ≈5.700 woorden), het voorbeeldrapport op /voorbeeld/, de drie controleerbare beweringen, het ene geverifieerde Jung-citaat. Geen testimonials, beoordelingen, gebruikersaantallen of "wetenschappelijk bewezen" — de mockup bevat die, de site niet.

Constraints: landing-JS ≤ 75.000 B q11; fonts ≤ 60.000 B; alle beeld als eigen SVG (src/assets/art/landing/*); geen echte gezichten; `prefers-reduced-motion`; donkere modus blijft werken; bestaande sectie-id's en copyblokken in siteContent.ts blijven.

## Direction contract

THESIS: De pagina is een opengeslagen archiefdossier over jezelf — een collage van gescheurd perkament, inkt en zegelrood waarin de bezoeker zijn eigen patroon al ziet liggen voordat hij één vraag beantwoordt. Het weigert de categorie-standaard van "koptekst + subtekst + knop + drie gelijke kaarten" en de quiz-esthetiek van persoonlijkheidstests.

OWN-WORLD: Perkament (#ede4cc) als grond, inktzwart (#1c1712) voor tekst en donkere banden, zegelrood (#7e1e1b) voor actie en zegel; gescheurde-papier-randen (clip-path + drop-shadow, nooit box-shadow op clip), halftoon- en papierkorrel; Bodoni Moda 600 display met strakke regelafstand, Spectral 400 lopend, Courier Prime voor kleine kapitaal-trefwoordlijsten, Shadows Into Light voor handgeschreven marginalia (aria-hidden). Herkenbaar zonder tekst aan: de collage-koning met poort en trap, het brein, het oog, de rode schijf, de gescheurde randen.

STORY: Begrijpt binnen één viewport: dit is een rekenende persoonlijkheidstest die haar bewijs laat zien. Gelooft: ik kan dit narekenen en het blijft van mij. Doet: start de test, of leest eerst het voorbeeldrapport.

FIRST VIEWPORT: Twee kolommen op ≥900 px. Links (±42 %): kicker-vrije H1 in drie regels Bodoni (clamp tot ~6rem), belofte van twee zinnen, primaire knop "Begin met de 120 vragen" naast ghost-link "Bekijk voorbeeldrapport", vertrouwensregel, en links onder een kleine Courier-lijst (ARCHETYPEN/PATRONEN/INZICHT/KEUZES/GROEI) met de handgeschreven notitie "The map is not the territory…". Rechts (±58 %, bloedt over de rand): de hero-collage in **parallax-lagen** — achtergrondpapier/rode schijf (traag), bergen en koning (basis), brein/oog/notities (snel), handschrift-marginalia bovenop; scroll stuurt de verticale verschuiving, pointer geeft ±6 px diepte op desktop; alles staat stil bij reduced-motion en op mobiel wordt de collage één stilstaand beeld onder de tekst. De primaire actie ligt op de linker derde, boven de vouw op 1440×900 én 390×844.

FORM: Brief-gepind (eigenaarsmockup "Arcana Design Sep 2026", eerste afbeelding) — geen concept-seed-roll; positie 1 van de lijst omdat de brief het pint. Seed key: n.v.t. (pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction & motion grammar

Eén georkestreerd moment: bij laden schrijven de marginalia zich in (clip-path-reveal, gestaffeld, ≤1,8 s) terwijl de collage-lagen van licht verschoven naar hun rustpositie glijden (exponentiële ease-out, 700 ms). Daarna: scroll-parallax in de hero (transform-only, passieve scroll-listener + rAF, `will-change` alleen tijdens beweging), en per sectie één reveal bij binnenkomst (IntersectionObserver, één keer): hoofdstuk-art tekent in, cijfers tellen op (300–900 ms), rapportstapel waaiert open, tegels krijgen hover-tilt van max 2°. Geen fade-up op elke sectie; de rest is stil.

## Open
- Paginahoogte-doel ≤ 6.000 px blijft eigenaarsbeslissing (zie docs/arcana/nulmeting.json).

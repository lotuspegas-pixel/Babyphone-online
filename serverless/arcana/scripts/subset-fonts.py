"""
Subset de zelfgehoste fonts tot wat de site werkelijk gebruikt.

    py scripts/subset-fonts.py

Drieluik sinds de herstijling naar "Het Arcana Dossier" (sept. 2026):
Bodoni Moda (titels, het zegel-wordmerk), Spectral (lopende tekst) en
Courier Prime (rapportnummers, data, kickers) — Cormorant Garamond en
Inter zijn vervangen. Uit docs/rebuild/D-frontend-plan.md §3.3: de
Fontsource-"latin"-bestanden bevatten ~700 glyphs, de site gebruikt er ruim
100. Per letter en gewicht komen er drie bestanden:

  *-basis.woff2          alles wat de site zelf toont (ASCII + de tekens
                         hieronder); laadt altijd
  *-aanvulling.woff2     de rest van Latin-1 Supplement (U+00A0-00FF): laadt
                         alleen als een naam zo'n teken bevat (Ångström, Ñ, ø)
  *-aanvulling-ext.woff2 Latin Extended-A (U+0100-017F): idem (Şule, Łukasz)

De unicode-ranges in src/styles/arcana.css moeten exact bij deze drie
bestanden passen; die staan daarom hieronder als één bron van waarheid en
worden aan het eind afgedrukt.

Vereist: fontTools en brotli (py -m pip install fonttools brotli).
"""

from __future__ import annotations

import io
import sys
from pathlib import Path

from fontTools import subset
from fontTools.merge import Merger
from fontTools.merge import Options as MergeOptions
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "fonts" / "bron"
OUT = ROOT / "src" / "fonts"

# Gemeten over alle zichtbare tekst (bronbestanden + index.html), plus een
# handvol typografische tekens die goedkoop zijn en anders op de systeemletter
# terugvallen (aanhalingstekens, euro, maalteken).
BASIS = (
    "U+0020-007E,"
    "U+00A7,U+00A9,U+00B7,U+00C0,U+00D7,U+00E0,U+00E1,U+00E8,U+00E9,U+00EB,U+00ED,U+00EF,U+00F3,U+00FC,"
    "U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+20AC,"
    "U+2190-2193,"
    "U+25A0,U+25B2,U+25BC,U+25C6,U+25CF"
)
# Latin-1 Supplement minus wat al in de basis zit.
AANVULLING = (
    "U+00A0-00A6,U+00A8,U+00AA-00B6,U+00B8-00BF,U+00C1-00D6,U+00D8-00DF,"
    "U+00E2-00E7,U+00EA,U+00EC,U+00EE,U+00F0-00F2,U+00F4-00FB,U+00FD-00FF"
)
AANVULLING_EXT = "U+0100-017F"

# Handschrift voor de marginalia in de collages (korte Engelse regels en
# trefwoorden): alleen ASCII, geen aanvullingen — namen van gebruikers komen
# hier nooit in terecht.
HANDSCHRIFT = "U+0020-0021,U+0027,U+002C-002E,U+003A-003B,U+003F,U+0030-0039,U+0041-005A,U+0061-007A,U+2014,U+2019"

FACES = [
    # (uitvoernaam, bronbestand latin, bronbestand latin-ext)
    ("bodoni-moda-600", "bodoni-moda-latin-600-normal.woff2", "bodoni-moda-latin-ext-600-normal.woff2"),
    ("bodoni-moda-600-italic", "bodoni-moda-latin-600-italic.woff2", "bodoni-moda-latin-ext-600-italic.woff2"),
    ("spectral-400", "spectral-latin-400-normal.woff2", "spectral-latin-ext-400-normal.woff2"),
    ("spectral-600", "spectral-latin-600-normal.woff2", "spectral-latin-ext-600-normal.woff2"),
    ("spectral-400-italic", "spectral-latin-400-italic.woff2", "spectral-latin-ext-400-italic.woff2"),
    ("courier-prime-400", "courier-prime-latin-400-normal.woff2", "courier-prime-latin-ext-400-normal.woff2"),
]


HAND_FACES = [
    # (uitvoernaam, bronbestand latin)
    ("shadows-into-light-400", "shadows-into-light-latin-400-normal.woff2"),
]

# De PDF-generator (src/lib/arcanaPdf.ts) sluit fonts in via pdf-lib + fontkit
# en heeft daarvoor kale TTF's nodig, geen woff2. Eén bestand per letter met
# basis ∪ aanvulling ∪ aanvulling-ext, zodat elke naam in de PDF rendert; de
# latin- en latin-ext-bronnen bevatten verschillende glyphs en worden daarom
# na het subsetten samengevoegd. Het handschrift blijft ASCII (marginalia).
PDF_OUT = OUT / "pdf"
PDF_FACES = FACES


def subset_to(src: Path, unicodes: str, dest: Path) -> int:
    font = TTFont(str(src))
    options = subset.Options()
    options.flavor = "woff2"
    # De standaard featureset van pyftsubset houdt kerning, ligaturen, calt,
    # ccmp en de markeringen; de stilistische sets (ss01..) en de volledige
    # naamtabel gaan eruit. Hinting ook: op elk modern platform rendert een
    # ongehinte woff2 identiek, en het scheelt een derde van de bytes.
    options.hinting = False
    options.notdef_outline = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=subset.parse_unicodes(unicodes))
    subsetter.subset(font)
    buf = io.BytesIO()
    font.save(buf)
    dest.write_bytes(buf.getvalue())
    return len(buf.getvalue())


def subset_font(src: Path, unicodes: str) -> TTFont:
    font = TTFont(str(src))
    options = subset.Options()
    options.hinting = False
    options.notdef_outline = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=subset.parse_unicodes(unicodes))
    subsetter.subset(font)
    return font


def save_ttf(font: TTFont, dest: Path) -> int:
    font.flavor = None
    buf = io.BytesIO()
    font.save(buf)
    dest.write_bytes(buf.getvalue())
    return len(buf.getvalue())


def subset_pdf(latin: Path, latin_ext: Path, dest: Path) -> int:
    """Kale TTF met basis + aanvulling (uit latin) en aanvulling-ext (uit latin-ext) samengevoegd."""
    base = subset_font(latin, f"{BASIS},{AANVULLING}")
    ext = subset_font(latin_ext, AANVULLING_EXT)
    # De merger struikelt over de layouttabellen van deze statische instanties
    # (restanten van de variabele bron: GDEF.VarStore, versie 1.3). Kerning en
    # ligaturen komen uit het latin-deel; het ext-deel levert alleen glyphs.
    for tag in ("GDEF", "GSUB", "GPOS"):
        if tag in ext:
            del ext[tag]
    if "GDEF" in base:
        gdef = base["GDEF"].table
        gdef.VarStore = None
        gdef.Version = 0x00010002 if getattr(gdef, "MarkGlyphSetsDef", None) else 0x00010000
    buffers = []
    for part in (base, ext):
        part.flavor = None
        buf = io.BytesIO()
        part.save(buf)
        buf.seek(0)
        buffers.append(buf)
    return save_ttf(Merger(options=MergeOptions()).merge(buffers), dest)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    PDF_OUT.mkdir(parents=True, exist_ok=True)
    totaal_basis = 0
    print(f"{'bestand':34} {'bytes':>8}")
    for naam, latin, latin_ext in FACES:
        b = subset_to(SRC / latin, BASIS, OUT / f"{naam}-basis.woff2")
        a = subset_to(SRC / latin, AANVULLING, OUT / f"{naam}-aanvulling.woff2")
        e = subset_to(SRC / latin_ext, AANVULLING_EXT, OUT / f"{naam}-aanvulling-ext.woff2")
        totaal_basis += b
        print(f"{naam + '-basis.woff2':34} {b:8d}")
        print(f"{naam + '-aanvulling.woff2':34} {a:8d}")
        print(f"{naam + '-aanvulling-ext.woff2':34} {e:8d}")
    for naam, latin in HAND_FACES:
        h = subset_to(SRC / latin, HANDSCHRIFT, OUT / f"{naam}-basis.woff2")
        print(f"{naam + '-basis.woff2':34} {h:8d}")
    print(f"\nbasisbestanden samen: {totaal_basis} bytes ({totaal_basis / 1024:.1f} KB)")
    totaal_pdf = 0
    print("\nPDF-fonts (TTF, src/fonts/pdf/):")
    for naam, latin, latin_ext in PDF_FACES:
        n = subset_pdf(SRC / latin, SRC / latin_ext, PDF_OUT / f"{naam}.ttf")
        totaal_pdf += n
        print(f"{naam + '.ttf':34} {n:8d}")
    for naam, latin in HAND_FACES:
        n = save_ttf(subset_font(SRC / latin, HANDSCHRIFT), PDF_OUT / f"{naam}.ttf")
        totaal_pdf += n
        print(f"{naam + '.ttf':34} {n:8d}")
    print(f"pdf-fonts samen: {totaal_pdf} bytes ({totaal_pdf / 1024:.1f} KB)")
    print("\nunicode-range voor de CSS:")
    print("  basis:          ", BASIS)
    print("  aanvulling:     ", AANVULLING)
    print("  aanvulling-ext: ", AANVULLING_EXT)
    print("  handschrift:    ", HANDSCHRIFT)
    return 0


if __name__ == "__main__":
    sys.exit(main())

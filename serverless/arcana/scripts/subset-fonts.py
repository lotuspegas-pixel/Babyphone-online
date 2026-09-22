"""
Subset de zelfgehoste fonts tot wat de site werkelijk gebruikt.

    py scripts/subset-fonts.py

Uit docs/rebuild/D-frontend-plan.md §3.3: de Fontsource-"latin"-bestanden
bevatten ~700 glyphs, de site gebruikt er ruim 100. Per letter en gewicht
komen er drie bestanden (Cormorant 400 rechtop wordt nergens gebruikt en
vervalt; de cursief 400 laadt alleen op het rapport):

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

FACES = [
    # (uitvoernaam, bronbestand latin, bronbestand latin-ext)
    ("cormorant-400-italic", "cormorant-garamond-latin-400-italic.woff2", "cormorant-garamond-latin-ext-400-italic.woff2"),
    ("cormorant-500", "cormorant-garamond-latin-500-normal.woff2", "cormorant-garamond-latin-ext-500-normal.woff2"),
    ("cormorant-600", "cormorant-garamond-latin-600-normal.woff2", "cormorant-garamond-latin-ext-600-normal.woff2"),
    ("inter-400", "inter-latin-400-normal.woff2", "inter-latin-ext-400-normal.woff2"),
    ("inter-600", "inter-latin-600-normal.woff2", "inter-latin-ext-600-normal.woff2"),
]


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


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
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
    print(f"\nbasisbestanden samen: {totaal_basis} bytes ({totaal_basis / 1024:.1f} KB)")
    print("\nunicode-range voor de CSS:")
    print("  basis:          ", BASIS)
    print("  aanvulling:     ", AANVULLING)
    print("  aanvulling-ext: ", AANVULLING_EXT)
    return 0


if __name__ == "__main__":
    sys.exit(main())

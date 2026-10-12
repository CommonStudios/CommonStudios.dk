"""Convert the CommonStudios wordmark image into ASCII art (ascii.rest style).

Usage: python3 scripts/ascii-wordmark.py   (macOS: uses the system SF Mono / Menlo)
Reads src/assets/commonstudios-wordmark.png (white on black) and writes
src/assets/commonstudios-wordmark.json with two layouts:
  wide:    the wordmark on one line (desktop)
  stacked: "Common" above "Studios" (narrow screens), at the same cell scale

Solid areas become "8". Edge cells get the character whose glyph best matches
the ink in that cell (_ , ' " ( ) / \\ p q b d P Y ...), so outlines stay smooth.
"""
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src/assets/commonstudios-wordmark.png'
OUT = ROOT / 'src/assets/commonstudios-wordmark.json'
FONTS = ['/System/Library/Fonts/SFNSMono.ttf', '/System/Library/Fonts/Menlo.ttc']

FILL = '8'
EDGES = "_,.'\"`()/\\|-pqbdPYLJ7<>^vo:;"
SOLID = 0.62  # cell coverage at or above which the cell is FILL
EMPTY = 0.07  # below which it is blank
# Browser cell: advance 0.6em, line-height 1.2em. Templates are drawn at this size...
EM, CELL_W, CELL_H = 40, 24, 48
# ...and compared at this resolution.
SAMPLE_W, SAMPLE_H = 6, 12

WIDE_COLS = 200
STACKED_COLS = 112
SPLIT_X = 600  # empty column between "Common" and "Studios" in the cropped image


def load_font() -> ImageFont.FreeTypeFont:
    for path in FONTS:
        if Path(path).exists():
            return ImageFont.truetype(path, EM)
    raise SystemExit('No monospace font found: edit FONTS in this script.')


def glyph_templates(font: ImageFont.FreeTypeFont) -> dict[str, list[float]]:
    ascent, descent = font.getmetrics()
    templates = {}
    for ch in EDGES:
        cell = Image.new('L', (CELL_W, CELL_H), 0)
        ImageDraw.Draw(cell).text((0, (CELL_H - ascent - descent) / 2), ch, fill=255, font=font)
        values = [v / 255 for v in cell.resize((SAMPLE_W, SAMPLE_H), Image.Resampling.BOX).getdata()]
        peak = max(values) or 1
        templates[ch] = [v / peak for v in values]
    return templates


def trim(img: Image.Image) -> Image.Image:
    return img.crop(img.point(lambda v: 255 if v > 40 else 0).getbbox())


def to_ascii(img: Image.Image, px_per_col: float, templates: dict[str, list[float]]) -> list[str]:
    cols = max(1, round(img.width / px_per_col))
    rows = max(1, round(img.height / (px_per_col * CELL_H / CELL_W)))
    big = img.resize((cols * SAMPLE_W, rows * SAMPLE_H), Image.Resampling.BOX).load()
    lines = []
    for r in range(rows):
        line = ''
        for c in range(cols):
            patch = [
                big[c * SAMPLE_W + x, r * SAMPLE_H + y] / 255
                for y in range(SAMPLE_H)
                for x in range(SAMPLE_W)
            ]
            coverage = sum(patch) / len(patch)
            if coverage >= SOLID:
                line += FILL
            elif coverage < EMPTY:
                line += ' '
            else:
                line += min(
                    templates,
                    key=lambda ch: sum((a - b) ** 2 for a, b in zip(patch, templates[ch])),
                )
        lines.append(line.rstrip())
    return lines


def main() -> None:
    templates = glyph_templates(load_font())
    img = trim(Image.open(SRC).convert('L'))
    wide = to_ascii(img, img.width / WIDE_COLS, templates)

    common = img.crop((0, 0, SPLIT_X, img.height))
    studios = trim(img.crop((SPLIT_X, 0, img.width, img.height)))
    scale = max(common.width, studios.width) / STACKED_COLS
    stacked = to_ascii(common, scale, templates) + [''] + to_ascii(studios, scale, templates)

    OUT.write_text(json.dumps({'wide': wide, 'stacked': stacked}, indent=2) + '\n')
    for name, lines in (('wide', wide), ('stacked', stacked)):
        print(f'{name}: {max(map(len, lines))}x{len(lines)}')


if __name__ == '__main__':
    main()

"""Render public/images/og-image.png (1200x630), the default social share image.

Builds an HTML card from the site's own palette, Nordwand Mono and the ASCII
wordmark, then screenshots it with Playwright via npx. Rerun after changing the
palette, the wordmark or the headline:

    python3 scripts/og-image.py
"""

import html
import json
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/images/og-image.png"
FONTS = ROOT / "src/assets/fonts"

# Keep in sync with :root in src/styles/global.css.
GROUND = "#111312"
PAPER = "#eceeec"
LICHEN = "#979c99"
PATINA = "#78c2a6"
SEAM = "#262a28"

HEADLINE = "Vi bygger software til vores kunder og til os selv."
DOMAIN = "commonstudios.dk"
PLACE = "København"


def font_face(weight: int, name: str) -> str:
    src = (FONTS / f"NordwandMono-{name}.woff2").as_uri()
    return (
        f"@font-face{{font-family:'Nordwand Mono';font-weight:{weight};"
        f"src:url('{src}') format('woff2')}}"
    )


def build_html() -> str:
    art = json.loads((ROOT / "src/assets/commonstudios-wordmark.json").read_text())
    lines = art["wide"]
    cols = max(len(line) for line in lines)
    return f"""<!doctype html><meta charset="utf-8"><style>
{font_face(400, "Regular")}{font_face(500, "Medium")}
* {{ margin: 0; box-sizing: border-box; }}
body {{
  width: 1200px; height: 630px; padding: 72px 80px 64px;
  display: flex; flex-direction: column; justify-content: space-between;
  background: {GROUND}; color: {PAPER}; font-family: 'Nordwand Mono', monospace;
  -webkit-font-smoothing: antialiased;
}}
pre {{
  /* Same sizing rule as AsciiLogo.astro: monospace glyphs are ~0.6em wide. */
  font: calc(1040px / ({cols} * 0.6)) / 1.2 Menlo, ui-monospace, monospace;
  letter-spacing: 0; white-space: pre;
}}
h1 {{ max-width: 20ch; font-size: 52px; font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; }}
footer {{
  display: flex; justify-content: space-between; padding-top: 22px;
  border-top: 1px solid {SEAM}; font-size: 24px; color: {LICHEN};
}}
footer span:first-child {{ color: {PATINA}; }}
</style>
<pre>{html.escape(chr(10).join(lines))}</pre>
<h1>{html.escape(HEADLINE)}</h1>
<footer><span>{DOMAIN}</span><span>{PLACE}</span></footer>
"""


def main() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        page = Path(tmp) / "og.html"
        page.write_text(build_html(), encoding="utf-8")
        subprocess.run(
            [
                "npx", "-y", "playwright", "screenshot",
                "--viewport-size=1200,630", "--wait-for-timeout=500",
                page.as_uri(), str(OUT),
            ],
            check=True,
        )
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

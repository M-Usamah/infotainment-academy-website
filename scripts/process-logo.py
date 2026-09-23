"""Build Infotainment Academy logo assets from the vector source.

Uses Microsoft Edge / Chrome headless to rasterize SVG, then Pillow to crop.

Produces:
- logo.svg / logo-light.svg / logo-mark.svg / logo-mark-light.svg
- logo.png, logo-black.png (full lockup on white)
- logo-light.png (full lockup lightened for dark UI)
- logo-mark.png (icon on white)
- logo-mark-light.png (icon lightened for dark UI, transparent)
"""

from __future__ import annotations

import re
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"
SCRIPTS = ROOT / "scripts"

SVG_CANDIDATES = [
    ROOT / "brand" / "infotainment-logo.svg",
    ROOT / "INFOTAINMENT LOGO.svg",
    ROOT / "INFOTAINMENT_LOGO.svg",
]

MARK_VIEWBOX = "120 200 360 320"
NAVY_FILLS = ("#1d2b5a", "#192b56", "#1D2B5A", "#192B56")
LIGHT_FILL = "#f7f9ff"

BROWSERS = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Users\{}\AppData\Local\Google\Chrome\Application\chrome.exe".format(
        Path.home().name
    )),
    Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
]


def pick_svg() -> Path:
    for path in SVG_CANDIDATES:
        if path.is_file():
            return path
    raise SystemExit("Missing brand/infotainment-logo.svg")


def find_browser() -> Path:
    for path in BROWSERS:
        if path.is_file():
            return path
    raise SystemExit("Chrome or Edge required to rasterize the logo SVG.")


def set_viewbox(svg_text: str, viewbox: str) -> str:
    return re.sub(r'viewBox="[^"]+"', f'viewBox="{viewbox}"', svg_text, count=1)


def lighten_svg(svg_text: str) -> str:
    out = svg_text
    for navy in NAVY_FILLS:
        out = out.replace(navy, LIGHT_FILL)
    out = out.replace("#c0c4cd", "#d4e2ff")
    out = out.replace("#f7f8f8", "#ffffff")
    return out


def rasterize(
    browser: Path,
    svg_path: Path,
    out_png: Path,
    width: int,
    height: int,
    background: str = "#ffffff",
) -> None:
    svg_uri = svg_path.resolve().as_uri()
    html = f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;background:{background};width:{width}px;height:{height}px;display:flex;align-items:center;justify-content:center;overflow:hidden">
  <img src="{svg_uri}" style="max-width:92%;max-height:92%;object-fit:contain" alt=""/>
</body></html>"""
    with tempfile.TemporaryDirectory() as tmp:
        html_path = Path(tmp) / "logo.html"
        html_path.write_text(html, encoding="utf-8")
        out_png.parent.mkdir(parents=True, exist_ok=True)
        if out_png.exists():
            out_png.unlink()
        cmd = [
            str(browser),
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={width},{height}",
            f"--screenshot={out_png}",
            html_path.resolve().as_uri(),
        ]
        subprocess.run(cmd, check=True, capture_output=True)
    if not out_png.is_file():
        raise RuntimeError(f"Browser did not write {out_png}")


def dark_to_alpha(img: Image.Image, threshold: int = 28) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r < threshold and g < threshold and b < threshold + 8:
                px[x, y] = (0, 0, 0, 0)
    return rgba


def content_bbox(img: Image.Image, threshold: int = 248) -> tuple[int, int, int, int]:
    w, h = img.size
    px = img.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            pixel = px[x, y]
            if len(pixel) == 4 and pixel[3] < 8:
                continue
            r, g, b = pixel[:3]
            if r < threshold or g < threshold or b < threshold:
                found = True
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if not found:
        return 0, 0, w - 1, h - 1
    return minx, miny, maxx, maxy


def crop_with_pad(img: Image.Image, pad: int = 24) -> Image.Image:
    minx, miny, maxx, maxy = content_bbox(img)
    w, h = img.size
    return img.crop(
        (
            max(0, minx - pad),
            max(0, miny - pad),
            min(w, maxx + 1 + pad),
            min(h, maxy + 1 + pad),
        )
    )


def to_rgb_white(img: Image.Image) -> Image.Image:
    if img.mode == "RGBA":
        canvas = Image.new("RGB", img.size, (255, 255, 255))
        canvas.paste(img, mask=img.split()[-1])
        return canvas
    return img.convert("RGB")


def white_to_alpha(img: Image.Image, threshold: int = 250) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (255, 255, 255, 0)
    return rgba


def square_pad(img: Image.Image, margin: int = 24, fill=(255, 255, 255, 255)) -> Image.Image:
    rgba = img.convert("RGBA")
    s = max(rgba.size) + margin
    canvas = Image.new("RGBA", (s, s), fill)
    ox = (s - rgba.size[0]) // 2
    oy = (s - rgba.size[1]) // 2
    canvas.paste(rgba, (ox, oy), mask=rgba.split()[-1])
    return canvas


def main() -> None:
    src = pick_svg()
    browser = find_browser()
    OUT.mkdir(parents=True, exist_ok=True)

    full_svg = src.read_text(encoding="utf-8")
    full_light_svg = lighten_svg(full_svg)
    mark_svg = set_viewbox(full_svg, MARK_VIEWBOX)
    mark_light_svg = lighten_svg(mark_svg)

    shutil.copyfile(src, OUT / "logo.svg")
    (OUT / "logo-light.svg").write_text(full_light_svg, encoding="utf-8")
    (OUT / "logo-mark.svg").write_text(mark_svg, encoding="utf-8")
    (OUT / "logo-mark-light.svg").write_text(mark_light_svg, encoding="utf-8")

    tmp_full = SCRIPTS / "_logo-full.png"
    tmp_full_light = SCRIPTS / "_logo-full-light.png"
    tmp_mark = SCRIPTS / "_logo-mark.png"
    tmp_light = SCRIPTS / "_logo-mark-light.png"
    tmp_svg_full_light = SCRIPTS / "_logo-full-light.svg"
    tmp_svg_mark = SCRIPTS / "_logo-mark.svg"
    tmp_svg_light = SCRIPTS / "_logo-mark-light.svg"

    tmp_svg_full_light.write_text(full_light_svg, encoding="utf-8")
    tmp_svg_mark.write_text(mark_svg, encoding="utf-8")
    tmp_svg_light.write_text(mark_light_svg, encoding="utf-8")

    rasterize(browser, OUT / "logo.svg", tmp_full, 1200, 1600)
    rasterize(
        browser,
        tmp_svg_full_light,
        tmp_full_light,
        1200,
        1400,
        background="#020812",
    )
    rasterize(browser, tmp_svg_mark, tmp_mark, 900, 900)
    rasterize(browser, tmp_svg_light, tmp_light, 900, 900)

    full = to_rgb_white(crop_with_pad(Image.open(tmp_full), pad=36))
    full.save(OUT / "logo.png", "PNG", optimize=True)
    full.save(OUT / "logo-black.png", "PNG", optimize=True)

    full_light = dark_to_alpha(crop_with_pad(Image.open(tmp_full_light), pad=36))
    full_light.save(OUT / "logo-light.png", "PNG", optimize=True)

    mark = to_rgb_white(square_pad(crop_with_pad(Image.open(tmp_mark), pad=28), margin=32))
    mark.save(OUT / "logo-mark.png", "PNG", optimize=True)

    light = white_to_alpha(crop_with_pad(Image.open(tmp_light), pad=28))
    light_sq = square_pad(light, margin=32, fill=(0, 0, 0, 0))
    light_sq.save(OUT / "logo-mark-light.png", "PNG", optimize=True)

    for path in (
        tmp_full,
        tmp_full_light,
        tmp_mark,
        tmp_light,
        tmp_svg_full_light,
        tmp_svg_mark,
        tmp_svg_light,
        SCRIPTS / "_logo-render.html",
        SCRIPTS / "_logo-render.png",
    ):
        if path.exists():
            path.unlink()

    print(
        "source",
        src.name,
        "browser",
        browser.name,
        "logo",
        full.size,
        "logo-light",
        full_light.size,
        "mark",
        mark.size,
        "light",
        light_sq.size,
    )


if __name__ == "__main__":
    main()

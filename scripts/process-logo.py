"""Crop the source Infotainment Academy logo into site assets.

Keeps the original artwork intact (no flood-fill matting). Produces:
- logo.png       full lockup on white
- logo-black.png same, for reference
- logo-mark.png  icon only (book + play + signal) on white
"""

from pathlib import Path

from PIL import Image

SRC = Path(
    r"C:\Users\usamah\.cursor\projects\c-Users-usamah-Documents-Project-infotainment-academy-website\assets\c__Users_usamah_AppData_Roaming_Cursor_User_workspaceStorage_63e06252ec06d92bd5d5cb694bd013fd_images_image-b0c28013-040c-4fcc-8acc-9ac98da468a5.png"
)
OUT = Path(r"C:\Users\usamah\Documents\Project\infotainment-academy-website\public")


def content_bbox(img: Image.Image, threshold: int = 248) -> tuple[int, int, int, int]:
    w, h = img.size
    px = img.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y][:3]
            if r < threshold or g < threshold or b < threshold:
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
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


def find_icon_text_gap(img: Image.Image) -> int:
    """Return y just above the gap between the icon and INFOTAINMENT."""
    w, h = img.size
    px = img.load()
    for y in range(int(h * 0.45), int(h * 0.85)):
        nonwhite = 0
        for x in range(w):
            r, g, b = px[x, y][:3]
            if r < 245 or g < 245 or b < 245:
                nonwhite += 1
        if nonwhite < w * 0.02:
            return y - 2
    return int(h * 0.62)


def square_on_white(img: Image.Image, margin: int = 16) -> Image.Image:
    s = max(img.size) + margin
    canvas = Image.new("RGB", (s, s), (255, 255, 255))
    ox = (s - img.size[0]) // 2
    oy = (s - img.size[1]) // 2
    canvas.paste(img, (ox, oy))
    return canvas


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    flat_full = Image.new("RGB", src.size, (255, 255, 255))
    flat_full.paste(src, mask=src.split()[-1])

    full = crop_with_pad(flat_full, pad=24)
    full.save(OUT / "logo.png", "PNG", optimize=True)
    full.save(OUT / "logo-black.png", "PNG", optimize=True)

    gap_y = find_icon_text_gap(full)
    icon = crop_with_pad(full.crop((0, 0, full.size[0], gap_y)), pad=24)
    mark = square_on_white(icon, margin=16)
    mark.save(OUT / "logo-mark.png", "PNG", optimize=True)

    print("logo", full.size, "mark", mark.size, "gap_y", gap_y)


if __name__ == "__main__":
    main()

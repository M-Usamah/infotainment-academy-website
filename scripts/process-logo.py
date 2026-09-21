"""Crop the source logo tightly; keep the original white field (no destructive matting)."""

from pathlib import Path

from PIL import Image

SRC = Path(
    r"C:\Users\usamah\.cursor\projects\c-Users-usamah-Documents-Project-infotainment-academy-website\assets\c__Users_usamah_AppData_Roaming_Cursor_User_workspaceStorage_63e06252ec06d92bd5d5cb694bd013fd_images_image-b0c28013-040c-4fcc-8acc-9ac98da468a5.png"
)
OUT = Path(r"C:\Users\usamah\Documents\Project\infotainment-academy-website\public")


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    px = img.load()

    # Content bbox: anything not near-paper-white
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10:
                continue
            if r >= 250 and g >= 250 and b >= 250 and max(r, g, b) - min(r, g, b) <= 6:
                continue
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)

    pad = 24
    crop = img.crop(
        (
            max(0, minx - pad),
            max(0, miny - pad),
            min(w, maxx + 1 + pad),
            min(h, maxy + 1 + pad),
        )
    )

    # Flatten onto pure white for a clean plate
    flat = Image.new("RGB", crop.size, (255, 255, 255))
    flat.paste(crop, mask=crop.split()[-1])
    flat.save(OUT / "logo.png", "PNG", optimize=True)

    # Dark preview plate (for reference only)
    dark = Image.new("RGB", crop.size, (0, 0, 0))
    # Keep white plate inset so preview matches site usage
    inset = 0
    dark.paste(flat, (inset, inset))
    dark.save(OUT / "logo-black.png", "PNG", optimize=True)

    print("saved", flat.size)


if __name__ == "__main__":
    main()

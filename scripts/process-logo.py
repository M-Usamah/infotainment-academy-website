from pathlib import Path
from PIL import Image

src = Path(
    r"C:\Users\usamah\.cursor\projects\c-Users-usamah-Documents-Project-infotainment-academy-website\assets\c__Users_usamah_AppData_Roaming_Cursor_User_workspaceStorage_63e06252ec06d92bd5d5cb694bd013fd_images_image-b0c28013-040c-4fcc-8acc-9ac98da468a5.png"
)
out_dir = Path(r"C:\Users\usamah\Documents\Project\infotainment-academy-website\public")

img = Image.open(src).convert("RGBA")
w, h = img.size
pixels = img.load()

corners = [pixels[0, 0], pixels[w - 1, 0], pixels[0, h - 1], pixels[w - 1, h - 1]]
print("corners", corners)


def is_bg(px, tol=28):
    r, g, b, a = px
    if a < 10:
        return True
    mx, mn = max(r, g, b), min(r, g, b)
    if r > 210 and g > 210 and b > 210 and (mx - mn) < 25:
        return True
    for cr, cg, cb, _ca in corners:
        if abs(r - cr) <= tol and abs(g - cg) <= tol and abs(b - cb) <= tol:
            return True
    return False


visited = [[False] * w for _ in range(h)]
stack = []
for x in range(w):
    stack.append((x, 0))
    stack.append((x, h - 1))
for y in range(h):
    stack.append((0, y))
    stack.append((w - 1, y))

while stack:
    x, y = stack.pop()
    if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
        continue
    visited[y][x] = True
    if not is_bg(pixels[x, y]):
        continue
    pixels[x, y] = (0, 0, 0, 0)
    stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

bbox = img.getbbox()
if not bbox:
    raise SystemExit("No content found after bg removal")

pad = 12
l, t, r, b = bbox
l = max(0, l - pad)
t = max(0, t - pad)
r = min(w, r + pad)
b = min(h, b + pad)
cropped = img.crop((l, t, r, b))

transparent_path = out_dir / "logo.png"
cropped.save(transparent_path, "PNG")

black = Image.new("RGBA", cropped.size, (0, 0, 0, 255))
black.alpha_composite(cropped)
black_path = out_dir / "logo-black.png"
black.convert("RGB").save(black_path, "PNG")

print("saved", transparent_path, cropped.size)
print("saved", black_path, black.size)
print("bbox", bbox)

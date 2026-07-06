from PIL import Image
import os

images_to_check = [
    'assets/orange_bottle_transparent.png',
    'assets/red_bottle_transparent.png',
    'assets/yellow_bottle_transparent.png'
]

artifact_dir = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02"

for img_path in images_to_check:
    if os.path.exists(img_path):
        im = Image.open(img_path)
        # Paste onto a white background
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.paste(im, (0, 0), im)
        base_name = os.path.basename(img_path)
        out_path = os.path.join(artifact_dir, f"test_{base_name}")
        bg.save(out_path)
        print(f"Saved white background version of {base_name} to {out_path}")
    else:
        print(f"{img_path} does not exist")

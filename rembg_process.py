from rembg import remove
from PIL import Image
import os

brain_dir = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02"
assets_dir = r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\assets"

images = [
    ("media__1782390508063.jpg", "real_whey.png"),
    ("media__1782390563671.jpg", "real_pistachio.png"),
    ("media__1782390581902.jpg", "real_blueberry.png"),
    ("media__1782390718215.jpg", "real_beetroot.png"),
]

for src_file, dest_file in images:
    src_path = os.path.join(brain_dir, src_file)
    dest_path = os.path.join(assets_dir, dest_file)
    
    print(f"Processing {src_file} -> {dest_file} ...")
    
    with open(src_path, "rb") as f:
        input_data = f.read()
    
    output_data = remove(input_data)
    
    with open(dest_path, "wb") as f:
        f.write(output_data)
    
    # Verify transparency
    img = Image.open(dest_path).convert("RGBA")
    transparent_pixels = sum(1 for px in img.getdata() if px[3] == 0)
    total_pixels = img.width * img.height
    pct = (transparent_pixels / total_pixels) * 100
    print(f"  Done! Size: {img.size}, Transparent: {pct:.1f}%")

print("\nAll images processed successfully!")

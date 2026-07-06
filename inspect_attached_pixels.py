from PIL import Image

coconut_path = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02\media__1782405539163.jpg"
pineapple_path = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02\media__1782405604168.jpg"
watermelon_path = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02\media__1782405623751.jpg"

def inspect_image(path, name):
    try:
        img = Image.open(path)
        print(f"--- {name} ---")
        print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
        # Print first few pixel rows at the top left corner (typical background)
        pixels = []
        for y in range(10):
            row = [img.getpixel((x, y)) for x in range(10)]
            pixels.append(row)
        print("Top-left 10x10 pixels:")
        for r in pixels:
            print(r)
    except Exception as e:
        print(f"Error inspecting {name}: {e}")

inspect_image(coconut_path, "Coconut")
inspect_image(pineapple_path, "Pineapple")
inspect_image(watermelon_path, "Watermelon")

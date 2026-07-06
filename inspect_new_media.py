import os
from PIL import Image

artifact_dir = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02"
new_files = [
    "media__1782384879561.png",
    "media__1782385489190.png",
    "media__1782385610551.jpg",
    "media__1782385648698.jpg",
    "media__1782385762075.jpg"
]

for f in new_files:
    path = os.path.join(artifact_dir, f)
    if os.path.exists(path):
        try:
            img = Image.open(path)
            print(f"{f}: format={img.format}, size={img.size}, mode={img.mode}")
        except Exception as e:
            print(f"Error opening {f}: {e}")
    else:
        print(f"{f} does not exist")

with open("style.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "hero-visual" in line or "hero-container" in line or "dual-product" in line:
        print(f"Line {idx+1}: {line.strip()}")

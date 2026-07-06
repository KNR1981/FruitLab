with open("index.html", "r", encoding="utf-8") as f:
    html_lines = f.readlines()

for idx, line in enumerate(html_lines):
    if "hero" in line or "visual" in line or "bottle" in line or "style=" in line:
        print(f"Line {idx+1}: {line.strip()}")

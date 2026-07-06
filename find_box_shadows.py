with open("style.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines[:1000]):
    if "box-shadow" in line or "border" in line:
        sel = ""
        for k in range(idx, 0, -1):
            if "{" in lines[k] and "}" not in lines[k]:
                sel = lines[k]
                break
        print(f"Line {idx+1}: {line.strip()} (Selector: {sel.strip()})")

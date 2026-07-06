with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

lines = css_content.splitlines()
for idx, line in enumerate(lines):
    if "border" in line:
        sel = ""
        for k in range(idx, 0, -1):
            if "{" in lines[k] and "}" not in lines[k]:
                sel = lines[k]
                break
        if any(term in sel for term in ["hero", "visual", "container", "product", "bottle", "layer", "particle", "shape"]):
            print(f"Line {idx+1}: {line.strip()} (Selector: {sel.strip()})")

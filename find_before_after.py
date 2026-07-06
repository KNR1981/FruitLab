with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

lines = css.splitlines()
for idx, line in enumerate(lines):
    if "::before" in line or "::after" in line or "background:" in line or "background-color:" in line:
        # check if it relates to hero, container, or visual
        sel = ""
        for k in range(idx, 0, -1):
            if "{" in lines[k] and "}" not in lines[k]:
                sel = lines[k]
                break
        if any(term in sel for term in ["hero", "visual", "container", "body"]):
            print(f"Line {idx+1}: {line.strip()} (Selector: {sel.strip()})")

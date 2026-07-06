with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

lines = css.splitlines()
for idx, line in enumerate(lines):
    if "background" in line:
        # Print the line and the selector above it
        sel = ""
        for k in range(idx, 0, -1):
            if "{" in lines[k] and "}" not in lines[k]:
                sel = lines[k]
                break
        print(f"Line {idx+1}: {line.strip()} (Selector: {sel.strip()})")

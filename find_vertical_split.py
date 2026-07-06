with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Search for any border properties in hero or container styles
lines = css.splitlines()
for idx, line in enumerate(lines):
    if "border" in line and idx < 1200:
        # Check if it is inside hero or visual or container selectors
        # We'll print the selectors above it
        # find the selector block start
        sel_line = ""
        for k in range(idx, 0, -1):
            if "{" in lines[k] and "}" not in lines[k]:
                sel_line = lines[k]
                break
        if any(term in sel_line for term in ["hero", "visual", "container", "body"]):
            print(f"Line {idx+1}: {line.strip()} (Selector block: {sel_line.strip()})")

# Let's also check index.html for any inline borders or columns
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

for idx, line in enumerate(html.splitlines()):
    if "style=" in line and "border" in line:
        print(f"HTML Line {idx+1}: {line.strip()}")

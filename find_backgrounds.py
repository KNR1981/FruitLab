with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Let's search for background, border, or box properties on hero-related classes
lines = css_content.splitlines()
hero_selectors = [".hero", ".visual", ".bottle", ".dual-product", "#hero", ".shape", ".s-"]
for idx, line in enumerate(lines):
    if any(sel in line for sel in hero_selectors):
        # Print surrounding context (3 lines before, 3 lines after)
        start = max(0, idx - 2)
        end = min(len(lines), idx + 4)
        print(f"--- Context for line {idx+1}: {line.strip()} ---")
        for j in range(start, end):
            print(f"  {j+1}: {lines[j]}")

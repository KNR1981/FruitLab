import re

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Find all selectors matching hero-visual, hero-container, hero-text-content, hero-section
pattern = r"([^\n}]+{[^}]+})"
matches = re.findall(pattern, css)

hero_selectors = [".hero-visual", ".hero-container", ".hero-text-content", ".hero-section", ".dual-product-wrapper"]

print("--- Matching CSS Rules ---")
for match in matches:
    # Check if any selector matches
    selector_part = match.split("{")[0]
    if any(sel in selector_part for sel in hero_selectors):
        print(match)
        print("-" * 40)

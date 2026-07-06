import os

# Search for any border, split-screen, or background definitions in all files
files_to_check = ["index.html", "style.css"]

for filename in files_to_check:
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
            
        print(f"=== {filename} matches for 'border' or 'rgba(255' or 'rgba(0,0,0' ===")
        # Look for visual elements and layout containers
        lines = content.splitlines()
        for idx, line in enumerate(lines):
            if any(term in line.lower() for term in ["visual", "glow-ring", "product-wrapper"]):
                if any(x in line for x in ["border", "background", "box-shadow"]):
                    print(f"Line {idx+1}: {line.strip()}")

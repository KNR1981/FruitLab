import re

files = [
    r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\index.html",
    r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\about.html",
    r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\contact.html",
    r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\franchises.html",
]

for path in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # Replace any ?v=N with ?v=10
    new_content = re.sub(r'\?v=\d+', '?v=10', content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Updated: {path}")

print("Cache busters bumped to v10!")

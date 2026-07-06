import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

classes = set(re.findall(r'\.hero-[a-zA-Z0-9_-]+', css))
print("Classes starting with .hero-:")
for c in sorted(classes):
    print(c)

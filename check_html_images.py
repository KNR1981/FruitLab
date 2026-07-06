import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML Image Tags:")
for m in re.finditer(r'<img[^>]*>', html):
    print(m.group(0))

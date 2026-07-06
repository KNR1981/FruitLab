with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
matches = []
for i, line in enumerate(lines):
    if 'dark-mode' in line or 'classList' in line or 'body' in line:
        matches.append(f"{i+1}: {line}")

with open('search_output_dark_mode.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(matches))

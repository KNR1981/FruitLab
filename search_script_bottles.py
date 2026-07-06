with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
matches = []
for i, line in enumerate(lines):
    if 'bottle' in line.lower() or 'left' in line.lower() or 'right' in line.lower() or 'active' in line.lower():
        # exclude data lines which are very long
        if len(line) < 150:
            matches.append(f"{i+1}: {line}")

with open('search_output_bottles.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(matches))

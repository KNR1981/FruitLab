with open('style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'card-item-title' in line:
        print(f"Line {i+1}: {line.strip()}")
        # print 5 lines after
        for idx in range(i+1, min(len(lines), i+6)):
            print(f"  {idx+1}: {lines[idx].strip()}")

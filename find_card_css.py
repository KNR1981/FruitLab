import os

style_path = r"C:\Users\nithi\.gemini\antigravity\scratch\fruit-lab\style.css"
with open(style_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'menu-card' in line or 'card-body' in line or 'card-item-title' in line:
        start = max(0, i - 3)
        end = min(len(lines), i + 8)
        print(f"--- Occurrence at line {i+1} ---")
        for idx in range(start, end):
            print(f"{idx+1}: {lines[idx]}", end="")

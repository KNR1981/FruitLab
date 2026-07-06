import os
import json

log_path = r"C:\Users\nithi\.gemini\antigravity\brain\c09a9828-29f6-4ca3-b220-dbf7760fef02\.system_generated\logs\transcript.jsonl"
lines_to_inspect = [1149, 1153, 1157, 1161]

if os.path.exists(log_path):
    print("Searching log lines...")
    with open(log_path, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            line_num = idx + 1
            if line_num in lines_to_inspect:
                try:
                    obj = json.loads(line)
                    print(f"\n=== LINE {line_num} ===")
                    tcs = obj.get("tool_calls", [])
                    for tc in tcs:
                        if tc.get("name") == "write_to_file":
                            args = tc.get("args", {})
                            print(f"TargetFile: {args.get('TargetFile')}")
                            print("CodeContent:")
                            print(args.get("CodeContent"))
                except Exception as e:
                    print(f"Error parsing line {line_num}: {e}")
else:
    print("Log not found.")

import json
import os

ROOT_DIR = "/home/tim/work/su-thesis-project/validation-project-react"
emotion_ids_path = os.path.join(ROOT_DIR, "src/data/emotion_ids.json")

# Open the JSON file
with open(emotion_ids_path, 'r') as f:
    emotion_abr_to_emotion_id = json.load(f)

emotion_id_to_emotion_abr = dict(zip(emotion_abr_to_emotion_id.values(), emotion_abr_to_emotion_id.keys()))

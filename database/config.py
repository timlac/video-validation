import json
import os

ROOT_DIR = "/home/tim/work/su-thesis-project/validation-project-react"

s3_bucket_name = "validation-experiment-video-files-01"

emotion_abr_to_emotion_id_path = os.path.join(ROOT_DIR, "src/data/emotion_abr_to_emotion_id.json")
# Open the JSON file
with open(emotion_abr_to_emotion_id_path, 'r') as f:
    emotion_abr_to_emotion_id = json.load(f)
emotion_id_to_emotion_abr = dict(zip(emotion_abr_to_emotion_id.values(), emotion_abr_to_emotion_id.keys()))


emotion_id_to_valence_path = os.path.join(ROOT_DIR, "src/data/emotion_id_to_valence.json")
# Open the JSON file
with open(emotion_id_to_valence_path, 'r') as f:
    emotion_id_to_valence = json.load(f)


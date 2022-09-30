import os


class VideoStackHandler:

    VIDEO_DIR = "../../files"

    def __init__(self):
        self.video_paths = os.listdir(self.VIDEO_DIR)

    def pop_video(self):
        return self.video_paths.pop()

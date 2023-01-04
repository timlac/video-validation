class Record:

    def __init__(self, video_id, alias, valence):
        self.video_id = video_id
        self.alias = alias
        self.processed_status = 0
        self.valence = valence
        self.reply = "empty"

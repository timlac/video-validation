import logging
import sys

from database.helpers import name2list, get_filename
from database.metadata.file_metadata import Metadata
from database.metadata.error_file_exception import ErrorFileException

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

# filenames with mixed emotions contains the word mix
# filenames with neutral emotion contains the word neu
special_cases = {
    "mixed_emotions": "mix",
    "neutral_emotion": "neu",
    "error": "e"
}


def get_metadata(filepath):
    """
    :param filepath: used for setting columns like emotion, intensity level etc.
    """
    # filename without extension
    filename = get_filename(filepath)
    name_list = name2list(filename)

    metadata = Metadata(filename=filename, video_id=name_list[0])

    if name_list[1] == special_cases["mixed_emotions"]:
        metadata.set_mixed_emotions(name_list)
    elif name_list[1] == special_cases["neutral_emotion"]:
        metadata.set_neutral_emotion(name_list)
    elif len(name_list) > 4:
        if name_list[4] == special_cases["error"]:
            raise ErrorFileException
        elif name_list[4].startswith("ver"):
            metadata.set_versioned_emotion(name_list)
        else:
            metadata.set_long_name(name_list)
    else:
        metadata.set_default_emotion(name_list)

    metadata.set_emotion_ids()
    return metadata

import boto3
from random import randrange
import json
from boto3.dynamodb.types import TypeSerializer
serializer = TypeSerializer()



from api.aws_services.s3_handler import get_bucket_contents


class Record:

    def __init__(self, video_id, alias, emotion_type):
        self.video_id = video_id
        self.alias = alias
        self.processed_status = 0
        self.emotion_type = emotion_type

dynamodb = boto3.client('dynamodb')

for key in get_bucket_contents():
    record = Record(key, "tim", randrange(3))
    record_json = vars(record)
    record_with_types = serializer.serialize(record_json)

    print(record_with_types["M"])


    # print(record_with_types)

    dynamodb.put_item(TableName="video_validation", Item=record_with_types["M"])



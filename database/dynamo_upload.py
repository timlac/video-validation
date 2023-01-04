import boto3
from random import randrange
from boto3.dynamodb.types import TypeSerializer
from config import s3_bucket_name


from database.record import Record



serializer = TypeSerializer()


def get_bucket_contents():
    s3 = boto3.client("s3")
    bucket_name = s3_bucket_name
    for key in s3.list_objects(Bucket=bucket_name)["Contents"]:
        yield key["Key"]














# TODO: Need some system to store valence of emotion.
# TODO: Every user should have a tag, such that they query only positive or only negative emotions
# TODO: I could use different databases for this to avoid slowdown,
# TODO: this is probably the best option since im out of indices

# TODO: create separate database for example videos.


dynamodb = boto3.client('dynamodb')

i = 0
for key in get_bucket_contents():
    record = Record(key, "Tim", randrange(3))
    record_json = vars(record)
    record_with_types = serializer.serialize(record_json)

    print(record_with_types["M"])

    # print(record_with_types)

    dynamodb.put_item(TableName="example_videos", Item=record_with_types["M"])

    i+=1
    print(i)
    if i > 3:
        break



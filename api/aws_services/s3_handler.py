import boto3


def get_bucket_contents():
    s3 = boto3.client("s3")
    bucket_name = "validation-experiment-video-files-01"
    for key in s3.list_objects(Bucket=bucket_name)["Contents"]:
        yield key["Key"]


iterator = get_bucket_contents()


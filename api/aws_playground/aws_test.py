import boto3
import json

s3 = boto3.client("s3")

bucket_name = "validation-experiment-video-files-01"

for key in s3.list_objects(Bucket=bucket_name)["Contents"]:
    print(key["Key"])

# key = "A327_cont_v_4.mov"
# try:
#     data = s3.get_object(Bucket=bucket, Key=key)
#     print(data)
#     print(data["ResponseMetadata"]["RequestId"])
#
# except Exception as e:
#     print(e)

# def lambda_handler(event, context):
#     bucket = "validation-experiment-video-files-01"
#     key = "A327_cont_v_4.mov"
#
#     try:
#         data = s3.get_object(Bucket=bucket, Key=key)
#
#         json_data = data["Body"].read()
#
#         return {
#             "response_code": 200,
#             "data": str(json_data)
#         }
#     except Exception as e:
#         print(e)
#         raise e
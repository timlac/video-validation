import boto3


# Get the service resource
sqs = boto3.resource('sqs')

# Get the queue
queue = sqs.get_queue_by_name(QueueName='test')

messages = queue.receive_messages(MaxNumberOfMessages=1)
message = messages.pop()
message.delete()
print(message.body)

messages = queue.receive_messages(MaxNumberOfMessages=1)
message = messages.pop()
message.delete()
print(message.body)

messages = queue.receive_messages(MaxNumberOfMessages=1)
message = messages.pop()
message.delete()

print(message.body)


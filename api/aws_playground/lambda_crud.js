const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "video_validation"


exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    switch (event.routeKey) {
      case "GET /items/{alias}":
        body = await dynamo.get({
          KeyConditionExpression: "alias = :alias and processed_status = :processed_status",
          ExpressionAttributeValues: {
                ":alias": event.pathParameters.alias,
                ":processed_status": 0
            },
          IndexName: "alias-processed_status-index",
          TableName: tableName,
          Limit: 1
        }).promise();
        break;
      case "GET /items":
        body = await dynamo.scan({ TableName: tableName}).promise();
        break;
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: tableName,
            Item: {
              video_id: requestJSON.video_id,
              alias: requestJSON.alias,
              processed_status: requestJSON.processed_status,
              emotion_type: requestJSON.emotion_type
            }
          })
          .promise();
        body = `Put item ${requestJSON.video_id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

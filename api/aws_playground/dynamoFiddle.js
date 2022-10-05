const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "video_validation";

// Scan table for all items using the Document Client
async function scanForResultsDdbDc(){
    try {
        const params = {
            TableName: tableName
        };
        const result = await dynamo.scan(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}

async function logSingleItemDdbDc(){
    try {
        const params = {
            Key: {
             "alias": "tim",
             "status": 0
            },
            TableName: tableName
        };
        const result = await dynamo.get(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}

async function queryAliasAndStatus(){
    try {
        const params = {
            KeyConditionExpression: "alias = :alias and processed_status = :processed_status",
            ExpressionAttributeValues: {
                ":alias": "tim",
                ":processed_status": 0
            },
            IndexName: "alias-processed_status-index",
            TableName: tableName,
            Limit: 1
        };
        const result = await dynamo.query(params).promise()
        console.log(JSON.stringify(result))
        return result
    } catch (error) {
        console.error(error);
    }
}


async function putItem(video_id) {
    try {
        const result = await dynamo.put({
            TableName: tableName,
            Item: {
                alias: "tim",
                video_id: video_id,
                processed_status: 1
            }
            }
        ).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}

async function f() {
    let resp = await queryAliasAndStatus()
    console.log(resp)
    let video_id = resp["Items"][0]["video_id"]

    await putItem(video_id)

    resp = await queryAliasAndStatus()
    console.log(resp)
}

f()


// queryAliasAndStatus().then(response => console.log(response))
// console.log(ret)

// queryAliasAndStatus()
//     .then(putItem()
//         .then(queryAliasAndStatus()))


        //
        // let requestJSON = JSON.parse(event.body);
        // await dynamo
        //   .put({
        //     TableName: tableName,
        //     Item: {
        //       video_id: requestJSON.video_id,
        //       alias: requestJSON.alias,
        //       status: requestJSON.status
        //     }
        //   })
        //   .promise();
        // body = `Put item ${requestJSON.video_id}`;


// queryAliasAndStatus()
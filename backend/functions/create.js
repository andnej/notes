import handler from "../util/handler";
import * as uuid from "uuid";
import AWS from "aws-sdk";
import dynamodb from "../util/dynamodb";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            userId: "123",
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        },
    };

    await dynamodb.put(params);

    return params.Item;
});
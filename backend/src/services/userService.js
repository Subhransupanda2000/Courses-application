// src/services/userService.js
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../config/awsClient");

async function createUser(user) {
  await ddb.send(
    new PutCommand({
      TableName: "Users",
      Item: user,
    })
  );
}

module.exports = { createUser };

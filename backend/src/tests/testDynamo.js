const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../config/aws"); // adjust path

async function testDynamo() {
  await ddb.send(
    new PutCommand({
      TableName: "Users", // EXACT table name from AWS
      Item: {
        id: "1",
        name: "Subhransu",
        role: "Developer",
      },
    })
  );

  console.log("✅ DynamoDB connected successfully");
}

testDynamo().catch(console.error);

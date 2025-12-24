const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { S3Client } = require("@aws-sdk/client-s3");

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION })
);

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "https://s3.us-east-1.amazonaws.com",
});
// const getImageUrl = async (key) => {
//   const command = new GetObjectCommand({
//     Bucket: "ekalakaar-node-bucket-123",
//     Key: key,
//   });
// };
module.exports = { ddb, s3 };

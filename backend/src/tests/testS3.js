const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../config/aws");

async function testS3() {
  await s3.send(
    new PutObjectCommand({
      Bucket: "ekalakaar-node-bucket-123",
      Key: "hello.txt",
      Body: "Hello from Node + AWS",
      ContentType: "text/plain",
    })
  );

  console.log("✅ S3 connected successfully");
}

testS3();

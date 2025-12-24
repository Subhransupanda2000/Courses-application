// src/services/uploadService.js
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../config/awsClient");

async function uploadFile(buffer, fileName) {
  return s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
    })
  );
}

module.exports = { uploadFile };

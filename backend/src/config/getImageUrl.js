import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export const getImageUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "ekalakaar-node-bucket-123",
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

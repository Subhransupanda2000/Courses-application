const { GetCommand } = require("@aws-sdk/lib-dynamodb");

const crypto = require("crypto");
const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { ddb } = require("../config/aws");
const { s3 } = require("../config/aws");

/**
 * GET /courses
 */
const getCourses = async (req, res) => {
  try {
    const data = await ddb.send(
      new ScanCommand({
        TableName: "Courses",
      })
    );

    res.json(data.Items || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
// Get course by id

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await ddb.send(
      new GetCommand({
        TableName: "Courses",
        Key: {
          id: id,
        },
      })
    );

    if (!data.Item) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(data.Item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

/**
 * POST /courses (ADMIN)
 * multipart/form-data
 */
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ message: "Title & image required" });
    }

    const courseId = crypto.randomUUID();
    const fileExt = file.originalname.split(".").pop();

    // 🔹 S3 object key
    const s3Key = `courses/${courseId}.${fileExt}`;
    console.log("REQ FILE 👉", req.file);
    console.log("REQ BODY 👉", req.body);

    // 1️⃣ Upload image to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: "ekalakaar-node-bucket-123",
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // 2️⃣ Save course in DynamoDB (image stored in SK)
    await ddb.send(
      new PutCommand({
        TableName: "Courses",
        Item: {
          id: courseId, // PK
          SK: `IMAGE#${s3Key}`, // ✅ image stored in SK
          title,
          description,
          imageKey: s3Key, // optional (good for clarity)
          GSI1PK: "COURSE",
          GSI1SK: courseId,
          createdAt: new Date().toISOString(),
        },
      })
    );

    res.status(201).json({
      message: "Course created",
      courseId,
      imageKey: s3Key,
    });
  } catch (err) {
    //
    console.error("CREATE COURSE ERROR ⛔", err);
    console.error("ERROR MESSAGE:", err.message);
    console.error("ERROR STACK:", err.stack);

    res.status(500).json({
      message: "Course creation failed",
      error: err.message, // 👈 expose temporarily
    });
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
};

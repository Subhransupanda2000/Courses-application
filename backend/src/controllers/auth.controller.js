const bcrypt = require("bcryptjs");
const { ScanCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddb } = require("../config/aws");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const userId = crypto.randomUUID();
    console.log(userId);

    await ddb.send(
      new PutCommand({
        TableName: "Users",
        Item: {
          id: userId,
          SK: "PROFILE",
          email,
          password: await bcrypt.hash(password, 10),
          role: role,
        },
      })
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    console.log("login started");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 1️⃣ Fetch user
    const result = await ddb.send(
      new ScanCommand({
        TableName: "Users",
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
    );

    if (!result.Items || result.Items.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.Items[0];

    // 2️⃣ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send token
    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  signup,
  login,
};

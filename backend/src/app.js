const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ✅ THESE MUST BE FUNCTIONS (routers)
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

module.exports = app;

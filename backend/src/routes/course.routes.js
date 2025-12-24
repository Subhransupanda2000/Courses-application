const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../config/multer");

router.get("/", courseController.getCourses);

// ❗ THIS LINE IS FAILING
router.post("/create", upload.single("image"), courseController.createCourse);
router.get("/:id", courseController.getCourseById);

module.exports = router;

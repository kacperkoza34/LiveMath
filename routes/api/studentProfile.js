const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const StudentProfile = require("../../models/StudentProfile");
const Teacher = require("../../models/Teacher");
const TeacherProfile = require("../../models/TeacherProfile");
const Class = require("../../models/Class");

const TaskBoolean = require("../../models/TaskBoolean");
const TaskOpen = require("../../models/TaskOpen");
const TaskClose = require("../../models/TaskClose");

const authStudent = require("../../middleware/authStudent");
const authTeacher = require("../../middleware/authTeacher");

// @route   GET api/profile/student/:id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    let students = await StudentProfile.findOne({ user: req.params.id });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    let students = await StudentProfile.findOne({ user: req.user.id }).populate(
      "teacher.teacher"
    );
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

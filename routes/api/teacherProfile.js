const express = require("express");
const request = require("request");
const config =
  process.env.NODE_ENV === "production"
    ? require("config-heroku")
    : require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const TeacherProfile = require("../../models/TeacherProfile");
const Class = require("../../models/Class");

const authStudent = require("../../middleware/authStudent");
const authTeacher = require("../../middleware/authTeacher");

// @route   GET api/profile/teacher/me
// @desc    Get current user profile
// @access  Private

router.get("/me", authTeacher, async (req, res) => {
  try {
    let teacher = await TeacherProfile.findOne({ user: req.user.id })
      .populate("inviter")
      .populate("invitedByMe.user")
      .select("-students")
      .select("-classes")
      .select("-user");
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: "Uzytkownik nie istnieje" }] });
  }
});

// @route   GET api/profile/teacher/:id
// @desc    Get profile by id
// @access  Private
router.get("/:id", authTeacher, async (req, res) => {
  try {
    let teacher = await TeacherProfile.findOne({ user: req.params.id });
    if (!teacher) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Uzytkownik nie istnieje" }] });
    }

    const profileView = {
      name: teacher.name,
      invited: teacher.invitedByMe.length,
      classes: teacher.classes.length,
      students: teacher.students.length
    };
    res.json(profileView);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      res.status(400).json({ errors: [{ msg: "Uzytkownik nie istnieje" }] });
    res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;

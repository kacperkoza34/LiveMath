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
    let students = await StudentProfile.findOne({ user: req.params.id })
      .populate("tasksOpen.task", "_id name points")
      .populate("tasksClose.task", "_id name points")
      .populate("tasksBoolean.task", "_id name points");
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

// resolve task open task
router.put(
  "/resolve/open",
  [
    authStudent,
    [
      check("resolved", "Nie określono statusu zadania").exists(),
      check("descriptionRequired", "Nie określono statusu zadania")
        .not()
        .isEmpty(),
      check("_id", "Nie określono statusu zadania").not().isEmpty(),
      check("deadLine", "Nie określono statusu zadania").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    if (req.body.resolved)
      return res
        .status(400)
        .json({ errors: { msg: "Zadanie jest już rozwiązane" } });

    if (Date.parse(req.body.deadLine) < Date.now())
      return res
        .status(400)
        .json({ errors: { msg: "Skończył się czas na rozwiązanie zadania" } });

    if (req.body.descriptionRequired && !req.body.description.length)
      return res
        .status(400)
        .json({ errors: { msg: "Zadanie wymaga dodania opisu" } });
    try {
      let profile = await StudentProfile.findOne({
        user: req.user.id,
      }).populate("tasksOpen.task", "points");
      profile.tasksOpen.map((item) => {
        if (req.body._id.toString() === item._id.toString()) {
          let foo = 1;
          if (parseInt(item.usedPrompts) === 1) foo = 2;
          if (parseInt(item.usedPrompts) === 2) foo = 4;

          let pointsForTask = parseFloat(
            (item.task.points / foo).toPrecision(2)
          );

          profile.points = parseFloat(profile.points) + pointsForTask;

          item.answer = req.body.answer;
          item.description = req.body.description;
          item.result = pointsForTask;
          item.resolved = true;
        }
      });
      await profile.save();
      res.json({ msg: "success" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//resolve close task
router.put(
  "/resolve/close",
  [
    authStudent,
    [
      check("resolved", "Nie określono statusu zadania").exists(),
      check("deadLine", "Nie określono statusu zadania").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    if (req.body.resolved)
      return res
        .status(400)
        .json({ errors: { msg: "Zadanie jest już rozwiązane" } });

    if (Date.parse(req.body.deadLine) < Date.now())
      return res
        .status(400)
        .json({ errors: { msg: "Skończył się czas na rozwiązanie zadania" } });

    try {
      let profile = await StudentProfile.findOne({
        user: req.user.id,
      }).populate("tasksOpen.task", "points");

      profile.tasksClose.map((item) => {
        if (req.body.taskId.toString() === item._id.toString()) {
          let foo = 1;
          if (parseInt(req.body.usedPrompts) === 1) foo = 2;
          if (parseInt(req.body.usedPrompts) === 2) foo = 4;

          let pointsForTask = parseFloat(
            (item.task.points / foo).toPrecision(2)
          );

          profile.points = parseFloat(profile.points) + pointsForTask;

          item.result = pointsForTask;
          item.resolved = true;
        }
        return item;
      });
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

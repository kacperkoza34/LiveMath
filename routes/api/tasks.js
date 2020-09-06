const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const TeacherProfile = require("../../models/TeacherProfile");
const TaskOpen = require("../../models/TaskOpen");
const TaskClose = require("../../models/TaskClose");
const TaskBoolean = require("../../models/TaskBoolean");
const Class = require("../../models/Class");
const StudentProfile = require("../../models/StudentProfile");

const authStudent = require("../../middleware/authStudent");
const authTeacher = require("../../middleware/authTeacher");
const auth = require("../../middleware/auth");
const verifiedTeacher = require("../../middleware/verifiedTeacher");
const sanitize = require("../../middleware/sanitize");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ADD open task
router.post(
  "/open",
  [
    sanitize,
    authTeacher,
    verifiedTeacher,
    [
      check("name", "Podaj nazwę zadania")
        .not()
        .isEmpty(),
      check("class", "Podaj klase od 1 do 8")
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 8 }),
      check("section", "Podaj dział")
        .not()
        .isEmpty()
        .isInt(),
      check("content", "Podaj treść zadania")
        .not()
        .isEmpty(),
      check("model", "Podaj wzór")
        .not()
        .isEmpty(),
      check("points", "Podaj ilość punktów")
        .not()
        .isEmpty()
        .isInt(),
      check("groups", "Podaj grupy")
        .not()
        .isEmpty(),
      check("variables", "Podaj zmienne")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      let profile = await TeacherProfile.findOne({ user: req.user.id });
      let taskName = `${req.body.class}.${req.body.section} ${req.body.name}`;
      let alredyExist = await TaskOpen.findOne({ name: taskName });
      if (alredyExist)
        return res
          .status(400)
          .json({ err: [{ msg: "Zadanie o takiej nazwie już istnieje" }] });

      let task = new TaskOpen({
        name: taskName,
        points: req.body.points,
        class: req.body.class,
        section: req.body.section,
        author: req.user.id,
        data: {
          content: req.body.content,
          model: req.body.model,
          variables: req.body.variables,
          additionalVariables: req.body.additionalVariables,
          groups: req.body.groups
        }
      });
      task.save();
      res.json({ _id: task._id, taskType: "openTask", name: task.name });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/close",
  [
    sanitize,
    authTeacher,
    verifiedTeacher,
    [
      check("name", "Podaj zadania")
        .not()
        .isEmpty(),
      check("class", "Podaj klase od 1 do 8")
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 8 }),
      check("section", "Podaj dział")
        .not()
        .isEmpty(),
      check("groups", "Uzupełnij grupy")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      let profile = await TeacherProfile.findOne({ user: req.user.id });
      let taskName = `${req.body.class}.${req.body.section} ${req.body.name}`;
      let alredyExist = await TaskClose.findOne({ name: taskName });
      if (alredyExist)
        return res
          .status(400)
          .json({ err: [{ msg: "Zadanie o takiej nazwie już istnieje" }] });
      let task = new TaskClose({
        name: taskName,
        content: req.body.content,
        points: req.body.groups.length,
        class: req.body.class,
        section: req.body.section,
        author: req.user.id,
        data: req.body.groups
      });
      task.save();
      res.json({ _id: task._id, taskType: "closeTask", name: task.name });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/boolean",
  [
    authTeacher,
    verifiedTeacher,
    [
      check("name", "Podaj zadania")
        .not()
        .isEmpty(),
      check("class", "Podaj klase od 1 do 8")
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 8 }),
      check("section", "Podaj dział")
        .not()
        .isEmpty(),
      check("groups", "Dodaj grupy")
        .not()
        .isEmpty(),
      check("content", "Podaj treść zadania")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      let profile = await TeacherProfile.findOne({ user: req.user.id });
      let taskName = `${req.body.class}.${req.body.section} ${req.body.name}`;
      let alredyExist = await TaskBoolean.findOne({ name: taskName });
      if (alredyExist)
        return res
          .status(400)
          .json({ err: [{ msg: "Zadanie o takiej nazwie już istnieje" }] });

      let task = new TaskBoolean({
        name: taskName,
        content: req.body.content,
        points: req.body.groups.length,
        class: req.body.class,
        section: req.body.section,
        author: req.user.id,
        data: req.body.groups
      });
      task.save();
      res.json({ _id: task._id, taskType: "booleanTask", name: task.name });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/open/:id", auth, async (req, res) => {
  try {
    let task = await TaskOpen.findOne({ _id: req.params.id });
    if (!task)
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.status(500).send("Server error");
  }
});

router.get("/close/:id", auth, async (req, res) => {
  try {
    let task = await TaskClose.findOne({ _id: req.params.id });
    if (!task)
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.status(500).send("Server error");
  }
});

router.get("/boolean/:id", auth, async (req, res) => {
  try {
    let task = await TaskBoolean.findOne({ _id: req.params.id });
    if (!task)
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res
        .status(400)
        .json({ errors: [{ msg: "Nie ma takiego zadania" }] });
    res.status(500).send("Server error");
  }
});

router.get("/search/:class/:section", authTeacher, async (req, res) => {
  try {
    let taskClose = await TaskClose.find({
      class: req.params.class,
      section: req.params.section
    }).select("-data");
    let taskOpen = await TaskOpen.find({
      class: req.params.class,
      section: req.params.section
    }).select("-data");
    let taskBoolean = await TaskBoolean.find({
      class: req.params.class,
      section: req.params.section
    }).select("-data");

    function compare(a, b) {
      return a.date.getTime() - b.date.getTime();
    }

    const response = [...taskClose, ...taskOpen, ...taskBoolean].sort(compare);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/addOpenTask",
  [
    sanitize,
    authTeacher,
    verifiedTeacher,
    [
      check("classes", "Nie wybrano klas!")
        .not()
        .isEmpty(),
      check("taskId", "Nie wybrano zadania!")
        .not()
        .isEmpty(),
      check("deadLine", "Nie wybrano daty!")
        .not()
        .isEmpty(),
      check("promptsAllowed", "Ustal status podpowiedzi!")
        .not()
        .isEmpty(),
      check("descriptionRequired", "Ustal status opisu!!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      let teacher = await Teacher.findOne({ _id: req.user.id });
      let task = await TaskOpen.findOne({ _id: req.body.taskId });
      const groupsLength = task.data.groups.length;

      req.body.classes.forEach(async (item, i) => {
        let currentClass = await Class.findOne({ _id: item }).populate(
          "students.studentProfile"
        );
        currentClass.tasksOpen.push({
          deadLine: req.body.deadLine,
          promptsAllowed: req.body.promptsAllowed,
          descriptionRequired: req.body.descriptionRequired,
          task: req.body.taskId
        });

        currentClass.students.forEach(async ({ studentProfile }, i) => {
          studentProfile.maxPoints = req.body.points + studentProfile.maxPoints;
          studentProfile.tasksOpen.push({
            date: Date.now(),
            deadLine: req.body.deadLine,
            promptsAllowed: req.body.promptsAllowed,
            descriptionRequired: req.body.descriptionRequired,
            task: req.body.taskId,
            group: getRandomIntInclusive(0, groupsLength - 1),
            messages:
              req.body.message.length > 0
                ? [{ message: req.body.message, author: teacher.name }]
                : []
          });
          await studentProfile.save();
        });
        await currentClass.save();
      });

      res.json("success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/addCloseTask",
  [
    sanitize,
    authTeacher,
    verifiedTeacher,
    [
      check("classes", "Nie wybrano klas!")
        .not()
        .isEmpty(),
      check("taskId", "Nie wybrano zadania!")
        .not()
        .isEmpty(),
      check("deadLine", "Nie wybrano daty!")
        .not()
        .isEmpty(),
      check("descriptionRequired", "Nie wybrano daty!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      let teacher = await Teacher.findOne({ _id: req.user.id });
      console.log(teacher);
      console.log(req.user.id);
      let task = await TaskClose.findOne({ _id: req.body.taskId });

      const answers = {};

      task.data.forEach((item, i) => {
        answers[`${i}`] = "";
      });

      req.body.classes.forEach(async (item, i) => {
        let currentClass = await Class.findOne({ _id: item }).populate(
          "students.studentProfile"
        );
        currentClass.tasksClose.push({
          deadLine: req.body.deadLine,
          task: req.body.taskId,
          descriptionRequired: req.body.descriptionRequired
        });

        currentClass.students.forEach(async ({ studentProfile }, i) => {
          studentProfile.maxPoints = req.body.points + studentProfile.maxPoints;
          studentProfile.tasksClose.push({
            date: Date.now(),
            answer: answers,
            deadLine: req.body.deadLine,
            task: req.body.taskId,
            descriptionRequired: req.body.descriptionRequired,
            messages:
              req.body.message.length > 0
                ? [{ message: req.body.message, author: teacher.name }]
                : []
          });
          await studentProfile.save();
        });
        await currentClass.save();
      });

      res.json("success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/addBooleanTask",
  [
    authTeacher,
    verifiedTeacher,
    [
      check("classes", "Nie wybrano klas!")
        .not()
        .isEmpty(),
      check("taskId", "Nie wybrano zadania!")
        .not()
        .isEmpty(),
      check("deadLine", "Nie wybrano daty!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      req.body.classes.forEach(async (item, i) => {
        let currentClass = await Class.findOne({ _id: item }).populate(
          "students.studentProfile"
        );

        currentClass.tasksBoolean.push({
          deadLine: req.body.deadLine,
          task: req.body.taskId
        });

        let task = await TaskBoolean.findOne({ _id: req.body.taskId });

        const answers = {};
        task.data.forEach((item, i) => {
          answers[`${i}`] = "";
        });

        currentClass.students.forEach(async ({ studentProfile }, i) => {
          studentProfile.maxPoints =
            task.data.length + studentProfile.maxPoints;

          studentProfile.tasksBoolean.push({
            date: Date.now(),
            deadLine: req.body.deadLine,
            answer: answers,
            task: req.body.taskId
          });
          await studentProfile.save();
        });
        await currentClass.save();
      });

      res.json("success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.put("/:taskId", authStudent, async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user: req.user.id });
    profile.tasksOpen.map(item => {
      if (item._id.toString() === req.params.taskId.toString()) {
        item.usedPrompts++;
      }
      return item;
    });
    await profile.save();
    res.json({ msg: "ok" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

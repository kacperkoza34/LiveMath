const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const hbs = require("nodemailer-express-handlebars");
const sanitize = require("../../middleware/sanitize");
require("dotenv").config();

const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const TeacherProfile = require("../../models/TeacherProfile");
const StudentProfile = require("../../models/StudentProfile");

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post(
  "/teacher/:id",
  [
    sanitize,
    [
      check("name", "Imię jest wymagane")
        .not()
        .isEmpty(),
      check("email", "Email jest wymagany").isEmail(),
      check("password", "Hasło powinno zwierać więcej niż 6 liter").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if inviter is verified
      if (req.params.id.toString() !== "firstline") {
        if (!ObjectId.isValid(req.params.id.toString()))
          res.status(401).json({
            err: [{ msg: "Błędny link" }]
          });

        let inviterData = await Teacher.findOne({ _id: req.params.id });

        if (inviterData) {
          if (!inviterData.verified)
            return res.status(401).json({
              err: [{ msg: "Zapraszający nie jest zweryfikowany" }]
            });
        } else {
          return res.status(401).json({
            err: [{ msg: "Błędny link" }]
          });
        }
      }
      // See if user exist
      let user = await Teacher.findOne({ email });

      if (user) {
        return res.status(400).json({
          err: [{ msg: "Użytkownik od tym adresie email już istnieje" }]
        });
      }

      //Get user gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // const sendEmail =
      //   "gmail.com" ===
      //   email
      //     .trim()
      //     .split("")
      //     .splice(email.length - 9, email.length)
      //     .join("")
      //     ? true
      //     : false;

      const sendEmail = false;

      user = new Teacher({
        name,
        email,
        avatar,
        password,
        verified: !sendEmail
      });

      let inviterProfile;
      if (req.params.id.toString() !== "firstline") {
        inviterProfile = await TeacherProfile.findOne({ user: req.params.id });

        if (inviterProfile) {
          inviterProfile.invitedByMe.push({
            user: user._id
          });
          await inviterProfile.save();
        } else
          return res.status(400).json({
            err: [{ msg: "Błędny link" }]
          });
      }

      const inviterId =
        req.params.id.toString() === "firstline" ? user._id : req.params.id;
      userProfile = new TeacherProfile({
        user: user._id,
        name,
        inviter: inviterId,
        invitedByMe: [],
        classes: [],
        students: []
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      await userProfile.save();

      //      ******* Email verification
      if (sendEmail) {
        const tokenData = {
          user: {
            id: user.id
          }
        };

        let verifyToken = await jwt.sign(
          tokenData,
          process.env.verifyJwtSecret,
          {
            expiresIn: 360000
          }
        );

        const mailgun = require("mailgun-js")({
          apiKey: process.env.api_key_mail_gun,
          domain: process.env.mail_gun_domain,
          host: process.env.host
        });

        const data = {
          from: '"LiveMath" <no-reply@livemath.com>', // sender address
          to: email, // list of receivers
          subject: "Potwierdź wiadomość ✔", // Subject line
          html: `<!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <title></title>
        </head>
        <body>
          <h4>Witaj w LiveMath</h4>
          <p>Kliknij w link aby potwierdzić email</p>
          <a href="${process.env.domain}/verify/${verifyToken}" target="_blank"> Potwierdź</a>
        </body>
      </html>`
        };

        await mailgun.messages().send(data);
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          accountType: "teacher"
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, accountType: "teacher" });
        }
      );
    } catch (err) {
      console.error(err);
      if (err.kind == "ObjectId")
        return res.status(400).json({ err: [{ msg: "Błędny link" }] });
      res.status(500).send({ err: [{ msg: "Błąd servera" }] });
    }
  }
);

router.post(
  "/student/:id/:class_id",
  [
    sanitize,
    [
      check("name", "Imię jset wymagane")
        .not()
        .isEmpty(),
      check("email", "Email jest wymagany").isEmail(),
      check("password", "Hasło powinno zwierać więcej niż 6 liter").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exist
      let teacher = await Teacher.findOne({ _id: req.params.id });
      if (!teacher.verified)
        return res.status(401).json({
          err: [{ msg: "Link jest nieaktywny" }]
        });

      let user = await Student.findOne({ email });

      if (user) {
        return res.status(400).json({
          err: [{ msg: "Użytkownik od tym adresie email już istnieje" }]
        });
      }

      //Return error if ids are wrong
      let currentTeacher = await Teacher.findOne({ _id: req.params.id });
      let currentClass = await Class.findOne({ _id: req.params.class_id });
      //Check if teacher owns this class
      if (currentTeacher._id.toString() !== currentClass.teacher.toString()) {
        return res.status(400).json({ err: [{ msg: "Błędny link" }] });
      }
      if (!currentClass.open)
        return res.status(400).json({ err: [{ msg: "Klasa jest zamknięta" }] });
      if (currentClass.students.length === currentClass.maxStudentsAmount)
        return res.status(400).json({ err: [{ msg: "Klasa jest zamknięta" }] });

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new Student({
        name,
        email,
        avatar,
        password
      });

      let userProfile = new StudentProfile({
        user: user._id,
        name,
        teacher: req.params.id,
        class: req.params.class_id
      });

      currentClass.students.push({ studentProfile: userProfile._id });
      await currentClass.save();
      await userProfile.save();

      // Add to inviter profile
      let inviterProfile = await TeacherProfile.findOne({
        user: req.params.id
      });
      inviterProfile.students.push({
        student: user._id
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      await inviterProfile.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          accountType: "student"
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, accountType: "student" });
        }
      );
    } catch (err) {
      if (err.kind == "ObjectId")
        return res.status(400).json({ err: [{ msg: "Błędny link" }] });
      console.error(err.message);
      res.status(500).send({ err: [{ msg: "Błąd servera" }] });
    }
  }
);

/// create profile if email verified
router.post("/:token", sanitize, async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.verifyJwtSecret);
    let user = await Teacher.findOneAndUpdate(
      { _id: decoded.user.id },
      { verified: true }
    );
    res.json(decoded);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ err: [{ msg: "Błedny link" }] });
  }
});

module.exports = router;

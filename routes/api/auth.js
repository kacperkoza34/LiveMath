const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");

const authStudent = require("../../middleware/authStudent");
const authTeacher = require("../../middleware/authTeacher");
const sanitize = require("../../middleware/sanitize");

router.get("/", auth, sanitize, async (req, res) => {
  try {
    let user;
    if (req.user.accountType == "student")
      user = await Student.findById(req.user.id).select("-password");
    else if (req.user.accountType == "teacher")
      user = await Teacher.findById(req.user.id).select("-password");

    res.json({ user, accountType: req.user.accountType });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ err: [{ msg: "Błąd servera" }] });
  }
});

router.post(
  "/",
  sanitize,
  [
    check("email", "Email jest wymagany").isEmail(),
    check("accountType", "Niepoprawne dane").exists(),
    check("password", "Hasło jest wymagane").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    const { email, password, accountType } = req.body;
    try {
      // See if user exist
      let user;
      if (accountType === "student") user = await Student.findOne({ email });
      if (accountType === "teacher") user = await Teacher.findOne({ email });

      if (!user) {
        return res.status(400).json({ err: [{ msg: "Niepoprawne dane" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ err: [{ msg: "Niepoprawne dane" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          accountType
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, accountType });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ err: [{ msg: "Błąd servera" }] });
    }
  }
);

module.exports = router;

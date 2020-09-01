const jwt = require("jsonwebtoken");
const config = require("config");

const Teacher = require("../models/Teacher");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ err: [{ msg: "No token, authorization denied" }] });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    let isTeacher = await Teacher.findOne({ _id: req.user.id });
    if (isTeacher == null)
      res.status(401).json({ err: [{ msg: "Token is not valid" }] });
    next();
  } catch (err) {
    res.status(401).json({ err: [{ msg: "Token is not valid" }] });
  }
};

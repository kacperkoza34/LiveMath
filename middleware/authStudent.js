const jwt = require("jsonwebtoken");
const config = require("config");

const Student = require("../models/Student");

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
    let isStudent = await Student.findOne({ _id: req.user.id });
    if (isStudent == null)
      res.status(401).json({ err: [{ msg: "Token is not valid" }] });
    next();
  } catch (err) {
    res.status(401).json({ err: [{ msg: "Token is not valid" }] });
  }
};

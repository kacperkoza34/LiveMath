const jwt = require("jsonwebtoken");
require("dotenv").config();

const Teacher = require("../models/Teacher");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ err: [{ msg: "No token, authorization denied" }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    let isTeacher = await Teacher.findOne({ _id: req.user.id });
    if (isTeacher == null)
      res.status(401).json({ err: [{ msg: "Token is not valid" }] });
    next();
  } catch (err) {
    res.status(401).json({ err: [{ msg: "Token is not valid" }] });
  }
};

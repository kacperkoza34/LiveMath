const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function(req, res, next) {
  // Get token fro the headre
  const token = req.header("x-auth-token");

  // Check if no token

  if (!token) {
    return res
      .status(401)
      .json({ err: [{ msg: "No token, authorization denied" }] });
  }

  //  Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ err: [{ msg: "Token is not valid" }] });
  }
};

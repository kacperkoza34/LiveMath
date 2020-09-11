const jwt = require("jsonwebtoken");

module.exports = async function(req, res, next) {
  try {
    let teacher = await Teacher.findOne({ _id: req.user.id });
    if (!teacher.verified)
      return res.status(401).json({
        err: [{ msg: "Konto nie zweryfikowane, potwierdź link w emailu" }]
      });
    next();
  } catch (err) {
    res.status(401).json({ err: [{ msg: "Token is not valid" }] });
  }
};

const jwt = require('jsonwebtoken');
const config = require('config');

const Teacher = require('../models/Teacher');

module.exports = async function(req, res, next){
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if no token

  if(!token){
    return res.status(401).json({msg: 'No token, authorization denied'});
  }

  //  Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    let isTeacher = await Teacher.findOne({ _id: req.user.id });
    if(isTeacher == null) res.status(401).json({ msg: 'Token is not valid' });
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

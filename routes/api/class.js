const express =require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const Class = require('../../models/Class');
const TeacherProfile = require('../../models/TeacherProfile');

const authStudent = require('../../middleware/authStudent');
const authTeacher = require('../../middleware/authTeacher');


// POST
// Add new class
router.post('/create', [authTeacher, [
  check('title', 'Podaj nazwe')
    .not()
    .isEmpty()
]]  ,
async (req,res) =>{

  const erros = validationResult(req);
  if(!erros.isEmpty()) {
    return res.status(400).json({errors: erros.array()});
  }

  try {
    let teacherProfile = await TeacherProfile.findOne({ user: req.user.id}).populate('classes.class');
    let titleAlredyExist = false;
    if(teacherProfile.classes.length){
      teacherProfile.classes.forEach((item, i) => {
        if(item.class.title == req.body.title){
          titleAlredyExist = true;
        }
      });
    }

    if(titleAlredyExist) return res.status(401).send({ errors: [ { msg: 'Masz już klase o tej nazwie' } ] });

    let newClass = new Class({
      teacher: req.user.id,
      title: req.body.title,
      task: [],
      students: []
    });

    teacherProfile.classes.push({class: newClass._id});
    await newClass.save();
    await teacherProfile.save();

    res.json(newClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [ { msg: 'Server error' } ] });
  }
});

// PUT
// Close class
router.put('/close/:id', authTeacher , async (req,res) =>{
  try {
    await Class.findOneAndUpdate({ _id: req.params.id}, {open: false});
    res.json({newStatus:false, id: req.params.id});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [ { msg: 'Server error' } ] });
  }
});

// PUT
// Open class
router.put('/open/:id', authTeacher , async (req,res) =>{
  try {
    await Class.findOneAndUpdate({ _id: req.params.id}, {open: true});
    res.json({newStatus:true, id: req.params.id});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [ { msg: 'Server error' } ] });
  }
});


// GET
// Get all classes by id for teacher
router.get('/my', authTeacher , async (req,res) =>{
  try {
    let allClasses = await Class.find({ teacher: req.user.id})
    .populate('students.student', '_id name');
    res.json(allClasses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// PUT
// Put new task to class
router.put('/:id', authTeacher , async (req,res) =>{
  try {
    let currentClass = await Class.findOne({ _id: req.params.id});
    currentClass.task.unshift({ title: req.body.title });
    const response = await currentClass.save();
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET
// Get class by id, with students
router.get('/:id', authTeacher , async (req,res) =>{
  try {
    let singleClass = await Class.findOne({ _id: req.params.id });
    if( singleClass.teacher != req.user.id ){
      return res.status(401).send('It\'s not your class');
    }
    let students = await Student.find({ classId: req.params.id }).select("-password");
    const classView = {
      singleClass,
      students
    }
    res.json(classView);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET
// Get class by id
router.get('/studentview/:id', authStudent , async (req,res) =>{
  try {
    let singleClass = await Class.findOne({ _id: req.params.id });
    if( req.params.id != req.user.classId ){
      return res.status(401).send('It\'s not your class');
    }
    const classView = {
      singleClass
    }
    res.json(classView);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;

const express =require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const TeacherProfile = require('../../models/TeacherProfile');
const TaskOpen = require('../../models/TaskOpen');
const TaskClose = require('../../models/TaskClose');
const TaskBoolean = require('../../models/TaskBoolean');
const Class = require('../../models/Class');
const StudentProfile = require('../../models/StudentProfile');

const authStudent = require('../../middleware/authStudent');
const authTeacher = require('../../middleware/authTeacher');

// ADD open task
router.post('/open', [authTeacher, [
  check('name', 'Podaj zadania')
    .not()
    .isEmpty(),
  check('class', 'Podaj klase od 1 do 8')
    .not()
    .isEmpty()
    .isInt({ min: 1, max: 8 }),
  check('section', 'Podaj dział')
    .not()
    .isEmpty(),
  check('content', 'Podaj treść zadania')
    .not()
    .isEmpty(),
  check('model', 'Podaj wzór')
    .not()
    .isEmpty()
]] , async (req,res) =>{

  const erros = validationResult(req);
  if(!erros.isEmpty()) {
    return res.status(400).json({errors: erros.array()});
  }

  try {
    let alredyExist = await TaskOpen.findOne({ name: req.body.name});
    if(alredyExist) return res.status(400).json({errors: [{msg: 'Zadanie o takiej nazwie już istnieje'}]});

    let task = new TaskOpen({
      name: req.body.name,
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
    res.json({_id:task._id, taskType:'openTask', name: task.name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/close', [authTeacher, [
  check('name', 'Podaj zadania')
    .not()
    .isEmpty(),
  check('class', 'Podaj klase od 1 do 8')
    .not()
    .isEmpty()
    .isInt({ min: 1, max: 8 }),
  check('section', 'Podaj dział')
    .not()
    .isEmpty()
]] , async (req,res) =>{

  const erros = validationResult(req);
  if(!erros.isEmpty()) {
    return res.status(400).json({errors: erros.array()});
  }

  try {
    let alredyExist = await TaskClose.findOne({ name: req.body.name});
    if(alredyExist) return res.status(400).json({errors: [{msg: 'Zadanie o takiej nazwie już istnieje'}]});

    let task = new TaskClose({
      name: req.body.name,
      content: req.body.content,
      points: req.body.data.length,
      class: req.body.class,
      section: req.body.section,
      author: req.user.id,
      data: req.body.data
    });
    task.save();
    res.json({_id:task._id, taskType:'closeTask', name: task.name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/boolean', [authTeacher, [
  check('name', 'Podaj zadania')
    .not()
    .isEmpty(),
  check('class', 'Podaj klase od 1 do 8')
    .not()
    .isEmpty()
    .isInt({ min: 1, max: 8 }),
  check('section', 'Podaj dział')
    .not()
    .isEmpty(),
  check('content', 'Podaj treść zadania')
    .not()
    .isEmpty()
]] , async (req,res) =>{

  const erros = validationResult(req);
  if(!erros.isEmpty()) {
    return res.status(400).json({errors: erros.array()});
  }

  try {
    let alredyExist = await TaskBoolean.findOne({ name: req.body.name});
    if(alredyExist) return res.status(400).json({errors: [{msg: 'Zadanie o takiej nazwie już istnieje'}]});

    let task = new TaskBoolean({
      name: req.body.name,
      content: req.body.content,
      points: req.body.data.length,
      class: req.body.class,
      section: req.body.section,
      author: req.user.id,
      data: req.body.data
    });
    task.save();
    res.json({_id:task._id, taskType:'booleanTask', name: task.name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/open/:id', authTeacher, async (req,res) =>{
  try {
    let task = await TaskOpen.findOne({ _id: req.params.id });
    if(!task) return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.status(500).send('Server error');
  }
});

router.get('/close/:id', authTeacher, async (req,res) =>{
  try {
    let task = await TaskClose.findOne({ _id: req.params.id });
    if(!task) return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.status(500).send('Server error');
  }
});

router.get('/boolean/:id', authTeacher, async (req,res) =>{
  try {
    let task = await TaskBoolean.findOne({ _id: req.params.id });
    if(!task) return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') return res.status(400).json({errors: [{msg: 'Nie ma takiego zadania'}]});
    res.status(500).send('Server error');
  }
});

router.get('/search/:class/:section', authTeacher, async (req,res) =>{
  try {
    let taskClose = await TaskClose.find({ class: req.params.class, section: req.params.section })
      .select("-data");
    let taskOpen = await TaskOpen.find({ class: req.params.class, section: req.params.section })
      .select("-data");
    let taskBoolean = await TaskBoolean.find({ class: req.params.class, section: req.params.section })
      .select("-data");

    function compare(a,b){
      return a.date.getTime() - b.date.getTime();
    }

    const response = [...taskClose,...taskOpen,...taskBoolean].sort(compare);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/addOpenTask', [authTeacher, [
  check('classes', 'Nie wybrano klas!')
    .not()
    .isEmpty(),
  check('taskId', 'Nie wybrano zadania!')
    .not()
    .isEmpty(),
  check('deadLine', 'Nie wybrano daty!')
    .not()
    .isEmpty(),
  check('promptsAllowed', 'Ustal status podpowiedzi!')
    .not()
    .isEmpty(),
  check('descriptionRequired', 'Ustal status opisu!!')
    .not()
    .isEmpty(),
]] , async (req,res) =>{

  const erros = validationResult(req);
  if(!erros.isEmpty()) {
    return res.status(400).json({errors: erros.array()});
  }

  try {

    req.body.classes.forEach( async (item, i) => {
      let currentClass = await Class.findOne({_id: item});
      currentClass.tasksOpen.push({
        deadLine: Date.now(),
        promptsAllowed: req.body.prompts,
        descriptionRequired: req.body.descriptionRequired,
        task: req.body.taskId
      });

      currentClass.students.forEach( async ({student}, i) => {
        let profile = await StudentProfile.findOne({user: student});
        profile.tasksOpen.push({
          deadLine: req.body.deadLine,
          promptsAllowed: req.body.prompts,
          descriptionRequired: req.body.descriptionRequired,
          task: req.body.taskId
        })
        await profile.save();
      });
      await currentClass.save();
    });


    res.json('success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;

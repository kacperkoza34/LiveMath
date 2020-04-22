const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacherProfile'
  },
  title: {
    type: String,
    required: true
  },
  task : [],
  maxStudentsAmount: {
    type: Number,
    default: 35
  },
  open: {
    type: Boolean,
    default: false
  },
  students:[
    {
      student:  {
          type: Schema.Types.ObjectId,
          ref: 'student'
      }
    }
  ]
})

module.exports = Class = mongoose.model('class', ClassSchema);

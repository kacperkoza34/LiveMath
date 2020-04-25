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
  tasksOpen: [
    {
      date: {
        type: Date,
        default: Date.now()
      },
      deadLine: {
        type: Date,
        required: true
      },
      promptsAllowed: {
        type: Boolean,
        default: true
      },
      descriptionRequired: {
        type: Boolean,
        default: true
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskOpen'
      }
    }
  ],
  tasksClose: [
    {
      date: {
        type: Date,
        default: Date.now()
      },
      deadLine: {
        type: Date
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasksClose'
      }
    }
  ],
  tasksBoolean: [
    {
      date: {
        type: Date,
        default: Date.now()
      },
      deadLine: {
        type: Date
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasksBoolean'
      }
    }
  ],
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

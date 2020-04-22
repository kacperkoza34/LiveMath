const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  },
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacherProfile'
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'class'
  },
  points: {
    type: Number,
    default: 0
  },
  tasksOpen: [
    {
      deadLine: {
        type: Date
      },
      promptsAllowed: {
        type: Boolean,
        default: true
      },
      usedPrompts: {
        type: Number,
        max:2
      },
      descriptionRequired: {
        type: Boolean,
        default: true
      },
      toUpdate: {
        type: Boolean,
        default: false
      },
      resolved: {
        type: Boolean,
        default: false
      },
      resolvedInTime: {
        type: Boolean
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taskOpen'
      }
    }
  ],
  tasksClose: [
    {
      deadLine: {
        type: Date
      },
      resolved: {
        type: Boolean,
        default: false
      },
      resolvedInTime: {
        type: Boolean
      },
      result: {
        type: String,
        default: false
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasksClose'
      }
    }
  ],
  tasksBoolean: [
    {
      deadLine: {
        type: Date
      },
      resolved: {
        type: Boolean,
        default: false
      },
      resolvedInTime: {
        type: Boolean
      },
      result: {
        type: String,
        default: false
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasksBoolean'
      }
    }
  ]
});

module.exports = StudentProfile = mongoose.model('studentProfile', StudentProfileSchema);

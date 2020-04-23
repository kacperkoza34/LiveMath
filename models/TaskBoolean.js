const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  taskType: {
    type: String,
    default: 'booleanTask'
  },
  data: [
    {
      content: {
        type: String,
        required: true
      },
      answer: {
        type: Boolean,
        required: true
      }
    }
  ]
})

module.exports = TaskBoolean = mongoose.model('taskBoolean', TaskSchema);

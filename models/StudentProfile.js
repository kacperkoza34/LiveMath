const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacherProfile",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
  },
  points: {
    type: Number,
    default: 0,
  },
  tasksOpen: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      deadLine: {
        type: Date,
      },
      promptsAllowed: {
        type: Boolean,
        default: true,
      },
      usedPrompts: {
        type: Number,
        default: 0,
        max: 2,
      },
      descriptionRequired: {
        type: Boolean,
        default: true,
      },
      toUpdate: {
        type: Boolean,
        default: false,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      resolvedInTime: {
        type: Boolean,
        default: true,
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskOpen",
      },
    },
  ],
  tasksClose: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      deadLine: {
        type: Date,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      resolvedInTime: {
        type: Boolean,
        default: true,
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskClose",
      },
    },
  ],
  tasksBoolean: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      deadLine: {
        type: Date,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      resolvedInTime: {
        type: Boolean,
        default: true,
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskBoolean",
      },
    },
  ],
});

module.exports = StudentProfile = mongoose.model(
  "studentProfile",
  StudentProfileSchema
);

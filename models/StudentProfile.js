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
  maxPoints: {
    type: Number,
    default: 0,
  },
  needReview: {
    type: Boolean,
    default: false,
  },
  tasksOpen: [
    {
      date: {
        type: Date,
        required: true,
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
      description: {
        type: String,
        default: "",
      },
      toUpdate: {
        type: Boolean,
        default: false,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      result: {
        type: Number,
        default: 0,
      },
      answer: {
        type: String,
        default: "",
      },
      taskType: {
        type: String,
        default: "taskOpen",
      },
      group: {
        type: Number,
      },
      messages: [
        {
          author: { type: String },
          message: { type: String },
        },
      ],
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
        required: true,
      },
      deadLine: {
        type: Date,
      },
      toUpdate: {
        type: Boolean,
        default: false,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      result: {
        type: Number,
        default: 0,
      },
      answer: {
        type: Object,
      },
      descriptionRequired: {
        type: Boolean,
        default: true,
      },
      description: {
        type: String,
        default: "",
      },
      taskType: {
        type: String,
        default: "taskClose",
      },
      messages: [
        {
          author: { type: String },
          message: { type: String },
        },
      ],
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
        required: true,
      },
      deadLine: {
        type: Date,
      },
      resolved: {
        type: Boolean,
        default: false,
      },
      result: {
        type: Number,
        default: 0,
      },
      answer: {
        type: Object,
        required: true,
      },
      taskType: {
        type: String,
        default: "taskBoolean",
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

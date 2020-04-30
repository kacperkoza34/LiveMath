const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  taskType: {
    type: String,
    default: "openTask",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  data: {
    content: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    variables: [],
    additionalVariables: [],
    groups: [],
  },
});

module.exports = TaskOpen = mongoose.model("taskOpen", TaskSchema);

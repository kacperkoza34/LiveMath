const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher"
  },
  messages: [
    {
      type: String
    }
  ]
});

module.exports = Messages = mongoose.model("teacher", MessagesSchema);

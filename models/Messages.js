const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  senderAccountType: {
    type: String,
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "senderAccountType"
  },
  recipentAccountType: {
    type: String,
    required: true
  },
  recipentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipentAccountType"
  },
  newMessages: {
    type: Boolean,
    default: 0
  },
  messages: [
    {
      date: {
        type: Date,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "sender"
      }
    }
  ]
});

module.exports = Messages = mongoose.model("messages", MessagesSchema);

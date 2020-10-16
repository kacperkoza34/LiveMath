const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher"
  },
  name: {
    type: String,
    required: true
  },
  inviter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher"
  },
  invitedByMe: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
      }
    }
  ],
  classes: [
    {
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class"
      }
    }
  ],
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
      }
    }
  ]
});

module.exports = TeacherProfile = mongoose.model(
  "teacherProfile",
  TeacherProfileSchema
);

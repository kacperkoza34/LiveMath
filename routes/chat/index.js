const socket = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const TeacherProfile = require("../../models/TeacherProfile");

module.exports = class Chat {
  constructor(server) {
    this.io = socket(server);
    this.activeUsers = [];

    this.initConnection();
  }

  initConnection() {
    this.io.use((socket, next) => {
      socket.on("auth", async ({ token }) => {
        try {
          const decoded = jwt.verify(token, process.env.jwtSecret);

          let user;
          const isTeacher = decoded.user.accountType == "teacher";

          if (isTeacher) {
            user = await Teacher.findById(decoded.user.id).select("-password");
          } else {
            user = await Student.findById(decoded.user.id).select("-password");
          }

          const isConnected = this.activeUsers.some(
            ({ userId }) => userId === decoded.user.id
          );

          if (!isConnected) {
            this.activeUsers.push({
              name: user.name,
              socketId: socket.id,
              userId: decoded.user.id,
              accountType: decoded.user.accountType
            });
          }
        } catch (e) {
          this.io.to(socket.id).emit("error", { error: "No authorization" });
        }
      });
      next();
    });

    this.io.on("connection", socket => {
      socket.on("askAboutStudents", async ({ token }) => {
        try {
          const decoded = jwt.verify(token, process.env.jwtSecret);

          const students = await TeacherProfile.findOne({
            user: decoded.user.id
          })
            .select("students")
            .populate("students.student", "name");

          const response = [];

          students.students.forEach(({ student: { _id, name } }) => {
            response.push({
              _id,
              name,
              active: this.activeUsers.some(({ userId }) => _id == userId)
            });
          });

          this.io.to(socket.id).emit("getStudents", response);
        } catch (e) {
          console.log(e);
          this.io.to(socket.id).emit("error", { error: "No authorization" });
        }
      });

      socket.on("askAboutTeacher", async ({ token }) => {
        try {
          const decoded = jwt.verify(token, process.env.jwtSecret);

          let teacher = await StudentProfile.findOne({
            user: decoded.user.id
          }).select("teacher");

          teacher = await TeacherProfile.findOne({
            user: teacher.teacher
          }).select("name user");

          const isTeacherActive = this.activeUsers.some(
            ({ userId }) => teacher.user == userId
          );

          teacher.active = isTeacherActive;

          const response = {
            name: teacher.name,
            userId: teacher.user,
            active: isTeacherActive
          };

          this.io.to(socket.id).emit("getTeacher", response);
        } catch (e) {
          console.log(e);
          this.io.to(socket.id).emit("error", { error: "No authorization" });
        }
      });

      socket.on("message", ({ message, senderId, recipentId }) => {
        const recipient = this.activeUsers.filter(
          ({ userId, socketId }) => userId === recipentId && senderId !== userId
        );

        if (recipient.length) {
          this.io.to(recipient[0]["socketId"]).emit("message", { message });
        }
      });

      socket.on("disconnect", () => {
        let logedOut;
        this.activeUsers = this.activeUsers.filter(({ socketId, name }) => {
          return socket.id !== socketId;
        });


      });
    });
  }
};

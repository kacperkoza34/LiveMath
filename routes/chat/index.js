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
    this.setMiddleware();
    this.initConnection();
  }

  async askAboutStudents(userId) {
    try {
      const students = await TeacherProfile.findOne({
        user: userId
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

      return response;
    } catch (e) {
      console.log(e);
      this.io.to(socket.id).emit("error", { error: "No authorization" });
    }
  }

  async askAboutTeacher(userId) {
    try {
      let teacher = await StudentProfile.findOne({
        user: userId
      }).select("teacher");

      teacher = await TeacherProfile.findOne({
        user: teacher.teacher
      }).select("name user");

      const isTeacherActive = this.activeUsers.some(
        ({ userId }) => teacher.user == userId
      );

      const response = [
        {
          name: teacher.name,
          _id: teacher.user,
          active: isTeacherActive
        }
      ];
      return response;
    } catch (e) {
      console.log(e);
      this.io.to(socket.id).emit("error", { error: "No authorization" });
    }
  }

  setMiddleware() {
    this.io.use((socket, next) => {
      socket.on("auth", async ({ token }) => {
        try {
          const decoded = jwt.verify(token, process.env.jwtSecret);

          let user;
          let friends;
          const isTeacher = decoded.user.accountType == "teacher";

          if (isTeacher) {
            user = await Teacher.findById(decoded.user.id).select("-password");
            friends = await this.askAboutStudents(decoded.user.id);
          } else {
            user = await Student.findById(decoded.user.id).select("-password");
            friends = await this.askAboutTeacher(decoded.user.id);
          }

          const isAlredyActive = this.activeUsers.some(
            ({ userId }) => userId === decoded.user.id
          );

          this.activeUsers.push({
            name: user.name,
            socketId: socket.id,
            userId: decoded.user.id,
            accountType: decoded.user.accountType,
            friends
          });

          this.updateUsers(friends, decoded.user.id, "markAsActive", true);
          this.io.to(socket.id).emit("authSuccess", {
            users: friends
          });
        } catch (e) {
          console.log(e);
          this.io.to(socket.id).emit("error", { error: "No authorization" });
        }
      });
      next();
    });
  }

  updateUsers(users, updatedUsersId, socketName, newStatus) {
    const usersToUpdate = users.filter(({ active }) => active === true);

    const usersToUpdateFromActiveUsers = this.activeUsers.filter(
      ({ userId }) => {
        return true === usersToUpdate.some(({ _id }) => _id == userId);
      }
    );

    const updatedUsers = usersToUpdateFromActiveUsers.map(item => {
      return {
        ...item,
        friends: item.friends.map(item => {
          if (item._id == updatedUsersId) {
            item.active = !item.active;
            return item;
          }
          return item;
        })
      };
    });

    this.activeUsers = this.activeUsers.filter(({ userId, socketId }) => {
      return (
        false ===
        updatedUsers.some(item => {
          if (item.userId === userId)
            this.io.to(socketId).emit(socketName, { _id: updatedUsersId });

          return item.userId === userId;
        })
      );
    });

    this.activeUsers = [...this.activeUsers, ...updatedUsers];
  }

  initConnection() {
    this.io.on("connection", socket => {
      socket.on("message", ({ message, recipentId, senderId }) => {
        console.log("jest message");
        console.log(message, recipentId, senderId);
        // console.log(message);
        // console.log(recipientId);
        // console.log(senderId);
        const recipient = this.activeUsers.filter(
          ({ userId, socketId }) => userId === recipentId && senderId !== userId
        );
        console.log(this.activeUsers);

        console.log(recipient);
        if (recipient.length) {
          this.io.to(recipient[0]["socketId"]).emit("message", { message });
        }
      });

      socket.on("disconnect", () => {
        this.activeUsers = this.activeUsers.filter(
          ({ socketId, userId: updatedUsersId, friends }) => {
            if (socket.id == socketId) {
              this.updateUsers(
                friends,
                updatedUsersId,
                "markAsNotActive",
                false
              );
            }
            return socket.id !== socketId;
          }
        );
      });
    });
  }
};

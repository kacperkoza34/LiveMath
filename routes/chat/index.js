const socket = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const TeacherProfile = require("../../models/TeacherProfile");
const Messages = require("../../models/Messages");

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

      const response = [
        {
          name: teacher.name,
          _id: teacher.user,
          active: this.activeUsers.some(({ userId }) => teacher.user == userId)
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

  async addMessageToDatabase(message, recipentId, senderId, accountType) {
    try {
      let messages = await Messages.findOne({
        recipentId: recipentId,
        senderId: senderId
      });
      if (!messages) {
        let senderAccountType;
        let recipentAccountType;
        if (accountType === "teacher") {
          senderAccountType = "teacher";
          recipentAccountType = "student";
        } else {
          senderAccountType = "student";
          recipentAccountType = "teacher";
        }
        messages = new Messages({
          senderAccountType,
          recipentAccountType,
          recipentId,
          senderId,
          newMessages: 1,
          messages: [
            {
              content: message,
              date: Date.now()
            }
          ]
        });
      } else {
        messages.newMessages = messages.newMessages + 1;
        messages.messages.push({ date: Date.now(), content: message });
      }

      await messages.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  initConnection() {
    this.io.on("connection", socket => {
      socket.on(
        "message",
        async ({ message, recipentId, senderId, accountType }) => {
          try {
            const success = await this.addMessageToDatabase(
              message,
              recipentId,
              senderId,
              accountType
            );

            const recipent = this.activeUsers.filter(
              ({ userId, socketId }) =>
                userId === recipentId && senderId !== userId
            );
            if (recipent.length) {
              if (!success) message = "Nie udało sie wysłać Wiadomości";
              this.io.to(recipent[0]["socketId"]).emit("message", { message, senderId });
            }
          } catch (e) {}
        }
      );

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

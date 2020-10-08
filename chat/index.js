const socket = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = class Chat {
  constructor(server) {
    this.io = socket(server);
    this.activeUsers = [];

    this.initConnection();
  }

  initConnection() {
    this.io.use((socket, next) => {
      socket.on("auth", async ({ token }) => {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        let user;
        if ((decoded.accountType = "teacher")) {
          user = await Teacher.findById(decoded.user.id).select("-password");
        } else {
          user = await Student.findById(decoded.user.id).select("-password");
        }
        const isConnected = this.activeUsers.some(
          ({ socketId }) => socketId == socket.id
        );

        if (!isConnected)
          this.activeUsers.push({
            name: user.name,
            socketId: socket.id,
            userId: decoded.user.id
          });
      });
      next();
    });

    this.io.on("connection", socket => {
      socket.on("message", ({ message, token }) => {
        console.log(message, token);

        const recipient = this.activeUsers.filter(
          ({ userId }) => userId === token
        );

        console.log(recipient);
        //console.log(token);
        //this.io.to(token).emit("message", { message });
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

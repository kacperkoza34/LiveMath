const express = require("express");
const connectDB = require("./db");
const path = require("path");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const config =
  process.env.NODE_ENV === "production"
    ? require("config-heroku")
    : require("config");

const domain = config.get("domain");

connectDB();

app.use(helmet());

app.use(
  cors({
    origin: domain, //origin sets domains that we approve
    methods: "GET,POST,DELETE,PUT"
  })
);

app.enable("trust proxy");

if (process.env.NODE_ENV === "production") {
  app.use(function(req, res, next) {
    if (!req.secure) {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  });
}
// Init Middleware

app.use(express.json({ extended: false }));

// Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/teacher/profile", require("./routes/api/teacherProfile"));
app.use("/api/student/profile", require("./routes/api/studentProfile"));

app.use("/api/tasks", require("./routes/api/tasks"));

app.use("/api/class", require("./routes/api/class"));

// Server static assets in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

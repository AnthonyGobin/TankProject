const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const spawn = require("child_process").spawn;
const ls = spawn("python", ["Drivingscripts.py", "arg1", "arg2"]);

app.use(index);

const commands = (cmd) => {};

io.on("connection", (socket) => {
  socket.on("command", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

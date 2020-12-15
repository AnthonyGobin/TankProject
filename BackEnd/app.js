const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const tank = require("./drive");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://192.168.0.42:3000",
    methods: ["GET", "POST"],
  },
});


const videoStream = require('./videoStream');
  videoStream.acceptConnections(app, {
          width: 1280,
          height: 720,
          fps: 16,
          encoding: 'JPEG',
          quality: 7 // lower is faster, less quality
      }, 
      '/stream.mjpg', true);
app.use(express.static(__dirname+'/public'));

app.use(index);

const commands = (cmd) => {
  switch(cmd){
    case 'right':
      tank.right()
      break
    case 'left':
      tank.left()
      break
    case 'forward':
      tank.forward()
      break
    case 'backward':
      tank.backward()
      break
    case 'stop':
      tank.stop()
      break
    default:
      break
  }
};

io.on("connection", (socket) => {
  socket.on("command", (data) => {
    commands(data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

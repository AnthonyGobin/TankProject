import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

const io = socketIOClient(ENDPOINT, {
  "Access-Control-Allow-Credentials": true,
});

const handleClick = (cmd) => {
  console.log(cmd);
  io.emit("command", cmd);
};

function App() {
  useEffect(() => {
    return () => {
      io.disconnect();
    };
  });

  return (
    <>
      <img src="http://192.168.0.42:3030/stream.mjpg" alt="stream"/>
      <button className="controls" onMouseDown={() => handleClick("forward")} onMouseUp={() => handleClick("Stop")}>
        Forward
      </button>
      <button className="controls" onMouseDown={() => handleClick("backward")} onMouseUp={() => handleClick("Stop")}>
        Backward
      </button>
      <button className="controls" onMouseDown={() => handleClick("left")} onMouseUp={() => handleClick("Stop")}>
        Left
      </button>
      <button className="controls" onMouseDown={() => handleClick("right")} onMouseUp={() => handleClick("Stop")}>
        Right
      </button>
    </>
  );
}

export default App;

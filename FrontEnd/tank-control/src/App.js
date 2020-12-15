import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "192.168.0.42:4001";

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
      <img src="http://192.168.0.42:4001/stream.mjpg" alt="stream"/>
      <button className="controls" onMouseDown={() => handleClick("forward")} onMouseUp={() => handleClick("stop")}>
        Forward
      </button>
      <button className="controls" onMouseDown={() => handleClick("backward")} onMouseUp={() => handleClick("stop")}>
        Backward
      </button>
      <button className="controls" onMouseDown={() => handleClick("left")} onMouseUp={() => handleClick("stop")}>
        Left
      </button>
      <button className="controls" onMouseDown={() => handleClick("right")} onMouseUp={() => handleClick("stop")}>
        Right
      </button>
    </>
  );
}

export default App;

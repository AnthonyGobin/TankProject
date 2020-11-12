import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

const io = socketIOClient(ENDPOINT, {
  "Access-Control-Allow-Credentials": true,
});

const handleClick = (cmd) => {
  io.emit("command", cmd);
};

function App() {
  useEffect(() => {
    return () => {
      io.disconnect();
    };
  });

  document.addEventListener("mouseup", () => handleClick("Stop"));
  return (
    <>
      <button className="controls" onMouseDown={() => handleClick("forward")}>
        Forward
      </button>
      <button className="controls" onMouseDown={() => handleClick("backward")}>
        Backward
      </button>
      <button className="controls" onMouseDown={() => handleClick("left")}>
        Left
      </button>
      <button className="controls" onMouseDown={() => handleClick("right")}>
        Right
      </button>
    </>
  );
}

export default App;

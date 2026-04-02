import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      setMessage("Connection successful");
    };

    ws.onclose = () => {
      setMessage("Connection closed");
    };

    ws.onerror = (err) => {
      console.log("Error:", err);
    };

    return () => {
      ws.close();
      console.log("Socket closed");
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default App;

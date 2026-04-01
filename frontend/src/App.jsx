import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [res, setRes] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("✅ Connected to server");
    };

    ws.onmessage = (event) => {
      if (event.data) {
        setRes(event.data);
      } else {
        console.log("no data sent");
      }
    };

    ws.onclose = () => {
      console.log("❌ Disconnected");
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage(""); // clear input after sending
    } else {
      console.log("⚠️ Socket not connected yet");
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;

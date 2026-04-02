import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      setMessage("Connection successful");
      setLoading(true);

      ws.send("what is computer");
    };

    ws.onmessage = (event) => {
      setResponse(event.data);
      setLoading(false);
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

      {loading ? <p>⏳ AI is thinking...</p> : <h2>{response}</h2>}
    </div>
  );
};

export default App;

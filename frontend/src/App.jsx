import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [query, setquery] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const ws = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    ws.current.onopen = () => {
      setMessage("connected now");
    };

    ws.current.onmessage = (event) => {
      // 🔥 replace last loading message with real response
      setChat((prev) => {
        const updated = [...prev];

        // remove last loading message
        if (updated.length && updated[updated.length - 1].loading) {
          updated.pop();
        }

        updated.push({
          role: "bot",
          text: event.data,
        });

        return updated;
      });
    };

    ws.current.onerror = () => {
      console.log("error");
    };

    ws.current.onclose = () => {
      setMessage("connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  // 🔥 auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  function handleSubmit() {
    if (!query.trim()) return;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // 1. add user message
      setChat((prev) => [
        ...prev,
        { role: "user", text: query },

        // 2. add loading message
        { role: "bot", text: "Typing...", loading: true },
      ]);

      ws.current.send(query);
      setquery("");
    } else {
      console.log("WebSocket not connected");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>{message}</h2>

      <div
        style={{
          width: "500px",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chat.map((ele, i) => (
          <div
            key={i}
            style={{
              textAlign: ele.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                background: ele.role === "user" ? "#DCF8C6" : "#eee",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
                maxWidth: "70%",
              }}
            >
              {ele.text}
            </span>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        placeholder="Type a message..."
      />

      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        Send
      </button>
    </div>
  );
};

export default App;

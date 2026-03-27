import React, { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  async function handleRequest() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart");
      const result = await res.json();
      setMessage(result.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleRequest}>get</button>
    </div>
  );
};

export default App;

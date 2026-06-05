import { useState } from "react";
import "./AIPage.css";

function AIPage() {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
    };

    const aiMsg = {
      text: "Hello! I am Sarathi-X AI Assistant.",
      sender: "ai",
    };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="ai-container">

      <div className="sidebar">
        <h2>Sarathi-X</h2>

        <button className="new-chat">
          + New Chat
        </button>

        <div className="history">
          <p>Recent Chat 1</p>
          <p>Recent Chat 2</p>
        </div>
      </div>

      <div className="chat-section">

        <div className="header">
          Sarathi-X AI Assistant
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default AIPage;
function AISection() {
  return (
    <section className="section">
      <h2>AI Learning Assistant</h2>

      <input
        type="text"
        placeholder="Ask your coding question here..."
        className="ai-input"
      />

      <div className="btn-group">
        <button>Ask AI</button>
        <button>Clear Chat</button>
      </div>
    </section>
  );
}

export default AISection;
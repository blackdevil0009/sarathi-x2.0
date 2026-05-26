import React, { useState } from "react";

const AISection = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = () => {

    if (question.toLowerCase().includes("ai")) {
      setAnswer(
        "Artificial Intelligence is technology that allows machines to think and learn."
      );
    }

    else if (question.toLowerCase().includes("java")) {
      setAnswer(
        "Java is a popular object-oriented programming language."
      );
    }

    else {
      setAnswer("Sorry, I am still learning.");
    }
  };

  return (
    <section id="ai" className="section">
      <h2>AI Assistant</h2>

      <div className="ai-box">
        <input
          type="text"
          placeholder="Ask any question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={getAnswer}>Ask AI</button>

        <p>{answer}</p>
      </div>
    </section>
  );
};

export default AISection;
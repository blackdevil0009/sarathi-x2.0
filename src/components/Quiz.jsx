import React, { useState } from "react";

const Quiz = () => {

  const questions = [
    {
      question: "What is AI?",
      options: ["Artificial Intelligence", "Data", "Network", "Computer"],
      answer: "Artificial Intelligence",
    },
  ];

  const [score, setScore] = useState(0);

  const checkAnswer = (option) => {
    if (option === questions[0].answer) {
      setScore(score + 1);
    }
  };

  return (
    <section id="quiz" className="section">
      <h2>Quiz Section</h2>

      <div className="quiz-box">
        <h3>{questions[0].question}</h3>

        {questions[0].options.map((option, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(option)}
            className="quiz-btn"
          >
            {option}
          </button>
        ))}

        <h3>Score: {score}</h3>
      </div>
    </section>
  );
};

export default Quiz;
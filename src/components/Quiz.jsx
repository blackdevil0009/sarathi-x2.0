import { useState } from "react";
import "./Quiz.css";

function Quiz() {

  const questions = [
    {
      question: "What is AI?",
      options: [
        "Artificial Intelligence",
        "Automatic Internet",
        "Advanced Input",
        "None"
      ],
      answer: "Artificial Intelligence"
    },

    {
      question: "Which language is used in React?",
      options: ["Python", "Java", "JavaScript", "C"],
      answer: "JavaScript"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {

    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      alert("Quiz Completed");
    }
  };

  return (
    <div className="quiz-container">

      <div className="quiz-box">

        <h1>Quiz Section</h1>

        <h2>{questions[current].question}</h2>

        <div className="options">

          {questions[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}

        </div>

        <h3>Score: {score}</h3>

      </div>

    </div>
  );
}

export default Quiz;
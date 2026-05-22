function Quiz() {
  return (
    <section id="quiz">
      <h1 className="title">Quiz Section</h1>

      <div className="grid">

        <div className="card">
          <h3>Java Quiz</h3>
          <p>Practice Java MCQs and improve coding knowledge.</p>
          <button className="btn">Start Quiz</button>
        </div>

        <div className="card">
          <h3>OS Quiz</h3>
          <p>Test operating system concepts with smart quizzes.</p>
          <button className="btn">Start Quiz</button>
        </div>

        <div className="card">
          <h3>DBMS Quiz</h3>
          <p>Learn database concepts with interactive tests.</p>
          <button className="btn">Start Quiz</button>
        </div>

      </div>
    </section>
  );
}

export default Quiz;
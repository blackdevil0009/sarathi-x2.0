import React, { useState } from "react";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = () => {
    if (code.trim() === "") {
      setOutput("Please write some code...");
    } else {
      setOutput("Code Executed Successfully ✅");
    }
  };

  return (
    <section id="compiler" className="compiler-section">
      <h1>Online Code Compiler</h1>

      <p className="compiler-text">
        Practice coding directly on Sarathi-X. Write code, test logic,
        and improve programming skills in a simple coding environment.
      </p>

      <textarea
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <button onClick={runCode}>Run Code</button>

      <div className="output-box">
        <h3>Output</h3>
        <p>{output}</p>
      </div>
    </section>
  );
};

export default Compiler;
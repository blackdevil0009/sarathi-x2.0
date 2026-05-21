function Compiler() {
  return (
    <section className="section">
      <h2>Online Compiler</h2>

      <textarea
        className="code-box"
        placeholder="Write your code here..."
      ></textarea>

      <div className="btn-group">
        <button>Run Code</button>
        <button>Clear</button>
        <button>Save Program</button>
      </div>
    </section>
  );
}

export default Compiler;
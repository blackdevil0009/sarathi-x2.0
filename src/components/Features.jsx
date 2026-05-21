function Features() {
  const data = [
    "Online Compiler",
    "Quiz Module",
    "AI Assistant",
    "Student Dashboard",
    "Responsive Design",
    "Learning Resources",
  ];

  return (
    <section className="section">
      <h2>Features</h2>

      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item}</h3>
            <p>Powerful feature for students learning.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
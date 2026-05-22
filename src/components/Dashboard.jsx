function Dashboard() {
  return (
    <section>
      <h1 className="title">Student Dashboard</h1>

      <div className="grid">

        <div className="card">
          <h3>85%</h3>
          <p>Quiz Performance</p>
        </div>

        <div className="card">
          <h3>120+</h3>
          <p>Completed Lessons</p>
        </div>

        <div className="card">
          <h3>40+</h3>
          <p>AI Sessions</p>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;
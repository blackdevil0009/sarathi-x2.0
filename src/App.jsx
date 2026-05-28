import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import AISection from "./components/AISection";
import Quiz from "./components/Quiz";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="ai">
        <AISection />
      </section>

      <section id="quiz">
        <Quiz />
      </section>

      <section id="dashboard">
        <Dashboard />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default App;


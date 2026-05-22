import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Quiz from "./components/Quiz";
import AISection from "./components/AISection";
import Dashboard from "./components/Dashboard";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Quiz />
      <AISection />
      <Dashboard />
      <HowItWorks />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
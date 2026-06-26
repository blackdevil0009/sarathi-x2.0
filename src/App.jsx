import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Compiler from "./components/Compiler";
import AIPage from "./pages/AIPage";
import HowItWork from "./components/HowItWork";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="app">
              <Navbar />

              <section id="home">
                <Hero />
              </section>

              <section id="about">
                <About />
              </section>
              <section id="HowItWork">
                <HowItWork />
              </section>

              <section id="features">
                <Features />
              </section>

            

              <section id="contact">
                <Contact />
              </section>

              <Footer />
            </div>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/ai" element={<AIPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
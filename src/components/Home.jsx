import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import AISection from "./AISection";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <AISection />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
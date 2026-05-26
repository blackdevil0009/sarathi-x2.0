import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AISection from './components/AISection'
import Quiz from './components/Quiz'
import Dashboard from './components/Dashboard'
import Compiler from './components/Compiler'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <AISection />
      <Quiz />
      <Dashboard />
      <Compiler />
      <Contact />
      <Footer />
    </>
  )
}

export default App
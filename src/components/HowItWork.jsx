
import { useState } from "react";
import "./HowItWork.css";

const steps = [
  {
    id: 1,
    title: "Create Account",
    desc: "Sign up and create your personalized learning profile.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="8" r="4" />
        <path d="M2 20c0-4 3.6-7 8-7s8 3 8 7" />
        <line x1="19" y1="8" x2="23" y2="8" />
        <line x1="21" y1="6" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Access Resources",
    desc: "Get access to coding tutorials, quizzes, and interview preparation materials.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <line x1="13" y1="13" x2="17" y2="13" />
        <line x1="13" y1="17" x2="17" y2="17" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Personalize Roadmap",
    desc: "Choose your goals and receive an AI-generated learning roadmap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Learn & Build",
    desc: "Learn new concepts, solve problems, and build real-world projects.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Grow Yourself",
    desc: "Track your progress, improve your skills, and advance your career.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13 16 9 12 2 19" />
        <polyline points="16 7 22 7 22 13" />
        <line x1="5" y1="19" x2="5" y2="15" />
        <line x1="9" y1="19" x2="9" y2="13" />
        <line x1="13" y1="19" x2="13" y2="17" />
      </svg>
    ),
  },
];

function StepCircle({ icon, num, hovered }) {
  return (
    <div className="step-circle-wrapper">
      <div className={`step-circle ${hovered ? "hovered" : ""}`}>
        {icon}
      </div>
      <div className="step-num">{num}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="arrow-wrapper">
      <div className="arrow-line" />
      <div className="arrow-head" />
    </div>
  );
}

function StepCard({ step }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="step"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StepCircle icon={step.icon} num={step.id} hovered={hovered} />
      <div className={`step-card ${hovered ? "hovered" : ""}`}>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="how-section">
      <h2 className="how-title">How It Works</h2>
      <div className="how-title-bar" />

      <div className="steps-row">
        {steps.map((step, i) => (
          <div key={step.id} className="step-wrapper">
            <StepCard step={step} />
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </section>
  );
}
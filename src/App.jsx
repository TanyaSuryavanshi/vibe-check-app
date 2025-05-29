import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import VibeCard from "./components/VibeCard";
import RouletteWheel from "./components/RouletteWheel";
import "./App.css";

const QUIZVIBES = [
  "✨ Soft Energy",
  "🔥 Chaos Gremlin",
  "🍵 Cozy Goblin",
  "🎧 Deep Thinker",
];

const QUIZQUESTIONS = [
  {
    question: "What’s your ideal weekend plan?",
    options: [
      "Reading indoors",
      "Clubbing all night",
      "Nature hike",
      "Gaming marathon",
    ],
  },
  {
    question: "Pick a snack:",
    options: ["Kale chips", "Hot Cheetos", "Dark chocolate", "Popcorn"],
  },
  {
    question: "Your go-to catchphrase:",
    options: ["I can't even", "Let’s vibe", "Period", "Same"],
  },
];

function Home({ setMode }) {
  return (
    <div className="card">
      <h1>Vibe Check</h1>
      <button onClick={() => setMode("roulette")}>🎡 Spin the Wheel</button>
      <button onClick={() => setMode("quiz")}>❓ Take the Quiz</button>
    </div>
  );
}

function Roulette({ onResult, onRestart }) {
  const [vibe, setVibe] = useState(null);
  return (
    <div className="card">
      <h1>🎡 Vibe Check Roulette</h1>
      <RouletteWheel onResult={setVibe} />
      <VibeCard vibe={vibe} onRestart={onRestart} />
    </div>
  );
}

function Quiz({ onResult, onRestart }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [vibeStats, setVibeStats] = useState({});

  useEffect(() => {
    const initialCounts = QUIZVIBES.reduce((acc, vibe) => {
      acc[vibe] = 0;
      return acc;
    }, {});

    setVibeStats(initialCounts);
  }, []);

  const handleAnswer = async (optionIndex) => {
    setAnswers([...answers, optionIndex]);
    if (step + 1 === QUIZQUESTIONS.length) {
      const vibe = QUIZVIBES[Math.floor(Math.random() * QUIZVIBES.length)];
      setVibeStats((prev) => ({
        ...prev,
        [vibe]: (prev[vibe] || 0) + 1,
      }));

      setResult(vibe);
    }
    setStep(step + 1);
  };

  if (result) {
    return (
      <div className="result-display">
        <h1>Your Vibe is:</h1>
        <div className="vibe-result">{result}</div>
        <h2>Live Vibe Stats:</h2>
        <ul className="vibe-stats">
          {Object.entries(vibeStats).map(([vibe, count]) => (
            <li key={vibe}>
              {vibe}: {count}
            </li>
          ))}
        </ul>
        <button onClick={onRestart}>🔁 Try Again</button>
      </div>
    );
  }

  if (step < QUIZQUESTIONS.length) {
    const q = QUIZQUESTIONS[step];
    return (
      <div className="quiz-card">
        <div className="quiz-progress">
          {step + 1}/{QUIZQUESTIONS.length}
        </div>
        <h2 className="quiz-question">{q.question}</h2>
        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="quiz-button"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function Result({ vibe, onRestart }) {
  return (
    <div className="card">
      <h2>{vibe.label}</h2>
      <p>{vibe.description}</p>
      <button onClick={onRestart}>🔁 Try Again</button>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("home");
  const [vibeResult, setVibeResult] = useState(null);

  const handleResult = (vibe) => {
    setVibeResult(vibe);
    setMode("result");
  };

  const restart = () => {
    setMode("home");
    setVibeResult(null);
  };

  return (
    <div className="app">
      {mode === "home" && <Home setMode={setMode} />}
      {mode === "roulette" && (
        <Roulette onResult={handleResult} onRestart={restart} />
      )}
      {mode === "quiz" && <Quiz onResult={handleResult} onRestart={restart} />}
      {mode === "result" && <Result vibe={vibeResult} onRestart={restart} />}
    </div>
  );
}

export default App;

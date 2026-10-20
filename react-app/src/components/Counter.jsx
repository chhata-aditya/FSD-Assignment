import { useState } from "react";

/**
 * Gentle Counter Widget
 * Author: Chhata
 * Demonstrates useState, step adjustments, and organic aesthetic states
 */
export default function Counter() {
  const [val, setVal] = useState(0);
  const [step, setStep] = useState(1);

  let mood = "Ground Zero";
  let toneClass = "zero-tone";

  if (val > 0) {
    mood = "Blooming (+)";
    toneClass = "bloom-tone";
  } else if (val < 0) {
    mood = "Subdued (−)";
    toneClass = "subdue-tone";
  }

  return (
    <div className="counter-box">
      <header className="counter-top">
        <span className="counter-desc">React useState Micro-Interaction</span>
        <span className={`mood-pill ${toneClass}`}>{mood}</span>
      </header>

      <div className={`counter-display ${toneClass}`}>
        <span className="number-display">{val}</span>
      </div>

      <div className="step-selector">
        <span className="step-label">Pace:</span>
        {[1, 5, 10].map((num) => (
          <button
            key={num}
            className={`step-bubble ${step === num ? "active-step" : ""}`}
            onClick={() => setStep(num)}
          >
            ±{num}
          </button>
        ))}
      </div>

      <div className="counter-actions">
        <button
          className="btn-dial minus"
          onClick={() => setVal((v) => v - step)}
          aria-label="Decrease"
        >
          <span>−</span>
          <span>Decrease</span>
        </button>

        <button
          className="btn-dial reset"
          onClick={() => setVal(0)}
          aria-label="Reset"
        >
          Reset
        </button>

        <button
          className="btn-dial plus"
          onClick={() => setVal((v) => v + step)}
          aria-label="Increase"
        >
          <span>+</span>
          <span>Increase</span>
        </button>
      </div>
    </div>
  );
}

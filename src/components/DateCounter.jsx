import { useState } from "react";
import "../App.css";

export default function DateCounter() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);

  const handleReset = () => {
    setCount(0);
    setStep(1);
    date.setDate(date.getDate() + count);
  };
  return (
    <div className="counter">
      <div className="slider">
        <input
          type="range"
          value={step}
          min={0}
          max={10}
          onChange={(e) => setStep(Number(e.target.value))}
        />{" "}
        {step}
      </div>
      <div className="input">
        <button onClick={() => setCount((c) => c - step)}>-</button>

        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count == 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
};

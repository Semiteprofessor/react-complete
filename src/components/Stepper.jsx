import { useState } from "react";
import "../stepper.css";

const steps = [
  {
    title: "Step 1",
    content: "This is the first step",
  },
  {
    title: "Step 2",
    content: "This is the second step",
  },
  {
    title: "Step 3",
    content: "This is the third step",
  },
];

function Stepper() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === steps.length - 1) {
      return;
    } else {
      setStep((step) => step + 1);
    }
  };

  const handlePrevious = () => {
    if (step === 0) {
      setStep(step);
    } else {
      setStep((step) => step - 1);
    }
  };

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 0 ? "active" : ""}`}>1</div>
        <div className={`${step >= 1 ? "active" : ""}`}>2</div>
        <div className={`${step >= 2 ? "active" : ""}`}>3</div>
      </div>

      <StepMessage step={step}>{steps[step - 0].content}</StepMessage>

      <div className="btn">
        <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
          <span>👈 </span>Previous
        </Button>

        <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
          Next <span>👉 </span>
        </Button>
      </div>
    </div>
  );
}

const StepMessage = ({ step, children }) => {
  return (
    <div className="message">
      <h2>{steps[step - 0].title}</h2>
      {children}
    </div>
  );
};

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Stepper;

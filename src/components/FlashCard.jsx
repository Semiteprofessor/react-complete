import { useState } from "react";
import "../App.css";
const questions = [
  {
    id: 1,
    question: "What language is React based on ?",
    answer: "Javascript",
  },
  {
    id: 2,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces",
  },
  {
    id: 3,
    question: "What is JSX?",
    answer: "JavaScript XML",
  },
  {
    id: 4,
    question: "What is a component?",
    answer: "A component is a reusable piece of code",
  },
  {
    id: 5,
    question: "What is a prop?",
    answer: "A prop is an attribute passed to a component",
  },
  {
    id: 6,
    question: "What is a state?",
    answer: "A state is an object that holds information about the component",
  },
  {
    id: 7,
    question: "What is a lifecycle method?",
    answer:
      "A lifecycle method is a method that is called by React at specific points in time",
  },
  {
    id: 8,
    question: "What is a hook?",
    answer:
      "A hook is a function that allows you to use state and other React features without writing a class",
  },
  {
    id: 9,
    question: "What is a virtual DOM?",
    answer: "A virtual DOM is a representation of the real DOM in memory",
  },
  {
    id: 10,
    question: "What is a render method?",
    answer: "A render method is a method that returns JSX",
  },
  {
    id: 11,
    question: "What is a conditional rendering?",
    answer:
      "Conditional rendering is a way to render different JSX based on a condition",
  },
];

const Flash = () => {
  return (
    <div className="flash">
      <FlashCard />
    </div>
  );
};

const FlashCard = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id !== selectedId ? id : null);
  };
  return (
    <div className="grid">
      {questions.map((question) => (
        <Card
          question={question}
          key={question.id}
          handleClick={handleClick}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

const Card = ({ question, handleClick, selectedId }) => {
  return (
    <div
      className={question.id === selectedId ? "card active" : "card"}
      onClick={() => handleClick(question.id)}
    >
      <p>
        {question.id !== selectedId ? (
          <div>
            <h3>{question.question}</h3>
          </div>
        ) : (
          <div>
            <p>{question.answer}</p>
          </div>
        )}
      </p>
    </div>
  );
};

export default Flash;

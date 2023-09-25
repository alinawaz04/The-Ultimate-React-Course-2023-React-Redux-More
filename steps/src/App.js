import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

export default function App() {
  return (
    <div>
      <Steps />
      <Counter />
      <Flashcards />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1); // use denotes a react hook, only can be called at top level
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Counter() {
  const [date, setDate] = useState(new Date().toDateString());
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleStepPrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleStepNext() {
    setStep((s) => s + 1);
  }

  function handleCountPrevious() {
    setCount((c) => c - step);

    setDate((dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() - step);
      return date.toDateString();
    });
  }

  function handleCountNext() {
    setCount((c) => c + step);

    setDate((dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + step);
      return date.toDateString();
    });
  }

  return (
    <div>
      <div className="option">
        <button onClick={handleStepPrevious}>-</button>
        <p>Step: {step}</p>
        <button onClick={handleStepNext}>+</button>
      </div>

      <div className="option">
        <button onClick={handleCountPrevious}>-</button>
        <p>Count: {count}</p>
        <button onClick={handleCountNext}>+</button>
      </div>

      <p>
        {count === 0 && "Today is "}
        {count > 0 && `${count} day(s) from today is `}
        {count < 0 && `${Math.abs(count)} day(s) before today was `}
        {date}
      </p>
    </div>
  );
}

function Flashcards() {
  const [selectedID, setSelectedID] = useState(null);

  function handleClick(id) {
    setSelectedID(id !== selectedID ? id : null);
  }

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          className={question.id === selectedID ? "selected" : ""}
          onClick={() => handleClick(question.id)}
        >
          <p>
            {question.id === selectedID ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

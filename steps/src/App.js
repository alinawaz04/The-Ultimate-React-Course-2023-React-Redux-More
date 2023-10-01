import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <TipCalc />
      <Steps />
      {/* <Counter /> */}
    </div>
  );
}

function TipCalc() {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  function handleSetBill(bill) {
    setBill(bill);
    console.log(bill);
  }

  function handleSetTip1(tipPercentage) {
    if (bill !== null) {
      const tipAmount = (bill * tipPercentage).toFixed(2); // Calculate tip and round to two decimal places
      setTip1(tipAmount);
      console.log(tip1);
    }
  }

  function handleSetTip2(tipPercentage) {
    if (bill !== null) {
      const tipAmount = (bill * tipPercentage).toFixed(2); // Calculate tip and round to two decimal places
      setTip2(tipAmount);
    }
  }

  function handleReset() {
    setBill(0);
    setTip1(0);
    setTip2(0);
  }

  return (
    <div>
      <Input onSetBill={handleSetBill} type="text">
        How much was the bill?
      </Input>
      <Input handler={handleSetTip1} type="dropdown">
        How did you like the service?
      </Input>
      <Input handler={handleSetTip2} type="dropdown">
        How did your friend like the service?
      </Input>

      <Output bill={bill} onSetBill={handleSetBill} tip1={tip1} tip2={tip2} />

      <Reset onReset={handleReset} />
    </div>
  );
}

function Input({ children, type, onSetBill, handler }) {
  if (type === "dropdown") {
    return (
      <div>
        <label htmlFor="dropdown">{children}</label>
        <select
          defaultValue="1"
          onChange={(e) => handler(Number(e.target.value))}
        >
          <option value={0}>Bad(0%)</option>
          <option value={0.05}>It was okay(5%)</option>
          <option value={0.1}>It was good(10%)</option>
          <option value={0.2}>Amazing!(20%)</option>
        </select>
      </div>
    );
  }
  return (
    <div>
      {children}
      <input
        onChange={(e) => onSetBill(Number(e.target.value))}
        type={type}
      ></input>
    </div>
  );
}

function Output({ bill, tip1, tip2 }) {
  const total = Number(bill) + Number(tip1) + Number(tip2);
  return (
    <h1>
      You pay ${total} (${bill} + ${Number(tip1) + Number(tip2)})
    </h1>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
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

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handlePrevious}
            >
              <span>👈</span> Previous
            </Button>

            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handleNext}
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

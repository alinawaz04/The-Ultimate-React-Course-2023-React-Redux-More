import { useEffect, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const [isLoading, position, getPosition, error] =
    useGeolocation(handleCountClick);
  const { lat, lng } = position;

  function handleCountClick() {
    setCountClicks((count) => count + 1);
  }

  return (
    <div>
      <button onClick={getPosition} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}

function useGeolocation(callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    callback?.();

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return [isLoading, position, getPosition, error];
}

// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD
function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [output, setOutput] = useState("");

  useEffect(
    function () {
      async function fetchConversion() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );

          if (!res.ok) throw new Error("Something went wrong...");

          const data = await res.json();

          console.log(Object.values(data.rates)[0]);
          setOutput(Object.values(data.rates)[0]);
        } catch (err) {
          console.error(err);
        }
      }

      if (from === to) return setOutput(amount);
      fetchConversion();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "purple",
  expanded = false,
  className,
}) {
  const [isExpanded, setExpanded] = useState(expanded);

  function handleExpand(value) {
    setExpanded(value);
  }

  const buttonStyle = {
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    textDecoration: "underline",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>
        {isExpanded
          ? children
          : children.split(" ").slice(0, collapsedNumWords).join(" ")}
        ...
      </span>
      <button onClick={() => handleExpand(!isExpanded)} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

function TipCalc() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = ((bill * (percentage1 / 100 + percentage2 / 100)) / 2).toFixed(2);

  function handleSetBill(bill) {
    setBill(bill);
    console.log(bill);
  }

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <Input bill={bill} onSetBill={handleSetBill} type="text">
        How much was the bill?
      </Input>
      <Input percentage={percentage1} onSelect={setPercentage1} type="dropdown">
        How did you like the service?
      </Input>
      <Input percentage={percentage2} onSelect={setPercentage2} type="dropdown">
        How did your friend like the service?
      </Input>

      <Output bill={bill} tip={tip} />

      <Reset onReset={handleReset} />
    </div>
  );
}

function Input({ children, type, bill, onSetBill, percentage, onSelect }) {
  if (type === "dropdown") {
    return (
      <div>
        <label htmlFor="dropdown">{children}</label>
        <select
          value={percentage}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          <option value="0">Bad(0%)</option>
          <option value="5">It was okay(5%)</option>
          <option value="10">It was good(10%)</option>
          <option value="20">Amazing!(20%)</option>
        </select>
      </div>
    );
  }
  return (
    <div>
      {children}
      <input
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
        type={type}
      ></input>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h1>
      You pay ${bill + Number(tip)} (${bill} + ${tip} tip)
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

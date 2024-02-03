import { useEffect, useReducer, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const LOAN_AMOUNT = 5000;

function reducer(state, action) {
  if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "loan":
      if (state.loan) {
        return { ...state };
      }
      return {
        ...state,
        loan: state.loan + LOAN_AMOUNT,
        balance: state.balance + LOAN_AMOUNT,
      };
    case "payLoan":
      if (!state.loan) {
        return { ...state };
      }
      return {
        ...state,
        loan: state.loan - LOAN_AMOUNT,
        balance: state.balance - LOAN_AMOUNT,
      };
    case "closeAccount":
      if (state.loan || state.balance) {
        return { ...state };
      }
      return {
        state: initialState,
        balance: 0,
        loan: 0,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "loan" })} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD
// function CurrencyConverter() {
//   const [amount, setAmount] = useState("1");
//   const [from, setFrom] = useState("USD");
//   const [to, setTo] = useState("EUR");
//   const [output, setOutput] = useState("");

//   useEffect(
//     function () {
//       async function fetchConversion() {
//         try {
//           const res = await fetch(
//             `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
//           );

//           if (!res.ok) throw new Error("Something went wrong...");

//           const data = await res.json();

//           console.log(Object.values(data.rates)[0]);
//           setOutput(Object.values(data.rates)[0]);
//         } catch (err) {
//           console.error(err);
//         }
//       }

//       if (from === to) return setOutput(amount);
//       fetchConversion();
//     },
//     [amount, from, to]
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <select value={from} onChange={(e) => setFrom(e.target.value)}>
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <select value={to} onChange={(e) => setTo(e.target.value)}>
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <p>
//         {output} {to}
//       </p>
//     </div>
//   );
// }

// function TextExpander({
//   children,
//   collapsedNumWords = 10,
//   expandButtonText = "Show more",
//   collapseButtonText = "Show less",
//   buttonColor = "purple",
//   expanded = false,
//   className,
// }) {
//   const [isExpanded, setExpanded] = useState(expanded);

//   function handleExpand(value) {
//     setExpanded(value);
//   }

//   const buttonStyle = {
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "transparent",
//     textDecoration: "underline",
//     color: buttonColor,
//   };

//   return (
//     <div className={className}>
//       <span>
//         {isExpanded
//           ? children
//           : children.split(" ").slice(0, collapsedNumWords).join(" ")}
//         ...
//       </span>
//       <button onClick={() => handleExpand(!isExpanded)} style={buttonStyle}>
//         {isExpanded ? collapseButtonText : expandButtonText}
//       </button>
//     </div>
//   );
// }

// function TipCalc() {
//   const [bill, setBill] = useState("");
//   const [percentage1, setPercentage1] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);

//   const tip = ((bill * (percentage1 / 100 + percentage2 / 100)) / 2).toFixed(2);

//   function handleSetBill(bill) {
//     setBill(bill);
//     console.log(bill);
//   }

//   function handleReset() {
//     setBill(0);
//     setPercentage1(0);
//     setPercentage2(0);
//   }

//   return (
//     <div>
//       <Input bill={bill} onSetBill={handleSetBill} type="text">
//         How much was the bill?
//       </Input>
//       <Input percentage={percentage1} onSelect={setPercentage1} type="dropdown">
//         How did you like the service?
//       </Input>
//       <Input percentage={percentage2} onSelect={setPercentage2} type="dropdown">
//         How did your friend like the service?
//       </Input>

//       <Output bill={bill} tip={tip} />

//       <Reset onReset={handleReset} />
//     </div>
//   );
// }

// function Input({ children, type, bill, onSetBill, percentage, onSelect }) {
//   if (type === "dropdown") {
//     return (
//       <div>
//         <label htmlFor="dropdown">{children}</label>
//         <select
//           value={percentage}
//           onChange={(e) => onSelect(Number(e.target.value))}
//         >
//           <option value="0">Bad(0%)</option>
//           <option value="5">It was okay(5%)</option>
//           <option value="10">It was good(10%)</option>
//           <option value="20">Amazing!(20%)</option>
//         </select>
//       </div>
//     );
//   }
//   return (
//     <div>
//       {children}
//       <input
//         value={bill}
//         onChange={(e) => onSetBill(Number(e.target.value))}
//         type={type}
//       ></input>
//     </div>
//   );
// }

// function Output({ bill, tip }) {
//   return (
//     <h1>
//       You pay ${bill + Number(tip)} (${bill} + ${tip} tip)
//     </h1>
//   );
// }

// function Reset({ onReset }) {
//   return <button onClick={onReset}>Reset</button>;
// }

// function Counter() {
//   const [date, setDate] = useState(new Date().toDateString());
//   const [step, setStep] = useState(1);
//   const [count, setCount] = useState(0);

//   function handleStepPrevious() {
//     if (step > 1) setStep((s) => s - 1);
//   }

//   function handleStepNext() {
//     setStep((s) => s + 1);
//   }

//   function handleCountPrevious() {
//     setCount((c) => c - step);

//     setDate((dateString) => {
//       const date = new Date(dateString);
//       date.setDate(date.getDate() - step);
//       return date.toDateString();
//     });
//   }

//   function handleCountNext() {
//     setCount((c) => c + step);

//     setDate((dateString) => {
//       const date = new Date(dateString);
//       date.setDate(date.getDate() + step);
//       return date.toDateString();
//     });
//   }

//   return (
//     <div>
//       <div className="option">
//         <button onClick={handleStepPrevious}>-</button>
//         <p>Step: {step}</p>
//         <button onClick={handleStepNext}>+</button>
//       </div>

//       <div className="option">
//         <button onClick={handleCountPrevious}>-</button>
//         <p>Count: {count}</p>
//         <button onClick={handleCountNext}>+</button>
//       </div>

//       <p>
//         {count === 0 && "Today is "}
//         {count > 0 && `${count} day(s) from today is `}
//         {count < 0 && `${Math.abs(count)} day(s) before today was `}
//         {date}
//       </p>
//     </div>
//   );
// }

// function Steps() {
//   const [step, setStep] = useState(1); // use denotes a react hook, only can be called at top level
//   const [isOpen, setIsOpen] = useState(true);

//   function handlePrevious() {
//     if (step > 1) setStep((s) => s - 1);
//   }

//   function handleNext() {
//     if (step < 3) {
//       setStep((s) => s + 1);
//     }
//   }

//   return (
//     <div>
//       <button className="close" onClick={() => setIsOpen((is) => !is)}>
//         &times;
//       </button>
//       {isOpen && (
//         <div className="steps">
//           <div className="numbers">
//             <div className={step >= 1 ? "active" : ""}>1</div>
//             <div className={step >= 2 ? "active" : ""}>2</div>
//             <div className={step >= 3 ? "active" : ""}>3</div>
//           </div>

//           <StepMessage step={step}>{messages[step - 1]}</StepMessage>

//           <div className="buttons">
//             <Button
//               textColor="#fff"
//               backgroundColor="#7950f2"
//               onClick={handlePrevious}
//             >
//               <span>👈</span> Previous
//             </Button>

//             <Button
//               textColor="#fff"
//               backgroundColor="#7950f2"
//               onClick={handleNext}
//             >
//               Next <span>👉</span>
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function StepMessage({ step, children }) {
//   return (
//     <div className="message">
//       <h3>Step {step}</h3>
//       {children}
//     </div>
//   );
// }

// function Button({ textColor, backgroundColor, onClick, children }) {
//   return (
//     <button
//       style={{ backgroundColor: backgroundColor, color: textColor }}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// }

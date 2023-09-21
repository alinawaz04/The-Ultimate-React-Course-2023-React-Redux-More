import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function Avatar() {
  return <img className="avatar" src="avatar.jpeg" alt="avatar" />;
}

function Intro() {
  return (
    <div>
      <h1>Ali Nawaz</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius
        ex sed feugiat cursus. Vestibulum efficitur mauris eu arcu congue, sit
        amet aliquam dolor ultricies. Aliquam dignissim mollis cursus. Aliquam
        at sem felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Vestibulum non semper mauris. Ut a ultricies purus. Nullam suscipit
        auctor mauris eu eleifend.
      </p>
    </div>
  );
}

function Skill(props) {
  const style = { backgroundColor: props.color };

  return (
    <div className="skill" style={style}>
      <span>{props.skill}</span>
    </div>
  );
}

function SkillList() {
  return (
    <li className="skill-list">
      <Skill skill="JavaScript 💪" color="blue" />
      <Skill skill="HTML+CSS 😵‍💫" color="red" />
      <Skill skill="Git 🥺" color="green" />
      <Skill skill="Web Design 🤦🏽‍♂️" color="purple" />
    </li>
  );
}

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

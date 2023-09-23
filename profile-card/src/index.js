import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML + CSS",
    level: "advanced",
    color: "#2662EA",
  },

  {
    skill: "JavaScript",
    level: "intermediate",
    color: "#EfD81D",
  },

  {
    skill: "Git",
    level: "intermediate",
    color: "#E84F33",
  },

  {
    skill: "React",
    level: "beginner",
    color: "#60dafb",
  },

  {
    skill: "Web Design",
    level: "intermediate",
    color: "#c3dcaf",
  },
];

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

function Skill({ skillObj }) {
  const style = { backgroundColor: skillObj.color };

  return (
    <div className="skill" style={style}>
      <span>{skillObj.skill}</span>
      <span>
        {skillObj.level == "advanced" && "💪"}
        {skillObj.level == "intermediate" && "👍"}
        {skillObj.level == "beginner" && "👶"}
      </span>
    </div>
  );
}

function SkillList() {
  return (
    <li className="skill-list">
      {skills.map((skill) => (
        <Skill skillObj={skill} />
      ))}
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

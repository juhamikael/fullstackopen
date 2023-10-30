const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptionPart extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends DescriptionPart {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends DescriptionPart {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends DescriptionPart {
  requirements: string[];
  kind: "special";
}

type TCoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const courseParts: TCoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const descriptionStyles = {
  fontWeight: "bold",
  fontSize: "1.1rem",
};

const Part = ({ part }: { part: TCoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>{part.name}</h2>
          <p style={descriptionStyles}>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>Group Projects: {part.groupProjectCount}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{part.name}</h2>
          <p style={descriptionStyles}>{part.description}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name}</h2>
          <p style={descriptionStyles}>{part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: TCoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, key) => (
        <div
          style={{ paddingBottom: "10px", borderBottom: "1px solid black" }}
          key={key}
        >
          <Part part={part} />
        </div>
      ))}
    </>
  );
};
const Total = ({ courseParts }: { courseParts: TCoursePart[] }) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return (
    <p
      style={{
        paddingTop: "10px",
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
    >
      Number of exercises {totalExercises}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

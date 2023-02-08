const Header = (props) => {
  const { course } = props;
  return <h1>{course}</h1>;
};

const Part = (props) => {
  const { name, exercise } = props;
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part, index) => {
        return <Part key={index} name={part.name} exercise={part.exercises} />;
      })}
    </>
  );
};

const Total = (props) => {
  const { arrayListOfExercisesBySection } = props;
  let total = 0;
  for (let i = 0; i < arrayListOfExercisesBySection.length; i++) {
    total += arrayListOfExercisesBySection[i].exercises;
  }
  return <div>Number of exercises {total}</div>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total arrayListOfExercisesBySection={course.parts} />
    </div>
  );
};

export default App;

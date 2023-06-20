const Header = (props) => {
    const { course } = props;
    return <h1>{course}</h1>;
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

const Part = (props) => {
  const { name, exercise } = props;
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Total = (props) => {
  const { arrayListOfExercisesBySection } = props;
  let total = 0;

  total = arrayListOfExercisesBySection.reduce((acc, cur) => {
    return acc + cur.exercises;
  }, 0);

  return <div>Number of exercises {total}</div>;
};

const Course = (props) => {
  const { course } = props;
  console.log(course);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total arrayListOfExercisesBySection={course.parts} />
    </>
  );
};

export default Course;

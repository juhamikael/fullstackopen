import { useState } from "react";

const ShowAnecdote = ({ anecdote }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>
        <strong>{anecdote}</strong>
      </p>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...Object.values(votes));
  const mostVotedAnecdoteIndex = Object.keys(votes).find(
    (key) => votes[key] === maxVotes
  );
  const mostVotedAnecdote = anecdotes[mostVotedAnecdoteIndex];

  if (maxVotes === 0) {
    return (
      <>
        <p>
          <strong>
            Vote one of the Anecdotes keep track of the most voted anecdote
          </strong>
        </p>
      </>
    );
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>
        <strong>{mostVotedAnecdote}</strong>
      </p>
      <p>has {maxVotes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const points = { ...Array(anecdotes.length).fill(0) };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  return (
    <div>
      {selected < anecdotes.length ? (
        <>
          <ShowAnecdote anecdote={anecdotes[selected]} />
          <Button
            handleClick={() =>
              setVotes({ ...votes, [selected]: votes[selected] + 1 })
            }
            text="Vote"
          />

          <Button
            handleClick={() => setSelected(selected + 1)}
            text="Next anecdote"
          />
        </>
      ) : null}
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;

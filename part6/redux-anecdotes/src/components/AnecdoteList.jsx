import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) =>
        anecdote.content
          ? anecdote.content
              .toLowerCase()
              .includes(filter ? filter.toLowerCase() : "")
          : false
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    let anecdote;
    try {
      dispatch(voteAnecdote(id));
      anecdote = anecdotes.find((anecdote) => anecdote.id === id);
      dispatch(
        showNotification(`you voted '${anecdote.content}'`, 5, "success")
      );
    } catch (error) {
      dispatch(
        showNotification(`Couldn't Vote '${anecdote.content}'`, 5, "error")
      );
    }
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

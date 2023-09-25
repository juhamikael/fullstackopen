import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = (event) => {
    event.preventDefault();
    dispatch(createNewAnecdote({ content: event.target.anecdote.value }));

    try {
      dispatch(
        showNotification(
          `you created '${event.target.anecdote.value}'`,
          5,
          "success"
        )
      );
    } catch (error) {
      dispatch(
        showNotification(
          `Couldn't create '${event.target.anecdote.value}'`,
          5,
          "error"
        )
      );
    }
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";
import { useNotificationDispatch } from "../NotificationContext";
import "./AnecdoteForm.css";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.trim().length < 5) {
      dispatch({
        type: "ERROR",
        content: "Anecdote must be at least 5 characters long",
      });
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = "";
    dispatch({ type: "CREATE", content });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
      style={{
        marginTop: 80,
      }}>Create new</h3>
      <form onSubmit={onCreate}>
        <input
          className="newAnecdote-input"
          placeholder="Enter new anecdote"
          name="anecdote"
        />
        <button className="form-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

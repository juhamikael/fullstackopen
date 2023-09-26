import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Error from "./components/Error";
import { useNotificationDispatch } from "./NotificationContext";
import { ThumbsUp } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdoteVote } from "./services/requests";

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    dispatch({ type: "VOTE", content: anecdote.content });

    voteAnecdoteMutation.mutate(updatedAnecdote);
  };

  const voteAnecdoteMutation = useMutation(updateAnecdoteVote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
    retry: 2,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <Error />;
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <div className="anecdotes">
        {anecdotes.map((anecdote) => (
          <div className="anecdote-item" key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              <hr />
              <div className="votes">Votes: {anecdote.votes}</div>
              <hr />
              <button
                className="anecdote-vote-button"
                onClick={() => handleVote(anecdote)}
              >
                <ThumbsUp />
              </button>
              <span className="vote">Vote</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

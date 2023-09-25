import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </>
  );
};

export default App;

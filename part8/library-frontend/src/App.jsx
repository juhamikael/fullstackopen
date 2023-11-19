import { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import AuthorForm from "./AuthorForm";
import AddBookForm from "./AddBookForm";
import { buttonclass } from "./styles";
import { cn } from "./lib";
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const Authors = ({ authors, setError }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="w-1/3">
        <div className="text-center text-2xl pt-4 pb-10 font-black">
          Authors
        </div>

        <table className="mx-auto w-full">
          <thead>
            <tr>
              <th className="text-start text-xl">Name</th>
              <th className="text-start text-xl">Born</th>
              <th className="text-end px-5 text-xl">Books</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id} className="border-b border-white/20 h-16">
                <td className="text-start">{author.name}</td>
                <td className="text-start ">{author.born}</td>
                <td className="text-end px-10 ">{author.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={cn(
            buttonclass,
            "bg-yellow-600 hover:bg-yellow-600/80 text-white"
          )}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Edit Author"}
        </button>
        {showForm && <AuthorForm setError={setError} authors={authors} />}
      </div>
    </>
  );
};
const Books = ({ books }) => {
  const genreParser = (genres) => {
    if (!genres) return "";
    if (genres.length === 1) return genres[0];

    return genres.join(", ");
  };

  return (
    <div className="w-2/3 ">
      <div className="text-center text-2xl py-4 font-black">Authors</div>
      <table className="mx-auto">
        <thead>
          <tr>
            <th className="text-start w-96 text-xl">Title</th>
            <th className="text-start w-96 text-xl">Author</th>
            <th className="text-start w-60 text-xl">Published</th>
            <th className="text-start w-60 text-xl">Genres</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-white/20 h-16">
              <td className="text-start ">{book.title}</td>
              <td className="text-start">{book.author}</td>
              <td className="text-start ">{book.published}</td>
              <td className="text-start ">{genreParser(book.genres)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const buttonStyle = "border px-4 rounded-md  ";

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div className="flex gap-x-2 pt-6 justify-center">
        <button className={buttonStyle} onClick={() => setPage("authors")}>
          Authors
        </button>
        <button className={buttonStyle} onClick={() => setPage("books")}>
          Books
        </button>
        <button className={buttonStyle} onClick={() => setPage("add-book")}>
          Add Book
        </button>
      </div>
      <div className="flex justify-center">
        {page === "authors" && (
          <Authors setError={notify} authors={authors.data.allAuthors} />
        )}
        {page === "books" && <Books books={books.data.allBooks} />}
        {page === "add-book" && (
          <AddBookForm setError={notify} setPage={setPage} />
        )}
      </div>
    </>
  );
}

export default App;

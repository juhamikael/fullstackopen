import { useState, useEffect } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, PERSONAL_INFO } from "./queries";
import AddBookForm from "./components/AddBookForm";
import { selectedGenre } from "../signals";
import LoginForm from "./LoginForm";
import Books from "./components/Books";
import Authors from "./components/Authors";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [token, setToken] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const personalInfo = useQuery(PERSONAL_INFO);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const personalFavoriteGenre = token
    ? personalInfo?.data?.me?.favoriteGenre
    : "";
  console.log("SelectedGenre", selectedGenre.value);
  const buttonStyle = (buttonPage) =>
    `border border-white/20 p-4 px-6 rounded-md lg:w-[7%]  ${
      page === buttonPage
        ? "bg-yellow-600 text-white border-none font-black uppercase"
        : null
    } hover:bg-yellow-600/40 transition-all ease-in-out`;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    if (!token) {
      const localStorageToken = localStorage.getItem("library-user-token");

      if (localStorageToken) {
        setToken(localStorageToken);
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div className="flex gap-x-2 pt-6 justify-center ">
        <button
          className={buttonStyle("authors")}
          onClick={() => setPage("authors")}
        >
          Authors
        </button>
        <button
          className={buttonStyle("books")}
          onClick={() => setPage("books")}
        >
          Books
        </button>
        {token ? (
          <>
            <button
              className={buttonStyle("add-book")}
              onClick={() => setPage("add-book")}
            >
              Add Book
            </button>
            <button
              className="bg-red-500 p-4 px-6 rounded-md lg:w-[7%] transition-all hover:font-black hover:bg-red-500/80 "
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-green-500 p-4 px-6 rounded-md lg:w-[7%]"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        )}
      </div>
      <div className="flex justify-center">
        {page === "authors" && (
          <Authors
            token={token}
            setError={notify}
            authors={authors.data.allAuthors}
          />
        )}
        {page === "books" && (
          <Books personalFavoriteGenre={personalFavoriteGenre} />
        )}

        {page === "add-book" && token && (
          <AddBookForm setError={notify} setPage={setPage} />
        )}
        {page === "login" && (
          <LoginForm setToken={setToken} setError={notify} setPage={setPage} />
        )}
      </div>
    </>
  );
}

export default App;

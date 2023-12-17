import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ALL_BOOKS,
  ADD_BOOK,
  ADD_AUTHOR,
  ALL_AUTHORS,
  EDIT_AUTHOR,
} from "../queries";
import { formClass, buttonclass, formItemsClass, labelClass } from "../styles";
import { cn } from "../lib";
import { selectedGenre } from "../../signals";
const AddBookForm = ({ setError, setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(null);
  const [genres, setGenres] = useState("");
  const authors = useQuery(ALL_AUTHORS);

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(message);
      setError(message);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(message);
    },
    refetchQueries: [
      { query: ALL_BOOKS, variables: { genre: selectedGenre.value } },
      "allBooks",
    ],
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(message);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const splitGenres = (genres) => {
    if (!genres) return [];
    return genres.split(",").map((genre) => genre.trim().toLowerCase());
  };

  const submit = async (event) => {
    event.preventDefault();
    const genresSplitted = splitGenres(genres).filter((genre) => genre);

    const publishedNumber = parseInt(published) || 1;

    try {
      let authorId;
      const existingAuthor = authors.data.allAuthors.find(
        (a) => a.name === author
      );

      if (!existingAuthor) {
        const response = await addAuthor({
          variables: {
            name: author,
            bookCount: 1,
          },
        });
        authorId = response.data.addAuthor.id;
      } else {
        authorId = existingAuthor.id;
        await editAuthor({
          variables: {
            name: author,
            bookCount: existingAuthor.bookCount + 1,
          },
        });
      }

      await addBook({
        variables: {
          title,
          author: authorId,
          published: publishedNumber,
          genres: genresSplitted,
        },
      });

      setTitle("");
      setPublished(null);
      setAuthor("");
      setGenres("");
      setPage("books");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/4">
      <h2 className="text-2xl text-center uppercase font-bold pt-8 pb-4">
        create new
      </h2>
      <form onSubmit={submit}>
        <div className={formItemsClass}>
          <label className={labelClass} htmlFor="author">
            Title
          </label>
          <input
            id="title"
            className={formClass}
            value={title}
            placeholder="Tim, Aviciin elämäkerta"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={formItemsClass}>
          <label className={labelClass} htmlFor="author">
            Author
          </label>
          <input
            id="author"
            className={formClass}
            placeholder="Måns Mosesson"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className={formItemsClass}>
          <label className={labelClass} htmlFor="published">
            Published
          </label>
          <input
            id="published"
            className={formClass}
            value={published}
            placeholder="2021"
            type="number"
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className={formItemsClass}>
          <label className={labelClass} htmlFor="genres">
            Genres
          </label>
          <input
            id="genres"
            className={formClass}
            value={genres}
            placeholder="Elämäkerrat, Musiikki"
            onChange={({ target }) => setGenres(target.value)}
          />
          <p className=" text-sm text-yellow-200">
            Separate genres with comma, e.g. "Thriller, Horror, Sci-fi"
          </p>
        </div>
        <button
          className={cn(
            !title || !author || !published || !genres
              ? `${buttonclass} bg-gray-400 hover:bg-gray-400/80`
              : buttonclass
          )}
          type="submit"
          disabled={!title || !author || !published || !genres}
        >
          add!
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;

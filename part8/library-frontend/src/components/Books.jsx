import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { selectedGenre } from "../../signals";

const Books = ({ personalFavoriteGenre }) => {
  const { data: genres } = useQuery(ALL_GENRES, {
    variables: { genre: selectedGenre.value },
  });

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre.value },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const books = data.allBooks;

  const genreParser = (genres) => {
    return genres.length > 1 ? genres.join(", ") : genres[0] || "";
  };

  return (
    <div className="w-2/3">
      <div className="flex justify-center gap-x-2 pt-6">
        <button
          onClick={() => selectedGenre.value = null}
          className="border border-white/20 text-white p-1 px-6 rounded-md hover:bg-yellow-600/80 transition-all ease-in-out"
        >
          All genres
        </button>

        {personalFavoriteGenre && (
          <button
            onClick={() => selectedGenre.value = personalFavoriteGenre}
            className="border border-white/20 text-white p-1 px-6 rounded-md hover:bg-yellow-600/80 transition-all ease-in-out"
          >
            Recommended
          </button>
        )}
        {genres.allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => selectedGenre.value = genre}
            className="border border-white/20 text-white p-1 px-6 rounded-md hover:bg-yellow-600/80 transition-all ease-in-out"
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-center text-2xl py-4 font-black">
        {selectedGenre.value ? (
          <span>
            Selected Genre:{" "}
            <span className="text-yellow-600">{selectedGenre}</span>
          </span>
        ) : (
          "Showing all books"
        )}
      </div>

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
              <td className="text-start">{book.title}</td>
              <td className="text-start">{book.author.name}</td>
              <td className="text-start">{book.published}</td>
              <td className="text-start">{genreParser(book.genres)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;

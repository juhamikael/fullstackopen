import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { buttonclass } from "../styles";
import { cn } from "../lib";
const AuthorForm = ({ authors, setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(0);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(message);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    const bornNumber = parseInt(born) || 0;
    await editAuthor({ variables: { name, setBornTo: bornNumber } });
    setName("");
    setBorn(0);
  };

  return (
    <div>
      <div className="text-center text-2xl pt-4 font-black">Edit Birthyear</div>
      <form onSubmit={submit}>
        <div className="flex flex-col gap-y-2">
          <label className="text-xl" htmlFor="name">
            Name
          </label>
          <select
            id="name"
            className="border rounded-md px-2 py-1"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <label className="text-xl" htmlFor="born">
            Born
          </label>
          <input
            id="born"
            className="border rounded-md px-2 py-1"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <button
            className={cn(
              !name || !born
                ? `${buttonclass} bg-gray-400 hover:bg-gray-400/80`
                : buttonclass
            )}
            type="submit"
            disabled={!name || !born}
          >
            Update author
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;

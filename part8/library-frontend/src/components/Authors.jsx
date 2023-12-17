import AuthorForm from "./AuthorForm";
import { buttonclass } from "../styles";
import { cn } from "../lib";
import { useState } from "react";
const Authors = ({ authors, setError, token }) => {
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
        {token && (
          <button
            className={cn(
              buttonclass,
              "bg-yellow-600 hover:bg-yellow-600/80 text-white"
            )}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close" : "Edit Author"}
          </button>
        )}
        {showForm && token && (
          <AuthorForm setError={setError} authors={authors} />
        )}
      </div>
    </>
  );
};

export default Authors;
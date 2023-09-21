import PropTypes from "prop-types";
import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({
  setSuccessMessage,
  setErrorMessage,
  blogs,
  setBlogs,
  user,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      returnedBlog.user = user;
      const updatedBlogs = [...blogs, returnedBlog];
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Something went wrong, please try again");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            id="title"
            data-testid="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            data-testid="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            data-testid="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          id="submit-blog-btn"
        type="submit">create</button>
      </form>
    </>
  );
};
NewBlog.propTypes = {
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default NewBlog;

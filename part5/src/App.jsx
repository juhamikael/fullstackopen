import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";

import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {!user && (
        <Togglable buttonLabel="login" ref={loginFormRef}>
          <LoginForm setUser={setUser} />
        </Togglable>
      )}
      {user && (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <div>{user.name} logged in</div>
            <button id="logout-btn" onClick={logoutHandler}>
              Log Out
            </button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlog
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
            />
          </Togglable>
          <div className="blog-list">
            {sortedBlogsByLikes.map(
              (blog) => (
                console.log(blog),
                (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}
                  />
                )
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

import "../styling/Blog.css";
import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    setLikes((prevLikes) => {
      const updatedLikes = prevLikes + 1;
      const updatedBlogs = blogs.map((b) =>
        b.id === blog.id ? { ...b, likes: updatedLikes } : b
      );
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
      blogService.update(blog.id, { likes: updatedLikes }).catch((error) => {
        console.error("An error occurred while updating likes:", error);
      });

      return updatedLikes;
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error("An error occurred while deleting:", error);
      }
    }
  };

  return (
    <>
      <div className="blog-item">
        <button
          id="show-details-btn"
          data-testid="show-details-btn"
          className="show-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {!showDetails ? "Show Details" : "Hide Details"}
        </button>
        <div className="blog-details" id={`blog-id-${blog.id}`}>
          {blog.title} {blog.author}
          {showDetails && (
            <>
              <div>
                Url:
                {blog.url.includes("http") ? (
                  <a href={blog.url} target="_blank" rel="noreferrer">
                    {blog.url}
                  </a>
                ) : (
                  <span>{blog.url}</span>
                )}
              </div>
              <div>
                Likes: {likes}
                <button
                  id="like-btn"
                  data-testid="like-btn"
                  onClick={handleLike}
                  className="like-btn"
                >
                  Like
                </button>
              </div>
              <div>Added by: {blog.user.name}</div>
              {user.name === blog.user.name && (
                <button
                  id="delete-btn"
                  onClick={handleDelete}
                  className="delete-btn"
                >
                  Remove
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;

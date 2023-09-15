const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({
        error: "Title and URL are required.",
      })
      .end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  console.log("Blog from route", blog);
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "Unauthorized user" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const keys = Object.keys(body);

  if (keys.some((key) => key !== "likes")) {
    return response.status(400).json({
      error: "Only 'likes' can be updated.",
    });
  }

  const blog = {
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(200).end();
});

module.exports = blogRouter;

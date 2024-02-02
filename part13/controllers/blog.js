// controller/blog.js
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(SECRET);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

/**
 * GET /api/blogs
 */
router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ];
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["id", "name"],
      },
      where,

      order: [["likes", "DESC"]],
    });

    return res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", blogFinder, async (req, res, next) => {
  if (!req.blog) {
    const error = new Error("Blog not found");
    error.name = "NotFoundError";
    throw error;
  }
  return res.json(req.blog);
});

/**
 * POST /api/blogs
 */
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/blogs
 */
router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (blog.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blog.destroy();

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/blogs
 */
router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    if (!req.blog) {
      const error = new Error("Blog not found");
      error.name = "NotFoundError";
      throw error;
    }
    const { likes } = req.body;
    if (likes !== undefined) {
      const updatedBlog = await req.blog.update({ likes });
      return res.json(updatedBlog);
    } else {
      return res.status(400).json({ error: "Likes value is required" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

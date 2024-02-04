// controller/blog.js
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models/index");
const { tokenExtractor, sessionChecker } = require("../util/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
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
router.post("/", tokenExtractor, sessionChecker, async (req, res, next) => {
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

router.post("/bulk", tokenExtractor, sessionChecker, async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: "Expected an array of blog posts" });
  }
  try {
    const blogPosts = req.body.map((post) => ({
      ...post,
      userId: req.decodedToken.id,
      date: new Date(),
    }));

    const createdPosts = await Blog.bulkCreate(blogPosts, { returning: true });
    return res.status(201).json(createdPosts);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/blogs
 */
router.delete(
  "/:id",
  tokenExtractor,
  sessionChecker,
  async (req, res, next) => {
    try {
      const blog = await Blog.findByPk(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      if (blog.userId !== req.decodedToken.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await blog.destroy();

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/blogs
 */
router.put(
  "/:id",
  tokenExtractor,
  sessionChecker,
  blogFinder,
  async (req, res, next) => {
    try {
      if (!req.blog) {
        const error = new Error("Blog not found");
        error.name = "NotFoundError";
        throw error;
      }

      const updateData = {};
      const { likes, year } = req.body;

      if (likes !== undefined) {
        updateData.likes = likes;
      }

      if (year !== undefined) {
        updateData.year = year;
      }

      if (Object.keys(updateData).length === 0) {
        return res
          .status(400)
          .json({ error: "Likes or year value is required" });
      }

      const updatedBlog = await req.blog.update(updateData);
      return res.json(updatedBlog);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const { fn, col, literal } = require("sequelize");
const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("id")), "articles"],
        [fn("SUM", col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[literal("likes"), "DESC"]],
    });

    res.json(authors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

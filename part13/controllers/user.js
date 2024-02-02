// controller/user.js
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

const userFinder = async (req, res, next) => {
  console.log(`Looking for user with ID: ${req.params.id}`);
  req.user = await User.findByPk(req.params.id);
  if (req.user) {
    console.log("User found:", req.user.toJSON());
  } else {
    console.log("User not found");
  }
  next();
};

/**
 * GET /api/users
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: ["id", "title", "author", "userId"],
      },
      attributes: { exclude: ["password", "email", "username"] },
    });

    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      attributes: ["id", "title", "author", "userId"],
    },
    attributes: { exclude: ["password", "email", "username"] },
  });

  if (!user) {
    const error = new Error("User not found");
    error.name = "NotFoundError";
    throw error;
  }

  return res.json(user);
});

/**
 * POST /api/users
 * Used implementation from my own implementation from part 4
 */
router.post("/", async (request, response, next) => {
  console.log(request.body);
  try {
    const { username, name, password, email } = request.body;
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      name,
      email,
      password: passwordHash,
    });
    response.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/users
 */
router.delete("/:id", userFinder, async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    }
    await req.user.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

/*
 * PUT /api/users/:username
 */
router.put("/:username", async (req, res, next) => {
  try {
    const currentUsername = req.params.username;

    const user = await User.findOne({ where: { username: currentUsername } });
    if (!user) {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    }
    const { username: newUserName } = req.body;
    if (newUserName !== currentUsername) {
      const existingUser = await User.findOne({
        where: {
          username: newUserName,
        },
      });
      if (existingUser) {
        return res.status(400).json({
          error: `Username '${newUserName}' already exists.`,
        });
      }
    }

    const updatedUser = await user.update({ username: newUserName });
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

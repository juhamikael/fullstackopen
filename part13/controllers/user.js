// controller/user.js
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User, Blog, Readings, Session } = require("../models/index");

const { tokenExtractor, sessionChecker } = require("../util/middleware");

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

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not permitted" });
  }
  next();
};

/**
 * GET /api/users
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Blog,
          attributes: ["id", "title", "author"],
        },
      ],
      attributes: { exclude: ["password", "email", "username"] },
    });

    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const whereRead = {};

    if (req.query.read !== undefined) {
      whereRead.read = req.query.read === "true";
    }

    const findUser = await User.findByPk(userId);

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          as: "blogs",
          attributes: ["id", "title", "author", "userId"],
        },
        {
          model: Readings,
          as: "readings",
          where: req.query.read !== undefined ? whereRead : undefined,
          include: [
            {
              model: Blog,
              as: "blog",
              attributes: ["id", "url", "title", "author", "year", "likes"],
            },
          ],
        },
      ],
      attributes: ["id", "name", "username"],
    });

    if (!user && whereRead.read === true && findUser) {
      return res
        .status(404)
        .json({ error: "User does not have any finished readings in list" });
    } else if (!user && whereRead.read === false && findUser) {
      return res
        .status(404)
        .json({ error: "User does not have any unfinished readings in list" });
    } else if (!user && !findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const reformatted = {
      id: user.id,
      name: user.name,
      username: user.username,
      readings: user.readings
        ? user.readings.map((reading) => {
            return {
              id: reading.id,
              read: reading.read,
              blog: reading.blog,
              url: reading.url,
              title: reading.title,
              author: reading.author,
              year: reading.year,
              likes: reading.likes,
              read: reading.read,
            };
          })
        : [],
    };

    return res.json(reformatted);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/users
 * Used implementation from my own implementation from part 4
 */
router.post("/", async (request, response, next) => {
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
router.put(
  "/:username",
  tokenExtractor,
  isAdmin,
  sessionChecker,
  async (req, res, next) => {
    try {
      const currentUsername = req.params.username;

      const user = await User.findOne({ where: { username: currentUsername } });
      if (!user) {
        const error = new Error("User not found");
        error.name = "NotFoundError";
        throw error;
      }

      if (req.body.disabled !== undefined) {
        user.disabled = req.body.disabled;
        if (req.body.disabled) {
          await Session.destroy({
            where: {
              userId: user.id,
            },
          });
        }

        await user.save();
        return res.json(user);
      }

      const { username: newUserName } = req.body;
      if (newUserName && newUserName !== currentUsername) {
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

        await user.update({ username: newUserName });
        return res.json({
          message: "User updated successfully",
          oldUsername: currentUsername,
          newUsername: newUserName,
        });
      }

      res.json({
        message: "No updates performed.",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

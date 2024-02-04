// controller/login.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { User, Session } = require("../models/index");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });


  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const passwordCorrect = user
    ? await bcrypt.compare(body.password, user.password)
    : false;

  if (!passwordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: "10h" });

  const getSession = await Session.findOne({
    where: {
      userId: user.id,
    },
  });

  if (getSession) {
    // Update the current session with the new token
    await Session.update(
      { token, sessionActive: true },
      {
        where: {
          userId: user.id,
        },
      }
    );
    

  } else {
    await Session.create({
      token,
      sessionActive: true,
      userId: user.id,
    });
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;

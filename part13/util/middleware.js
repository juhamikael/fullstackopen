//util/middleware.js
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const { Session } = require("../models/index");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
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

const sessionChecker = async (req, res, next) => {
  const token = req.get("authorization").substring(7); 

  const sessionActive = await Session.findOne({
    where: {
      userId: req.decodedToken.id,
      token: token,
      sessionActive: true,
    },
  });

  if (req.decodedToken && sessionActive) {
    next();
  } else {
    return res.status(401).json({ error: "invalid session" });
  }
};

module.exports = { sessionChecker, tokenExtractor };

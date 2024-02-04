// controller/logout.js
const router = require("express").Router();
const { User, Session } = require("../models/index");
const { sessionChecker, tokenExtractor } = require("../util/middleware");
router.post("/", tokenExtractor, sessionChecker, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const getSession = await Session.findOne({
    where: {
      userId: user.id,
    },
  });

  if (getSession) {
    await Session.destroy(
      {
        where: {
          userId: user.id,
        },
      },
      { force: true }
    );
  }

  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;

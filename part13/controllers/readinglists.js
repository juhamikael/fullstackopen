// // controllers/readinglists.js
const express = require("express");
const router = express.Router();
const { Readings } = require("../models/index");
const { sessionChecker, tokenExtractor } = require("../util/middleware");

router.put("/:id", tokenExtractor, sessionChecker, async (req, res, next) => {
  console.log("Decoded token:", req.decodedToken.id);
  console.log("Request body:", req.body);

  try {
    const readingsId = parseInt(req.params.id, 10);
    const { read } = req.body;

    if (read === undefined) {
      return res.status(400).json({ error: "read status must be provided" });
    }

    const findReading = await Readings.findOne({
      where: {
        id: readingsId,
        user_id: req.decodedToken.id,
      },
    });

    if (!findReading) {
      return res.status(404).json({ error: "Reading entry not found" });
    }

    await Readings.update(
      { read },
      {
        where: {
          id: readingsId,
          user_id: req.decodedToken.id,
        },
      }
    );

    const updatedReading = await Readings.findByPk(readingsId);
    return res.json({
      message: "Reading updated successfully",
      reading: updatedReading,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

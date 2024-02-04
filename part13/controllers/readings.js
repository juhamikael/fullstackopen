// controllers/readings.js
const express = require("express");
const router = express.Router();
const { Readings } = require("../models/index");
const { sessionChecker, tokenExtractor } = require("../util/middleware");

router.post("/", tokenExtractor, sessionChecker, async (req, res, next) => {
  try {
    console.log("Decoded token:", req.decodedToken);
    console.log("Request body:", req.body);

    const { blog_id } = req.body;
    if (!blog_id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    const existingReading = await Readings.findOne({
      where: {
        user_id: req.decodedToken.id,
        blog_id: blog_id,
      },
    });

    if (existingReading) {
      return res.status(409).json({ error: "Reading already exists" });
    }

    const newReading = await Readings.create({
      user_id: req.decodedToken.id,
      blog_id: blog_id,
      read: false,
    });

    return res.status(201).json(newReading);
  } catch (error) {
    console.error("Error during reading creation:", error);
    next(error);
  }
});
module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

const connectDB = require("./database/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);

module.exports = app;

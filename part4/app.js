const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");

const connectDB = require("./database/db");
require("express-async-errors");

connectDB();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;

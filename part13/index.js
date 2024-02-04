// index.js
const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");

const { connectToDatabase } = require("./util/db");

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorRouter = require("./controllers/authors");
const readingsRouter = require("./controllers/readings");
const readingListRouter = require("./controllers/readinglists");
const { errorHandler } = require("./middleware");

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readings", readingsRouter);
app.use("/api/readinglists", readingListRouter  );

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

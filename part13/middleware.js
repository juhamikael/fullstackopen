// middleware.js

const errorHandler = (error, request, response, next) => {
  console.error(error.message, error.stack);

  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map(err => err.message);
    return response.status(400).json({ errors });
  } else if (error.name === "NotFoundError") {
    console.log("Test");
    return response.status(404).json({ error: error.message });
  }
  return response.status(500).json({ error: "Something went wrong" });
};

module.exports = { errorHandler };

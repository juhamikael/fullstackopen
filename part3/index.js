const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

// Replaced functions but kept for showing that tasks were completed
// const persons = require("./utils/data");
// const generateId = require("./utils/helpers").generateId;
// console.log(generateId());

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.get("/info", async (req, res) => {
  const date = new Date();
  const contactsCount = await Phonebook.countDocuments({});
  res.send(
    `<p>Phonebook has info for ${contactsCount} people</p><p>${date}</p>`
  );
});

app.get("/api/persons", (req, res, next) => {
  Phonebook.find({})
    .then((contacts) => {
      res.json(contacts);
    })
    .catch(next);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phonebook.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const existingContact = await Phonebook.findOne({ name: name });

  if (existingContact) {
    return res.status(409).json({
      error: "Contact with the same name already exists",
    });
  }

  await Phonebook.create({ name: name, number: number })
    .then((contact) => {
      res.json(contact);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  await Phonebook.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((contact) => res.json(contact))
    .catch((error) => next(error));
});

function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err.name === "CastError" && err.kind === "ObjectId") {
    console.log("cast error");
    return res.status(400).json({ error: "Invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: "Validation error", details: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

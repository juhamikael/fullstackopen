const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    default: "",
    validate: {
      validator: (value) => {
        return /^\d{2,3}-\d{7}$/.test(value);
      },
      message:
        "Please enter a valid phone number with either two digits followed by a hyphen and seven digits (xx-xxxxxxx) or three digits followed by a hyphen and seven digits (xxx-xxxxxxx). The total number of digits should be 9 or 10.",
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);

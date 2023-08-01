const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://juhamikael:${password}@fullstack-open.pdme97g.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length > 2) {
  const newContact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  newContact.save().then(() => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  console.log("phonebook:");
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact.name, contact.number);
    });

    mongoose.connection.close();
  });
}

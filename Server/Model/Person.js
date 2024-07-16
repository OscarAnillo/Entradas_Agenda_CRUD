const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connecting to the database...");
    console.log("Connected!");
  })
  .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  contact: String,
  email: String,
});

module.exports = mongoose.model("Person", personSchema);

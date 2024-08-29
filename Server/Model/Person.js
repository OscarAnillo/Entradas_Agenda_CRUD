const mongoose = require("mongoose");
const config = require("../Utils/config");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connecting to the database...");
    console.log("Connected!");
  })
  .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: String,
  contact: {
    type: String,
    required: true,
    minLength: 10,
  },
  email: String,
});

module.exports = mongoose.model("Person", personSchema);

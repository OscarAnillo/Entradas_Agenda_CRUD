const mongoose = require("mongoose");

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

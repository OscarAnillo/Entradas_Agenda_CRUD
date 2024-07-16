require("dotenv").config();
const express = require("express");
const Person = require("./Model/Person");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3005;

/* Middleware */
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "Client/contacts-entry-fe/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client/contacts-entry-fe/dist"));
});

console.log(__dirname);

app.get("/api/persons", async (req, res) => {
  try {
    let allPersons = await Person.find({});
    res.json(allPersons);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const singlePerson = await Person.findById(req.params.id);
    res.json(singlePerson);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/api/persons", async (req, res) => {
  try {
    const body = req.body;
    const newPerson = new Person({
      name: body.name,
      lastName: body.lastName,
      contact: body.contact,
      email: body.email,
    });
    const personToSave = await newPerson.save();
    console.log(personToSave);
    res.status(200).json(personToSave);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.patch("/api/persons/:id", async (req, res) => {
  try {
    const personToPatch = await Person.findByIdAndUpdate(req.params.id);
    if (personToPatch) {
      await personToPatch.updateOne({ $set: req.body });
      res.status(200).json("The contact has been updated");
    } else {
      res.status(404).json("Contact cannot be updated now.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const personToRemove = await Person.findByIdAndDelete(req.params.id);
    if (personToRemove) {
      res.status(200).send("Contact was removed");
    } else {
      res.status(404).send("Contact was not found!");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
    next();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

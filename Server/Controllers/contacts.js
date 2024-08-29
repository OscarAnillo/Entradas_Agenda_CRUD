const router = require("express").Router();
const Person = require("../Model/Person");

router.get("/", async (req, res) => {
  try {
    let allPersons = await Person.find({});
    res.status(200).json(allPersons);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singlePerson = await Person.findById(req.params.id);
    singlePerson ? res.json(singlePerson) : res.status(404).end();
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    if (body.name === undefined || !body.name || !body.contact) {
      return res
        .status(400)
        .json({ error: "Contact name or contact # is missing" });
    }

    const newPerson = new Person({
      name: body.name,
      lastName: body.lastName,
      contact: body.contact,
      email: body.email,
    });
    const personToSave = await newPerson.save();
    res.status(200).json(personToSave);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const personToPatch = await Person.findByIdAndUpdate(req.params.id);
    if (personToPatch) {
      await personToPatch.updateOne(
        { $set: req.body },
        { runValidators: true }
      );
      res.status(200).json("The contact has been updated");
    } else {
      res.status(404).json("Contact cannot be updated now.");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const personToRemove = await Person.findByIdAndDelete(req.params.id);
    if (personToRemove) {
      res.status(204).end();
    } else {
      res.status(404).send("Contact was not found!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

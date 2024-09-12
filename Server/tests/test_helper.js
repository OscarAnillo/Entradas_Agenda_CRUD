const Person = require("../Model/Person");

const initialContacts = [
  {
    _id: "66d78e42ba7c3521d5905903",
    contact: "1112223333",
    email: "test@example.com",
    lastName: "Subject",
    name: "Test",
  },
  {
    _id: "66d8d0b26d9280ed8f1c5286",
    contact: "5555555555",
    email: "test@example.com",
    lastName: "Me",
    name: "Test",
  },
];

const nonExistingId = async () => {
  const contact = new Person({ lastName: "WillRemove" });
  await contact.save();
  await contact.deleteOne();

  return contact._id.toString();
};

const contactsInBD = async () => {
  const contacts = await Person.find({});
  return contacts.map((contact) => contact.toJSON());
};

module.exports = {
  initialContacts,
  nonExistingId,
  contactsInBD,
};

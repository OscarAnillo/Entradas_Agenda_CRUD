const dummy = (contacts) => {
  return 1;
};

const checkNameAndContact = (obj) => {
  const person = {
    name: "personName",
    contact: "personContact",
  };

  return person.name && person.contact ? true : false;
};

const favoriteContact = (contacts) => {
  return contacts.length === 0 ? null : contacts[0];
};

module.exports = {
  dummy,
  checkNameAndContact,
  favoriteContact,
};

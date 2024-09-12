const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../Index");
const Person = require("../Model/Person");

const api = supertest(app);

beforeEach(async () => {
  await Person.deleteMany({});
  let personObject = new Person(helper.initialContacts[0]);
  await personObject.save();
  personObject = new Person(helper.initialContacts[1]);
  await personObject.save();
});

test("Contacts are returned as json", async () => {
  await api
    .get("/api/persons")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All contacts are returned", async () => {
  const response = await api.get("/api/persons");
  assert.strictEqual(response.body.length, helper.initialContacts.length);
});

test("A specific contact can be viewed", async () => {
  const startContacts = await helper.initialContacts;

  const contactToView = startContacts[0];

  const resultContact = await api
    .get(`/api/persons/${contactToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  delete resultContact.body.__v;

  assert.deepStrictEqual(resultContact.body, contactToView);
});

test("there are two contacts", async () => {
  const response = await api.get("/api/persons");
  assert.strictEqual(response.body.length, helper.initialContacts.length);
});

test("the first contact name is Test", async () => {
  const response = await api.get("/api/persons");

  const contents = response.body.map((e) => e.name);
  assert(contents.includes("Test"));
});

test("A valid contact can be added", async () => {
  const newContact = {
    _id: "123",
    contact: "1111111111",
    email: "test@example.com",
    lastName: "Post",
    name: "Test for the post method",
  };
  await api
    .post("/api/persons")
    .send(newContact)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const contactsAtEnd = await helper.contactsInBD();
  assert.strictEqual(contactsAtEnd.length, helper.initialContacts.length + 1);
  const content = contactsAtEnd.map((r) => r.name);
  assert(content.includes("Test for the post method"));
});

test("Contact cannot be save without name or contact #", async () => {
  const newContact = {
    email: "test@example.com",
    lastName: "Fail Test",
  };
  await api.post("/api/persons").send(newContact).expect(400);

  const conctactsAtEnd = await helper.contactsInBD();
  assert.strictEqual(conctactsAtEnd.length, helper.initialContacts.length);
});

test("Contact can be updated through a patch request", async () => {
  const patchContact = {
    lastName: "Patch Test",
  };
  await api
    .patch("/api/persons/66d8d0b26d9280ed8f1c5286")
    .send(patchContact)
    .expect("Content-Type", /json/)
    .expect(200);

  const response = await api.get("/api/persons");
  assert.strictEqual(response.body[1].lastName, patchContact.lastName);
});

test("A contact can be deleted", async () => {
  const contactsAtStart = await helper.contactsInBD();
  const contactToDelete = contactsAtStart[0];
  const contactToDeleteId = String(contactToDelete._id);

  await api.delete(`/api/persons/${contactToDeleteId}`).expect(204);
  const conctactsAtEnd = await helper.contactsInBD();

  const content = conctactsAtEnd.map((r) => r.lastName);
  assert(!content.includes(contactToDelete.lastName));
  assert.strictEqual(conctactsAtEnd.length, helper.initialContacts.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});

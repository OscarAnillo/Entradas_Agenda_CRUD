const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../Index");
const Person = require("../Model/Person");

const api = supertest(app);

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

beforeEach(async () => {
  await Person.deleteMany({});
  let personObject = new Person(initialContacts[0]);
  await personObject.save();
  personObject = new Person(initialContacts[1]);
  await personObject.save();
});

test("Contacts are returned as json", async () => {
  await api
    .get("/api/persons")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two contacts", async () => {
  const response = await api.get("/api/persons");
  assert.strictEqual(response.body.length, initialContacts.length);
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

  const response = await api.get("/api/persons");
  const content = response.body.map((r) => r.name);
  assert.strictEqual(response.body.length, initialContacts.length + 1);
  assert(content.includes("Test for the post method"));
});

test("Contact cannot be save without name or contact", async () => {
  const newContact = {
    email: "test@example.com",
    lastName: "Fail Test",
  };
  await api.post("/api/persons").send(newContact).expect(400);

  const response = await api.get("/api/persons");
  assert.strictEqual(response.body.length, initialContacts.length);
});

after(async () => {
  await mongoose.connection.close();
});

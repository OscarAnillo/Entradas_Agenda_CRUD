const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  dummy,
  checkNameAndContact,
  favoriteContact,
} = require("../Utils/list_helper");

test("dummy returns 1", () => {
  const notes = [];

  const result = dummy(notes);
  assert.strictEqual(result, 1);
});

describe("Test for the contacts", () => {
  const singleContact = [
    {
      _id: "aeiou",
      contact: "1111111111",
      email: "test@example.com",
      lastName: "testLast",
      name: "test",
    },
  ];
  test("Each contact saved must have a name and contact", () => {
    const result = checkNameAndContact(singleContact);
    assert.strictEqual(result, true);
  });
  test("Returns the first contact as the favorite one", () => {
    const contacts = [
      {
        _id: "aeiou",
        contact: "1111111111",
        email: "test@example.com",
        lastName: "testLast",
        name: "test",
      },
    ];
    const result = favoriteContact(contacts);
    assert.deepStrictEqual(result, contacts[0]);
  });
});

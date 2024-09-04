const { test, describe } = require("node:test");
const assert = require("node:assert");

const { average } = require("../Utils/for_testing");

describe("average", () => {
  test("Of one value is the value itself", () => {
    assert.strictEqual(average([1]), 1);
  });

  test("Of many calculated right", () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  test("Of empty array is 0", () => {
    assert.strictEqual(average([]), 0);
  });
});

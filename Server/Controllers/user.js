const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../Model/User");

// Create an user
userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  /* encrypt password */
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  /* user creation */
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

// Get all users
userRouter.get("/", async (req, res) => {
  const allUsers = await User.find({}).populate("persons", {
    name: 1,
    lastName: 1,
    contact: 1,
    email: 1,
  });
  res.json(allUsers);
});

module.exports = userRouter;

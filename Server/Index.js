require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./Utils/config");
const PersonRouter = require("./Controllers/contacts");
const middleware = require("./Utils/middleware");
const mongoose = require("mongoose");
const app = express();

/* Database connection */
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connecting to the database...");
    console.log("Connected!");
  })
  .catch((err) => console.log(err));

/* Middleware */
app.use(express.static("Client/contacts-entry-fe/dist"));
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

app.use("/api/persons", PersonRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () =>
  console.log(`Server listening on port ${config.PORT}`)
);

module.exports = app;
